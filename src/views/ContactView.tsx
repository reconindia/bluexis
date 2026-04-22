/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Send, Phone, Mail, MapPin, Loader2, ShieldCheck } from 'lucide-react';
import { useState, FormEvent, useEffect } from 'react';
import { auth, signInWithGoogle } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { evaluateCase } from '../services/aiService';

export default function ContactView() {
  const [user, setUser] = useState<User | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    role: 'Society Member / Secretary',
    email: '',
    summary: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Identity verification required to log structural cases.");
      return;
    }
    setLoading(true);
    
    try {
      await evaluateCase(formData.summary, user.uid);
      setSubmitted(true);
    } catch (error) {
      console.error("Structural processing failure:", error);
      alert("The clinical evaluation engine encountered a structural error. Please try again or contact your Strategic Advisor.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen py-40 flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-paper border border-line p-16 text-center shadow-sm"
        >
          <div className="w-20 h-20 bg-ink rounded-full flex items-center justify-center mx-auto mb-8">
            <Send className="text-paper w-8 h-8" />
          </div>
          <h2 className="font-display text-4xl font-bold mb-4 font-serif italic italic-text tracking-tight">Case Logged</h2>
          <p className="text-ink/60 font-light mb-8">
            Your situation has been received. Our advisors will conduct a preliminary structural review and reach out within 48 hours.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="text-xs uppercase tracking-widest font-bold border-b border-ink/40 pb-1 hover:border-ink transition-colors"
          >
            Return to Homepage
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-20">
          <div className="md:col-span-5">
            <div className="sticky top-24">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/40 mb-4 block">Evaluation Inquiry</span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-8 text-gold leading-tight md:leading-normal">
                Tell Us Your <span className="font-serif italic font-light italic-text text-ink">Situation</span>
              </h1>
              <p className="text-xl font-light text-ink/60 leading-relaxed mb-12">
                Every Bluexis™ engagement begins with a clinical evaluation of the project's current structural state.
              </p>
              
              <div className="space-y-8">
                 {[
                   { icon: Mail, label: "Official Communications", value: "team@bluexis.com" },
                   { icon: Phone, label: "Direct Evaluation Line", value: "+91 8850879492" },
                   { icon: MapPin, label: "Headquarters", value: "303, Vimal Apartment, Daulat Nagar, Borivali (E), Mumbai, Maharashtra, 400066" }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4">
                     <div className="w-10 h-10 border border-line flex items-center justify-center shrink-0">
                       <item.icon className="w-4 h-4 text-gold" />
                     </div>
                     <div>
                       <span className="text-[10px] uppercase tracking-widest font-bold text-ink/30 block mb-1">{item.label}</span>
                       <span className="font-medium text-sm">{item.value}</span>
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-7 bg-white p-12 shadow-sm border border-line">
            {!user ? (
              <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                <ShieldCheck className="w-16 h-16 text-gold mb-8 opacity-20" />
                <h2 className="font-serif italic text-3xl font-light mb-4">Identity Required</h2>
                <p className="text-ink/60 font-light text-sm uppercase tracking-widest leading-loose mb-10 max-w-sm">
                  To maintain structural integrity and link evaluations to institutional accounts, you must authenticate your identity.
                </p>
                <button 
                  onClick={handleLogin}
                  className="bg-ink text-paper px-12 py-5 text-[10px] uppercase tracking-[0.4em] font-black hover:bg-gold hover:text-ink transition-all shadow-xl"
                >
                  Verify via Google
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-ink/40 block">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full border-b border-line py-3 outline-none focus:outline-none focus:ring-0 focus:border-gold transition-colors bg-transparent font-light disabled:opacity-30 disabled:cursor-not-allowed" 
                    placeholder="e.g. David Sterling" 
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-ink/40 block">Your Role</label>
                  <select 
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full border-b border-line py-3 outline-none focus:outline-none focus:ring-0 focus:border-gold transition-colors bg-transparent font-light disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    <option>Society Member / Secretary</option>
                    <option>PMC Lead</option>
                    <option>Developer Representative</option>
                    <option>Legal Professional</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-ink/40 block">Contact Email (Official)</label>
                <input 
                  required 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border-b border-line py-3 outline-none focus:outline-none focus:ring-0 focus:border-gold transition-colors bg-transparent font-light disabled:opacity-30 disabled:cursor-not-allowed" 
                  placeholder="official@organization.com" 
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-ink/40 block">Project Stage / Situation Summary</label>
                <textarea 
                  required
                  rows={6}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full border border-line p-4 outline-none focus:outline-none focus:ring-0 focus:border-gold transition-colors bg-transparent font-light resize-none h-40 disabled:opacity-30 disabled:cursor-not-allowed" 
                  placeholder="Clearly define the current project state, stakeholder consensus, and primary blockage points."
                  disabled={loading}
                />
              </div>

              <div className="pt-8">
                <button 
                   type="submit"
                   disabled={loading}
                   className="w-full bg-ink text-paper py-5 text-xs uppercase tracking-[0.4em] font-bold hover:bg-gold hover:text-ink transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      Processing <Loader2 className="w-3 h-3 animate-spin" />
                    </>
                  ) : (
                    <>
                      Request Evaluation 
                      <Send className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
                <p className="text-[9px] text-ink/30 text-center mt-6 uppercase tracking-widest leading-loose">
                  Submission does not guarantee engagement. Bluexis™ accepts cases strictly where structural alignment is feasible.
                </p>
              </div>
            </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
