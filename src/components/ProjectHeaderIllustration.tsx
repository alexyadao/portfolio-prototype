import React from 'react';
import {
  Server,
  Database,
  Cpu,
  Radio,
  Network,
  Sun,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Activity,
  Zap,
  Layers,
  Sparkles,
  Lock,
} from 'lucide-react';

interface ProjectHeaderIllustrationProps {
  projectId: string;
}

export const ProjectHeaderIllustration: React.FC<ProjectHeaderIllustrationProps> = ({ projectId }) => {
  const id = projectId.toLowerCase();

  // 1. PUP Campus & Infrastructure (campus-school-infra / campus-infra-app)
  if (id.includes('campus')) {
    return (
      <div className="relative w-full h-44 bg-[#020617] overflow-hidden select-none border-b border-teal-500/20">
        {/* Deep slate and teal grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d948815_1px,transparent_1px),linear-gradient(to_bottom,#0d948815_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Pulsating Telemetry Header */}
        <div className="absolute top-2.5 left-3.5 right-3.5 flex items-center justify-between text-[10px] font-mono text-teal-400/90 z-10">
          <span className="flex items-center gap-1.5 font-bold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            PUP CAMPUS NETWORK - ACTIVE
          </span>
          <span className="px-1.5 py-0.5 rounded bg-teal-950/80 border border-teal-800/60 text-teal-300 text-[9px]">
            NODE: PUP-MNL-01
          </span>
        </div>

        {/* Central Isometric Campus Map & Node Topology */}
        <div className="absolute inset-0 flex items-center justify-center pt-3">
          <svg className="w-full h-full max-w-[340px]" viewBox="0 0 320 130" fill="none">
            {/* Pulsating telemetry connection lines */}
            <path
              d="M 50 85 L 115 50 L 195 75 L 265 40"
              stroke="#0d9488"
              strokeWidth="1.75"
              strokeDasharray="4 3"
              strokeOpacity="0.8"
            />
            <path
              d="M 115 50 L 160 100 L 230 95"
              stroke="#14b8a6"
              strokeWidth="1.5"
              strokeOpacity="0.7"
            />

            {/* Isometric Building 1: West Wing Hub */}
            <g transform="translate(40, 65)">
              <polygon points="18,0 36,9 18,18 0,9" fill="#0f766e" />
              <polygon points="0,9 18,18 18,36 0,27" fill="#115e59" />
              <polygon points="18,18 36,9 36,27 18,36" fill="#134e4a" />
              <circle cx="18" cy="9" r="2.5" fill="#2dd4bf" />
            </g>

            {/* Isometric Building 2: Main Academic Dome */}
            <g transform="translate(100, 25)">
              <polygon points="26,0 52,13 26,26 0,13" fill="#14b8a6" fillOpacity="0.9" />
              <polygon points="0,13 26,26 26,50 0,37" fill="#0d9488" />
              <polygon points="26,26 52,13 52,37 26,50" fill="#0f766e" />
              <circle cx="26" cy="13" r="3.5" fill="#5eead4" />
              {/* Glowing signal rings */}
              <circle cx="26" cy="13" r="10" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            </g>

            {/* Isometric Building 3: Tech Innovation Wing */}
            <g transform="translate(180, 50)">
              <polygon points="22,0 44,11 22,22 0,11" fill="#0f766e" />
              <polygon points="0,11 22,22 22,42 0,31" fill="#115e59" />
              <polygon points="22,22 44,11 44,31 22,42" fill="#134e4a" />
              <circle cx="22" cy="11" r="2.5" fill="#2dd4bf" />
            </g>

            {/* Connected Node 4: Engineering Lab Beacon */}
            <g transform="translate(250, 25)">
              <circle cx="15" cy="15" r="12" fill="#042f2e" stroke="#14b8a6" strokeWidth="1.5" />
              <circle cx="15" cy="15" r="5" fill="#2dd4bf" />
              <circle cx="15" cy="15" r="9" stroke="#5eead4" strokeWidth="1" strokeOpacity="0.4" />
            </g>

            {/* Pulsating data packets */}
            <circle cx="85" cy="67" r="2" fill="#a7f3d0" />
            <circle cx="155" cy="62" r="2.5" fill="#a7f3d0" />
            <circle cx="228" cy="58" r="2" fill="#a7f3d0" />
          </svg>
        </div>

        {/* Bottom Telemetry Pill */}
        <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-[9px] font-mono text-zinc-400">
          <span className="flex items-center gap-1 text-teal-300">
            <Activity className="w-3 h-3 text-teal-400" />
            LATENCY: 4ms • RLS POLICIES: 100%
          </span>
          <span className="text-zinc-500">SUPABASE / POSTGRES</span>
        </div>
      </div>
    );
  }

  // 2. IT Helpdesk (opsflow-it-helpdesk)
  if (id.includes('opsflow')) {
    return (
      <div className="relative w-full h-44 bg-[#0B0F19] overflow-hidden select-none border-b border-indigo-500/20">
        {/* Dark blue and purple background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#312e8115_1px,transparent_1px),linear-gradient(to_bottom,#312e8115_1px,transparent_1px)] bg-[size:18px_18px]" />
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Console Header Bar */}
        <div className="absolute top-2.5 left-3.5 right-3.5 flex items-center justify-between text-[10px] font-mono text-indigo-300 z-10">
          <span className="flex items-center gap-1.5 font-bold tracking-wider text-indigo-400">
            <Terminal className="w-3 h-3 text-indigo-400" />
            OPSFLOW ITSM v2.4
          </span>
          <span className="px-1.5 py-0.5 rounded bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 text-[9px]">
            ROLE: EMPLOYEE
          </span>
        </div>

        {/* Central Dashboard & Server Rack Graphic */}
        <div className="absolute inset-0 flex items-center justify-between px-6 pt-5">
          {/* Left: Isometric Server Rack with Green/Yellow Status Nodes */}
          <div className="w-28 h-24 rounded-lg bg-zinc-950/90 border border-indigo-900/80 p-2 flex flex-col justify-between shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-1">
              <span className="text-[8px] font-mono text-zinc-400">RACK-01</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            {/* Server Blade 1 */}
            <div className="flex items-center justify-between px-1 py-0.5 bg-zinc-900 rounded border border-zinc-800">
              <span className="text-[7px] font-mono text-zinc-400">SRV-AUTH</span>
              <div className="flex gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
              </div>
            </div>
            {/* Server Blade 2 */}
            <div className="flex items-center justify-between px-1 py-0.5 bg-zinc-900 rounded border border-zinc-800">
              <span className="text-[7px] font-mono text-zinc-400">SRV-TICKETS</span>
              <div className="flex gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                <span className="w-1 h-1 rounded-full bg-amber-400" />
              </div>
            </div>
            {/* Server Blade 3 */}
            <div className="flex items-center justify-between px-1 py-0.5 bg-zinc-900 rounded border border-zinc-800">
              <span className="text-[7px] font-mono text-zinc-400">SRV-SLA</span>
              <div className="flex gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
              </div>
            </div>
          </div>

          {/* Right: Mock Ticket Dashboard & Status Bars */}
          <div className="w-44 space-y-2">
            <div className="p-2 rounded-lg bg-zinc-950/80 border border-indigo-900/70 shadow-md">
              <div className="flex items-center justify-between text-[9px] font-mono mb-1">
                <span className="text-zinc-400">TICKET RESOLUTION</span>
                <span className="text-emerald-400 font-bold">98.2%</span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full w-[88%]" />
              </div>
            </div>

            {/* Recent Ticket Stream */}
            <div className="p-1.5 rounded-lg bg-zinc-950/60 border border-zinc-800 text-[8px] font-mono space-y-1">
              <div className="flex items-center justify-between text-zinc-300">
                <span className="text-cyan-400">#TK-1082</span>
                <span className="text-amber-400">[P1 CRITICAL]</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span className="truncate max-w-[90px]">SSO Token Expired</span>
                <span className="text-emerald-400">ASSIGNED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Feed */}
        <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-[9px] font-mono text-zinc-400">
          <span className="text-indigo-300">DISPATCH QUEUE: NORMAL</span>
          <span className="text-zinc-500">REACT CONTEXT / NEXT.JS</span>
        </div>
      </div>
    );
  }

  // 3. Technical Exam Engine (examcraft-studio)
  if (id.includes('examcraft')) {
    return (
      <div className="relative w-full h-44 bg-[#0F172A] overflow-hidden select-none border-b border-emerald-500/20">
        {/* Futuristic Blueprint grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:16px_16px]" />
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Assessment Engine Blueprint Header */}
        <div className="absolute top-2.5 left-3.5 right-3.5 flex items-center justify-between text-[10px] font-mono text-emerald-400/90 z-10">
          <span className="flex items-center gap-1.5 font-bold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            EXAMCRAFT ASSESSMENT ENGINE
          </span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-[9px]">
            EVALUATION: PASS
          </span>
        </div>

        {/* Center: Circular 98.4% Gauge & Checklist UI */}
        <div className="absolute inset-0 flex items-center justify-between px-6 pt-5">
          {/* Circular 98.4% Grading Stats Gauge */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" fill="none" stroke="#1e293b" strokeWidth="6" />
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="url(#examGradient)"
                strokeWidth="6"
                strokeDasharray="201"
                strokeDashoffset="8"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="examGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-base font-mono font-extrabold text-white">98.4%</span>
              <span className="text-[7px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                GRADE
              </span>
            </div>
          </div>

          {/* Right: Code / Assessment Checklist Layout */}
          <div className="w-48 space-y-1.5 text-[9px] font-mono">
            <div className="p-1.5 rounded-lg bg-zinc-950/85 border border-emerald-900/60 flex items-center justify-between text-zinc-300">
              <span className="flex items-center gap-1 text-emerald-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                TIMED HOOK
              </span>
              <span className="text-emerald-400 font-bold">0.0ms SYNC</span>
            </div>
            <div className="p-1.5 rounded-lg bg-zinc-950/85 border border-emerald-900/60 flex items-center justify-between text-zinc-300">
              <span className="flex items-center gap-1 text-emerald-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                AUTOSAVE STATE
              </span>
              <span className="text-cyan-400 font-bold">COMMITTED</span>
            </div>
            <div className="p-1.5 rounded-lg bg-zinc-950/85 border border-emerald-900/60 flex items-center justify-between text-zinc-300">
              <span className="flex items-center gap-1 text-emerald-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ANTI-CHEAT BLUR
              </span>
              <span className="text-emerald-400 font-bold">VERIFIED</span>
            </div>
          </div>
        </div>

        {/* Bottom Blueprint Marker */}
        <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-[9px] font-mono text-zinc-400">
          <span className="text-emerald-400">FULL-STACK APP ROUTER</span>
          <span className="text-zinc-500">TYPESCRIPT / NEXT.JS</span>
        </div>
      </div>
    );
  }

  // 4. Portable Multi-Function Meter (pmct-001 / pmct-001-meter)
  if (id.includes('pmct')) {
    return (
      <div className="relative w-full h-44 bg-[#0a0f0d] overflow-hidden select-none border-b border-orange-500/20">
        {/* PCB Tracer Grid Background with Green/Orange Traces */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#05966915_1px,transparent_1px),linear-gradient(to_bottom,#05966915_1px,transparent_1px)] bg-[size:16px_16px]" />
        <div className="absolute -top-10 -left-10 w-44 h-44 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Hardware Status Header */}
        <div className="absolute top-2.5 left-3.5 right-3.5 flex items-center justify-between text-[10px] font-mono text-orange-400 z-10">
          <span className="flex items-center gap-1.5 font-bold tracking-wider text-orange-400">
            <Zap className="w-3 h-3 text-orange-400" />
            PMCT-001 HARDWARE DIAGNOSTIC
          </span>
          <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-orange-800/60 text-orange-300 text-[9px]">
            PWR: 5.00V REG
          </span>
        </div>

        {/* Center: ESP32 Microchip Package & Waveform Oscilloscope Screen */}
        <div className="absolute inset-0 flex items-center justify-between px-6 pt-5">
          {/* Microchip Representation (ESP32) */}
          <div className="w-24 h-22 bg-zinc-950 border-2 border-zinc-700 rounded-lg p-2 flex flex-col items-center justify-between shadow-xl relative">
            {/* Chip notch */}
            <div className="w-4 h-1 bg-zinc-700 rounded-b" />
            <div className="text-center py-1">
              <span className="text-[9px] font-mono font-bold text-white block">ESP32</span>
              <span className="text-[7px] font-mono text-orange-400 tracking-wider">DUAL-CORE</span>
            </div>
            <span className="text-[6px] font-mono text-zinc-500">240 MHz MCU</span>
            {/* Pins on top & bottom */}
            <div className="absolute -left-1.5 top-3 flex flex-col gap-1.5">
              {[1, 2, 3, 4].map((p) => (
                <div key={p} className="w-1.5 h-1 bg-amber-400/80 rounded-xs" />
              ))}
            </div>
            <div className="absolute -right-1.5 top-3 flex flex-col gap-1.5">
              {[1, 2, 3, 4].map((p) => (
                <div key={p} className="w-1.5 h-1 bg-amber-400/80 rounded-xs" />
              ))}
            </div>
          </div>

          {/* CRT Waveform / Telemetry Oscilloscope Screen */}
          <div className="w-48 h-22 bg-[#020d0a] border border-emerald-900/80 rounded-lg p-2 flex flex-col justify-between shadow-inner relative overflow-hidden">
            <div className="flex items-center justify-between text-[8px] font-mono text-emerald-400">
              <span>DUT: 7408 AND</span>
              <span className="text-emerald-300 font-bold">LOGIC PASS</span>
            </div>
            {/* SVG Square Wave */}
            <svg className="w-full h-7" viewBox="0 0 160 28" fill="none">
              <path
                d="M 0 22 L 20 22 L 20 6 L 45 6 L 45 22 L 70 22 L 70 6 L 95 6 L 95 22 L 120 22 L 120 6 L 145 6 L 145 22 L 160 22"
                stroke="#10b981"
                strokeWidth="2"
              />
            </svg>
            <div className="flex items-center justify-between text-[7px] font-mono text-emerald-500">
              <span>VIL: 0.18V</span>
              <span>VIH: 4.82V</span>
              <span>DELAY: 8.4ns</span>
            </div>
          </div>
        </div>

        {/* Bottom Telemetry Marker */}
        <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-[9px] font-mono text-zinc-400">
          <span className="text-orange-400">C++ / ARDUINO EMBEDDED</span>
          <span className="text-zinc-500">ZIF SOCKET VALIDATOR</span>
        </div>
      </div>
    );
  }

  // 5. Enterprise OS Provisioning & Active Directory (enterprise-sysadmin-infra / hardware-network)
  if (id.includes('sysadmin') || id.includes('hardware-network') || id.includes('enterprise')) {
    return (
      <div className="relative w-full h-44 bg-[#090D16] overflow-hidden select-none border-b border-cyan-500/20">
        {/* Dotted Slate Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1.25px,transparent_1.25px)] bg-[size:16px_16px]" />
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Directory Topology Header */}
        <div className="absolute top-2.5 left-3.5 right-3.5 flex items-center justify-between text-[10px] font-mono text-cyan-400 z-10">
          <span className="flex items-center gap-1.5 font-bold tracking-wider text-cyan-400">
            <Network className="w-3 h-3 text-cyan-400" />
            ACTIVE DIRECTORY DOMAIN SERVICES
          </span>
          <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-cyan-800/60 text-cyan-300 text-[9px]">
            FOREST SYNC: OK
          </span>
        </div>

        {/* Central Infrastructure Network Topology Diagram */}
        <div className="absolute inset-0 flex items-center justify-center pt-4">
          <svg className="w-full h-full max-w-[340px]" viewBox="0 0 320 120" fill="none">
            {/* Domain Connector Lines */}
            <line x1="160" y1="35" x2="70" y2="85" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="160" y1="35" x2="160" y2="85" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1="160" y1="35" x2="250" y2="85" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Root Domain Controller (DC-01) */}
            <g transform="translate(135, 15)">
              <rect width="50" height="26" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
              <circle cx="12" cy="13" r="3" fill="#38bdf8" />
              <text x="20" y="16" fill="#f8fafc" fontSize="8" fontFamily="monospace" fontWeight="bold">
                DC-01
              </text>
            </g>

            {/* Workstation 1 (WS-CORP-101) */}
            <g transform="translate(45, 75)">
              <rect width="50" height="24" rx="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.25" />
              <circle cx="10" cy="12" r="2.5" fill="#22c55e" />
              <text x="17" y="15" fill="#cbd5e1" fontSize="7" fontFamily="monospace">
                WS-101
              </text>
            </g>

            {/* Database Node (SQL-PROD) */}
            <g transform="translate(135, 75)">
              <rect width="50" height="24" rx="5" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.25" />
              <circle cx="10" cy="12" r="2.5" fill="#3b82f6" />
              <text x="17" y="15" fill="#cbd5e1" fontSize="7" fontFamily="monospace">
                SQL-01
              </text>
            </g>

            {/* Workstation 2 (WS-CORP-102) */}
            <g transform="translate(225, 75)">
              <rect width="50" height="24" rx="5" fill="#0f172a" stroke="#818cf8" strokeWidth="1.25" />
              <circle cx="10" cy="12" r="2.5" fill="#22c55e" />
              <text x="17" y="15" fill="#cbd5e1" fontSize="7" fontFamily="monospace">
                WS-102
              </text>
            </g>
          </svg>
        </div>

        {/* Bottom Infrastructure Telemetry Pill */}
        <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-[9px] font-mono text-zinc-400">
          <span className="flex items-center gap-1 text-cyan-300">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            OU=CORP,DC=INTERNAL • KERBEROS AUTH
          </span>
          <span className="text-zinc-500">WINDOWS 10/11 ENT</span>
        </div>
      </div>
    );
  }

  // 6. Solar-Powered IoT Tracking (solar-iot-tracking / solar-iot)
  if (id.includes('solar')) {
    return (
      <div className="relative w-full h-44 bg-[#05111a] overflow-hidden select-none border-b border-amber-500/20">
        {/* Dark Blue with Green/Yellow Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b10_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b10_1px,transparent_1px)] bg-[size:16px_16px]" />
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Solar Telemetry Header */}
        <div className="absolute top-2.5 left-3.5 right-3.5 flex items-center justify-between text-[10px] font-mono text-amber-400 z-10">
          <span className="flex items-center gap-1.5 font-bold tracking-wider text-amber-400">
            <Sun className="w-3 h-3 text-amber-400" />
            SOLAR IoT TELEMETRY HARVESTER
          </span>
          <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-amber-800/60 text-amber-300 text-[9px]">
            INTENSITY: 86%
          </span>
        </div>

        {/* Center: Sun Orbit Angle & Isometric Solar Panel + Battery Dashboard */}
        <div className="absolute inset-0 flex items-center justify-between px-6 pt-5">
          {/* Glowing Sun Orbit & Angle Telemetry */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Orbit Ellipse */}
            <svg className="w-full h-full" viewBox="0 0 90 90">
              <ellipse cx="45" cy="45" rx="38" ry="22" fill="none" stroke="#f59e0b" strokeWidth="1.25" strokeDasharray="3 2" opacity="0.6" />
              {/* Sun Position */}
              <circle cx="70" cy="35" r="7" fill="#f59e0b" />
              <circle cx="70" cy="35" r="11" stroke="#fde047" strokeWidth="1" opacity="0.5" />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xs font-mono font-bold text-white">AZ 142°</span>
              <span className="text-[7px] font-mono text-amber-400">EL 58°</span>
            </div>
          </div>

          {/* Right: Isometric Solar PV Panel + Charge Gauges */}
          <div className="w-48 space-y-1.5 text-[9px] font-mono">
            <div className="p-1.5 rounded-lg bg-zinc-950/85 border border-amber-900/60 flex items-center justify-between text-zinc-300">
              <span className="text-amber-300">PV POWER GENERATED</span>
              <span className="text-white font-bold">24.8 W</span>
            </div>

            <div className="p-1.5 rounded-lg bg-zinc-950/85 border border-amber-900/60 flex items-center justify-between text-zinc-300">
              <span className="text-emerald-400">LiFePO4 BATTERY</span>
              <span className="text-emerald-400 font-bold">98% (12.6V)</span>
            </div>

            <div className="p-1.5 rounded-lg bg-zinc-950/85 border border-amber-900/60 flex items-center justify-between text-zinc-300">
              <span className="text-cyan-300">COOLING FAN (PWM)</span>
              <span className="text-cyan-400 font-bold">ACTIVE (MED)</span>
            </div>
          </div>
        </div>

        {/* Bottom Status Feed */}
        <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-[9px] font-mono text-zinc-400">
          <span className="text-amber-400">KY-018 DUAL LDR TRACKING LOCK</span>
          <span className="text-zinc-500">ARDUINO IoT CLOUD</span>
        </div>
      </div>
    );
  }

  // Generic Default Illustration Fallback
  return (
    <div className="relative w-full h-44 bg-zinc-950 overflow-hidden select-none border-b border-zinc-800">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] bg-[size:16px_16px]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Cpu className="w-12 h-12 text-zinc-700 animate-pulse" />
      </div>
    </div>
  );
};
