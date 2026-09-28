import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
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
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-4 py-20 z-10">
      <div ref={cardRef} className="max-w-2xl w-full p-8 md:p-12 rounded-3xl bg-[#f5efdf]/10 border border-[#d4b07b]/30 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-[#d4b07b] font-medium tracking-wide mb-6">Our Journey</h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4b07b]/60 to-transparent mb-8" />
        <p className="font-sans text-sm md:text-base text-[#e8eee9] leading-relaxed font-light tracking-wide max-w-lg">
          Like a mountain path winding through mist and time, our love has grown with every step. Together we have explored the valleys and climbed the peaks, discovering beauty in every moment shared.
        </p>
        <div className="mt-8 flex gap-3 opacity-60">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#d4b07b]" />
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      </div>
    </section>
  );
};
