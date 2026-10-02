import React from 'react';

interface FloralCornerProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
  color?: string;
}

export const FloralCorner: React.FC<FloralCornerProps> = ({
  position = 'top-left',
  className = '',
  size = 80,
  color = '#C6A46A',
}) => {
  const rotationMap = {
    'top-left': '',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'scale-y-[-1]',
    'bottom-right': 'scale-x-[-1] scale-y-[-1]',
  };

  return (
    <div
      className={`pointer-events-none select-none ${rotationMap[position]} ${className}`}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-70"
      >
        {/* Outer Corner Frame */}
        <path
          d="M4 96V16C4 9.37 9.37 4 16 4H96"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Inner parallel accent */}
        <path
          d="M10 96V22C10 15.37 15.37 10 22 10H96"
          stroke={color}
          strokeWidth="0.6"
          strokeLinecap="round"
        />

        {/* Motia / Jasmine Blossom in corner */}
        <circle cx="28" cy="28" r="4" stroke={color} strokeWidth="0.8" fill="none" />
        <circle cx="28" cy="28" r="1.5" fill={color} />

        {/* Delicate petals */}
        <path
          d="M28 20C28 20 25 24 28 24C31 24 28 20 28 20Z"
          stroke={color}
          strokeWidth="0.75"
          fill="none"
        />
        <path
          d="M36 28C36 28 32 25 32 28C32 31 36 28 36 28Z"
          stroke={color}
          strokeWidth="0.75"
          fill="none"
        />
        <path
          d="M28 36C28 36 31 32 28 32C25 32 28 36 28 36Z"
          stroke={color}
          strokeWidth="0.75"
          fill="none"
        />
        <path
          d="M20 28C20 28 24 31 24 28C24 25 20 28 20 28Z"
          stroke={color}
          strokeWidth="0.75"
          fill="none"
        />

        {/* Vine leaf scrolls */}
        <path
          d="M32 24C38 18 46 16 56 16C62 16 66 18 70 20"
          stroke={color}
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        <path
          d="M24 32C18 38 16 46 16 56C16 62 18 66 20 70"
          stroke={color}
          strokeWidth="0.75"
          strokeLinecap="round"
        />

        {/* Little bud dots */}
        <circle cx="56" cy="16" r="1.2" fill={color} />
        <circle cx="16" cy="56" r="1.2" fill={color} />
      </svg>
    </div>
  );
};

export const MotiaGarland: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center space-x-2 opacity-80 ${className}`} aria-hidden="true">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="3" stroke="#C6A46A" strokeWidth="0.75" />
          <circle cx="10" cy="10" r="1.2" fill="#C6A46A" />
          <path d="M10 4V7M10 13V16M4 10H7M13 10H16" stroke="#C6A46A" strokeWidth="0.6" strokeLinecap="round" />
        </svg>
        {i < 4 && <div className="w-3 h-[0.75px] bg-gold/40" />}
      </div>
    ))}
  </div>
);
