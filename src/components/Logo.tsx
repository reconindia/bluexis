/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface LogoProps {
  className?: string;
  type?: 'full' | 'monogram' | 'wordmark';
  color?: string;
}

export default function Logo({ className = '', type = 'full', color = 'currentColor' }: LogoProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Simple, high-end serif wordmark in golden tones as requested
  const Wordmark = () => (
    <div className="flex items-center">
      <div className="flex items-baseline font-serif font-bold text-2xl md:text-3xl tracking-tight leading-none">
        <span style={{ color: color !== 'currentColor' ? color : undefined }} className={color === 'currentColor' ? 'text-ink' : ''}>Blue</span>
        <span className="text-gold">xis</span>
        <span className="text-[0.45em] translate-y-[-0.6em] ml-0.5 opacity-60 text-gold-dark">™</span>
      </div>
    </div>
  );

  const PngImage = () => (
    <img 
      src="/logo.png" 
      alt="Bluexis" 
      onLoad={() => setImgLoaded(true)}
      onError={() => setImgError(true)}
      className={`h-10 md:h-12 w-auto object-contain ${imgLoaded ? 'block' : 'hidden'}`}
      referrerPolicy="no-referrer"
    />
  );

  if (type === 'monogram' && !imgLoaded) {
    return (
      <div className={`aspect-square ${className} flex items-center justify-center font-serif font-bold text-2xl text-gold`}>
        B
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      {!imgError && <PngImage />}
      {(!imgLoaded || imgError) && <Wordmark />}
    </div>
  );
}
