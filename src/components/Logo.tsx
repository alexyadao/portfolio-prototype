import React from 'react';

interface LogoProps {
  className?: string;
  showStatus?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', showStatus = true }) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {/* Monogram Glassmorphic Badge */}
      <div className="h-10 w-10 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md flex items-center justify-center p-1.5 shadow-lg shadow-cyan-950/20 hover:border-cyan-400/60 transition-all duration-300 group">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform duration-300 group-hover:scale-105"
          aria-label="Alexander Yadao Monogram"
        >
          <defs>
            <linearGradient id="logo-ay-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id="logo-subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Terminal bracket accents `<` and `>` */}
          <path
            d="M 5.5 11 L 3 16 L 5.5 21"
            stroke="url(#logo-ay-gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-65"
          />
          <path
            d="M 26.5 11 L 29 16 L 26.5 21"
            stroke="url(#logo-ay-gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-65"
          />

          {/* Letter 'A' outer geometric chevron & legs */}
          <path
            d="M 8.5 24.5 L 16 6.5 L 23.5 24.5"
            stroke="url(#logo-ay-gradient)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#logo-subtle-glow)"
          />

          {/* Horizontal crossbar for 'A' with circuit split */}
          <path
            d="M 11.2 17.5 L 13.8 17.5 M 18.2 17.5 L 20.8 17.5"
            stroke="url(#logo-ay-gradient)"
            strokeWidth="1.9"
            strokeLinecap="round"
          />

          {/* Letter 'Y' upper fork & central data bus / stem */}
          <path
            d="M 11.5 12.5 L 16 17.5 L 20.5 12.5"
            stroke="url(#logo-ay-gradient)"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 16 17.5 L 16 25.5"
            stroke="url(#logo-ay-gradient)"
            strokeWidth="2.2"
            strokeLinecap="round"
            filter="url(#logo-subtle-glow)"
          />

          {/* Circuit nodes / terminal pads */}
          <circle cx="16" cy="6.5" r="1.3" fill="#06b6d4" />
          <circle cx="8.5" cy="24.5" r="1.3" fill="#10b981" />
          <circle cx="23.5" cy="24.5" r="1.3" fill="#10b981" />
          <circle cx="16" cy="25.5" r="1.5" fill="#10b981" />
          <circle cx="16" cy="17.5" r="1" fill="#06b6d4" />
        </svg>
      </div>

      {/* Online / Active status pulse indicator */}
      {showStatus && (
        <span
          className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 items-center justify-center"
          title="Active / Open to Opportunities"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
        </span>
      )}
    </div>
  );
};

export default Logo;
