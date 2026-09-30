import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingData } from '../data/weddingData';
import { Sparkles, Flower } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const WeddingDetails: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center justify-center px-4 py-20 z-10">
      <div ref={containerRef} className="max-w-2xl w-full text-center flex flex-col items-center p-10 md:p-16 rounded-3xl bg-[#0f1b15]/70 backdrop-blur-xl border border-[#8c6721]/30 shadow-[0_0_60px_rgba(10,16,12,0.6)]">
        
        <div className="flex items-center gap-4 mb-6 text-[#8c6721]">
          <Sparkles className="w-4 h-4" />
          <h2 className="font-serif text-2xl md:text-3xl font-light tracking-[0.2em] uppercase" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            The Day
          </h2>
          <Sparkles className="w-4 h-4" />
        </div>

        <div className="font-serif text-5xl md:text-7xl gold-gradient-text font-medium mb-8 tracking-tight" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.5))' }}>
          {weddingData.date}
        </div>

        <div className="flex items-center justify-center gap-4 mb-8 text-[#8c6721]">
          <Flower className="w-5 h-5 opacity-80" />
          <div className="text-lg md:text-2xl font-light tracking-widest uppercase text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
            {weddingData.time}
          </div>
          <Flower className="w-5 h-5 opacity-80" />
        </div>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#8c6721]/60 to-transparent mb-8" />

        <div className="font-serif text-2xl md:text-4xl gold-gradient-text font-medium mb-2" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))' }}>
          {weddingData.venue}
        </div>
        <div className="font-sans text-sm md:text-lg text-[#8c6721] tracking-[0.2em] uppercase" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
          Negombo
        </div>

      </div>
    </section>
  );
};

