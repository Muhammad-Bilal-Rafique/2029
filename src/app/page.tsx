'use client';

import React, { useState, useEffect } from 'react';
import { weddingConfig } from '@/config/wedding';
import { PasswordGate } from '@/components/auth/PasswordGate';
import { OpeningEnvelope } from '@/components/invitation/OpeningEnvelope';
import { Navigation } from '@/components/navigation/Navigation';
import { HeroInvitation } from '@/components/invitation/HeroInvitation';
import { WelcomeSection } from '@/components/invitation/WelcomeSection';
import { WeddingEvents } from '@/components/invitation/WeddingEvents';
import { Countdown } from '@/components/invitation/Countdown';
import { WeddingDetails } from '@/components/invitation/WeddingDetails';
import { PersonalLetter } from '@/components/invitation/PersonalLetter';
import { RSVPSection } from '@/components/invitation/RSVPSection';
import { ClosingSection } from '@/components/invitation/ClosingSection';
import { MusicPlayer } from '@/components/invitation/MusicPlayer';

export default function WeddingInvitationPage() {
  const { security } = weddingConfig;

  // Track authentication state
  // null = evaluating stored credentials on client
  // false = locked, requires password
  // true = unlocked
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    security.isPasswordProtected ? null : true
  );

  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);

  useEffect(() => {
    if (!security.isPasswordProtected) {
      setIsAuthenticated(true);
      return;
    }

    try {
      const stored = localStorage.getItem(security.storageKey);
      if (stored === 'true') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  }, [security.isPasswordProtected, security.storageKey]);

  const handleUnlock = () => {
    setIsAuthenticated(true);
  };

  const handleLock = () => {
    try {
      localStorage.removeItem(security.storageKey);
      document.cookie = `${security.storageKey}=; path=/; max-age=0`;
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    setIsEnvelopeOpened(false);
  };

  // If password protection is active and evaluating authentication
  if (isAuthenticated === null) {
    return (
      <div className="fixed inset-0 bg-[#1D0A14] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
      </div>
    );
  }

  // If locked, render the luxury PasswordGate
  if (!isAuthenticated) {
    return <PasswordGate onUnlock={handleUnlock} />;
  }

  // Once unlocked, render the full wedding invitation experience
  return (
    <div className="relative min-h-screen bg-ivory selection:bg-rose/30 selection:text-burgundy">
      {/* 
        SECTION 1: THE OPENING EXPERIENCE 
        Interactive 3D envelope with custom wax seal, emerging invitation card, 
        and skip button.
      */}
      <OpeningEnvelope
        isOpened={isEnvelopeOpened}
        onOpened={() => setIsEnvelopeOpened(true)}
      />

      {/* Main Website Navigation Header with Lock Option */}
      <Navigation onLock={handleLock} />

      {/* Main Wedding Content Flow */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* SECTION 2: THE HERO INVITATION */}
        <HeroInvitation />

        {/* SECTION 3: A PERSONAL WELCOME */}
        <WelcomeSection />

        {/* SECTION 4: OUR WEDDING CELEBRATIONS */}
        <WeddingEvents />

        {/* SECTION 5: COUNTDOWN TO FOREVER */}
        <Countdown />

        {/* SECTION 6: THE WEDDING DETAILS */}
        <WeddingDetails />

        {/* SECTION 7: A PERSONAL MESSAGE */}
        <PersonalLetter />

        {/* SECTION 8: RSVP */}
        <RSVPSection />

        {/* SECTION 9: MUSIC & CLOSING EXPERIENCE */}
        <ClosingSection onReopenEnvelope={() => setIsEnvelopeOpened(false)} />
      </main>

      {/* Persistent Floating Music Controller (Discreet, No Autoplay) */}
      <MusicPlayer variant="floating" />
    </div>
  );
}
