'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';
import { useCountdown } from '@/hooks/useCountdown';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';
import { FloralCorner } from '@/components/ui/FloralDecoration';
import { Sparkles } from 'lucide-react';

export const Countdown: React.FC = () => {
  const { invitation } = weddingConfig;
  const { days, hours, minutes, seconds, isPast, isMounted } = useCountdown(
    invitation.targetCountdownDateIso
  );

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <section
      id="countdown"
      aria-label="Wedding Countdown"
      className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#381525] via-[#2A0F1C] to-[#1C0A13] text-ivory relative overflow-hidden text-center"
    >
      {/* Delicate Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-rose/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Ornaments */}
      <FloralCorner position="top-left" size={80} color="#C6A46A" className="absolute top-4 left-4 opacity-40 hidden sm:block" />
      <FloralCorner position="top-right" size={80} color="#C6A46A" className="absolute top-4 right-4 opacity-40 hidden sm:block" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-gold-light font-sans font-medium mb-3">
            The Celebration Awaits
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-ivory">
            Counting Down to Forever
          </h2>

          <OrnamentalDivider variant="arch" color="gold" className="my-4" />

          <p className="text-xs sm:text-sm text-champagne/80 max-w-md mx-auto mb-10 font-light">
            Anticipating the blessed day of Bilal &amp; Maria’s Baraat celebration in Karachi.
          </p>
        </motion.div>

        {/* Screen Reader Announcement (Polite, not noisy every second) */}
        <div className="sr-only" aria-live="polite">
          {isMounted
            ? isPast
              ? "The wedding celebration has arrived!"
              : `${days} days, ${hours} hours, and ${minutes} minutes remaining until the wedding.`
            : "Loading countdown..."}
        </div>

        {/* Countdown Visual Units */}
        {isPast ? (
          <div className="p-8 rounded-lg border border-gold/40 bg-burgundy/40 max-w-md mx-auto">
            <Sparkles className="w-8 h-8 text-gold-light mx-auto mb-3" />
            <h3 className="font-serif text-2xl text-gold-shimmer">
              The Celebrations Have Begun!
            </h3>
            <p className="text-xs text-champagne/80 mt-2">
              May this beautiful union be blessed with lifelong happiness and love.
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto"
            aria-hidden="true"
          >
            {units.map((unit) => (
              <div
                key={unit.label}
                className="relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-md bg-gradient-to-b from-[#441A2E]/60 to-[#2A0E1C]/90 border border-gold/30 shadow-lg group hover:border-gold/60 transition-colors duration-300"
              >
                {/* Gold Inset Corners */}
                <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-gold/50" />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-gold/50" />
                <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-gold/50" />
                <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-gold/50" />

                {/* Big Serif Numerals */}
                <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-gold-shimmer tracking-tight">
                  {isMounted ? String(unit.value).padStart(2, '0') : '00'}
                </span>

                {/* Label */}
                <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-champagne/70 font-sans font-medium">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <p className="mt-8 text-[11px] sm:text-xs text-champagne/50 tracking-wider">
          Standard Time: {invitation.targetTimezone} (PKT, UTC+5)
        </p>
      </div>
    </section>
  );
};
