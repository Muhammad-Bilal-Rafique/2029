'use client';

import React, { useState, useEffect } from 'react';
import { weddingConfig } from '@/config/wedding';
import { MobileNavigation } from './MobileNavigation';
import { Menu, Lock } from 'lucide-react';

interface NavigationProps {
  onLock?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onLock }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Track active section
      const sectionIds = ['hero', 'celebrations', 'details', 'note', 'rsvp'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Celebrations', href: '#celebrations' },
    { label: 'Details', href: '#details' },
    { label: 'A Note From Us', href: '#note' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  return (
    <>
      <header
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-ivory/90 backdrop-blur-md border-b border-gold/40 shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            className="flex items-center space-x-2 group focus-visible:outline-gold"
            aria-label="Bilal & Maria Wedding Home"
          >
            <span className="font-serif text-2xl sm:text-3xl text-burgundy tracking-wider font-light group-hover:text-gold-dark transition-colors">
              {weddingConfig.couple.initials}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
            <span className="hidden sm:inline font-serif text-xs uppercase tracking-[0.25em] text-plum/70 font-light">
              12·09·2029
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.2em] font-sans font-medium transition-all duration-200 relative py-1 ${
                    isActive
                      ? 'text-burgundy font-semibold'
                      : 'text-plum/70 hover:text-burgundy'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold rounded-full" />
                  )}
                </a>
              );
            })}

            {onLock && (
              <button
                onClick={onLock}
                title="Lock Invitation"
                aria-label="Lock Invitation"
                className="p-1.5 rounded-full border border-gold/40 text-plum/60 hover:text-burgundy hover:border-gold transition-colors focus-visible:outline-gold cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {onLock && (
              <button
                onClick={onLock}
                title="Lock Invitation"
                aria-label="Lock Invitation"
                className="p-2 rounded border border-gold/40 text-plum/70 hover:border-gold hover:text-burgundy transition-colors focus-visible:outline-gold"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="p-2 rounded border border-gold/40 text-burgundy hover:border-gold hover:bg-champagne/20 transition-colors focus-visible:outline-gold"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
        onLock={onLock}
      />
    </>
  );
};
