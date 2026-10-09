import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Globe,
  ShieldCheck,
  Network,
  Server,
  Monitor,
  Database,
  MessageSquare,
  Activity,
  Terminal,
  CheckCircle2,
  RefreshCw,
  Lock,
  ChevronRight,
  Sparkles,
  Info,
  Sliders,
  Radio,
  FileCode,
} from 'lucide-react';

interface NetworkTopologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TopologyNode {
  id: string;
  name: string;
  shortTitle: string;
  category: 'cloud' | 'security' | 'core' | 'server' | 'workstation';
  ipAddress: string;
  subnet: string;
  macAddress: string;
  status: 'ONLINE' | 'ACTIVE' | 'ENFORCED' | 'PROTECTED';
  role: string;
  tasks: string[];
  specs: {
    hardware: string;
    osOrFirmware: string;
    management: string;
    uptime: string;
  };
  sampleConfig: {
    language: string;
    title: string;
    code: string;
  };
}

const TOPOLOGY_NODES: Record<string, TopologyNode> = {
  'ad-sql': {
    id: 'ad-sql',
    name: 'Active Directory & SQL Server (DC01)',
    shortTitle: 'Active Directory / SQL Server',
    category: 'server',
    ipAddress: '10.16.2.10',
    subnet: '10.16.2.0/24 (VLAN 30: Server Rack)',
    macAddress: '00:1A:2B:3C:4D:5E',
    status: 'ENFORCED',
    role: 'Identity & Access Management (IAM) & Core Database',
    tasks: [
      'Executed SQL user provisioning scripts (sp_create_agent_user.sql) to generate agent accounts',
      'Configured Active Directory Organizational Units (OUs) for Operations, Finance, and IT staff',
      'Enforced Group Policy Objects (GPOs): BitLocker drive encryption, 5-minute screen lock, USB storage restriction',
      'Administered Kerberos KDC, DNS zone records, and DHCP scope leases across the subnet',
    ],
    specs: {
      hardware: 'Dell PowerEdge Enterprise Rack Server (1U)',
      osOrFirmware: 'Windows Server 2022 Datacenter',
      management: 'Remote Server Administration Tools (RSAT) & PowerShell',
      uptime: '99.98% (SLA Maintained)',
    },
    sampleConfig: {
      language: 'sql',
      title: 'sp_create_agent_user.sql',
      code: `-- Active Directory / SQL IAM Provisioning Routine
-- Executed during physical internship at Ascenders Business Inc.
CREATE PROCEDURE dbo.sp_ProvisionAgentCredentials
    @AgentID VARCHAR(20),
    @FullName NVARCHAR(100),
    @Department VARCHAR(30) = 'Operations'
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO dbo.EnterpriseIAM_Audit (AgentID, FullName, Dept, ProvisionedAt, Status)
    VALUES (@AgentID, @FullName, @Department, GETDATE(), 'ACTIVE');

    PRINT 'IAM: User ' + @AgentID + ' provisioned. Propagating to OU=' + @Department + ',DC=ascenders,DC=local';
END;`,
    },
  },

  endpoints: {
    id: 'endpoints',
    name: 'Windows 10/11 Enterprise Endpoints',
    shortTitle: 'Windows 10/11 Endpoints',
    category: 'workstation',
    ipAddress: '10.16.4.100 - 10.16.4.195',
    subnet: '10.16.4.0/24 (VLAN 20: Operations LAN)',
    macAddress: 'Multiple (95 Workstations Pooled)',
    status: 'ONLINE',
    role: 'Production Agent Operations & Voice Workstations',
    tasks: [
      'Staged and deployed Windows 11 Enterprise (23H2) golden images via unattended installations',
      'Deployed DingTalk ITSM agent and corporate softphone suites across all 95 workstation bays',
      'Patched Cat6 UTP cables into Cisco gigabit access ports and validated 1000Mbps full-duplex connectivity',
      'Conducted hardware diagnostics on RAM, SSD SMART health, and peripheral headsets',
    ],
    specs: {
      hardware: 'Dell OptiPlex Small Form Factor (Core i5, 16GB RAM, 512GB NVMe)',
      osOrFirmware: 'Windows 11 Enterprise (Build 22631)',
      management: 'Active Directory Domain Joined + DingTalk ITSM Agent',
      uptime: '99.9% (Continuous Operations)',
    },
    sampleConfig: {
      language: 'powershell',
      title: 'StagingAudit.ps1',
      code: `# Windows Enterprise Post-Deployment Verification
$ComputerName = $env:COMPUTERNAME
$Domain = (Get-WmiObject Win32_ComputerSystem).Domain
$BitLocker = (Get-BitLockerVolume -MountPoint "C:").ProtectionStatus

Write-Host "[IT-OPS] Host: $ComputerName | Domain: $Domain"
Write-Host "[SECURITY] BitLocker Drive Protection: $BitLocker (Enforced)"
Write-Host "[ITSM] DingTalk Service: Running | VLAN: 20 (Agent Network)"`,
    },
  },

  switch: {
    id: 'switch',
    name: 'Cisco Catalyst Core L3 Managed Switch',
    shortTitle: 'Core Switch',
    category: 'core',
    ipAddress: '10.16.1.1',
    subnet: '10.16.0.0/20 (Trunk Infrastructure)',
    macAddress: 'C4:72:95:A1:B2:C3',
    status: 'ACTIVE',
    role: 'Layer-3 Core Routing & VLAN Segment Distribution',
    tasks: [
      'Configured 802.1Q trunking to isolate Server Rack (VLAN 30) from Agent Workstations (VLAN 20)',
      'Enforced port security with maximum 1 MAC address per patch bay to prevent rogue APs',
      'Monitored port errors, CRC drops, and broadcast storms across 48 gigabit access ports',
      'Maintained physical structured cabling and patch panel numbering inside the server rack',
    ],
    specs: {
      hardware: 'Cisco Catalyst 3850 48-Port Gigabit PoE+ Switch',
      osOrFirmware: 'Cisco IOS-XE 16.12.5b',
      management: 'SSH CLI (Console Serial & Management VLAN 10)',
      uptime: '184 Days Continuous',
    },
    sampleConfig: {
      language: 'bash',
      title: 'cisco_vlan_config.cfg',
      code: `! Cisco Catalyst Core Routing Configuration
interface GigabitEthernet1/0/18
 description Agent_Bay_Workstation_Drop_18
 switchport mode access
 switchport access vlan 20
 spanning-tree portfast
 switchport port-security maximum 1
 switchport port-security violation restrict
!`,
    },
  },

  firewall: {
    id: 'firewall',
    name: 'Enterprise Perimeter UTM Firewall',
    shortTitle: 'Enterprise Firewall',
    category: 'security',
    ipAddress: '10.16.0.1 (WAN: 203.177.42.19)',
    subnet: '10.16.0.0/20 Gateway',
    macAddress: '70:4C:A5:11:22:33',
    status: 'PROTECTED',
    role: 'Perimeter Security, WAN NAT Routing & VPN Gateway',
    tasks: [
      'Inspected incoming packets with deep packet inspection (DPI) and anti-intrusion rules',
      'Restricted administrative ports (RDP 3389, SSH 22) exclusively to the internal IT management subnet',
      'Maintained IPsec VPN site-to-site tunnels connecting secondary operational centers',
      'Configured outbound WAN NAT routing and bandwidth throttling for guest SSIDs',
    ],
    specs: {
      hardware: 'Fortinet FortiGate 60F UTM Appliance',
      osOrFirmware: 'FortiOS v7.2.5',
      management: 'HTTPS Web GUI & CLI SSH',
      uptime: '99.99%',
    },
    sampleConfig: {
      language: 'bash',
      title: 'firewall_policy.conf',
      code: `# FortiGate Firewall Rule Definition
config firewall policy
    edit 42
        set name "LAN_Agents_to_WAN_Internet"
        set srcintf "VLAN20_Agents"
        set dstintf "wan1"
        set srcaddr "Agent_Subnet_10.16.4.0/24"
        set dstaddr "all"
        set action accept
        set schedule "always"
        set service "HTTP" "HTTPS" "DNS"
        set nat enable
    next
end`,
    },
  },

  cloud: {
    id: 'cloud',
    name: 'Public Cloud / Internet WAN Gateway',
    shortTitle: 'Cloud / Internet',
    category: 'cloud',
    ipAddress: '203.177.42.19 (Static Fiber Gateway)',
    subnet: 'Public IPv4 / ISP Fiber Uplink',
    macAddress: 'WAN Carrier Gateway',
    status: 'ONLINE',
    role: 'Primary ISP Uplink & External Cloud Services',
    tasks: [
      'Monitored 1Gbps symmetric fiber carrier circuit for packet loss and latency spikes',
      'Routed cloud authentication for DingTalk ITSM and Office 365 services',
      'Configured dynamic failover routing to secondary 4G/LTE cellular backup link',
    ],
    specs: {
      hardware: 'Carrier Fiber Demarcation Unit (GPON ONT)',
      osOrFirmware: 'Carrier Carrier-Grade Firmware',
      management: 'BGP / Static IP Routing',
      uptime: '100% Up',
    },
    sampleConfig: {
      language: 'bash',
      title: 'wan_uplink_telemetry.log',
      code: `[WAN_UPLINK] Carrier: Tier-1 Fiber Uplink
[CIRCUIT] Speed: 1000 Mbps Down / 1000 Mbps Up
[LATENCY] Gateway Ping: 4.2ms | Packet Loss: 0.00%
[DNS] Primary: 1.1.1.1 | Secondary: 8.8.8.8`,
    },
  },

  itsm: {
    id: 'itsm',
    name: 'DingTalk ITSM & Help Desk Station',
    shortTitle: 'DingTalk ITSM Help Desk',
    category: 'workstation',
    ipAddress: '10.16.1.50',
    subnet: '10.16.1.0/24 (VLAN 10: IT Management)',
    macAddress: '00:15:5D:89:C4:AA',
    status: 'ACTIVE',
    role: 'Enterprise Help Desk & Incident Lifecycle Tracking',
    tasks: [
      'Monitored live incoming IT support queue via DingTalk ITSM ticket bot',
      'Assigned, prioritized, and closed hardware and network incident tickets',
      'Conducted live remote assistance to agent stations for credential resets and printer mapping',
      'Logged workstation hardware asset tags and compiled daily resolution reports for management',
    ],
    specs: {
      hardware: 'IT Administrator Control Station (Dual 24" Monitors)',
      osOrFirmware: 'Windows 11 Enterprise + DingTalk Enterprise Suite',
      management: 'ITSM Cloud API Webhook Integration',
      uptime: 'Daily Support Shift Active',
    },
    sampleConfig: {
      language: 'json',
      title: 'dingtalk_ticket_payload.json',
      code: `{
  "ticketId": "INC-2023-0941",
  "priority": "HIGH",
  "category": "Workstation Onboarding",
  "requester": "Operations Lead (Floor 2)",
  "assignedTo": "Alexander Yadao (Junior Sysadmin)",
  "workstationBay": "Bay 4B - Drop 18",
  "status": "RESOLVED",
  "resolutionTime": "14 minutes",
  "resolutionNotes": "Patched Cat6 drop to VLAN 20, provisioned AD account, verified Windows 11 Enterprise login."
}`,
    },
  },
};

export const NetworkTopologyModal: React.FC<NetworkTopologyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('ad-sql');
  const [isPingRunning, setIsPingRunning] = useState<boolean>(false);
  const [pingResult, setPingResult] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<string>('');

  const activeNode = TOPOLOGY_NODES[selectedNodeId] || TOPOLOGY_NODES['ad-sql'];

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleSimulatePing = () => {
    setIsPingRunning(true);
    setPingResult(null);
    setTimeout(() => {
      setIsPingRunning(false);
      setPingResult(
        `Reply from ${activeNode.ipAddress}: bytes=32 time=0.48ms TTL=128 (0% packet loss)`
      );
    }, 600);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeNode.sampleConfig.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl bg-zinc-950 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden text-zinc-100 max-h-[94vh] flex flex-col transition-all duration-300 ring-1 ring-cyan-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Cyber Telemetry Command Header */}
        <div className="bg-zinc-900/90 border-b border-zinc-800 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
              <Network className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-sm font-mono font-bold tracking-tight text-white flex items-center gap-2">
                  <span>LIVE TOPOLOGY :: ASCENDERS BUSINESS INC. IT INFRASTRUCTURE</span>
                </h3>
              </div>
              <p className="text-[11px] font-mono text-zinc-400">
                Help Desk &amp; Active Directory Lab • Subnet: 10.16.0.0/20 • Domain: <span className="text-cyan-400 font-semibold">ascenders.local</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Live Telemetry Pill */}
            <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-emerald-500/40 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>SLA: 99.9% Uptime</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-colors"
              title="Close modal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Workspace: Left Interactive Diagram / Right Detailed Node Inspector */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 min-h-0">
          {/* Left Column: Visual Vertical/Tree Network Diagram */}
          <div className="lg:col-span-7 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col justify-between bg-radial from-zinc-900/60 to-zinc-950 relative overflow-hidden">
            {/* Subtle ambient grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />

            {/* Topology Instructions & Controls Banner */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800/80 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-400">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Click any node to inspect real-world physical configuration</span>
              </div>
              <span className="text-[11px] text-cyan-400/80 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-800/50">
                5 Interactive Nodes
              </span>
            </div>

            {/* Vertical Flowchart / Tree Container */}
            <div className="relative py-2 flex flex-col items-center select-none">
              {/* Node 1: Cloud / Internet */}
              <div className="w-full max-w-sm flex justify-center z-10">
                <button
                  type="button"
                  onClick={() => setSelectedNodeId('cloud')}
                  className={`w-full group p-3 rounded-xl border transition-all text-left flex items-center justify-between shadow-lg cursor-pointer ${
                    selectedNodeId === 'cloud'
                      ? 'bg-cyan-950/70 border-cyan-400 ring-2 ring-cyan-500/40 shadow-cyan-500/20'
                      : 'bg-zinc-900/90 border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-850'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        Cloud / Internet WAN
                      </p>
                      <p className="text-[10px] font-mono text-zinc-400">
                        ISP Fiber Gateway • 1 Gbps Symmetric
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
                    ONLINE
                  </span>
                </button>
              </div>

              {/* Connecting Line 1 -> 2 (Cloud to Firewall) */}
              <div className="h-7 w-0.5 bg-gradient-to-b from-cyan-500 to-indigo-500 relative flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping absolute" />
              </div>

              {/* Node 2: Enterprise Firewall */}
              <div className="w-full max-w-sm flex justify-center z-10">
                <button
                  type="button"
                  onClick={() => setSelectedNodeId('firewall')}
                  className={`w-full group p-3 rounded-xl border transition-all text-left flex items-center justify-between shadow-lg cursor-pointer ${
                    selectedNodeId === 'firewall'
                      ? 'bg-indigo-950/70 border-indigo-400 ring-2 ring-indigo-500/40 shadow-indigo-500/20'
                      : 'bg-zinc-900/90 border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-850'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                        Enterprise Firewall (Fortinet)
                      </p>
                      <p className="text-[10px] font-mono text-zinc-400">
                        IP: 10.16.0.1 • Stateful Inspection
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-400 border border-indigo-800/50">
                    PROTECTED
                  </span>
                </button>
              </div>

              {/* Connecting Line 2 -> 3 (Firewall to Core Switch) */}
              <div className="h-7 w-0.5 bg-gradient-to-b from-indigo-500 to-cyan-500 relative flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping absolute" />
              </div>

              {/* Node 3: Core Layer-3 Switch */}
              <div className="w-full max-w-sm flex justify-center z-10">
                <button
                  type="button"
                  onClick={() => setSelectedNodeId('switch')}
                  className={`w-full group p-3 rounded-xl border transition-all text-left flex items-center justify-between shadow-lg cursor-pointer ${
                    selectedNodeId === 'switch'
                      ? 'bg-cyan-950/70 border-cyan-400 ring-2 ring-cyan-500/40 shadow-cyan-500/20'
                      : 'bg-zinc-900/90 border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-850'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Network className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        Core Switch (Cisco Catalyst L3)
                      </p>
                      <p className="text-[10px] font-mono text-zinc-400">
                        IP: 10.16.1.1 • 802.1Q VLAN Trunking
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
                    48-PORT GBE
                  </span>
                </button>
              </div>

              {/* Branching SVG Lines (Core Switch branches to Server Rack & Agent Workstations) */}
              <div className="w-full max-w-md h-9 relative">
                <svg className="w-full h-full" viewBox="0 0 400 36" fill="none">
                  {/* Vertical stem from switch */}
                  <line x1="200" y1="0" x2="200" y2="12" stroke="#06b6d4" strokeWidth="2" />
                  {/* Horizontal splitter line */}
                  <line x1="100" y1="12" x2="300" y2="12" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 2" />
                  {/* Left branch downward to Server Rack */}
                  <line x1="100" y1="12" x2="100" y2="36" stroke="#10b981" strokeWidth="2" />
                  <polygon points="96,32 100,36 104,32" fill="#10b981" />
                  {/* Right branch downward to Workstations */}
                  <line x1="300" y1="12" x2="300" y2="36" stroke="#f59e0b" strokeWidth="2" />
                  <polygon points="296,32 300,36 304,32" fill="#f59e0b" />
                </svg>
              </div>

              {/* Level 4: Dual Branches (Server Rack on Left, Agent Workstations on Right) */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 z-10">
                {/* Branch A: Server Rack Container */}
                <div className="bg-zinc-900/50 border border-emerald-950/70 p-3 rounded-2xl flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 px-1 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5" />
                      <span>SERVER RACK (VLAN 30)</span>
                    </span>
                    <span className="text-[10px] text-zinc-500 font-normal">DMZ / Data Center</span>
                  </div>

                  {/* Active Directory & SQL Server */}
                  <button
                    type="button"
                    onClick={() => setSelectedNodeId('ad-sql')}
                    className={`w-full group p-3 rounded-xl border transition-all text-left flex flex-col gap-1.5 shadow-md cursor-pointer ${
                      selectedNodeId === 'ad-sql'
                        ? 'bg-emerald-950/70 border-emerald-400 ring-2 ring-emerald-500/40 shadow-emerald-500/20'
                        : 'bg-zinc-900/90 border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-850'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                          <Database className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          AD &amp; SQL Server
                        </p>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-900/40 text-emerald-300 border border-emerald-700/40">
                        DC01
                      </span>
                    </div>

                    <p className="text-[10px] font-mono text-zinc-400">
                      IP: 10.16.2.10 • IAM &amp; GPO Core
                    </p>
                    <div className="text-[10px] text-emerald-400/90 font-mono flex items-center gap-1 pt-1 border-t border-zinc-800/80">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>sp_create_agent_user.sql</span>
                    </div>
                  </button>
                </div>

                {/* Branch B: Agent Workstations Container */}
                <div className="bg-zinc-900/50 border border-amber-950/70 p-3 rounded-2xl flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-amber-400 px-1 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Monitor className="w-3.5 h-3.5" />
                      <span>AGENT WORKSTATIONS</span>
                    </span>
                    <span className="text-[10px] text-zinc-500 font-normal">VLAN 20 (95 Nodes)</span>
                  </div>

                  {/* Windows 10/11 Endpoints */}
                  <button
                    type="button"
                    onClick={() => setSelectedNodeId('endpoints')}
                    className={`w-full group p-3 rounded-xl border transition-all text-left flex flex-col gap-1.5 shadow-md cursor-pointer ${
                      selectedNodeId === 'endpoints'
                        ? 'bg-amber-950/70 border-amber-400 ring-2 ring-amber-500/40 shadow-amber-500/20'
                        : 'bg-zinc-900/90 border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-850'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                          <Monitor className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                          Windows 10/11 Endpoints
                        </p>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-900/40 text-amber-300 border border-amber-700/40">
                        95 Nodes
                      </span>
                    </div>

                    <p className="text-[10px] font-mono text-zinc-400">
                      IP Pool: 10.16.4.100 - 195
                    </p>
                    <div className="text-[10px] text-amber-400/90 font-mono flex items-center gap-1 pt-1 border-t border-zinc-800/80">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>BitLocker &amp; DingTalk ITSM</span>
                    </div>
                  </button>

                  {/* DingTalk ITSM Help Desk Trigger */}
                  <button
                    type="button"
                    onClick={() => setSelectedNodeId('itsm')}
                    className={`w-full group p-2.5 rounded-xl border transition-all text-left flex items-center justify-between text-xs cursor-pointer ${
                      selectedNodeId === 'itsm'
                        ? 'bg-blue-950/70 border-blue-400 ring-1 ring-blue-500/40'
                        : 'bg-zinc-900/70 border-zinc-800/90 hover:border-blue-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                      <span className="font-mono text-[11px] text-zinc-300 group-hover:text-white">
                        DingTalk ITSM Console
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-blue-400 bg-blue-950 px-1.5 py-0.5 rounded">
                      Queue: 0
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Real-Time Telemetry Bar */}
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Simulated Network Latency: &lt;1ms</span>
              </span>
              <span className="text-zinc-500">Ascenders Business Inc. Lab Environment</span>
            </div>
          </div>

          {/* Right Column: Detailed Node Inspector & Configuration Drawer */}
          <div className="lg:col-span-5 p-4 sm:p-6 bg-zinc-950/90 flex flex-col justify-between space-y-5 overflow-y-auto">
            <div className="space-y-5">
              {/* Header: Node Details & Status Badge */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-800/60">
                    Node Telemetry Inspector
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700/60 text-emerald-400">
                    {activeNode.status}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white tracking-tight">
                  {activeNode.name}
                </h4>
                <p className="text-xs font-mono text-cyan-300 mt-1">
                  {activeNode.role}
                </p>
              </div>

              {/* IP / MAC / Subnet Matrix */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                <div>
                  <span className="text-[10px] text-zinc-500 block">IP ADDRESS</span>
                  <span className="text-zinc-200 font-semibold">{activeNode.ipAddress}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">SUBNET / VLAN</span>
                  <span className="text-zinc-200 font-semibold">{activeNode.subnet}</span>
                </div>
                <div className="mt-1">
                  <span className="text-[10px] text-zinc-500 block">HARDWARE</span>
                  <span className="text-zinc-300 text-[11px] truncate block">{activeNode.specs.hardware}</span>
                </div>
                <div className="mt-1">
                  <span className="text-[10px] text-zinc-500 block">OS / PLATFORM</span>
                  <span className="text-zinc-300 text-[11px] truncate block">{activeNode.specs.osOrFirmware}</span>
                </div>
              </div>

              {/* Interactive Simulated Ping Action */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Ping Diagnostic</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleSimulatePing}
                    disabled={isPingRunning}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-all disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isPingRunning ? 'animate-spin' : ''}`} />
                    <span>{isPingRunning ? 'Pinging...' : `Ping ${activeNode.shortTitle}`}</span>
                  </button>
                </div>
                {pingResult && (
                  <div className="text-[11px] font-mono text-emerald-400 bg-zinc-950 p-2 rounded border border-emerald-950 animate-in fade-in">
                    {pingResult}
                  </div>
                )}
              </div>

              {/* Hands-On Internship Tasks Completed by Alexander */}
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Physical Internship Responsibilities:</span>
                </h5>
                <div className="space-y-2">
                  {activeNode.tasks.map((task, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real Configuration / Script Sandbox */}
              <div>
                <div className="flex items-center justify-between mb-1.5 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{activeNode.sampleConfig.title}</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    {copiedCode ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-300 overflow-x-auto leading-relaxed">
                  <code>{activeNode.sampleConfig.code}</code>
                </pre>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-500">
                Verified: Ascenders Business Inc. (Aug - Sept 2023)
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
              >
                Close Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
