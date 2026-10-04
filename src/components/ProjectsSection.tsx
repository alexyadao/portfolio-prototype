import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import {
  FolderGit2,
  Database,
  Cpu,
  Radio,
  Server,
  ArrowUpRight,
  CheckCircle2,
  Tag,
  X,
  Filter,
  Search,
} from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  // Search query filter (searches through title, details, tags, and highlights)
  const [searchQuery, setSearchQuery] = useState<string>('');
  // Category filter: 'all' | 'backend' | 'sysadmin' | 'embedded' | 'iot'
  const [activeCategory, setActiveCategory] = useState<string>('all');
  // Specific tag filter (e.g., 'Backend', 'System Admin', 'Embedded', 'PostgreSQL', etc.)
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Core category definitions
  const categories = useMemo(() => [
    { id: 'all', label: 'All Projects', icon: FolderGit2 },
    { id: 'backend', label: 'Backend', icon: Database },
    { id: 'sysadmin', label: 'System Admin', icon: Server },
    { id: 'embedded', label: 'Embedded', icon: Cpu },
    { id: 'iot', label: 'IoT & Telemetry', icon: Radio },
  ], []);

  // Compute available tags across all projects
  const popularTags = useMemo(() => {
    return [
      'Backend',
      'System Admin',
      'Embedded',
      'IoT',
      'PostgreSQL',
      'Active Directory',
      'C++',
      'Supabase',
      'PowerShell',
    ];
  }, []);

  // Filter projects by search keyword, category, and/or tag
  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      // 1. Check search query match (title, details, role, tags, techStack, highlights)
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.details.toLowerCase().includes(query) ||
        project.role.toLowerCase().includes(query) ||
        project.tags.some((t) => t.toLowerCase().includes(query)) ||
        project.techStack.some((t) => t.toLowerCase().includes(query)) ||
        (project.highlights && project.highlights.some((h) => h.toLowerCase().includes(query)));

      // 2. Check category match
      const matchesCategory =
        activeCategory === 'all' ||
        project.category === activeCategory ||
        (activeCategory === 'sysadmin' && project.category === 'sysadmin');

      // 3. Check tag match if active
      const matchesTag = selectedTag
        ? project.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase()) ||
          project.techStack.some((t) => t.toLowerCase() === selectedTag.toLowerCase()) ||
          project.category.toLowerCase() === selectedTag.toLowerCase()
        : true;

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [projects, searchQuery, activeCategory, selectedTag]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'backend':
        return <Database className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />;
      case 'sysadmin':
        return <Server className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />;
      case 'embedded':
        return <Cpu className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />;
      case 'iot':
        return <Radio className="w-4 h-4 text-amber-500 dark:text-amber-400" />;
      default:
        return <FolderGit2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />;
    }
  };

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    if (selectedTag) {
      setSelectedTag(null);
    }
  };

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
      setActiveCategory('all');
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setSelectedTag(null);
  };

  return (
    <section id="projects" className="py-16 sm:py-20 scroll-mt-20 relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/50 border border-cyan-300 dark:border-cyan-800/50 text-cyan-700 dark:text-cyan-300 text-xs font-mono uppercase tracking-wider mb-2">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Engineering Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Featured Systems & Projects
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
              Software architectures, enterprise system administration, database systems, and embedded hardware implementations.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shrink-0">
            <span>Showing {filteredProjects.length} of {projects.length} Projects</span>
          </div>
        </motion.div>

        {/* Search & Filter Toolbar */}
        <div className="mb-8 space-y-3.5">
          {/* Top Row: Search Input Bar */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
              <Search className="w-4 h-4" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by title, description, or technology (e.g. PostgreSQL, ESP32, C++, Active Directory)..."
              className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 text-xs sm:text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all shadow-xs"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Main Category Filter Buttons */}
          <div className="flex items-center gap-1.5 bg-zinc-100/90 dark:bg-zinc-900/80 p-1.5 rounded-2xl border border-zinc-300/80 dark:border-zinc-800 backdrop-blur-md overflow-x-auto shadow-xs">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id && !selectedTag;
              const projectCount =
                cat.id === 'all'
                  ? projects.length
                  : projects.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    {projectCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Tag Filter Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3 text-cyan-500" />
              <span>Filter by tag:</span>
            </span>

            <div className="flex items-center gap-1.5 flex-wrap">
              {popularTags.map((tag) => {
                const isSelected = selectedTag?.toLowerCase() === tag.toLowerCase();
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-cyan-100 dark:bg-cyan-950/80 border-cyan-500 text-cyan-800 dark:text-cyan-200 font-semibold ring-1 ring-cyan-500/50 shadow-xs'
                        : 'bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    <Tag className="w-3 h-3 text-cyan-500/80" />
                    <span>{tag}</span>
                  </button>
                );
              })}

              {(activeCategory !== 'all' || selectedTag || searchQuery) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-zinc-200/60 dark:bg-zinc-800/60 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1 ml-1"
                >
                  <X className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Status & Search/Tag Feedback Banner */}
          {(selectedTag || searchQuery) && (
            <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 flex items-center justify-between text-xs text-cyan-800 dark:text-cyan-300 animate-in fade-in">
              <div className="flex items-center gap-2 flex-wrap">
                {searchQuery && (
                  <span className="flex items-center gap-1">
                    <Search className="w-3.5 h-3.5 text-cyan-500" />
                    <span>
                      Search: <strong className="font-mono text-zinc-900 dark:text-white">&quot;{searchQuery}&quot;</strong>
                    </span>
                  </span>
                )}

                {searchQuery && selectedTag && <span>•</span>}

                {selectedTag && (
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-cyan-500" />
                    <span>
                      Tag: <strong className="font-mono text-zinc-900 dark:text-white">&quot;{selectedTag}&quot;</strong>
                    </span>
                  </span>
                )}

                <span className="text-zinc-500 dark:text-zinc-400 font-mono">
                  ({filteredProjects.length} {filteredProjects.length === 1 ? 'match found' : 'matches found'})
                </span>
              </div>

              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-cyan-700 dark:text-cyan-300 hover:underline font-mono ml-2 shrink-0"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Spatial Grid Layout with Staggered Viewport Entrance */}
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                    transition: { duration: 0.25, ease: 'easeOut' },
                  }}
                  className="group relative bg-white/90 dark:bg-zinc-900/60 hover:bg-white dark:hover:bg-zinc-900/95 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-cyan-500/50 dark:hover:border-cyan-400/50 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xl shadow-lg shadow-zinc-200/50 dark:shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 dark:hover:shadow-cyan-500/15 dark:hover:shadow-black/70 transition-all duration-300"
                >
                  {/* Subtle Interactive Hover Ambient Glow */}
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-indigo-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-indigo-500/5 group-hover:to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div>
                    {/* Header with Category Icon & Role Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                          {getCategoryIcon(project.category)}
                        </div>
                        <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                          {project.category === 'sysadmin' ? 'SYSTEM ADMIN' : project.category.toUpperCase()}
                        </span>
                      </div>

                      <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/50">
                        {project.role}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors tracking-tight mb-2">
                      {project.title}
                    </h3>

                    {/* Exact Details Provided by User */}
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5 bg-zinc-50 dark:bg-zinc-950/40 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800/60">
                      {project.details}
                    </p>

                    {/* Key Architectural Highlights */}
                    {project.highlights && (
                      <div className="space-y-2 mb-5">
                        {project.highlights.slice(0, 2).map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Interactive Tech Stack Pills - Clickable to Filter */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-200 dark:border-zinc-800/80 mb-4">
                      {project.tags.map((tag) => {
                        const isTagActive = selectedTag?.toLowerCase() === tag.toLowerCase();
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleTagClick(tag)}
                            title={`Filter projects by ${tag}`}
                            className={`px-2 py-0.5 text-[11px] rounded font-mono border transition-all cursor-pointer ${
                              isTagActive
                                ? 'bg-cyan-100 dark:bg-cyan-950 border-cyan-500 text-cyan-800 dark:text-cyan-200 font-bold'
                                : 'bg-zinc-100 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400'
                            }`}
                          >
                            #{tag}
                          </button>
                        );
                      })}
                    </div>

                    {/* Interactive Modal Inspection Trigger */}
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700/60 hover:border-cyan-500/50 transition-all group-hover:text-cyan-600 dark:group-hover:text-cyan-300"
                    >
                      <span>Inspect System Architecture</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="p-12 text-center bg-white/60 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                {searchQuery
                  ? `No projects matching "${searchQuery}"`
                  : 'No projects found matching the selected filter'}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-md mx-auto">
                Try searching for technologies like &quot;PostgreSQL&quot;, &quot;ESP32&quot;, &quot;Active Directory&quot;, or &quot;C++&quot;, or clear your filters to view all systems.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-md transition-all active:scale-95"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
