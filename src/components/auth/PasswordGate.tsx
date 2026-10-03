'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';
import { FloralCorner } from '@/components/ui/FloralDecoration';
import { Lock, Unlock, Eye, EyeOff, AlertCircle, Sparkles } from 'lucide-react';
import { playGlobalAudio } from '@/hooks/useAudio';

interface PasswordGateProps {
  onUnlock: () => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ onUnlock }) => {
  const { couple, security } = weddingConfig;
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const entered = passwordInput.trim();

    if (!entered) {
      setError('Please enter the invitation passcode.');
      setIsSubmitting(false);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    if (entered === security.password) {
      // Trigger background music automatically on unlock
      playGlobalAudio();

      // Correct password
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(security.storageKey, 'true');
          // Also set cookie for 30 days
          document.cookie = `${security.storageKey}=true; path=/; max-age=2592000; SameSite=Lax`;
        } catch {
          // localStorage might be unavailable in private browsing
        }
      }

      // Smooth unlock delay
      setTimeout(() => {
        setIsSubmitting(false);
        onUnlock();
      }, 400);
    } else {
      // Incorrect password
      setIsSubmitting(false);
      setError('Incorrect passcode. Please check the invitation code shared by Bilal & Maria.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Private Invitation Access Gate"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#2E121E] via-[#1F0B15] to-[#12050D] text-ivory select-none overflow-y-auto"
    >
      {/* Soft Ambient Radiance */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-rose/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-gold/10 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Elegant Floral Corners */}
      <FloralCorner position="top-left" size={90} color="#C6A46A" className="absolute top-4 left-4 opacity-50" />
      <FloralCorner position="top-right" size={90} color="#C6A46A" className="absolute top-4 right-4 opacity-50" />
      <FloralCorner position="bottom-left" size={90} color="#C6A46A" className="absolute bottom-4 left-4 opacity-50" />
      <FloralCorner position="bottom-right" size={90} color="#C6A46A" className="absolute bottom-4 right-4 opacity-50" />

      {/* Main Lock Card */}
      <motion.div
        animate={isShaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="relative max-w-md w-full my-auto rounded-lg bg-gradient-to-b from-[#3B1728]/90 via-[#270E1A]/95 to-[#1A0811] p-6 sm:p-10 border-2 border-gold/40 shadow-2xl text-center z-10 backdrop-blur-md"
      >
        {/* Inner Gold Inset Frame */}
        <div className="absolute inset-2 sm:inset-3 border border-gold/25 rounded-md pointer-events-none" />

        {/* Wax Seal Lock Emblem */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full wax-seal mx-auto flex items-center justify-center p-2 border border-gold/60 shadow-xl mb-6">
          <div className="w-full h-full rounded-full border border-dashed border-gold/70 flex flex-col items-center justify-center shadow-inner">
            <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-gold-shimmer" />
          </div>
          <div className="absolute -inset-1 rounded-full bg-gold/20 blur-sm pointer-events-none" />
        </div>

        {/* Eyebrow & Couple Name */}
        <div className="space-y-1 mb-6">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-light font-sans font-medium">
            Private Wedding Invitation
          </p>

          <h1 className="font-serif text-3xl sm:text-4xl text-ivory tracking-wide font-light">
            {couple.displayNames}
          </h1>

          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold/60 to-transparent mx-auto mt-2" />
        </div>

        <p className="text-xs sm:text-sm text-champagne/80 font-sans font-light leading-relaxed mb-6">
          Please enter the invitation passcode to unlock our wedding celebrations.
        </p>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gold-light/60">
              <Lock className="w-4 h-4" />
            </div>

            <input
              type={showPassword ? 'text' : 'password'}
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Enter Invitation Passcode"
              autoFocus
              autoComplete="current-password"
              className={`w-full pl-10 pr-11 py-3 rounded-sm bg-[#1B0813]/80 border ${
                error ? 'border-red-400' : 'border-gold/50'
              } text-ivory placeholder:text-champagne/40 text-sm focus:border-gold focus:ring-1 focus:ring-gold transition-colors`}
              aria-label="Invitation Passcode"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'password-error' : undefined}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-champagne/60 hover:text-gold-light transition-colors focus-visible:outline-gold"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                id="password-error"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-2.5 rounded bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-center space-x-2 text-left"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-300" />
                <span className="leading-tight">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-sm bg-gradient-to-r from-[#DFCA9B] via-[#C6A46A] to-[#B08D4C] text-[#24131D] font-sans font-semibold text-xs sm:text-sm uppercase tracking-[0.25em] shadow-lg hover:shadow-2xl hover:brightness-105 active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer focus-visible:outline-gold"
          >
            {isSubmitting ? (
              <span>Verifying Passcode...</span>
            ) : (
              <>
                <Unlock className="w-4 h-4" />
                <span>Unlock Invitation</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <p className="mt-6 text-[11px] text-champagne/50 tracking-wider">
          With Love · Bilal Rafique &amp; Maria Jakhro
        </p>
      </motion.div>
    </div>
  );
};
