import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'cyan' | 'indigo' | 'emerald' | 'violet' | 'amber';
  label?: string;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'cyan',
  label,
  className = '',
}) => {
  // Gradient color schemes tailored to spatial UI
  const colorMap = {
    cyan: {
      line: 'from-transparent via-cyan-500/40 dark:via-cyan-400/50 to-transparent',
      glow: 'bg-cyan-500/20 dark:bg-cyan-400/20',
      beam: 'from-transparent via-cyan-400 to-transparent',
      node: 'bg-cyan-500 border-cyan-300 dark:border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.7)]',
      text: 'text-cyan-600 dark:text-cyan-400 border-cyan-300 dark:border-cyan-800/70 bg-cyan-50/80 dark:bg-cyan-950/70',
    },
    indigo: {
      line: 'from-transparent via-indigo-500/40 dark:via-indigo-400/50 to-transparent',
      glow: 'bg-indigo-500/20 dark:bg-indigo-400/20',
      beam: 'from-transparent via-indigo-400 to-transparent',
      node: 'bg-indigo-500 border-indigo-300 dark:border-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.7)]',
      text: 'text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-800/70 bg-indigo-50/80 dark:bg-indigo-950/70',
    },
    emerald: {
      line: 'from-transparent via-emerald-500/40 dark:via-emerald-400/50 to-transparent',
      glow: 'bg-emerald-500/20 dark:bg-emerald-400/20',
      beam: 'from-transparent via-emerald-400 to-transparent',
      node: 'bg-emerald-500 border-emerald-300 dark:border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.7)]',
      text: 'text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800/70 bg-emerald-50/80 dark:bg-emerald-950/70',
    },
    violet: {
      line: 'from-transparent via-violet-500/40 dark:via-violet-400/50 to-transparent',
      glow: 'bg-violet-500/20 dark:bg-violet-400/20',
      beam: 'from-transparent via-violet-400 to-transparent',
      node: 'bg-violet-500 border-violet-300 dark:border-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.7)]',
      text: 'text-violet-600 dark:text-violet-400 border-violet-300 dark:border-violet-800/70 bg-violet-50/80 dark:bg-violet-950/70',
    },
    amber: {
      line: 'from-transparent via-amber-500/40 dark:via-amber-400/50 to-transparent',
      glow: 'bg-amber-500/20 dark:bg-amber-400/20',
      beam: 'from-transparent via-amber-400 to-transparent',
      node: 'bg-amber-500 border-amber-300 dark:border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.7)]',
      text: 'text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800/70 bg-amber-50/80 dark:bg-amber-950/70',
    },
  };

  const scheme = colorMap[variant];

  return (
    <div className={`relative w-full max-w-5xl mx-auto px-4 my-2 select-none overflow-hidden ${className}`}>
      {/* Subtle Background Glow Pill */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-5 blur-xl rounded-full pointer-events-none opacity-40 dark:opacity-60 ${scheme.glow}`}
      />

      {/* Main Animated Line Container */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.7 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center justify-center h-7"
      >
        {/* Static Base Gradient Line */}
        <div className={`absolute inset-x-0 h-[1.5px] bg-gradient-to-r ${scheme.line}`} />

        {/* Dynamic Sweeping Shimmer Beam */}
        <motion.div
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.8,
            ease: 'easeInOut',
            repeatDelay: 1.2,
          }}
          className={`absolute h-[2px] w-48 bg-gradient-to-r ${scheme.beam} blur-[0.5px] opacity-75 pointer-events-none`}
        />

        {/* Center Node / Tag */}
        {label ? (
          <div
            className={`relative z-10 px-3 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase border backdrop-blur-md shadow-xs transition-colors ${scheme.text}`}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 bg-current animate-pulse" />
            {label}
          </div>
        ) : (
          <div className="relative z-10 flex items-center gap-1.5 px-2 bg-zinc-50 dark:bg-zinc-950">
            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className={`w-2.5 h-2.5 rotate-45 border ${scheme.node}`}
            />
            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          </div>
        )}
      </motion.div>
    </div>
  );
};
