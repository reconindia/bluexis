/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { db } from "../lib/firebase";
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  addDoc, 
  serverTimestamp, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  getDoc
} from "firebase/firestore";

const getAiKey = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY") {
    console.warn("Bluexis Intelligence Layer: GEMINI_API_KEY is missing or unconfigured. AI analysis will be disabled.");
    return "BLOCKED_KEY";
  }
  return key;
};

const ai = new GoogleGenAI({ apiKey: getAiKey() });

export interface CaseEvaluationResult {
  ai_summary: string;
  clarity_score: number;
  alignment_score: number;
  risk_score: number;
  layers: {
    alignment_status: "weak" | "moderate" | "strong";
    risk_status: "low" | "medium" | "high";
    decision_status: "unclear" | "partial" | "clear";
    execution_status: "unstable" | "controlled" | "ready";
  };
  signals: string[];
}

/**
 * Generates the next sequential Case ID (BX-XXXX)
 */
async function generateNextCaseId(): Promise<string> {
  const casesRef = collection(db, "cases");
  const q = query(casesRef, orderBy("case_id", "desc"), limit(1));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) return "BX-0001";
  
  const lastId = snapshot.docs[0].data().case_id;
  const lastNum = parseInt(lastId.split("-")[1]);
  return `BX-${(lastNum + 1).toString().padStart(4, "0")}`;
}

/**
 * Manually creates a new case in the system bypassing AI evaluation.
 * Enforces the institutional-grade 4-step creation protocol.
 */
export async function createManualCase(
  userId: string, 
  stage: "pre-decision" | "mid-process" | "execution", 
  signals: string[], 
  description: string
): Promise<string> {
  const caseId = await generateNextCaseId();
  const timestamp = serverTimestamp();

  // 1. Log "created" event in case_activity
  const activityRef = collection(db, "case_activity");
  await addDoc(activityRef, {
    case_id: caseId,
    event: "created",
    actor: "system",
    timestamp: timestamp
  });

  // 2. Create case document with default scores and structural metadata
  const caseRef = doc(db, "cases", caseId);
  await setDoc(caseRef, {
    case_id: caseId,
    user_id: userId,
    status: "new",
    stage: stage,
    clarity_score: 0,
    alignment_score: 0,
    risk_score: 0,
    ai_summary: description,
    created_at: timestamp,
    updated_at: timestamp
  });

  // 3. Store signals in the case_signals collection
  const signalsRef = doc(db, "case_signals", caseId);
  await setDoc(signalsRef, {
    case_id: caseId,
    signals: signals
  });

  // 4. Initialize case_layers with default 'unclear' state
  const layersRef = doc(db, "case_layers", caseId);
  await setDoc(layersRef, {
    case_id: caseId,
    alignment_status: "moderate",
    risk_status: "medium",
    decision_status: "unclear",
    execution_status: "unstable"
  });

  return caseId;
}

/**
 * Upgrades an existing 'new' case by running AI evaluation on its summary/description.
 * Updates the case status to 'qualified' and populates ASSURE metrics.
 */
export async function qualifyExistingCase(caseId: string): Promise<void> {
  const caseRef = doc(db, "cases", caseId);
  const caseSnap = await getDoc(caseRef);
  
  if (!caseSnap.exists()) throw new Error(`Case ${caseId} does not exist.`);
  const caseData = caseSnap.data();
  const rawInput = caseData.ai_summary; // Original description stored in summary

  const timestamp = serverTimestamp();

  // 1. Mark as evaluating
  await updateDoc(caseRef, { status: "evaluating", updated_at: timestamp });

  try {
    // 2. AI Evaluation (using existing schema definition)
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perform clinical ASSURE evaluation for the following redevelopment situation: "${rawInput}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ai_summary: { type: Type.STRING },
            clarity_score: { type: Type.NUMBER },
            alignment_score: { type: Type.NUMBER },
            risk_score: { type: Type.NUMBER },
            layers: {
              type: Type.OBJECT,
              properties: {
                alignment_status: { type: Type.STRING, enum: ["weak", "moderate", "strong"] },
                risk_status: { type: Type.STRING, enum: ["low", "medium", "high"] },
                decision_status: { type: Type.STRING, enum: ["unclear", "partial", "clear"] },
                execution_status: { type: Type.STRING, enum: ["unstable", "controlled", "ready"] }
              },
              required: ["alignment_status", "risk_status", "decision_status", "execution_status"]
            },
            signals: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["ai_summary", "clarity_score", "alignment_score", "risk_score", "layers", "signals"]
        }
      }
    });

    const result: CaseEvaluationResult = JSON.parse(response.text);

    // 3. Sequential Update Protocol
    await updateDoc(caseRef, {
      status: "qualified",
      ai_summary: result.ai_summary,
      clarity_score: result.clarity_score,
      alignment_score: result.alignment_score,
      risk_score: result.risk_score,
      updated_at: serverTimestamp()
    });

    await setDoc(doc(db, "case_layers", caseId), {
      case_id: caseId,
      ...result.layers
    });

    await updateDoc(doc(db, "case_signals", caseId), {
      signals: result.signals
    });

    // 4. Log AI processed event
    await addDoc(collection(db, "case_activity"), {
      case_id: caseId,
      event: "ai_processed",
      actor: "system",
      timestamp: serverTimestamp()
    });

  } catch (error) {
    console.error("Qualification failure:", error);
    await updateDoc(caseRef, { status: "new", updated_at: serverTimestamp() });
    throw error;
  }
}

/**
 * Processes a raw user case using Gemini for clinical evaluation.
 */
export async function evaluateCase(rawInput: string, userId: string): Promise<string> {
  const caseId = await generateNextCaseId();
  const timestamp = serverTimestamp();

  // 1. Log creation activity immediately
  const activityRef = collection(db, "case_activity");
  await addDoc(activityRef, {
    case_id: caseId,
    event: "created",
    actor: "system",
    timestamp: timestamp
  });

  // 2. Initial incomplete document (Evaluating status)
  const caseRef = doc(db, "cases", caseId);
  await setDoc(caseRef, {
    case_id: caseId,
    user_id: userId,
    status: "evaluating",
    stage: "pre-decision",
    created_at: timestamp,
    updated_at: timestamp
  });

  try {
    // 3. AI Evaluation
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Evaluate the following redevelopment project situation for Bluexis Strategic Advisory:
      
      "${rawInput}"
      
      Return a structured clinical evaluation.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ai_summary: { type: Type.STRING },
            clarity_score: { type: Type.NUMBER },
            alignment_score: { type: Type.NUMBER },
            risk_score: { type: Type.NUMBER },
            layers: {
              type: Type.OBJECT,
              properties: {
                alignment_status: { type: Type.STRING, enum: ["weak", "moderate", "strong"] },
                risk_status: { type: Type.STRING, enum: ["low", "medium", "high"] },
                decision_status: { type: Type.STRING, enum: ["unclear", "partial", "clear"] },
                execution_status: { type: Type.STRING, enum: ["unstable", "controlled", "ready"] }
              },
              required: ["alignment_status", "risk_status", "decision_status", "execution_status"]
            },
            signals: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["ai_summary", "clarity_score", "alignment_score", "risk_score", "layers", "signals"]
        }
      }
    });

    const result: CaseEvaluationResult = JSON.parse(response.text);

    // 4. Atomic Updates (Simulated via multiple calls as per Firestore rules)
    
    // Update Case
    await updateDoc(caseRef, {
      status: "qualified",
      ai_summary: result.ai_summary,
      clarity_score: result.clarity_score,
      alignment_score: result.alignment_score,
      risk_score: result.risk_score,
      updated_at: serverTimestamp()
    });

    // Create Layers
    await setDoc(doc(db, "case_layers", caseId), {
      case_id: caseId,
      ...result.layers
    });

    // Create Signals
    await setDoc(doc(db, "case_signals", caseId), {
      case_id: caseId,
      signals: result.signals
    });

    // Log completion
    await addDoc(activityRef, {
      case_id: caseId,
      event: "ai_processed",
      actor: "system",
      timestamp: serverTimestamp()
    });

    return caseId;

  } catch (error) {
    // If AI fails, log issue but keep initial document in "evaluating" state
    await addDoc(activityRef, {
      case_id: caseId,
      event: "reviewed", // Use reviewed to indicate human intervention needed
      actor: "system",
      timestamp: serverTimestamp()
    });
    console.error("AI processing failed:", error);
    throw error;
  }
}
