import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  ArrowUp,
  Linkedin,
  Github,
  Mail,
  Phone,
  Copy,
  Check,
  ExternalLink,
  MapPin,
  Sparkles,
  Send,
  Terminal,
  FolderGit2,
  Cpu,
  Milestone,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Projects', href: '#projects', icon: FolderGit2 },
    { name: 'Skills', href: '#skills', icon: Cpu },
    { name: 'Journey', href: '#journey', icon: Milestone },
    { name: 'CLI Terminal', href: '#terminal', icon: Terminal },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100/90 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 text-xs py-14 transition-colors duration-300 relative overflow-hidden">
      {/* Subtle ambient spatial background glow */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-cyan-500/5 dark:bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-10 w-[300px] h-[200px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Hero Identity & Mission Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-10 border-b border-zinc-200 dark:border-zinc-800/80 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-indigo-500/30 to-violet-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 flex items-center justify-center font-bold text-base shadow-sm">
              {PERSONAL_INFO.monogram}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-zinc-900 dark:text-zinc-100 text-base sm:text-lg tracking-tight">
                  {PERSONAL_INFO.name}
                </p>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs font-mono mt-0.5">
                {PERSONAL_INFO.title}
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-[11px] font-mono mt-1 flex items-center gap-1.5">
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">PUP</span>
                <span>• BS Computer Engineering</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-cyan-500" />
                  {PERSONAL_INFO.address}
                </span>
              </p>
            </div>
          </div>

          {/* Status Badge & Back to Top Trigger */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Available for Opportunities</span>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-cyan-500/50 transition-all shadow-xs group"
              title="Return to top of page"
            >
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 text-cyan-500" />
              <span className="font-mono text-xs">Back to Top</span>
            </button>
          </div>
        </div>

        {/* Enhanced Professional Profiles & Dedicated Contact Hub */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-5 border-b border-zinc-200 dark:border-zinc-800/80">
          {/* 1. LinkedIn Professional Profile Card */}
          <div className="bg-white/90 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 rounded-2xl p-5 backdrop-blur-xl shadow-md hover:border-cyan-500/40 hover:shadow-cyan-500/5 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-100 dark:bg-cyan-950/70 border border-cyan-300 dark:border-cyan-800/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      LinkedIn
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      Professional Network
                    </span>
                  </div>
                </div>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  title="Open LinkedIn"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                Connect for professional inquiries, software engineering roles, and backend development collaborations.
              </p>
            </div>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-3.5 rounded-xl text-xs font-mono font-semibold bg-zinc-100 dark:bg-zinc-800/70 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 text-zinc-800 dark:text-zinc-200 hover:text-cyan-700 dark:hover:text-cyan-300 border border-zinc-200 dark:border-zinc-700/80 hover:border-cyan-400 transition-all"
            >
              <span>linkedin.com/in/alexyadao</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 2. GitHub Professional Profile Card */}
          <div className="bg-white/90 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 rounded-2xl p-5 backdrop-blur-xl shadow-md hover:border-indigo-500/40 hover:shadow-indigo-500/5 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 border border-indigo-300 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      GitHub
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      Code Repositories
                    </span>
                  </div>
                </div>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  title="Open GitHub"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                Explore open-source backend code, ESP32 microcontroller firmware, SQL schemas, and automation scripts.
              </p>
            </div>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-3.5 rounded-xl text-xs font-mono font-semibold bg-zinc-100 dark:bg-zinc-800/70 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-zinc-800 dark:text-zinc-200 hover:text-indigo-700 dark:hover:text-indigo-300 border border-zinc-200 dark:border-zinc-700/80 hover:border-indigo-400 transition-all"
            >
              <span>github.com/alexyadao</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 3. Dedicated Contact Email Card */}
          <div className="bg-white/90 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 rounded-2xl p-5 backdrop-blur-xl shadow-md hover:border-emerald-500/40 hover:shadow-emerald-500/5 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      Direct Email
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      Primary Inquiries
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800/50 px-2 py-0.5 rounded">
                  Fastest
                </span>
              </div>

              <p className="text-xs font-mono text-zinc-800 dark:text-zinc-200 font-semibold truncate select-all mb-4 bg-zinc-50 dark:bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                {PERSONAL_INFO.email}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition-colors"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-zinc-950 bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 transition-all shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Compose</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Navigation Links & Phone Support */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800/80">
          <nav className="flex items-center flex-wrap gap-2 text-xs font-medium">
            <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 mr-2">
              Navigate:
            </span>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-900 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-cyan-500" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-zinc-400 dark:text-zinc-500">Direct Phone:</span>
            <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
              <Phone className="w-3.5 h-3.5 text-indigo-500" />
              <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                {PERSONAL_INFO.phone}
              </a>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="ml-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-0.5"
                title="Copy phone number"
              >
                {copiedPhone ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Legal Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-500 font-mono text-[11px]">
          <p>© {currentYear} {PERSONAL_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
              <span>BS Computer Engineering Graduate</span>
            </span>
            <span>•</span>
            <span className="text-zinc-600 dark:text-zinc-400">{PERSONAL_INFO.institution}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
