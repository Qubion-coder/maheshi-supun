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
      <div ref={cardRef} className="max-w-2xl w-full p-8 md:p-12 rounded-3xl bg-[#0f1b15]/60 border border-[#8c6721]/40 gold-glow backdrop-blur-xl flex flex-col items-center text-center">
        <h2 className="font-serif text-3xl md:text-5xl gold-gradient-text font-medium tracking-wide mb-6">Our Journey</h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#8c6721]/80 to-transparent mb-8" />
        <div className="font-sans text-sm md:text-base text-white leading-relaxed font-light tracking-wide max-w-lg flex flex-col gap-6">
          <p className="font-medium text-[#8c6721] text-lg">After Many Moons…</p>
          <p>
            Two hearts, one journey,<br/>
            and a beautiful forever waiting to begin.
          </p>
          <p>
            With love in our hearts<br/>
            and dreams in our eyes,<br/>
            we begin this new chapter together.
          </p>
          <p>
            Your presence and blessings<br/>
            will make our beginning even more special.
          </p>
        </div>
        <div className="mt-8 flex gap-3 opacity-60">
          <div className="w-1.5 h-1.5 rounded-full bg-black" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#8c6721]" />
          <div className="w-1.5 h-1.5 rounded-full bg-black" />
        </div>
      </div>
    </section>
  );
};

