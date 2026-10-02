'use client';

import React, { useState } from 'react';
import { useAudio } from '@/hooks/useAudio';
import { weddingConfig } from '@/config/wedding';
import { Music, Play, Pause, Volume2, VolumeX, AlertCircle, Info } from 'lucide-react';

interface MusicPlayerProps {
  variant?: 'floating' | 'inline';
  className?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  variant = 'floating',
  className = '',
}) => {
  const { music } = weddingConfig;
  const {
    isPlaying,
    isAvailable,
    hasError,
    volume,
    isMuted,
    togglePlay,
    setVolume,
    toggleMute,
  } = useAudio({ src: music.audioSrc, initialVolume: 0.6 });

  const [showTooltip, setShowTooltip] = useState(false);

  // Floating Discreet Widget
  if (variant === 'floating') {
    return (
      <aside
        aria-label="Background Music Controller"
        className={`fixed bottom-5 right-5 z-40 ${className}`}
      >
        <div className="relative flex items-center">
          {/* Tooltip on error or hover */}
          {(showTooltip || hasError) && (
            <div
              role="status"
              className="absolute bottom-full right-0 mb-3 w-64 p-3 rounded bg-plum-dark/95 text-champagne border border-gold/40 text-xs shadow-xl backdrop-blur-md"
            >
              <div className="flex items-start space-x-2">
                {hasError ? (
                  <AlertCircle className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                ) : (
                  <Music className="w-4 h-4 text-gold-light shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <p className="font-semibold text-gold-light">
                    {music.title} — {music.artist}
                  </p>
                  <p className="text-[11px] opacity-80 leading-tight">
                    {hasError
                      ? "Audio file pending. Place 'him-and-i.mp3' in /public/audio/ to play."
                      : isPlaying
                      ? 'Music playing. Click to pause.'
                      : 'Click to play background music.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Floating Action Button */}
          <button
            onClick={() => {
              if (hasError) {
                setShowTooltip(!showTooltip);
              } else {
                togglePlay();
              }
            }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            aria-label={
              hasError
                ? "Background music unavailable (pending file)"
                : isPlaying
                ? `Pause music (${music.title})`
                : `Play music (${music.title})`
            }
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border focus-visible:outline-gold ${
              isPlaying
                ? 'bg-burgundy text-gold-light border-gold shadow-gold/20 animate-pulse'
                : hasError
                ? 'bg-plum-dark/80 text-champagne/60 border-gold/30 hover:border-gold/60'
                : 'bg-ivory text-burgundy border-gold/60 hover:border-gold hover:bg-champagne/30'
            }`}
          >
            {hasError ? (
              <Music className="w-5 h-5 opacity-50" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 translate-x-0.5" />
            )}
          </button>
        </div>
      </aside>
    );
  }

  // Inline Section Player
  return (
    <div
      className={`p-6 sm:p-8 rounded-lg bg-gradient-to-b from-[#351525]/70 to-[#220B16]/90 border border-gold/40 text-ivory shadow-xl max-w-lg mx-auto ${className}`}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Animated Equalizer Wave or Music Icon */}
        <div className="w-14 h-14 rounded-full bg-burgundy/60 border border-gold/50 flex items-center justify-center text-gold-light shadow-inner">
          {isPlaying ? (
            <div className="flex items-end space-x-1 h-6">
              <span className="w-1 bg-gold-light rounded-full h-3 animate-bounce" />
              <span className="w-1 bg-gold-light rounded-full h-6 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1 bg-gold-light rounded-full h-4 animate-bounce [animation-delay:0.4s]" />
              <span className="w-1 bg-gold-light rounded-full h-2 animate-bounce [animation-delay:0.1s]" />
            </div>
          ) : (
            <Music className="w-6 h-6" />
          )}
        </div>

        {/* Track Title and Artist */}
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-light/70 font-sans block mb-1">
            Couple’s Song Selection
          </span>
          <h4 className="font-serif text-2xl text-gold-shimmer font-normal">
            “{music.title}”
          </h4>
          <p className="text-xs text-champagne/80 mt-0.5 tracking-wider font-light">
            by {music.artist}
          </p>
        </div>

        {/* Controls */}
        {hasError ? (
          <div className="p-3 rounded bg-plum-dark/60 border border-gold/25 text-left text-xs text-champagne/80 flex items-start space-x-2.5">
            <Info className="w-4 h-4 text-gold-light shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-gold-light block">
                Local Audio Setup
              </span>
              <p className="text-[11px] leading-relaxed">
                {music.note} The player will activate once the file is placed in your project.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-4 pt-2">
            {/* Play/Pause Button */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark text-[#26101D] font-sans text-xs uppercase tracking-[0.2em] font-semibold flex items-center space-x-2 shadow-md hover:brightness-105 active:scale-98 transition-all"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current translate-x-0.5" />
                    <span>Play Music</span>
                  </>
                )}
              </button>

              <button
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                className="p-2.5 rounded-full border border-gold/40 hover:border-gold text-champagne transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Volume Slider (Accessible) */}
            <div className="flex items-center justify-center space-x-3 text-xs text-champagne/70 max-w-xs mx-auto">
              <span className="text-[10px] uppercase tracking-wider">Volume</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                aria-label="Volume slider"
                className="w-32 accent-[#C6A46A] cursor-pointer"
              />
              <span className="w-8 text-[11px] text-right font-mono">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
