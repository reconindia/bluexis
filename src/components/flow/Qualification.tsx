import React from 'react';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';
import { useFlowStore } from '../../store/useFlowStore';

export default function Qualification() {
  const { next, setData, setup } = useFlowStore();

  const handleSelection = (opt: string) => {
    setData({ setup: opt });
    next();
  };

  const options = [
    { id: 'pmc', label: 'Engaged professional oversight (PMC)' },
    { id: 'no_pmc', label: 'Direct management by society' },
    { id: 'pmc_structured', label: 'Structured consultative guidance' },
    { id: 'exploring', label: 'Initial strategic exploration' }
  ];

  return (
    <motion.div 
      key="qualification"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-xl mx-auto px-6 py-12 flex flex-col justify-center min-h-[80vh]"
    >
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
          Establish your <br />
          <span className="text-gold italic font-serif">governance framework.</span>
        </h2>
        <p className="text-zinc-500 font-light italic leading-relaxed">
          The presence of professional oversight significantly alters the risk profile of your redevelopment journey.
        </p>
      </div>
      <div className="grid gap-4">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelection(opt.id)}
            className="w-full p-8 text-left border border-zinc-900 bg-zinc-900/10 hover:border-gold hover:bg-gold/5 transition-all group relative overflow-hidden"
          >
            <span className="text-xl font-light group-hover:text-white transition-colors">{opt.label}</span>
            <Lock className="absolute -bottom-4 -right-4 w-24 h-24 text-zinc-900/10 group-hover:text-gold/5 transition-colors rotate-12" />
          </button>
        ))}
      </div>

      {setup && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 p-8 border-l-2 border-gold bg-zinc-900/20"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] font-black text-gold mb-3">Protocol Insight</p>
          <p className="text-sm italic text-zinc-400 font-light leading-relaxed">
            {setup === 'no_pmc' 
              ? "We observe a high probability of structural friction due to the absence of independent advisory layers." 
              : "Structured oversight detected. System calibrating for technical alignment and compliance protocols."}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
