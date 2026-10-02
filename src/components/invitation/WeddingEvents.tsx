'use client';

import React from 'react';
import { weddingConfig } from '@/config/wedding';
import { EventCard } from './EventCard';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const WeddingEvents: React.FC = () => {
  const { events } = weddingConfig;

  return (
    <section
      id="celebrations"
      aria-label="Our Wedding Celebrations"
      className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-ivory relative"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Itinerary"
          title="Our Wedding Celebrations"
          subtitle="Three days of sacred rituals, joy, music and timeless memories as we unite our lives."
          dividerVariant="arch"
        />

        {/* 3 Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 items-stretch pt-4">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
