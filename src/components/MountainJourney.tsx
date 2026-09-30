import React, { useState, useEffect, useCallback } from 'react';
import { MountainAtmosphere } from './MountainAtmosphere';

interface MountainJourneyProps {
  children: React.ReactNode;
}

export const MountainJourney: React.FC<MountainJourneyProps> = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const currentScroll = window.scrollY;
    const progress = Math.max(0, Math.min(1, currentScroll / totalHeight));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    // Also set up a resize observer on the document body to recalculate
    const observer = new ResizeObserver(() => {
      handleScroll();
    });
    observer.observe(document.body);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [handleScroll]);

  // We can calculate a fake elevation just for the atmosphere (base 650 to peak 3200)
  const currentElevation = 650 + scrollProgress * (3200 - 650);

  return (
    <div className="relative min-h-screen text-[#e8eee9] overflow-x-hidden selection:bg-[#8c6721]/30 selection:text-[#f8f5ee] bg-[#07120d]">
      
      {/* Static Background Image with slow downward parallax */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#07120d]">
        <div 
          className="absolute top-0 left-0 w-full"
          style={{
            height: "250vh",
            backgroundImage: "url('/Gemini_Generated_Image_mnqwzfmnqwzfmnqw.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "top center",
            transform: `translateY(-${scrollProgress * 150}vh)`,
            willChange: "transform",
            opacity: 0.45
          }}
        />
        {/* Dark green tinted overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,18,13,0.75) 0%, rgba(17,38,26,0.65) 40%, rgba(11,27,18,0.70) 100%)" }} />
      </div>

      {/* 1. Procedural Particle & Parallax Background */}
      <MountainAtmosphere scrollProgress={scrollProgress} elevation={currentElevation} />

      {/* 2. The Content (GSAP animations inside components still run!) */}
      <main className="relative z-20 flex flex-col gap-20 pb-40">
        {children}
      </main>
      
    </div>
  );
};
