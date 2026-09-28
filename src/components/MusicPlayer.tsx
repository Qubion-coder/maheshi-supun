import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { mountainAudio } from '../utils/audioEngine';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
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

  // Hide the initial prompt after 9 seconds
  useEffect(() => {
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
      />

      {/* Floating Tasteful Music Bar (Fixed at bottom right) */}
      <div className="fixed bottom-5 right-4 sm:right-6 z-50 flex items-center gap-2">
        {/* Subtle Welcome Music Prompt */}
        {showPrompt && !isPlaying && (
          <div
            onClick={togglePlay}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#12241b]/95 border border-[#d4b07b]/40 text-[#f5ebd7] shadow-xl backdrop-blur-md text-xs cursor-pointer hover:border-[#d4b07b] transition-all animate-bounce"
          >
            <Music className="w-3.5 h-3.5 text-[#d4b07b] animate-pulse" />
            <span className="font-serif italic">Play Wedding Serenade</span>
          </div>
        )}

        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0f2117]/90 border border-[#2d4d3a]/80 shadow-2xl backdrop-blur-xl">
          {/* Main Play / Pause Button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause music' : 'Play wedding music'}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1b3b2b] hover:bg-[#25523c] text-[#f4dfb8] text-xs font-medium border border-[#3b634d]/60 transition-all cursor-pointer shadow-sm group"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#d4b07b]" />
                <span className="hidden md:inline font-serif italic text-[#e8eee9]">Playing Song</span>
                {/* Visualizer bars */}
                <div className="flex items-end gap-0.5 h-3">
                  <div className="w-0.5 h-2 bg-[#d4b07b] animate-pulse" />
                  <div className="w-0.5 h-3 bg-[#d4b07b] animate-pulse delay-75" />
                  <div className="w-0.5 h-1.5 bg-[#d4b07b] animate-pulse delay-150" />
                </div>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#d4b07b] fill-[#d4b07b]" />
                <span className="text-[11px] uppercase tracking-wider font-sans">Music</span>
              </>
            )}
          </button>

          {/* Mute Button when playing */}
          {isPlaying && (
            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute music' : 'Mute music'}
              className="p-2 rounded-xl text-[#9cb5a6] hover:text-[#f4f7f4] hover:bg-white/10 transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#d4b07b]" />}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
