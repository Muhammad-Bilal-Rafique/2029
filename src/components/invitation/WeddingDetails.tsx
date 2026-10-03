'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getDayOfWeek } from '@/lib/date-utils';
import { MapPin, Calendar, Clock, Sparkles, Navigation2 } from 'lucide-react';

export const WeddingDetails: React.FC = () => {
  const { events } = weddingConfig;

  return (
    <section
      id="details"
      aria-label="Wedding Details and Schedule"
      className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-ivory via-[#FAF4EA] to-ivory relative"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Key Information"
          title="Everything You Need to Know"
          subtitle="Clear schedule and event details for your convenience as our honored guest."
          dividerVariant="arch"
        />

        {/* Travel Note Callout for Baraat */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 p-4 sm:p-5 rounded border border-gold/40 bg-champagne-light/70 text-center max-w-xl mx-auto"
        >
          <div className="flex items-center justify-center space-x-2 text-burgundy font-serif text-sm sm:text-base font-medium">
            <MapPin className="w-4 h-4 text-gold-dark" />
            <span>Travel Notice</span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-plum/80 font-sans font-light">
            The Baraat celebration will take place in Karachi.
          </p>
        </motion.div>

        {/* Structured Event Cards / Table */}
        <div className="space-y-6">
          {events.map((event, idx) => {
            const dayOfWeek = getDayOfWeek(event.dateString);
            const hasVenue = Boolean(event.venue);

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 sm:p-8 rounded-lg bg-ivory-light border border-gold/40 shadow-sm paper-card hover:border-gold/70 transition-all duration-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Left Column: Event Identity */}
                  <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-gold/30 pb-4 md:pb-0 md:pr-6">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-gold-dark font-semibold">
                      Event {idx + 1}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-burgundy font-medium mt-1">
                      {event.title}
                    </h3>
                    <p className="text-xs text-plum/70 font-sans mt-1">
                      {event.tagline}
                    </p>
                  </div>

                  {/* Middle Column: Details Grid */}
                  <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    {/* Date & Day */}
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-plum/50 font-medium">
                          Date &amp; Day
                        </span>
                        <span className="font-serif wedding-date text-base text-burgundy font-medium">
                          {event.displayDate}
                        </span>
                        <span className="block text-xs text-plum/70">
                          {dayOfWeek}
                        </span>
                      </div>
                    </div>

                    {/* Venue & City */}
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-plum/50 font-medium">
                          Venue &amp; Location
                        </span>
                        <span className="text-xs sm:text-sm text-plum font-medium">
                          {event.venue || (
                            <span className="italic font-light text-plum/70">
                              {event.venuePlaceholder}
                            </span>
                          )}
                        </span>
                        <span className="block text-xs text-plum/70">
                          {event.city}
                        </span>
                      </div>
                    </div>

                    {/* Timing */}
                    <div className="flex items-start space-x-3">
                      <Clock className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-plum/50 font-medium">
                          Program Timing
                        </span>
                        <span className="text-xs sm:text-sm text-plum font-medium">
                          {event.time || (
                            <span className="italic font-light text-plum/70">
                              {event.timePlaceholder}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Attire / Dress Code */}
                    <div className="flex items-start space-x-3">
                      <Sparkles className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-plum/50 font-medium">
                          Dress Code
                        </span>
                        <span className="text-xs text-plum/80 font-light">
                          {event.dressCode}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Directions Action (Only shown when venue is confirmed with a real link) */}
                {hasVenue && event.mapUrl && (
                  <div className="mt-4 pt-4 border-t border-gold/20 flex justify-end">
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-gold-dark hover:text-burgundy font-medium"
                    >
                      <Navigation2 className="w-3.5 h-3.5" />
                      <span>Get Directions on Google Maps →</span>
                    </a>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
