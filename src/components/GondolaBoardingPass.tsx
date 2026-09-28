import React, { useState } from 'react';
import { CableCar, Sparkles, Check, Share2, Compass, QrCode } from 'lucide-react';
import { WEDDING_COUPLE } from '../data/weddingData';

export const GondolaBoardingPass: React.FC = () => {
  const [guestName, setGuestName] = useState('Honored Wedding Guest');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${WEDDING_COUPLE.bride} & ${WEDDING_COUPLE.groom} Wedding Ascent Pass`,
        text: `Mountain Cableway Pass for the wedding celebration of Elena & Julian in the Dolomites.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-16 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4b07b] mb-2">
          <CableCar className="w-3.5 h-3.5" />
          <span>Complimentary Cableway Boarding Pass</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#f3f7f4]">
          Your Scenic Aerial Passage
        </h3>
        <p className="text-xs sm:text-sm text-[#9eb2a4] font-light mt-1">
          Private reserved cabins for our guests ascending through the clouds to the sanctuary.
        </p>
      </div>

      {/* Boarding Pass Ticket Container */}
      <div className="rounded-3xl bg-gradient-to-r from-[#111f18] via-[#16271e] to-[#111f18] border border-[#d4b07b]/40 shadow-2xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-md">
        {/* Ticket Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-dashed border-[#d4b07b]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#203429] flex items-center justify-center text-[#d4b07b] border border-[#375241]">
              <CableCar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#d4b07b] font-medium">
                Alta Badia Skyway · Alpine Gondola
              </div>
              <div className="font-serif text-lg text-[#f4f7f4]">
                The Wedding Ascent of {WEDDING_COUPLE.bride} & {WEDDING_COUPLE.groom}
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="inline-block px-2.5 py-1 rounded bg-[#d4b07b]/15 text-[#f4dfb8] text-[11px] font-mono border border-[#d4b07b]/30">
              CABIN 07 · EAGLE CREST
            </span>
          </div>
        </div>

        {/* Ticket Body: Stations, Time, Altitude */}
        <div className="py-6 grid grid-cols-1 sm:grid-cols-4 gap-6 items-center">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8da396]">Departure Base</div>
            <div className="font-serif text-xl text-[#f3f7f4]">Col Alt Station</div>
            <div className="text-xs text-[#a2b5a8] font-mono">Corvara · 1,568m</div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="text-[11px] font-mono text-[#d4b07b] flex items-center gap-1">
              <Compass className="w-3 h-3 animate-spin text-[#d4b07b]" />
              <span>12 min ascent</span>
            </div>
            <div className="w-full flex items-center justify-center my-1">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#d4b07b]/60 to-transparent" />
            </div>
            <div className="text-[10px] text-[#789182]">Non-stop scenic climb</div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8da396]">Arrival Sanctuary</div>
            <div className="font-serif text-xl text-[#f3f7f4]">San Cassiano Ridge</div>
            <div className="text-xs text-[#d4b07b] font-mono">The Altar · 2,450m</div>
          </div>

          {/* Barcode & QR */}
          <div className="flex items-center justify-start sm:justify-end gap-3 sm:border-l sm:border-white/5 sm:pl-6">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-[#d4b07b] border border-white/10">
              <QrCode className="w-8 h-8" />
            </div>
            <div className="text-[11px] font-mono text-[#8ca092] leading-tight">
              PASS: EJ-2026<br />
              GATE: VOWS<br />
              SEAT: RESERVED
            </div>
          </div>
        </div>

        {/* Personalized Name Field */}
        <div className="pt-5 border-t border-dashed border-[#d4b07b]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-[#8ca093] shrink-0">Pass Issued To:</span>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="bg-[#0b140f] border border-[#2b3e32] px-3 py-1.5 rounded-lg text-xs text-[#f3f7f4] font-medium focus:outline-none focus:border-[#d4b07b] w-full sm:w-60"
              placeholder="Your Name"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="py-1.5 px-3 rounded-lg bg-[#1a2d22] hover:bg-[#233a2d] text-xs text-[#d2ded6] border border-[#324b3b] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Pass Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#d4b07b]" />
                  <span>Share Pass</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
