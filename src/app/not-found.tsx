import React from 'react';
import Link from 'next/link';
import { weddingConfig } from '@/config/wedding';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-ivory text-center paper-texture">
      <div className="max-w-md w-full p-8 rounded-lg paper-card bg-ivory-light border border-gold/40">
        <span className="font-serif text-gold-dark text-lg tracking-[0.25em] uppercase">
          {weddingConfig.couple.initials}
        </span>

        <h1 className="font-serif text-4xl text-burgundy font-light mt-3 mb-2">
          Page Not Found
        </h1>

        <OrnamentalDivider variant="arch" color="gold" className="my-4" />

        <p className="text-xs sm:text-sm text-plum/80 font-sans font-light mb-6">
          The requested page could not be found. Please return to Bilal &amp; Maria’s wedding invitation.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-sm bg-burgundy text-ivory text-xs uppercase tracking-[0.2em] hover:bg-burgundy-light transition-colors border border-gold/40"
        >
          Return to Invitation
        </Link>
      </div>
    </div>
  );
}
