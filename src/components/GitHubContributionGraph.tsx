import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from '../context/ThemeContext';
import {
  ExternalLink,
  GitCommit,
  GitBranch,
  Flame,
  Calendar,
  Sparkles,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';

interface GitHubContributionGraphProps {
  username?: string;
}

export const GitHubContributionGraph: React.FC<GitHubContributionGraphProps> = ({
  username = 'alexyadao',
}) => {
  const { theme } = useTheme();
  const [selectedYear, setSelectedYear] = useState<number | 'last'>('last');
  const [paletteType, setPaletteType] = useState<'cyan' | 'github'>('cyan');
  const [refreshKey, setRefreshKey] = useState<number>(0);

  // High-fidelity custom color palettes matching the app's spatial design
  const cyanTheme = {
    light: ['#f4f4f5', '#a5f3fc', '#38bdf8', '#0284c7', '#0369a1'],
    dark: ['#18181b', '#164e63', '#0891b2', '#06b6d4', '#22d3ee'],
  };

  const gitHubTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  const activeThemePalette = paletteType === 'cyan' ? cyanTheme : gitHubTheme;

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mt-12 bg-white/90 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-7 backdrop-blur-xl shadow-xl shadow-zinc-200/50 dark:shadow-2xl transition-colors duration-300"
    >
      {/* Top Header & Live Telemetry Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-zinc-200 dark:border-zinc-800/80 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/50 border border-cyan-300 dark:border-cyan-800/50 text-cyan-700 dark:text-cyan-300 text-xs font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live GitHub API Feed</span>
            </div>

            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 hidden sm:inline">
              @{username}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2.5">
            <span>GitHub Contribution Heatmap</span>
          </h3>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl">
            Real-time commit activity, repository logs, and technical milestones synchronized from my GitHub profile.
          </p>
        </div>

        {/* Action Controls & External Link */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
          {/* Palette Selector */}
          <div className="flex items-center p-1 bg-zinc-100 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-mono">
            <button
              type="button"
              onClick={() => setPaletteType('cyan')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                paletteType === 'cyan'
                  ? 'bg-white dark:bg-zinc-800 text-cyan-600 dark:text-cyan-400 font-semibold shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              Cyan Theme
            </button>
            <button
              type="button"
              onClick={() => setPaletteType('github')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                paletteType === 'github'
                  ? 'bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 font-semibold shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              GitHub Green
            </button>
          </div>

          {/* Refresh Action */}
          <button
            type="button"
            onClick={handleRefresh}
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-950 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
            title="Refresh GitHub feed"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* GitHub Direct Link */}
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs font-semibold shadow-md transition-all active:scale-95"
          >
            <span>View @{username}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Year Selection Filter Pills */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-cyan-500" />
          <span className="text-zinc-500 dark:text-zinc-400">Activity Range:</span>
          {(['last', 2026, 2025, 2024] as const).map((yr) => (
            <button
              key={yr}
              type="button"
              onClick={() => setSelectedYear(yr)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedYear === yr
                  ? 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-400 dark:border-cyan-800 font-bold'
                  : 'bg-zinc-100 dark:bg-zinc-950/60 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              {yr === 'last' ? 'Past 12 Months' : yr}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Real-time graph from GitHub public contribution feed</span>
        </div>
      </div>

      {/* Live GitHub Calendar Embed */}
      <div className="bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5 overflow-x-auto shadow-inner">
        <div className="min-w-[650px] flex justify-center py-2">
          <GitHubCalendar
            key={`${username}-${selectedYear}-${paletteType}-${theme}-${refreshKey}`}
            username={username}
            year={selectedYear}
            colorScheme={theme === 'dark' ? 'dark' : 'light'}
            theme={activeThemePalette}
            blockSize={12}
            blockMargin={4}
            blockRadius={3}
            fontSize={12}
            showWeekdayLabels
            errorMessage={`Could not load GitHub activity for @${username}. Please check the profile status or try again.`}
          />
        </div>
      </div>

      {/* Calendar Bottom Telemetry Footnotes */}
      <div className="mt-5 pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
        <div className="flex flex-col items-start sm:flex-row sm:items-center flex-wrap gap-2 sm:gap-3">
          <div className="flex items-center flex-wrap gap-1.5">
            <GitBranch className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
            <span>Target:</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              github.com/{username}
            </span>
          </div>

          <span className="hidden sm:inline">•</span>

          <div className="flex items-center flex-wrap gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Active Repositories:</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              C++, TypeScript, SQL, Microcontrollers
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Auto-synchronized via react-github-calendar</span>
        </div>
      </div>
    </motion.div>
  );
};
