import React from 'react';
import { motion } from 'motion/react';
import { TrendingDown, Activity } from 'lucide-react';
import { useFlowStore } from '../../store/useFlowStore';

export default function Output() {
  const { riskScore, confidence, diagnosis, next } = useFlowStore();

  return (
    <motion.div 
      key="output"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-xl mx-auto px-6 py-12 flex flex-col justify-center min-h-[80vh]"
    >
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4 text-gold">
          Diagnostic <span className="font-serif italic font-normal">Synthesis.</span>
        </h2>
        <p className="text-zinc-500 font-light italic leading-relaxed">
          The diagnostic engine has calibrated its findings. Please review the initial structural variances identified.
        </p>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-8 border border-zinc-900 bg-zinc-900/10">
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-600 block mb-2">Consolidated Risk Index</span>
            <div className="flex items-end gap-2">
              <span className={`text-6xl font-light tracking-tighter ${(riskScore || 0) > 70 ? 'text-red-900/80' : 'text-white'}`}>{riskScore}</span>
              <span className="text-zinc-700 text-sm mb-2 font-mono">/ 100</span>
            </div>
          </div>
          <div className="p-8 border border-zinc-900 bg-zinc-900/10">
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-600 block mb-2">Reliability</span>
            <div className="flex items-center gap-3">
              <TrendingDown className={`w-8 h-8 ${confidence === 'High' ? 'text-gold rotate-180' : 'text-zinc-800'}`} />
              <span className="text-3xl font-light tracking-tight">{confidence}</span>
            </div>
          </div>
        </div>

        <div className="p-8 border-l-2 border-gold bg-zinc-900/20">
          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gold block mb-4">Strategic Summary</span>
          <p className="text-xl font-light italic leading-relaxed text-zinc-300">{diagnosis}</p>
        </div>

        <div className="p-12 border border-zinc-900 bg-zinc-900/5 relative overflow-hidden group">
          <Activity className="absolute -top-12 -right-12 w-48 h-48 text-zinc-900/50 group-hover:text-gold/5 transition-colors" />
          <div className="relative z-10">
            <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-500 mb-8 border-b border-zinc-900 pb-4">Calibration Metrics</h3>
            <ul className="space-y-6 text-sm font-light leading-relaxed italic text-zinc-400">
              <li className="flex items-start gap-4">
                <span className="text-gold font-serif italic text-lg">01.</span>
                <span>Audit required for all structural decision-mapping documentation.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-gold font-serif italic text-lg">02.</span>
                <span>Immediate deployment of independent governance protocols.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-gold font-serif italic text-lg">03.</span>
                <span>Validation of developer risk-exposure and liquidity layers.</span>
              </li>
            </ul>
          </div>
        </div>

        <button 
          onClick={next}
          className="w-full bg-white text-black py-6 text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-gold transition-all"
        >
          Unlock Strategic Protocol
        </button>
      </div>
    </motion.div>
  );
}
