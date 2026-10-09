import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import {
  Code2,
  Terminal,
  FolderGit2,
  Cpu,
  Milestone,
  Mail,
  Menu,
  X,
  Linkedin,
  Sun,
  Moon,
} from 'lucide-react';

interface NavbarProps {
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects', icon: FolderGit2 },
    { name: 'Skills', href: '#skills', icon: Cpu },
    { name: 'Journey', href: '#journey', icon: Milestone },
    { name: 'CLI Terminal', href: '#terminal', icon: Terminal, action: onOpenTerminal },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80 py-3 shadow-lg shadow-zinc-200/40 dark:shadow-black/60'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Spatial Brand Identity */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-indigo-500/30 to-violet-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 flex items-center justify-center font-bold text-sm shadow-inner group-hover:border-cyan-400/60 transition-all duration-300">
              {PERSONAL_INFO.monogram}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-zinc-950" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors tracking-tight">
              {PERSONAL_INFO.name}
            </span>
          </div>
        </a>

        {/* Spatial Floating Nav Capsule */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-100/90 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/80 px-3 py-1.5 rounded-full backdrop-blur-lg shadow-sm dark:shadow-lg dark:shadow-black/40">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={link.action}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200/70 dark:hover:bg-zinc-800/70 rounded-full transition-all"
              >
                <Icon className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-400" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Action Widgets */}
        <div className="hidden sm:flex items-center gap-2">
          {/* High-End Theme Toggle Switch */}
          <button
            type="button"
            onClick={toggleTheme}
            className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-300/80 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all text-zinc-700 dark:text-zinc-300"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <motion.div
                initial={false}
                animate={{
                  scale: theme === 'dark' ? 1 : 0,
                  rotate: theme === 'dark' ? 0 : 90,
                  opacity: theme === 'dark' ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Moon className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
              </motion.div>
              <motion.div
                initial={false}
                animate={{
                  scale: theme === 'light' ? 1 : 0,
                  rotate: theme === 'light' ? 0 : -90,
                  opacity: theme === 'light' ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
              </motion.div>
            </div>
            <span className="font-mono text-[11px] capitalize hidden lg:inline">
              {theme}
            </span>
          </button>

          {/* Original CV / Resume Button */}
          <a
            href="/Alexander_Yadao_CV.pdf"
            download="Alexander_Yadao_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900/70 border border-zinc-300/80 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 hover:text-zinc-950 dark:hover:text-white transition-all inline-block"
            title="Download official CV"
          >
            CV / Resume
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900/70 border border-zinc-300/80 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-950 bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Mail className="w-3.5 h-3.5 fill-current" />
            <span>Get in Touch</span>
          </a>
        </div>

        {/* Mobile controls: Theme toggle + Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Moon className="w-4 h-4 text-cyan-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
          </button>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-zinc-950/95 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 mt-2 backdrop-blur-xl space-y-1 shadow-xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  if (link.action) link.action();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg"
              >
                <Icon className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                <span>{link.name}</span>
              </a>
            );
          })}
          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
            <a
              href="/Alexander_Yadao_CV.pdf"
              download="Alexander_Yadao_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 block"
            >
              CV / Resume
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-zinc-950 bg-gradient-to-r from-cyan-400 to-indigo-400 rounded-lg"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Alexander</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
