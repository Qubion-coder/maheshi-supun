import React from 'react';
import { Cloud, Heart, Mountain } from 'lucide-react';
import { WEDDING_COUPLE } from '../data/weddingData';

export const InvitationSection: React.FC = () => {
  return (
    <section id="invitation" className="relative py-32 md:py-48 px-4 md:px-8 z-20 text-center">
      {/* Soft Cloud Ambient Halo */}
      <div className="max-w-4xl mx-auto relative">
        {/* Decorative Cloud Level Marker */}
        <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#d4b07b] mb-6">
          <Cloud className="w-3.5 h-3.5" />
          <span>Stage 05</span>
          <span aria-hidden="true">·</span>
          <span>The Cloud Horizon Elevation 2,850m</span>
        </div>

        {/* Central Formal Lettering Card */}
        <div className="p-8 sm:p-14 md:p-20 rounded-3xl bg-[#0f1b15]/90 backdrop-blur-xl border border-[#d4b07b]/35 shadow-2xl relative overflow-hidden">
          {/* Subtle Corner Accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#d4b07b]/40 rounded-tl-md" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#d4b07b]/40 rounded-tr-md" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#d4b07b]/40 rounded-bl-md" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#d4b07b]/40 rounded-br-md" />

          {/* Invitation Monogram */}
          <div className="w-14 h-14 mx-auto mb-8 rounded-full border border-[#d4b07b]/60 flex items-center justify-center text-[#d4b07b] bg-[#16271e]">
            <Mountain className="w-6 h-6" />
          </div>

          <p className="font-serif italic text-lg sm:text-2xl text-[#b7cbbd] mb-4 font-light">
            Above the mist, where quiet sky meets eternal stone
          </p>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#f5f8f5] tracking-tight leading-tight mb-8">
            {WEDDING_COUPLE.bride}
            <span className="block my-2 font-serif italic text-2xl sm:text-4xl text-[#d4b07b] font-light">
              and
            </span>
            {WEDDING_COUPLE.groom}
          </h2>

          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4b07b] to-transparent mx-auto mb-8" />

          <p className="font-serif text-lg sm:text-2xl text-[#e8eee9] max-w-2xl mx-auto leading-relaxed font-light mb-6">
            Joyfully invite you to bear witness to the exchange of their wedding vows
            and to celebrate their marriage in the high sanctuary of the Dolomites.
          </p>

          <div className="space-y-2 text-sm sm:text-base text-[#a2b6a9] font-light">
            <p className="font-medium text-[#f3f7f4] tracking-wide">
              {WEDDING_COUPLE.dateFormatted}
            </p>
            <p>Half past three in the afternoon</p>
            <p className="text-xs uppercase tracking-widest text-[#d4b07b] pt-2">
              San Cassiano Alpine Ridge · South Tyrol, Italy
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-[#8da395] font-light">
            <Heart className="w-3.5 h-3.5 text-[#d4b07b] fill-[#d4b07b]/30" />
            <span>Reception, feast, and celebration under the stars to follow</span>
          </div>
        </div>
      </div>
    </section>
  );
};
