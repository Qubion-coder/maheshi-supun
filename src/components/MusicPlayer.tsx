import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { mountainAudio } from '../utils/audioEngine';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    setShowPrompt(false);
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    if (audioRef.current) {
      if (nextState) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }

    // Also toggle procedural mountain audio
    if (nextState) {
      mountainAudio.start().catch(() => {});
    } else {
      mountainAudio.stop();
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);

    if (audioRef.current) {
      audioRef.current.muted = nextMute;
    }
  };

  // Attempt auto-play on mount
  useEffect(() => {
    let playSuccess = false;

    if (audioRef.current) {
      audioRef.current.play().then(() => {
        playSuccess = true;
      }).catch(() => {
        // Autoplay prevented
        setIsPlaying(false);
        setShowPrompt(true);
      });
    }

    mountainAudio.start().catch(() => {});

    // Hide the initial prompt after 9 seconds if it was shown
    const timer = setTimeout(() => {
      setShowPrompt(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="/Harry Styles - Sweet Creature (Audio).mp3"
        loop
        autoPlay
      />

      {/* Floating Tasteful Music Bar (Fixed at bottom right) */}
      <div className="fixed bottom-5 right-4 sm:right-6 z-50 flex items-center gap-2">
        {/* Subtle Welcome Music Prompt */}
        {showPrompt && !isPlaying && (
          <div
            onClick={togglePlay}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#12241b]/95 border border-[#8c6721]/40 text-white shadow-xl backdrop-blur-md text-xs cursor-pointer hover:border-[#8c6721] transition-all animate-bounce"
          >
            <Music className="w-3.5 h-3.5 text-[#8c6721] animate-pulse" />
            <span className="font-serif italic">Play Wedding Serenade</span>
          </div>
        )}

        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0f2117]/90 border border-[#2d4d3a]/80 shadow-2xl backdrop-blur-xl">
          {/* Main Play / Pause Button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause music' : 'Play wedding music'}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1b3b2b] hover:bg-[#25523c] text-[#6b4f1a] text-xs font-medium border border-[#3b634d]/60 transition-all cursor-pointer shadow-sm group"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#8c6721]" />
                <span className="hidden md:inline font-serif italic text-white">Playing Song</span>
                {/* Visualizer bars */}
                <div className="flex items-end gap-0.5 h-3">
                  <div className="w-0.5 h-2 bg-[#8c6721] animate-pulse" />
                  <div className="w-0.5 h-3 bg-[#8c6721] animate-pulse delay-75" />
                  <div className="w-0.5 h-1.5 bg-[#8c6721] animate-pulse delay-150" />
                </div>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#8c6721] fill-[#8c6721]" />
                <span className="text-[11px] uppercase tracking-wider font-sans">Music</span>
              </>
            )}
          </button>

          {/* Mute Button when playing */}
          {isPlaying && (
            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute music' : 'Mute music'}
              className="p-2 rounded-xl text-gray-600 hover:text-white hover:bg-black/10 transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#8c6721]" />}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

