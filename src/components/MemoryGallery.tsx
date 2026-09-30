import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MemoryGallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in the whole section
      gsap.fromTo(containerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      let mm = gsap.matchMedia();

      // Mobile Animation: Scattered 2-column masonry feel
      mm.add("(max-width: 767px)", () => {
        photosRef.current.forEach((photo, index) => {
          if (!photo) return;
          // Shift the right column down
          const yOffset = index % 2 === 0 ? 10 : 50; 
          // Alternating slight tilts
          const rotation = index % 2 === 0 ? -3 : 4; 

          gsap.fromTo(photo,
            { y: yOffset + 100, opacity: 0, rotation: rotation * 3, scale: 0.8 },
            {
              y: yOffset,
              opacity: 1,
              rotation: rotation,
              scale: 1,
              duration: 1.4,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: photo,
                start: "top 90%",
                end: "top 40%",
                scrub: 1,
              }
            }
          );
        });
      });

      // Desktop Animation: Floating wave pattern
      mm.add("(min-width: 768px)", () => {
        photosRef.current.forEach((photo, index) => {
          if (!photo) return;
          const yOffset = (index % 2 === 0 ? 40 : -40);
          const rotation = (index % 2 === 0 ? 3 : -3);

          gsap.fromTo(photo,
            { y: yOffset + 100, opacity: 0, rotation: rotation * 2, scale: 0.9 },
            {
              y: yOffset,
              opacity: 1,
              rotation: rotation,
              scale: 1,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: photo,
                start: "top 85%",
                end: "top 30%",
                scrub: 1,
              }
            }
          );
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const photos = [
    { id: 1, src: "/pre/WhatsApp Image 2026-09-28 at 16.21.42.jpeg" },
    { id: 2, src: "/pre/WhatsApp Image 2026-09-28 at 16.21.50.jpeg" },
    { id: 3, src: "/pre/WhatsApp Image 2026-09-28 at 16.21.53.jpeg" },
    { id: 4, src: "/pre/WhatsApp Image 2026-10-01 at 02.33.10 (1).jpeg" },
    { id: 5, src: "/pre/WhatsApp Image 2026-10-01 at 02.34.17 (1).jpeg" },
    { id: 6, src: "/pre/WhatsApp Image 2026-10-01 at 02.34.44 (1).jpeg" },
    { id: 7, src: "/WhatsApp Image 2026-10-01 at 02.34.01 (2).jpeg" },
    { id: 8, src: "/WhatsApp Image 2026-10-01 at 02.33.38 (2).jpeg" },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-24 z-10 overflow-hidden">
      <div ref={containerRef} className="w-full max-w-6xl flex flex-col items-center">
        
        <h2 className="font-serif text-4xl md:text-5xl gold-gradient-text font-medium tracking-wide mb-16 md:mb-24 drop-shadow-md text-center">
          Our Memories
        </h2>

        {/* 
          Mobile: 2-column grid 
          Desktop: Flex row wrap
        */}
        <div className="grid grid-cols-2 md:flex md:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 w-full max-w-5xl">
          {photos.map((item, i) => (
            <div 
              key={item.id}
              ref={(el) => (photosRef.current[i] = el)}
              className="relative w-full aspect-[3/4] md:aspect-auto md:w-56 md:h-72 lg:w-64 lg:h-80 bg-[#0c1811]/90 p-2 md:p-3 border border-[#8c6721]/30 rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.5)] group"
            >
              {/* Inner Photo Frame */}
              <div className="w-full h-full relative overflow-hidden rounded-sm border border-[#8c6721]/20">
                <img 
                  src={item.src} 
                  alt="Couple Memory" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  loading="lazy"
                />
                {/* Elegant overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#8c6721]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

