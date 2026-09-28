import React, { useState } from 'react';
import { Sparkles, Flower2, Info } from 'lucide-react';

interface HerbariumSpecimen {
  id: string;
  latinName: string;
  commonName: string;
  elevationFound: number;
  symbolism: string;
  couplesNote: string;
  colorHex: string;
  svgPath: 'edelweiss' | 'gentian' | 'rose' | 'avens';
}

const SPECIMENS: HerbariumSpecimen[] = [
  {
    id: 'edelweiss',
    latinName: 'Leontopodium nivale',
    commonName: 'Alpine Edelweiss',
    elevationFound: 2420,
    symbolism: 'Devotion & Rare Courage',
    couplesNote: 'Julian searched the high limestone shelves at dawn to find a single bloom on the morning of our engagement.',
    colorHex: '#e8ece9',
    svgPath: 'edelweiss',
  },
  {
    id: 'gentian',
    latinName: 'Gentiana verna',
    commonName: 'Spring Gentian',
    elevationFound: 1780,
    symbolism: 'Steadfast Loyalty & Deep Truth',
    couplesNote: 'The vivid sapphire blue that lined the footpath on our very first hike through Val Gardena.',
    colorHex: '#688ec4',
    svgPath: 'gentian',
  },
  {
    id: 'rose',
    latinName: 'Rhododendron ferrugineum',
    commonName: 'Alpine Snow Rose',
    elevationFound: 1950,
    symbolism: 'Passionate Grace & Warmth',
    couplesNote: 'Blooming across the rocky slopes beneath ancient stone pines, reminding us that beauty thrives in rugged terrain.',
    colorHex: '#d8879b',
    svgPath: 'rose',
  },
  {
    id: 'avens',
    latinName: 'Dryas octopetala',
    commonName: 'Mountain Avens',
    elevationFound: 2850,
    symbolism: 'Enduring Harmony & Light',
    couplesNote: 'Its eight ivory petals always tilt toward the sun, reflecting the gentle constancy we strive to offer one another.',
    colorHex: '#ebd9a9',
    svgPath: 'avens',
  },
];

export const BotanicalHerbarium: React.FC = () => {
  const [activeSpecimen, setActiveSpecimen] = useState<HerbariumSpecimen>(SPECIMENS[0]);

  return (
    <section className="relative py-24 md:py-36 px-4 md:px-8 z-20">
      <div className="max-w-5xl mx-auto">
        {/* Editorial Herbarium Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.25em] uppercase text-[#d4b07b] mb-3">
            <Flower2 className="w-3.5 h-3.5" />
            <span>Floral Herbarium</span>
            <span aria-hidden="true">·</span>
            <span>Botanicals of the High Dolomites</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#f3f7f4] tracking-tight">
            The Flowers Along Our Path
          </h2>

          <div className="w-12 h-[1px] bg-[#d4b07b]/40 mx-auto my-4" />

          <p className="text-sm sm:text-base text-[#9eb2a4] leading-relaxed font-light max-w-xl mx-auto">
            High above the timberline, only the most resilient flora blossoms.
            Each specimen tells a quiet chapter of our journey into the heights.
          </p>
        </div>

        {/* Specimen Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12">
          {SPECIMENS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSpecimen(item)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                activeSpecimen.id === item.id
                  ? 'bg-[#1b2d23] text-[#f4dfb8] border border-[#d4b07b]/60 shadow-lg'
                  : 'bg-[#111e17]/80 text-[#8ea496] hover:bg-[#16271e] hover:text-[#dbe7e0] border border-white/5'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.colorHex }}
              />
              <span className="font-serif italic">{item.commonName}</span>
            </button>
          ))}
        </div>

        {/* Selected Specimen Archival Display Plate */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0f1b15]/90 border border-[#2c4033] shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-14">
          {/* Subtle Archival Plate Watermark Label */}
          <div className="absolute top-4 right-6 text-[10px] font-mono tracking-widest text-[#5c7265] uppercase">
            Plate No. 0{SPECIMENS.findIndex((s) => s.id === activeSpecimen.id) + 1} · Herbarium Alpium
          </div>

          {/* Left: Specimen Hand-Drawn Fine Art Illustration */}
          <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl bg-[#09110d] border border-[#26382c] flex items-center justify-center relative p-6 shrink-0 shadow-inner group">
            {/* Soft Ambient Glow of Specimen */}
            <div
              className="absolute inset-4 rounded-full blur-2xl opacity-20 transition-all duration-500"
              style={{ backgroundColor: activeSpecimen.colorHex }}
            />

            {/* Specimen Botanical Art Vector */}
            {activeSpecimen.svgPath === 'edelweiss' && (
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#e8eee9]" fill="none">
                {/* Star-like velvety petals */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <ellipse
                    key={deg}
                    cx="50"
                    cy="35"
                    rx="5"
                    ry="18"
                    transform={`rotate(${deg} 50 50)`}
                    fill="currentColor"
                    fillOpacity="0.8"
                    stroke="#c8d6ce"
                    strokeWidth="0.8"
                  />
                ))}
                {/* Central golden florets */}
                <circle cx="50" cy="50" r="8" fill="#d4b07b" />
                <circle cx="50" cy="50" r="5" fill="#f5cf8c" />
                {/* Stem & Leaves */}
                <path d="M50 60 Q52 75 50 95" stroke="#5d7866" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M50 78 Q35 72 32 65" stroke="#5d7866" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M50 82 Q65 76 68 68" stroke="#5d7866" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}

            {activeSpecimen.svgPath === 'gentian' && (
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#6b95d4]" fill="none">
                {/* Deep trumpet petals */}
                <polygon points="50,20 62,35 75,32 68,46 76,58 60,56 50,70 40,56 24,58 32,46 25,32 38,35" fill="currentColor" fillOpacity="0.85" stroke="#90b4eb" strokeWidth="1" />
                <circle cx="50" cy="46" r="6" fill="#fdf8e6" />
                <path d="M50 70 L50 95" stroke="#486854" strokeWidth="2.5" strokeLinecap="round" />
                <ellipse cx="40" cy="80" rx="9" ry="4" fill="#3f5d4a" />
                <ellipse cx="60" cy="84" rx="9" ry="4" fill="#3f5d4a" />
              </svg>
            )}

            {activeSpecimen.svgPath === 'rose' && (
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#df8ea2]" fill="none">
                {/* Cluster of alpine rose petals */}
                <circle cx="45" cy="40" r="14" fill="currentColor" fillOpacity="0.75" />
                <circle cx="58" cy="44" r="13" fill="currentColor" fillOpacity="0.8" />
                <circle cx="48" cy="52" r="14" fill="currentColor" fillOpacity="0.85" />
                <circle cx="50" cy="46" r="4" fill="#fde5ad" />
                <path d="M48 66 L50 95" stroke="#514437" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx="32" cy="72" rx="12" ry="5" transform="rotate(-25 32 72)" fill="#334d3b" />
                <ellipse cx="68" cy="76" rx="12" ry="5" transform="rotate(25 68 76)" fill="#334d3b" />
              </svg>
            )}

            {activeSpecimen.svgPath === 'avens' && (
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#faeed2]" fill="none">
                {/* 8 radiant petals */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <ellipse
                    key={deg}
                    cx="50"
                    cy="34"
                    rx="8"
                    ry="15"
                    transform={`rotate(${deg} 50 50)`}
                    fill="currentColor"
                    fillOpacity="0.9"
                    stroke="#e4ce9c"
                    strokeWidth="0.8"
                  />
                ))}
                {/* Golden sunburst stamens */}
                <circle cx="50" cy="50" r="9" fill="#dca956" />
                <circle cx="50" cy="50" r="4" fill="#ffe59e" />
                <path d="M50 65 L50 95" stroke="#486854" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            )}

            <div className="absolute bottom-2 inset-x-0 text-center text-[10px] text-[#71887a] font-mono">
              Elevation: {activeSpecimen.elevationFound}m
            </div>
          </div>

          {/* Right: Archival Information & Romance */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#d4b07b] font-mono mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeSpecimen.symbolism}</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#f3f7f4]">
                {activeSpecimen.commonName}
              </h3>

              <p className="font-serif italic text-base text-[#a2b6a8] font-light">
                {activeSpecimen.latinName}
              </p>
            </div>

            <div className="w-16 h-[1px] bg-[#d4b07b]/30" />

            <div className="p-4 rounded-xl bg-[#09120e] border border-white/5 space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-[#8da396] font-medium flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#d4b07b]" />
                From Elena & Julian's Trail Journal:
              </div>
              <p className="font-serif italic text-sm sm:text-base text-[#e0e9e3] leading-relaxed font-light">
                "{activeSpecimen.couplesNote}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
