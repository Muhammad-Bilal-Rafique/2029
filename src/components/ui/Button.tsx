import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'gold' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 space-x-2',
    md: 'text-xs sm:text-sm px-6 py-3 space-x-2.5',
    lg: 'text-sm sm:text-base px-8 py-3.5 space-x-3',
  };

  const variantStyles = {
    primary:
      'bg-burgundy text-ivory hover:bg-burgundy-light border border-gold/40 shadow-md hover:shadow-lg hover:border-gold active:scale-[0.99]',
    outline:
      'bg-transparent text-burgundy border border-gold/60 hover:border-gold hover:bg-champagne/40 active:scale-[0.99]',
    gold:
      'bg-gradient-to-r from-[#DFCA9B] via-[#C6A46A] to-[#B08D4C] text-burgundy-dark font-semibold shadow-md hover:shadow-xl hover:brightness-105 active:scale-[0.99]',
    ghost:
      'bg-transparent text-burgundy hover:text-gold-dark hover:bg-champagne/20 border-b border-transparent hover:border-gold/50 rounded-none px-2',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
