'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Mail, Heart, Lock } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onLock?: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  activeSection,
  onLock,
}) => {
  const navItems = [
    { label: 'Home', href: '#hero', icon: <Heart className="w-4 h-4" /> },
    { label: 'Celebrations', href: '#celebrations', icon: <Calendar className="w-4 h-4" /> },
    { label: 'Details', href: '#details', icon: <MapPin className="w-4 h-4" /> },
    { label: 'A Note From Us', href: '#note', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#2A111F]/95 backdrop-blur-md text-champagne p-6 sm:p-8"
        >
          {/* Top Bar with Monogram & Close */}
          <div className="flex items-center justify-between border-b border-gold/30 pb-4">
            <span className="font-serif text-2xl text-gold-shimmer">
              {weddingConfig.couple.initials}
            </span>
            <button
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-2 rounded-full border border-gold/40 text-champagne hover:text-white hover:border-gold transition-colors focus-visible:outline-gold"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col space-y-6 my-auto py-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center space-x-4 text-lg font-serif tracking-widest uppercase transition-colors ${
                  activeSection === item.href.slice(1)
                    ? 'text-gold-light font-semibold'
                    : 'text-champagne/80 hover:text-gold-light'
                }`}
              >
                <span className="text-gold-dark">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Bottom couple info */}
          <div className="border-t border-gold/30 pt-4 text-center space-y-2">
            {onLock && (
              <button
                onClick={() => {
                  onClose();
                  onLock();
                }}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-champagne/70 hover:text-gold-light py-1.5 px-3 border border-gold/30 rounded-sm mb-2"
              >
                <Lock className="w-3.5 h-3.5 text-gold-light" />
                <span>Lock Invitation</span>
              </button>
            )}
            <p className="font-serif italic text-base text-gold-light">
              {weddingConfig.couple.displayNames}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-champagne/60">
              12 September 2029 · Karachi, Pakistan
            </p>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
