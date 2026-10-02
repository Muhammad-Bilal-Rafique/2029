/**
 * Utility functions for accurate date, day-of-week, and timezone calculations.
 */

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Calculates the day of the week programmatically from a 'YYYY-MM-DD' string
 * without timezone boundary shifting issues.
 */
export function getDayOfWeek(dateString: string): string {
  const parts = dateString.split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    return '';
  }
  const [year, month, day] = parts;
  // Note: Month in JS Date is 0-indexed
  const date = new Date(year, month - 1, day, 12, 0, 0);
  return DAYS[date.getDay()];
}

/**
 * Formats a 'YYYY-MM-DD' string into readable format (e.g. "Tuesday, 11 September 2029").
 */
export function formatLongDate(dateString: string): string {
  const parts = dateString.split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    return dateString;
  }
  const [year, month, day] = parts;
  const dayName = getDayOfWeek(dateString);
  const monthName = MONTHS[month - 1];
  return `${dayName}, ${day} ${monthName} ${year}`;
}

export interface CountdownTimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  totalMs: number;
}

/**
 * Computes remaining time to target ISO string (with timezone offset, e.g. +05:00 for PKT).
 */
export function calculateTimeRemaining(targetIsoString: string): CountdownTimeRemaining {
  const targetTime = new Date(targetIsoString).getTime();
  const now = Date.now();
  const totalMs = targetTime - now;

  if (isNaN(targetTime) || totalMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
      totalMs: 0,
    };
  }

  const seconds = Math.floor((totalMs / 1000) % 60);
  const minutes = Math.floor((totalMs / 1000 / 60) % 60);
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
    isPast: false,
    totalMs,
  };
}
