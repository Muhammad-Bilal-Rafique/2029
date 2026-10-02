'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface PortraitFrameProps {
  imageSrc: string;
  name: string;
  role: string;
  hometown: string;
  initial: string;
  className?: string;
}

export const PortraitFrame: React.FC<PortraitFrameProps> = ({
  imageSrc,
  name,
  role,
  hometown,
  initial,
  className = '',
}) => {
  // If the couple hasn't placed their local photo yet or if it fails to load,
  // we gracefully show the luxury architectural monogram portrait card instead of a broken image.
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Mughal Arch Portrait Container */}
      <div className="relative group">
        {/* Soft Ambient Glow */}
        <div
          className="absolute -inset-2 rounded-[60px_60px_20px_20px] bg-gradient-to-b from-gold/20 via-rose/10 to-transparent blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-700"
          aria-hidden="true"
        />

        {/* Outer Gold Arch Border */}
        <div className="relative w-56 sm:w-64 md:w-72 h-80 sm:h-92 md:h-96 rounded-[70px_70px_16px_16px] p-2 bg-gradient-to-b from-[#E6D2A8] via-[#C6A46A] to-[#8F6F39] shadow-xl">
          {/* Inner Inset Matting */}
          <div className="relative w-full h-full rounded-[64px_64px_12px_12px] bg-[#F4EFE6] overflow-hidden border border-gold/40 flex flex-col items-center justify-center">
            {!hasError ? (
              // Real photograph (Couple will supply /public/images/bilal.jpg and /public/images/maria.jpg)
              <div className="relative w-full h-full">
                <Image
                  src={imageSrc}
                  alt={`${name} - ${role}`}
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, 320px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  onError={() => setHasError(true)}
                  priority={false}
                />
                {/* Subtle warm vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy/40 via-transparent to-transparent pointer-events-none" />
              </div>
            ) : (
              // Handcrafted Editorial Monogram Placeholder (Shown until photos are added to /public/images/)
              <div className="relative w-full h-full flex flex-col items-center justify-between p-6 bg-gradient-to-b from-[#FAF6EE] via-[#F4EFE6] to-[#EAE0D0] text-center select-none">
                {/* Architectural Arch Line */}
                <div className="w-full flex justify-center pt-2">
                  <svg width="80" height="24" viewBox="0 0 80 24" fill="none" className="opacity-60">
                    <path
                      d="M2 20C18 4 62 4 78 20"
                      stroke="#C6A46A"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <circle cx="40" cy="4" r="1.5" fill="#C6A46A" />
                  </svg>
                </div>

                {/* Monogram Seal */}
                <div className="flex flex-col items-center my-auto">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-gold/40 flex items-center justify-center p-2 relative shadow-inner bg-ivory">
                    <div className="w-full h-full rounded-full border border-dashed border-gold/60 flex items-center justify-center bg-gradient-to-br from-ivory to-champagne/40">
                      <span className="font-serif text-5xl sm:text-6xl text-gold-gradient font-light select-none">
                        {initial}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 font-serif text-sm tracking-[0.25em] uppercase text-gold-dark font-medium">
                    {name}
                  </p>
                </div>

                {/* Gentle hint for local photo */}
                <div className="pb-2">
                  <span className="text-[10px] tracking-wider uppercase text-plum/50 font-sans">
                    Portrait Photo Area
                  </span>
                </div>
              </div>
            )}

            {/* Gold Corner Accents on the frame */}
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold/60 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold/60 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Details below portrait */}
      <div className="mt-4 space-y-1">
        <h3 className="font-serif text-2xl sm:text-3xl text-burgundy font-medium tracking-wide">
          {name}
        </h3>
        <p className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold">
          {role}
        </p>
        <p className="text-xs text-plum/70 font-sans tracking-wider">
          {hometown}
        </p>
      </div>
    </div>
  );
};
