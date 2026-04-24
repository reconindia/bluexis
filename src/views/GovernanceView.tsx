/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Shield, Scale, Gavel, FileText, CheckCircle2, Lock, Users, Briefcase } from 'lucide-react';

export default function GovernanceView() {
  const principles = [
    {
      title: "Expert Independence",
      icon: Scale,
      desc: "Bluexis™ maintains total structural independence from developers to ensure member interest is protected without bias."
    },
    {
      title: "Decision Protection",
      icon: Shield,
      desc: "Every redevelopment stage is protected by the ASSURE™ system. No stage proceeds without verified alignment across all areas."
    },
    {
      title: "System Integrity",
      icon: Lock,
      desc: "Our system uses core structural rules. Decisions are modeled clearly, blocking interest-driven project drift."
    }
  ];

  const councilFeatures = [
    "Housing Policy Advisory",
    "Cooperative Legal Oversight",
    "Financial Feasibility Audit",
    "Structural Engineering Verification",
    "Technical Readiness Assessment",
    "Institutional Handover Protocol"
  ];

  return (
    <div className="flex flex-col scroll-smooth selection:bg-gold selection:text-ink">
      {/* Hero Section */}
      <section className="pt-40 pb-24 border-b border-line bg-paper relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold-dark uppercase tracking-[0.4em] font-bold text-xs mb-8 block font-sans tracking-widest">System Authority</span>
            <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-8xl leading-[1] md:leading-none tracking-tighter mb-12 text-ink">
              Terms of <br />
              <span className="font-serif italic font-light italic-text text-gold-dark">Management.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-ink max-w-2xl leading-relaxed italic font-serif">
              "Authority in redevelopment is measured through project stability and clear outcomes."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Principles Grid */}
      <section className="py-32 border-b border-line">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {principles.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="w-16 h-16 border border-line flex items-center justify-center mb-8 group-hover:bg-ink group-hover:text-paper transition-all">
                  <item.icon className="w-6 h-6 text-gold-dark group-hover:text-gold transition-colors" />
                </div>
                <h3 className="text-2xl font-bold font-display uppercase mb-6 tracking-tight">{item.title}</h3>
                <p className="text-lg font-light leading-relaxed italic text-ink">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Council Section */}
      <section className="py-40 bg-ink text-paper relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-8 block font-sans tracking-widest">The Experts</span>
              <h2 className="font-serif italic font-light text-4xl sm:text-5xl md:text-7xl leading-tight mb-12">
                Expert <br />
                <span className="not-italic font-display font-bold text-gold">Panel.</span>
              </h2>
              <p className="text-xl font-light text-paper mb-12 leading-relaxed font-sans">
                Bluexis™ is led by a multi-disciplinary panel of experts across housing policy, law, and engineering. This collective authority ensures the ASSURE™ System remains uncompromised.
              </p>
              <div className="grid grid-cols-2 gap-y-6">
                {councilFeatures.map((feature, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <CheckCircle2 className="w-4 h-4 text-gold" />
                    <span className="text-sm uppercase tracking-widest font-bold text-paper/40 italic font-sans">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-paper p-16 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-gold -translate-x-[-10px] -translate-y-[-10px]" />
              <h3 className="text-gold font-display font-bold text-xs uppercase tracking-[0.3em] mb-12 block font-sans tracking-widest">Expert Pillars</h3>
              <div className="space-y-12">
                {[
                  { t: "Ethics Protocol", d: "A zero-tolerance framework for project manipulation and hidden negotiations." },
                  { t: "Verification Checkpoints", d: "Mandatory system audits performed at every transition stage." },
                  { t: "Final Handover", d: "Stabilizing the legal and physical outcome until final completion." }
                ].map((item, i) => (
                  <div key={i} className="border-t border-ink/5 pt-8 first:border-0 first:pt-0 font-sans">
                    <h4 className="text-ink font-bold text-xl uppercase mb-4 tracking-tight">{item.t}</h4>
                    <p className="text-ink/80 text-sm font-light leading-relaxed italic font-serif">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ethics Map / Visual Element */}
      <section className="py-40 bg-paper grid-bg">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block p-4 border border-line mb-12">
             <Gavel className="w-12 h-12 text-gold opacity-30" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-12 leading-tight text-ink">
            The Ethics of <span className="font-serif italic font-light text-gold-dark">Expert Management.</span>
          </h2>
          <p className="text-lg font-light text-ink/60 leading-relaxed mb-6 uppercase tracking-widest italic italic-text font-serif">
            "Redevelopment is the reconstruction of lives and wealth. We treat it with expert precision and absolute institutional accountability."
          </p>
          <div className="h-px w-24 bg-gold mx-auto" />
        </div>
      </section>

      {/* Documentation Link / CTA */}
      <section className="py-24 border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white border border-line p-16 flex flex-col md:flex-row justify-between items-center gap-12">
             <div className="max-w-lg">
                <h3 className="font-display font-bold text-2xl uppercase tracking-tight mb-4">Request Management Pack</h3>
                <p className="text-sm font-light text-ink/80 uppercase tracking-widest leading-loose italic font-serif">
                   Project partners can request the full management framework including our assessment rules and ethical guidelines.
                </p>
             </div>
             <button className="bg-ink text-paper px-10 py-5 text-xs uppercase tracking-[0.4em] font-bold hover:bg-gold hover:text-ink transition-all font-sans">
                Download System v1.4
             </button>
          </div>
        </div>
      </section>
    </div>
  );
}
