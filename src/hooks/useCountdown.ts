'use client';

import { useState, useEffect } from 'react';
import { calculateTimeRemaining, CountdownTimeRemaining } from '@/lib/date-utils';

export function useCountdown(targetIsoString: string) {
  const [timeRemaining, setTimeRemaining] = useState<CountdownTimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
    totalMs: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Initial calculation
    setTimeRemaining(calculateTimeRemaining(targetIsoString));

    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetIsoString));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetIsoString]);

  return {
    ...timeRemaining,
    isMounted,
  };
}
