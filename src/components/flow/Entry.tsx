import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useFlowStore } from '../../store/useFlowStore';

export default function Entry() {
  const { next } = useFlowStore();

  return (
    <motion.div 
      key="entry"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-xl mx-auto px-6 py-12 flex flex-col justify-center min-h-[80vh] text-center"
    >
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-12"
      >
        <div className="w-16 h-16 border border-gold mx-auto flex items-center justify-center mb-8 relative">
           <div className="text-gold font-serif italic text-2xl relative z-10">B</div>
           <div className="absolute inset-0 bg-gold/5 animate-pulse" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Your path forward is defined by the <br />
          <span className="text-gold-dark italic font-serif">integrity of your initial choices.</span>
        </h1>
        
        <p className="text-zinc-400 text-lg max-w-md mx-auto font-light italic leading-relaxed">
          The most enduring failures often originate in the quiet gaps before execution. 
          We invite you to diagnose your structural landscape.
        </p>

        <button 
          onClick={next}
          className="w-full bg-white text-black py-6 text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-gold transition-all flex items-center justify-center gap-4 group"
        >
          Begin Diagnostic <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </motion.div>
  );
}
