import React, { useEffect, useRef, useState } from 'react';

interface MountainAtmosphereProps {
  scrollProgress: number; // 0 to 1
  elevation: number;
}

export const MountainAtmosphere: React.FC<MountainAtmosphereProps> = ({ scrollProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Smooth mouse tilt parallax for a high-end cinematic lens effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 32;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Multi-tier procedural particle engine:
  // Low elevation: morning mist & dewdrops
  // Mid elevation: emerald forest spores & cascading water mist
  // Summit: diamond frost crystals & golden-white dawn sparkles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      kind: 'mist' | 'ember' | 'frost' | 'petal';
      phase: number;
      speed: number;
    }

    const particles: Particle[] = [];
    const count = window.innerWidth < 768 ? 60 : 120;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.8 + 1,
        vx: (Math.random() - 0.3) * 0.5,
        vy: (Math.random() - 0.5) * 0.3 - 0.15,
        alpha: Math.random() * 0.6 + 0.25,
        kind:
          Math.random() > 0.65
            ? 'frost'
            : Math.random() > 0.4
            ? 'petal'
            : Math.random() > 0.2
            ? 'ember'
            : 'mist',
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
      });
    }

    let t = 0;
    const render = () => {
      t += 0.014;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Add more wind drift and downward snow falling motion
        p.x += p.vx + Math.sin(t + p.phase) * 0.6 + 0.5;
        p.y += p.vy + 0.6;

        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        ctx.beginPath();
        if (p.kind === 'frost') {
          // Glistening bright white snow & frost crystals (visible everywhere)
          const glow = (Math.sin(t * 3.8 + p.phase) + 1) * 0.5;
          ctx.arc(p.x, p.y, p.radius * 1.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * (0.85 + glow * 0.4)})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = 'rgba(255, 255, 255, 1)';
        } else if (p.kind === 'ember') {
          // Subtle champagne golden light motes
          ctx.arc(p.x, p.y, p.radius * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(228, 195, 135, ${p.alpha * 0.45})`;
          ctx.shadowBlur = 7;
          ctx.shadowColor = 'rgba(212, 176, 123, 0.6)';
        } else if (p.kind === 'petal') {
          // Delicate white mountain blossom petal / dewdrop
          const rot = Math.sin(t * 2 + p.phase);
          ctx.ellipse(p.x, p.y, p.radius * 1.4, p.radius * 0.7, rot, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.4})`;
          ctx.shadowBlur = 3;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        } else {
          // Brighter white wind/mist rolling cloudlet
          ctx.arc(p.x, p.y, p.radius * 3.0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.4})`;
          ctx.shadowBlur = 5;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollProgress]);

  const p = Math.max(0, Math.min(1, scrollProgress));

  // Dynamic sky & mountain palette transitions based on altitude
  // Foothills: Deep emerald greenery & morning mist
  // Slopes: Emerald pine forests & cascading streams
  // Summit: Pristine icy-white alpine ridges, cloud seas & celestial golden sunlight
  let skyGradient = '';
  if (p < 0.28) {
    const sub = p / 0.28;
    skyGradient = `linear-gradient(180deg, 
      rgba(7, 18, 13, 0.99) 0%, 
      rgba(13, 30, 21, ${0.94 + sub * 0.04}) 35%, 
      rgba(20, 48, 34, 0.95) 70%,
      rgba(10, 22, 16, 1) 100%)`;
  } else if (p < 0.65) {
    const sub = (p - 0.28) / 0.37;
    skyGradient = `linear-gradient(180deg, 
      rgba(10, 22, 17, 0.99) 0%, 
      rgba(18, 40, 30, ${0.95 - sub * 0.04}) 35%, 
      rgba(28, 58, 44, 0.92) 70%,
      rgba(12, 26, 20, 1) 100%)`;
  } else {
    const sub = (p - 0.65) / 0.35;
    skyGradient = `linear-gradient(180deg, 
      rgba(${Math.round(14 + sub * 22)}, ${Math.round(30 + sub * 18)}, ${Math.round(26 + sub * 28)}, 0.99) 0%, 
      rgba(${Math.round(24 + sub * 45)}, ${Math.round(48 + sub * 35)}, ${Math.round(44 + sub * 45)}, 0.96) 35%, 
      rgba(${Math.round(45 + sub * 85)}, ${Math.round(75 + sub * 65)}, ${Math.round(70 + sub * 80)}, 0.92) 70%,
      rgba(${Math.round(16 + sub * 25)}, ${Math.round(32 + sub * 22)}, ${Math.round(28 + sub * 28)}, 1) 100%)`;
  }

  // Parallax offsets with mouse dampening
  const skyY = p * -60;
  const distantY = p * -120 + mouseOffset.y * 0.2;
  const midY = p * -230 + mouseOffset.y * 0.45;
  const nearY = p * -350 + mouseOffset.y * 0.7;
  const foregroundY = p * -450 + mouseOffset.y * 0.9;
  const mouseX = mouseOffset.x * 0.3;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-all duration-700">
      {/* Layers 1 through 8.5 disabled so they don't cover the static image */}
      {false && (
        <>
          {/* 1. Base Sky Gradient with Dynamic Altitude Shift */}
          <div
            className="absolute inset-0 transition-all duration-1000 ease-out"
            style={{ background: skyGradient }}
          />

          {/* 2. Ethereal Volumetric Crepuscular Sun Rays */}
          <div
            className="absolute -top-32 right-1/4 w-[160vw] h-[130vh] pointer-events-none opacity-40 transition-all duration-1000"
            style={{
              transform: `rotate(-16deg) translate3d(${mouseX * 0.6}px, ${p * 70}px, 0)`,
              background: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 65px,
                rgba(${p > 0.6 ? '255, 255, 255' : '220, 245, 230'}, ${0.06 + (1 - p * 0.3) * 0.08}) 105px,
                transparent 165px
              )`,
            }}
          />

          {/* 3. Celestial Golden-White Sun / Summit Glow Orb */}
          <div
            className="absolute -top-40 right-[15%] w-[720px] h-[720px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000"
            style={{
              background:
                p > 0.55
                  ? 'radial-gradient(circle, rgba(255, 255, 255, 0.48) 0%, rgba(212, 176, 123, 0.32) 42%, transparent 75%)'
                  : 'radial-gradient(circle, rgba(220, 245, 230, 0.24) 0%, rgba(135, 195, 160, 0.15) 45%, transparent 78%)',
              transform: `translate3d(${mouseX * 0.4}px, ${p * 210}px, 0) scale(${1 + p * 0.4})`,
            }}
          />

          {/* 4. Topographic Alpine Contour Grid (Cartographic Elegance) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-15 transition-transform duration-700"
            style={{ transform: `translate3d(0, ${skyY}px, 0)` }}
          >
            <svg
              viewBox="0 0 1440 1000"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full text-[#c8d8ce]"
            >
              <path
                d="M0 180 C320 220, 520 140, 820 200 C1120 260, 1320 170, 1440 210"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeDasharray="4 6"
              />
              <path
                d="M0 340 C340 300, 620 400, 920 320 C1220 250, 1370 360, 1440 330"
                stroke="currentColor"
                strokeWidth="0.75"
              />
              <path
                d="M0 500 C270 460, 570 540, 870 480 C1170 420, 1340 520, 1440 490"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeDasharray="3 5"
              />
              <path
                d="M0 660 C360 700, 700 620, 1040 680 C1280 720, 1400 640, 1440 670"
                stroke="currentColor"
                strokeWidth="0.75"
              />
            </svg>
          </div>

          {/* 5. Layer: Distant Jagged Icy Peaks with Pure White Snowcaps & Glaciers */}
          <div
            className="absolute inset-x-0 bottom-0 h-[72vh] w-full opacity-85 transition-transform duration-300 ease-out"
            style={{ transform: `translate3d(${mouseX * 0.4}px, ${distantY}px, 0)` }}
          >
            <svg
              viewBox="0 0 1440 600"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full text-[#0d2217]"
            >
              <defs>
                <linearGradient id="glacierGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="70%" stopColor="#e2efe8" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#8db4a0" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="peakFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#173827" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0b1b12" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              <path
                d="M0 600L0 350L90 290L190 370L320 210L420 290L540 130L630 220L760 80L860 190L1000 60L1120 210L1260 150L1350 260L1440 230L1440 600Z"
                fill="url(#peakFaceGrad)"
              />
              <polygon points="540,130 500,185 575,185" fill="url(#glacierGrad)" />
              <polygon points="760,80 710,145 795,145" fill="url(#glacierGrad)" />
              <polygon points="1000,60 950,130 1045,130" fill="url(#glacierGrad)" />
              <polygon points="320,210 290,250 345,250" fill="url(#glacierGrad)" />
              <polygon points="1260,150 1225,195 1295,195" fill="url(#glacierGrad)" />

              <path
                d="M540 130L560 210L630 220 M760 80L790 170L860 190 M1000 60L1040 160L1120 210"
                stroke="rgba(255, 255, 255, 0.65)"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
              <path
                d="M540 130L525 180 M760 80L735 150 M1000 60L975 135"
                stroke="rgba(255, 255, 255, 0.45)"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* 6. Layer: Mid-Range Misty Alpine Slopes & Whispering Pines */}
          <div
            className="absolute inset-x-0 bottom-0 h-[64vh] w-full opacity-90 transition-transform duration-300 ease-out"
            style={{ transform: `translate3d(${mouseX * 0.7}px, ${midY}px, 0)` }}
          >
            <svg
              viewBox="0 0 1440 600"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full text-[#0a1c12]"
            >
              <path
                d="M0 600L0 410L140 330L260 400L410 260L550 350L690 200L830 320L980 170L1130 300L1290 220L1440 310L1440 600Z"
                fill="currentColor"
                fillOpacity="0.88"
              />
              <path
                d="M690 205 L685 360 M693 205 L696 360"
                stroke="rgba(255, 255, 255, 0.35)"
                strokeWidth="1.5"
                strokeDasharray="8 5"
              />
            </svg>
          </div>

          {/* 7. Layer: Rolling Verdant Hills & Emerald Forest Canopy */}
          <div
            className="absolute inset-x-0 bottom-0 h-[54vh] w-full opacity-95 transition-transform duration-200 ease-out"
            style={{ transform: `translate3d(${mouseX}px, ${nearY}px, 0)` }}
          >
            <svg
              viewBox="0 0 1440 500"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full text-[#06140d]"
            >
              <path
                d="M0 500L0 360
                C120 340, 220 380, 360 310
                C480 250, 620 340, 780 280
                C920 230, 1080 310, 1220 250
                C1340 200, 1400 240, 1440 260
                L1440 500Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* 8. Layer: Foreground Mountain Trail with Lush Wild Grass & White Mountain Blossoms */}
          <div
            className="absolute inset-x-0 bottom-0 h-[38vh] w-full opacity-90 transition-transform duration-150 ease-out"
            style={{ transform: `translate3d(${mouseX * 1.2}px, ${foregroundY}px, 0)` }}
          >
            <svg
              viewBox="0 0 1440 400"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full text-[#040e09]"
            >
              <path
                d="M0 400L0 280
                C180 250, 360 320, 540 270
                C720 220, 900 300, 1080 240
                C1260 190, 1380 260, 1440 230
                L1440 400Z"
                fill="currentColor"
              />
              {[120, 280, 460, 640, 820, 1020, 1240, 1380].map((bx, i) => (
                <g key={i} opacity="0.65" transform={`translate(${bx}, ${220 + (i % 3) * 20})`}>
                  <line x1="0" y1="20" x2="0" y2="0" stroke="#1d442e" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
                  <circle cx="-3" cy="-2" r="2" fill="#e8f3ee" />
                  <circle cx="3" cy="-2" r="2" fill="#e8f3ee" />
                  <circle cx="0" cy="-4" r="2" fill="#ffffff" />
                  <circle cx="0" cy="0" r="1.2" fill="#8c6721" />
                </g>
              ))}
            </svg>
          </div>

          {/* 8.5. Dark Overlay for text readability (Moves behind foreground weather effects) */}
          <div className="absolute inset-0 bg-black/65 pointer-events-none" />
        </>
      )}

      {/* 9. Layer: Subtle Dark Mist Waves (no white glow) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{ opacity: 0.3 + Math.sin(p * Math.PI) * 0.15 }}
      >
        <div className="absolute -left-1/4 top-1/3 w-[150%] h-64 bg-gradient-to-r from-transparent via-[#0f1b15]/40 to-transparent blur-3xl transform -rotate-2 animate-float-slow" />
        <div className="absolute -right-1/4 bottom-1/4 w-[140%] h-72 bg-gradient-to-l from-transparent via-[#0f1b15]/40 to-transparent blur-3xl transform rotate-1" />
      </div>

      {/* 10. Procedural Ambient Dust / Frost Sparkle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* 11. Subtle Photographic Vignette & Grain */}
      <div className="absolute inset-0 cinematic-vignette pointer-events-none" />
    </div>
  );
};

