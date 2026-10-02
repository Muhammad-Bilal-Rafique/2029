'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAudioOptions {
  src: string;
  initialVolume?: number;
}

export function useAudio({ src, initialVolume = 0.6 }: UseAudioOptions) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [hasError, setHasError] = useState(false);
  const [volume, setVolumeState] = useState(initialVolume);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Only in browser
    if (typeof window === 'undefined') return;

    const audio = new Audio();
    audio.src = src;
    audio.volume = initialVolume;
    audio.preload = 'metadata';
    audioRef.current = audio;

    const handleCanPlay = () => {
      setIsLoaded(true);
      setIsAvailable(true);
      setHasError(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      // File likely missing or not accessible
      setIsAvailable(false);
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleCanPlay);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleCanPlay);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, [src, initialVolume]);

  const play = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setHasError(false);
    } catch {
      // Autoplay restriction or file not found
      setIsPlaying(false);
      setHasError(true);
      setIsAvailable(false);
    }
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  const setVolume = useCallback((newVolume: number) => {
    const clamped = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
    if (clamped === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
      if (volume === 0) {
        setVolume(0.5);
      }
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  }, [isMuted, volume, setVolume]);

  return {
    isPlaying,
    isLoaded,
    isAvailable,
    hasError,
    volume,
    isMuted,
    play,
    pause,
    togglePlay,
    setVolume,
    toggleMute,
  };
}
