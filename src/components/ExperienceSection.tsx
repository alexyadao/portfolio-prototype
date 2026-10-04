import React from 'react';
import { motion } from 'framer-motion';
import { JOURNEY_TIMELINE } from '../data/portfolioData';
import {
  Milestone,
  Briefcase,
  Award,
  Users,
  GraduationCap,
  Calendar,
  Building2,
} from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const getItemIcon = (category: string) => {
    switch (category) {
      case 'internship':
        return <Briefcase className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />;
      case 'certification':
        return <Award className="w-4 h-4 text-amber-500 dark:text-amber-400" />;
      case 'leadership':
        return <Users className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />;
      default:
        return <Milestone className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />;
    }
  };

  const getItemBadge = (category: string) => {
    switch (category) {
      case 'internship':
        return 'bg-cyan-100 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800/60';
      case 'certification':
        return 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800/60';
      case 'leadership':
        return 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800/60';
      case 'education':
        return 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60';
      default:
        return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700';
    }
  };

  return (
    <section id="journey" className="py-16 sm:py-20 scroll-mt-20 relative transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header with Viewport Animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center sm:text-left"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/50 border border-indigo-300 dark:border-indigo-800/50 text-indigo-800 dark:text-indigo-300 text-xs font-mono uppercase tracking-wider mb-2">
            <Milestone className="w-3.5 h-3.5" />
            <span>Chronological Milestones</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Journey & Experience
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl">
            Engineering internship, leadership responsibilities, certifications, and academic education.
          </p>
        </motion.div>

        {/* Spatial Timeline Container with Staggered Viewport Entrance */}
        <div className="relative border-l-2 border-zinc-300 dark:border-zinc-800 ml-4 sm:ml-6 space-y-8">
          {JOURNEY_TIMELINE.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative pl-6 sm:pl-8 group"
            >
              {/* Glowing Timeline Marker with Pop-in Animation */}
              <motion.div
                initial={{ scale: 0.3, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.12 + 0.1,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
                className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center shadow-md group-hover:border-cyan-500 dark:group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all"
              >
                {getItemIcon(item.category)}
              </motion.div>

              {/* Spatial Card with Hover Motion */}
              <motion.div
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="bg-white/90 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-lg shadow-zinc-200/50 dark:shadow-xl transition-colors duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {item.role}
                    </h3>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wide font-semibold ${getItemBadge(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/30 px-2.5 py-1 rounded-md border border-cyan-200 dark:border-cyan-800/40 w-fit">
                    <Calendar className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-300 mb-3">
                  <Building2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  <span>{item.organization}</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-950/50 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800/70">
                  {item.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
