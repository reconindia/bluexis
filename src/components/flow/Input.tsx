import React from 'react';
import { motion } from 'motion/react';
import { useFlowStore } from '../../store/useFlowStore';

interface InputProps {
  onNext: () => void;
}

export default function Input({ onNext }: InputProps) {
  const { setData, concern, note } = useFlowStore();

  const handleSubmit = () => {
    onNext();
  };

  return (
    <motion.div 
      key="input"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-xl mx-auto px-6 py-12 flex flex-col justify-center min-h-[80vh]"
    >
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
          Identify the <br />
          <span className="text-gold italic font-serif">primary friction point.</span>
        </h2>
        <p className="text-zinc-500 font-light italic leading-relaxed">
          Please specify the domain where structural risk is most concentrated. Your input will calibrate the final diagnostic output.
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-600 block">Core Concern</label>
          <div className="relative">
            <select 
              value={concern || ''}
              onChange={(e) => setData({ concern: e.target.value })}
              className="w-full bg-zinc-900/50 border border-zinc-900 p-6 text-lg font-light outline-none focus:border-gold transition-all appearance-none"
            >
              <option value="">Select focal domain...</option>
              <option value="legal">Legal & Statutory Risk</option>
              <option value="financial">Financial Feasibility & Clarity</option>
              <option value="developer">Strategic Developer Selection</option>
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-2 h-2 border-r border-b border-zinc-500 rotate-45" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-600 block">Supplementary Context (Optional)</label>
          <textarea 
            value={note || ''}
            placeholder="Document specific observations or historical friction..."
            onChange={(e) => setData({ note: e.target.value })}
            className="w-full bg-zinc-900/50 border border-zinc-900 p-6 h-32 text-sm font-light outline-none focus:border-gold transition-all resize-none italic placeholder:text-zinc-700"
          />
        </div>
        <button 
          onClick={handleSubmit}
          className="w-full bg-white text-black py-6 text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-gold transition-all"
        >
          Generate Evaluation
        </button>
      </div>
    </motion.div>
  );
}
