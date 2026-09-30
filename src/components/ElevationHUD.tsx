import React, { useState } from 'react';
import { Volume2, VolumeX, Compass, MapPin, ChevronDown } from 'lucide-react';
import { ELEVATION_STAGES, WEDDING_COUPLE } from '../data/weddingData';
import { mountainAudio } from '../utils/audioEngine';

interface ElevationHUDProps {
  currentElevation: number;
  currentStageIndex: number;
  onNavigateToSection: (sectionId: string) => void;
}

export const ElevationHUD: React.FC<ElevationHUDProps> = ({
  currentElevation,
  currentStageIndex,
  onNavigateToSection,
}) => {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleSound = () => {
    const newState = mountainAudio.toggle();
    setIsAudioActive(newState);
  };

  const currentStage = ELEVATION_STAGES[currentStageIndex] || ELEVATION_STAGES[0];
  const progressPercent = Math.round(
    ((currentElevation - WEDDING_COUPLE.elevationBase) /
      (WEDDING_COUPLE.elevationPeak - WEDDING_COUPLE.elevationBase)) *
      100
  );

  return (
    <>
      {/* Top Floating Bar - 3-Zone Contract: Brand, Status, Actions */}
      <header className="fixed top-0 inset-x-0 z-40 px-4 md:px-8 py-3.5 flex items-center justify-between backdrop-blur-md bg-[#0a120e]/65 border-b border-white/5 transition-all duration-300">
        {/* Zone 1: Monogram / Brand */}
        <button
          onClick={() => onNavigateToSection('hero')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-serif text-lg tracking-wider text-white group-hover:text-[#6b4f1a] transition-colors">
            {WEDDING_COUPLE.initials}
          </span>
          <span className="hidden sm:inline-block ml-3 text-xs tracking-widest text-[#8a9d91] uppercase">
            The Ascent
          </span>
        </button>

        {/* Zone 2: Altimeter & Stage Gauge */}
        <div className="flex items-center gap-3 md:gap-5 text-xs text-[#a2b5a9]">
          <div className="flex items-center gap-1.5 bg-[#142019]/80 px-2.5 py-1 rounded-md border border-[#2b3d32]/60">
            <Compass className="w-3.5 h-3.5 text-[#8c6721]" />
            <span className="tabular-nums font-mono text-[#dcded8]">
              {Math.round(currentElevation)}m
            </span>
            <span className="text-[#64796e] hidden xs:inline">·</span>
            <span className="text-[#a8bbb0] hidden xs:inline truncate max-w-[130px] md:max-w-[200px]">
              {currentStage.title}
            </span>
          </div>

          {/* Trail progress bar */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="w-24 h-1 bg-[#192720] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#7a9d86] via-[#8c6721] to-[#f3cf8c] transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(100, Math.max(5, progressPercent))}%` }}
              />
            </div>
            <span className="tabular-nums font-mono text-[11px] text-[#7d9386]">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Zone 3: Navigation Drawer & Audio & RSVP */}
        <div className="flex items-center gap-2">
          {/* Audio Atmosphere Toggle */}
          <button
            onClick={toggleSound}
            aria-label={isAudioActive ? 'Mute ambient soundscape' : 'Play ambient mountain soundscape'}
            className="p-2 rounded-lg bg-[#142019]/80 hover:bg-[#1f3026] text-gray-600 hover:text-white border border-[#2b3d32]/60 transition-colors focus:outline-none"
            title={isAudioActive ? 'Mute mountain breeze' : 'Listen to mountain atmosphere'}
          >
            {isAudioActive ? (
              <Volume2 className="w-4 h-4 text-[#6b4f1a] animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Stage Menu Button */}
          <div className="relative">
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="px-3 py-1.5 flex items-center gap-1.5 text-xs text-[#d3ded7] bg-[#142019]/80 hover:bg-[#1e2f25] border border-[#2b3d32]/60 rounded-lg transition-colors focus:outline-none"
            >
              <MapPin className="w-3.5 h-3.5 text-[#8c6721]" />
              <span className="hidden sm:inline">Stages</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isNavOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isNavOpen && (
              <div className="absolute right-0 mt-2 w-64 p-2 rounded-xl bg-[#0f1a14]/95 border border-[#2c4033] shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 border-b border-white/5 text-[11px] uppercase tracking-wider text-[#799083]">
                  Mountain Stages
                </div>
                <div className="mt-1 space-y-0.5">
                  {ELEVATION_STAGES.map((stage, idx) => (
                    <button
                      key={stage.id}
                      onClick={() => {
                        onNavigateToSection(stage.id);
                        setIsNavOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        idx === currentStageIndex
                          ? 'bg-[#22352a] text-[#6b4f1a] font-medium'
                          : 'text-[#9eb1a6] hover:bg-[#17251d] hover:text-white'
                      }`}
                    >
                      <span className="truncate mr-2">
                        {idx + 1}. {stage.title}
                      </span>
                      <span className="tabular-nums font-mono text-[11px] opacity-75">
                        {stage.elevationMeters}m
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => {
                      onNavigateToSection('rsvp');
                      setIsNavOpen(false);
                    }}
                    className="w-full text-center py-2 text-xs font-medium text-[#111c15] bg-[#8c6721] hover:bg-[#e4be83] rounded-lg transition-colors"
                  >
                    RSVP to the Celebration
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick RSVP CTA button */}
          <button
            onClick={() => onNavigateToSection('rsvp')}
            className="hidden md:inline-flex px-3.5 py-1.5 text-xs font-medium text-[#111d16] bg-[#8c6721] hover:bg-[#e6c48f] rounded-lg transition-colors shadow-sm"
          >
            RSVP
          </button>
        </div>
      </header>
    </>
  );
};

