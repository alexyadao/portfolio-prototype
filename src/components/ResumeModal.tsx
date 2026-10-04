import React from 'react';
import { PERSONAL_INFO, JOURNEY_TIMELINE, SKILL_GROUPS, PROJECTS } from '../data/portfolioData';
import {
  X,
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Layers,
  Cpu,
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-zinc-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white text-zinc-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="bg-zinc-100 border-b border-zinc-200 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-700 font-mono">
              Curriculum Vitae Preview
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-200 text-zinc-600 font-mono hidden sm:inline">
              Mobile-Friendly View
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* HTML anchor tag that downloads the actual PDF file */}
            <a
              href="/Alexander_Yadao_CV.pdf"
              download="Alexander_Yadao_CV.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 transition-all shadow-xs"
              title="Download official CV as PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 transition-colors"
              title="Close modal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable / Mobile-Friendly Resume Content */}
        <div className="overflow-y-auto p-5 sm:p-8 md:p-10 space-y-6 text-sm font-sans divide-y divide-zinc-200/80">
          {/* Header */}
          <div className="space-y-2 pb-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-sm font-semibold text-cyan-700 font-mono">
              {PERSONAL_INFO.title}
            </p>

            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs text-zinc-600 pt-1 font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>{PERSONAL_INFO.email}</span>
              </span>
              <span className="hidden sm:inline text-zinc-300">•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>{PERSONAL_INFO.phone}</span>
              </span>
              <span className="hidden sm:inline text-zinc-300">•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>{PERSONAL_INFO.address}</span>
              </span>
              <span className="hidden sm:inline text-zinc-300">•</span>
              <span className="flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>linkedin.com/in/alexyadao</span>
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="pt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-mono mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
              <span>Professional Summary</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-zinc-700 leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Education */}
          <div className="pt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-mono mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>Education</span>
            </h2>
            <div className="space-y-2">
              <div className="bg-zinc-50 p-3 sm:p-4 rounded-xl border border-zinc-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <span className="font-bold text-xs sm:text-sm text-zinc-900">
                    Polytechnic University of the Philippines (PUP)
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">2022 - 2026</span>
                </div>
                <p className="text-xs text-zinc-700 font-medium italic mt-0.5">
                  Bachelor of Science in Computer Engineering (BSCpE)
                </p>
                <p className="text-[11px] text-zinc-600 mt-1 leading-relaxed">
                  Focus: Backend Infrastructure, Operating Systems &amp; Active Directory, Embedded Microcontrollers (ESP32), Relational Databases (PostgreSQL / MySQL / Supabase).
                </p>
              </div>
            </div>
          </div>

          {/* Experience & Practical Training */}
          <div className="pt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-mono mb-3 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Experience &amp; Certifications</span>
            </h2>
            <div className="space-y-3">
              {JOURNEY_TIMELINE.map((item) => (
                <div key={item.id} className="bg-zinc-50 p-3 sm:p-3.5 rounded-xl border border-zinc-200 text-xs">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5">
                    <span className="font-bold text-zinc-900">{item.role}</span>
                    <span className="text-[11px] font-mono text-zinc-500">{item.period}</span>
                  </div>
                  <p className="text-zinc-700 font-medium text-[11px] mt-0.5">{item.organization}</p>
                  <p className="text-zinc-600 text-[11px] mt-1 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Engineering Projects */}
          <div className="pt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-mono mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
              <span>Key Engineering Projects</span>
            </h2>
            <div className="space-y-3">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="bg-zinc-50 p-3 sm:p-3.5 rounded-xl border border-zinc-200 text-xs">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                    <span className="font-bold text-zinc-900">{proj.title}</span>
                    <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-white text-zinc-600 border border-zinc-200 w-fit">
                      {proj.role}
                    </span>
                  </div>
                  <p className="text-zinc-600 text-[11px] mt-1 leading-relaxed">{proj.details}</p>
                  <p className="text-[10px] font-mono text-cyan-700 mt-1.5">
                    Tech Stack: {proj.techStack.join(' • ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Core Competencies */}
          <div className="pt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-mono mb-3 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>Technical Core Competencies</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {SKILL_GROUPS.map((grp) => (
                <div key={grp.category} className="bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                  <span className="font-bold text-zinc-900 block text-[11px] mb-1 font-mono">
                    {grp.category}
                  </span>
                  <p className="text-[11px] text-zinc-600 leading-relaxed">
                    {grp.skills.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info note */}
        <div className="bg-zinc-50 border-t border-zinc-200 px-4 sm:px-6 py-2.5 text-center text-[11px] font-mono text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-1 shrink-0">
          <span>Alexander Christian R. Yadao • Engineering CV</span>
          <span>Polytechnic University of the Philippines</span>
        </div>
      </div>
    </div>
  );
};
