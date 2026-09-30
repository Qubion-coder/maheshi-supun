import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingData } from '../data/weddingData';

gsap.registerPlugin(ScrollTrigger);

export const ParentsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play reverse play reverse",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center justify-center px-4 py-20 z-10">
      <div ref={containerRef} className="max-w-4xl w-full flex flex-col items-center text-center">
        
        <h2 className="font-serif text-3xl md:text-4xl gold-gradient-text font-medium tracking-wide mb-12 drop-shadow-md">
          With the Blessings of Our Parents
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 w-full px-4">
          
          {/* BRIDE'S PARENTS */}
          <div className="flex flex-col items-center">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#8c6721] font-medium mb-4">
              Bride's Parents
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-[9px] uppercase tracking-widest text-[#a8bdae] mb-1">Father</div>
                <div className="font-serif text-lg text-white">{weddingData.parents.bride.father}</div>
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-widest text-[#a8bdae] mb-1">Mother</div>
                <div className="font-serif text-lg text-white">{weddingData.parents.bride.mother}</div>
              </div>
            </div>
          </div>

          {/* GROOM'S PARENTS */}
          <div className="flex flex-col items-center">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#8c6721] font-medium mb-4">
              Groom's Parents
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-[9px] uppercase tracking-widest text-[#a8bdae] mb-1">Father</div>
                <div className="font-serif text-lg text-white">{weddingData.parents.groom.father}</div>
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-widest text-[#a8bdae] mb-1">Mother</div>
                <div className="font-serif text-lg text-white">{weddingData.parents.groom.mother}</div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Decorative divider */}
        <div className="mt-16 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#8c6721]/50 to-transparent" />
      </div>
    </section>
  );
};

