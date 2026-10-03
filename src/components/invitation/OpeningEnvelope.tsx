'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloralCorner } from '@/components/ui/FloralDecoration';
import { weddingConfig } from '@/config/wedding';
import { Sparkles, ArrowDown } from 'lucide-react';
import { playGlobalAudio } from '@/hooks/useAudio';

interface OpeningEnvelopeProps {
  onOpened: () => void;
  isOpened: boolean;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({ onOpened, isOpened }) => {
  const [animationStep, setAnimationStep] = useState<'closed' | 'seal-breaking' | 'flap-opening' | 'card-emerging' | 'completed'>(
    isOpened ? 'completed' : 'closed'
  );

  const handleOpen = () => {
    if (animationStep !== 'closed') return;
    playGlobalAudio();
    setAnimationStep('seal-breaking');

    // Sequence the opening animations smoothly
    setTimeout(() => {
      setAnimationStep('flap-opening');
    }, 450);

    setTimeout(() => {
      setAnimationStep('card-emerging');
    }, 950);

    setTimeout(() => {
      setAnimationStep('completed');
      onOpened();
    }, 2200);
  };

  const handleSkip = () => {
    playGlobalAudio();
    setAnimationStep('completed');
    onOpened();
  };

  if (animationStep === 'completed' && isOpened) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Wedding Invitation Envelope"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#351A27] via-[#24131D] to-[#170B13] overflow-hidden select-none"
    >
      {/* Delicate Ambient Lighting Effects */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-rose/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-gold/10 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Elegant Botanical Corner Accents */}
      <FloralCorner position="top-left" size={90} color="#C6A46A" className="absolute top-4 left-4" />
      <FloralCorner position="top-right" size={90} color="#C6A46A" className="absolute top-4 right-4" />
      <FloralCorner position="bottom-left" size={90} color="#C6A46A" className="absolute bottom-4 left-4" />
      <FloralCorner position="bottom-right" size={90} color="#C6A46A" className="absolute bottom-4 right-4" />

      {/* Skip Button for Instant Navigation / Return Visitors */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={handleSkip}
          className="text-xs uppercase tracking-[0.25em] text-champagne/70 hover:text-gold-light py-2 px-3 transition-colors duration-200 border-b border-transparent hover:border-gold/40 focus-visible:outline-gold"
          aria-label="Skip opening animation to wedding invitation"
        >
          Skip to Invitation →
        </button>
      </div>

      {/* Envelope Container */}
      <div className="relative flex flex-col items-center justify-center max-w-sm sm:max-w-md w-full my-auto">
        {/* Subtle floating wrapper */}
        <motion.div
          animate={
            animationStep === 'closed'
              ? { y: [0, -6, 0] }
              : { y: 0 }
          }
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-[300px] sm:w-[380px] h-[200px] sm:h-[240px] perspective-[1000px]"
        >
          {/* Envelope Body / Base */}
          <div className="relative w-full h-full rounded-md shadow-2xl bg-gradient-to-b from-[#2E1825] to-[#1F0F19] border border-gold/40 overflow-visible">
            {/* Inner Silk Lining Texture */}
            <div className="absolute inset-1 rounded-sm bg-gradient-to-br from-[#3D1D30] to-[#25101E] border border-gold/20" />

            {/* Emerging Invitation Card */}
            <motion.div
              initial={{ y: 0, opacity: 0.95 }}
              animate={
                animationStep === 'card-emerging' || animationStep === 'completed'
                  ? { y: -130, opacity: 1, scale: 1.05 }
                  : { y: 0, opacity: 0.95 }
              }
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-3 right-3 top-3 bottom-3 rounded bg-[#FAF6EE] p-4 text-center shadow-xl border border-gold/60 flex flex-col items-center justify-center z-10 pointer-events-none"
            >
              <div className="w-full h-full border border-gold/40 rounded-sm p-3 flex flex-col items-center justify-between">
                <span className="text-[9px] tracking-[0.25em] uppercase text-gold-dark font-sans font-medium">
                  {weddingConfig.invitation.tagline}
                </span>

                <div className="space-y-0.5">
                  <h3 className="font-serif text-2xl sm:text-3xl text-burgundy tracking-wide font-normal">
                    {weddingConfig.couple.displayNames}
                  </h3>
                  <div className="h-[1px] w-12 bg-gold/50 mx-auto" />
                </div>

                <div className="text-[11px] sm:text-xs tracking-widest text-burgundy/80 uppercase font-serif wedding-date font-medium">
                  {weddingConfig.invitation.primaryDate} · {weddingConfig.couple.bride.hometown.split(',')[0]}
                </div>
              </div>
            </motion.div>

            {/* Envelope Side and Bottom Pocket Flaps (Layered above emerging card at bottom) */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {/* Bottom Triangular Pocket Flap */}
              <svg
                viewBox="0 0 380 240"
                fill="none"
                preserveAspectRatio="none"
                className="w-full h-full drop-shadow-[0_-4px_8px_rgba(0,0,0,0.3)]"
              >
                {/* Left Flap */}
                <polygon
                  points="0,0 190,130 0,240"
                  fill="#2A1422"
                  stroke="#C6A46A"
                  strokeWidth="0.8"
                  opacity="0.9"
                />
                {/* Right Flap */}
                <polygon
                  points="380,0 190,130 380,240"
                  fill="#26121E"
                  stroke="#C6A46A"
                  strokeWidth="0.8"
                  opacity="0.9"
                />
                {/* Bottom Flap */}
                <polygon
                  points="0,240 190,115 380,240"
                  fill="#220F1B"
                  stroke="#C6A46A"
                  strokeWidth="1.2"
                />
              </svg>
            </div>

            {/* Envelope Top Flap (Animated opening with 3D rotateX) */}
            <motion.div
              style={{ transformOrigin: 'top center' }}
              initial={{ rotateX: 0 }}
              animate={
                animationStep === 'flap-opening' || animationStep === 'card-emerging' || animationStep === 'completed'
                  ? { rotateX: 180, zIndex: 5 }
                  : { rotateX: 0, zIndex: 30 }
              }
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
              className="absolute top-0 left-0 right-0 h-[130px] z-30 pointer-events-none"
            >
              <svg
                viewBox="0 0 380 130"
                fill="none"
                preserveAspectRatio="none"
                className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
              >
                <polygon
                  points="0,0 190,128 380,0"
                  fill="#331727"
                  stroke="#C6A46A"
                  strokeWidth="1.2"
                />
                {/* Subtle Inner Accent */}
                <polygon
                  points="20,0 190,115 360,0"
                  stroke="#DFCA9B"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
              </svg>
            </motion.div>

            {/* Refined Wax Seal with Floral Monogram (B & M) */}
            <AnimatePresence>
              {animationStep !== 'completed' && animationStep !== 'card-emerging' && (
                <motion.div
                  initial={{ scale: 1, opacity: 1 }}
                  animate={
                    animationStep === 'seal-breaking'
                      ? { scale: 1.15, opacity: 0 }
                      : { scale: 1, opacity: 1 }
                  }
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={handleOpen}
                  className="absolute top-[108px] sm:top-[112px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 cursor-pointer group"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpen();
                    }
                  }}
                  aria-label="Open wedding invitation by breaking seal"
                >
                  {/* Wax Seal Outer Ring */}
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full wax-seal flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-105 border border-gold/60">
                    {/* Concentric Gold Detail & Monogram */}
                    <div className="w-full h-full rounded-full border border-dashed border-gold/70 flex flex-col items-center justify-center shadow-inner">
                      <span className="font-serif text-xs sm:text-sm font-semibold tracking-wider text-gold-shimmer select-none">
                        {weddingConfig.couple.initials}
                      </span>
                    </div>

                    {/* Subtle Seal Glow */}
                    <div className="absolute inset-0 rounded-full bg-gold/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Envelope Instructions and Action */}
        <div className="mt-12 sm:mt-16 text-center space-y-4 z-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm uppercase tracking-[0.3em] text-champagne/80 font-sans"
          >
            An invitation awaits you
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <button
              onClick={handleOpen}
              disabled={animationStep !== 'closed'}
              className="px-8 py-3.5 rounded-sm bg-gradient-to-r from-[#DFCA9B] via-[#C6A46A] to-[#B08D4C] text-[#24131D] font-sans font-medium text-xs sm:text-sm uppercase tracking-[0.25em] shadow-lg hover:shadow-2xl hover:brightness-105 transition-all duration-300 cursor-pointer active:scale-98 flex items-center space-x-2.5 mx-auto focus-visible:outline-gold"
            >
              <Sparkles className="w-4 h-4 text-[#24131D]" />
              <span>Open Invitation</span>
            </button>
          </motion.div>

          <p className="text-[11px] text-champagne/50 tracking-wider font-light">
            Tap the seal or button to unfold the celebration
          </p>
        </div>
      </div>
    </div>
  );
};
