import React from 'react';

/**
 * AmbientBackground component
 * 
 * Provides a dark slate base background with an infrastructure grid pattern overlay
 * and smoothly animated multi-color aurora glows (teal/emerald & blue/indigo)
 * positioned with fixed inset-0 z-[-1] so it sits behind all content.
 */
export const AmbientBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#020617] transition-colors duration-500"
    >
      {/* 1. Subtle SVG Grid Overlay - tiny, faint grid pattern with 5-10% opacity */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07] stroke-slate-400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="ambient-grid-pattern"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ambient-grid-pattern)" />
      </svg>

      {/* 2. Animated Aurora Glow: Deep Teal / Emerald */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-br from-emerald-500/20 via-teal-600/15 to-transparent blur-[130px] animate-pulse"
        style={{
          animationDuration: '9s',
        }}
      />

      {/* 3. Animated Aurora Glow: Deep Blue / Indigo */}
      <div
        className="absolute top-[25%] -right-[15%] w-[60vw] h-[60vw] max-w-[750px] max-h-[750px] rounded-full bg-gradient-to-bl from-indigo-600/20 via-blue-700/15 to-transparent blur-[140px] animate-pulse"
        style={{
          animationDuration: '12s',
          animationDelay: '2s',
        }}
      />

      {/* 4. Secondary Subtle Cyan / Sky Core Glow */}
      <div
        className="absolute -bottom-[15%] left-[20%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full bg-gradient-to-tr from-cyan-600/15 via-teal-800/10 to-transparent blur-[150px] animate-pulse"
        style={{
          animationDuration: '15s',
          animationDelay: '4s',
        }}
      />

      {/* Vignette radial falloff for cinematic contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_0%,rgba(2,6,23,0.5)_100%)] pointer-events-none" />
    </div>
  );
};

export default AmbientBackground;
