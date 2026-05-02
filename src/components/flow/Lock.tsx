import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, MessageCircle, Mail, Lock as LockIcon, Loader2 } from 'lucide-react';
import { signInWithGoogle } from '../../lib/firebase';

export default function Lock() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/unauthorized-domain') {
        setError("Domain not authorized. Please add 'bluexis.com' and the current app URL to Authorized Domains in Firebase Console.");
      } else {
        setError("Login failed. Try opening in a new tab.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const openInNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  return (
    <motion.div 
      key="conversion"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-xl mx-auto px-6 py-12 flex flex-col justify-center min-h-[80vh] text-center"
    >
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
          Strategic <span className="font-serif italic font-normal text-gold">Clearance.</span>
        </h2>
        <p className="text-zinc-500 font-light italic leading-relaxed">
          Full structural diagnostics and protocol recommendations require verified access to the Bluexis ecosystem.
        </p>
      </div>
      
      <div className="space-y-4 max-w-sm mx-auto w-full">
        <button 
          onClick={handleLogin}
          disabled={isLoggingIn}
          className="w-full bg-white text-black py-5 px-6 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-gold transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
        >
          {isLoggingIn ? <Loader2 className="w-4 h-4 animate-spin text-black" /> : <Mail className="w-4 h-4" />}
          {isLoggingIn ? "Verifying Domain..." : "Verify via Google"}
        </button>

        {error && (
          <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold">{error}</p>
        )}

        <div className="pt-4">
           <button 
            onClick={openInNewTab}
            className="text-[9px] text-zinc-500 uppercase tracking-widest hover:text-gold transition-colors"
           >
             Open in New Tab
           </button>
        </div>

        <button 
          className="w-full border border-zinc-900 bg-zinc-900/10 text-zinc-700 py-5 px-6 font-bold uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-4 opacity-50 cursor-not-allowed"
          disabled
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp Protocol
        </button>

        <div className="pt-16 flex flex-col items-center gap-6">
          <div className="relative">
            <LockIcon className="w-5 h-5 text-zinc-800 relative z-10" />
            <div className="absolute inset-0 bg-gold/5 animate-ping rounded-full scale-150" />
          </div>
          <div className="space-y-1">
            <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-700 font-black">
              Session Integrity Encrypted
            </p>
            <p className="text-[9px] font-mono text-zinc-800">
              ID: BXS-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
