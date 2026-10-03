'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseAudioOptions {
  src: string;
  initialVolume?: number;
  autoPlay?: boolean;
}

// Global singleton state for audio playback across widgets and page
let globalAudio: HTMLAudioElement | null = null;
let globalSrc = '';
let globalIsPlaying = false;
let globalIsLoaded = false;
let globalIsAvailable = true;
let globalHasError = false;
let globalVolume = 0.6;
let globalIsMuted = false;
let globalAutoplayArmed = false;

const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((fn) => {
    try {
      fn();
    } catch {
      // ignore
    }
  });
}

/**
 * Attempts to play the global audio.
 * If blocked by browser autoplay policy, it arms the first-interaction listener.
 */
export function playGlobalAudio(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  if (!globalAudio && globalSrc) {
    initGlobalAudio(globalSrc, globalVolume, true);
  }

  if (!globalAudio) return Promise.resolve();

  return globalAudio
    .play()
    .then(() => {
      globalIsPlaying = true;
      globalHasError = false;
      globalIsAvailable = true;
      notifyListeners();
    })
    .catch((err) => {
      // Browser autoplay restriction (NotAllowedError)
      // Do NOT set hasError to true because the audio file is valid,
      // it's merely waiting for a user gesture.
      armAutoplayOnInteraction();
    });
}

export function pauseGlobalAudio() {
  if (!globalAudio) return;
  globalAudio.pause();
  globalIsPlaying = false;
  notifyListeners();
}

/**
 * Attaches one-time event listeners on window/document to immediately start audio
 * upon the very first user interaction (click, touch, keydown, scroll).
 */
function armAutoplayOnInteraction() {
  if (globalAutoplayArmed || typeof window === 'undefined') return;
  globalAutoplayArmed = true;

  const handleInteraction = () => {
    if (globalAudio && !globalIsPlaying) {
      globalAudio
        .play()
        .then(() => {
          globalIsPlaying = true;
          globalHasError = false;
          globalIsAvailable = true;
          notifyListeners();
        })
        .catch(() => {});
    }
    removeInteractionListeners();
  };

  const removeInteractionListeners = () => {
    window.removeEventListener('click', handleInteraction);
    window.removeEventListener('touchstart', handleInteraction);
    window.removeEventListener('pointerdown', handleInteraction);
    window.removeEventListener('keydown', handleInteraction);
    window.removeEventListener('scroll', handleInteraction);
    globalAutoplayArmed = false;
  };

  window.addEventListener('click', handleInteraction, { once: true, passive: true });
  window.addEventListener('touchstart', handleInteraction, { once: true, passive: true });
  window.addEventListener('pointerdown', handleInteraction, { once: true, passive: true });
  window.addEventListener('keydown', handleInteraction, { once: true, passive: true });
  window.addEventListener('scroll', handleInteraction, { once: true, passive: true });
}

function initGlobalAudio(src: string, initialVolume: number, autoPlay: boolean) {
  if (typeof window === 'undefined') return;

  if (!globalAudio) {
    globalSrc = src;
    globalVolume = initialVolume;
    const audio = new Audio();
    audio.src = src;
    audio.volume = initialVolume;
    audio.preload = 'auto';
    audio.loop = true;
    globalAudio = audio;

    const handleCanPlay = () => {
      globalIsLoaded = true;
      globalIsAvailable = true;
      globalHasError = false;
      notifyListeners();
      if (autoPlay && !globalIsPlaying) {
        playGlobalAudio();
      }
    };

    const handlePlay = () => {
      globalIsPlaying = true;
      notifyListeners();
    };

    const handlePause = () => {
      globalIsPlaying = false;
      notifyListeners();
    };

    const handleEnded = () => {
      globalIsPlaying = false;
      notifyListeners();
    };

    const handleError = () => {
      // Only set error if there is an actual media network or decoding error
      if (audio.error) {
        globalIsAvailable = false;
        globalHasError = true;
        globalIsPlaying = false;
        notifyListeners();
      }
    };

    audio.addEventListener('loadedmetadata', handleCanPlay);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    if (autoPlay) {
      playGlobalAudio();
      armAutoplayOnInteraction();
    }
  } else if (globalSrc !== src) {
    globalSrc = src;
    globalAudio.src = src;
    globalAudio.load();
    if (autoPlay) {
      playGlobalAudio();
    }
  }
}

export function useAudio({ src, initialVolume = 0.6, autoPlay = true }: UseAudioOptions) {
  const [, setTick] = useState(0);

  useEffect(() => {
    initGlobalAudio(src, initialVolume, autoPlay);

    const update = () => setTick((t) => t + 1);
    listeners.add(update);

    // If autoPlay requested and not currently playing, try play or arm
    if (autoPlay && !globalIsPlaying) {
      playGlobalAudio();
      armAutoplayOnInteraction();
    }

    return () => {
      listeners.delete(update);
    };
  }, [src, initialVolume, autoPlay]);

  const play = useCallback(() => {
    return playGlobalAudio();
  }, []);

  const pause = useCallback(() => {
    pauseGlobalAudio();
  }, []);

  const togglePlay = useCallback(() => {
    if (globalIsPlaying) {
      pauseGlobalAudio();
    } else {
      playGlobalAudio();
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const clamped = Math.max(0, Math.min(1, newVolume));
    globalVolume = clamped;
    if (globalAudio) {
      globalAudio.volume = clamped;
    }
    if (clamped === 0) {
      globalIsMuted = true;
    } else if (globalIsMuted) {
      globalIsMuted = false;
    }
    notifyListeners();
  }, []);

  const toggleMute = useCallback(() => {
    if (!globalAudio) return;
    if (globalIsMuted) {
      globalAudio.muted = false;
      globalIsMuted = false;
      if (globalVolume === 0) {
        globalVolume = 0.5;
        globalAudio.volume = 0.5;
      }
    } else {
      globalAudio.muted = true;
      globalIsMuted = true;
    }
    notifyListeners();
  }, []);

  return {
    isPlaying: globalIsPlaying,
    isLoaded: globalIsLoaded,
    isAvailable: globalIsAvailable,
    hasError: globalHasError,
    volume: globalVolume,
    isMuted: globalIsMuted,
    play,
    pause,
    togglePlay,
    setVolume,
    toggleMute,
  };
}
