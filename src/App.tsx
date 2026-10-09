import { useState } from 'react';
import { Project } from './types';
import { PROJECTS } from './data/portfolioData';
import { ThemeProvider } from './context/ThemeContext';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { AmbientBackground } from './components/AmbientBackground';
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
import { NetworkTopologyModal } from './components/NetworkTopologyModal';
import { ICTesterModal } from './components/ICTesterModal';
import { IoTDashboardModal } from './components/IoTDashboardModal';
import { ApiTesterModal } from './components/ApiTesterModal';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isNetworkTopologyOpen, setIsNetworkTopologyOpen] = useState(false);
  const [isICTesterOpen, setIsICTesterOpen] = useState(false);
  const [isIoTDashboardOpen, setIsIoTDashboardOpen] = useState(false);
  const [isApiTesterOpen, setIsApiTesterOpen] = useState(false);

  const handleOpenTerminal = () => {
    const el = document.getElementById('terminal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <div className="relative overflow-x-hidden w-full min-h-screen bg-transparent text-zinc-900 dark:text-zinc-100 font-sans selection:bg-indigo-500/20 selection:text-indigo-800 dark:selection:bg-indigo-500/30 dark:selection:text-indigo-200 transition-colors duration-300">
        {/* Premium ambient animated aurora background with telemetry grid */}
        <AmbientBackground />

        {/* Animated Horizontal Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Sticky navigation with Theme Toggle */}
        <Navbar onOpenTerminal={handleOpenTerminal} />

        <main>
          {/* Hero with Alexander's profile & telemetry */}
          <Hero onOpenTerminal={handleOpenTerminal} />

          {/* Animated Section Divider: Hero -> Projects */}
          <SectionDivider variant="cyan" label="Featured Systems" />

          {/* Filterable projects showcase */}
          <ProjectsSection
            projects={PROJECTS}
            onSelectProject={(project) => setSelectedProject(project)}
            onOpenNetworkTopology={() => setIsNetworkTopologyOpen(true)}
            onOpenICTester={() => setIsICTesterOpen(true)}
            onOpenIoTDashboard={() => setIsIoTDashboardOpen(true)}
            onOpenApiTester={() => setIsApiTesterOpen(true)}
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
          onOpenNetworkTopology={() => setIsNetworkTopologyOpen(true)}
          onOpenICTester={() => setIsICTesterOpen(true)}
          onOpenIoTDashboard={() => setIsIoTDashboardOpen(true)}
          onOpenApiTester={() => setIsApiTesterOpen(true)}
        />

        {/* Interactive Network Topology & Active Directory IT Infrastructure Demo Modal */}
        <NetworkTopologyModal
          isOpen={isNetworkTopologyOpen}
          onClose={() => setIsNetworkTopologyOpen(false)}
        />

        {/* Interactive IC Tester Simulator Hardware Modal */}
        <ICTesterModal
          isOpen={isICTesterOpen}
          onClose={() => setIsICTesterOpen(false)}
        />

        {/* Interactive Arduino IoT Cloud Telemetry Dashboard Modal */}
        <IoTDashboardModal
          isOpen={isIoTDashboardOpen}
          onClose={() => setIsIoTDashboardOpen(false)}
        />

        {/* Interactive E-Commerce REST API Explorer Testing Modal */}
        <ApiTesterModal
          isOpen={isApiTesterOpen}
          onClose={() => setIsApiTesterOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}
