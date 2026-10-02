import React from 'react';

interface OrnamentalDividerProps {
  className?: string;
  variant?: 'default' | 'arch' | 'lotus' | 'minimal';
  color?: 'gold' | 'burgundy' | 'rose' | 'sage';
}

export const OrnamentalDivider: React.FC<OrnamentalDividerProps> = ({
  className = '',
  variant = 'default',
  color = 'gold',
}) => {
  const colorMap = {
    gold: {
      stroke: '#C6A46A',
      fill: '#C6A46A',
      lineClass: 'from-transparent via-gold/50 to-transparent',
    },
    burgundy: {
      stroke: '#581D35',
      fill: '#581D35',
      lineClass: 'from-transparent via-burgundy/40 to-transparent',
    },
    rose: {
      stroke: '#C58C91',
      fill: '#C58C91',
      lineClass: 'from-transparent via-rose/40 to-transparent',
    },
    sage: {
      stroke: '#8B9780',
      fill: '#8B9780',
      lineClass: 'from-transparent via-sage/40 to-transparent',
    },
  };

  const selected = colorMap[color];

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center justify-center space-x-3 w-full my-4 ${className}`} aria-hidden="true">
        <div className={`h-[1px] flex-1 bg-gradient-to-r ${selected.lineClass}`} />
        <div className="w-1.5 h-1.5 rotate-45 border border-gold/70" style={{ borderColor: selected.stroke }} />
        <div className={`h-[1px] flex-1 bg-gradient-to-r ${selected.lineClass}`} />
      </div>
    );
  }

  if (variant === 'arch') {
    return (
      <div className={`flex flex-col items-center justify-center my-6 ${className}`} aria-hidden="true">
        <svg
          width="120"
          height="24"
          viewBox="0 0 120 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-80"
        >
          {/* Symmetrical Mughal Arch Header */}
          <path
            d="M2 12H38C48 12 52 4 60 4C68 4 72 12 82 12H118"
            stroke={selected.stroke}
            strokeWidth="0.85"
            strokeLinecap="round"
          />
          {/* Inner subtle cusp */}
          <path
            d="M48 12C52 8 56 6 60 6C64 6 68 8 72 12"
            stroke={selected.stroke}
            strokeWidth="0.6"
            strokeLinecap="round"
          />
          {/* Center Finial */}
          <circle cx="60" cy="2" r="1.5" fill={selected.fill} />
          <circle cx="50" cy="12" r="1" fill={selected.fill} />
          <circle cx="70" cy="12" r="1" fill={selected.fill} />
        </svg>
      </div>
    );
  }

  if (variant === 'lotus') {
    return (
      <div className={`flex items-center justify-center my-6 space-x-3 w-full max-w-xs mx-auto ${className}`} aria-hidden="true">
        <div className={`h-[1px] flex-1 bg-gradient-to-r ${selected.lineClass}`} />
        <svg
          width="32"
          height="20"
          viewBox="0 0 32 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          {/* Lotus Petals */}
          <path
            d="M16 2C16 2 12 8 12 13C12 15.2 13.8 17 16 17C18.2 17 20 15.2 20 13C20 8 16 2 16 2Z"
            stroke={selected.stroke}
            strokeWidth="0.9"
            fill="none"
          />
          <path
            d="M12 14C9 13.5 6 10 6 7C9 9 11 11.5 12 14Z"
            stroke={selected.stroke}
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M20 14C23 13.5 26 10 26 7C23 9 21 11.5 20 14Z"
            stroke={selected.stroke}
            strokeWidth="0.8"
            fill="none"
          />
          <circle cx="16" cy="18" r="1.2" fill={selected.fill} />
        </svg>
        <div className={`h-[1px] flex-1 bg-gradient-to-r ${selected.lineClass}`} />
      </div>
    );
  }

  // Default Ornamental Divider
  return (
    <div className={`flex items-center justify-center my-6 space-x-4 w-full max-w-sm mx-auto ${className}`} aria-hidden="true">
      <div className={`h-[1px] flex-1 bg-gradient-to-r ${selected.lineClass}`} />
      <svg
        width="48"
        height="18"
        viewBox="0 0 48 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 opacity-90"
      >
        <path
          d="M24 1L27.5 9L24 17L20.5 9L24 1Z"
          stroke={selected.stroke}
          strokeWidth="0.9"
          fill="none"
        />
        <circle cx="24" cy="9" r="2" fill={selected.fill} />
        <circle cx="12" cy="9" r="1.2" fill={selected.fill} />
        <circle cx="36" cy="9" r="1.2" fill={selected.fill} />
        <path d="M4 9H10M38 9H44" stroke={selected.stroke} strokeWidth="0.8" strokeLinecap="round" />
      </svg>
      <div className={`h-[1px] flex-1 bg-gradient-to-r ${selected.lineClass}`} />
    </div>
  );
};
