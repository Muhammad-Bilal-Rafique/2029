'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';
import { MusicPlayer } from './MusicPlayer';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';
import { FloralCorner } from '@/components/ui/FloralDecoration';
import { ArrowUp, Heart } from 'lucide-react';

interface ClosingSectionProps {
  onReopenEnvelope: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ onReopenEnvelope }) => {
  const { closing, couple } = weddingConfig;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="closing"
      aria-label="Closing Blessing and Music"
      className="py-24 sm:py-32 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#2D1220] via-[#1E0B15] to-[#12050D] text-ivory relative overflow-hidden text-center"
    >
      {/* Soft Ambient Radiance */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-rose/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Ornaments */}
      <FloralCorner position="top-left" size={90} color="#C6A46A" className="absolute top-6 left-6 opacity-40 hidden sm:block" />
      <FloralCorner position="top-right" size={90} color="#C6A46A" className="absolute top-6 right-6 opacity-40 hidden sm:block" />

      <div className="max-w-3xl mx-auto relative z-10 space-y-10">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-2 text-gold-light text-xs uppercase tracking-[0.3em] font-sans font-medium mb-3">
            <Heart className="w-3.5 h-3.5 fill-gold-light/40" />
            <span>Forever &amp; Always</span>
            <Heart className="w-3.5 h-3.5 fill-gold-light/40" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gold-shimmer tracking-wide">
            {closing.heading}
          </h2>

          <OrnamentalDivider variant="arch" color="gold" className="my-5" />

          <p className="font-serif italic text-xl sm:text-2xl text-champagne/90 max-w-xl mx-auto leading-relaxed">
            {closing.signature}
          </p>

          <p className="mt-4 text-xs sm:text-sm text-champagne/70 max-w-lg mx-auto font-sans font-light leading-relaxed">
            {closing.message}
          </p>
        </motion.div>

        {/* Music Player Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MusicPlayer variant="inline" />
        </motion.div>

        {/* Navigation Actions */}
        <div className="pt-8 border-t border-gold/20 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-champagne/70 hover:text-gold-light py-2 px-4 border border-gold/30 rounded-sm hover:border-gold transition-colors focus-visible:outline-gold cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Return to Top</span>
          </button>

          <button
            onClick={onReopenEnvelope}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-gold-light hover:text-white py-2 px-4 bg-burgundy/60 border border-gold/40 rounded-sm hover:border-gold transition-colors focus-visible:outline-gold cursor-pointer"
          >
            <span>Re-view Envelope</span>
          </button>
        </div>

        {/* Footer Credit & Copyright */}
        <div className="pt-8 text-xs text-champagne/60 tracking-widest uppercase font-light flex items-center justify-center flex-wrap gap-2">
          <span>{couple.displayNames}</span>
          <span className="opacity-40">·</span>
          <span className="font-serif wedding-date tracking-wider text-gold-light/90 font-medium">
            {weddingConfig.invitation.primaryDateFormatted}
          </span>
          <span className="opacity-40">·</span>
          <span>{weddingConfig.invitation.primaryLocation}</span>
        </div>
      </div>
    </footer>
  );
};
