import React, { useState } from 'react';
import { Terminal, X } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const DraftBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-zinc-100/90 dark:bg-zinc-950 border-b border-cyan-500/20 px-4 py-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-mono select-none transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold tracking-wider text-[11px]">
            SPATIAL PROTOTYPE ENGINE
          </span>
          <span className="hidden sm:inline text-zinc-400 dark:text-zinc-600">|</span>
          <span className="hidden sm:inline text-zinc-700 dark:text-zinc-300 text-[11px]">
            {PERSONAL_INFO.title}
          </span>
          <span className="hidden md:inline text-zinc-400 dark:text-zinc-600">•</span>
          <span className="hidden md:inline text-zinc-600 dark:text-zinc-400 text-[11px]">
            {PERSONAL_INFO.institution}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#terminal"
            className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
          >
            <Terminal className="w-3 h-3" />
            <span className="hidden sm:inline">Launch CLI</span>
          </a>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 p-0.5 transition-colors"
            title="Dismiss top ticker"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
