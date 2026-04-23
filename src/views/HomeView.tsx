/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, LayoutGrid, ShieldCheck, Users, Target, CheckCircle2 } from 'lucide-react';
import { Page } from '../types';
import Logo from '../components/Logo';

interface HomeViewProps {
  onNavigate: (page: Page) => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <div className="flex flex-col scroll-smooth">
      {/* hero */}
      <section id="hero" className="min-h-screen pt-32 pb-20 relative overflow-hidden flex items-start border-b border-line">
        <div className="absolute inset-0 grid-bg opacity-10 z-0" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16 md:mb-24">
              <div className="max-w-4xl">
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-gold mb-6 block">Institutional Advisory</span>
                <h1 className="font-serif italic font-light text-6xl sm:text-7xl md:text-[140px] leading-[0.85] tracking-tight text-ink">
                  Redevelopment <br />
                  <span className="text-gold not-italic font-display font-bold">Decisions</span>
                </h1>
              </div>
              <div className="md:w-px h-px md:h-32 bg-line" />
              <div className="max-w-sm">
                <p className="text-lg font-light text-ink/60 leading-relaxed uppercase tracking-wider italic">
                  Structured before execution. <br />Aligning stakeholders across the decision layer.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-12 gap-12 items-end">
              <div className="md:col-span-8">
                <p className="text-xl md:text-3xl font-light text-ink/80 leading-[1.4] mb-12">
                  We work with societies, PMCs, and developers to bring clinical clarity to redevelopment—aligning expectations through the <span className="font-bold text-ink border-b-2 border-gold pb-1 px-1">ASSURE™ Protocol</span>.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <button 
                    onClick={() => onNavigate('contact')}
                    className="bg-ink text-paper px-10 py-5 text-[10px] uppercase tracking-[0.4em] font-black hover:bg-gold hover:text-ink transition-all hover:scale-105 active:scale-95 shadow-xl"
                  >
                    Evaluate Your Situation
                  </button>
                  <button 
                    onClick={() => onNavigate('assure')}
                    className="border border-ink/20 px-10 py-5 text-[10px] uppercase tracking-[0.4em] font-black hover:border-gold hover:text-gold transition-all"
                  >
                    The ASSURE™ System
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-line z-0" />
        <div className="absolute top-0 left-[20%] w-[1px] h-full bg-line z-0 hidden md:block" />
        
        <div className="absolute bottom-20 right-20 hidden lg:flex flex-col items-end opacity-5 select-none pointer-events-none">
          <span className="font-serif italic text-9xl">BX</span>
          <span className="font-display font-black text-2xl tracking-[0.5em] -mt-8">DECISION™</span>
        </div>
      </section>

      {/* verification summary */}
      <section className="py-24 border-b border-line bg-[#FCFAF7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-12">
             {[
               { l: "Stakeholder Alignment", v: "Verified" },
               { l: "Decision Structure", v: "Standardized" },
               { l: "Risk Control", v: "Pre-Execution" },
               { l: "Alignment Loss", v: "0.0%" }
             ].map((stat, i) => (
               <div key={i} className="flex flex-col">
                 <span className="text-[10px] uppercase tracking-[0.3em] font-black text-ink/40 mb-2">{stat.l}</span>
                 <span className="font-display text-2xl font-bold tracking-tighter text-gold italic uppercase">{stat.v}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* situation */}
      <section id="situation" className="py-40 bg-ink text-paper relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-12 mb-12">
               <span className="text-gold uppercase tracking-[0.4em] font-black text-[10px] mb-8 block">Project Instability Protocol</span>
               <h2 className="font-serif italic font-light text-5xl md:text-8xl leading-[1] tracking-tight max-w-4xl">
                 Most projects do not fail in execution. <br />
                 <span className="text-paper not-italic uppercase font-display font-bold">They become unstable earlier.</span>
               </h2>
            </div>
            
            <div className="lg:col-span-8">
              <div className="grid md:grid-cols-2 gap-px bg-paper/10 border border-paper/10">
                {[
                  "Multiple stakeholders with different expectations",
                  "Decisions being revisited or changing repeatedly",
                  "Lack of clarity on legal or financial structure",
                  "Execution beginning without full agreement"
                ].map((item, i) => (
                  <div key={i} className="bg-ink p-10 flex flex-col justify-between group hover:bg-paper hover:text-ink transition-all cursor-crosshair">
                    <span className="text-gold font-display font-black text-xs mb-8">0{i+1} — TRIGGER</span>
                    <p className="text-xl font-light leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="border-t border-gold pb-12 pt-8">
                <p className="text-sm font-bold tracking-[0.2em] uppercase text-gold mb-6 italic">Evaluation:</p>
                <p className="text-2xl font-light text-paper/70 leading-relaxed mb-8">
                  These symptoms indicate the absence of a <span className="text-paper font-medium">structured decision layer</span>.
                </p>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="group flex items-center gap-4 text-paper hover:text-gold transition-colors"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black">Begin Clinical Mapping</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* problem */}
      <section id="problem" className="py-40 border-b border-line">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-12 mb-20 text-center">
              <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter mb-6 uppercase">Systemic Failures</h2>
              <p className="text-[10px] uppercase tracking-[0.5em] font-black text-gold">Root Cause Analysis</p>
            </div>
            
            <div className="lg:col-span-10 lg:offset-1 grid md:grid-cols-2 gap-12">
               {[
                 { t: "Alignment is assumed, not verified", d: "Agreement often masks underlying stakeholder dissent that surfaces at critical milestones." },
                 { t: "Information Gap Protocols", d: "Decisions are forced through before data is structured or interpreted with precision." },
                 { t: "Risk Blindness", d: "Structural risks are identified at the cost-heavy execution phase rather than the decision phase." },
                 { t: "Readiness Failure", d: "The project moves forward on a timeline that ignores the structural stability of choices." }
               ].map((item, i) => (
                 <div key={i} className="flex gap-8 group">
                   <span className="font-serif italic text-4xl text-gold opacity-40 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                   <div>
                     <h3 className="text-2xl font-bold font-display mb-4 tracking-tight">{item.t}</h3>
                     <p className="text-ink/60 leading-relaxed font-light">{item.d}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* role */}
      <section id="role" className="py-40 bg-ink text-paper relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
             <div>
                <span className="text-gold uppercase tracking-[0.4em] font-black text-[10px] mb-8 block">Positioning</span>
                <h2 className="font-serif italic font-light text-5xl md:text-8xl leading-none mb-12">
                  The <span className="text-paper not-italic font-display font-bold">Decision</span> Layer.
                </h2>
                <div className="space-y-6 text-xl font-light text-paper/70">
                  <p>Bluexis™ does not replace PMCs, legal advisors, or developers.</p>
                  <p className="text-gold italic border-l border-gold pl-6 py-2 uppercase tracking-[0.2em] font-bold text-xs">It secures them.</p>
                  <p>By implementing a structured decision framework, we ensure that every party works from a foundation of verified alignment and controlled risk.</p>
                </div>
             </div>

             <div className="bg-paper p-12 md:p-20 text-ink shadow-2xl relative">
                <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-gold -translate-x-[-10px] -translate-y-[-10px] pointer-events-none" />
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold mb-16 block text-center">Structural Invariants</h3>
                <div className="space-y-12">
                   {[
                     { t: "Clarity before commitment", l: "Alignment" },
                     { t: "Alignment before agreement", l: "Risk" },
                     { t: "Structure before decision", l: "Logic" },
                     { t: "Readiness before execution", l: "Start" }
                   ].map((item, i) => (
                     <div key={i} className="flex justify-between items-end border-b border-line pb-4">
                       <span className="text-xl font-bold">{item.t}</span>
                       <span className="font-serif italic text-gold text-sm opacity-60">{item.l}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* assure */}
      <section id="assure-prev" className="py-40 bg-[#FCFAF7] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-24">
             <span className="text-[10px] uppercase tracking-[0.4em] font-black text-gold mb-8 block">Protocol Overview</span>
             <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-12">
               ASSURE™ System <br />
               <span className="font-serif italic font-light italic-text text-gold">Architecture.</span>
             </h2>
             <div className="h-[1px] bg-line w-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
            {[
              { 
                title: "Alignment Layer", 
                text: "Establishing a shared baseline across stakeholders through clinical expectation mapping." 
              },
              { 
                title: "Risk Layer", 
                text: "Detecting and resolving structural vulnerabilities before execution begins." 
              },
              { 
                title: "Decision Layer", 
                text: "Mathematical evaluation of alternatives to avoid interest-driven failures." 
              },
              { 
                title: "Execution Layer", 
                text: "Continuous validation of readiness and alignment during implementation." 
              }
            ].map((layer, i) => (
              <div key={i} className="bg-[#FCFAF7] p-12 group hover:bg-ink hover:text-paper transition-all duration-500">
                <span className="text-gold font-display font-black text-[10px] mb-12 block group-hover:scale-110 transition-transform origin-left tracking-widest">0{i+1} — LAYER</span>
                <h3 className="text-2xl font-bold mb-6 font-display group-hover:text-gold transition-colors">{layer.title}</h3>
                <p className="text-sm font-light leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">{layer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* process */}
      <section id="process" className="py-24 md:py-40 border-b border-line">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-24">
             <div className="lg:col-span-12 mb-12">
               <span className="text-[10px] uppercase tracking-[0.4em] font-black text-gold mb-6 block">The Protocol</span>
               <h2 className="font-serif italic font-light text-5xl md:text-7xl leading-none tracking-tight">Engagement Lifecycle.</h2>
             </div>
             
             <div className="lg:col-span-8">
               <div className="space-y-4">
                 {[
                   "Situation Evaluation & Clinical Review",
                   "Stakeholder Positional Mapping",
                   "Decision Modeling & Risk Structuring",
                   "ASSURE™ System Implementation"
                 ].map((step, i) => (
                   <div key={i} className="flex items-center justify-between py-10 border-b border-line group hover:px-8 transition-all cursor-crosshair">
                      <div className="flex items-center gap-12">
                        <span className="font-display text-sm font-black text-gold opacity-30 group-hover:opacity-100 transition-opacity">PHASE 0{i+1}</span>
                        <span className="text-2xl md:text-4xl font-light text-ink/80 group-hover:text-ink transition-colors">{step}</span>
                      </div>
                      <ChevronRight className="w-8 h-8 text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                   </div>
                 ))}
               </div>
             </div>
             <div className="lg:col-span-4 self-end">
                <div className="p-12 bg-ink text-paper relative">
                   <div className="absolute top-0 right-0 p-4">
                     <Logo type="monogram" className="w-10 h-10 opacity-40" />
                   </div>
                   <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-gold mb-6">Prerequisite</h4>
                   <p className="text-xl font-light leading-relaxed mb-8 italic text-paper/80">Every Bluexis™ case must pass the clinical alignment filter before engagement proceeds.</p>
                   <div className="h-[2px] bg-gold w-12" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* cta */}
      <section id="cta" className="py-40 md:py-60 bg-ink text-paper relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-5" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
          >
            <h2 className="font-serif italic font-light text-5xl md:text-[140px] leading-[0.8] mb-20 tracking-tighter">
              Structure <br />
              <span className="not-italic font-display font-bold text-gold">Commitment.</span>
            </h2>
            
            <div className="flex flex-col items-center gap-12">
              <div className="flex flex-col md:flex-row gap-8">
                <button 
                  onClick={() => onNavigate('contact')}
                  className="bg-paper text-ink px-16 py-6 text-xs uppercase tracking-[0.5em] font-black hover:bg-gold transition-all hover:scale-110 shadow-2xl relative group"
                >
                  <span className="relative z-10">Log Current Situation</span>
                  <div className="absolute inset-0 bg-gold translate-x-1 translate-y-1 -z-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
                </button>
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-black text-paper/30 italic uppercase">Bluexis™ Strategic Advisory — London — Mumbai — Dubai</p>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute -bottom-20 -left-20 opacity-[0.02] pointer-events-none select-none">
           <span className="text-[400px] font-display font-black leading-none">BLX</span>
        </div>
      </section>
    </div>
  );
}
