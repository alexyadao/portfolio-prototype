import React, { useState, useMemo } from 'react';
import { Project, ProjectLifecyclePhase, ProjectMetrics } from '../types';
import { TechStackRadarChart } from './TechStackRadarChart';
import { ProjectDiagramGallery } from './ProjectDiagramGallery';
import { ProjectHeaderIllustration } from './ProjectHeaderIllustration';
import {
  X,
  Layers,
  CheckCircle,
  Code2,
  Clock,
  BookOpen,
  Download,
  Copy,
  Check,
  FileText,
  ChevronDown,
  ChevronUp,
  GitCommit,
  Compass,
  Rocket,
  Milestone,
  Workflow,
  Sparkles,
  ExternalLink,
  Network,
  Cpu,
  Radio,
  Terminal,
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenNetworkTopology?: () => void;
  onOpenICTester?: () => void;
  onOpenIoTDashboard?: () => void;
  onOpenApiTester?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenNetworkTopology,
  onOpenICTester,
  onOpenIoTDashboard,
  onOpenApiTester,
}) => {
  // Toggle between 'specs' (Specifications & Blueprint) and 'gallery' (Visual Diagrams & Flowcharts)
  const [activeTab, setActiveTab] = useState<'specs' | 'gallery'>('specs');
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false);

  const diagramCount = project?.diagrams?.length || 3;

  // Metrics for radar chart with intelligent defaults based on category
  const projectMetrics: ProjectMetrics = useMemo(() => {
    if (!project) {
      return {
        backendIntensity: 85,
        systemComplexity: 85,
        performanceOptimization: 90,
        hardwareInterfacing: 50,
        securityReliability: 90,
      };
    }

    if (project.metrics) {
      return project.metrics;
    }

    // Default heuristics based on project category
    if (project.category === 'backend') {
      return {
        backendIntensity: 95,
        systemComplexity: 86,
        performanceOptimization: 88,
        hardwareInterfacing: 25,
        securityReliability: 94,
      };
    }
    if (project.category === 'embedded') {
      return {
        backendIntensity: 35,
        systemComplexity: 92,
        performanceOptimization: 96,
        hardwareInterfacing: 98,
        securityReliability: 88,
      };
    }
    if (project.category === 'iot') {
      return {
        backendIntensity: 55,
        systemComplexity: 94,
        performanceOptimization: 95,
        hardwareInterfacing: 96,
        securityReliability: 90,
      };
    }
    return {
      backendIntensity: 80,
      systemComplexity: 90,
      performanceOptimization: 84,
      hardwareInterfacing: 70,
      securityReliability: 96,
    };
  }, [project]);

  // Fallback lifecycle phases in case a project doesn't have custom ones
  const lifecyclePhases: ProjectLifecyclePhase[] = useMemo(() => {
    if (!project) return [];
    if (project.lifecycle && project.lifecycle.length > 0) {
      return project.lifecycle;
    }
    return [
      {
        phase: '1. Architecture & Specification Design',
        status: 'completed',
        duration: 'Design Phase',
        description: 'System requirement analysis, architectural diagramming, data schemas, and interface protocol specification.',
        deliverables: ['System Architecture', 'Data Model', 'Interface Spec'],
      },
      {
        phase: '2. Core Engineering & Development',
        status: 'completed',
        duration: 'Development Phase',
        description: 'Implementation of application logic, database integrations, backend APIs, and hardware circuit interfacing.',
        deliverables: ['Source Code', 'Unit Tests', 'API Endpoints'],
      },
      {
        phase: '3. Verification & Deployment',
        status: 'verified',
        duration: 'Deployment Phase',
        description: 'Quality assurance testing, security audits, benchmarking, and production environment provisioning.',
        deliverables: ['Audit Report', 'Benchmarking Log', 'Production Release'],
      },
    ];
  }, [project]);

  // Calculate reading time based on project description, highlights, and lifecycle phases
  const { readingTimeText, wordCount } = useMemo(() => {
    if (!project) return { readingTimeText: '1 min read', wordCount: 0 };

    const lifecycleTexts = lifecyclePhases.map(
      (p) => `${p.phase} ${p.description} ${(p.deliverables || []).join(' ')}`
    );

    const textToAnalyze = [
      project.details,
      ...(project.highlights || []),
      ...(project.techStack || []),
      ...lifecycleTexts,
    ].join(' ');

    const words = textToAnalyze.trim().split(/\s+/).filter(Boolean).length;
    // Standard reading speed: ~200 words per minute
    const minutes = Math.ceil(words / 200);
    const seconds = Math.round((words / 200) * 60);

    const timeString = seconds < 50 ? `${seconds} sec read` : `${minutes} min read`;
    return {
      readingTimeText: timeString,
      wordCount: words,
    };
  }, [project, lifecyclePhases]);

  // Formatted Markdown representation of the project summary
  const markdownContent = useMemo(() => {
    if (!project) return '';

    const highlightsFormatted =
      project.highlights && project.highlights.length > 0
        ? project.highlights.map((h) => `- ${h}`).join('\n')
        : '- Core system implementation and integration.';

    const techFormatted =
      project.techStack && project.techStack.length > 0
        ? project.techStack.map((t) => `- \`${t}\``).join('\n')
        : '- Technical stack documented.';

    const lifecycleFormatted = lifecyclePhases
      .map(
        (phase) =>
          `### ${phase.phase} (${phase.duration || 'Milestone'})\n- **Status:** ${phase.status.toUpperCase()}\n- **Scope:** ${phase.description}\n- **Deliverables:** ${(phase.deliverables || []).join(', ')}`
      )
      .join('\n\n');

    return `# ${project.title}

> **Engineer:** Alexander Christian R. Yadao
> **Role:** ${project.role}
> **Category:** ${project.category.toUpperCase()}
> **Institution:** Polytechnic University of the Philippines (BS Computer Engineering)
> **Contact:** yadaoalexchris@gmail.com | 0935-300-1034

---

## 1. Project Scope & Architecture Details
${project.about || project.details}
${
  project.contributions && project.contributions.length > 0
    ? `\n### Individual Contributions (Academic Engineering Team)\n${project.contributions
        .map((c) => `- ${c}`)
        .join('\n')}\n`
    : ''
}
## 2. Tech Stack Radar & Key Architectural Metrics
${
  projectMetrics.customAxes && projectMetrics.customAxes.length > 0
    ? projectMetrics.customAxes.map((a) => `- **${a.label}:** ${a.value}%`).join('\n')
    : `- **Backend Intensity:** ${projectMetrics.backendIntensity}%
- **System Complexity:** ${projectMetrics.systemComplexity}%
- **Performance Optimization:** ${projectMetrics.performanceOptimization}%
- **${projectMetrics.hardwareAxisLabel || 'Hardware & Embedded'}:** ${projectMetrics.hardwareInterfacing ?? 50}%
- **Security & Reliability:** ${projectMetrics.securityReliability ?? 85}%`
}

## 3. Chronological Development Lifecycle
${lifecycleFormatted}

## 4. Key Technical Highlights
${highlightsFormatted}

## 5. Technology Stack & Competencies Applied
${techFormatted}

---
*Exported from Alexander Christian R. Yadao Engineering Portfolio*
`;
  }, [project, lifecyclePhases, projectMetrics]);

  // Trigger browser markdown file download
  const handleDownloadMarkdown = () => {
    if (!project) return;
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeFilename = `${project.id || 'project'}-summary.md`;
    link.setAttribute('download', safeFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2500);
  };

  // Copy raw markdown snippet to clipboard
  const handleCopySnippet = () => {
    if (!project) return;
    navigator.clipboard.writeText(markdownContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const getPhaseIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Compass className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />;
      case 1:
        return <Code2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />;
      case 2:
      default:
        return <Rocket className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />;
    }
  };

  const getPhaseBadgeColor = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-cyan-100 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800/60';
      case 1:
        return 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800/60';
      case 2:
      default:
        return 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60';
    }
  };

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 dark:bg-zinc-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${
          activeTab === 'gallery' ? 'max-w-4xl' : 'max-w-2xl'
        } bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden text-zinc-900 dark:text-zinc-100 max-h-[92vh] flex flex-col transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-zinc-100 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider hidden sm:inline">
              Architecture &amp; System Blueprint
            </span>
            <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider sm:hidden">
              System Blueprint
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Top Bar Quick Reading Time Pill */}
            {activeTab === 'specs' && (
              <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-200/60 dark:bg-zinc-800/60 px-2.5 py-1 rounded-md border border-zinc-300/80 dark:border-zinc-700/60">
                <Clock className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                <span>{readingTimeText}</span>
              </span>
            )}

            {/* Quick Download Button in Top Bar */}
            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:border-cyan-500 text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors shadow-xs"
              title="Download Markdown summary (.md)"
            >
              {isDownloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Downloaded</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Export .md</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              title="Close modal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Secondary Navigation Tab Switcher */}
        <div className="bg-zinc-50/90 dark:bg-zinc-950/60 px-4 sm:px-6 pt-3 pb-2 border-b border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 p-1 bg-zinc-200/70 dark:bg-zinc-900 rounded-xl border border-zinc-300/60 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'specs'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-cyan-500" />
              <span>Specifications &amp; Lifecycle</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'gallery'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-xs font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>Diagrams &amp; Flow Charts</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  activeTab === 'gallery'
                    ? 'bg-white/20 text-white'
                    : 'bg-zinc-300/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {diagramCount}
              </span>
            </button>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
            <Sparkles className="w-3 h-3 text-cyan-500" />
            <span>Interactive System Inspect</span>
          </span>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Visual Header Illustration */}
          <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <ProjectHeaderIllustration projectId={project.id} />
          </div>

          {/* Header Bar */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-100 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800/60">
                  <span>Role: {project.role}</span>
                </div>

                {/* Reading time estimate badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700">
                  <Clock className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                  <span>{readingTimeText}</span>
                  <span className="text-zinc-400 dark:text-zinc-500 text-[10px]">
                    ({wordCount} words)
                  </span>
                </div>
              </div>

              {(project.liveUrl || project.liveDemoUrl) && (
                <a
                  href={project.liveUrl || project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all hover:scale-105"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.interactiveDemoId === 'network-topology' && onOpenNetworkTopology && (
                <button
                  type="button"
                  onClick={() => onOpenNetworkTopology()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-blue-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all hover:scale-105 cursor-pointer"
                >
                  <Network className="w-3.5 h-3.5" />
                  <span>Launch Network Map</span>
                </button>
              )}

              {project.interactiveDemoId === 'ic-tester' && onOpenICTester && (
                <button
                  type="button"
                  onClick={() => onOpenICTester()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-400 hover:via-teal-500 hover:to-cyan-500 shadow-md shadow-emerald-500/20 transition-all hover:scale-105 cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Run Hardware Simulator</span>
                </button>
              )}

              {project.interactiveDemoId === 'iot-dashboard' && onOpenIoTDashboard && (
                <button
                  type="button"
                  onClick={() => onOpenIoTDashboard()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-amber-500 via-teal-600 to-cyan-600 hover:from-amber-400 hover:via-teal-500 hover:to-cyan-500 shadow-md shadow-teal-500/20 transition-all hover:scale-105 cursor-pointer"
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Open IoT Dashboard</span>
                </button>
              )}

              {project.interactiveDemoId === 'api-tester' && onOpenApiTester && (
                <button
                  type="button"
                  onClick={() => onOpenApiTester()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-500 shadow-md shadow-indigo-500/20 transition-all hover:scale-105 cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Test API Endpoints</span>
                </button>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {project.title}
            </h2>
          </div>

          {/* Conditional View: Diagram Gallery vs Specifications */}
          {activeTab === 'gallery' ? (
            <div className="animate-in fade-in duration-300">
              <ProjectDiagramGallery project={project} />
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Clean Two-Column Layout (About & Contributions on Left, Links/Role/Tech on Right) */}
              {project.contributions && project.contributions.length > 0 ? (
                <div className="bg-zinc-50/70 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5 sm:p-6 shadow-xs">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
                    {/* Left Column (About & Contributions) */}
                    <div className="md:col-span-7 space-y-6">
                      {/* About Section */}
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-cyan-500" />
                          <span>About</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                          {project.description || project.about || project.details}
                        </p>
                      </div>

                      {/* Contributions Section */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            <span>Contributions</span>
                          </h3>
                          <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-200 dark:border-cyan-800/60">
                            Academic Engineering Team
                          </span>
                        </div>

                        <ul className="space-y-2.5">
                          {project.contributions.map((contribution, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-zinc-800 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed transition-all hover:border-cyan-500/40"
                            >
                              <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 mt-1.5 shrink-0 ring-4 ring-cyan-500/20" />
                              <span>{contribution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column (Links, Role, & Technologies) */}
                    <div className="md:col-span-5 space-y-6 md:border-l md:border-zinc-200 dark:md:border-zinc-800 md:pl-6">
                      {/* Links Section (Only rendered if liveUrl, liveDemoUrl, or githubUrl exists; completely removed if none) */}
                      {(project.liveUrl || project.liveDemoUrl || project.githubUrl) && (
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2.5 flex items-center gap-1.5">
                            <ExternalLink className="w-3.5 h-3.5 text-cyan-500" />
                            <span>Links</span>
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {(project.liveUrl || project.liveDemoUrl) && (
                              <a
                                href={project.liveUrl || project.liveDemoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 transition-all shadow-xs"
                              >
                                <span>Live App</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 transition-all"
                              >
                                <span>GitHub Repository</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Role Section */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-cyan-500" />
                          <span>Role</span>
                        </h3>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-cyan-50 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800/80 shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                          <span>{project.subtitle || project.role}</span>
                        </div>
                      </div>

                      {/* Technologies Section */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2.5 flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Technologies</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {(project.technologies || project.techStack || project.tags || []).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200 hover:border-cyan-500/50 transition-colors shadow-2xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Hardware Simulator Launcher Button */}
                      {project.interactiveDemoId === 'ic-tester' && onOpenICTester && (
                        <div className="pt-2 border-t border-zinc-200/80 dark:border-zinc-800">
                          <button
                            type="button"
                            onClick={() => onOpenICTester()}
                            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-400 hover:via-teal-500 hover:to-cyan-500 shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.01] cursor-pointer"
                          >
                            <Cpu className="w-4 h-4" />
                            <span>Launch Interactive IC Tester Simulator</span>
                          </button>
                        </div>
                      )}

                      {/* Interactive IoT Telemetry Dashboard Launcher Button */}
                      {project.interactiveDemoId === 'iot-dashboard' && onOpenIoTDashboard && (
                        <div className="pt-2 border-t border-zinc-200/80 dark:border-zinc-800">
                          <button
                            type="button"
                            onClick={() => onOpenIoTDashboard()}
                            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-amber-500 via-teal-600 to-cyan-600 hover:from-amber-400 hover:via-teal-500 hover:to-cyan-500 shadow-md shadow-teal-500/20 transition-all hover:scale-[1.01] cursor-pointer"
                          >
                            <Radio className="w-4 h-4" />
                            <span>Launch Live Arduino IoT Dashboard</span>
                          </button>
                        </div>
                      )}

                      {/* Interactive API Testing Suite Launcher Button */}
                      {project.interactiveDemoId === 'api-tester' && onOpenApiTester && (
                        <div className="pt-2 border-t border-zinc-200/80 dark:border-zinc-800">
                          <button
                            type="button"
                            onClick={() => onOpenApiTester()}
                            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-500 shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.01] cursor-pointer"
                          >
                            <Terminal className="w-4 h-4" />
                            <span>Launch Interactive API Testing Suite</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Fallback standard Project Details Section */
                <div className="bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Project Scope &amp; Implementation Details</span>
                    </h3>

                    <button
                      type="button"
                      onClick={() => setActiveTab('gallery')}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline bg-cyan-50 dark:bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-200/80 dark:border-cyan-800/50"
                    >
                      <Workflow className="w-3 h-3" />
                      <span>View Diagrams ({diagramCount})</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {project.details}
                  </p>
                </div>
              )}

              {/* Tech Stack Radar Chart */}
              <TechStackRadarChart metrics={projectMetrics} />

              {/* Chronological Development Lifecycle Visual */}
              <div className="bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    <Milestone className="w-4 h-4 text-cyan-500" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                      Development Lifecycle &amp; Progression
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    Chronological Phases
                  </span>
                </div>

                {/* Lifecycle Phase Progression Steps */}
                <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-cyan-500 before:via-indigo-500 before:to-emerald-500">
                  {lifecyclePhases.map((phase, index) => (
                    <div key={index} className="relative group">
                      {/* Timeline Node */}
                      <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border-2 border-cyan-500 flex items-center justify-center shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      </div>

                      {/* Phase Content Box */}
                      <div className="bg-zinc-50/80 dark:bg-zinc-950/50 border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl p-3.5 transition-all group-hover:border-cyan-500/30">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            {getPhaseIcon(index)}
                            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                              {phase.phase}
                            </h4>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded-md border font-semibold ${getPhaseBadgeColor(
                                index
                              )}`}
                            >
                              {phase.duration || `Phase ${index + 1}`}
                            </span>

                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-1.5 py-0.5 rounded">
                              <Check className="w-2.5 h-2.5" />
                              <span>{phase.status === 'verified' ? 'Verified' : 'Completed'}</span>
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-2.5">
                          {phase.description}
                        </p>

                        {/* Key Deliverables Pills */}
                        {phase.deliverables && phase.deliverables.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-zinc-200/60 dark:border-zinc-800/60">
                            <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 mr-1 flex items-center gap-1">
                              <GitCommit className="w-3 h-3 text-cyan-500" />
                              Deliverables:
                            </span>
                            {phase.deliverables.map((item, dIdx) => (
                              <span
                                key={dIdx}
                                className="px-2 py-0.5 text-[10px] rounded font-mono bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Architectural Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-3 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span>Technical Highlights</span>
                  </h3>
                  <div className="space-y-2">
                    {project.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800/70 text-xs text-zinc-700 dark:text-zinc-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Matrix */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2.5 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span>Technologies &amp; Tools Applied</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-100 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Summary Export & Markdown Snippet Card */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/50 p-4 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-500" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                      Export Project Summary
                    </h4>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      Markdown / Plain Text
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowMarkdownPreview(!showMarkdownPreview)}
                    className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>{showMarkdownPreview ? 'Hide Snippet' : 'Preview Snippet'}</span>
                    {showMarkdownPreview ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                  Export an engineering brief formatted with system role, radar chart metrics, chronological development phases, and technology stack.
                </p>

                {/* Collapsible Markdown Snippet Preview */}
                {showMarkdownPreview && (
                  <div className="mb-3.5 relative">
                    <pre className="p-3 rounded-lg bg-zinc-900 text-zinc-200 font-mono text-[11px] overflow-x-auto max-h-48 border border-zinc-700 leading-relaxed select-all">
                      {markdownContent}
                    </pre>
                  </div>
                )}

                {/* Action Buttons for Download and Copy */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleDownloadMarkdown}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-md transition-all active:scale-95"
                  >
                    {isDownloaded ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Summary Downloaded!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 text-white" />
                        <span>Download Markdown (.md)</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCopySnippet}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition-all active:scale-95"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-zinc-500" />
                        <span>Copy Text Snippet</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-zinc-100 dark:bg-zinc-950/80 border-t border-zinc-200 dark:border-zinc-800 px-6 py-3 flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-2 font-mono">
            <span>Alexander Christian R. Yadao</span>
            <span>•</span>
            <span className="text-zinc-400 dark:text-zinc-600">{readingTimeText}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'specs' ? 'gallery' : 'specs')}
              className="text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
            >
              {activeTab === 'specs' ? `View Diagrams (${diagramCount})` : 'View Specs & Metrics'}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
