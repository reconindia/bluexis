/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft, 
  Activity, 
  Users, 
  Scale, 
  FileText, 
  Building2, 
  Lock, 
  Target, 
  ArrowRight,
  TrendingDown,
  LayoutDashboard,
  CheckCircle2,
  RefreshCw,
  Search
} from 'lucide-react';
import { Page } from '../types';

interface ShieldViewProps {
  onNavigate: (page: Page) => void;
}

export default function ShieldView({ onNavigate }: ShieldViewProps) {
  const [screen, setScreen] = useState(0);
  const [situation, setSituation] = useState<string | null>(null);
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<string, boolean>>({});
  const [timelineVal, setTimelineVal] = useState(0);

  // Diagnostic logic
  const diagnosticQuestions = [
    { id: 'decisions', q: "Are decisions formally recorded in institutional logs?" },
    { id: 'validation', q: "Is feasibility independently validated by external advisors?" },
    { id: 'authority', q: "Is there a defined, legally binding authority structure?" },
    { id: 'documents', q: "Are all project documents centralized in a single repository?" },
    { id: 'evaluation', q: "Is developer evaluation based on weighted scoring metrics?" }
  ];

  const govScore = useMemo(() => {
    const answeredCount = Object.values(diagnosticAnswers).filter(Boolean).length;
    return Math.round((answeredCount / diagnosticQuestions.length) * 100);
  }, [diagnosticAnswers]);

  const riskLevel = useMemo(() => {
    if (govScore > 75) return { label: 'LOW', color: 'text-green-500', bg: 'bg-green-500' };
    if (govScore > 40) return { label: 'STABILIZING', color: 'text-gold', bg: 'bg-gold' };
    return { label: 'RECOVERY REQUIRED', color: 'text-amber-600', bg: 'bg-amber-500' };
  }, [govScore]);

  const driftScore = 100 - govScore;

  // Personalization logic
  const situationalContextStr = useMemo(() => {
    if (situation === 'Developer left') return "The departure of a primary developer creates a vacuum in validation logic. SHIELD™ stabilizes the legal exit before re-initiating structure.";
    if (situation === 'Society divided') return "Internal fragmentation is a governance challenge. SHIELD™ creates an objective decision filter that neutralizes emotional bias.";
    if (situation === 'Offers unclear') return "Opacity in commercial offers is a risk-layer breakdown. We enforce clinical transparency through weighted evaluation protocols.";
    return "Stalled development requires governance restoration. We rebuild control layers to prevent repeated instability.";
  }, [situation]);

  const next = () => setScreen(s => s + 1);
  const prev = () => setScreen(s => s - 1);

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {/* SCREEN 1: HERO */}
        {screen === 0 && (
          <motion.section 
            key="screen0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="min-h-screen flex items-center bg-white text-ink"
          >
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 py-32 items-center">
              <div>
                <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-12 block font-sans tracking-widest">INTERVENTION SYSTEM — SHIELD™</span>
                <h1 className="font-display font-bold text-6xl md:text-[84px] leading-[0.85] mb-12 tracking-tighter uppercase">
                  Your redevelopment <br />
                  <span className="text-gold">didn't fail.</span> <br />
                  <span className="italic font-serif font-light lowercase">Your developer</span> <br />
                  <span className="not-italic">selection failed.</span>
                </h1>
                <div className="space-y-6 max-w-2xl">
                  <p className="text-xl font-light text-ink/80 font-sans tracking-tight leading-relaxed">
                    SHIELD™ is a 120-Day Developer Selection Control System for societies where:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-4 text-sm font-bold uppercase tracking-widest text-ink/50 font-sans italic">
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-gold" /> Tender process failed</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-gold" /> Offers are misleading</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-gold" /> Developer unreliable</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-gold" /> Decisions collapsed</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-zinc-950 p-12 md:p-16 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                 <h3 className="text-xs uppercase tracking-[0.4em] font-bold mb-12 text-gold font-sans tracking-widest">Select Your Failure Node</h3>
                 <div className="space-y-3">
                    {[
                      { id: 'tender_failed', t: 'Tender process failed to produce a decision' },
                      { id: 'no_struct_eval', t: 'Multiple offers but no structured evaluation' },
                      { id: 'dev_unreliable', t: 'Selected developer became unreliable / exited' },
                      { id: 'internal_conflict', t: 'Internal disagreements blocked final selection' },
                      { id: 'risky_offers', t: 'Offers look attractive but feel risky' },
                      { id: 'repeated_restart', t: 'Process restarted multiple times without progress' }
                    ].map(site => (
                      <button 
                        key={site.id}
                        onClick={() => {
                          setSituation(site.id);
                          next();
                        }}
                        className="w-full p-6 border border-white/5 text-left transition-all flex justify-between items-center group font-sans hover:bg-white/5 hover:border-gold/30"
                      >
                         <span className="text-xs uppercase font-bold tracking-[0.2em] text-paper/60 group-hover:text-paper max-w-[80%] leading-relaxed">{site.t}</span>
                         <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-2 transition-transform" />
                      </button>
                    ))}
                 </div>
                 <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest font-bold text-white/20 font-sans italic">Protocol: SHIELD-V1.4</span>
                    <button onClick={next} className="text-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">Start Recovery Sequence →</button>
                 </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* SCREEN 2: REALITY CHECK */}
        {screen === 1 && (
          <motion.section 
            key="screen1"
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
            className="min-h-screen py-32 flex items-center bg-white"
          >
            <div className="max-w-5xl mx-auto px-6 w-full">
               <div className="grid lg:grid-cols-2 gap-24 items-center">
                  <div>
                    <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-8 block font-sans tracking-widest">Reality Check</span>
                    <h2 className="text-6xl md:text-[100px] font-display font-bold uppercase tracking-tighter leading-[0.85] mb-12 text-ink">
                      If you restart without <span className="italic font-serif font-light text-gold lowercase">control,</span> you will repeat the same <span className="not-italic">failure.</span>
                    </h2>
                    <div className="grid grid-cols-2 gap-8">
                       {[
                         "Same confusion",
                         "Same wrong evaluation",
                         "Same internal conflict",
                         "Same outcome"
                       ].map((t, i) => (
                         <div key={i} className="flex items-center gap-4 border-l-2 border-gold/20 pl-6 py-2">
                           <span className="text-xs font-bold uppercase tracking-widest text-ink/40 font-sans">{t}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                  
                  <div className="bg-zinc-50 border border-line p-16 relative">
                     <span className="text-xs uppercase tracking-[0.4em] font-bold text-gold mb-12 block font-sans">The Reframe</span>
                     <p className="text-4xl font-serif italic text-ink mb-12 leading-tight">
                       "You don't have a developer problem. You have a <span className="text-gold font-sans not-italic uppercase font-bold tracking-tighter">selection system failure."</span>
                     </p>
                     
                     <div className="space-y-12">
                        {[
                          { t: "No structured evaluation", d: "Leading to wrong comparisons." },
                          { t: "No authority clarity", d: "Causing decisions to collapse." },
                          { t: "No validation", d: "Creating risky commitments." }
                        ].map((item, i) => (
                          <div key={i} className="group">
                             <h4 className="text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-4">
                               <span className="text-gold font-mono">0{i+1}</span>
                               {item.t}
                             </h4>
                             <p className="text-xs font-light text-ink/40 italic font-serif pl-8">{item.d}</p>
                          </div>
                        ))}
                     </div>

                     <div className="mt-16">
                        <button 
                          onClick={next}
                          className="w-full bg-zinc-950 text-paper py-6 text-xs uppercase tracking-[0.4em] font-bold hover:bg-gold hover:text-ink transition-all font-sans"
                        >
                          Stabilize Selection System
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          </motion.section>
        )}

        {/* SCREEN 3: REFRAME */}
        {screen === 2 && (
          <motion.section 
            key="screen2"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
            className="min-h-screen flex items-center bg-white"
          >
            <div className="max-w-5xl mx-auto px-6 text-center">
               <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-12 block font-sans tracking-widest">Expert Insight</span>
               <h2 className="text-6xl md:text-9xl font-display font-bold uppercase tracking-tighter leading-[0.8] mb-16 text-ink">
                  You don't have a <br />
                  <span className="text-gold italic font-serif font-light lowercase">delivery gap.</span> <br />
                  You have a <br />
                  <span className="not-italic">management gap.</span>
               </h2>
               
               <div className="grid md:grid-cols-3 gap-px bg-line">
                  {[
                    { l: "Authority Drift", r: "Decision Conflict", desc: "Decisions become difficult without clear rules." },
                    { l: "Validation Lack", r: "Unverified Choices", desc: "Emotions replace expert feasibility checks." },
                    { l: "Control Absence", r: "Project Stagnation", desc: "Complexity leads to project delays." }
                  ].map((pair, i) => (
                    <div key={i} className="bg-white p-12 text-left group hover:bg-zinc-50 transition-all duration-300 h-full border border-line">
                       <TrendingDown className="w-6 h-6 text-gold mb-8 transition-transform" />
                       <div className="flex items-center gap-4 mb-4">
                          <span className="text-xs font-bold uppercase text-ink/20 font-sans">{pair.l}</span>
                          <ArrowRight className="w-3 h-3 text-gold opacity-30" />
                          <span className="text-xs font-bold uppercase text-ink font-sans">{pair.r}</span>
                       </div>
                       <p className="text-xs font-light text-ink/40 italic font-serif leading-relaxed">{pair.desc}</p>
                    </div>
                  ))}
               </div>

               <div className="mt-24">
                  <button 
                    onClick={next}
                    className="text-xs uppercase tracking-[0.4em] font-bold border-b border-gold/40 pb-2 hover:border-gold transition-all font-sans"
                  >
                    Explore Recovery Steps
                  </button>
               </div>
            </div>
          </motion.section>
        )}

        {/* SCREEN 4 & 5: CORE ENGINE (120-Day Protocol) */}
        {(screen === 3 || screen === 4) && (
          <motion.section 
            key="screen34"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="min-h-screen py-40 flex items-center bg-white text-ink"
          >
            <div className="max-w-7xl mx-auto px-6 w-full">
               <div className="grid lg:grid-cols-3 gap-24 items-start">
                  <div className="lg:col-span-1 border-l border-gold pl-12">
                     <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-8 block font-sans tracking-widest">INTERVENTION ENGINE</span>
                     <h2 className="text-7xl font-display font-bold uppercase tracking-tighter leading-none mb-12">
                        SHIELD™ <br />
                        <span className="text-gold italic font-serif font-light lowercase">Protocol.</span>
                     </h2>
                     <p className="text-xl font-light text-ink/60 italic font-serif leading-relaxed mb-12">
                        A time-bound system to select the right developer, not the highest offer.
                     </p>
                     
                     <div className="space-y-8 mb-16">
                        {[
                          { t: "Stabilize Governance", d: "Stop informal decisions and rebuild authority structure." },
                          { t: "Validate Feasibility", d: "Independent feasibility check and risk mapping." },
                          { t: "Controlled Selection", d: "Structured comparison and weighted decision locking." }
                        ].map((p, i) => (
                          <div key={i} className="flex gap-4 group">
                             <span className="text-gold font-display font-black text-xs mt-1 opacity-40 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                             <div>
                               <h4 className="text-sm uppercase font-bold tracking-widest text-ink mb-1 font-sans">{p.t}</h4>
                               <p className="text-xs text-ink/40 italic font-serif leading-relaxed">{p.d}</p>
                             </div>
                          </div>
                        ))}
                     </div>

                     <button 
                        onClick={() => setScreen(5)}
                        className="w-full bg-zinc-950 text-paper py-6 text-xs uppercase tracking-[0.4em] font-bold hover:bg-gold hover:text-zinc-950 transition-all font-sans shadow-xl"
                      >
                        Enter Evaluation Engine
                      </button>
                  </div>

                  <div className="lg:col-span-2 bg-zinc-50 border border-line p-12 md:p-20 relative overflow-hidden shadow-sm">
                     <div className="absolute inset-0 grid-bg opacity-[0.02] pointer-events-none" />
                     
                     {/* Timeline Slider */}
                     <div className="relative mb-24">
                        <div className="flex justify-between items-center mb-12">
                           <span className="text-xs uppercase tracking-[0.4em] font-bold text-gold font-sans">The 120-Day Selection Protocol</span>
                           <span className="text-4xl font-display font-bold text-ink">Day {timelineVal}</span>
                        </div>

                        <input 
                          type="range" min="0" max="120" step="1"
                          value={timelineVal}
                          onChange={(e) => setTimelineVal(parseInt(e.target.value))}
                          className="w-full accent-gold h-px bg-line appearance-none cursor-pointer mb-12"
                        />

                        <div className="flex justify-between items-start text-xs uppercase tracking-[0.15em] font-bold text-ink/30 font-sans">
                           <div className={`transition-all duration-700 ${timelineVal <= 30 ? 'text-gold' : ''}`}>
                             <span className="block mb-1">Phase 1: 0 — 30 Days</span>
                             <span className="block font-light italic font-serif lowercase text-ink/40">Stabilization</span>
                           </div>
                           <div className={`transition-all duration-700 ${timelineVal > 30 && timelineVal <= 75 ? 'text-gold' : ''}`}>
                             <span className="block mb-1">Phase 2: 30 — 75 Days</span>
                             <span className="block font-light italic font-serif lowercase text-ink/40">Validation</span>
                           </div>
                           <div className={`transition-all duration-700 ${timelineVal > 75 ? 'text-gold' : ''}`}>
                             <span className="block mb-1">Phase 3: 75 — 120 Days</span>
                             <span className="block font-light italic font-serif lowercase text-ink/40">Controlled Selection</span>
                           </div>
                        </div>
                     </div>

                     {/* Visual State based on timeline */}
                     <div className="relative h-64 border border-line bg-white flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-x-0 bottom-0 bg-gold/5 transition-all duration-1000" style={{ height: `${(timelineVal / 120) * 100}%` }} />
                        <div className="relative z-10 text-center px-12">
                           <AnimatePresence mode="wait">
                              {timelineVal <= 30 ? (
                                <motion.div key="p1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                  <Lock className="w-12 h-12 text-gold mx-auto mb-6" />
                                  <p className="text-sm uppercase tracking-[0.4em] font-black text-ink font-sans mb-4">Phase 1: Stabilization</p>
                                  <p className="text-xs text-ink/40 italic font-serif">Stop informal decisions. Rebuild authority structure. Organize documents.</p>
                                </motion.div>
                              ) : timelineVal <= 75 ? (
                                <motion.div key="p2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                  <Activity className="w-12 h-12 text-gold mx-auto mb-6" />
                                  <p className="text-sm uppercase tracking-[0.4em] font-black text-ink font-sans mb-4">Phase 2: Validation</p>
                                  <p className="text-xs text-ink/40 italic font-serif">Independent feasibility check. Risk mapping. Legal validation.</p>
                                </motion.div>
                              ) : (
                                <motion.div key="p3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                  <Target className="w-12 h-12 text-gold mx-auto mb-6" />
                                  <p className="text-sm uppercase tracking-[0.4em] font-black text-ink font-sans mb-4">Phase 3: Selection</p>
                                  <p className="text-xs text-ink/40 italic font-serif">Structured developer comparison. Evaluation framework. Decision locking.</p>
                                </motion.div>
                              )}
                           </AnimatePresence>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </motion.section>
        )}

        {/* SCREEN 6: DEVELOPER EVALUATION ENGINE */}
        {screen === 5 && (
          <motion.section 
            key="screen5"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="min-h-screen py-32 bg-white"
          >
            <div className="max-w-7xl mx-auto px-6">
               <div className="text-center mb-24">
                  <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-8 block font-sans tracking-widest">System Intelligence</span>
                  <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-4 text-ink">Developer Selection</h2>
                  <p className="text-2xl text-ink/40 font-serif italic max-w-xl mx-auto leading-relaxed">
                     Highest offer ≠ best developer. We balance commercial value against technical and management risk markers.
                  </p>
               </div>

               <div className="overflow-x-auto">
                 <table className="w-full border-collapse">
                    <thead>
                       <tr className="bg-zinc-950 text-paper">
                          <th className="p-8 text-left text-xs uppercase tracking-widest font-bold font-sans">Risk Factors</th>
                          <th className="p-8 text-center text-xs uppercase tracking-widest font-bold text-gold font-sans">Developer Alpha</th>
                          <th className="p-8 text-center text-xs uppercase tracking-widest font-bold text-gold font-sans">Developer Beta</th>
                          <th className="p-8 text-center text-xs uppercase tracking-widest font-bold text-gold font-sans">Developer Gamma</th>
                       </tr>
                    </thead>
                    <tbody className="text-xs uppercase font-bold tracking-[0.1em] text-ink font-sans">
                       {[
                         { label: "Financial Strength", a: 8.5, b: 6.2, g: 9.1 },
                         { label: "Technical Capability", a: 7.9, b: 9.4, g: 5.6 },
                         { label: "Legal Clarity", a: 9.2, b: 7.1, g: 8.4 },
                         { label: "Risk Exposure", a: "Minimum", b: "Moderate", g: "Vulnerable" },
                         { label: "Offer Realism", a: "Reliable", b: "Aggressive", g: "Inflated" }
                       ].map((row, i) => (
                         <tr key={i} className="border-b border-line hover:bg-zinc-50 transition-colors">
                            <td className="p-8 font-black opacity-30 italic font-sans">{row.label}</td>
                            <td className="p-8 text-center">{row.a}</td>
                            <td className="p-8 text-center">{row.b}</td>
                            <td className="p-8 text-center">{row.g}</td>
                         </tr>
                       ))}
                       <tr className="bg-gold/5 font-display text-2xl font-bold">
                          <td className="p-8 tracking-tighter font-display uppercase font-bold italic">Weighted Score</td>
                          <td className="p-8 text-center text-gold">91.4</td>
                          <td className="p-8 text-center opacity-40">74.2</td>
                          <td className="p-8 text-center text-zinc-400">51.8</td>
                       </tr>
                    </tbody>
                 </table>
               </div>
               <div className="mt-24 grid md:grid-cols-2 gap-12 items-center">
                  <div className="p-12 border-l-4 border-gold bg-zinc-50">
                     <span className="text-xs uppercase font-bold text-gold tracking-widest mb-4 block font-sans italic">Evaluation Insight</span>
                     <p className="text-2xl font-serif italic font-light leading-relaxed text-ink/80">
                        "The highest offer is often the highest risk." — Inflated assumptions and hidden feasibility gaps often lead to delayed delivery or project collapse.
                     </p>
                  </div>
                  <div className="flex justify-end gap-8">
                     <button onClick={prev} className="px-12 py-5 text-xs uppercase font-bold tracking-widest text-ink/30 hover:text-ink transition-all font-sans">Back to Protocol</button>
                     <button onClick={next} className="bg-zinc-950 text-paper px-16 py-5 text-xs uppercase tracking-[0.4em] font-bold hover:bg-gold hover:text-ink transition-all font-sans">System Modules</button>
                  </div>
               </div>
            </div>
          </motion.section>
        )}

        {/* SCREEN 7: SYSTEM MODULES */}
        {screen === 6 && (
          <motion.section 
            key="screen6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="min-h-screen py-32 flex items-center bg-white"
          >
            <div className="max-w-6xl mx-auto px-6 w-full">
               <div className="text-center mb-32">
                  <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-8 block font-sans tracking-widest">Product Layer</span>
                  <h2 className="text-5xl font-display font-bold uppercase tracking-tighter mb-4 text-ink">System Modules</h2>
                  <p className="text-xl text-ink/40 font-serif italic max-w-xl mx-auto leading-relaxed">Elite governance modules designed to stabilize complex redevelopment.</p>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
                  {[
                    { t: "Developer Evaluation Engine", icon: Target, d: "Weighted comparison of technical and financial bids against risk markers." },
                    { t: "Decision Control System", icon: Lock, d: "Secure institutional log of all permissions and formal society resolutions." },
                    { t: "Risk Exposure Panel", icon: Activity, d: "Real-time tracking of project health, feasibility gaps, and potential delays." },
                    { t: "Member Alignment Interface", icon: Users, d: "Digital consensus mapping for high member transparency and objective agreement." }
                  ].map((m, i) => (
                    <button key={i} onClick={next} className="bg-white p-12 text-left group hover:bg-zinc-50 transition-all duration-500">
                       <m.icon className="w-8 h-8 text-gold mb-12 group-hover:scale-110 transition-transform" />
                       <h4 className="text-sm font-bold uppercase tracking-widest text-ink mb-4 font-sans leading-tight h-10">{m.t}</h4>
                       <p className="text-sm font-light text-ink/40 italic font-serif leading-relaxed h-20 overflow-hidden mb-6">{m.d}</p>
                       <div className="pt-6 border-t border-line flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gold/30 font-sans">
                          <span>View Detail</span> <ArrowRight className="w-3 h-3 translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                       </div>
                    </button>
                  ))}
               </div>

               <div className="mt-24 text-center">
                  <button onClick={next} className="text-xs uppercase tracking-[0.4em] font-bold bg-zinc-950 text-paper px-20 py-6 hover:bg-gold hover:text-ink transition-all shadow-xl font-sans tracking-widest">Transition to Execution</button>
               </div>
            </div>
          </motion.section>
        )}

        {/* SCREEN 8: RECOVERY DASHBOARD PREVIEW */}
        {screen === 7 && (
          <motion.section 
            key="screen7"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="min-h-screen py-40 flex items-center bg-zinc-950 text-paper overflow-hidden relative"
          >
            <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
               <div className="grid lg:grid-cols-2 gap-32 items-center">
                  <div>
                     <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-8 block font-sans tracking-widest">System Preview</span>
                     <h2 className="text-7xl font-display font-bold uppercase tracking-tighter leading-none mb-12">
                        Recovery <br />
                        <span className="text-gold italic font-serif font-light lowercase">Dashboard.</span>
                     </h2>
                     <div className="space-y-12 mb-16">
                        {[
                          { l: "Recovery Progress", s: "Baseline Restored" },
                          { l: "Next Expert Steps", s: "02 Remaining" },
                          { l: "Risk Limit", s: "Safe | Within Range" }
                        ].map((m, i) => (
                          <div key={i} className="flex gap-16 border-b border-white/5 pb-6">
                             <span className="text-xs uppercase font-bold tracking-widest opacity-30 font-sans">{m.l}</span>
                             <span className="text-xs uppercase font-bold tracking-widest text-gold font-sans">{m.s}</span>
                          </div>
                        ))}
                     </div>
                     <button onClick={next} className="bg-gold text-ink px-16 py-6 text-xs uppercase font-bold tracking-[0.4em] hover:bg-white transition-all font-sans">Continue Transformation</button>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-12 shadow-2xl relative">
                     <div className="absolute top-0 right-0 p-8">
                        <div className="flex gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                           <span className="text-xs uppercase font-bold tracking-widest text-green-500 font-sans">System Active</span>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-8 mb-16 border-b border-white/10 pb-12">
                        <div className="w-16 h-16 rounded-full border-2 border-gold/20 flex items-center justify-center">
                           <LayoutDashboard className="w-8 h-8 text-gold" />
                        </div>
                        <div>
                           <h4 className="text-xl font-bold uppercase tracking-wider mb-2 font-display font-bold">PROJECT_DASHBOARD</h4>
                           <p className="text-xs text-paper/40 font-mono italic">ID: BLX-REC-7201-B</p>
                        </div>
                     </div>

                     <div className="space-y-12">
                        <div>
                           <div className="flex justify-between items-end mb-4">
                              <span className="text-xs uppercase font-bold tracking-widest opacity-30 font-sans">Project Health</span>
                              <span className="text-4xl font-display font-bold text-gold">87.2%</span>
                           </div>
                           <div className="h-1 bg-white/5 w-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: '87.2%' }} transition={{ duration: 2 }} className="h-full bg-gold" />
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                           <div className="bg-white/5 p-6 border border-white/5">
                              <span className="text-xs uppercase font-bold tracking-widest opacity-20 block mb-2 font-sans">Project Risks</span>
                              <span className="text-xl font-bold text-gold font-sans uppercase font-bold tracking-widest italic opacity-60">None Detected</span>
                           </div>
                           <div className="bg-white/5 p-6 border border-white/5">
                              <span className="text-xs uppercase font-bold tracking-widest opacity-20 block mb-2 font-sans">Progress Speed</span>
                              <span className="text-xl font-bold text-gold font-sans font-bold italic opacity-60">HIGH</span>
                           </div>
                        </div>
                     </div>

                     <div className="mt-16 pt-12 border-t border-white/10 flex gap-4 items-center">
                        <ShieldCheck className="w-5 h-5 text-gold/30" />
                        <p className="text-xs uppercase tracking-widest font-bold text-paper/20 font-sans">Expert oversight maintained for your project.</p>
                     </div>
                  </div>
               </div>
            </div>
          </motion.section>
        )}

        {/* SCREEN 9, 10: TRANSITION TO ASSURE™ */}
        {(screen === 8 || screen === 9) && (
          <motion.section 
            key="screen89"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="min-h-screen py-40 flex items-center bg-white overflow-hidden text-ink"
          >
            <div className="max-w-6xl mx-auto px-6 text-center w-full">
               <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-12 block font-sans tracking-widest">Phase Locking</span>
               <h2 className="text-6xl md:text-[100px] font-display font-bold uppercase tracking-tighter leading-none mb-12">
                  Selecting the right developer <br />
                  <span className="text-gold italic font-serif font-light lowercase">is not success.</span>
               </h2>
               <p className="text-2xl font-serif italic font-light text-ink/60 mb-20 max-w-2xl mx-auto leading-relaxed">
                  Most projects fail <span className="text-ink not-italic font-bold">after selection.</span> SHIELD™ fixes the first mistake; ASSURE™ prevents the second.
               </p>

               <div className="grid md:grid-cols-2 bg-zinc-900 shadow-2xl relative">
                  <div className="absolute inset-y-0 left-1/2 w-px bg-white/10 hidden md:block" />
                  <div className="p-16 text-left border-b md:border-b-0 border-white/5">
                     <div className="flex items-center gap-4 mb-8">
                        <div className="px-3 py-1 bg-gold text-ink text-xs font-black uppercase tracking-widest font-sans">SHIELD™</div>
                        <span className="text-xs uppercase font-bold text-paper/40 font-sans tracking-widest">Pre-project Control</span>
                     </div>
                     <h3 className="text-2xl font-display font-bold text-paper uppercase tracking-tight mb-8">Fixes Selection</h3>
                     <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-paper/30 font-sans">
                        <li className="flex items-center gap-4"><CheckCircle2 className="w-3 h-3 text-gold" /> Governance Stabilization</li>
                        <li className="flex items-center gap-4"><CheckCircle2 className="w-3 h-3 text-gold" /> Validation Engine</li>
                        <li className="flex items-center gap-4"><CheckCircle2 className="w-3 h-3 text-gold" /> Controlled Selection</li>
                     </ul>
                  </div>
                  <div className="p-16 text-left bg-zinc-950">
                     <div className="flex items-center gap-4 mb-8">
                        <div className="px-3 py-1 bg-white/10 text-gold text-xs font-black uppercase tracking-widest font-sans">ASSURE™</div>
                        <span className="text-xs uppercase font-bold text-paper/40 font-sans tracking-widest">Project-Life Control</span>
                     </div>
                     <h3 className="text-2xl font-display font-bold text-paper uppercase tracking-tight mb-8">Controls Execution</h3>
                     <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-paper/30 font-sans">
                        <li className="flex items-center gap-4"><CheckCircle2 className="w-3 h-3 text-gold" /> Daily Build Control</li>
                        <li className="flex items-center gap-4"><CheckCircle2 className="w-3 h-3 text-gold" /> Real-time Audit</li>
                        <li className="flex items-center gap-4"><CheckCircle2 className="w-3 h-3 text-gold" /> Risk Suppression</li>
                     </ul>
                  </div>
               </div>

               <div className="mt-20 group cursor-pointer" onClick={next}>
                  <p className="text-3xl md:text-4xl font-serif italic text-ink mb-12">
                    “SHIELD™ prevents the first mistake. <br />
                    <span className="text-gold">ASSURE™ prevents the second.”</span>
                  </p>
                  <button className="text-xs uppercase tracking-[0.6em] font-bold text-gold/40 group-hover:text-gold transition-all animate-pulse font-sans">Proceed to Final Close</button>
               </div>
            </div>
          </motion.section>
        )}

        {/* SCREEN 11, 12: FINAL CONTROL & CTA */}
        {(screen === 10 || screen === 11) && (
          <motion.section 
            key="screen1011"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="min-h-screen py-40 flex items-center bg-zinc-950 text-paper text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 grid-bg opacity-[0.05]" />
            <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
               <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 className="space-y-24"
               >
                  <h2 className="text-7xl md:text-9xl font-display font-bold uppercase tracking-tighter leading-none mb-12">
                     Do not restart <br />
                     <span className="italic font-serif font-light text-gold text-5xl md:text-9xl lowercase block mt-8 leading-none">redevelopment.</span>
                  </h2>

                  <p className="text-3xl md:text-5xl font-serif font-light italic text-paper/70 leading-relaxed max-w-3xl mx-auto border-y border-white/10 py-16">
                    “Rebuild the <br />
                    <span className="text-paper not-italic font-bold">decision system first.”</span>
                  </p>

                  <div className="flex flex-col items-center gap-12 mt-24">
                     <div className="grid md:grid-cols-3 gap-1 bg-white/10 p-1 w-full max-w-5xl">
                        {[
                          { t: "Start Recovery Sequence", icon: RefreshCw },
                          { t: "Run Diagnostic", icon: Search },
                          { t: "View 120-Day Plan", icon: FileText }
                        ].map((cta, i) => (
                          <button 
                            key={i}
                            onClick={() => onNavigate('situation')}
                            className="bg-zinc-950 p-10 hover:bg-gold hover:text-ink transition-all group flex flex-col items-center justify-center gap-6"
                          >
                             <cta.icon className="w-8 h-8 text-gold/60 group-hover:text-ink transition-colors" />
                             <span className="text-xs uppercase tracking-[0.5em] font-bold font-sans h-10 flex items-center text-center">{cta.t}</span>
                             <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                          </button>
                        ))}
                     </div>
                     <span className="text-xs uppercase tracking-[0.8em] font-bold text-white/20 mt-12 font-sans tracking-widest leading-none">SHIELD™ Intervention Complete</span>
                  </div>
               </motion.div>
            </div>
            
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 opacity-[0.02] pointer-events-none select-none">
               <span className="text-[300px] font-display font-bold uppercase">SHIELD</span>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

function ArrowLeft(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}
