'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { WeddingEvent } from '@/config/wedding';
import { getDayOfWeek } from '@/lib/date-utils';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';

interface EventCardProps {
  event: WeddingEvent;
  index: number;
}

export const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  const dayOfWeek = getDayOfWeek(event.dateString);
  const isBaraat = event.id === 'baraat';
  const isMehndi = event.id === 'mehndi';

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      aria-label={`${event.title} Celebration Details`}
      className={`relative flex flex-col justify-between rounded-lg overflow-hidden transition-all duration-500 paper-card ${
        isBaraat
          ? 'bg-gradient-to-b from-[#4A172C] via-[#351020] to-[#220B15] text-ivory border-2 border-gold/70 shadow-2xl md:-translate-y-3 z-10'
          : isMehndi
          ? 'bg-gradient-to-b from-[#FDFBF7] via-[#F8F4EC] to-[#F1E9DA] text-plum border border-gold/40'
          : 'bg-gradient-to-b from-[#FAF7F2] via-[#F4ECE0] to-[#EAE0D0] text-plum border border-gold/40'
      }`}
    >
      {/* Featured Badge for Baraat (The Central Wedding Day) */}
      {isBaraat && (
        <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark text-[#2E121E] py-1 text-center font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold shadow-md z-20">
          ★ The Central Wedding Day ★
        </div>
      )}

      {/* Decorative Card Header */}
      <div className={`p-6 sm:p-8 ${isBaraat ? 'pt-10' : ''}`}>
        {/* Top Tagline & Motif */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold px-2.5 py-1 rounded border ${
              isBaraat
                ? 'bg-rose-900/60 text-gold-light border-gold/40'
                : isMehndi
                ? 'bg-amber-100/80 text-amber-900 border-amber-300/60'
                : 'bg-rose-100/80 text-rose-900 border-rose-300/60'
            }`}
          >
            {event.tagline}
          </span>

          {/* Event Number Roman Numeral */}
          <span
            className={`font-serif text-sm tracking-widest ${
              isBaraat ? 'text-gold-light/60' : 'text-gold-dark/60'
            }`}
          >
            {index === 0 ? 'I' : index === 1 ? 'II' : 'III'}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-serif text-3xl sm:text-4xl tracking-wide font-normal mb-2 ${
            isBaraat ? 'text-gold-shimmer' : 'text-burgundy'
          }`}
        >
          {event.title}
        </h3>

        {/* Date and Day of Week */}
        <div className="flex flex-wrap items-baseline gap-2 mb-4">
          <span
            className={`font-serif text-lg sm:text-xl font-medium ${
              isBaraat ? 'text-ivory' : 'text-plum'
            }`}
          >
            {event.displayDate}
          </span>
          <span
            className={`text-xs uppercase tracking-widest font-sans ${
              isBaraat ? 'text-gold-light' : 'text-gold-dark'
            }`}
          >
            · {dayOfWeek}
          </span>
        </div>

        {/* Ornamental divider inside card */}
        <OrnamentalDivider
          variant="minimal"
          color={isBaraat ? 'gold' : 'gold'}
          className="my-3"
        />

        {/* Short Description */}
        <p
          className={`text-xs sm:text-sm leading-relaxed font-sans font-light mb-6 ${
            isBaraat ? 'text-champagne/90' : 'text-plum/80'
          }`}
        >
          {event.shortDescription}
        </p>

        {/* Event Details Grid (Accurate placeholders until confirmed) */}
        <div
          className={`rounded p-4 space-y-3 border text-xs sm:text-sm ${
            isBaraat
              ? 'bg-black/25 border-gold/30 text-champagne'
              : 'bg-ivory/80 border-gold/25 text-plum/90'
          }`}
        >
          {/* City / Location */}
          <div className="flex items-start space-x-2.5">
            <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${isBaraat ? 'text-gold-light' : 'text-gold-dark'}`} />
            <div>
              <span className="block text-[10px] uppercase tracking-wider opacity-60">City</span>
              <span className="font-medium">{event.city}</span>
            </div>
          </div>

          {/* Venue (Honest placeholder) */}
          <div className="flex items-start space-x-2.5">
            <div className={`w-4 h-4 shrink-0 flex items-center justify-center mt-0.5 ${isBaraat ? 'text-gold-light' : 'text-gold-dark'}`}>
              <span className="text-xs">🏛️</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider opacity-60">Venue</span>
              <span className="italic font-light opacity-90">
                {event.venue || event.venuePlaceholder}
              </span>
            </div>
          </div>

          {/* Time (Honest placeholder) */}
          <div className="flex items-start space-x-2.5">
            <Clock className={`w-4 h-4 shrink-0 mt-0.5 ${isBaraat ? 'text-gold-light' : 'text-gold-dark'}`} />
            <div>
              <span className="block text-[10px] uppercase tracking-wider opacity-60">Timing</span>
              <span className="italic font-light opacity-90">
                {event.time || event.timePlaceholder}
              </span>
            </div>
          </div>

          {/* Dress code */}
          {event.dressCode && (
            <div className="flex items-start space-x-2.5 pt-1 border-t border-gold/20">
              <Sparkles className={`w-4 h-4 shrink-0 mt-0.5 ${isBaraat ? 'text-gold-light' : 'text-gold-dark'}`} />
              <div>
                <span className="block text-[10px] uppercase tracking-wider opacity-60">Attire</span>
                <span className="text-xs font-light">{event.dressCode}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Travel Note (if Baraat) or subtle footer */}
      {event.travelNote && (
        <div className="px-6 sm:px-8 pb-6 pt-0">
          <p className="text-[11px] sm:text-xs text-gold-light/90 italic border-l-2 border-gold/60 pl-3 py-1">
            Note: {event.travelNote}
          </p>
        </div>
      )}
    </motion.article>
  );
};
