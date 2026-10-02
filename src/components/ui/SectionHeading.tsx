import React from 'react';
import { OrnamentalDivider } from './OrnamentalDivider';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  dividerVariant?: 'default' | 'arch' | 'lotus' | 'minimal' | 'none';
  className?: string;
  inverted?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dividerVariant = 'arch',
  className = '',
  inverted = false,
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-10 sm:mb-14 ${isCenter ? 'text-center mx-auto' : 'text-left'} max-w-2xl ${className}`}>
      {eyebrow && (
        <p
          className={`text-xs sm:text-sm uppercase tracking-[0.3em] font-medium mb-3 ${
            inverted ? 'text-gold-light' : 'text-gold-dark'
          }`}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={`font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide leading-tight ${
          inverted ? 'text-ivory' : 'text-burgundy'
        }`}
      >
        {title}
      </h2>

      {dividerVariant !== 'none' && (
        <OrnamentalDivider
          variant={dividerVariant}
          color={inverted ? 'gold' : 'gold'}
          className="my-3 sm:my-4"
        />
      )}

      {subtitle && (
        <p
          className={`text-sm sm:text-base leading-relaxed font-sans font-light mt-2 max-w-lg ${
            isCenter ? 'mx-auto' : ''
          } ${inverted ? 'text-champagne/80' : 'text-plum/80'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
