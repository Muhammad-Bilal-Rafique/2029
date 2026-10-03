'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface PortraitFrameProps {
  imageSrc?: string | null;
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
  const [hasError, setHasError] = useState(false);
  const showPhoto = Boolean(imageSrc) && !hasError;

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Mughal Arch Portrait Container */}
      <div className="relative group">
        {/* Soft Ambient Glow */}
        <div
          className="absolute -inset-2 rounded-[60px_60px_20px_20px] bg-gradient-to-b from-gold/25 via-rose/15 to-transparent blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-700"
          aria-hidden="true"
        />

        {/* Outer Gold Arch Border */}
        <div className="relative w-56 sm:w-64 md:w-72 h-80 sm:h-92 md:h-96 rounded-[70px_70px_16px_16px] p-2 bg-gradient-to-b from-[#E6D2A8] via-[#C6A46A] to-[#8F6F39] shadow-xl">
          {/* Inner Inset Matting */}
          <div className="relative w-full h-full rounded-[64px_64px_12px_12px] bg-[#F4EFE6] overflow-hidden border border-gold/40 flex flex-col items-center justify-center">
            {showPhoto && imageSrc ? (
              // Real photograph (e.g. Groom's portrait)
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
              // Handcrafted Royal Monogram Emblem
              <div className="relative w-full h-full flex flex-col items-center justify-between p-5 sm:p-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFDF9] via-[#F7F1E5] to-[#EBE0CD] text-center select-none overflow-hidden">
                {/* Subtle Islamic Arabesque Watermark Texture in Background */}
                <div
                  className="absolute inset-0 opacity-[0.07] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#C6A46A 1.5px, transparent 1.5px), radial-gradient(#8F6F39 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                    backgroundPosition: '0 0, 12px 12px',
                  }}
                  aria-hidden="true"
                />

                {/* Mughal Cusped Arch Header Line */}
                <div className="w-full flex flex-col items-center pt-2 relative z-10">
                  <svg width="110" height="28" viewBox="0 0 110 28" fill="none" className="opacity-80">
                    <path
                      d="M2 26C16 14 30 18 42 8C48 3 55 1 55 1C55 1 62 3 68 8C80 18 94 14 108 26"
                      stroke="#C6A46A"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 26C22 17 32 20 44 11C49 7 55 4 55 4C55 4 61 7 66 11C78 20 88 17 100 26"
                      stroke="#C6A46A"
                      strokeWidth="0.6"
                      strokeLinecap="round"
                      opacity="0.6"
                    />
                    <circle cx="55" cy="1" r="2" fill="#C6A46A" />
                    <circle cx="42" cy="8" r="1.2" fill="#C6A46A" />
                    <circle cx="68" cy="8" r="1.2" fill="#C6A46A" />
                  </svg>
                </div>

                {/* Royal Monogram Medallion */}
                <div className="flex flex-col items-center my-auto relative z-10">
                  <div className="relative flex items-center justify-center">
                    {/* Ambient Gold Glow around the Seal */}
                    <div className="absolute -inset-2 rounded-full bg-gold/15 blur-md" aria-hidden="true" />

                    {/* Outer Gilded Rim */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full p-1.5 bg-gradient-to-tr from-[#9C7E48] via-[#E4D0A5] via-[#C6A46A] to-[#8F6F39] shadow-lg flex items-center justify-center">
                      {/* Beaded / Dashed Ring Layer */}
                      <div className="w-full h-full rounded-full p-1 bg-[#FDFBF7] border border-gold/40 flex items-center justify-center shadow-inner">
                        {/* Inner Medallion Canvas */}
                        <div className="w-full h-full rounded-full border border-gold/30 bg-gradient-to-br from-[#FFFDF9] via-[#FAF4E8] to-[#EFE3CD] flex flex-col items-center justify-center relative overflow-hidden shadow-[inset_0_2px_6px_rgba(140,109,56,0.15)]">
                          {/* Delicate Olive/Motia Laurel Accent Behind Initial */}
                          <svg
                            viewBox="0 0 100 100"
                            className="absolute inset-0 w-full h-full opacity-20 text-gold-dark pointer-events-none"
                            fill="currentColor"
                          >
                            <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                          </svg>

                          {/* Monogram Initial Letter */}
                          <span className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal text-gold-gradient select-none drop-shadow-[0_2px_4px_rgba(140,109,56,0.25)] tracking-normal transform -translate-y-0.5">
                            {initial}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Name inside frame */}
                  <p className="mt-3 font-serif text-xs sm:text-sm tracking-[0.22em] uppercase text-burgundy font-medium">
                    {name}
                  </p>
                </div>

                {/* Bottom Architectural Accents */}
                <div className="w-full flex flex-col items-center pb-2 relative z-10 space-y-1">
                  {/* Filigree Divider */}
                  <svg width="70" height="10" viewBox="0 0 70 10" fill="none" className="opacity-75">
                    <line x1="0" y1="5" x2="26" y2="5" stroke="#C6A46A" strokeWidth="0.8" />
                    <circle cx="35" cy="5" r="2" fill="#C6A46A" />
                    <circle cx="30" cy="5" r="1" fill="#C6A46A" />
                    <circle cx="40" cy="5" r="1" fill="#C6A46A" />
                    <line x1="44" y1="5" x2="70" y2="5" stroke="#C6A46A" strokeWidth="0.8" />
                  </svg>
                  <span className="font-script text-lg sm:text-xl text-gold-dark/90 tracking-wide">
                    {role}
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
