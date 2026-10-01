import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { Play } from 'lucide-react';
import { mountainAudio } from '../utils/audioEngine';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const { guestName } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);

  const startIntro = () => {
    setIsPlaying(true);

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }

      if (textOverlayRef.current) {
        const words = textOverlayRef.current.querySelectorAll('.word');
        gsap.fromTo(words, 
          { opacity: 0, y: 30, filter: "blur(10px)" }, 
          { 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)",
            duration: 1.5, 
            stagger: 0.8, 
            ease: "power2.out", 
            delay: 0.5 
          }
        );
      }
    }, 100);
  };

  const handleVideoEnd = () => {
    // Fade out everything and call onComplete
    gsap.to(document.body, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        onComplete();
        // Fade back in for the main site
        gsap.to(document.body, { opacity: 1, duration: 1, delay: 0.5 });
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07120d] text-white">
      {!isPlaying ? (
        <div className="animate-in fade-in duration-1000 flex flex-col items-center">
          {guestName && (
            <div className="text-center animate-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both mb-24">
              <div className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#a2b8ab] mb-4">Specially Invited</div>
              <div className="font-serif text-4xl md:text-6xl text-[#e5c083] font-bold tracking-wide">{guestName}</div>
            </div>
          )}
          <button 
            onClick={startIntro}
            className="group flex items-center gap-4 px-10 py-5 rounded-full bg-[#1b3a2a]/60 hover:bg-[#254d39]/80 border border-[#8c6721]/60 hover:border-[#8c6721] transition-all backdrop-blur-md shadow-[0_0_20px_rgba(212,176,123,0.15)] hover:shadow-[0_0_30px_rgba(212,176,123,0.3)] text-[#6b4f1a] cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#8c6721]/20 flex items-center justify-center border border-[#8c6721]/50 group-hover:bg-[#8c6721] transition-colors">
              <Play className="w-4 h-4 fill-[#8c6721] text-[#8c6721] group-hover:fill-[#1b3a2a] group-hover:text-[#1b3a2a]" />
            </div>
            <span className="text-sm md:text-base uppercase tracking-[0.3em] font-medium mr-2">View Invitation</span>
          </button>
        </div>
      ) : (
        <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden animate-in fade-in duration-1000">
          <video 
            ref={videoRef}
            src="/Annapurna 2026  Summit Window AheadA key update from Annapurna this season. The rope fixing team.mp4"
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
            playsInline
            controls={false}
            onEnded={handleVideoEnd}
          />
          <div ref={textOverlayRef} className="absolute top-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-center px-4 w-full pointer-events-none">
            <div className="font-serif text-xl md:text-2xl lg:text-3xl text-white tracking-[0.3em] uppercase leading-loose drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
              
              <div className="mb-4">
                <span className="word inline-block mr-3">Wedding</span>
                <span className="word inline-block">Invitation</span>
              </div>
              
              <div className="flex justify-center items-center gap-4">
                <span className="word text-[#8c6721] font-bold">Maheshi</span>
                <span className="word italic font-light lowercase text-lg">&</span>
                <span className="word text-[#8c6721] font-bold">Supun</span>
              </div>

            </div>
          </div>
          
          <button 
            onClick={handleVideoEnd}
            className="absolute bottom-10 text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors z-20"
          >
            Skip Intro
          </button>
        </div>
      )}
    </div>
  );
};

