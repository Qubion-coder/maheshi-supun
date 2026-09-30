import React, { useState } from 'react';
import { Compass, Eye, Mountain } from 'lucide-react';

interface PeakData {
  id: string;
  name: string;
  altitude: number;
  bearing: string;
  description: string;
  memoryNote: string;
  svgShape: 'needle' | 'massif' | 'glacier' | 'tower';
}

const PEAKS: PeakData[] = [
  {
    id: 'seceda',
    name: 'Seceda Crest',
    altitude: 2519,
    bearing: '315° NW',
    description: 'Iconic jagged green slopes dropping steeply into sheer dolomite cliffs.',
    memoryNote: 'Where Julian proposed at 6:15 AM as the alpenglow painted the pale limestone rose.',
    svgShape: 'needle',
  },
  {
    id: 'sassolungo',
    name: 'Sassolungo Massif',
    altitude: 3181,
    bearing: '240° WSW',
    description: 'The monumental stone bastion towering like a stone cathedral above the Val Gardena.',
    memoryNote: 'Our landmark every morning from the refuge window, reminding us of quiet strength.',
    svgShape: 'massif',
  },
  {
    id: 'marmolada',
    name: 'Marmolada Queen Glacier',
    altitude: 3343,
    bearing: '175° S',
    description: 'The highest summit in the Dolomites, crown of eternal snow and silver ice.',
    memoryNote: 'We watched the full moon rise over its glacier, promising that love would endure through all seasons.',
    svgShape: 'glacier',
  },
  {
    id: 'tofana',
    name: 'Tofana di Rozes',
    altitude: 3225,
    bearing: '095° E',
    description: 'A colossal pink dolomite pyramid that glows flame-orange at sunset.',
    memoryNote: 'The backdrop to our celebration feast, framing the open timber terrace.',
    svgShape: 'tower',
  },
];

export const MountainPanorama: React.FC = () => {
  const [selectedPeak, setSelectedPeak] = useState<PeakData>(PEAKS[0]);

  return (
    <div className="max-w-5xl mx-auto my-20 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8c6721] mb-2">
          <Eye className="w-3.5 h-3.5" />
          <span>Alpine Viewpoint Spyglass</span>
        </div>
        <h3 className="font-serif text-3xl sm:text-4xl text-white">
          The Peaks That Guard Our Vows
        </h3>
        <p className="text-xs sm:text-sm text-[#9eb2a4] font-light mt-1 max-w-lg mx-auto">
          Explore the monumental Dolomites surrounding our sanctuary altar.
        </p>
      </div>

      {/* Panorama Container */}
      <div className="rounded-3xl bg-[#0e1712]/95 border border-[#2c4033] shadow-2xl p-6 sm:p-10 backdrop-blur-xl relative">
        {/* Peak Selector Compass Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {PEAKS.map((peak) => (
            <button
              key={peak.id}
              onClick={() => setSelectedPeak(peak)}
              className={`p-3.5 rounded-xl text-left transition-all duration-300 cursor-pointer border ${
                selectedPeak.id === peak.id
                  ? 'bg-[#1b2f24] border-[#8c6721] shadow-lg ring-1 ring-[#8c6721]/30'
                  : 'bg-[#121f18] border-white/5 hover:border-[#385141] text-[#8ea496]'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#8c6721] mb-1">
                <span>{peak.bearing}</span>
                <span>{peak.altitude}m</span>
              </div>
              <div className="font-serif text-sm sm:text-base text-white font-medium truncate">
                {peak.name}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Peak Spyglass Display */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-[#09110d] rounded-2xl p-6 sm:p-8 border border-white/5">
          {/* Panoramic Peak Silhouette Vector Art */}
          <div className="w-full md:w-1/2 aspect-[16/9] rounded-xl bg-gradient-to-b from-[#131f18] via-[#101914] to-[#09110d] border border-[#223528] flex items-center justify-center relative overflow-hidden">
            <svg viewBox="0 0 400 220" className="w-full h-full text-[#c8a974]" fill="none">
              {/* Sky contour */}
              <circle cx="200" cy="90" r="40" fill="rgba(240, 195, 120, 0.15)" />
              {/* Peak specific geometry */}
              {selectedPeak.svgShape === 'needle' && (
                <>
                  <polygon points="50,220 180,50 260,180 350,220" fill="#1d2e23" />
                  <polygon points="180,50 220,130 140,160" fill="#2d4233" />
                  <polygon points="180,50 170,80 195,80" fill="#f4ebd9" opacity="0.9" />
                </>
              )}
              {selectedPeak.svgShape === 'massif' && (
                <>
                  <polygon points="30,220 110,90 290,90 370,220" fill="#1b2a20" />
                  <polygon points="110,90 160,110 240,110 290,90" fill="#273d30" />
                  <polygon points="140,90 160,70 190,70 210,90" fill="#f4ebd9" opacity="0.8" />
                </>
              )}
              {selectedPeak.svgShape === 'glacier' && (
                <>
                  <polygon points="20,220 160,60 300,120 380,220" fill="#16231c" />
                  <polygon points="160,60 220,80 300,120" fill="#e8f3ee" opacity="0.85" />
                  <polygon points="160,60 120,110 180,110" fill="#cbe2d7" opacity="0.7" />
                </>
              )}
              {selectedPeak.svgShape === 'tower' && (
                <>
                  <polygon points="40,220 140,80 200,60 260,140 360,220" fill="#202b24" />
                  <polygon points="140,80 200,60 190,120" fill="#314238" />
                  <polygon points="200,60 180,90 220,90" fill="#fcecd2" opacity="0.85" />
                </>
              )}
              {/* Compass Needle Overlay */}
              <circle cx="45" cy="45" r="20" stroke="#8c6721" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="45" y1="30" x2="45" y2="60" stroke="#8c6721" strokeWidth="1.5" />
              <line x1="30" y1="45" x2="60" y2="45" stroke="#8c6721" strokeWidth="1" />
            </svg>
            <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-mono text-[#8c6721] bg-[#0c1611]/80 px-2 py-0.5 rounded border border-white/5">
              <Compass className="w-3 h-3 text-[#8c6721]" />
              <span>BEARING {selectedPeak.bearing}</span>
            </div>
          </div>

          {/* Peak Description & Story Detail */}
          <div className="w-full md:w-1/2 space-y-3">
            <div className="flex items-center gap-2 text-xs text-[#8c6721] font-mono">
              <Mountain className="w-3.5 h-3.5" />
              <span>Summit Elevation: {selectedPeak.altitude} meters</span>
            </div>

            <h4 className="font-serif text-2xl sm:text-3xl text-white">
              {selectedPeak.name}
            </h4>

            <p className="text-xs sm:text-sm text-[#a2b5a8] leading-relaxed font-light">
              {selectedPeak.description}
            </p>

            <div className="pt-2 border-t border-white/5">
              <div className="text-[10px] uppercase tracking-wider text-[#8c6721] font-mono mb-1">
                Personal Significance
              </div>
              <p className="font-serif italic text-sm text-white leading-relaxed font-light">
                "{selectedPeak.memoryNote}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

