import React, { useState } from 'react';
import { SKILL_GROUPS } from '../data/portfolioData';
import {
  Cpu,
  Database,
  CheckCircle2,
  Server,
  Code2,
  Sparkles,
} from 'lucide-react';
import { GitHubContributionGraph } from './GitHubContributionGraph';

export const SkillsSection: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const getGroupIcon = (type: 'os' | 'code' | 'database') => {
    switch (type) {
      case 'os':
        return <Server className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />;
      case 'code':
        return <Code2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />;
      case 'database':
        return <Database className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />;
      default:
        return <Cpu className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-20 scroll-mt-20 relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/50 border border-cyan-300 dark:border-cyan-800/50 text-cyan-700 dark:text-cyan-300 text-xs font-mono uppercase tracking-wider mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Skills &amp; Technology Stack
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl">
              Core competencies spanning system administration, software engineering, databases, and embedded systems.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span>13 Core Competencies Verified</span>
          </div>
        </div>

        {/* Spatial 3-Column Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, idx) => (
            <div
              key={idx}
              className="bg-white/90 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-zinc-300 dark:hover:border-zinc-700/90 rounded-2xl p-6 backdrop-blur-xl shadow-lg shadow-zinc-200/50 dark:shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Group Header */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800/80">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                    {getGroupIcon(group.iconType)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                      {group.category}
                    </h3>
                    <p className="text-[11px] text-zinc-500 font-mono">
                      {group.skills.length} core technologies
                    </p>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                  {group.description}
                </p>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {group.skills.map((skill) => {
                    const isSelected = selectedSkill === skill;
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() =>
                          setSelectedSkill(isSelected ? null : skill)
                        }
                        className={`px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 border ${
                          isSelected
                            ? 'bg-cyan-100 dark:bg-cyan-950/80 border-cyan-500 text-cyan-800 dark:text-cyan-200 ring-1 ring-cyan-500/50 shadow-md shadow-cyan-500/10 dark:shadow-cyan-950/40'
                            : 'bg-zinc-100/90 dark:bg-zinc-950/70 hover:bg-zinc-200/70 dark:hover:bg-zinc-800/60 border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? 'bg-cyan-500 dark:bg-cyan-400' : 'bg-zinc-400 dark:bg-zinc-600'
                          }`}
                        />
                        <span>{skill}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer Metric */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  <span>Production &amp; Academic Ready</span>
                </span>
                <span className="text-zinc-600 dark:text-zinc-400 font-semibold">PUP CpE</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Skill Feedback Box */}
        {selectedSkill && (
          <div className="mt-6 p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/50 flex items-center justify-between gap-3 text-xs text-cyan-800 dark:text-cyan-300 animate-in fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
              <span>
                Selected: <strong className="text-zinc-900 dark:text-white font-mono">{selectedSkill}</strong> — Applied across Alexander&apos;s academic and industry projects.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedSkill(null)}
              className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white underline font-mono"
            >
              Clear
            </button>
          </div>
        )}

        {/* Live GitHub Contribution Heatmap Widget for exact user 'alexyadao' */}
        <GitHubContributionGraph username="alexyadao" />
      </div>
    </section>
  );
};
