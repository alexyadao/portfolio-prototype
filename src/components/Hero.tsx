import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  ArrowRight,
  Terminal,
  Copy,
  Check,
  Cpu,
  Server,
  Database,
  MapPin,
  Sparkles,
  Layers,
} from 'lucide-react';

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  const sidePanelVariants = {
    hidden: { opacity: 0, x: 25, scale: 0.98 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden transition-colors duration-300">
      {/* Spatial Ambient Glows with gentle breathing animation */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.15, 0.22, 0.15],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-gradient-to-tr from-cyan-500/10 via-indigo-600/15 to-violet-600/10 blur-[130px] rounded-full pointer-events-none -z-10"
      />
      <div className="absolute top-1/3 -right-20 w-[350px] h-[350px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -bottom-10 -left-20 w-[350px] h-[350px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Animated Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Spatial Telemetry Status Bar */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono shadow-md shadow-emerald-500/5 dark:shadow-emerald-950/20 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{PERSONAL_INFO.status}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-mono shadow-sm backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
              <span>{PERSONAL_INFO.address}</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 text-indigo-700 dark:text-indigo-300 text-xs font-mono backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Polytechnic University of the Philippines</span>
            </div>
          </motion.div>

          {/* Hero Identity Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            <div className="lg:col-span-7 space-y-5">
              <motion.div variants={itemVariants} className="space-y-2">
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest font-semibold flex items-center gap-2">
                  <span className="inline-block w-6 h-[1px] bg-cyan-500 dark:bg-cyan-400" />
                  Portfolio & Engineering Profile
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-lg sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 dark:from-cyan-400 dark:via-indigo-300 dark:to-violet-400 pt-1">
                  {PERSONAL_INFO.title}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white/80 dark:bg-zinc-900/50 border border-zinc-200/90 dark:border-zinc-800/90 rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-xl shadow-zinc-200/50 dark:shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-cyan-500 to-indigo-600" />
                <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {PERSONAL_INFO.bio}
                </p>
              </motion.div>

              {/* Quick Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-zinc-950 bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <span>Explore Featured Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={onOpenTerminal}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 bg-white/90 dark:bg-zinc-900/80 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700/80 hover:border-cyan-500/50 transition-all shadow-sm dark:shadow-md backdrop-blur-md"
                  title="Open interactive CLI"
                >
                  <Terminal className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span>Launch CLI Terminal</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900/50 hover:bg-zinc-200 dark:hover:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">Email Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>

            {/* Spatial Dashboard Telemetry & Profile Portrait Showcase (Right Side) */}
            <motion.div
              variants={sidePanelVariants}
              className="lg:col-span-5 w-full space-y-4"
            >
              {/* Professional Headshot with Floating Motion & Spatial Halo */}
              <motion.div
                animate={{
                  y: [-3, 3, -3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative group"
              >
                {/* Subtle Cyan / Indigo Glow Halo */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyan-500/25 via-indigo-500/20 to-violet-500/25 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Glassmorphic Image Frame */}
                <div className="relative bg-white/85 dark:bg-zinc-900/70 border border-zinc-200/90 dark:border-zinc-800/90 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-xl shadow-zinc-200/40 dark:shadow-2xl">
                  {/* Top Status Capsule */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                        Identity Profile
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-100/80 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-300/80 dark:border-cyan-800/60 font-semibold">
                      BSCpE • PUP
                    </span>
                  </div>

                  {/* Profile Image Viewport */}
                  <div className="relative rounded-xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 shadow-md group/img bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-950 dark:to-zinc-900">
                    <img
                      src="/profile.png"
                      onError={(e) => {
                        e.currentTarget.src = '/profile.png';
                      }}
                      alt="Alexander Christian R. Yadao"
                      className="w-full h-100 sm:h-300 lg:h-100 object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-[1.03]"
                    />

                    {/* Gradient Overlay & Telemetry Micro-Badge */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between pointer-events-none">
                      <div>
                        <p className="text-xs font-mono font-semibold tracking-tight text-white drop-shadow-sm">
                          Alexander Christian R. Yadao
                        </p>
                        <p className="text-[10px] font-mono text-cyan-300 drop-shadow-sm">
                          Software &amp; Backend Engineer
                        </p>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/60 border border-white/20 text-emerald-400 font-semibold">
                        VERIFIED
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Developer Telemetry Indicators */}
              <div className="bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-xl shadow-zinc-200/50 dark:shadow-2xl space-y-3">
                <div className="flex items-center justify-between pb-2.5 border-b border-zinc-200 dark:border-zinc-800/80">
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                    <span>Developer Telemetry</span>
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>

                {/* Core Pillars */}
                <div className="space-y-2.5">
                  <div className="bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-2.5 sm:p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Database className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                        Backend Architecture &amp; DBA
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Relational PostgreSQL, Supabase RLS policies, RESTful API endpoints, PHP/MySQL maintenance.
                    </p>
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-2.5 sm:p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Cpu className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 shrink-0" />
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                        Embedded Systems &amp; IoT
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      ESP32 firmware, C/C++ hardware interfacing, sensor diagnostic testing, solar IoT tracking.
                    </p>
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-2.5 sm:p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Layers className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                        Systems &amp; Infrastructure
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Windows 10/11, Active Directory provisioning, Linux CLI environments, Bash &amp; PowerShell scripts.
                    </p>
                  </div>
                </div>

                {/* Academic Footnote */}
                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Degree</span>
                  <span className="text-zinc-800 dark:text-zinc-300 font-semibold">BS Computer Engineering</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
