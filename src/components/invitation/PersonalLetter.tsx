'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FloralCorner } from '@/components/ui/FloralDecoration';
import { MailOpen, ChevronDown, Heart } from 'lucide-react';

export const PersonalLetter: React.FC = () => {
  const { letter, couple } = weddingConfig;
  const [isUnfolded, setIsUnfolded] = useState(true);

  return (
    <section
      id="note"
      aria-label="Personal Letter from Couple"
      className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#F7F2E7] via-[#F1E8D7] to-[#F7F2E7] relative overflow-hidden"
    >
      <div className="max-w-3xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="A Personal Message"
          title={letter.heading}
          subtitle="A heartfelt note from our hearts to yours."
          dividerVariant="arch"
        />

        {/* Letter Card Frame */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-sm paper-card-elevated bg-[#FAF6EE] border-2 border-gold/40 p-6 sm:p-10 md:p-12 shadow-xl"
        >
          {/* Deckled Edge / Inner Gold Line */}
          <div className="absolute inset-2 sm:inset-3 border border-gold/30 pointer-events-none rounded-sm" />

          {/* Corner Floral Motifs */}
          <FloralCorner position="top-left" size={60} color="#C6A46A" className="absolute top-4 left-4 opacity-50" />
          <FloralCorner position="top-right" size={60} color="#C6A46A" className="absolute top-4 right-4 opacity-50" />
          <FloralCorner position="bottom-left" size={60} color="#C6A46A" className="absolute bottom-4 left-4 opacity-50" />
          <FloralCorner position="bottom-right" size={60} color="#C6A46A" className="absolute bottom-4 right-4 opacity-50" />

          {/* Letter Seal Header */}
          <div className="flex flex-col items-center justify-center mb-6 pt-2">
            <div className="w-12 h-12 rounded-full wax-seal flex items-center justify-center border border-gold/60 shadow-md">
              <span className="font-serif text-gold-shimmer text-xs tracking-wider">
                {couple.initials}
              </span>
            </div>
            <div className="h-6 w-[1px] bg-gold/40 mt-2" />
          </div>

          {/* Toggle Fold / Read Button (Accessible) */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsUnfolded(!isUnfolded)}
              aria-expanded={isUnfolded}
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-gold-dark hover:text-burgundy transition-colors py-1 px-3 border border-gold/40 rounded-full bg-ivory/80 cursor-pointer focus-visible:outline-gold"
            >
              <MailOpen className="w-3.5 h-3.5 text-gold-dark" />
              <span>{isUnfolded ? 'Fold Note' : 'Read Note'}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  isUnfolded ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Letter Content */}
          <AnimatePresence initial={false}>
            {isUnfolded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                {/* Salutation */}
                <h3 className="font-serif italic text-xl sm:text-2xl text-burgundy mb-6 text-center sm:text-left">
                  {letter.salutation}
                </h3>

                {/* Paragraphs */}
                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-plum/85 font-sans font-light">
                  {letter.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Sign-off & Script Signatures */}
                <div className="mt-8 pt-6 border-t border-gold/25 flex flex-col items-end">
                  <p className="font-serif italic text-base text-rose-dark mb-1">
                    {letter.signoff}
                  </p>
                  <p className="font-script text-3xl sm:text-4xl text-burgundy tracking-wide">
                    {letter.signature}
                  </p>
                  <div className="flex items-center space-x-1 text-gold-dark text-xs mt-1">
                    <Heart className="w-3 h-3 fill-gold-dark/40" />
                    <span className="font-sans tracking-widest uppercase text-[10px]">
                      Together Forever
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
