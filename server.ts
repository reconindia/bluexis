import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Bluexis Strategic Advisory" });
  });

  app.post("/api/evaluate", async (req, res) => {
    try {
      const { rawInput } = req.body;
      if (!rawInput) {
        return res.status(400).json({ error: "Missing rawInput" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "GEMINI_API_KEY not configured" });
      }

      const prompt = `Evaluate the following redevelopment project situation for Bluexis Strategic Advisory.
      
      USER INPUT: "${rawInput}"
      
      INSTRUCTION: Provide the analysis in simple, easy-to-understand terms common in the Mumbai/global redevelopment industry. 
      Use words like: Society Members, Managing Committee, PMC, Developer, Corpus Fund, Displacement Rent, IOD/CC, Agreement, and Final Handover.
      Avoid overly academic or corporate jargon. Focus on structural "health" of the project's consensus and planning.`;

      const result = await genAI.models.generateContent({
        model: "gemini-1.5-flash", 
        contents: prompt,
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

      res.json(JSON.parse(result.text));
    } catch (error) {
      console.error("AI Evaluation error:", error);
      res.status(500).json({ error: "Evaluation failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bluexis Decision Layer running on http://localhost:${PORT}`);
  });
}

startServer();
