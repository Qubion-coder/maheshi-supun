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
      <div ref={containerRef} className="max-w-2xl w-full text-center flex flex-col items-center">
        
        <div className="flex items-center gap-4 mb-6 opacity-80 text-white">
          <Sparkles className="w-4 h-4" />
          <h2 className="font-serif text-2xl md:text-3xl font-light tracking-[0.2em] uppercase">
            The Day
          </h2>
          <Sparkles className="w-4 h-4" />
        </div>

        <div className="font-serif text-5xl md:text-7xl text-white font-medium mb-8 drop-shadow-xl tracking-tight">
          {weddingData.date}
        </div>

        <div className="flex items-center justify-center gap-4 mb-8 text-[#e8eee9]">
          <Flower className="w-5 h-5 opacity-60" />
          <div className="text-lg md:text-2xl font-light tracking-widest uppercase">
            {weddingData.time}
          </div>
          <Flower className="w-5 h-5 opacity-60" />
        </div>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent mb-8" />

        <div className="font-serif text-2xl md:text-4xl text-white font-medium mb-2 drop-shadow-md">
          {weddingData.venue}
        </div>
        <div className="font-sans text-sm md:text-lg text-[#e8eee9] tracking-[0.2em] uppercase opacity-90">
          Negombo
        </div>

      </div>
    </section>
  );
};
