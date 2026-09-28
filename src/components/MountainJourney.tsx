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
    <div className="relative min-h-screen text-[#e8eee9] overflow-x-hidden selection:bg-[#d4b07b]/30 selection:text-[#f8f5ee] bg-[#07120d]">
      
      {/* 1. Procedural Particle & Parallax Background */}
      <MountainAtmosphere scrollProgress={scrollProgress} elevation={currentElevation} />

      {/* 2. The Content (GSAP animations inside components still run!) */}
      <main className="relative z-20 flex flex-col gap-20 pb-40">
        {children}
      </main>
      
    </div>
  );
};
