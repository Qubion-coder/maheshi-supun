import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingData } from '../data/weddingData';

gsap.registerPlugin(ScrollTrigger);

export const SummitSection: React.FC = () => {
  const { guestName } = useParams();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Golden sunlight flare expands at the summit
      gsap.fromTo(lightRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1.5,
          opacity: 0.8,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom bottom",
            scrub: true,
          }
        }
      );

      // Text fades in gracefully
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 z-20">
      
      {/* Summit Golden Light Flare */}
      <div 
        ref={lightRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(212,176,123,0.4) 30%, transparent 70%)"
        }}
      />

      <div ref={textRef} className="relative max-w-3xl w-full flex flex-col items-center text-center">
        
        <div className="font-sans text-sm md:text-base text-white uppercase tracking-[0.25em] leading-loose mb-16 drop-shadow-md">
          Together with our families,<br />
          we cordially invite
          {guestName ? (
            <span className="block my-6 font-serif text-3xl md:text-5xl gold-gradient-text normal-case tracking-normal font-bold">
              {guestName}
            </span>
          ) : (
            <> you <br /></>
          )}
          to celebrate our special day with us.
        </div>

        {/* BRIDE */}
        <h3 className="font-serif text-2xl md:text-4xl gold-gradient-text font-bold uppercase tracking-widest drop-shadow-lg mb-3">
          {weddingData.bride}
        </h3>

        <div className="font-serif italic text-2xl md:text-3xl text-[#8c6721] font-light my-3">
          &
        </div>

        {/* GROOM */}
        <h3 className="font-serif text-2xl md:text-4xl gold-gradient-text font-bold uppercase tracking-widest drop-shadow-lg mt-3 mb-12">
          {weddingData.groom}
        </h3>

        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#8c6721]/60 to-transparent mb-12" />

        <div className="font-sans text-sm md:text-base gold-gradient-text tracking-[0.3em] uppercase mb-4">
          {weddingData.date}
        </div>

        <div className="font-serif text-xl md:text-2xl text-white font-medium mb-1 drop-shadow-md">
          {weddingData.venue}
        </div>
        <div className="font-sans text-xs md:text-sm text-[#8c6721] tracking-[0.2em] uppercase opacity-90 mb-20">
          Negombo
        </div>

        <div className="font-serif italic text-2xl md:text-3xl text-white drop-shadow-md">
          With love,<br />
          <span className="gold-gradient-text mt-4 block not-italic font-bold uppercase tracking-widest text-lg">Maheshi & Supun</span>
        </div>

      </div>
    </section>
  );
};

