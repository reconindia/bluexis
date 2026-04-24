/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Page } from '../types';
import Logo from './Logo';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Overview' },
    { id: 'assure', label: 'ASSURE™' },
    { id: 'shield', label: 'SHIELD™' },
    { id: 'governance', label: 'Governance' },
    { id: 'situation', label: 'Situation' },
    { id: 'dashboard', label: 'Portal' },
  ];

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/70 backdrop-blur-xl border-b border-line transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 md:gap-3 cursor-pointer group" 
          onClick={() => handleNavigate('home')}
        >
          <Logo type="full" color="var(--color-gold)" className="hover:scale-105 transition-transform" />
          <div className="border-l border-ink/10 h-6 md:h-8 ml-0.5 md:ml-1 pl-3 md:pl-4 flex flex-col justify-center">
            <span className="text-[6px] md:text-[8px] uppercase tracking-[0.4em] font-black opacity-30 leading-none">Strategic</span>
            <span className="text-[6px] md:text-[8px] uppercase tracking-[0.4em] font-black opacity-30 leading-none mt-0.5 md:mt-1 font-serif italic italic-text">Advisory</span>
          </div>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id as Page)}
              className={`text-[9px] uppercase tracking-[0.4em] font-black transition-all hover:text-gold relative py-1 ${
                currentPage === item.id ? 'text-ink' : 'text-ink/30'
              }`}
            >
              {item.label}
              {currentPage === item.id && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold"
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile menu trigger */}
        <button 
          className="md:hidden text-ink p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Backdrop & Sheet */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-paper border-b border-line py-8 px-6 shadow-2xl"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id as Page)}
                  className={`text-xl uppercase tracking-[0.2em] font-bold text-left ${
                    currentPage === item.id ? 'text-gold' : 'text-ink/80'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
