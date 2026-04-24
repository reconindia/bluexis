/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  handleGoogleLogin, 
  handleWhatsAppLogin, 
  handleTruecallerLogin, 
  updateUserRole,
  getUserData 
} from '../services/authService';
import { User } from 'firebase/auth';
import { ShieldCheck, ArrowRight, Loader2, Phone } from 'lucide-react';

type AuthStep = 'login' | 'whatsapp_otp' | 'role_selection';
type UserRole = 'society' | 'pmc' | 'developer' | 'advisor';

export default function AuthScreen({ onAuthComplete }: { onAuthComplete: (user: User, role: string) => void }) {
  const [step, setStep] = useState<AuthStep>('login');
  const [user, setUser] = useState<User | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  const onGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const loggedUser = await handleGoogleLogin();
      if (loggedUser) {
        handlePostAuth(loggedUser);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onWhatsAppSignIn = async () => {
    if (!phoneNumber) return;
    setIsLoading(true);
    try {
      const result = await handleWhatsAppLogin(phoneNumber);
      setConfirmationResult(result);
      setStep('whatsapp_otp');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || !confirmationResult) return;
    setIsLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      if (result.user) {
        handlePostAuth(result.user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onTruecallerSignIn = async () => {
    setIsLoading(true);
    try {
      await handleTruecallerLogin();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostAuth = async (authUser: User) => {
    const data = await getUserData(authUser.uid);
    if (data?.role) {
      onAuthComplete(authUser, data.role);
    } else {
      setUser(authUser);
      setStep('role_selection');
    }
  };

  const selectRole = async (role: UserRole) => {
    if (!user) return;
    setIsLoading(true);
    try {
      await updateUserRole(user.uid, role);
      onAuthComplete(user, role);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6 font-sans">
      <div id="recaptcha-container"></div>
      
      <div className="w-full max-w-sm">
        {step === 'login' && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-display font-bold tracking-tight text-ink mb-2">Access Bluexis™</h1>
              <p className="text-sm text-ink/50 font-serif italic">Secure access for structured redevelopment workflows</p>
            </div>

            <div className="space-y-3">
              {/* Truecaller - Mobile Only (Primary on mobile per requirements) */}
              {isMobile && (
                <button 
                  onClick={onTruecallerSignIn}
                  disabled={isLoading}
                  className="w-full h-12 bg-white border border-line hover:border-gold px-5 flex items-center transition-all group disabled:opacity-50"
                >
                  <TruecallerIcon className="w-5 h-5 mr-4" />
                  <span className="text-sm font-semibold tracking-wide text-ink group-hover:text-gold transition-colors">Continue with Truecaller</span>
                </button>
              )}

              {/* Google - Primary on Desktop, Tertiary on Mobile */}
              <button 
                onClick={onGoogleSignIn}
                disabled={isLoading}
                className="w-full h-12 bg-white border border-line hover:border-gold px-5 flex items-center transition-all group disabled:opacity-50"
              >
                <GoogleIcon className="w-5 h-5 mr-4" />
                <span className="text-sm font-semibold tracking-wide text-ink group-hover:text-gold transition-colors">Continue with Google</span>
              </button>

              {/* WhatsApp - Secondary on both */}
              <div className="space-y-2">
                <div className="relative">
                  <input 
                    type="tel"
                    placeholder="+91 00000 00000"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full h-12 bg-zinc-100/50 border border-transparent focus:border-gold/30 focus:bg-white outline-none px-12 text-sm font-medium transition-all"
                  />
                  <Phone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" />
                </div>
                <button 
                  onClick={onWhatsAppSignIn}
                  disabled={isLoading || !phoneNumber}
                  className="w-full h-12 bg-white border border-line hover:border-gold px-5 flex items-center transition-all group disabled:opacity-50"
                >
                  <WhatsAppIcon className="w-5 h-5 mr-4 text-[#25D366]" />
                  <span className="text-sm font-semibold tracking-wide text-ink/60 group-hover:text-gold transition-colors">Continue with WhatsApp</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-line space-y-2">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-ink/30">
                <ShieldCheck className="w-3 h-3" />
                <span>Secure authentication. No data misuse.</span>
              </div>
              <p className="text-[10px] text-ink/30 italic font-serif">Used for identity validation within redevelopment workflows.</p>
            </div>
          </div>
        )}

        {step === 'whatsapp_otp' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center">
              <h2 className="text-xl font-bold tracking-tight text-ink mb-2">Verify WhatsApp OTP</h2>
              <p className="text-xs text-ink/50">Enter the code sent to {phoneNumber}</p>
            </div>
            
            <div className="space-y-4">
              <input 
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-full h-12 bg-white border border-line focus:border-gold outline-none text-center text-xl tracking-[0.5em] font-black"
              />
              <button 
                onClick={verifyOtp}
                disabled={isLoading || otp.length !== 6}
                className="w-full h-12 bg-zinc-950 text-paper font-bold tracking-[0.2em] text-[11px] uppercase hover:bg-zinc-800 transition-all disabled:bg-zinc-100 disabled:text-ink/20"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Verify & Continue'}
              </button>
              <button 
                onClick={() => setStep('login')}
                className="w-full text-[10px] uppercase font-black tracking-widest text-ink/30 hover:text-gold transition-colors"
              >
                Change Method
              </button>
            </div>
          </div>
        )}

        {step === 'role_selection' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold mb-2 block">Action Required</span>
              <h2 className="text-2xl font-display font-bold tracking-tight text-ink mb-2">Identify Your Domain</h2>
              <p className="text-xs text-ink/50 font-serif italic">Select your primary role within the ecosystem</p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {[
                { id: 'society', label: 'Society', desc: 'Representing member collective interests' },
                { id: 'pmc', label: 'PMC', desc: 'Project Management & Governance' },
                { id: 'developer', label: 'Developer', desc: 'Execution and technical development' },
                { id: 'advisor', label: 'Advisor', desc: 'Specialized strategic consultation' }
              ].map((role) => (
                <button 
                  key={role.id}
                  onClick={() => selectRole(role.id as UserRole)}
                  disabled={isLoading}
                  className="group w-full p-4 bg-white border border-line hover:border-gold transition-all text-left flex items-center justify-between"
                >
                  <div>
                    <span className="block text-sm font-bold uppercase tracking-wide text-ink group-hover:text-gold transition-colors">{role.label}</span>
                    <span className="block text-[11px] text-ink/40 font-serif italic">{role.desc}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-ink/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Brand Icons
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.301-.15-1.781-.879-2.052-.978-.271-.1-.47-.15-.658.15s-.74.978-.906 1.178c-.166.199-.331.223-.632.073-.301-.15-1.272-.469-2.424-1.496-.897-.8-1.502-1.787-1.683-2.087-.181-.3-.02-.462.131-.611.135-.134.3-.349.449-.524.15-.174.199-.3.299-.499.1-.199.05-.374-.025-.524s-.659-1.586-.902-2.172c-.236-.57-.478-.492-.658-.501-.17-.008-.364-.01-.559-.01s-.514.073-.784.374c-.269.301-1.026 1.002-1.026 2.441 0 1.439 1.047 2.83 1.192 3.031.144.199 2.06 3.146 4.989 4.414.696.302 1.24.481 1.666.617.701.223 1.34.192 1.843.118.56-.083 1.722-.703 1.964-1.383.242-.68.242-1.261.169-1.382-.073-.121-.269-.193-.57-.343zM12.012 2.997c-4.965 0-9.006 4.041-9.006 9.006 0 1.588.413 3.138 1.196 4.498L3 21l4.631-1.215c1.314.717 2.793 1.096 4.381 1.096h.004c4.965 0 9.006-4.041 9.006-9.006 0-4.965-4.041-9.006-9.006-9.006z" />
    </svg>
  );
}

function TruecallerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.834 16.54c-1.516.634-3.148.96-4.834.96-3.86 0-7-3.14-7-7 0-3.86 3.14-7 7-7 1.723 0 3.393.633 4.88 1.25.447.18.573.74.25 1.114l-1.084 1.14c-.168.177-.424.23-.65.137-.954-.39-1.923-.64-2.896-.64-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5c.873 0 1.724-.22 2.51-.62.261-.133.58-.04.764.19l1.106 1.4c.298.378.163.92-.296 1.11z" />
    </svg>
  );
}
