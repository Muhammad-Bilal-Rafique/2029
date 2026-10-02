'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MotiaGarland } from '@/components/ui/FloralDecoration';

export const WelcomeSection: React.FC = () => {
  const { welcome, couple } = weddingConfig;

  return (
    <section
      id="welcome"
      aria-label="Welcome Message"
      className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-ivory via-champagne-light to-ivory relative overflow-hidden"
    >
      {/* Decorative Arch Background Watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[450px] opacity-10 pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full stroke-gold">
          <circle cx="200" cy="200" r="160" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" strokeWidth="0.75" />
          <path d="M100 200C100 144.772 144.772 100 200 100C255.228 100 300 144.772 300 200" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeading
            eyebrow="Welcome"
            title={welcome.heading}
            dividerVariant="arch"
          />
        </motion.div>

        {/* Motia / Jasmine Floral Garland Motif */}
        <MotiaGarland className="mb-8" />

        {/* Quranic Verse / Blessing Quote */}
        {welcome.quote && (
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif italic text-base sm:text-lg md:text-xl text-rose-dark max-w-xl mx-auto leading-relaxed mb-6 px-4"
          >
            {welcome.quote}
          </motion.blockquote>
        )}

        {/* Body Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-2xl mx-auto px-6 py-8 rounded-sm bg-ivory/60 backdrop-blur-sm border border-gold/30 shadow-sm"
        >
          {/* Subtle Corner Accents */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold/60" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold/60" />
          <div className="absolute bottom-2 left-2 w-3 h-2 border-b border-l border-gold/60" />
          <div className="absolute bottom-2 right-2 w-3 h-2 border-b border-r border-gold/60" />

          <p className="font-sans text-sm sm:text-base leading-relaxed text-plum/85 font-light">
            {welcome.body}
          </p>

          <p className="mt-6 font-serif text-lg text-burgundy font-medium">
            — {couple.displayNames}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
