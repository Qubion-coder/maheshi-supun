import React, { useState, useEffect } from 'react';
import { Flame, Sparkles, Heart } from 'lucide-react';

interface Lantern {
  id: string;
  sender: string;
  flameSize: number;
}

export const SummitLanterns: React.FC = () => {
  const [lanterns, setLanterns] = useState<Lantern[]>([
    { id: '1', sender: 'Genevieve & Arthur', flameSize: 1 },
    { id: '2', sender: 'Marcus & Clara', flameSize: 1.1 },
    { id: '3', sender: 'Dr. Alistair', flameSize: 0.95 },
    { id: '4', sender: 'Sofia & Luca', flameSize: 1.05 },
  ]);

  const [hasLitLantern, setHasLitLantern] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_lantern_lit');
      if (saved) {
        setHasLitLantern(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLightLantern = (e: React.FormEvent) => {
    e.preventDefault();
    const name = senderName.trim() || 'A Devoted Well-Wisher';

    const newLantern: Lantern = {
      id: `lantern-${Date.now()}`,
      sender: name,
      flameSize: 1.15,
    };

    setLanterns((prev) => [newLantern, ...prev]);
    setHasLitLantern(true);
    setShowInput(false);

    try {
      localStorage.setItem('wedding_lantern_lit', 'true');
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-16 px-4">
      {/* Altar Lantern Shrine Container */}
      <div className="rounded-3xl bg-gradient-to-b from-[#21160e]/95 via-[#181a17]/95 to-[#121c16]/95 border border-[#8c6721]/40 shadow-2xl p-6 sm:p-10 backdrop-blur-xl text-center relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#f5ca7d]/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#6b4f1a] mb-3">
          <Flame className="w-3.5 h-3.5 animate-pulse text-[#6b4f1a]" />
          <span>Summit Altar Vigil</span>
          <span aria-hidden="true">·</span>
          <span>{lanterns.length + 42} Lanterns Burning Tonight</span>
        </div>

        <h3 className="font-serif text-3xl sm:text-4xl text-[#6b4f1a] mb-3">
          Light A Mountain Lantern
        </h3>

        <p className="text-xs sm:text-sm text-[#d4ded7] font-light max-w-lg mx-auto mb-8 leading-relaxed">
          As dusk blankets the Dolomites, each lit flame guides our path and warms the summit stone.
          Leave your spark atop the highest cairn.
        </p>

        {/* Lanterns Visual Array atop Stone Cairn */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 my-8">
          {lanterns.slice(0, 7).map((l, i) => (
            <div
              key={l.id}
              className="flex flex-col items-center group cursor-pointer"
              title={`Lantern lit by ${l.sender}`}
            >
              {/* Lantern Glass & Flame */}
              <div className="w-10 h-14 sm:w-12 sm:h-16 rounded-xl bg-[#261d15] border border-[#8c6721]/60 flex items-center justify-center relative shadow-lg group-hover:scale-105 transition-transform">
                {/* Candle Flame */}
                <div
                  className="w-3 h-5 rounded-full bg-gradient-to-t from-[#e88938] via-[#f7d174] to-[#fffde8] animate-pulse shadow-[0_0_15px_rgba(245,200,110,0.8)]"
                  style={{ transform: `scale(${l.flameSize})` }}
                />
                {/* Lantern brass cap */}
                <div className="absolute -top-1.5 inset-x-2 h-1.5 bg-[#8c6721] rounded-t-sm" />
                {/* Lantern brass base */}
                <div className="absolute -bottom-1.5 inset-x-2 h-1.5 bg-[#8c6721] rounded-b-sm" />
              </div>

              <span className="text-[10px] text-[#b8a287] mt-2 max-w-[80px] truncate font-serif italic">
                {l.sender}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive Lighting Action */}
        {!hasLitLantern && !showInput && (
          <button
            onClick={() => setShowInput(true)}
            className="px-6 py-3 rounded-xl bg-[#8c6721] hover:bg-[#e4be83] text-[#131d16] text-xs font-medium transition-all duration-300 shadow-xl inline-flex items-center gap-2 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-[#5c3e10]" />
            <span>Light Your Lantern Atop The Cairn</span>
          </button>
        )}

        {showInput && !hasLitLantern && (
          <form onSubmit={handleLightLantern} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 mt-4 animate-in fade-in duration-300">
            <input
              type="text"
              required
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Your Name (e.g., Charlotte)"
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#0f1712] border border-[#8c6721]/50 text-xs text-white focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#8c6721] hover:bg-[#e4be83] text-[#131d16] text-xs font-medium cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ignite Flame</span>
            </button>
          </form>
        )}

        {hasLitLantern && (
          <div className="inline-flex items-center gap-2 text-xs text-[#6b4f1a] bg-[#221c15] px-4 py-2 rounded-full border border-[#8c6721]/40 animate-in fade-in duration-300">
            <Heart className="w-3.5 h-3.5 fill-[#f5cf8c]" />
            <span>Your lantern burns steadfastly atop the mountain. Thank you!</span>
          </div>
        )}
      </div>
    </div>
  );
};

