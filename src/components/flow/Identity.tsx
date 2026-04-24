import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useFlowStore } from '../../store/useFlowStore';

export default function Identity() {
  const { next, setData } = useFlowStore();

  const handleIdentitySelection = (type: string, scenario: string) => {
    setData({ userType: type, situation: scenario });
    next();
  };

  const identities = [
    { 
      type: 'society', 
      label: 'Society — Starting', 
      scenario: 'starting',
      description: 'Initial exploration of feasibility and preliminary alignment.'
    },
    { 
      type: 'society', 
      label: 'Society — Evaluating', 
      scenario: 'evaluating',
      description: 'Assessing developer proposals through structural benchmarks.'
    },
    { 
      type: 'society', 
      label: 'Society — Stuck', 
      scenario: 'stuck',
      description: 'Project stalled due to procedural friction or internal deadlock.'
    },
    { 
      type: 'pmc', 
      label: 'PMC — Managing', 
      scenario: 'managing',
      description: 'Overseeing technical compliance and strategic project audits.'
    },
    { 
      type: 'developer', 
      label: 'Developer — Seeking', 
      scenario: 'seeking',
      description: 'Exploring viable redevelopment vectors and site acquisitions.'
    },
    { 
      type: 'investor', 
      label: 'Investor — Evaluating', 
      scenario: 'evaluating',
      description: 'Validating feasibility and risk exposure on redevelopment assets.'
    }
  ];

  return (
    <motion.div 
      key="identity"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-xl mx-auto px-6 py-12 flex flex-col justify-center min-h-[80vh]"
    >
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
          Please define your <br />
          <span className="text-gold-dark italic font-serif">strategic perspective.</span>
        </h2>
        <p className="text-zinc-500 font-light italic leading-relaxed">
          Select the context that most accurately represents your current position within the redevelopment ecosystem.
        </p>
      </div>

      <div className="grid gap-4">
        {identities.map((group) => (
          <button
            key={group.label}
            onClick={() => handleIdentitySelection(group.type, group.scenario)}
            className="w-full p-6 text-left border border-zinc-900 bg-zinc-900/10 hover:border-gold hover:bg-gold/5 transition-all group flex items-center justify-between"
          >
            <div className="flex flex-col gap-1">
              <span className="text-lg font-light tracking-tight group-hover:text-white transition-colors">{group.label}</span>
              <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed group-hover:text-gold transition-colors">{group.description}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-800 group-hover:text-gold transition-colors group-hover:translate-x-1" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
