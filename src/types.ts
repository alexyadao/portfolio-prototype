export interface ProjectLifecyclePhase {
  phase: string;
  status: 'completed' | 'verified' | 'current';
  duration?: string;
  description: string;
  deliverables?: string[];
}

export interface CustomMetricAxis {
  label: string;
  shortLabel: string;
  value: number;
  color?: string;
  icon?: string;
}

export interface ProjectMetrics {
  backendIntensity: number; // 0 - 100
  systemComplexity: number; // 0 - 100
  performanceOptimization: number; // 0 - 100
  hardwareInterfacing?: number; // 0 - 100
  securityReliability?: number; // 0 - 100
  hardwareAxisLabel?: string;
  hardwareAxisShortLabel?: string;
  customAxes?: CustomMetricAxis[];
}

export interface ProjectDiagram {
  id: string;
  title: string;
  type: 'Architecture Diagram' | 'System Flowchart' | 'Circuit Schematic' | 'Data Topology';
  phase: string;
  description: string;
  keyElements: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  role?: string;
  category: 'backend' | 'embedded' | 'iot' | 'sysadmin' | string;
  details?: string;
  description?: string;
  about?: string;
  contributions?: string[];
  tags?: string[];
  technologies?: string[];
  highlights?: string[];
  techStack?: string[];
  liveDemoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  interactiveDemoId?: 'network-topology' | 'ic-tester' | 'iot-dashboard' | 'api-tester' | string;
  interactiveDemoTitle?: string;
  lifecycle?: ProjectLifecyclePhase[];
  metrics?: ProjectMetrics;
  diagrams?: ProjectDiagram[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
  iconType: 'os' | 'code' | 'database';
  description: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  description: string;
  category: 'internship' | 'certification' | 'leadership' | 'education';
}

export interface PersonalInfo {
  name: string;
  shortName: string;
  monogram: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  instagram?: string;
  status: string;
  institution: string;
}
