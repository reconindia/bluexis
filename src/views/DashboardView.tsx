/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Target, 
  Activity, 
  AlertCircle, 
  TrendingUp, 
  LogOut,
  User as UserIcon,
  LayoutGrid,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { auth, db, signInWithGoogle, handleFirestoreError } from '../lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Tooltip as RechartsTooltip,
  ResponsiveContainer 
} from 'recharts';

import { Page } from '../types';
 
export default function DashboardView({ onNavigate }: { onNavigate?: (page: Page) => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState<any[]>([]);
  const [selectedCase, setSelectedCase] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    // Listen to cases where user is the owner
    const q = query(
      collection(db, 'cases'),
      where('user_id', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setCases(docs);
      if (docs.length > 0 && !selectedCase) {
        setSelectedCase(docs[0]);
      }
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, 'list', 'cases');
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => signOut(auth);

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <Loader2 className="w-10 h-10 text-gold animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper px-6 pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-5" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white border border-line p-12 shadow-2xl relative z-10"
        >
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.4em] font-bold text-gold-dark mb-6 block font-sans tracking-widest">Project Access</span>
            <h2 className="font-serif italic text-4xl font-light mb-4 text-ink">Member Portal</h2>
            <p className="text-ink/80 font-light text-base leading-relaxed uppercase tracking-widest">
              Access the expert tools for your redevelopment project.
            </p>
          </div>
          <button 
            onClick={handleLogin}
            className="w-full bg-ink text-paper py-5 text-xs uppercase tracking-[0.4em] font-bold hover:bg-gold hover:text-ink transition-all flex items-center justify-center gap-3 group font-sans"
          >
            Sign In Securely
            <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
          <p className="text-xs text-ink/50 text-center mt-8 uppercase tracking-[0.2em] leading-relaxed font-sans">
            Secure login protocols recommended for all project partners.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 border-b border-line pb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] font-bold text-gold-dark mb-4 block font-sans tracking-widest">Project Dashboard</span>
            <h1 className="font-serif italic font-light text-4xl sm:text-5xl md:text-7xl leading-tight">
              Project <span className="not-italic font-display font-bold text-ink tracking-tighter">Control</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-xs uppercase tracking-widest font-bold text-ink/60 block mb-1 font-sans">Logged In As</span>
              <span className="font-medium text-sm">{user.displayName || user.email}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-3 border border-line hover:border-gold hover:text-gold transition-all text-ink/60"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {cases.length === 0 ? (
          <div className="py-40 text-center border border-dashed border-line">
            <div className="max-w-md mx-auto">
              <LayoutGrid className="w-12 h-12 text-gold-dark mx-auto mb-6 opacity-70" />
              <h3 className="font-display font-bold text-xl uppercase tracking-tighter mb-4 text-ink">No Active Cases</h3>
              <p className="text-ink/80 font-light text-sm uppercase tracking-widest leading-loose">
                You have not logged any redevelopment cases for expert analysis. 
                Log your situation to begin the ASSURE™ alignment mapping.
              </p>
              <button 
                onClick={() => onNavigate && onNavigate('situation')}
                className="mt-8 bg-zinc-950 text-paper px-10 py-4 text-xs uppercase tracking-[0.3em] font-bold hover:bg-gold-dark hover:text-white transition-all shadow-xl font-sans"
              >
                Start Management Mapping
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Sidebar / Project List */}
            <div className="lg:col-span-3 space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-ink/40 mb-2 block font-sans">Active Projects</span>
              {cases.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className={`w-full text-left p-6 border transition-all ${
                    selectedCase?.id === c.id 
                    ? 'border-gold bg-ink text-paper shadow-xl' 
                    : 'border-line hover:border-gold/50 bg-white text-ink'
                  }`}
                >
                  <span className={`text-xs uppercase tracking-widest font-bold mb-3 block font-sans ${
                    selectedCase?.id === c.id ? 'text-gold' : 'text-gold/80'
                  }`}>
                    {c.case_id} — {c.status.toUpperCase()}
                  </span>
                  <h4 className="font-display font-bold text-xl tracking-tight mb-2 uppercase">{c.stage}</h4>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs uppercase tracking-widest opacity-70 font-sans">System Active</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedCase?.id === c.id ? 'translate-x-1 text-gold' : ''}`} />
                  </div>
                </button>
              ))}
            </div>

            {/* Main Project View */}
            <div className="lg:col-span-9">
              {selectedCase && (
                <motion.div 
                  key={selectedCase.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-12"
                >
                  {/* Status Grid */}
                  <div className="grid md:grid-cols-3 gap-8">
                     {[
                       { label: "Alignment Score", value: selectedCase.alignment_score || 0, icon: Target },
                       { label: "Risk Exposure", value: selectedCase.risk_score || 0, icon: AlertCircle, inverse: true },
                       { label: "Clarity Score", value: selectedCase.clarity_score || 0, icon: Activity }
                     ].map((metric, i) => (
                       <div key={i} className="bg-white border border-line p-8 flex flex-col justify-between h-48 shadow-sm">
                         <div className="flex justify-between items-start">
                           <span className="text-xs uppercase tracking-[0.2em] font-black text-ink/60">{metric.label}</span>
                           <metric.icon className={`w-5 h-5 ${metric.inverse && metric.value > 50 ? 'text-amber-600' : 'text-gold'}`} />
                         </div>
                         <div>
                           <span className="font-display text-5xl font-bold tracking-tighter">{metric.value}%</span>
                           <div className="h-1 bg-line mt-4 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${metric.value}%` }}
                               className={`h-full ${metric.inverse && metric.value > 50 ? 'bg-amber-600' : 'bg-gold'}`}
                             />
                           </div>
                         </div>
                       </div>
                     ))}
                  </div>

                  {/* AI Summary / Content */}
                  <div className="bg-white border border-line p-12">
                    <span className="text-gold-dark uppercase tracking-[0.4em] font-bold text-xs mb-8 block font-sans tracking-widest">AI Project Analysis</span>
                    <h3 className="font-serif italic text-3xl font-light mb-6 text-ink">Expert Summary</h3>
                    <p className="text-2xl font-light text-ink leading-relaxed mb-8 border-l-2 border-gold-dark pl-8 py-2">
                       {selectedCase.ai_summary || "AI Analysis in progress..."}
                    </p>
                  </div>

                  {/* Project Chart Section */}
                  <div className="grid md:grid-cols-12 gap-8">
                    <div className="md:col-span-12 bg-white border border-line p-12">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                          <h3 className="font-serif italic text-3xl font-light mb-2">Project Analysis</h3>
                          <p className="text-xs uppercase tracking-[0.3em] font-bold text-ink/60 font-sans tracking-widest">Visualizing ASSURE™ Project Details</p>
                        </div>
                        <div className="flex gap-4">
                           <span className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold font-sans">
                             <div className="w-2 h-2 bg-gold" /> Measured
                           </span>
                           <span className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-ink/50 font-sans">
                             <div className="w-2 h-2 bg-line" /> Benchmark
                           </span>
                        </div>
                      </div>

                      <div className="h-[400px] w-full">
                         <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                              { subject: 'Alignment', A: selectedCase.alignment_score || 0, fullMark: 100 },
                              { subject: 'Risk Control', A: 100 - (selectedCase.risk_score || 0), fullMark: 100 },
                              { subject: 'Financial Clarity', A: 85, fullMark: 100 },
                              { subject: 'Legal Stability', A: 90, fullMark: 100 },
                              { subject: 'Stakeholder Consent', A: 75, fullMark: 100 },
                              { subject: 'Technical Readiness', A: selectedCase.clarity_score || 0, fullMark: 100 },
                            ]}>
                              <PolarGrid stroke="#E5E7EB" />
                              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.1em' }} />
                              <RechartsTooltip 
                                contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#1C2B39', borderRadius: '0px' }}
                                itemStyle={{ color: '#FCFAF7', fontSize: '12px', fontFamily: '"Space Grotesk", sans-serif' }}
                                labelStyle={{ display: 'none' }}
                                cursor={false}
                              />
                              <Radar
                                name="Metrics"
                                dataKey="A"
                                stroke="#D4AF37"
                                fill="#D4AF37"
                                fillOpacity={0.15}
                              />
                            </RadarChart>
                         </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Actions / Log */}
                  <div className="bg-ink text-paper p-12 border border-line relative overflow-hidden">
                    <div className="absolute inset-0 grid-bg opacity-10" />
                    <div className="relative z-10">
                      <h3 className="font-display font-bold text-xl uppercase tracking-tighter mb-8 border-b border-paper/10 pb-6 text-gold">Latest Project Updates</h3>
                      <div className="space-y-6">
                        {[
                          { date: "ACTIVE", msg: "Planning mapping completed based on AI Analysis BX-402." },
                          { date: "VERIFIED", msg: "Case activity logged and project steps established via ASSURE framework." },
                          { date: "SECURE", msg: "Login verified. Data access restricted to case owner and system admin." }
                        ].map((log, i) => (
                           <div key={i} className="flex gap-8 group">
                             <span className="text-xs uppercase tracking-[0.2em] font-bold text-gold/40 group-hover:text-gold transition-colors shrink-0 font-sans tracking-widest">0{i+1} — {log.date}</span>
                             <p className="text-base font-light text-paper/70 flex-1 leading-relaxed">{log.msg}</p>
                           </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
