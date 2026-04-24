/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, LayoutGrid, ShieldCheck, Users, Target, CheckCircle2, Search, MessageSquare, AlertTriangle, Layers } from 'lucide-react';
import { Page } from '../types';
import Logo from '../components/Logo';
import { REDEVELOPMENT_STAGES } from '../constants';

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
                <span className="text-xs uppercase tracking-[0.4em] font-bold text-gold mb-6 block tracking-widest font-sans">Expert Project Advice</span>
                <h1 className="font-serif italic font-light text-6xl sm:text-7xl md:text-[140px] leading-[0.85] tracking-tight text-ink">
                  Redevelopment <br />
                  <span className="text-gold not-italic font-display font-bold">Decisions</span>
                </h1>
              </div>
              <div className="md:w-px h-px md:h-32 bg-line" />
              <div className="max-w-sm">
                <p className="text-lg font-light text-ink/90 leading-relaxed uppercase tracking-wider italic">
                  Structured before execution. <br />Aligning members across the decision layer.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-12 gap-12 items-end">
              <div className="md:col-span-8">
                <p className="text-xl md:text-3xl font-light text-ink/90 leading-[1.4] mb-12">
                  We work with societies and developers to bring clear logic to redevelopment—aligning goals through the <span className="font-bold text-ink border-b-2 border-gold pb-1 px-1">ASSURE™ Protocol</span>.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <button 
                    onClick={() => onNavigate('situation')}
                    className="bg-zinc-950 text-paper px-12 py-6 text-xs uppercase tracking-[0.5em] font-bold hover:bg-gold hover:text-zinc-950 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.2)] font-sans"
                  >
                    Check Your Case
                  </button>
                  <button 
                    onClick={() => onNavigate('assure')}
                    className="border border-zinc-950/20 px-12 py-6 text-xs uppercase tracking-[0.5em] font-bold hover:border-gold hover:text-gold transition-all font-sans"
                  >
                    The ASSURE™ Protocol
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
               { l: "Member Alignment", v: "Verified" },
               { l: "Decision Structure", v: "Standardized" },
               { l: "Risk Control", v: "Pre-Execution" },
               { l: "Alignment Loss", v: "0.0%" }
             ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.3em] font-bold text-ink/70 mb-2 font-sans">{stat.l}</span>
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
               <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-8 block font-sans tracking-widest">Project Health Check</span>
               <h2 className="font-serif italic font-light text-5xl md:text-8xl leading-[1] tracking-tight max-w-4xl">
                  Most projects do not fail in construction. <br />
                  <span className="text-paper not-italic uppercase font-display font-bold">They become unstable earlier.</span>
               </h2>
            </div>
            
            <div className="lg:col-span-8">
              <div className="grid md:grid-cols-2 gap-px bg-paper/10 border border-paper/10">
                {[
                  { t: "Members are not on the same page", r: "situation" },
                  { t: "Decisions are changing repeatedly", r: "situation" },
                  { t: "Developer left or project stalled > 6 months", r: "shield" },
                  { t: "Confusing offers & lack of trust", r: "shield" }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => onNavigate(item.r as Page)}
                    className="bg-ink p-10 flex flex-col justify-between group hover:bg-paper hover:text-ink transition-all cursor-crosshair h-48"
                  >
                    <span className="text-gold font-display font-bold text-xs mb-8 uppercase tracking-widest font-sans">{item.r === 'shield' ? 'RECOVERY' : 'TRIGGER'} 0{i+1}</span>
                    <p className="text-xl font-light leading-relaxed">{item.t}</p>
                    <ArrowRight className="w-4 h-4 mt-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-gold" />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="border-t border-gold pb-12 pt-8">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-6 italic font-sans">Evaluation:</p>
                <p className="text-2xl font-light text-paper/90 leading-relaxed mb-8">
                  These signs indicate the absence of a <span className="text-paper font-medium">structured decision setup</span>.
                </p>
                <button 
                  onClick={() => onNavigate('situation')}
                  className="group flex items-center gap-4 text-paper hover:text-gold transition-colors"
                >
                  <span className="text-xs uppercase tracking-[0.3em] font-bold font-sans">Begin Expert Mapping</span>
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
              <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter mb-6 uppercase">Common Problems</h2>
              <p className="text-xs uppercase tracking-[0.5em] font-bold text-gold font-sans">Why Projects Get Stuck</p>
            </div>
            
            <div className="lg:col-span-10 lg:offset-1 grid md:grid-cols-2 gap-12">
               {[
                 { t: "Members are not on the same page", d: "Societies often sign agreements without resolving internal disagreements among members." },
                 { t: "Lack of clear information", d: "Decisions are often taken in a hurry without understanding the full legal or financial impact." },
                 { t: "Hidden risks in the project", d: "Big problems are usually discovered late, when the building is already being demolished." },
                 { t: "Pushing for speed over safety", d: "The project is rushed forward without checking if the foundation of the deal is actually solid." }
               ].map((item, i) => (
                 <div key={i} className="flex gap-8 group">
                   <span className="font-serif italic text-4xl text-gold opacity-70 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                   <div>
                     <h3 className="text-2xl font-bold font-display mb-4 tracking-tight">{item.t}</h3>
                     <p className="text-ink/80 leading-relaxed font-light">{item.d}</p>
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
                <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-8 block font-sans">Our Position</span>
                <h2 className="font-serif italic font-light text-5xl md:text-8xl leading-none mb-12">
                  The <span className="text-paper not-italic font-display font-bold">Decision</span> Layer.
                </h2>
                <div className="space-y-6 text-xl font-light text-paper/70">
                  <p>Bluexis™ does not replace PMCs, legal advisors, or developers.</p>
                  <p className="text-gold italic border-l border-gold pl-6 py-2 uppercase tracking-[0.2em] font-bold text-xs">It supports them.</p>
                  <p>By implementing a structured decision framework, we ensure that every party works from a foundation of verified alignment and controlled risk.</p>
                </div>
             </div>

             <div className="bg-paper p-12 md:p-20 text-ink shadow-2xl relative">
                <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-gold -translate-x-[-10px] -translate-y-[-10px] pointer-events-none" />
                <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-gold mb-16 block text-center font-sans">Core Rules</h3>
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

      {/* governance preview */}
      <section className="py-32 border-b border-line bg-paper">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-ink">
              <div className="flex items-center gap-8">
                 <div className="w-16 h-16 border border-line flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-8 h-8 text-gold" />
                 </div>
                 <div>
                    <h3 className="font-display font-bold text-2xl uppercase tracking-tight">Project Management</h3>
                    <p className="text-sm font-light text-ink/60 uppercase tracking-widest italic leading-relaxed">Member Accountability & Ethical Guidelines</p>
                 </div>
              </div>
              <button 
                onClick={() => onNavigate('governance')}
                className="group flex items-center gap-4 text-ink hover:text-gold transition-colors shrink-0"
              >
                <span className="text-xs uppercase tracking-[0.4em] font-bold font-sans">View Guidelines</span>
                <div className="w-12 h-12 border border-line rounded-full flex items-center justify-center group-hover:bg-gold group-hover:text-ink transition-all">
                   <ChevronRight className="w-5 h-5" />
                 </div>
              </button>
           </div>
        </div>
      </section>

      {/* assure */}
      <section id="assure-prev" className="py-40 bg-[#FCFAF7] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-24">
             <span className="text-xs uppercase tracking-[0.4em] font-bold text-gold mb-8 block font-sans tracking-widest">Protocol Overview</span>
             <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-12">
               ASSURE™ System <br />
               <span className="font-serif italic font-light italic-text text-gold">Architecture.</span>
             </h2>
             <div className="h-[1px] bg-line w-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
            {[
              { 
                title: "Planning Layer", 
                text: "Establishing shared goals across members through clear expectation mapping." 
              },
              { 
                title: "Risk Layer", 
                text: "Detecting and resolving project risks before construction begins." 
              },
              { 
                title: "Decision Layer", 
                text: "Smart evaluation of developer offers to avoid biased failures." 
              },
              { 
                title: "Building Layer", 
                text: "Continuous check of build quality and alignment during implementation." 
              }
            ].map((layer, i) => (
              <div key={i} className="bg-[#FCFAF7] p-12 group hover:bg-ink hover:text-paper transition-all duration-500">
                <span className="text-gold font-display font-bold text-xs mb-12 block group-hover:scale-110 transition-transform origin-left tracking-widest font-sans uppercase">0{i+1} — LAYER</span>
                <h3 className="text-2xl font-bold mb-6 font-display group-hover:text-gold transition-colors">{layer.title}</h3>
                <p className="text-sm font-light leading-relaxed opacity-85 group-hover:opacity-100 transition-opacity">{layer.text}</p>
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
               <span className="text-xs uppercase tracking-[0.4em] font-bold text-gold mb-6 block font-sans tracking-widest">The Protocol</span>
               <h2 className="font-serif italic font-light text-5xl md:text-7xl leading-none tracking-tight">Expert Management model.</h2>
             </div>
             
             <div className="lg:col-span-8">
               <div className="grid md:grid-cols-2 gap-8">
                  {REDEVELOPMENT_STAGES.slice(0, 4).map((stage, i) => (
                    <div key={i} className="flex flex-col p-8 border border-line group hover:border-gold transition-all">
                       <span className="font-display text-xs font-bold text-gold opacity-30 group-hover:opacity-100 transition-opacity mb-6 uppercase tracking-widest font-sans">Phase 0{i+1}</span>
                       <h3 className="text-xl font-bold uppercase tracking-tight mb-4">{stage.label}</h3>
                       <p className="text-xs font-light text-ink/85 italic leading-relaxed">{stage.desc}</p>
                    </div>
                  ))}
               </div>
               <div className="mt-8 p-10 border border-gold/20 bg-gold/5 flex items-center justify-between group cursor-pointer" onClick={() => onNavigate('assure')}>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-2 font-sans">View Full 9-Stage Model</h4>
                    <p className="text-xs font-light italic text-ink/60 font-serif">Explore the complete project safety protocol.</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gold group-hover:translate-x-2 transition-transform" />
               </div>
             </div>
             <div className="lg:col-span-4 flex flex-col gap-8">
                <div className="p-12 bg-ink text-paper relative flex-1">
                   <div className="absolute top-0 right-0 p-4">
                     <Logo type="monogram" className="w-10 h-10 opacity-40" />
                   </div>
                   <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-gold mb-6 font-sans">System Rules</h4>
                   <p className="text-xl font-light leading-relaxed mb-8 italic text-paper/80">Every case must pass the expert alignment check before we move forward.</p>
                   <div className="h-[2px] bg-gold w-12" />
                </div>
                <div className="p-12 border border-line flex flex-col justify-center items-center text-center">
                   <ShieldCheck className="w-12 h-12 text-gold mb-6 opacity-20" />
                   <p className="text-xs uppercase tracking-[0.5em] font-bold opacity-40 font-sans">Verified Rules</p>
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
                  onClick={() => onNavigate('situation')}
                  className="bg-paper text-ink px-16 py-6 text-xs uppercase tracking-[0.5em] font-black hover:bg-gold transition-all hover:scale-110 shadow-2xl relative group"
                >
                  <span className="relative z-10">Log Current Situation</span>
                  <div className="absolute inset-0 bg-gold translate-x-1 translate-y-1 -z-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
                </button>
              </div>
              <p className="text-xs uppercase tracking-[0.3em] font-bold text-paper/30 italic uppercase font-sans">Bluexis™ Strategic Advisory — London — Mumbai — Dubai</p>
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
