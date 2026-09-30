import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingData } from '../data/weddingData';

gsap.registerPlugin(ScrollTrigger);

export const WeddingHero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade out on scroll
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom 30%",
          scrub: true,
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen flex flex-col items-center justify-center text-center px-4 z-10">
      <div ref={contentRef} className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* BRIDE */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl gold-gradient-text tracking-wide leading-tight uppercase font-medium drop-shadow-lg mb-4">
          {weddingData.bride}
        </h1>

        <div className="flex items-center justify-center gap-6 my-2">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#8c6721]/80 to-transparent" />
          <span className="font-serif italic text-3xl sm:text-4xl text-[#8c6721] font-light">&</span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#8c6721]/80 to-transparent" />
        </div>

        {/* GROOM */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl gold-gradient-text tracking-wide leading-tight uppercase font-medium drop-shadow-lg mt-4 mb-10">
          {weddingData.groom}
        </h1>

        <div className="font-sans text-sm md:text-base tracking-[0.3em] uppercase text-white opacity-90 drop-shadow">
          {weddingData.date}
        </div>

      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-80 animate-bounce">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8c6721]">
          Scroll down
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#8c6721] to-transparent" />
      </div>
    </section>
  );
};


