/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Target, 
  ArrowRight, 
  ChevronRight, 
  Activity, 
  Lock, 
  CheckCircle2, 
  Users, 
  Building2, 
  Scale,
  Briefcase,
  AlertTriangle,
  Zap,
  Layers,
  Search,
  MessageSquare,
  FileText,
  Clock
} from 'lucide-react';
import { Page } from '../types';
import { REDEVELOPMENT_STAGES } from '../constants';

interface AssureViewProps {
  onNavigate: (page: Page) => void;
}

export default function AssureView({ onNavigate }: AssureViewProps) {
  const [driftFactors, setDriftFactors] = useState({ silos: 40, shadow: 20, transparency: 60 });
  const [isQualifiedPMC] = useState(false);

  const stagesWithIcons = [
    { icon: Search },
    { icon: MessageSquare },
    { icon: Layers },
    { icon: AlertTriangle },
    { icon: Building2 },
    { icon: FileText },
    { icon: ShieldCheck },
    { icon: Activity },
    { icon: Clock }
  ];

  const lifecycle = REDEVELOPMENT_STAGES.map((s, i) => ({
    ...s,
    icon: stagesWithIcons[i].icon
  }));

  const alignmentScore = Math.max(0, Math.min(100, Math.round((driftFactors.transparency * 1.2) - (driftFactors.silos * 0.4) - (driftFactors.shadow * 0.6) + 30)));
  const riskScore = Math.max(0, Math.min(100, Math.round((driftFactors.silos * 0.8) + (driftFactors.shadow * 1.0) - (driftFactors.transparency * 0.5))));

  // Calculate a "warp" value based on drift factors
  const driftIntensity = (driftFactors.silos + driftFactors.shadow - driftFactors.transparency) / 10;

  return (
    <div className="flex flex-col scroll-smooth selection:bg-gold selection:text-ink">
      {/* Structural Notice */}
      <div className="bg-gold/5 border-b border-gold/10 py-3 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-gold/80 font-sans">
          ASSURE™ functions activate only when used with a qualified full-service management partner.
        </p>
      </div>

      {/* 01 COVER / HERO */}
      <section className="min-h-screen py-40 relative flex items-center border-b border-line overflow-hidden bg-white">
        <div className="absolute inset-0 grid-bg opacity-[0.03]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col mb-16">
              <span className="text-xs uppercase tracking-[0.5em] font-bold text-gold mb-4 block font-sans tracking-widest">Introduction</span>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-ink/40 font-sans border-l border-gold pl-6">
                Structured Execution System for Management-led Redevelopment
              </p>
            </div>
            
            <h1 className="font-display font-bold text-7xl md:text-[160px] leading-[0.8] mb-12 tracking-tighter text-ink">
              ASSURE™ <br />
              <span className="font-serif italic font-light text-gold text-4xl md:text-7xl lowercase block mt-8">redevelopment system.</span>
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-start gap-12 mt-20">
              <p className="text-2xl font-light text-ink/90 max-w-xl text-center md:text-left font-serif italic leading-relaxed">
                Complete Redevelopment Control. <br />Decisions governed by core internal rules.
              </p>
              <div className="h-px w-24 bg-gold hidden md:block" />
              <div className="flex flex-col items-center md:items-start">
                <span className="text-xs uppercase tracking-[0.4em] font-bold text-ink/40 mb-2 font-sans tracking-widest">System Status</span>
                <span className="text-gold font-display font-bold text-xs tracking-widest flex items-center gap-2 font-sans">
                  <Activity className="w-3 h-3" /> SYSTEM_ACTIVE
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 02-04 THE REALITY & CORE GAP */}
      <section className="py-40 bg-zinc-950 text-paper overflow-hidden relative">
        <div className="absolute inset-0 grid-bg opacity-[0.02]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div>
              <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-8 block font-sans tracking-widest">Expert Review</span>
              <h2 className="font-serif italic font-light text-5xl md:text-8xl leading-[0.9] mb-12">
                Why most projects <br />
                <span className="not-italic font-display font-bold text-gold tracking-tighter">become unstable.</span>
              </h2>
              <p className="text-2xl font-light text-paper/90 mb-12 max-w-md leading-relaxed font-sans">
                Execution is often managed, but outcomes are rarely controlled. Specialists exist—but shared structure does not.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-px bg-paper/5 border border-paper/10">
               {[
                 { t: "Lack of Structure", d: "Processes depend on humans, not expert protocols." },
                 { t: "Subjective Decisions", d: "Decisions are taken without clear baseline criteria." },
                 { t: "Fragmented Teams", d: "Consultants operate in silos with no unifying accountability." },
                 { t: "Latent Risk", d: "Project risks are discovered after irreversible commitment." }
               ].map((point, i) => (
                 <div key={i} className="bg-zinc-950 p-12 group hover:bg-gold hover:text-ink transition-all duration-500">
                    <span className="text-gold font-display font-bold text-xs mb-8 block group-hover:text-ink/40 transition-colors tracking-widest font-sans">0{i+1}</span>
                    <h3 className="font-display font-bold uppercase tracking-tight mb-4 text-2xl leading-none">{point.t}</h3>
                    <p className="text-sm font-light leading-relaxed opacity-80 group-hover:opacity-100 italic transition-all font-serif">{point.d}</p>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="mt-40 text-center">
             <h3 className="font-serif italic text-4xl md:text-6xl font-light text-paper/20">"Projects don't fail in construction. They drift in the decision layer."</h3>
          </div>
        </div>
      </section>

      {/* 05-07 THE SHIFT & DUAL ENGINE */}
      <section className="py-40 bg-zinc-50 border-b border-line">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-1 bg-ink/5 border border-ink/5">
              <div className="bg-white p-20 shadow-sm flex flex-col justify-center">
                 <span className="text-gold uppercase tracking-[0.3em] font-bold text-xs mb-12 block font-sans tracking-widest">Shared Management</span>
                 <h3 className="font-display font-bold text-6xl mb-8 uppercase tracking-tighter">INTEGRATION</h3>
                 <p className="text-2xl font-light text-ink/80 mb-12 leading-relaxed font-sans max-w-md">
                    A management ecosystem where legal, financial, and engineering domains are merged under a single strategic intent.
                 </p>
                 <ul className="space-y-6 text-xs font-bold uppercase tracking-[0.2em] text-ink/40 italic font-sans">
                    <li className="flex gap-4 items-center">
                      <div className="w-8 h-px bg-gold/30" /> Integrated Expertise
                    </li>
                    <li className="flex gap-4 items-center">
                      <div className="w-8 h-px bg-gold/30" /> Controlled Execution
                    </li>
                    <li className="flex gap-4 items-center">
                      <div className="w-8 h-px bg-gold/30" /> Verified Outcomes
                    </li>
                 </ul>
              </div>
              <div className="bg-zinc-950 text-paper p-20 relative overflow-hidden flex flex-col justify-center">
                 <div className="absolute inset-0 grid-bg opacity-[0.03]" />
                 <span className="text-gold uppercase tracking-[0.3em] font-bold text-xs mb-12 block font-sans tracking-widest">The Control Layer</span>
                 <h3 className="font-display font-bold text-6xl mb-8 uppercase tracking-tighter">ASSURE™</h3>
                 <p className="text-2xl font-light text-paper/80 mb-12 leading-relaxed font-sans max-w-md">
                    A structural management system that validates every decision before the system allows movement.
                 </p>
                 <ul className="space-y-6 text-xs font-bold uppercase tracking-[0.2em] text-gold italic font-sans transition-all">
                    <li className="flex gap-4 items-center">
                      <Lock className="w-4 h-4 opacity-40" /> Expert Management
                    </li>
                    <li className="flex gap-4 items-center">
                      <Lock className="w-4 h-4 opacity-40" /> Decision Rules
                    </li>
                    <li className="flex gap-4 items-center">
                      <Lock className="w-4 h-4 opacity-40" /> Stage Verification
                    </li>
                 </ul>
              </div>
           </div>
           
           <div className="mt-32 text-center max-w-2xl mx-auto">
             <p className="text-3xl font-light font-serif italic text-ink/80 leading-relaxed uppercase tracking-widest">
               Integration is the <span className="text-gold not-italic font-bold">mechanism</span>, <br />Control is the <span className="text-gold not-italic font-bold">guarantee</span>.
             </p>
           </div>
        </div>
      </section>

      {/* 08-12 CONTROL LOGIC & DOCTRINE */}
      <section className="py-40 bg-white border-b border-line">
        <div className="max-w-7xl mx-auto px-6">
           <div className="max-w-4xl mb-32">
              <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-8 block font-sans tracking-widest">Analysis Logic</span>
              <h2 className="font-display text-6xl md:text-9xl font-bold tracking-tighter leading-[0.8] mb-12 uppercase">
                No Progress <br />
                <span className="font-serif italic font-light italic-text text-gold lowercase">Without Clarity.</span>
              </h2>
              <p className="text-2xl font-light text-ink/70 uppercase tracking-[0.2em] leading-relaxed italic max-w-2xl font-serif">
                The system detects issues early, triggers fixes, and realigns core rules before progress continues.
              </p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-1 grid-bg p-px bg-line">
              {[
                { l: "Entry Condition", d: "A stage cannot begin without verified prerequisites." },
                { l: "Decision Validation", d: "Clear modeling of developer offers to block interest-driven drift." },
                { l: "Exit Approval", d: "Formal system release only once the outcome is secured." }
              ].map((logic, i) => (
                <div key={i} className="bg-white p-16 group hover:bg-gold transition-all duration-700">
                  <span className="text-xs uppercase tracking-widest font-bold text-ink/30 block mb-12 group-hover:text-ink/60 font-sans">Step 0{i+1}</span>
                  <p className="text-2xl font-bold font-display uppercase mb-6 tracking-tighter leading-none">{logic.l}</p>
                  <p className="text-base font-light text-ink/60 group-hover:text-ink leading-relaxed italic line-clamp-2 font-serif">{logic.d}</p>
                </div>
              ))}
           </div>
           
           <div className="mt-40 bg-ink p-20 text-center">
              <h3 className="font-display text-2xl md:text-4xl font-bold text-gold uppercase tracking-[0.2em] mb-4">
                "The project moves stage by stage, not by situation."
              </h3>
              <p className="text-paper/75 font-serif italic text-lg italic-text tracking-widest uppercase font-sans">Discipline is the engine of redevelopment control.</p>
           </div>
        </div>
      </section>

      {/* 13-17 THE MODEL: ALIGNMENT -> OFFERS -> OUTCOME */}
      <section className="py-40 bg-zinc-950 text-paper text-center overflow-hidden relative">
        <div className="absolute -bottom-20 -right-20 opacity-[0.02] pointer-events-none select-none">
           <span className="text-[500px] font-display font-bold">ASSURE</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-12 block font-sans tracking-widest">The Control Model</span>
           
           <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-32">
              {[
                { v: "Member Alignment", c: "Stability" },
                { v: "Verified Proposals", c: "Quality" },
                { v: "Locked Outcomes", c: "Delivery" }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center group">
                  <span className="bg-white text-ink w-12 h-12 rounded-full flex items-center justify-center font-bold mb-8 group-hover:bg-gold transition-colors font-mono text-xs leading-none pt-0.5 font-sans">0{i+1}</span>
                  <h4 className="font-display text-2xl md:text-5xl font-bold uppercase tracking-tighter mb-4 leading-none">{step.v}</h4>
                  <p className="text-gold uppercase tracking-[0.2em] text-xs font-bold italic font-sans opacity-60 group-hover:opacity-100 transition-opacity">{step.c}</p>
                  {i < 2 && <ArrowRight className="w-8 h-8 text-paper/10 mt-12 hidden md:block" />}
                </div>
              ))}
           </div>
           
           <div className="mt-32 grid md:grid-cols-3 gap-px bg-paper/5 border border-paper/10 max-w-5xl mx-auto text-left">
              {[
                { t: "Reduced Risk", d: "When alignment is secured via protocol, the perceived developer risk diminishes." },
                { t: "Premium Offers", d: "Reduced risk triggers more aggressive, institutional offers from top-tier developers." },
                { t: "Structural OC", d: "System-led supervision ensures legal completion and successful handover." }
              ].map((item, i) => (
                <div key={i} className="p-12">
                  <h5 className="font-bold text-xl mb-6 text-gold uppercase tracking-tight font-display">{item.t}</h5>
                  <p className="text-base font-light text-paper/70 leading-relaxed font-sans italic">{item.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 18-24 LIFECYCLE STAGES */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
              <div className="max-w-2xl">
                <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-8 block font-sans tracking-widest">9-Stage Management Model</span>
                <h2 className="font-display text-7xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.8]">Expert<br /><span className="text-gold italic font-serif font-light lowercase">Steps.</span></h2>
              </div>
              <div className="md:w-64 text-ink/40 uppercase tracking-[0.2em] text-xs font-bold leading-relaxed border-l border-gold/30 pl-8 font-sans">
                Redevelopment is governed through a strict 9-stage management model. Each phase requires verified system exit criteria.
              </div>
           </div>
           
           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
              {lifecycle.map((stage, i) => (
                <div key={i} className="bg-white p-12 group hover:bg-zinc-950 hover:text-paper transition-all duration-700 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all text-ink group-hover:text-gold">
                    <stage.icon className="w-24 h-24" />
                  </div>
                  <span className="text-gold font-display font-bold text-xs block mb-12 opacity-40 group-hover:opacity-80 font-mono tracking-widest transition-opacity leading-none font-sans uppercase">Step-0{i+1}</span>
                  <h3 className="font-display font-bold text-2xl uppercase tracking-tighter mb-4 group-hover:text-gold transition-colors leading-none">{stage.label}</h3>
                  <p className="text-base font-light leading-relaxed text-ink/60 group-hover:text-paper/70 italic mb-8 transition-colors font-sans">{stage.desc}</p>
                  <div className="pt-8 border-t border-line group-hover:border-paper/10">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs uppercase tracking-[0.2em] font-bold text-gold opacity-0 group-hover:opacity-100 transition-opacity font-sans">Expert Guidelines:</span>
                      <span className="text-xs font-mono opacity-20 group-hover:opacity-40 transition-opacity">BX_SEC_{i+1}_09</span>
                    </div>
                    <p className="text-xs font-medium leading-relaxed text-ink/40 group-hover:text-paper/90 transition-colors font-sans uppercase tracking-[0.05em]">{stage.clinical_note}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 25-27 THE BACKBONE: PMC LAYER */}
      <section className="py-40 bg-zinc-50 border-y border-line">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-32 items-center">
              <div>
                <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-8 block font-sans tracking-widest">The Backbone</span>
                <h2 className="font-serif italic font-light text-5xl md:text-8xl leading-[0.95] mb-12 text-ink">
                  The <span className="not-italic font-display font-bold text-ink">Management Layer.</span>
                </h2>
                <p className="text-xl font-light text-ink/70 mb-12 leading-relaxed font-sans max-w-md">
                  An established ecosystem with architectural, legal, and engineering capabilities, specifically designed to support the ASSURE™ protocol.
                </p>
                
                <div className="grid grid-cols-2 gap-8">
                   {["Legal Support", "Structural Eng", "Design Studio", "Financial Logic"].map((cap, i) => (
                     <div key={i} className="flex gap-4 items-center">
                        <CheckCircle2 className="w-4 h-4 text-gold/60" />
                        <span className="text-xs uppercase tracking-[0.2em] font-bold text-ink/40 font-sans">{cap}</span>
                     </div>
                   ))}
                </div>
              </div>
              
              <div className="bg-zinc-950 p-20 text-paper shadow-2xl relative">
                 <div className="absolute inset-0 grid-bg opacity-[0.03]" />
                 <h3 className="text-gold font-display font-bold text-xs uppercase tracking-[0.4em] mb-12 block group-hover:translate-x-2 transition-transform font-sans tracking-widest">Expert Advantage</h3>
                 <div className="space-y-12">
                    {[
                      { l: "Plan-Based Tendering", d: "Scope is locked and de-risked before the market enters. Best offers guaranteed." },
                      { l: "Zero Manipulation", d: "System logic prevents hidden changes during the construction phase." },
                      { l: "Total Supervision", d: "Continuous verification of technical parameters until successful handover." }
                    ].map((adv, i) => (
                      <div key={i} className="border-t border-paper/10 pt-10 first:border-0 first:pt-0">
                         <h4 className="text-2xl font-display font-bold uppercase mb-4 tracking-tighter leading-none">{adv.l}</h4>
                         <p className="text-base font-light text-paper/40 leading-relaxed italic font-serif">{adv.d}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* NEW: STAKEHOLDER SIMULATOR */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.03]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-32">
             <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-8 block font-sans tracking-widest">Project Stability Simulator</span>
             <h2 className="font-display text-7xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.8]">Pressure<br /><span className="font-serif italic font-light text-gold lowercase">Analysis.</span></h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-1 bg-line border border-line">
             <div className="bg-white p-12 flex flex-col justify-between">
                <div className="space-y-16">
                   <div>
                     <h3 className="text-xl font-bold uppercase mb-4 tracking-tight font-display">Instability Controller</h3>
                     <p className="text-xs text-ink/40 font-serif italic mb-12">Simulate project risks by adjusting these variables.</p>
                   </div>

                   <div className="space-y-12">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center text-xs uppercase tracking-[0.2em] font-bold font-sans">
                           <div className="flex items-center gap-3">
                             <Users className="w-4 h-4 text-gold" />
                             <span>Fragmented Teams</span>
                           </div>
                           <span className="text-ink/30 italic">{driftFactors.silos}%</span>
                        </div>
                        <input 
                          type="range" min="0" max="100" 
                          value={driftFactors.silos}
                          onChange={(e) => setDriftFactors({...driftFactors, silos: parseInt(e.target.value)})}
                          className="w-full accent-gold h-1 bg-zinc-100 appearance-none cursor-pointer"
                        />
                        <p className="text-xs text-ink/30 font-serif italic leading-relaxed">Working without a baseline creates extreme team drift.</p>
                      </div>

                      <div className="space-y-6">
                        <div className="flex justify-between items-center text-xs uppercase tracking-[0.2em] font-bold font-sans">
                           <div className="flex items-center gap-3">
                             <Lock className="w-4 h-4 text-gold" />
                             <span>Hidden Decisions</span>
                           </div>
                           <span className="text-ink/30 italic">{driftFactors.shadow}%</span>
                        </div>
                        <input 
                          type="range" min="0" max="100" 
                          value={driftFactors.shadow}
                          onChange={(e) => setDriftFactors({...driftFactors, shadow: parseInt(e.target.value)})}
                          className="w-full accent-gold h-1 bg-zinc-100 appearance-none cursor-pointer"
                        />
                        <p className="text-xs text-ink/30 font-serif italic leading-relaxed">Side agreements destabilize core project rules.</p>
                      </div>

                      <div className="space-y-6">
                        <div className="flex justify-between items-center text-xs uppercase tracking-[0.2em] font-bold font-sans text-gold">
                           <div className="flex items-center gap-3">
                             <Zap className="w-4 h-4" />
                             <span>Expert Transparency</span>
                           </div>
                           <span className="italic">{driftFactors.transparency}%</span>
                        </div>
                        <input 
                          type="range" min="0" max="100" 
                          value={driftFactors.transparency}
                          onChange={(e) => setDriftFactors({...driftFactors, transparency: parseInt(e.target.value)})}
                          className="w-full accent-gold h-1 bg-zinc-100 appearance-none cursor-pointer"
                        />
                        <p className="text-xs text-ink/30 font-serif italic leading-relaxed font-sans opacity-60">System-led reporting restores member alignment and reduces risk probability.</p>
                      </div>
                   </div>
                </div>
                <button 
                  onClick={() => setDriftFactors({ silos: 20, shadow: 10, transparency: 85 })}
                  className="mt-16 text-xs uppercase tracking-[0.4em] font-bold text-gold/60 border-b border-gold/20 pb-1 hover:text-gold hover:border-gold transition-all w-fit font-sans"
                >
                  Restore Baseline Integrity
                </button>
             </div>

             <div className="bg-zinc-950 text-paper p-16 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 flex items-center justify-center pointer-events-none">
                  <svg className="w-full h-full p-20" viewBox="0 0 400 400">
                    {/* Primary Baseline */}
                    <motion.path
                      d="M 50 200 Q 200 200 350 200"
                      fill="none"
                      stroke="var(--color-gold)"
                      strokeWidth="3"
                      animate={{ 
                        d: `M 50 200 Q 200 ${200 + driftIntensity * 60} 350 200`,
                        opacity: alignmentScore < 40 ? [1, 0.4, 1] : 1
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                    {/* Harmonic Drift 1 */}
                    <motion.path
                      d="M 50 200 Q 200 200 350 200"
                      fill="none"
                      stroke="var(--color-gold)"
                      strokeWidth="1"
                      animate={{ 
                        d: `M 50 200 Q 125 ${200 - driftIntensity * 30} 350 200`,
                        opacity: riskScore / 100
                      }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                    {/* Harmonic Drift 2 */}
                    <motion.path
                      d="M 50 200 Q 200 200 350 200"
                      fill="none"
                      stroke="var(--color-gold)"
                      strokeWidth="0.5"
                      strokeDasharray="4 4"
                      animate={{ 
                        d: `M 50 200 Q 275 ${200 + driftIntensity * 80} 350 200`,
                        opacity: riskScore / 100
                      }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                  </svg>
                </div>

                <div className="relative z-10">
                   <h3 className="text-gold font-display font-bold text-xs uppercase tracking-[0.4em] mb-16 block font-sans tracking-widest">Real-time Stability Monitor</h3>
                   <div className="space-y-24">
                      <div>
                        <div className="flex justify-between items-end mb-6">
                           <span className="text-xs uppercase font-bold tracking-[0.2em] text-paper/40 font-sans">Alignment Probability</span>
                           <span className="text-5xl font-display font-bold text-gold tracking-tighter leading-none">{alignmentScore}%</span>
                        </div>
                        <div className="h-1 bg-paper/5 w-full overflow-hidden">
                           <motion.div 
                             animate={{ width: `${alignmentScore}%` }}
                             className={`h-full ${alignmentScore < 50 ? 'bg-red-500' : 'bg-gold'}`}
                           />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-end mb-6">
                           <span className="text-xs uppercase font-bold tracking-[0.2em] text-paper/40 font-sans">Risk Exposure (Drift)</span>
                           <span className="text-5xl font-display font-bold text-paper tracking-tighter leading-none">{riskScore}%</span>
                        </div>
                        <div className="h-1 bg-paper/5 w-full overflow-hidden">
                           <motion.div 
                             animate={{ width: `${riskScore}%` }}
                             className={`h-full ${riskScore > 50 ? 'bg-red-500' : 'bg-paper/20'}`}
                           />
                        </div>
                      </div>
                   </div>
                </div>

                <div className="mt-24 pt-12 border-t border-paper/5 relative z-10">
                   {alignmentScore < 60 ? (
                     <div className="flex gap-4 items-center text-red-500/80 animate-pulse">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <p className="text-xs uppercase tracking-[0.2em] font-bold italic font-sans">Severe project drift detected. System lockdown initiated.</p>
                     </div>
                   ) : (
                     <div className="flex gap-4 items-center text-gold/80">
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                        <p className="text-xs uppercase tracking-[0.2em] font-bold italic font-sans">Institutional alignment secured. Project rules within tolerance.</p>
                     </div>
                   )}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 28-33 INSTITUTIONAL AUTHORITY */}
      <section className="py-40 bg-zinc-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-[0.02] pointer-events-none select-none text-ink">
           <Briefcase className="w-96 h-96" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="grid lg:grid-cols-2 gap-32 items-center">
              <div className="order-2 lg:order-1">
                 <div className="bg-white border border-line p-16 md:p-24 shadow-sm relative">
                    <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-gold/10 -translate-x-[-12px] -translate-y-[-12px]" />
                    <span className="text-gold uppercase tracking-[0.3em] font-bold text-xs mb-12 block font-sans tracking-widest">Strategic Support</span>
                    <h3 className="font-serif italic font-light text-5xl md:text-8xl mb-16 text-ink leading-[0.95]">
                       Project<br />Authority.
                    </h3>
                    <div className="space-y-12">
                       {[
                         { t: "Legal Guidance", d: "Structuring complex cooperative laws into verified decision paths." },
                         { t: "Financial Clarity", d: "Ensuring every stakeholder understands the definitive project mathematics." },
                         { t: "Decision Structuring", d: "Hardening alignment before institutional commitment." }
                       ].map((role, i) => (
                         <div key={i} className="group">
                            <h4 className="text-xl font-display font-bold uppercase tracking-tight mb-4 group-hover:text-gold transition-colors">{role.t}</h4>
                            <p className="text-base font-light text-ink/40 leading-relaxed italic font-serif">{role.d}</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
              
              <div className="order-1 lg:order-2">
                 <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-8 block font-sans tracking-widest">Expert Panel</span>
                 <h2 className="font-display font-bold text-6xl md:text-9xl uppercase tracking-tighter leading-[0.8] mb-12">
                   Authority <br /><span className="text-gold italic font-serif font-light lowercase">Protocol.</span>
                 </h2>
                 <p className="text-3xl font-light text-ink/70 leading-relaxed mb-16 italic border-l border-gold/30 pl-12 font-serif">
                   Expert credibility is the foundation of structural stability in redevelopment excellence.
                 </p>
                 <div className="space-y-8">
                    <p className="text-xs uppercase tracking-[0.3em] font-bold text-ink/30 font-sans italic">Verified Domains:</p>
                    <ul className="grid sm:grid-cols-2 gap-px bg-gold/10 border border-gold/10 text-xs font-bold uppercase tracking-[0.2em] text-gold text-center font-sans">
                       <li className="bg-white py-4 hover:bg-gold hover:text-white transition-all cursor-default">Policy</li>
                       <li className="bg-white py-4 hover:bg-gold hover:text-white transition-all cursor-default">Project Models</li>
                       <li className="bg-white py-4 hover:bg-gold hover:text-white transition-all cursor-default">Verification</li>
                       <li className="bg-white py-4 hover:bg-gold hover:text-white transition-all cursor-default">Advisory</li>
                    </ul>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 34-37 INTEGRATION & CLOSING */}
      <section className="py-40 md:py-64 bg-zinc-950 text-paper text-center relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.05]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <motion.div
             initial={{ opacity: 0, scale: 0.98 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.2, ease: "easeOut" }}
           >
              <h2 className="font-display font-black text-6xl md:text-[160px] leading-none mb-24 tracking-tighter uppercase">
                Structured <br />
                <span className="not-italic font-serif italic text-gold font-light lowercase">Commitment.</span>
              </h2>
              
              <div className="flex flex-col items-center gap-16">
                 <div className="max-w-3xl mx-auto border-y border-paper/10 py-20">
                    <p className="text-3xl md:text-4xl font-light italic font-serif leading-relaxed text-paper/70">
                       This is not an advisory service. <br />It is an <span className="text-paper not-italic font-bold">expert redevelopment management system</span>.
                    </p>
                 </div>
                 
                  <div className="flex flex-col md:flex-row gap-12">
                    <button 
                      onClick={() => onNavigate('situation')}
                      className="px-24 py-8 text-xs uppercase tracking-[0.5em] font-bold transition-all bg-white text-ink hover:bg-gold hover:scale-105 shadow-[0_20px_50px_rgba(212,175,55,0.1)] active:scale-95 font-sans"
                    >
                      Initialize Project Mapping
                    </button>
                  </div>
                 
                 <div className="mt-24">
                    <p className="text-xs uppercase tracking-[0.6em] font-bold italic text-gold/40 font-sans tracking-widest">Complete Redevelopment. Assured.</p>
                 </div>
              </div>
           </motion.div>
        </div>
        
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-[0.02] pointer-events-none select-none">
           <span className="text-[300px] font-display font-black uppercase">ASSURE</span>
        </div>
      </section>
    </div>
  );
}
