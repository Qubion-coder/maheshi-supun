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
        
        <div className="w-12 h-12 rounded-full border border-[#8c6721]/40 gold-glow flex items-center justify-center mb-6 bg-[#1a2e22]/50 backdrop-blur-md">
          <MapPin className="w-5 h-5 text-[#8c6721]" />
        </div>

        <h3 className="font-serif text-3xl md:text-4xl gold-gradient-text font-medium mb-3 drop-shadow-md">
          Grandeeza Luxury Hotel, Negombo
        </h3>
        
        <p className="font-sans text-sm md:text-base text-white opacity-90 font-light max-w-sm mx-auto mb-10">
          A stunning destination set against breathtaking views, where our celebration of love will take place.
        </p>

        <a
          href={weddingData.locationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1b3a2a]/60 hover:bg-[#254d39]/80 border border-[#8c6721]/60 hover:border-[#8c6721] transition-all duration-300 backdrop-blur-md text-white shadow-[0_0_20px_rgba(212,176,123,0.15)] hover:shadow-[0_0_30px_rgba(212,176,123,0.3)]"
        >
          <span className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[#8c6721] group-hover:text-white transition-colors">
            View Location
          </span>
          <MapPin className="w-4 h-4 text-[#8c6721] group-hover:text-white transition-colors group-hover:scale-110" />
        </a>

      </div>
    </section>
  );
};

