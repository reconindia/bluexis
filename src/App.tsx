/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navigation from './components/Navigation';
import HomeView from './views/HomeView';
import AssureView from './views/AssureView';
import ContactView from './views/ContactView';
import DashboardView from './views/DashboardView';
import { Page } from './types';
import Logo from './components/Logo';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView onNavigate={setCurrentPage} />;
      case 'assure':
        return <AssureView onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactView />;
      case 'dashboard':
        return <DashboardView />;
      default:
        return <HomeView onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-accent selection:text-paper paper-texture overflow-x-hidden">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="py-20 bg-ink text-paper border-t border-paper/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-6 pointer-events-none">
                <Logo className="h-10" />
              </div>
              <p className="text-sm font-light text-paper/40 leading-relaxed uppercase tracking-wider">
                Strategic decision layer and structured redevelopment systems for societies, PMCs, and developers.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-20">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-paper/30 mb-6">Navigation</h4>
                <ul className="space-y-4 text-xs font-medium uppercase tracking-widest">
                  <li><button onClick={() => setCurrentPage('home')} className="hover:text-gold transition-all border-b border-transparent hover:border-gold/30 pb-0.5">Home</button></li>
                  <li><button onClick={() => setCurrentPage('assure')} className="hover:text-gold transition-all border-b border-transparent hover:border-gold/30 pb-0.5">ASSURE™</button></li>
                  <li><button onClick={() => setCurrentPage('contact')} className="hover:text-gold transition-all border-b border-transparent hover:border-gold/30 pb-0.5">Contact</button></li>
                  <li><button onClick={() => setCurrentPage('dashboard')} className="hover:text-gold transition-all border-b border-transparent hover:border-gold/30 pb-0.5">Portal</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-paper/30 mb-6">System</h4>
                <ul className="space-y-4 text-xs font-medium uppercase tracking-widest">
                  <li className="opacity-40">Privacy Policy</li>
                  <li className="opacity-40">Terms of Governance</li>
                  <li className="opacity-40">Ethics Protocol</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-paper/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-[9px] uppercase tracking-[0.3em] font-black text-paper/30 italic">© 2026 Bluexis Strategic Advisory. All Structure Reserved.</span>
            <span className="text-[9px] uppercase tracking-[0.3em] font-black text-paper/20">Decision Layer: BLX-492-SYS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
