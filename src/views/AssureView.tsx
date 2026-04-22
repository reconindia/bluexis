/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  Briefcase
} from 'lucide-react';
import { Page } from '../types';

interface AssureViewProps {
  onNavigate: (page: Page) => void;
}

export default function AssureView({ onNavigate }: AssureViewProps) {
  const lifecycle = [
    { name: "Setup", desc: "Establishing the clinical baseline and structural invariants." },
    { name: "Approvals", desc: "Validating regulatory readiness before stakeholder commitment." },
    { name: "Selection", desc: "Competitive de-risking of developer proposals." },
    { name: "Execution", desc: "Continuous monitoring of structural compliance." },
    { name: "Stability", desc: "Verifying physical and legal alignment post-build." },
    { name: "Completion", desc: "Institutional handover and OC verification." }
  ];

  return (
    <div className="flex flex-col scroll-smooth selection:bg-gold selection:text-ink">
      {/* 01 COVER / HERO */}
      <section className="min-h-screen py-40 relative flex items-center border-b border-line overflow-hidden bg-paper">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-gold mb-8 block font-display">System Introduction</span>
            <h1 className="font-display font-bold text-7xl md:text-[140px] leading-[0.8] mb-12 tracking-tighter">
              ONESTOP <br />
              <span className="font-serif italic font-light text-ink/40">ASSURE™</span>
            </h1>
            <p className="text-2xl md:text-4xl font-light text-ink/80 max-w-4xl mx-auto mb-10 font-serif italic italic-text">
              Complete Redevelopment. Assured.
            </p>
            <div className="h-px w-24 bg-gold mx-auto mb-10" />
            <p className="text-[10px] uppercase tracking-[0.4em] font-black max-w-lg mx-auto leading-loose opacity-60">
              System-led redevelopment with full control from start to completion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 02-04 THE REALITY & CORE GAP */}
      <section className="py-40 border-b border-line bg-ink text-paper relative">
        <div className="absolute inset-0 grid-bg opacity-5" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-gold uppercase tracking-[0.4em] font-black text-[10px] mb-8 block">Root Cause Analysis</span>
              <h2 className="font-serif italic font-light text-5xl md:text-7xl leading-tight mb-12">
                Why most projects <br />
                <span className="not-italic font-display font-bold text-gold">become unstable.</span>
              </h2>
              <p className="text-xl font-light text-paper/60 mb-12 max-w-md leading-relaxed">
                Execution is managed, but outcomes are not controlled. Experts exist, but structure does not.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-1 bg-paper/10 border border-paper/10">
               {[
                 { t: "Lack of Structure", d: "Processes depend on people, not clinical protocols." },
                 { t: "Unclear Decisions", d: "Decisions are taken without defined evaluation criteria." },
                 { t: "Fragmented Execution", d: "Consultants operate in silos with no central accountability." },
                 { t: "Risk Blindness", d: "Risks are discovered during cost-heavy phases." }
               ].map((point, i) => (
                 <div key={i} className="bg-ink p-10 group hover:bg-paper hover:text-ink transition-all">
                    <span className="text-gold font-display font-black text-xs mb-6 block">0{i+1}</span>
                    <h3 className="font-bold uppercase tracking-tight mb-4 text-xl">{point.t}</h3>
                    <p className="text-sm font-light opacity-60 group-hover:opacity-100">{point.d}</p>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="mt-40 text-center border-t border-paper/10 pt-20">
             <h3 className="font-serif italic text-4xl font-light text-paper/40 italic-text">"Projects don't fail in execution. They drift in the decision layer."</h3>
          </div>
        </div>
      </section>

      {/* 05-07 THE SHIFT & DUAL ENGINE */}
      <section className="py-40 bg-paper">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-20">
              <div className="bg-white border border-line p-16 shadow-sm">
                 <span className="text-gold uppercase tracking-[0.3em] font-black text-[9px] mb-12 block">Integration</span>
                 <h3 className="font-display font-bold text-5xl mb-8 uppercase tracking-tighter">ONESTOP</h3>
                 <p className="text-lg font-light text-ink/60 mb-8 leading-relaxed">
                    A single ecosystem of legal, financial, architectural, and engineering expertise. Total integration.
                 </p>
                 <ul className="space-y-4 text-sm font-medium uppercase tracking-widest text-gold italic">
                    <li className="flex gap-4 items-center"><ChevronRight className="w-4 h-4" /> Integrated Expertise</li>
                    <li className="flex gap-4 items-center"><ChevronRight className="w-4 h-4" /> Controlled Stages</li>
                    <li className="flex gap-4 items-center"><ChevronRight className="w-4 h-4" /> Predictable Outcomes</li>
                 </ul>
              </div>
              <div className="bg-ink text-paper p-16 shadow-2xl relative overflow-hidden">
                 <div className="absolute inset-0 grid-bg opacity-10" />
                 <span className="text-gold uppercase tracking-[0.3em] font-black text-[9px] mb-12 block">Control Layer</span>
                 <h3 className="font-display font-bold text-5xl mb-8 uppercase tracking-tighter">ASSURE™</h3>
                 <p className="text-lg font-light text-paper/60 mb-8 leading-relaxed">
                    A clinical governance engine that validates every decision before the system allows movement.
                 </p>
                 <ul className="space-y-4 text-sm font-medium uppercase tracking-widest text-accent italic">
                    <li className="flex gap-4 items-center"><Lock className="w-4 h-4" /> Stage Governance</li>
                    <li className="flex gap-4 items-center"><Lock className="w-4 h-4" /> Decision Validation</li>
                    <li className="flex gap-4 items-center"><Lock className="w-4 h-4" /> Execution Monitoring</li>
                 </ul>
              </div>
           </div>
           
           <div className="mt-24 text-center">
             <p className="text-2xl font-light font-serif italic text-ink/40">
               Integration creates <span className="text-ink not-italic font-bold">structure</span>, Control ensures <span className="text-ink not-italic font-bold">outcome</span>.
             </p>
           </div>
        </div>
      </section>

      {/* 08-12 CONTROL LOGIC & DOCTRINE */}
      <section className="py-40 border-y border-line bg-paper grid-bg">
        <div className="max-w-7xl mx-auto px-6">
           <div className="max-w-3xl mb-24">
              <span className="text-gold uppercase tracking-[0.4em] font-black text-[10px] mb-8 block">Control Logic</span>
              <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-12">
                No movement <br />
                <span className="font-serif italic font-light italic-text text-gold">without clarity.</span>
              </h2>
              <p className="text-xl font-light text-ink/60 uppercase tracking-widest leading-loose italic">
                The system detects drift, triggers intervention, and realigns structural invariants before execution resumes.
              </p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-12">
              {[
                { l: "Entry Condition", d: "A stage cannot begin without verified prerequisites." },
                { l: "Decision Validation", d: "Mathematical modeling of alternatives to block interest-driven drift." },
                { l: "Exit Approval", d: "Formal system release only once the outcome is secured." }
              ].map((logic, i) => (
                <div key={i} className="border-l border-gold pl-8 py-4">
                  <span className="text-[10px] uppercase tracking-widest font-black text-ink/40 block mb-4">Node 0{i+1}</span>
                  <p className="text-xl font-bold font-display uppercase mb-4">{logic.l}</p>
                  <p className="text-sm font-light text-ink/60 leading-relaxed">{logic.d}</p>
                </div>
              ))}
           </div>
           
           <div className="mt-40 bg-ink p-20 text-center">
              <h3 className="font-display text-2xl md:text-4xl font-black text-gold uppercase tracking-[0.2em] mb-4">
                "The project moves stage by stage, not by situation."
              </h3>
              <p className="text-paper/40 font-serif italic text-lg italic-text tracking-widest uppercase">Discipline is the engine of redevelopment control.</p>
           </div>
        </div>
      </section>

      {/* 13-17 THE MODEL: ALIGNMENT -> OFFERS -> OUTCOME */}
      <section className="py-40 bg-ink text-paper text-center overflow-hidden relative">
        <div className="absolute -bottom-20 -right-20 opacity-5 pointer-events-none select-none">
           <span className="text-[500px] font-display font-black">ASSURE</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <span className="text-gold uppercase tracking-[0.4em] font-black text-[10px] mb-12 block">The ONESTOP Model</span>
           
           <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-32">
              {[
                { v: "Good Alignment", c: "Stability" },
                { v: "Better Offers", c: "Quality" },
                { v: "Best Outcome", c: "Delivery" }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center group">
                  <span className="bg-paper text-ink w-12 h-12 rounded-full flex items-center justify-center font-black mb-6 group-hover:bg-gold transition-colors">0{i+1}</span>
                  <h4 className="font-display text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4">{step.v}</h4>
                  <p className="text-gold uppercase tracking-widest text-[10px] font-bold italic">{step.c}</p>
                  {i < 2 && <ArrowRight className="w-8 h-8 text-paper/20 mt-12 hidden md:block" />}
                </div>
              ))}
           </div>
           
           <div className="mt-32 grid md:grid-cols-3 gap-12 text-left max-w-5xl mx-auto border-t border-paper/10 pt-20">
              {[
                { t: "Reduced Risk", d: "When a society is naturally aligned through system logic, developer risk drops." },
                { t: "Stronger Proposals", d: "Reduced risk leads to aggressive, data-driven offers from top developers." },
                { t: "Verified OC", d: "System-led execution ensures legal stability and final completion." }
              ].map((item, i) => (
                <div key={i}>
                  <h5 className="font-bold text-lg mb-4 text-gold uppercase tracking-tight">{item.t}</h5>
                  <p className="text-sm font-light text-paper/60 leading-relaxed italic">{item.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 18-24 LIFECYCLE STAGES */}
      <section className="py-40 bg-paper">
        <div className="max-w-7xl mx-auto px-6">
           <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
              <div className="max-w-2xl">
                <span className="text-gold uppercase tracking-[0.4em] font-black text-[10px] mb-8 block">Lifecycle Management</span>
                <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter">Engagement <br />Stages.</h2>
              </div>
              <div className="md:w-64 text- ink/40 uppercase tracking-widest text-[9px] font-bold leading-relaxed border-l border-line pl-6">
                Systemic progression requires each stage to meet strict exit criteria before the next node activates.
              </div>
           </div>
           
           <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-px bg-line border border-line">
              {lifecycle.map((stage, i) => (
                <div key={i} className="bg-paper p-10 group hover:bg-ink hover:text-paper transition-all duration-500">
                  <span className="text-gold font-display font-black text-xs block mb-12 opacity-40 group-hover:opacity-100">ST-0{i+1}</span>
                  <h3 className="font-display font-bold text-lg uppercase tracking-tight mb-4 group-hover:text-gold transition-colors">{stage.name}</h3>
                  <p className="text-[11px] font-light leading-relaxed opacity-60 group-hover:opacity-100">{stage.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 25-27 THE BACKBONE: ONESTOP PMC */}
      <section className="py-40 bg-zinc-50 border-y border-line">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-32 items-center">
              <div>
                <span className="text-gold uppercase tracking-[0.4em] font-black text-[10px] mb-8 block">The Backbone</span>
                <h2 className="font-serif italic font-light text-5xl md:text-8xl leading-tight mb-12 text-ink">
                  ONESTOP <br />
                  <span className="not-italic font-display font-bold text-gold">PMC Layer.</span>
                </h2>
                <p className="text-xl font-light text-ink/60 mb-12 leading-relaxed">
                  An established organization with in-house architectural, legal, and engineering capabilities, purpose-built to support the ASSURE™ Engine.
                </p>
                
                <div className="grid grid-cols-2 gap-8">
                   {["Legal In-house", "Structural Eng", "Design Studio", "Financial Auth"].map((cap, i) => (
                     <div key={i} className="flex gap-4 items-center">
                        <CheckCircle2 className="w-5 h-5 text-gold" />
                        <span className="text-xs uppercase tracking-widest font-bold opacity-60">{cap}</span>
                     </div>
                   ))}
                </div>
              </div>
              
              <div className="bg-ink p-16 text-paper shadow-2xl">
                 <h3 className="text-gold font-display font-black text-sm uppercase tracking-[0.3em] mb-12 block">Execution Advantage</h3>
                 <div className="space-y-12">
                    {[
                      { l: "Plan-Based Tendering", d: "Scope is locked and de-risked before the market enters." },
                      { l: "Zero Manipulation", d: "System logic prevents back-channel renegotiation during build." },
                      { l: "Total Supervision", d: "Continuous quality verification till OC and handover." }
                    ].map((adv, i) => (
                      <div key={i} className="border-t border-paper/10 pt-8 mt-8 first:border-0 first:pt-0">
                         <h4 className="text-xl font-bold uppercase mb-4 tracking-tight">{adv.l}</h4>
                         <p className="text-sm font-light text-paper/50 leading-relaxed italic">{adv.d}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 28-33 INSTITUTIONAL AUTHORITY: CA RAMESH PRABHU */}
      <section className="py-40 bg-[#FCFAF7] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none select-none">
           <Briefcase className="w-96 h-96" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="grid lg:grid-cols-2 gap-32 items-center">
              <div className="order-2 lg:order-1">
                 <div className="bg-white border border-line p-12 md:p-20 shadow-xl relative">
                    <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-gold -translate-x-[-10px] -translate-y-[-10px]" />
                    <span className="text-gold uppercase tracking-[0.3em] font-black text-[9px] mb-12 block">Advisory Governance</span>
                    <h3 className="font-serif italic font-light text-5xl md:text-7xl mb-12 text-ink">
                      Verification Authority.
                    </h3>
                    <div className="space-y-8">
                       {[
                         { t: "Legal Guidance", d: "Structuring complex cooperative laws into clean decision paths." },
                         { t: "Financial Clarity", d: "Ensuring every stakeholder understands the fundamental mathematics." },
                         { t: "Decision Structuring", d: "Validating alignment before institutional signatures." }
                       ].map((role, i) => (
                         <div key={i}>
                            <h4 className="text-lg font-bold uppercase tracking-tight mb-2">{role.t}</h4>
                            <p className="text-sm font-light text-ink/60 italic leading-relaxed">{role.d}</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
              
              <div className="order-1 lg:order-2">
                 <span className="text-gold uppercase tracking-[0.4em] font-black text-[10px] mb-8 block">The Board</span>
                 <h2 className="font-display font-bold text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-12">
                   CA Ramesh <br />Prabhu.
                 </h2>
                 <p className="text-xl font-light text-ink/70 leading-relaxed mb-12 italic border-l border-gold pl-8">
                   "Institutional credibility is the foundation of structural stability in redevelopment."
                 </p>
                 <div className="space-y-4">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-ink/40">Credential Portfolio:</p>
                    <ul className="grid sm:grid-cols-2 gap-4 text-[11px] font-bold uppercase tracking-widest text-gold text-center">
                       <li className="border border-gold py-3">Housing Policy Expert</li>
                       <li className="border border-gold py-3">MHADA Specialist</li>
                       <li className="border border-gold py-3">Cluster Redevelopment</li>
                       <li className="border border-gold py-3">Institutional Author</li>
                    </ul>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 34-37 INTEGRATION & CLOSING */}
      <section className="py-40 md:py-64 bg-ink text-paper text-center relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
           >
              <h2 className="font-display font-black text-6xl md:text-[140px] leading-none mb-20 tracking-tighter">
                STRUCTURED <br />
                <span className="not-italic font-serif italic text-gold font-light italic-text">COMMITMENT.</span>
              </h2>
              
              <div className="flex flex-col items-center gap-12">
                 <div className="max-w-2xl mx-auto border-y border-paper/10 py-16">
                    <p className="text-2xl font-light italic font-serif leading-relaxed text-paper/70">
                       This is not a service. <br />It is a <span className="text-paper not-italic font-bold">redevelopment control system</span>.
                    </p>
                 </div>
                 
                 <div className="flex flex-col md:flex-row gap-8">
                    <button 
                      onClick={() => onNavigate('contact')}
                      className="bg-paper text-ink px-16 py-6 text-[10px] uppercase tracking-[0.4em] font-black hover:bg-gold transition-all hover:scale-110 shadow-2xl"
                    >
                      Begin Structural Mapping
                    </button>
                 </div>
                 
                 <div className="mt-20">
                    <p className="text-[10px] uppercase tracking-[0.5em] font-black italic text-gold">Complete Redevelopment. Assured.</p>
                 </div>
              </div>
           </motion.div>
        </div>
        
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none select-none">
           <span className="text-[300px] font-display font-black">ONESTOP</span>
        </div>
      </section>
    </div>
  );
}
