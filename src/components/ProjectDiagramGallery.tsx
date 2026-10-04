import React, { useState } from 'react';
import { Project, ProjectDiagram } from '../types';
import {
  Maximize2,
  Minimize2,
  Download,
  Check,
  ChevronLeft,
  ChevronRight,
  Layers,
  Workflow,
  Sparkles,
  Info,
  ShieldCheck,
  Cpu,
  Radio,
  Server,
  Database,
  ArrowRight,
} from 'lucide-react';

interface ProjectDiagramGalleryProps {
  project: Project;
}

export const ProjectDiagramGallery: React.FC<ProjectDiagramGalleryProps> = ({ project }) => {
  const diagrams: ProjectDiagram[] = project.diagrams || [
    {
      id: `${project.id}-default`,
      title: `${project.title} - Architecture Overview`,
      type: 'Architecture Diagram',
      phase: 'Design Phase',
      description: project.details,
      keyElements: project.techStack.slice(0, 4),
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedSvg, setCopiedSvg] = useState(false);

  const activeDiagram = diagrams[activeIndex] || diagrams[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % diagrams.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + diagrams.length) % diagrams.length);
  };

  const handleDownloadSvg = () => {
    const svgElement = document.getElementById(`diagram-svg-${activeDiagram.id}`);
    if (!svgElement) return;

    const serializer = new FileReader();
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeDiagram.id}-diagram.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2200);
  };

  // Render high-fidelity SVG diagram based on the active diagram ID
  const renderDiagramGraphic = (id: string) => {
    switch (id) {
      // 1. Campus Infrastructure App Diagrams
      case 'campus-erd':
        return (
          <svg
            id={`diagram-svg-${id}`}
            viewBox="0 0 800 480"
            className="w-full h-auto max-h-[440px] select-none"
          >
            <defs>
              <linearGradient id="erdGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="erdGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="erdGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.05" />
              </linearGradient>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#06b6d4" />
              </marker>
            </defs>

            {/* Grid Backdrop */}
            <rect width="800" height="480" fill="#090d16" rx="16" />
            <g opacity="0.15">
              {Array.from({ length: 16 }).map((_, i) => (
                <line key={`x-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="480" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <line key={`y-${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" />
              ))}
            </g>

            {/* Title & Tag */}
            <text x="30" y="40" fill="#f8fafc" fontSize="15" fontWeight="bold" fontFamily="monospace">
              SCHEMA::POSTGRESQL_RELATIONAL_MODEL
            </text>
            <rect x="630" y="24" width="140" height="24" rx="12" fill="#06b6d4" fillOpacity="0.2" stroke="#06b6d4" strokeWidth="1" />
            <text x="700" y="40" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              RLS ACTIVE (STRICT)
            </text>

            {/* Relationship Connectors */}
            {/* users -> facilities */}
            <path d="M 230 145 C 310 145, 310 200, 370 200" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#arrow)" />
            {/* facilities -> maintenance_tickets */}
            <path d="M 570 200 C 620 200, 620 290, 670 290" fill="none" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow)" />
            {/* users -> maintenance_tickets */}
            <path d="M 230 220 C 350 220, 390 310, 520 310" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#arrow)" />

            {/* Table 1: users (Auth & Roles) */}
            <g transform="translate(30, 80)">
              <rect width="200" height="185" rx="10" fill="url(#erdGrad1)" stroke="#06b6d4" strokeWidth="1.5" />
              <rect width="200" height="32" rx="10" fill="#0e7490" />
              <text x="12" y="21" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace">table: auth_users</text>
              <text x="160" y="21" fill="#a5f3fc" fontSize="10" fontFamily="monospace">PK: id</text>
              <g fontSize="11" fontFamily="monospace" fill="#e2e8f0" transform="translate(14, 48)">
                <text y="12" fill="#38bdf8">PK  id : uuid</text>
                <text y="32">    email : varchar(255)</text>
                <text y="52" fill="#facc15">FK  role_id : enum [admin, staff]</text>
                <text y="72">    full_name : text</text>
                <text y="92">    created_at : timestamptz</text>
                <text y="114" fill="#34d399">RLS: auth.uid() == id</text>
              </g>
            </g>

            {/* Table 2: campus_facilities */}
            <g transform="translate(370, 110)">
              <rect width="200" height="175" rx="10" fill="url(#erdGrad2)" stroke="#6366f1" strokeWidth="1.5" />
              <rect width="200" height="32" rx="10" fill="#4338ca" />
              <text x="12" y="21" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace">table: facilities</text>
              <text x="160" y="21" fill="#c7d2fe" fontSize="10" fontFamily="monospace">PK: id</text>
              <g fontSize="11" fontFamily="monospace" fill="#e2e8f0" transform="translate(14, 48)">
                <text y="12" fill="#818cf8">PK  id : serial</text>
                <text y="32">    code : varchar(32)</text>
                <text y="52">    building_name : text</text>
                <text y="72">    operational_status : status</text>
                <text y="92" fill="#facc15">FK  assigned_manager : uuid</text>
                <text y="112" fill="#34d399">RLS: READ ALL, WRITE ADMIN</text>
              </g>
            </g>

            {/* Table 3: maintenance_tickets */}
            <g transform="translate(520, 260)">
              <rect width="250" height="195" rx="10" fill="url(#erdGrad3)" stroke="#10b981" strokeWidth="1.5" />
              <rect width="250" height="32" rx="10" fill="#047857" />
              <text x="12" y="21" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace">table: maintenance_tickets</text>
              <g fontSize="11" fontFamily="monospace" fill="#e2e8f0" transform="translate(14, 48)">
                <text y="12" fill="#34d399">PK  ticket_id : uuid</text>
                <text y="30" fill="#facc15">FK  facility_id -&gt; facilities.id</text>
                <text y="50" fill="#facc15">FK  reported_by -&gt; auth_users.id</text>
                <text y="70">    urgency_level : priority</text>
                <text y="90">    resolution_status : enum</text>
                <text y="110">    logged_timestamp : timestamptz</text>
                <text y="130" fill="#38bdf8">RLS: CREATOR OR ADMIN ACCESS</text>
              </g>
            </g>

            {/* Security Shield Indicator */}
            <g transform="translate(30, 310)">
              <rect width="280" height="145" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="15" y="26" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">
                🔒 ROW-LEVEL SECURITY ENFORCEMENT
              </text>
              <text x="15" y="52" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                CREATE POLICY student_view ON facilities
              </text>
              <text x="15" y="70" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                FOR SELECT USING (auth.role() = 'student');
              </text>
              <text x="15" y="96" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                CREATE POLICY staff_manage ON tickets
              </text>
              <text x="15" y="114" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                FOR ALL USING (auth.uid() = assigned_staff);
              </text>
            </g>
          </svg>
        );

      case 'campus-gateway':
        return (
          <svg
            id={`diagram-svg-${id}`}
            viewBox="0 0 800 480"
            className="w-full h-auto max-h-[440px] select-none"
          >
            <defs>
              <linearGradient id="gateGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>

            <rect width="800" height="480" fill="#090d16" rx="16" />

            <text x="30" y="40" fill="#f8fafc" fontSize="15" fontWeight="bold" fontFamily="monospace">
              SYSTEM_PIPELINE::SUPABASE_API_GATEWAY
            </text>

            {/* TIER 1: Clients */}
            <g transform="translate(40, 100)">
              <rect width="180" height="320" rx="12" fill="#111827" stroke="#374151" strokeWidth="1" />
              <rect width="180" height="36" rx="12" fill="#1f2937" />
              <text x="90" y="24" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                TIER 1: CLIENT APPS
              </text>

              {/* Flutter App Card */}
              <g transform="translate(15, 60)">
                <rect width="150" height="90" rx="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.2" />
                <text x="15" y="25" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">Flutter Mobile</text>
                <text x="15" y="45" fill="#94a3b8" fontSize="10" fontFamily="monospace">iOS / Android Native</text>
                <text x="15" y="65" fill="#cbd5e1" fontSize="10" fontFamily="monospace">BaaS Dart SDK</text>
              </g>

              {/* React Web Portal */}
              <g transform="translate(15, 180)">
                <rect width="150" height="90" rx="8" fill="#1e293b" stroke="#6366f1" strokeWidth="1.2" />
                <text x="15" y="25" fill="#818cf8" fontSize="12" fontWeight="bold" fontFamily="monospace">React Web App</text>
                <text x="15" y="45" fill="#94a3b8" fontSize="10" fontFamily="monospace">Admin Portal</text>
                <text x="15" y="65" fill="#cbd5e1" fontSize="10" fontFamily="monospace">REST & WebSockets</text>
              </g>
            </g>

            {/* Connections: Tier 1 to Tier 2 */}
            <line x1="220" y1="205" x2="310" y2="205" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="6 3" />
            <polygon points="310,201 320,205 310,209" fill="#38bdf8" />
            <text x="265" y="195" fill="#38bdf8" fontSize="10" textAnchor="middle" fontFamily="monospace">JWT / HTTPS</text>

            {/* TIER 2: Gateway & Edge Functions */}
            <g transform="translate(320, 100)">
              <rect width="200" height="320" rx="12" fill="#111827" stroke="#374151" strokeWidth="1" />
              <rect width="200" height="36" rx="12" fill="#1f2937" />
              <text x="100" y="24" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                TIER 2: SUPABASE GATEWAY
              </text>

              {/* Auth Service */}
              <g transform="translate(15, 55)">
                <rect width="170" height="65" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.2" />
                <text x="12" y="22" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="monospace">GoTrue Auth (JWT)</text>
                <text x="12" y="42" fill="#94a3b8" fontSize="10" fontFamily="monospace">Token Verification</text>
              </g>

              {/* REST API & PostgREST */}
              <g transform="translate(15, 135)">
                <rect width="170" height="65" rx="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.2" />
                <text x="12" y="22" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">PostgREST Engine</text>
                <text x="12" y="42" fill="#94a3b8" fontSize="10" fontFamily="monospace">Auto-Generated Endpoints</text>
              </g>

              {/* Realtime Engine */}
              <g transform="translate(15, 215)">
                <rect width="170" height="65" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.2" />
                <text x="12" y="22" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">Realtime Broadcast</text>
                <text x="12" y="42" fill="#94a3b8" fontSize="10" fontFamily="monospace">WebSocket Event Stream</text>
              </g>
            </g>

            {/* Connections: Tier 2 to Tier 3 */}
            <line x1="520" y1="205" x2="600" y2="205" stroke="#6366f1" strokeWidth="2.5" strokeDasharray="6 3" />
            <polygon points="600,201 610,205 600,209" fill="#6366f1" />
            <text x="560" y="195" fill="#818cf8" fontSize="10" textAnchor="middle" fontFamily="monospace">SQL Pool</text>

            {/* TIER 3: PostgreSQL Database Core */}
            <g transform="translate(600, 100)">
              <rect width="160" height="320" rx="12" fill="#111827" stroke="#374151" strokeWidth="1" />
              <rect width="160" height="36" rx="12" fill="#1f2937" />
              <text x="80" y="24" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                TIER 3: DATABASE
              </text>

              <g transform="translate(15, 60)">
                <rect width="130" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.2" />
                <text x="15" y="25" fill="#60a5fa" fontSize="12" fontWeight="bold" fontFamily="monospace">PostgreSQL 15</text>
                <text x="15" y="50" fill="#94a3b8" fontSize="10" fontFamily="monospace">Relational Core</text>
                <text x="15" y="70" fill="#34d399" fontSize="10" fontFamily="monospace">RLS Security</text>
              </g>

              <g transform="translate(15, 180)">
                <rect width="130" height="100" rx="8" fill="#1e293b" stroke="#ec4899" strokeWidth="1.2" />
                <text x="15" y="25" fill="#f472b6" fontSize="11" fontWeight="bold" fontFamily="monospace">PgBouncer</text>
                <text x="15" y="50" fill="#94a3b8" fontSize="10" fontFamily="monospace">Connection Pool</text>
                <text x="15" y="70" fill="#94a3b8" fontSize="10" fontFamily="monospace">Transaction Mode</text>
              </g>
            </g>
          </svg>
        );

      case 'campus-sync-flow':
        return (
          <svg
            id={`diagram-svg-${id}`}
            viewBox="0 0 800 480"
            className="w-full h-auto max-h-[440px] select-none"
          >
            <rect width="800" height="480" fill="#090d16" rx="16" />
            <text x="30" y="40" fill="#f8fafc" fontSize="15" fontWeight="bold" fontFamily="monospace">
              EXECUTION_FLOW::REQUEST_AUTHENTICATION_PIPELINE
            </text>

            {/* Sequence Flow Nodes */}
            <g transform="translate(40, 90)">
              {/* Step 1 */}
              <rect x="0" y="0" width="130" height="75" rx="10" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />
              <text x="12" y="24" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">1. Inbound Req</text>
              <text x="12" y="46" fill="#94a3b8" fontSize="10" fontFamily="monospace">HTTP Authorization</text>
              <text x="12" y="60" fill="#cbd5e1" fontSize="9" fontFamily="monospace">Bearer &lt;JWT&gt;</text>

              {/* Arrow */}
              <line x1="130" y1="37" x2="180" y2="37" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
              <polygon points="180,33 190,37 180,41" fill="#38bdf8" />

              {/* Step 2: Validate JWT */}
              <rect x="190" y="0" width="140" height="75" rx="10" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="12" y="24" fill="#818cf8" fontSize="11" fontWeight="bold" fontFamily="monospace">2. Token Verify</text>
              <text x="12" y="46" fill="#94a3b8" fontSize="10" fontFamily="monospace">HMAC-SHA256 Sig</text>
              <text x="12" y="60" fill="#cbd5e1" fontSize="9" fontFamily="monospace">Extract claims.role</text>

              {/* Decision Diamond: Valid? */}
              <line x1="330" y1="37" x2="380" y2="37" stroke="#6366f1" strokeWidth="2" />
              <polygon points="380,33 390,37 380,41" fill="#6366f1" />

              {/* Step 3: RLS Evaluation */}
              <rect x="390" y="0" width="160" height="75" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="12" y="24" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">3. RLS Evaluator</text>
              <text x="12" y="46" fill="#94a3b8" fontSize="10" fontFamily="monospace">Applies WHERE clause</text>
              <text x="12" y="60" fill="#cbd5e1" fontSize="9" fontFamily="monospace">Filter user tenant_id</text>

              {/* Arrow */}
              <line x1="550" y1="37" x2="600" y2="37" stroke="#10b981" strokeWidth="2" />
              <polygon points="600,33 610,37 600,41" fill="#10b981" />

              {/* Step 4: Postgres Execution */}
              <rect x="610" y="0" width="140" height="75" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="12" y="24" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="monospace">4. SQL Execution</text>
              <text x="12" y="46" fill="#94a3b8" fontSize="10" fontFamily="monospace">Index Scan</text>
              <text x="12" y="60" fill="#cbd5e1" fontSize="9" fontFamily="monospace">Execution &lt; 8ms</text>
            </g>

            {/* Detailed Terminal Log output preview */}
            <g transform="translate(40, 210)">
              <rect width="720" height="220" rx="10" fill="#030712" stroke="#1f2937" strokeWidth="1.5" />
              <rect width="720" height="30" rx="10" fill="#111827" />
              <circle cx="20" cy="15" r="4.5" fill="#ef4444" />
              <circle cx="36" cy="15" r="4.5" fill="#eab308" />
              <circle cx="52" cy="15" r="4.5" fill="#22c55e" />
              <text x="75" y="19" fill="#9ca3af" fontSize="11" fontFamily="monospace">api_telemetry_trace.log</text>

              <g fill="#94a3b8" fontSize="11" fontFamily="monospace" transform="translate(20, 52)">
                <text y="14" fill="#38bdf8">[2026-09-25T21:14:02.102Z] INFO: INBOUND_REQUEST GET /rest/v1/facilities?select=*</text>
                <text y="36" fill="#a78bfa">[2026-09-25T21:14:02.105Z] AUTH: JWT Token verified for subject: pup_admin_4291</text>
                <text y="58" fill="#34d399">[2026-09-25T21:14:02.108Z] RLS: Appending policy: &quot;auth.role() = 'admin' OR visibility = 'public'&quot;</text>
                <text y="80" fill="#facc15">[2026-09-25T21:14:02.112Z] DB: Executing prepared statement stmt_facilities_idx (Cost: 0.15..8.25)</text>
                <text y="102" fill="#22c55e">[2026-09-25T21:14:02.116Z] RESPONSE: 200 OK (Payload: 24.6 KB, Total latency: 14ms)</text>
                <text y="124" fill="#64748b">[2026-09-25T21:14:02.117Z] CACHE: Cache-Control: max-age=60, s-maxage=300; Stored in Edge Store</text>
              </g>
            </g>
          </svg>
        );

      // 2. Sysadmin Infra Diagrams
      case 'ad-domain-topology':
        return (
          <svg
            id={`diagram-svg-${id}`}
            viewBox="0 0 800 480"
            className="w-full h-auto max-h-[440px] select-none"
          >
            <rect width="800" height="480" fill="#090d16" rx="16" />
            <text x="30" y="40" fill="#f8fafc" fontSize="15" fontWeight="bold" fontFamily="monospace">
              ENTERPRISE_TOPOLOGY::ACTIVE_DIRECTORY_OU_ARCHITECTURE
            </text>

            {/* Root Domain Controller */}
            <g transform="translate(280, 70)">
              <rect width="240" height="90" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="120" y="30" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                ROOT DC (DC01.pup.local)
              </text>
              <text x="120" y="52" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                Global Catalog | Kerberos KDC | DNS/DHCP
              </text>
              <text x="120" y="72" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                Subnet: 192.168.10.0/24
              </text>
            </g>

            {/* Tree Branch Lines */}
            <path d="M 400 160 L 400 200 M 150 200 L 650 200 M 150 200 L 150 240 M 400 200 L 400 240 M 650 200 L 650 240" fill="none" stroke="#10b981" strokeWidth="2" />

            {/* OU 1: Administrative Staff */}
            <g transform="translate(60, 240)">
              <rect width="180" height="180" rx="10" fill="#111827" stroke="#38bdf8" strokeWidth="1.5" />
              <rect width="180" height="30" rx="10" fill="#0369a1" />
              <text x="90" y="20" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                OU=Admin-Staff
              </text>
              <g fontSize="10" fontFamily="monospace" fill="#94a3b8" transform="translate(14, 45)">
                <text y="14" fill="#7dd3fc">• GPO: BitLocker Enforced</text>
                <text y="32">• GPO: MFA Authentication</text>
                <text y="50">• Restricted USB Storage</text>
                <text y="75" fill="#f8fafc">Workstations: 45 nodes</text>
                <text y="95" fill="#34d399">OS: Win 11 Enterprise</text>
              </g>
            </g>

            {/* OU 2: Faculty & Academics */}
            <g transform="translate(310, 240)">
              <rect width="180" height="180" rx="10" fill="#111827" stroke="#818cf8" strokeWidth="1.5" />
              <rect width="180" height="30" rx="10" fill="#4338ca" />
              <text x="90" y="20" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                OU=Faculty-Staff
              </text>
              <g fontSize="10" fontFamily="monospace" fill="#94a3b8" transform="translate(14, 45)">
                <text y="14" fill="#a5b4fc">• GPO: Roaming Profiles</text>
                <text y="32">• GPO: Intranet Mapped</text>
                <text y="50">• Academic Software Pool</text>
                <text y="75" fill="#f8fafc">Workstations: 120 nodes</text>
                <text y="95" fill="#34d399">OS: Win 10/11 Pro</text>
              </g>
            </g>

            {/* OU 3: Computer Engineering Labs */}
            <g transform="translate(560, 240)">
              <rect width="180" height="180" rx="10" fill="#111827" stroke="#f59e0b" strokeWidth="1.5" />
              <rect width="180" height="30" rx="10" fill="#b45309" />
              <text x="90" y="20" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                OU=CpE-Laboratories
              </text>
              <g fontSize="10" fontFamily="monospace" fill="#94a3b8" transform="translate(14, 45)">
                <text y="14" fill="#fcd34d">• GPO: DeepFreeze Sandbox</text>
                <text y="32">• GPO: Local Admin Lock</text>
                <text y="50">• Arduino IDE &amp; C++ Toolchains</text>
                <text y="75" fill="#f8fafc">Workstations: 80 nodes</text>
                <text y="95" fill="#34d399">OS: Windows 11 Education</text>
              </g>
            </g>
          </svg>
        );

      // 3. PMCT-001 Circuit Schematic & Firmware
      case 'pmct-circuit-schematic':
        return (
          <svg
            id={`diagram-svg-${id}`}
            viewBox="0 0 800 480"
            className="w-full h-auto max-h-[440px] select-none"
          >
            <rect width="800" height="480" fill="#090d16" rx="16" />
            <text x="30" y="40" fill="#f8fafc" fontSize="15" fontWeight="bold" fontFamily="monospace">
              HARDWARE_SCHEMATIC::PMCT-001_ESP32_MULTIMETER_CIRCUIT
            </text>

            {/* Central ESP32 Microcontroller */}
            <g transform="translate(280, 110)">
              <rect width="240" height="260" rx="12" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
              <rect width="240" height="34" rx="12" fill="#0891b2" />
              <text x="120" y="22" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                ESP32-WROOM-32D (Dual-Core)
              </text>

              {/* Pin Labels */}
              <g fontSize="10" fontFamily="monospace" fill="#94a3b8">
                {/* Left Pins */}
                <text x="15" y="65" fill="#38bdf8">GPIO34 (ADC1_CH6) &lt;-- V_DIV</text>
                <text x="15" y="95" fill="#38bdf8">GPIO35 (ADC1_CH7) &lt;-- SHUNT_I</text>
                <text x="15" y="125" fill="#a855f7">GPIO21 (I2C_SDA) &lt;--&gt; OLED</text>
                <text x="15" y="155" fill="#a855f7">GPIO22 (I2C_SCL) ---&gt; OLED</text>
                <text x="15" y="185" fill="#10b981">GPIO04 (BUZZER_PWM)</text>
                <text x="15" y="215" fill="#f59e0b">3V3_REG / GND</text>
              </g>
            </g>

            {/* Left Block: Signal Conditioning Voltage Divider */}
            <g transform="translate(40, 140)">
              <rect width="180" height="200" rx="10" fill="#111827" stroke="#3b82f6" strokeWidth="1.5" />
              <rect width="180" height="28" rx="10" fill="#1d4ed8" />
              <text x="90" y="19" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                VOLTAGE ATTENUATOR
              </text>
              <g fontSize="10" fontFamily="monospace" fill="#cbd5e1" transform="translate(15, 45)">
                <text y="14" fill="#93c5fd">Input: 0 - 30V DC</text>
                <text y="34">R1 = 100kΩ (0.1%)</text>
                <text y="54">R2 = 10kΩ (0.1%)</text>
                <text y="74">C_filter = 100nF</text>
                <text y="94" fill="#34d399">Attenuation: 11:1</text>
                <text y="114" fill="#f8fafc">Max ADC In: 2.72V</text>
              </g>
            </g>

            {/* Connection: Attenuator to GPIO34 */}
            <line x1="220" y1="170" x2="280" y2="170" stroke="#38bdf8" strokeWidth="2" />
            <polygon points="280,166 288,170 280,174" fill="#38bdf8" />

            {/* Right Block: SSD1306 128x64 I2C OLED */}
            <g transform="translate(580, 140)">
              <rect width="180" height="200" rx="10" fill="#111827" stroke="#8b5cf6" strokeWidth="1.5" />
              <rect width="180" height="28" rx="10" fill="#6d28d9" />
              <text x="90" y="19" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                SSD1306 0.96&quot; OLED
              </text>

              {/* Display simulation */}
              <rect x="20" y="45" width="140" height="80" rx="6" fill="#000000" stroke="#334155" strokeWidth="1" />
              <text x="30" y="70" fill="#06b6d4" fontSize="12" fontWeight="bold" fontFamily="monospace">V: 12.48 V</text>
              <text x="30" y="90" fill="#10b981" fontSize="12" fontWeight="bold" fontFamily="monospace">I: 0.842 A</text>
              <text x="30" y="110" fill="#fbbf24" fontSize="10" fontFamily="monospace">PWR: 10.51 W</text>

              <text x="20" y="150" fill="#94a3b8" fontSize="10" fontFamily="monospace">I2C Addr: 0x3C</text>
              <text x="20" y="170" fill="#94a3b8" fontSize="10" fontFamily="monospace">Refresh: 30 FPS</text>
            </g>

            {/* Connection: ESP32 to OLED */}
            <line x1="520" y1="230" x2="580" y2="230" stroke="#a855f7" strokeWidth="2" />
            <polygon points="580,226 588,230 580,234" fill="#a855f7" />
          </svg>
        );

      // 4. Solar IoT Telemetry
      case 'solar-telemetry-arch':
      default:
        return (
          <svg
            id={`diagram-svg-${id}`}
            viewBox="0 0 800 480"
            className="w-full h-auto max-h-[440px] select-none"
          >
            <rect width="800" height="480" fill="#090d16" rx="16" />
            <text x="30" y="40" fill="#f8fafc" fontSize="15" fontWeight="bold" fontFamily="monospace">
              SYSTEM_TOPOLOGY::SOLAR_POWERED_IOT_TELEMETRY_ARCHITECTURE
            </text>

            {/* Block 1: Solar Panel */}
            <g transform="translate(40, 110)">
              <rect width="160" height="150" rx="10" fill="#111827" stroke="#f59e0b" strokeWidth="1.5" />
              <rect width="160" height="30" rx="10" fill="#b45309" />
              <text x="80" y="20" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                SOLAR PV MODULE
              </text>
              <g fontSize="10" fontFamily="monospace" fill="#fde68a" transform="translate(15, 45)">
                <text y="14">Monocrystalline 20W</text>
                <text y="34">V_mp = 18.2V</text>
                <text y="54">I_mp = 1.10A</text>
                <text y="74" fill="#94a3b8">Efficiency: 21.4%</text>
              </g>
            </g>

            {/* Wire to MPPT */}
            <line x1="200" y1="185" x2="270" y2="185" stroke="#f59e0b" strokeWidth="3" />
            <polygon points="270,180 280,185 270,190" fill="#f59e0b" />
            <text x="235" y="175" fill="#f59e0b" fontSize="9" textAnchor="middle" fontFamily="monospace">18V DC</text>

            {/* Block 2: MPPT Charger & Battery */}
            <g transform="translate(280, 110)">
              <rect width="200" height="240" rx="10" fill="#111827" stroke="#10b981" strokeWidth="1.5" />
              <rect width="200" height="30" rx="10" fill="#047857" />
              <text x="100" y="20" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                POWER &amp; STORAGE UNIT
              </text>
              <g fontSize="10" fontFamily="monospace" fill="#94a3b8" transform="translate(15, 45)">
                <text y="14" fill="#34d399">CN3791 MPPT Controller</text>
                <text y="34">Buck DC-DC: 3.3V / 1.5A</text>
                <text y="54">Battery: LiFePO4 3.2V</text>
                <text y="74">Capacity: 6000 mAh</text>
                <text y="94" fill="#38bdf8">BMS Overvoltage Cutoff</text>
                <text y="114" fill="#38bdf8">Undervoltage Lockout (2.5V)</text>
              </g>
            </g>

            {/* Wire to Microcontroller */}
            <line x1="480" y1="185" x2="550" y2="185" stroke="#10b981" strokeWidth="3" />
            <polygon points="550,180 560,185 550,190" fill="#10b981" />
            <text x="515" y="175" fill="#34d399" fontSize="9" textAnchor="middle" fontFamily="monospace">3.3V LDO</text>

            {/* Block 3: MCU Telemetry Node */}
            <g transform="translate(560, 110)">
              <rect width="200" height="240" rx="10" fill="#111827" stroke="#06b6d4" strokeWidth="1.5" />
              <rect width="200" height="30" rx="10" fill="#0891b2" />
              <text x="100" y="20" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                TELEMETRY NODE
              </text>
              <g fontSize="10" fontFamily="monospace" fill="#94a3b8" transform="translate(15, 45)">
                <text y="14" fill="#38bdf8">Ultra-Low Power MCU</text>
                <text y="34">• Deep Sleep (15µA)</text>
                <text y="54">• RTC Periodic Wakeup</text>
                <text y="74">• Ambient Temp / Lux</text>
                <text y="94">• Voltage Divider Probe</text>
                <text y="114" fill="#a78bfa">• RF Transceiver (LoRa/FSK)</text>
                <text y="134" fill="#34d399">CRC-16 Verified Packets</text>
              </g>
            </g>

            {/* Wireless Beams */}
            <g transform="translate(660, 360)">
              <circle cx="0" cy="0" r="15" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="0" cy="0" r="30" fill="none" stroke="#06b6d4" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.6" />
              <circle cx="0" cy="0" r="45" fill="none" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="5 5" opacity="0.3" />
              <text x="0" y="4" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">RF</text>
            </g>
          </svg>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Bar with View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-100/90 dark:bg-zinc-950/70 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Workflow className="w-4 h-4 text-cyan-500" />
          <div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span>{activeDiagram.title}</span>
              <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/70 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800/60">
                {activeDiagram.type}
              </span>
            </h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              {activeDiagram.phase} • Diagram {activeIndex + 1} of {diagrams.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Download Diagram SVG */}
          <button
            type="button"
            onClick={handleDownloadSvg}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-cyan-500 text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors shadow-xs"
            title="Download SVG Diagram"
          >
            {copiedSvg ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Downloaded</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-cyan-500" />
                <span>Export SVG</span>
              </>
            )}
          </button>

          {/* Fullscreen Expand Trigger */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-cyan-500 text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors shadow-xs"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-cyan-500" />
                <span>Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-cyan-500" />
                <span>Expand</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Diagram Stage Viewport */}
      <div
        className={`relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-[#090d16] p-2 sm:p-4 shadow-xl flex items-center justify-center transition-all ${
          isFullscreen
            ? 'fixed inset-4 z-[9999] bg-[#090d16]/95 backdrop-blur-2xl p-6 sm:p-10 flex flex-col justify-between'
            : 'min-h-[320px]'
        }`}
      >
        {/* Fullscreen Close / Exit Action */}
        {isFullscreen && (
          <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-zinc-800 text-zinc-300">
            <span className="text-xs font-mono font-bold text-cyan-400">
              {activeDiagram.title} (FULLSCREEN INSPECT MODE)
            </span>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* The Graphic */}
        <div className="w-full max-w-4xl flex items-center justify-center">
          {renderDiagramGraphic(activeDiagram.id)}
        </div>

        {/* Navigation Floating Arrows */}
        {diagrams.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 backdrop-blur-md shadow-lg transition-transform active:scale-90"
              title="Previous Diagram"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 backdrop-blur-md shadow-lg transition-transform active:scale-90"
              title="Next Diagram"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Diagram Architectural Metadata & Observations */}
      <div className="bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
        <div className="flex items-start gap-2.5 mb-2.5">
          <Info className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
          <div>
            <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              Architectural Context &amp; Scope
            </h5>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              {activeDiagram.description}
            </p>
          </div>
        </div>

        {/* Key System Elements */}
        {activeDiagram.keyElements && (
          <div className="flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-zinc-200/80 dark:border-zinc-800/80">
            <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 mr-1">
              Highlighted Components:
            </span>
            {activeDiagram.keyElements.map((el, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] rounded font-mono bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200"
              >
                {el}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails Gallery Selector Strip */}
      {diagrams.length > 1 && (
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
            Select Diagram View ({diagrams.length} available):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {diagrams.map((d, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-cyan-50/80 dark:bg-cyan-950/50 border-cyan-500 ring-1 ring-cyan-500/50 shadow-sm'
                      : 'bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                      0{idx + 1} • {d.type}
                    </span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />}
                  </div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                    {d.title}
                  </p>
                  <span className="text-[10px] font-mono text-zinc-400 mt-1 block">
                    {d.phase}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
