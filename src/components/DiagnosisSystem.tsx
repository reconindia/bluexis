/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronRight, CheckCircle2, ShieldCheck, Loader2, ArrowRight } from 'lucide-react';
import { auth } from '../lib/firebase';
import { REDEVELOPMENT_STAGES } from '../constants';
import { createManualCase } from '../services/aiService';

const SOCIETY_QUESTIONS = [
  "Lack of consensus among members",
  "Dispute regarding corpus fund or area",
  "Confusion about the redevelopment process",
  "Trust issues with the Managing Committee",
  "Legal hurdles or pending litigations",
  "Financial instability of the proposed developer"
];

const REALTY_QUESTIONS = [
  "Incomplete feasibility or technical reports",
  "Challenges with regulatory approvals (IOD/CC)",
  "Stakeholder misalignment regarding project scope",
  "Gaps in project funding or liquidity",
  "Escalating construction costs or vendor issues",
  "Contractual disputes with societies or partners"
];

/**
 * A functional 9-stage project diagnosis component with Firestore integration.
 * Utilizes the institutional aiService for standardized case creation.
 */
export default function DiagnosisSystem() {
  const [role, setRole] = useState<'society' | 'realty' | null>(null);
  const [stage, setStage] = useState<number | null>(null);
  const [painPoints, setPainPoints] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [caseId, setCaseId] = useState<string | null>(null);

  const togglePainPoint = (point: string) => {
    setPainPoints(prev => 
      prev.includes(point) ? prev.filter(p => p !== point) : [...prev, point]
    );
  };

  const handleDiagnosisSubmit = async () => {
    if (!role || stage === null) return;
    
    setLoading(true);
    try {
      const selectedStage = REDEVELOPMENT_STAGES.find(s => s.id === stage);
      const stageLabel = selectedStage?.label || 'Unknown';
      
      // Determine the core "stage" identifier for the BX system
      const coreStage = stage <= 3 ? 'pre-decision' : stage <= 7 ? 'mid-process' : 'execution';

      // Use the institutional service to handle Firestore multi-collection logic
      const registeredId = await createManualCase(
        auth.currentUser?.uid || 'anonymous',
        coreStage as any,
        painPoints,
        `Diagnosis result: User identified as ${role} at ${stageLabel} stage. Issues: ${painPoints.join(', ')}`
      );

      setCaseId(registeredId);
    } catch (error) {
      console.error("Diagnosis Storage Error:", error);
      alert("Failed to save diagnosis. Please check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="diagnosis-system max-w-4xl mx-auto py-12 px-6">
      {/* Workflow Visibility Header */}
      {!caseId && (
        <div className="mb-16 flex items-center justify-between border-b border-line pb-8">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-gold mb-1">Structural Diagnosis</span>
            <h2 className="font-display font-bold text-3xl uppercase tracking-tighter">System Alignment Check</h2>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/30 block mb-1">Current Progress</span>
            <span className="font-mono text-sm font-black text-ink">Step {role ? (stage !== null ? '3' : '2') : '1'} of 3</span>
          </div>
        </div>
      )}

      {/* Step 1: Role Triage */}
      {!role && (
        <div className="step-role animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mb-12">
             <h3 className="font-serif italic text-4xl font-light mb-4">Identify Your Perspective</h3>
             <p className="text-sm font-light text-ink/60 uppercase tracking-widest leading-loose">The diagnostic layer adjusts its invariants based on your position within the redevelopment ecosystem.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <button 
              onClick={() => setRole('society')}
              className="group p-10 border border-line hover:border-gold hover:bg-zinc-950 hover:text-paper transition-all text-left relative overflow-hidden"
            >
              <div className="relative z-10">
                <span className="text-gold font-display font-black text-[10px] uppercase tracking-[0.3em] mb-8 block opacity-40 group-hover:opacity-100">Perspective A</span>
                <h4 className="font-display font-bold text-2xl uppercase tracking-tighter mb-4">Society Representative</h4>
                <p className="text-[11px] font-light opacity-60 group-hover:opacity-80 italic italic-text max-w-[200px]">Residents, Managing Committees, or Society Members.</p>
              </div>
              <ChevronRight className="absolute bottom-10 right-10 w-5 h-5 text-gold opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </button>
            <button 
              onClick={() => setRole('realty')}
              className="group p-10 border border-line hover:border-gold hover:bg-zinc-950 hover:text-paper transition-all text-left relative overflow-hidden"
            >
              <div className="relative z-10">
                <span className="text-gold font-display font-black text-[10px] uppercase tracking-[0.3em] mb-8 block opacity-40 group-hover:opacity-100">Perspective B</span>
                <h4 className="font-display font-bold text-2xl uppercase tracking-tighter mb-4">Realty Professional</h4>
                <p className="text-[11px] font-light opacity-60 group-hover:opacity-80 italic italic-text max-w-[200px]">Developers, PMCs, Architects, or Strategic Legal Advisors.</p>
              </div>
              <ChevronRight className="absolute bottom-10 right-10 w-5 h-5 text-gold opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: 9-Stage Selection */}
      {role && stage === null && (
        <div className="step-stage animate-in fade-in slide-in-from-right-4 duration-700">
          <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="max-w-xl">
              <button onClick={() => setRole(null)} className="text-[10px] uppercase tracking-widest font-black text-gold/60 hover:text-gold mb-8 flex items-center gap-2 transition-colors">
                <ChevronRight className="w-3 h-3 rotate-180" /> Back to Role Selection
              </button>
              <h3 className="font-serif italic text-4xl font-light">Diagnostic Stage Mapping</h3>
              <p className="text-sm font-light text-ink/60 uppercase tracking-widest mt-4">Select the current institutional status of your project from the 9-stage BX-Engine model.</p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line bg-zinc-100">
            {REDEVELOPMENT_STAGES.map(s => (
              <button 
                key={s.id} 
                onClick={() => setStage(s.id)}
                className="bg-white p-8 text-left group hover:bg-zinc-950 hover:text-paper transition-all duration-500 relative"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-gold font-mono text-[10px] font-black tracking-widest leading-none">NODE-0{s.id}</span>
                  <div className="w-1 h-1 rounded-full bg-gold/30 group-hover:bg-gold" />
                </div>
                <h4 className="font-display font-bold text-lg uppercase tracking-tight mb-2 group-hover:text-gold transition-colors">{s.label}</h4>
                <p className="text-[10px] font-light leading-relaxed text-ink/40 group-hover:text-paper/60 italic font-serif h-8 overflow-hidden">{s.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Clinical Validation (Pain Points) */}
      {role && stage !== null && (
        <div className="step-validation animate-in fade-in slide-in-from-right-4 duration-700">
          <div className="mb-12">
            <button onClick={() => setStage(null)} className="text-[10px] uppercase tracking-widest font-black text-gold/60 hover:text-gold mb-8 flex items-center gap-2 transition-colors">
              <ChevronRight className="w-3 h-3 rotate-180" /> Back to Stage Selection
            </button>
            <h3 className="font-serif italic text-4xl font-light mb-4">Clinical Point Detection</h3>
            <p className="text-sm font-light text-ink/60 uppercase tracking-widest max-w-2xl">Identify recurring friction points in your current layer. This activates specific realignment protocols within the BX system.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-16">
            {(role === 'society' ? SOCIETY_QUESTIONS : REALTY_QUESTIONS).map((q, i) => (
              <label 
                key={i} 
                className={`flex items-start gap-5 p-6 border cursor-pointer transition-all ${
                  painPoints.includes(q) 
                    ? 'border-gold bg-zinc-950 text-paper shadow-lg' 
                    : 'border-line bg-white hover:bg-zinc-50'
                }`}
              >
                <div className="relative flex items-center justify-center mt-1">
                  <input 
                    type="checkbox" 
                    className="sr-only"
                    checked={painPoints.includes(q)}
                    onChange={() => togglePainPoint(q)}
                  />
                  <div className={`w-4 h-4 border transition-colors ${painPoints.includes(q) ? 'bg-gold border-gold' : 'border-line bg-zinc-50'}`}>
                    {painPoints.includes(q) && <CheckCircle2 className="w-4 h-4 text-zinc-950" />}
                  </div>
                </div>
                <span className={`text-[13px] font-medium leading-relaxed font-sans ${painPoints.includes(q) ? 'text-paper' : 'text-ink/80'}`}>{q}</span>
              </label>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-line">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-gold/10 flex items-center justify-center relative">
                  <div className="absolute inset-0 animate-ping opacity-20 bg-gold rounded-full" />
                  <ShieldCheck className="w-5 h-5 text-gold" />
               </div>
               <div>
                  <span className="text-[10px] uppercase tracking-widest font-black text-ink/40 block">Final Security Verification</span>
                  <p className="text-[11px] font-medium italic text-gold">{painPoints.length} indicators detected in current layer.</p>
               </div>
            </div>
            <button 
              onClick={handleDiagnosisSubmit} 
              disabled={loading || painPoints.length === 0}
              className={`px-16 py-6 text-[10px] uppercase tracking-[0.5em] font-black transition-all ${
                loading || painPoints.length === 0
                  ? 'bg-zinc-100 text-ink/20 cursor-not-allowed border border-line'
                  : 'bg-zinc-950 text-paper hover:bg-gold hover:text-zinc-950 shadow-2xl'
              }`}
            >
              {loading ? 'Securing Diagnosis...' : 'Generate Structural Report'}
            </button>
          </div>
        </div>
      )}

      {caseId && (
        <div className="diagnosis-complete py-24 text-center animate-in zoom-in-95 duration-1000">
          <div className="mb-12 relative inline-block">
             <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full" />
             <div className="relative bg-zinc-950 p-12 border border-gold/30">
                <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-8" />
                <span className="text-gold uppercase tracking-[0.5em] font-black text-xs mb-4 block">Case Identified</span>
                <h2 className="font-display font-medium text-4xl text-paper tracking-tighter mb-4 uppercase">{caseId}</h2>
                <p className="text-sm font-light text-paper/40 uppercase tracking-widest mb-12">Institutional Protocol Activated</p>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                   <button 
                    onClick={() => {
                      setRole(null);
                      setStage(null);
                      setPainPoints([]);
                      setCaseId(null);
                    }}
                    className="px-10 py-5 bg-gold text-zinc-950 text-[10px] uppercase tracking-[0.3em] font-black hover:bg-white hover:text-zinc-950 transition-all font-sans"
                  >
                    New Diagnosis
                  </button>
                </div>
             </div>
          </div>
          <p className="text-xs font-light text-ink/40 max-w-sm mx-auto uppercase tracking-widest leading-loose">Access your structural report in the Stakeholder Portal using your case reference.</p>
        </div>
      )}
    </div>
  );
}
