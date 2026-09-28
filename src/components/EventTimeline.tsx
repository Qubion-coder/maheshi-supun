import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingData } from '../data/weddingData';

gsap.registerPlugin(ScrollTrigger);

export const EventTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const events = weddingData.timeline;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the line down
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
          }
        }
      );

      // Fade in each item as it scrolls into view
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(item,
          { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center py-32 z-10 overflow-hidden">
      
      <h2 className="font-serif text-3xl md:text-5xl text-white font-medium tracking-wide mb-24 drop-shadow-md text-center">
        The Journey
      </h2>

      <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Vertical Winding Line */}
        <div 
          ref={lineRef}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent left-1/2 -translate-x-1/2"
        />

        {events.map((event, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div 
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`relative w-full flex items-center justify-between my-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Content Side */}
              <div className={`w-1/2 flex flex-col ${isLeft ? 'items-end text-right pr-8 md:pr-16' : 'items-start text-left pl-8 md:pl-16'}`}>
                <div className="font-serif text-xl md:text-3xl text-white mb-2">{event.time}</div>
                <div className="font-sans text-sm md:text-base text-[#c8d8ce] uppercase tracking-widest">{event.title}</div>
              </div>

              {/* Center Dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#1b3a2a] border-2 border-white z-10 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-white" />
              </div>

              {/* Empty Side for balance */}
              <div className="w-1/2" />
            </div>
          );
        })}
        
      </div>
    </section>
  );
};
