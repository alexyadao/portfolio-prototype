import { useState } from 'react';
import { Project } from './types';
import { PROJECTS } from './data/portfolioData';
import { ThemeProvider } from './context/ThemeContext';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { DraftBanner } from './components/DraftBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SectionDivider } from './components/SectionDivider';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  const handleOpenTerminal = () => {
    const el = document.getElementById('terminal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans selection:bg-indigo-500/20 selection:text-indigo-800 dark:selection:bg-indigo-500/30 dark:selection:text-indigo-200 transition-colors duration-300">
        {/* Animated Horizontal Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Spatial Prototype Status Header */}
        <DraftBanner />

        {/* Sticky navigation with Theme Toggle */}
        <Navbar
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenTerminal={handleOpenTerminal}
        />

        <main>
          {/* Hero with Alexander's profile & telemetry */}
          <Hero
            onOpenTerminal={handleOpenTerminal}
            onOpenResume={() => setIsResumeOpen(true)}
          />

          {/* Animated Section Divider: Hero -> Projects */}
          <SectionDivider variant="cyan" label="Featured Systems" />

          {/* Filterable projects showcase */}
          <ProjectsSection
            projects={PROJECTS}
            onSelectProject={(project) => setSelectedProject(project)}
          />

          {/* Animated Section Divider: Projects -> Skills */}
          <SectionDivider variant="indigo" label="Technical Competencies" />

          {/* Interactive skills & tech matrix */}
          <SkillsSection />

          {/* Animated Section Divider: Skills -> Experience */}
          <SectionDivider variant="emerald" label="Milestones & Timeline" />

          {/* Career trajectory & chronological milestones */}
          <ExperienceSection />

          {/* Animated Section Divider: Experience -> Terminal */}
          <SectionDivider variant="violet" label="Developer CLI Sandbox" />

          {/* Embedded Interactive Developer CLI with typing animation */}
          <InteractiveTerminal />

          {/* Animated Section Divider: Terminal -> Contact */}
          <SectionDivider variant="cyan" label="Connect & Collaborate" />

          {/* Contact info, direct email copy & form */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Scroll to Top Action Button */}
        <ScrollToTop />

        {/* Deep-dive Case Study / Project Architecture Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        {/* Resume / CV Modal */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}
