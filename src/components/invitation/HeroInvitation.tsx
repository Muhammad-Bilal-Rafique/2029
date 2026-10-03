'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';
import { PortraitFrame } from '@/components/ui/PortraitFrame';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';
import { FloralCorner } from '@/components/ui/FloralDecoration';
import { Calendar, MapPin } from 'lucide-react';

export const HeroInvitation: React.FC = () => {
  const { couple, invitation } = weddingConfig;

  return (
    <section
      id="hero"
      aria-label="Wedding Invitation Announcement"
      className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-20 px-4 sm:px-6 md:px-8 paper-texture overflow-hidden"
    >
      {/* Delicate Ambient Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-rose/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating Corner Floral Ornaments */}
      <FloralCorner position="top-left" size={100} color="#C6A46A" className="absolute top-6 left-4 sm:left-8 hidden sm:block opacity-60" />
      <FloralCorner position="top-right" size={100} color="#C6A46A" className="absolute top-6 right-4 sm:right-8 hidden sm:block opacity-60" />

      {/* Main Editorial Card / Announcement Box */}
      <div className="relative max-w-4xl w-full mx-auto text-center z-10">
        {/* Intro Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-3"
        >
          <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-gold-dark font-sans font-medium">
            {invitation.tagline}
          </p>

          <OrnamentalDivider variant="arch" color="gold" className="my-2" />
        </motion.div>

        {/* Grand Typography: Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="my-6 sm:my-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-6 lg:gap-8">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-burgundy font-light uppercase">
              {couple.groom.firstName}
            </h1>

            <span className="font-script text-4xl sm:text-5xl md:text-6xl text-gold-dark my-[-8px] md:my-0 select-none">
              &amp;
            </span>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-burgundy font-light uppercase">
              {couple.bride.firstName}
            </h1>
          </div>

          <p className="mt-4 sm:mt-6 font-serif italic text-lg sm:text-xl md:text-2xl text-rose-dark max-w-xl mx-auto px-4">
            {invitation.subtitle}
          </p>
        </motion.div>

        {/* Wedding Date & Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-2.5 rounded-full border border-gold/40 bg-ivory/80 backdrop-blur-sm shadow-sm mb-12"
        >
          <div className="flex items-center space-x-2 text-burgundy font-serif wedding-date text-base sm:text-lg tracking-widest font-normal">
            <Calendar className="w-4 h-4 text-gold-dark" />
            <span>{invitation.primaryDate}</span>
          </div>

          <span className="w-1.5 h-1.5 rounded-full bg-gold/60 hidden sm:block" />

          <div className="flex items-center space-x-2 text-burgundy font-sans text-xs sm:text-sm tracking-widest uppercase">
            <MapPin className="w-3.5 h-3.5 text-gold-dark" />
            <span>{invitation.primaryLocation}</span>
          </div>
        </motion.div>

        {/* Dual Portraits (Bilal & Maria) */}
        {/*
          =============================================================================
          LOCAL PHOTOGRAPHS INSTRUCTIONS:
          Place Bilal's photo at: /public/images/bilal.jpg
          Place Maria's photo at: /public/images/maria.jpg
          If the image files are not yet present, beautiful bespoke monogram portrait
          frames are rendered automatically without breaking the layout.
          =============================================================================
        */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-10 md:gap-14 my-4"
        >
          {/* Bilal Rafique's Portrait Frame */}
          <PortraitFrame
            imageSrc={couple.groom.photo}
            name={couple.groom.fullName}
            role="The Groom"
            hometown={couple.groom.hometown}
            initial={couple.groom.initial}
          />

          {/* Maria Jakhro's Portrait Frame */}
          <PortraitFrame
            imageSrc={couple.bride.photo}
            name={couple.bride.fullName}
            role="The Bride"
            hometown={couple.bride.hometown}
            initial={couple.bride.initial}
          />
        </motion.div>

        {/* Bottom subtle divider */}
        <div className="mt-14">
          <OrnamentalDivider variant="lotus" color="gold" />
        </div>
      </div>
    </section>
  );
};
