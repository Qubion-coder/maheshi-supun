import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Heart, Sparkles, Send, Users, User } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RSVPData } from '../types/wedding';
import { INITIAL_GUESTBOOK_BLESSINGS, weddingData } from '../data/weddingData';

gsap.registerPlugin(ScrollTrigger);

export const RSVPSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const [formData, setFormData] = useState<Omit<RSVPData, 'id' | 'timestamp'>>({
    name: '',
    email: '',
    phone: '',
    attending: 'yes',
    guestsCount: 1,
    dietaryChoice: 'Grand Seafood & Lagoon Prawns Banquet',
    allergies: '',
    songRequest: '',
    blessing: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [blessings, setBlessings] = useState(INITIAL_GUESTBOOK_BLESSINGS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_blessings_maheshi_supun');
      if (saved) {
        setBlessings(JSON.parse(saved));
      }
      const existingRsvp = localStorage.getItem('wedding_rsvp_submitted_ms');
      if (existingRsvp) {
        setSubmitted(true);
      }
    } catch {
      // ignore
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom bottom",
            toggleActions: "play none none reverse",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      localStorage.setItem('wedding_rsvp_submitted_ms', 'true');
      localStorage.setItem('wedding_rsvp_data_ms', JSON.stringify(formData));

      if (formData.blessing?.trim()) {
        const newBlessing = {
          id: `bless-${Date.now()}`,
          name: formData.name,
          location: 'Celebration Guest',
          message: formData.blessing.trim(),
          timestamp: 'Just now',
        };
        const updated = [newBlessing, ...blessings];
        setBlessings(updated);
        localStorage.setItem('wedding_blessings_maheshi_supun', JSON.stringify(updated));
      }
    } catch {
      // ignore
    }

    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} id="rsvp" className="relative py-28 md:py-40 px-4 md:px-8 z-20">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.25em] uppercase text-[#8c6721] mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#8c6721]/30" />
            <span>Celebrate With Us</span>
            <span aria-hidden="true" className="text-[#88a996]">·</span>
            <span>Kindly Respond by 01st November 2026</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
            Reserve Your Place
          </h2>

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#8c6721] to-transparent mx-auto my-4" />

          <p className="text-sm sm:text-base text-[#a2b8ab] leading-relaxed font-light max-w-xl mx-auto">
            Please let us know if you will join us for our celebration at Grandeeza Luxury Hotel.
            We look forward to sharing this momentous day with you.
          </p>
        </div>

        {/* RSVP Card Container */}
        <div className="rounded-3xl bg-[#0f2117]/90 backdrop-blur-xl border border-[#2b4c37]/80 shadow-2xl p-6 sm:p-10 md:p-12 mb-20">
          {submitted ? (
            <div className="text-center py-12 px-4 animate-in fade-in duration-500">
              <div className="w-16 h-16 rounded-full bg-[#173525] text-[#8c6721] mx-auto flex items-center justify-center mb-6 border border-[#2d5c42]">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-white mb-3">
                Your Celebration Seat Is Reserved
              </h3>

              <p className="font-serif italic text-lg text-[#8c6721] mb-4">
                Thank you, {formData.name || 'honored guest'}.
              </p>

              <p className="text-sm text-[#a2b8ab] max-w-md mx-auto leading-relaxed mb-8 font-light">
                {formData.attending === 'yes'
                  ? 'We have recorded your celebration reservation. We cannot wait to welcome you at Grandeeza Luxury Hotel on 01st December 2026!'
                  : 'We will miss your presence on our wedding day, but your warm thoughts and heartfelt blessings travel with us.'}
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="text-xs uppercase tracking-widest text-[#8c6721] hover:text-[#6b4f1a] underline underline-offset-4 cursor-pointer"
              >
                Modify Your Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Attendance Choice Buttons */}
              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-wider text-[#a0b5a7] font-medium">
                  Will You Join Us To Celebrate?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'yes' })}
                    className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-medium border text-center transition-all cursor-pointer ${
                      formData.attending === 'yes'
                        ? 'bg-[#1b3a2a] border-[#8c6721] text-[#6b4f1a] shadow-lg ring-1 ring-[#8c6721]/40'
                        : 'bg-[#112419] border-[#294534] text-[#9bb0a3] hover:bg-[#162e20]'
                    }`}
                  >
                    Joyfully Accepts With Pleasure
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'no' })}
                    className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-medium border text-center transition-all cursor-pointer ${
                      formData.attending === 'no'
                        ? 'bg-[#1b3a2a] border-[#8c6721] text-[#6b4f1a] shadow-lg ring-1 ring-[#8c6721]/40'
                        : 'bg-[#112419] border-[#294534] text-[#9bb0a3] hover:bg-[#162e20]'
                    }`}
                  >
                    Regretfully Declines With Warm Wishes
                  </button>
                </div>
              </div>

              {/* Guest Details */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#a0b5a7] font-medium mb-2">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#8c6721]" />
                    Full Name(s)
                  </span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Mr. & Mrs. Perera"
                  className="w-full px-4 py-3 rounded-xl bg-[#0c1811] border border-[#2b4c37] text-white text-sm focus:outline-none focus:border-[#8c6721] transition-colors"
                />
              </div>

              {formData.attending === 'yes' && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a0b5a7] font-medium mb-2">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#8c6721]" />
                      Total In Your Party
                    </span>
                  </label>
                  <select
                    value={formData.guestsCount}
                    onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0c1811] border border-[#2b4c37] text-white text-sm focus:outline-none focus:border-[#8c6721] transition-colors"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests (Couple / Plus One)</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests (Family)</option>
                  </select>
                </div>
              )}

              {/* Heartfelt Note / Blessing */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#a0b5a7] font-medium mb-2">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#8c6721]" />
                    Words of Blessing or Message for Maheshi & Supun
                  </span>
                </label>
                <textarea
                  rows={3}
                  value={formData.blessing}
                  onChange={(e) => setFormData({ ...formData, blessing: e.target.value })}
                  placeholder="Leave warm blessings for the couple's new beginning..."
                  className="w-full px-4 py-3 rounded-xl bg-[#0c1811] border border-[#2b4c37] text-white text-sm focus:outline-none focus:border-[#8c6721] transition-colors resize-none"
                />
              </div>

              {/* Submit CTA & WhatsApp Direct Option */}
              <div className="pt-4 text-center space-y-3">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 text-sm font-medium text-[#102016] bg-gradient-to-r from-[#8c6721] via-[#e5c083] to-[#8c6721] hover:brightness-110 rounded-xl transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirm RSVP Here</span>
                  </button>

                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `*Wedding RSVP for Maheshi & Supun*\nGuest: ${formData.name || 'Wedding Guest'}\nAttendance: ${
                        formData.attending === 'yes' ? 'Joyfully Accepts' : 'Regretfully Declines'
                      }\nTotal Guests: ${formData.guestsCount}\nVenue: Grandeeza Luxury Hotel, Negombo\nDate: 01st December 2026 (10.30 A.M. - 15.30 P.M.)`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 text-sm font-medium text-emerald-100 bg-[#143622] hover:bg-[#1a442b] border border-emerald-500/30 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>RSVP via WhatsApp</span>
                  </a>
                </div>

                <p className="text-xs text-[#7f998a] font-light">
                  Kindly respond by 01st November 2026 · Grandeeza Luxury Hotel, Negombo
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Live Guestbook / Blessings Wall */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <div className="text-xs uppercase tracking-[0.2em] text-[#8c6721] mb-1">Cairn of Blessings</div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white">
              Words Along The Path
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blessings.map((b) => (
              <div
                key={b.id}
                className="p-6 rounded-2xl bg-[#0f2117]/80 border border-[#2b4c37]/60 backdrop-blur-md flex flex-col justify-between"
              >
                <p className="font-serif italic text-sm text-[#d4ded7] leading-relaxed mb-4 font-light">
                  "{b.message}"
                </p>
                <div className="border-t border-white/5 pt-3 flex items-center justify-between text-xs text-[#899f92]">
                  <span className="font-medium text-white">{b.name}</span>
                  <span className="text-[#8c6721] text-[11px]">{b.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Peaceful Signoff */}
        <footer className="mt-32 text-center text-xs text-[#7a9586] border-t border-white/5 pt-12 space-y-2">
          <p className="font-serif italic text-lg text-white">
            {weddingData.bride} & {weddingData.groom}
          </p>
          <p>{weddingData.date} · {weddingData.venue}</p>
          <p className="text-[11px] text-[#556e5f]">
            With love, {weddingData.brideShort} & {weddingData.groomShort}
          </p>
        </footer>
      </div>
    </section>
  );
};

