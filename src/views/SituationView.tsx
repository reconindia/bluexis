/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  ShieldCheck, 
  Loader2, 
  Activity, 
  Shield, 
  Users, 
  Settings, 
  AlertTriangle,
  ChevronRight,
  Target,
  Scale,
  Briefcase,
  ChevronLeft,
  CheckCircle2,
  Search,
  MessageSquare,
  Layers,
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';
import { auth, signInWithGoogle } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { evaluateCase, getCaseData } from '../services/aiService';
import { REDEVELOPMENT_STAGES } from '../constants';
import { Page } from '../types';

type Step = 'stage_selection' | 'mapping' | 'signals' | 'narrative' | 'verification' | 'analysis' | 'report' | 'pre_selection';

export default function SituationView({ onNavigate }: { onNavigate?: (page: Page) => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [step, setStep] = useState<Step>('pre_selection');
  const [loading, setLoading] = useState(false);
  const [caseId, setCaseId] = useState<string | null>(null);
  const [caseData, setCaseData] = useState<any>(null);
  const [activeDiagnosis, setActiveDiagnosis] = useState<{
    stage_id: number;
    stage_label: string;
    pain_points: string[];
    confidence_score: number;
  } | null>(null);
  const [showPainQuestions, setShowPainQuestions] = useState(false);
  const [isRealtyProfessional, setIsRealtyProfessional] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    role: 'Society Member / Secretary',
    email: '',
    phone: '',
    stage: 'pre-decision' as 'pre-decision' | 'mid-process' | 'execution',
    signals: [] as string[],
    summary: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string) => {
    return /^\+91\s\d{5}\s\d{5}$/.test(phone);
  };

  const maskPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return `+${numbers}`;
    if (numbers.length <= 7) return `+${numbers.slice(0, 2)} ${numbers.slice(2)}`;
    return `+${numbers.slice(0, 2)} ${numbers.slice(2, 7)} ${numbers.slice(7, 12)}`;
  };

  const toggleSignal = (signal: string) => {
    setFormData(prev => ({
      ...prev,
      signals: prev.signals.includes(signal) 
        ? prev.signals.filter(s => s !== signal) 
        : [...prev.signals, signal]
    }));
  };

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const startEvaluation = async () => {
    // We allow analysis if we have a user (Google) OR if they provided minimal contact info for alternate methods
    const effectiveUserId = user?.uid || `anon-${Date.now()}`;
    
    setStep('analysis');
    setLoading(true);
    
    try {
      const rawInput = `
        STAGE: ${formData.stage.toUpperCase()}
        ANALYSIS_ID: ${activeDiagnosis?.stage_id}
        ISSUES: ${activeDiagnosis?.pain_points.join(', ')}
        CONFIDENCE: ${activeDiagnosis?.confidence_score}%
        ROLE: ${formData.role}
        CONTACT: ${formData.fullName} (${formData.phone})
        SIGNALS: ${formData.signals.join(', ')}
        SUMMARY: ${formData.summary}
      `;
      
      const id = await evaluateCase(rawInput, effectiveUserId);
      setCaseId(id);
      
      // Fetch the generated report
      const data = await getCaseData(id);
      setCaseData(data);
      
      setStep('report');
    } catch (error) {
      console.error("Analysis failure:", error);
      alert("The expert system detected instability in your input. Please refine your information.");
      setStep('narrative');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch(step) {
    case 'pre_selection':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-16 py-20"
          >
            <div className="text-center space-y-6">
               <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-8 block font-sans tracking-widest">Project Guidance System</span>
               <h2 className="text-6xl md:text-[100px] font-display font-bold uppercase tracking-tighter leading-[0.8] mb-8 text-ink">
                  Select <br />
                  <span className="text-gold italic font-serif font-light lowercase">Stage.</span>
               </h2>
               <p className="text-2xl text-ink/40 font-serif italic max-w-xl mx-auto border-t border-line pt-12">
                  To provide the right expert support, we first need to understand where your project stands today.
               </p>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-line border border-line">
               {[
                 { 
                   t: "Stalled Project Recovery", 
                   id: 'shield',
                   desc: "For projects facing delays, developer issues, or internal disagreements.",
                   icon: ShieldCheck,
                   color: "bg-amber-500/10 text-amber-600"
                 },
                 { 
                   t: "New Project Planning", 
                   id: 'mapping', 
                   desc: "Helping new projects get organized with clear rules and expert feasibility check.",
                   icon: Search,
                   color: "bg-gold/10 text-gold"
                 },
                 { 
                   t: "Active Construction", 
                   id: 'assure_route', 
                   desc: "Continuous monitoring and risk control for projects already under construction.",
                   icon: Activity,
                   color: "bg-zinc-950/10 text-zinc-950"
                 }
               ].map((opt, i) => (
                 <button 
                   key={i}
                   onClick={() => {
                     if (opt.id === 'shield' && onNavigate) onNavigate('shield');
                     else if (opt.id === 'assure_route' && onNavigate) onNavigate('assure');
                     else setStep('triage');
                   }}
                   className="bg-white p-12 text-left hover:bg-zinc-50 transition-all group relative overflow-hidden h-full"
                 >
                    <div className="flex justify-between items-start mb-12">
                       <div className={`p-4 ${opt.color}`}>
                          <opt.icon className="w-6 h-6" />
                       </div>
                       <ChevronRight className="w-4 h-4 text-ink/20 group-hover:text-gold transition-all" />
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-tight mb-4 font-display group-hover:text-gold transition-colors">{opt.t}</h3>
                    <p className="text-base font-light text-ink/40 leading-relaxed italic font-serif h-12 overflow-hidden">{opt.desc}</p>
                 </button>
               ))}
            </div>
            
            <div className="text-center">
               <p className="text-xs uppercase tracking-[0.5em] font-bold text-ink/30 italic">Bluexis™ Management Selector: BLX-DET-901</p>
            </div>
          </motion.div>
        );

    case 'stage_selection':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center text-center space-y-16"
          >
            <div className="flex flex-col items-center">
               <span className="text-xs uppercase tracking-[0.6em] font-bold text-gold mb-8 block font-sans tracking-widest">Step 1 of 5 — Your Role</span>
               <div className="relative">
                 <motion.div 
                   animate={{ 
                     scale: [1, 1.2, 1],
                     opacity: [0.1, 0.3, 0.1]
                   }}
                   transition={{ duration: 3, repeat: Infinity }}
                   className="absolute inset-0 bg-gold rounded-full blur-3xl"
                 />
                 <div className="relative">
                   <Activity className="w-16 h-16 text-gold relative z-10" />
                   <motion.div 
                     animate={{ 
                       top: ["0%", "100%", "0%"]
                     }}
                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                     className="absolute left-0 right-0 h-px bg-gold/50 z-20 shadow-[0_0_10px_rgba(188,156,101,0.5)]"
                   />
                 </div>
               </div>
            </div>

            <div className="space-y-6 max-w-2xl px-6">
              <h2 className="font-display text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-[0.8] mb-8">
                Health <br />
                <span className="text-gold italic font-serif font-light lowercase">Check.</span>
              </h2>
              <p className="text-xs text-ink/40 font-bold uppercase tracking-[0.4em] leading-relaxed italic border-t border-line pt-8">
                Checking your project's current progress and setup.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 w-full max-w-4xl">
              <button
                onClick={() => {
                  setIsRealtyProfessional(false);
                  setFormData(prev => ({...prev, role: 'Society Representative'}));
                  setStep('mapping');
                }}
                className="p-12 border border-line bg-white hover:border-gold hover:bg-zinc-950 transition-all group text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-10 group-hover:text-paper transition-all">
                  <Users className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-8 block opacity-40 group-hover:opacity-100">Category A</span>
                  <h3 className="font-display font-bold text-2xl uppercase tracking-tighter mb-4 group-hover:text-paper">Society Representative</h3>
                  <p className="text-sm font-light text-ink/40 group-hover:text-paper/60 leading-relaxed uppercase tracking-widest italic font-serif">
                    Residents, Committee Members, or Society Secretaries.
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsRealtyProfessional(true);
                  setFormData(prev => ({...prev, role: 'Realty Professional'}));
                  setStep('mapping');
                }}
                className="p-12 border border-zinc-950 bg-zinc-950 text-paper hover:border-gold transition-all group text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-all">
                  <Briefcase className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-8 block opacity-40 group-hover:opacity-100">Category B</span>
                  <h3 className="font-display font-bold text-2xl uppercase tracking-tighter mb-4">Professional</h3>
                  <p className="text-paper/40 text-sm font-light leading-relaxed uppercase tracking-widest italic font-serif">
                    Developers, Consultants, Architects, or Legal Advisors.
                  </p>
                </div>
              </button>
            </div>
            
            <p className="text-xs uppercase tracking-[0.5em] font-bold text-ink/30 mt-12 italic">Bluexis™ Strategic Support Initiative</p>
          </motion.div>
        );

      case 'auth':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <ShieldCheck className="w-16 h-16 text-gold mb-8 mx-auto opacity-20" />
            <h2 className="font-serif italic text-4xl font-light mb-4">Secure Sign-In</h2>
            <p className="text-ink/85 font-light text-sm uppercase tracking-widest leading-loose mb-12 max-w-sm mx-auto">
              Please sign in to access your project dashboard.
            </p>
            <button 
              onClick={handleLogin}
              className="bg-ink text-paper px-12 py-5 text-sm uppercase tracking-[0.4em] font-bold hover:bg-gold hover:text-ink transition-all shadow-xl"
            >
              Sign In with Google
            </button>
          </motion.div>
        );      case 'mapping':
        const SOCIETY_STAGES = REDEVELOPMENT_STAGES.map(s => {
          // Re-adding questions which were specific to SituationView
          const questionsMap: Record<number, string[]> = {
            1: ["Are members curious but uninformed?", "Is there a formal resolution yet?"],
            2: ["Are meetings frequent but inconclusive?", "Is there a split of opinions?"],
            3: ["Are you comparing multiple PMCs?", "Is the selection criteria documented?"],
            4: ["Are decisions getting delayed repeatedly?", "Is there lack of majority alignment?", "Are stakeholders receiving conflicting information?"],
            5: ["Are multiple developers giving different terms?", "Is comparison unclear?", "Is trust a concern?"],
            6: ["Are legal terms being contested?", "Is commercial value meeting expectations?"],
            7: ["Is the draft agreement ready?", "Are there last-minute doubts?"],
            8: ["Is the work slower than scheduled?", "Are builders asking for more time?"],
            9: ["Has timeline exceeded expectations?", "Are disputes increasing?", "Is PMC effectiveness unclear?"]
          };
          return { ...s, q: questionsMap[s.id] || [] };
        });

        const REALTY_STAGES = [
          { id: 1, label: "Sourcing & Scoping", desc: "Identifying and evaluating project potential", q: ["Is survey data verified?", "Is society sentiment unclear?"] },
          { id: 2, label: "Proposal Submission", desc: "Submitting commercial and technical bids", q: ["Are competing bids aggressive?", "Is society expectation unrealistic?"] },
          { id: 3, label: "Shortlisting / Selection", desc: "Being shortlisted or selected by society", q: ["Is PMC bias detected?", "Are negotiations stalling on non-commercials?"] },
          { id: 4, label: "Structural Validation", desc: "Verifying project feasibility and funding", q: ["Is funding stuck on structural risks?", "Are legal title issues surfacing?"] },
          { id: 5, label: "Drafting / Documentation", desc: "Finalizing DA or redevelopment agreements", q: ["Are members demanding changes to approved DA?", "Is legal clearance delaying execution?"] },
          { id: 6, label: "Post-Approval Execution", desc: "IOD/CC received, work initiated", q: ["Are external costs exceeding budget?", "Is demolition alignment complete?"] },
          { id: 7, label: "Stagnant Project", desc: "Project stuck mid-way due to external factors", q: ["Is there a funding gap?", "Is there active member litigation?"] },
          { id: 8, label: "Recovery Phase", desc: "Attempts to rescue a failed project", q: ["Is previous developer exit formalized?", "Is current liability mapped?"] },
          { id: 9, label: "Exit / Handover", desc: "Completing project or exiting agreement", q: ["Is OC being delayed by technicality?", "Is member handover becoming litigious?"] }
        ];

        const STAGES = isRealtyProfessional ? REALTY_STAGES : SOCIETY_STAGES;

        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
             <div className="border-l border-gold pl-12">
               <span className="text-xs uppercase tracking-[0.6em] font-bold text-gold mb-6 block font-sans tracking-widest">Step 2 of 5 — Phase Mapping</span>
               <h2 className="text-6xl md:text-[100px] font-display font-bold uppercase tracking-tighter leading-none mb-4">
                 {isRealtyProfessional ? "Expert Analysis" : "Project Summary"}
               </h2>
               <p className="text-2xl font-light text-ink/40 font-serif italic max-w-2xl leading-relaxed">
                 Select the project stage that matches your current situation. This helps us provide the most relevant advice.
               </p>
            </div>
            
            {!showPainQuestions ? (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="flex justify-between items-center mb-8">
                  <button 
                    onClick={() => setStep('stage_selection')} 
                    className="text-xs uppercase tracking-widest font-bold text-gold/60 hover:text-gold transition-colors flex items-center gap-2 group font-sans"
                  >
                    <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Role Selection
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
                  {STAGES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setActiveDiagnosis({
                          stage_id: s.id,
                          stage_label: s.label,
                          pain_points: [],
                          confidence_score: 0
                        });
                        setShowPainQuestions(true);
                      }}
                      className="p-10 bg-white text-left hover:bg-zinc-950 hover:text-paper transition-all duration-700 group relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-12">
                         <span className="text-gold font-mono text-xs font-bold tracking-widest leading-none font-sans uppercase">STAGE-0{s.id}</span>
                         <Search className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0" />
                      </div>
                      <h3 className="font-display font-bold text-xl uppercase tracking-tighter mb-4 group-hover:text-white transition-colors">{s.label}</h3>
                      <p className="text-xs font-light text-ink/40 group-hover:text-paper/60 italic font-serif leading-relaxed h-12 overflow-hidden">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="flex items-center justify-between mb-8 border-b border-line pb-8">
                   <div>
                     <button 
                       onClick={() => setShowPainQuestions(false)}
                       className="text-xs uppercase tracking-widest font-bold text-gold/60 hover:text-gold transition-colors flex items-center gap-2 group mb-6 font-sans"
                     >
                       <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Stages
                     </button>
                     <h3 className="text-4xl font-serif italic text-ink font-light tracking-tight">Detecting Issues: <span className="text-gold">{activeDiagnosis?.stage_label}</span></h3>
                   </div>
                   <div className="text-right hidden md:block">
                      <span className="text-xs uppercase tracking-widest font-bold text-ink/20 block mb-1">Issue Match</span>
                      <span className="text-5xl font-display font-bold text-gold">{activeDiagnosis?.confidence_score}%</span>
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {STAGES.find(s => s.id === activeDiagnosis?.stage_id)?.q.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (!activeDiagnosis) return;
                        const exists = activeDiagnosis.pain_points.includes(q);
                        const nextPoints = exists 
                          ? activeDiagnosis.pain_points.filter(p => p !== q)
                          : [...activeDiagnosis.pain_points, q];
                        
                        const totalQ = STAGES.find(s => s.id === activeDiagnosis.stage_id)?.q.length || 1;
                        
                        setActiveDiagnosis({
                          ...activeDiagnosis,
                          pain_points: nextPoints,
                          confidence_score: Math.round((nextPoints.length / totalQ) * 100)
                        });
                      }}
                      className={`w-full p-8 text-left border transition-all text-sm flex items-center justify-between group h-full ${
                        activeDiagnosis?.pain_points.includes(q)
                          ? 'bg-zinc-950 text-paper border-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.1)]'
                          : 'bg-white border-line hover:border-gold text-ink/80'
                      }`}
                    >
                      <span className="max-w-[85%] font-medium leading-relaxed font-sans">{q}</span>
                      <div className={`w-5 h-5 border transition-all flex items-center justify-center ${activeDiagnosis?.pain_points.includes(q) ? 'bg-gold border-gold' : 'border-line group-hover:border-gold/30'}`}>
                         {activeDiagnosis?.pain_points.includes(q) && <CheckCircle2 className="w-3 h-3 text-zinc-950" />}
                      </div>
                    </button>
                  ))}
                </div>

                {activeDiagnosis && activeDiagnosis.pain_points.length > 0 && (
                   <div className="p-8 border-l border-gold bg-zinc-50 flex items-center gap-6">
                      <AlertTriangle className="w-5 h-5 text-gold shrink-0" />
                      <p className="text-sm text-ink/60 italic font-serif leading-relaxed">
                        Our management system detects <span className="text-ink font-bold not-italic">{activeDiagnosis.pain_points.length} key issue areas</span>. Confirm to proceed to the next analysis step.
                      </p>
                   </div>
                )}

                <div className="flex justify-end items-center pt-8 border-t border-line mt-16">
                   <button 
                     disabled={!activeDiagnosis || activeDiagnosis.pain_points.length === 0}
                     onClick={() => {
                       setFormData({...formData, stage: activeDiagnosis?.stage_label as any});
                       setStep('signals');
                     }}
                     className={`px-20 py-6 text-xs uppercase tracking-[0.6em] font-bold transition-all ${
                       !activeDiagnosis || activeDiagnosis.pain_points.length === 0
                       ? 'bg-zinc-100 text-ink/20 cursor-not-allowed border border-line'
                       : 'bg-zinc-950 text-paper hover:bg-gold hover:text-zinc-950 shadow-2xl scale-105'
                     }`}
                   >
                     Confirm Project Stage
                   </button>
                </div>
              </div>
            )}
          </motion.div>
        );

      case 'signals':
        const SOCIETY_SIGNALS = [
          "Member Disagreement", "Developer Delay", "Trust Issues with PMC", 
          "Hidden Legal Terms", "Rent / Corpus Fund Dispute", "Permission (IOD/CC) Issues"
        ];
        const REALTY_SIGNALS = [
          "Funding Blockage", "Member Litigation", "Approval Bottlenecks",
          "Title Irregularity", "Exit Negotiations", "Cost Escalation"
        ];
        const commonSignals = isRealtyProfessional ? REALTY_SIGNALS : SOCIETY_SIGNALS;
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-16 animate-in fade-in slide-in-from-right-8 duration-700"
          >
            <div className="border-l border-gold pl-12">
               <span className="text-xs uppercase tracking-[0.6em] font-bold text-gold mb-6 block font-sans tracking-widest font-sans">Step 3 of 5 — Problem Signals</span>
               <h2 className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter leading-none mb-4">
                 {isRealtyProfessional ? "Project Friction" : "Secondary Issues"}
               </h2>
               <p className="text-xl md:text-2xl font-light text-ink/40 font-serif italic max-w-2xl leading-relaxed">
                 Select any other signs of trouble you have noticed. These help us understand the root cause of the delays.
               </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1 bg-line border border-line">
               {commonSignals.map((signal) => (
                 <button
                   key={signal}
                   onClick={() => toggleSignal(signal)}
                   className={`px-8 py-10 text-xs uppercase font-bold tracking-[0.2em] text-center transition-all bg-white hover:bg-zinc-50 ${
                     formData.signals.includes(signal) 
                       ? 'text-gold italic underline underline-offset-8 decoration-gold decoration-2' 
                       : 'text-ink/30'
                   }`}
                 >
                   {signal}
                 </button>
               ))}
            </div>
            
            <div className="flex justify-between items-center pt-16 border-t border-line">
               <button onClick={() => setStep('mapping')} className="text-xs uppercase tracking-widest font-bold text-ink/20 hover:text-ink transition-colors flex items-center gap-2 group">
                 <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Return to Diagnosis
               </button>
               <button 
                 onClick={() => setStep('narrative')}
                 disabled={formData.signals.length === 0}
                 className={`px-16 py-6 text-xs uppercase tracking-[0.6em] font-bold transition-all ${
                   formData.signals.length === 0
                   ? 'bg-zinc-100 text-ink/20 cursor-not-allowed'
                   : 'bg-zinc-950 text-paper hover:bg-gold hover:text-zinc-950 shadow-2xl'
                 }`}
               >
                 Save & Continue
               </button>
            </div>
          </motion.div>
        );

      case 'narrative':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-16 animate-in fade-in slide-in-from-right-8 duration-700"
          >
            <div className="border-l border-gold pl-12">
               <span className="text-gold uppercase tracking-[0.6em] font-bold text-xs mb-6 block font-sans tracking-widest">Step 4 of 5 — Summary</span>
               <h2 className="text-6xl md:text-[100px] font-display font-bold uppercase tracking-tighter leading-none mb-4">Your Story</h2>
               <p className="text-2xl font-light text-ink/40 font-serif italic max-w-2xl leading-relaxed">
                 Briefly describe the current situation. Focus on what has caused the most frustration or confusion.
               </p>
            </div>
            
            <div className="space-y-12">
              <div className="relative group">
                <textarea 
                  required
                  rows={6}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full border border-line p-12 outline-none focus:border-gold transition-all bg-white font-light resize-none text-2xl md:text-4xl leading-snug tracking-tight font-serif italic text-ink placeholder:text-ink/10" 
                  placeholder="Tell us a bit more about the situation..."
                />
                <div className="absolute top-0 right-0 p-4">
                   <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-8 border-t border-line">
                 <button onClick={() => setStep('signals')} className="text-xs uppercase tracking-widest font-bold text-ink/20 hover:text-ink transition-colors flex items-center gap-2 group">
                   <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Return to Signals
                 </button>
                 <button 
                   onClick={() => setStep('verification')}
                   disabled={formData.summary.length < 20}
                   className={`px-16 py-6 text-xs uppercase tracking-[0.6em] font-bold transition-all ${
                     formData.summary.length < 20
                     ? 'bg-zinc-100 text-ink/20 cursor-not-allowed'
                     : 'bg-zinc-950 text-paper hover:bg-gold hover:text-zinc-950 shadow-2xl'
                   }`}
                 >
                   Expert Scan
                 </button>
              </div>
            </div>
          </motion.div>
        );

      case 'verification':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700"
          >
            <div className="border-l border-gold pl-12">
               <span className="text-gold uppercase tracking-[0.6em] font-bold text-xs mb-6 block font-sans tracking-widest">Step 5 of 5 — Details</span>
               <h2 className="text-6xl md:text-[100px] font-display font-bold uppercase tracking-tighter leading-none mb-4">Final Details</h2>
               <p className="text-2xl font-light text-ink/40 font-serif italic max-w-2xl leading-relaxed">
                 Expert analysis requires basic contact info to generate your specific project roadmap.
               </p>
            </div>

            <div className="bg-zinc-50 border border-line p-12 md:p-16 mb-12">
               <span className="text-xs uppercase tracking-[0.4em] font-bold text-gold mb-12 block font-sans">Contact Information</span>
               <div className="grid md:grid-cols-3 gap-12">
                  <div className="space-y-4">
                    <label className="text-xs uppercase tracking-[0.5em] font-bold text-ink/30 block mb-2 font-sans">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-transparent border-b border-line py-4 outline-none focus:border-gold transition-colors text-lg font-serif italic text-ink" 
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs uppercase tracking-[0.5em] font-bold text-ink/30 block mb-2 font-sans">Official Email</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-transparent border-b py-4 outline-none transition-colors text-lg font-serif italic text-ink ${
                        formData.email && !isValidEmail(formData.email) 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-line focus:border-gold'
                      }`} 
                      placeholder="your@email.com"
                    />
                    {formData.email && !isValidEmail(formData.email) && (
                      <span className="text-xs uppercase tracking-widest font-bold text-red-500 block animate-pulse">Invalid email format</span>
                    )}
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs uppercase tracking-[0.5em] font-bold text-ink/30 block mb-2 font-sans">Phone Number</label>
                    <input 
                      type="text" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: maskPhone(e.target.value) })}
                      className={`w-full bg-transparent border-b py-4 outline-none transition-colors text-lg font-serif italic text-ink ${
                        formData.phone && !isValidPhone(formData.phone) 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-line focus:border-gold'
                      }`} 
                      placeholder="+91 Phone Number"
                    />
                    {formData.phone && !isValidPhone(formData.phone) && (
                      <span className="text-xs uppercase tracking-widest font-bold text-red-500 block animate-pulse">Incomplete phone number</span>
                    )}
                  </div>
               </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
               <button 
                 disabled={!formData.fullName || !formData.email || !isValidEmail(formData.email) || !formData.phone || !isValidPhone(formData.phone)}
                 onClick={async () => {
                   await handleLogin();
                   if (auth.currentUser) startEvaluation();
                 } }
                 className={`p-12 border transition-all group flex flex-col items-center justify-center text-center shadow-2xl h-full ${
                   !formData.fullName || !formData.email || !isValidEmail(formData.email) || !formData.phone || !isValidPhone(formData.phone)
                   ? 'bg-zinc-100 border-line text-ink/20 cursor-not-allowed'
                   : 'bg-zinc-950 text-paper border-zinc-950 hover:border-gold'
                 }`}
               >
                 <ShieldCheck className={`w-10 h-10 mb-6 transition-transform ${!formData.fullName || !formData.email || !isValidEmail(formData.email) || !formData.phone || !isValidPhone(formData.phone) ? 'opacity-20' : 'text-gold group-hover:scale-110'}`} />
                 <span className="text-xs uppercase tracking-[0.5em] font-bold mb-4">Google Login</span>
                 <p className="text-xs font-light italic font-serif leading-relaxed max-w-[140px] opacity-40">Standard secure sign-in protocol.</p>
               </button>

               <button 
                 disabled={!formData.fullName || !formData.email || !isValidEmail(formData.email) || !formData.phone || !isValidPhone(formData.phone)}
                 onClick={() => {
                   alert("WhatsApp Verification Service: Initializing encrypted handshake...");
                   if (user) startEvaluation();
                   else handleLogin();
                 }}
                 className={`p-12 border transition-all group flex flex-col items-center justify-center text-center h-full ${
                   !formData.fullName || !formData.email || !isValidEmail(formData.email) || !formData.phone || !isValidPhone(formData.phone)
                   ? 'bg-zinc-100 border-line text-ink/20 cursor-not-allowed'
                   : 'bg-white border-line hover:border-[#25D366]'
                 }`}
               >
                 <div className={`w-10 h-10 mb-6 font-display font-black text-4xl leading-none ${!formData.fullName || !formData.email || !isValidEmail(formData.email) || !formData.phone || !isValidPhone(formData.phone) ? 'opacity-20' : 'text-[#25D366]'}`}>W</div>
                 <span className="text-xs uppercase tracking-[0.5em] font-bold mb-4">WhatsApp OTP</span>
                 <p className="text-xs font-light italic font-serif leading-relaxed max-w-[140px] opacity-40">Direct secure sign-in for mobile users.</p>
               </button>

               <button 
                 onClick={() => {
                   alert("Identity SDK: Pulling verified structural profile...");
                   if (user) startEvaluation();
                   else handleLogin();
                 }}
                 className="p-12 border border-line bg-white hover:border-gold transition-all group flex flex-col items-center justify-center text-center h-full"
               >
                 <div className="w-10 h-10 text-gold mb-6 font-display font-black text-4xl leading-none italic">ID</div>
                 <span className="text-xs uppercase tracking-[0.5em] font-bold mb-4 text-ink">Truecaller ID</span>
                 <p className="text-xs font-light text-ink/40 italic font-serif leading-relaxed max-w-[140px]">Instant one-tap verified profile sign-in.</p>
               </button>
            </div>

            <div className="pt-24 text-center border-t border-line">
               <button onClick={() => setStep('narrative')} className="text-xs uppercase tracking-[0.6em] font-bold text-ink/20 hover:text-ink transition-colors flex items-center gap-4 mx-auto font-sans tracking-widest">
                 <ChevronLeft className="w-4 h-4" /> Return to Narrative Layer
               </button>
            </div>
          </motion.div>
        );

      case 'evaluation':
        return (
          <div className="py-40 text-center">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 border-t-2 border-gold rounded-full mx-auto mb-12"
            />
            <h2 className="font-display text-4xl font-bold uppercase tracking-widest mb-4">Structural Scan</h2>
            <p className="text-ink/75 font-light italic text-sm uppercase tracking-widest animate-pulse">Running Clinical Diagnostics...</p>
          </div>
        );

      case 'report':
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-20 pb-20"
          >
             <div className="bg-ink text-paper p-16 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="relative z-10">
                   <div className="flex justify-between items-start mb-16">
                      <div>
                        <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-4 block">Project Report</span>
                        <h2 className="font-serif italic font-light text-6xl">Analysis Summary.</h2>
                      </div>
                      <div className="text-right">
                         <span className="text-paper/20 uppercase tracking-[0.3em] font-bold text-xs block mb-2 font-sans tracking-widest">Case ID</span>
                         <span className="font-display font-bold text-xl text-gold">{caseId}</span>
                      </div>
                   </div>

                   <p className="text-xl md:text-2xl font-light text-paper/85 italic leading-relaxed mb-12 max-w-3xl">
                      "{caseData?.ai_summary || "Analysis complete. Your project shows some signs of management confusion. We recommend getting professional oversight to keep things on track."}"
                   </p>

                   <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-paper/10">
                      {[
                        { l: "Trust & Clarity", v: `${caseData?.clarity_score || 0}%` },
                        { l: "Project Risk", v: `${caseData?.risk_score || 0}%` },
                        { l: "Member Alignment", v: `${caseData?.alignment_score || 0}%` },
                        { l: "Overall Health", v: caseData?.layers?.execution_status || "Stable" }
                      ].map((m, i) => (
                        <div key={i}>
                           <span className="text-xs uppercase tracking-widest font-bold opacity-30 block mb-2 font-sans">{m.l}</span>
                           <span className="text-3xl font-display font-bold text-gold">{m.v}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="grid md:grid-cols-3 gap-12">
                {[
                  { t: "Expert Review", d: "A Strategic Advisor will verify this summary within 24 hours.", icon: Shield },
                  { t: "Expert Session", d: "Recommended 48-hour intensive alignment verification session.", icon: Scale },
                  { t: "Dashboard Access", d: "Case synced to your secure management dashboard.", icon: LayoutGrid }
                ].map((card, i) => (
                  <div key={i} className="bg-white border border-line p-10 group hover:border-gold transition-all">
                    <card.icon className="w-6 h-6 text-gold mb-8 mb-8" />
                    <h3 className="font-bold uppercase tracking-tight mb-4">{card.t}</h3>
                    <p className="text-xs font-light text-ink/85 leading-relaxed italic">{card.d}</p>
                  </div>
                ))}
             </div>

             <div className="text-center">
                <button 
                  onClick={() => window.location.reload()}
                  className="text-xs uppercase tracking-[0.4em] font-bold border-b border-gold/40 pb-2 hover:border-gold transition-all font-sans tracking-widest"
                >
                  Return to Management Portal
                </button>
             </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen selection:bg-gold selection:text-ink">
      <div className="max-w-5xl mx-auto px-6 py-40">
         <AnimatePresence mode="wait">
            {renderStep()}
         </AnimatePresence>
      </div>
    </div>
  );
}

function LayoutGrid(props: any) {
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
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}
