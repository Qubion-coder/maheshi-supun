import React from 'react';

interface WindingPathProps {
  scrollProgress: number; // 0 to 1
}

export const WindingPath: React.FC<WindingPathProps> = ({ scrollProgress }) => {
  // S-curves representing a mountain ridge trail descending/ascending
  // We provide a continuous path that loops gently across the center of the canvas
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 7000"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          {/* Gradient trail: from soft misty green to golden summit amber */}
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8ba895" stopOpacity="0.65" />
            <stop offset="25%" stopColor="#a3b899" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#c5be9e" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#dfbe83" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f3ca7d" stopOpacity="1" />
          </linearGradient>

          {/* Golden glow filter */}
          <filter id="trailGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer subtle shadow/tread trail */}
        <path
          d="M 500,120
             C 520,380 440,650 420,950
             C 400,1250 630,1500 660,1800
             C 690,2100 410,2400 370,2700
             C 330,3000 600,3350 640,3650
             C 680,3950 440,4250 410,4550
             C 380,4850 620,5150 650,5450
             C 680,5750 480,6050 460,6350
             C 440,6650 500,6850 500,6950"
          stroke="rgba(10, 16, 12, 0.6)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Trail Path Grounding Line */}
        <path
          d="M 500,120
             C 520,380 440,650 420,950
             C 400,1250 630,1500 660,1800
             C 690,2100 410,2400 370,2700
             C 330,3000 600,3350 640,3650
             C 680,3950 440,4250 410,4550
             C 380,4850 620,5150 650,5450
             C 680,5750 480,6050 460,6350
             C 440,6650 500,6850 500,6950"
          stroke="url(#trailGradient)"
          strokeWidth="3.5"
          strokeDasharray="6 8"
          strokeLinecap="round"
          filter="url(#trailGlow)"
        />

        {/* Gentle illuminated milestone cairns along the path */}
        {[
          { y: 120, x: 500, label: "Trailhead · 780m" },
          { y: 950, x: 420, label: "Valley Crossing · 940m" },
          { y: 1800, x: 660, label: "Lantern Ridge · 1,220m" },
          { y: 2700, x: 370, label: "Larch Grove · 1,580m" },
          { y: 3650, x: 640, label: "Wildflower Glade · 1,920m" },
          { y: 4550, x: 410, label: "Sanctuary Crags · 2,450m" },
          { y: 5450, x: 650, label: "Sea of Clouds · 2,850m" },
          { y: 6350, x: 460, label: "Summit Overlook · 3,180m" },
        ].map((marker, idx) => {
          const markerProgress = marker.y / 7000;
          const isPassed = scrollProgress >= markerProgress - 0.03;

          return (
            <g key={idx} className="transition-all duration-500">
              {/* Outer soft ring */}
              <circle
                cx={marker.x}
                cy={marker.y}
                r={isPassed ? 10 : 7}
                fill="none"
                stroke={isPassed ? 'rgba(235, 196, 128, 0.7)' : 'rgba(180, 195, 185, 0.3)'}
                strokeWidth={isPassed ? 2 : 1}
              />
              {/* Core stone pin */}
              <circle
                cx={marker.x}
                cy={marker.y}
                r={isPassed ? 4.5 : 3}
                fill={isPassed ? '#f5cca0' : '#889a8f'}
                className="transition-colors duration-500"
              />
              {/* Subtle altitude marker text */}
              <text
                x={marker.x + (marker.x > 500 ? -18 : 18)}
                y={marker.y + 4}
                textAnchor={marker.x > 500 ? 'end' : 'start'}
                fill={isPassed ? '#ebd1a0' : '#6f8076'}
                fontSize="12"
                fontFamily="sans-serif"
                letterSpacing="1"
                className="select-none font-medium opacity-80"
              >
                {marker.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
