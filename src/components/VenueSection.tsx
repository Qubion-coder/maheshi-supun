import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';
import { weddingData } from '../data/weddingData';

gsap.registerPlugin(ScrollTrigger);

export const VenueSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
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
    <section ref={sectionRef} className="relative min-h-[60vh] flex items-center justify-center px-4 py-20 z-10">
      <div ref={contentRef} className="max-w-xl w-full flex flex-col items-center text-center">
        
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-6 bg-white/5 backdrop-blur-md">
          <MapPin className="w-5 h-5 text-white" />
        </div>

        <h3 className="font-serif text-3xl md:text-4xl text-white font-medium mb-3 drop-shadow-md">
          Grandeeza Luxury Hotel, Negombo
        </h3>
        
        <p className="font-sans text-sm md:text-base text-[#e8eee9] opacity-80 font-light max-w-sm mx-auto mb-10">
          A stunning destination set against breathtaking views, where our celebration of love will take place.
        </p>

        <a
          href={weddingData.locationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white transition-all duration-300 backdrop-blur-md text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          <span className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium">
            View Location
          </span>
          <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </a>

      </div>
    </section>
  );
};
