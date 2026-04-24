import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFlowStore } from '../store/useFlowStore';
import { calculateRisk } from '../lib/riskEngine';

// Components
import Entry from '../components/flow/Entry';
import Identity from '../components/flow/Identity';
import Qualification from '../components/flow/Qualification';
import Input from '../components/flow/Input';
import Output from '../components/flow/Output';
import Lock from '../components/flow/Lock';

export default function StartFlowView({ onComplete }: { onComplete?: () => void }) {
  const { 
    step, 
    userType, 
    situation, 
    setup, 
    concern, 
    note, 
    riskScore, 
    confidence, 
    diagnosis,
    setData, 
    next 
  } = useFlowStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Logic Engine
  const performAnalysis = () => {
    const result = calculateRisk({ setup, situation });
    setData({ riskScore: result.score, confidence: result.confidence, diagnosis: result.diagnosis });
  };

  const handleInputNext = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      performAnalysis();
      setIsSubmitting(false);
      next();
    }, 2200);
  };

  const saveToFirebase = async () => {
    if (!auth.currentUser || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'sessions'), {
        userType,
        situation,
        setup,
        concern,
        note,
        riskScore,
        confidence,
        diagnosis,
        user_id: auth.currentUser.uid,
        user_email: auth.currentUser.email,
        created_at: serverTimestamp()
      });
      if (onComplete) onComplete();
    } catch (error) {
      console.error("Error saving evaluation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (step === 6 && auth.currentUser) { // Step 6 is CONVERSION
      saveToFirebase();
    }
  }, [step, auth.currentUser]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold/30 flex items-center justify-center overflow-x-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gold/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <AnimatePresence mode="wait">
        
        {isSubmitting && step !== 6 && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-12"
          >
            <div className="relative">
              <div className="w-16 h-16 border-t border-gold/30 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center font-serif italic text-gold">B</div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="text-[10px] uppercase tracking-[0.8em] font-black text-gold animate-pulse">Processing Diagnostic Layers</p>
              <p className="text-[9px] text-zinc-700 uppercase tracking-widest font-mono">Calibrating risk variance and structural offsets...</p>
            </div>
          </motion.div>
        )}

        {!isSubmitting && (
          <>
            {step === 1 && <Entry />}
            {step === 2 && <Identity />}
            {step === 3 && <Qualification />}
            {step === 4 && <Input onNext={handleInputNext} />}
            {step === 5 && <Output />}
            {step === 6 && <Lock />}
          </>
        )}

      </AnimatePresence>
    </div>
  );
}
