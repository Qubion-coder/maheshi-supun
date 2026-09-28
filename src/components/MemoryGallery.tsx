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

      // Parallax and float effect for individual photos
      photosRef.current.forEach((photo, index) => {
        if (!photo) return;
        
        const yOffset = (index % 2 === 0 ? 50 : -50);
        const rotation = (index % 2 === 0 ? 3 : -3);

        gsap.fromTo(photo,
          { y: 100, opacity: 0, rotation: rotation * 2 },
          {
            y: yOffset,
            opacity: 1,
            rotation: rotation,
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const photos = [
    { id: 1, src: "/pre/WhatsApp Image 2026-09-28 at 16.21.42.jpeg" },
    { id: 2, src: "/pre/WhatsApp Image 2026-09-28 at 16.21.49.jpeg" },
    { id: 3, src: "/pre/WhatsApp Image 2026-09-28 at 16.21.50.jpeg" },
    { id: 4, src: "/pre/WhatsApp Image 2026-09-28 at 16.21.53.jpeg" },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 z-10">
      <div ref={containerRef} className="w-full max-w-6xl flex flex-col items-center">
        
        <h2 className="font-serif text-3xl md:text-5xl text-[#d4b07b] font-medium tracking-wide mb-20 drop-shadow-md">
          Our Moments
        </h2>

        <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-8 md:gap-6 lg:gap-12 w-full max-w-5xl">
          {photos.map((item, i) => (
            <div 
              key={item.id}
              ref={(el) => (photosRef.current[i] = el)}
              className="relative w-64 h-80 md:w-56 md:h-72 lg:w-64 lg:h-80 rounded-sm bg-[#12241a]/60 border-8 border-white/90 shadow-2xl overflow-hidden group"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 176, 123, 0.1)"
              }}
            >
              <img 
                src={item.src} 
                alt="Couple Memory" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                loading="lazy"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
