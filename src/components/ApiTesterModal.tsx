import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Copy,
  Check,
  Lock,
  Database,
  Terminal,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck,
  Code2,
  RefreshCw,
  Search,
  CheckCircle2,
  FileJson,
} from 'lucide-react';

interface ApiTesterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST';
  path: string;
  summary: string;
  requiresAuth: boolean;
  statusCode: number;
  statusText: string;
  responseTime: string;
  responseSize: string;
  requestBody?: object;
  responseBody: object;
  headers: Record<string, string>;
}

const API_ENDPOINTS: ApiEndpoint[] = [
  {
    id: 'get-inventory',
    method: 'GET',
    path: '/api/v1/inventory',
    summary: 'Retrieve paginated catalog with live stock levels & pricing',
    requiresAuth: false,
    statusCode: 200,
    statusText: 'OK',
    responseTime: '24 ms',
    responseSize: '1.42 KB',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=60',
      'x-ratelimit-limit': '1000',
      'x-ratelimit-remaining': '994',
    },
    responseBody: {
      success: true,
      timestamp: '2026-10-08T04:12:00.124Z',
      pagination: {
        totalItems: 48,
        page: 1,
        pageSize: 3,
        totalPages: 16,
      },
      data: [
        {
          id: 'prod_901a',
          sku: 'SKU-LOGIC-7408',
          name: 'Quad 2-Input AND Gate IC (DIP-14)',
          category: 'Digital Logic Semis',
          unitPrice: 1.45,
          currency: 'USD',
          stockQuantity: 420,
          reorderThreshold: 50,
          warehouseLocation: 'Bay-4B-Rack-02',
          isAvailable: true,
        },
        {
          id: 'prod_902b',
          sku: 'SKU-MCU-ESP32-WROOM',
          name: 'ESP32 Dual-Core WiFi/BLE SoC Module',
          category: 'Embedded Microcontrollers',
          unitPrice: 4.85,
          currency: 'USD',
          stockQuantity: 185,
          reorderThreshold: 30,
          warehouseLocation: 'Bay-2A-Rack-11',
          isAvailable: true,
        },
        {
          id: 'prod_903c',
          sku: 'SKU-SOLAR-PV-25W',
          name: 'Monocrystalline Solar PV Panel 25W 18V',
          category: 'Energy Harvesting',
          unitPrice: 28.5,
          currency: 'USD',
          stockQuantity: 64,
          reorderThreshold: 15,
          warehouseLocation: 'Bay-7C-Rack-01',
          isAvailable: true,
        },
      ],
    },
  },
  {
    id: 'post-orders',
    method: 'POST',
    path: '/api/v1/orders',
    summary: 'Submit checkout with atomic SQL inventory deduction',
    requiresAuth: true,
    statusCode: 201,
    statusText: 'Created',
    responseTime: '38 ms',
    responseSize: '890 B',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'x-transaction-id': 'tx_984f11e9a2bc',
      'x-db-latency': '14.2 ms',
    },
    requestBody: {
      customerId: 'usr_alex_yadao',
      shippingAddress: {
        street: '1016 Polytechnic Ave',
        city: 'Santa Mesa',
        state: 'NCR',
        postalCode: '1016',
        country: 'PH',
      },
      items: [
        { sku: 'SKU-LOGIC-7408', quantity: 10, unitPrice: 1.45 },
        { sku: 'SKU-MCU-ESP32-WROOM', quantity: 2, unitPrice: 4.85 },
      ],
      paymentMethod: 'ENTERPRISE_INVOICE',
    },
    responseBody: {
      success: true,
      message: 'Order created successfully with atomic inventory locks.',
      order: {
        orderId: 'ord_2026_9881',
        status: 'CONFIRMED',
        createdAt: '2026-10-08T04:12:15.892Z',
        subtotal: 24.2,
        tax: 2.9,
        totalAmount: 27.1,
        currency: 'USD',
        transactionLock: 'ACID_COMMITTED',
        inventoryUpdated: [
          { sku: 'SKU-LOGIC-7408', deducted: 10, remainingStock: 410 },
          { sku: 'SKU-MCU-ESP32-WROOM', deducted: 2, remainingStock: 183 },
        ],
      },
    },
  },
  {
    id: 'post-auth-login',
    method: 'POST',
    path: '/api/v1/auth/login',
    summary: 'Authenticate credentials and issue cryptographically signed JWT',
    requiresAuth: false,
    statusCode: 200,
    statusText: 'OK',
    responseTime: '45 ms',
    responseSize: '710 B',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'set-cookie': 'refreshToken=s%3A...; HttpOnly; Secure; SameSite=Strict',
    },
    requestBody: {
      email: 'alexander.yadao@enterprise.internal',
      password: '••••••••••••••••',
      deviceInfo: 'Node.js Developer Console (macOS/Darwin)',
    },
    responseBody: {
      success: true,
      message: 'Authentication successful. JWT access token issued.',
      auth: {
        tokenType: 'Bearer',
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c3JfYWxleF95YWRhbyIsInJvbGUiOiJzeXNhZG1pbiIsImlhdCI6MTc5MTQ0MjMyMCwiZXhwIjoxNzkxNDQ1OTIwfQ.eX9Z_74_example_sig',
        expiresInSeconds: 3600,
        user: {
          id: 'usr_alex_yadao',
          name: 'Alexander Christian R. Yadao',
          email: 'alexander.yadao@enterprise.internal',
          role: 'ADMIN_INVENTORY_MANAGER',
          permissions: [
            'inventory:read',
            'inventory:write',
            'orders:create',
            'orders:cancel',
            'audit:view',
          ],
        },
      },
    },
  },
  {
    id: 'get-health',
    method: 'GET',
    path: '/api/v1/health',
    summary: 'Check PostgreSQL pool status and API cluster heartbeat',
    requiresAuth: false,
    statusCode: 200,
    statusText: 'OK',
    responseTime: '8 ms',
    responseSize: '340 B',
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
    responseBody: {
      status: 'HEALTHY',
      uptimeSeconds: 849200,
      timestamp: '2026-10-08T04:12:30.000Z',
      services: {
        expressServer: 'UP',
        postgreSqlCluster: {
          status: 'CONNECTED',
          activeConnections: 12,
          idleConnections: 38,
          poolSize: 50,
        },
        jwtSigner: 'ONLINE',
      },
    },
  },
];

export const ApiTesterModal: React.FC<ApiTesterModalProps> = ({ isOpen, onClose }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(API_ENDPOINTS[0]);
  const [activeTab, setActiveTab] = useState<'response' | 'request' | 'headers'>('response');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
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

  const handleSendRequest = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
    }, 350);
  };

  const handleSelectEndpoint = (ep: ApiEndpoint) => {
    setSelectedEndpoint(ep);
    setActiveTab('response');
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
    }, 250);
  };

  const handleCopyJson = () => {
    const dataToCopy =
      activeTab === 'request' && selectedEndpoint.requestBody
        ? JSON.stringify(selectedEndpoint.requestBody, null, 2)
        : activeTab === 'headers'
        ? JSON.stringify(selectedEndpoint.headers, null, 2)
        : JSON.stringify(selectedEndpoint.responseBody, null, 2);

    navigator.clipboard.writeText(dataToCopy);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Filter endpoints by path or summary
  const filteredEndpoints = API_ENDPOINTS.filter((ep) => {
    const q = searchQuery.toLowerCase();
    return ep.path.toLowerCase().includes(q) || ep.summary.toLowerCase().includes(q);
  });

  // Render colored syntax highlighted JSON code
  const renderHighlightedJson = (obj: object) => {
    const jsonStr = JSON.stringify(obj, null, 2);
    // Simple line split with color classification
    const lines = jsonStr.split('\n');

    return (
      <div className="font-mono text-xs leading-relaxed select-text">
        {lines.map((line, idx) => {
          let lineContent = line;
          // Match key
          const keyMatch = line.match(/^(\s*)(".*?")(\s*:\s*)(.*)$/);

          if (keyMatch) {
            const [, indent, key, colon, value] = keyMatch;
            let valColor = 'text-amber-300';
            if (value.startsWith('"')) {
              valColor = 'text-emerald-400';
            } else if (value === 'true' || value === 'false') {
              valColor = 'text-purple-400';
            } else if (value.startsWith('{') || value.startsWith('[')) {
              valColor = 'text-zinc-300';
            }

            return (
              <div key={idx} className="flex hover:bg-zinc-900/60 px-2 py-0.5 rounded">
                <span className="w-8 select-none text-zinc-600 text-right pr-3 shrink-0 text-[11px]">
                  {idx + 1}
                </span>
                <span className="whitespace-pre">
                  {indent}
                  <span className="text-cyan-400 font-semibold">{key}</span>
                  <span className="text-zinc-400">{colon}</span>
                  <span className={valColor}>{value}</span>
                </span>
              </div>
            );
          }

          return (
            <div key={idx} className="flex hover:bg-zinc-900/60 px-2 py-0.5 rounded">
              <span className="w-8 select-none text-zinc-600 text-right pr-3 shrink-0 text-[11px]">
                {idx + 1}
              </span>
              <span className="text-zinc-400 whitespace-pre">{lineContent}</span>
            </div>
          );
        })}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl bg-zinc-950 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden text-zinc-100 max-h-[94vh] flex flex-col ring-1 ring-cyan-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Postman / Swagger Style Header */}
        <div className="bg-zinc-900 border-b border-zinc-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-xs sm:text-sm font-mono font-bold tracking-tight text-white flex items-center gap-2">
                  <span>E-COMMERCE INVENTORY REST API :: INTERACTIVE TESTING SUITE</span>
                </h3>
              </div>
              <p className="text-[10px] sm:text-[11px] font-mono text-zinc-400">
                Environment: <span className="text-cyan-400 font-semibold">Production (api.ecommerce.internal)</span> • Node.js / Express.js • PostgreSQL 16
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-emerald-400">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>JWT RBAC GUARD: ACTIVE</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer"
              title="Close API Tester (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Workspace: Left Route Navigation / Right Interactive Request & JSON Code Sandbox */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 min-h-0">
          {/* Left Column: API Route Explorer (lg:col-span-4) */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-zinc-800 p-4 bg-zinc-900/60 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Available Endpoints</span>
                </span>
                <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">
                  v1.2.0
                </span>
              </div>

              {/* Endpoint Search Filter */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter endpoints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/60 font-mono"
                />
              </div>

              {/* Endpoint Selection List */}
              <div className="space-y-2 mt-2">
                {filteredEndpoints.map((ep) => {
                  const isSelected = selectedEndpoint.id === ep.id;
                  const isGet = ep.method === 'GET';
                  return (
                    <button
                      key={ep.id}
                      type="button"
                      onClick={() => handleSelectEndpoint(ep)}
                      className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer group flex flex-col gap-1.5 ${
                        isSelected
                          ? 'bg-cyan-950/50 border-cyan-500 ring-1 ring-cyan-500/30 shadow-md shadow-cyan-500/10'
                          : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/90'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider ${
                              isGet
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/80'
                                : 'bg-blue-950 text-blue-400 border border-blue-800/80'
                            }`}
                          >
                            {ep.method}
                          </span>
                          <span className="text-xs font-mono font-semibold text-zinc-200 group-hover:text-cyan-300 transition-colors">
                            {ep.path}
                          </span>
                        </div>

                        {ep.requiresAuth && (
                          <span
                            className="p-1 rounded bg-zinc-900 text-amber-400"
                            title="Requires JWT Bearer Auth"
                          >
                            <Lock className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-zinc-400 line-clamp-1">
                        {ep.summary}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Tech Specifications Callout */}
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-400 space-y-1">
              <span className="text-zinc-300 font-semibold block flex items-center gap-1.5">
                <Database className="w-3 h-3 text-cyan-400" />
                PostgreSQL Relational Storage
              </span>
              <p className="text-[10px] text-zinc-500">
                Connection Pool: pg-pool (Max 50) • Normalized 3NF Schema • ACID Transactions
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Request URL Bar & Syntax-Highlighted JSON Response (lg:col-span-8) */}
          <div className="lg:col-span-8 p-4 sm:p-6 bg-zinc-950 flex flex-col justify-between space-y-4 overflow-y-auto">
            <div className="space-y-4">
              {/* URL Address Bar with Send Button */}
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl p-1.5 pl-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                    selectedEndpoint.method === 'GET'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/80'
                      : 'bg-blue-950 text-blue-400 border border-blue-800/80'
                  }`}
                >
                  {selectedEndpoint.method}
                </span>

                <div className="flex-1 font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto whitespace-nowrap">
                  <span className="text-zinc-500">https://api.ecommerce.internal</span>
                  <span className="text-cyan-300 font-semibold">{selectedEndpoint.path}</span>
                </div>

                <button
                  type="button"
                  onClick={handleSendRequest}
                  disabled={isSending}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-all disabled:opacity-50 cursor-pointer shadow-sm shadow-cyan-500/20"
                >
                  {isSending ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  <span>{isSending ? 'Sending...' : 'Send'}</span>
                </button>
              </div>

              {/* Status and Telemetry Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono bg-zinc-900/60 px-3 py-2 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-zinc-500 text-[11px]">STATUS:</span>
                    <span className="font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                      {selectedEndpoint.statusCode} {selectedEndpoint.statusText}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-zinc-500 text-[11px]">TIME:</span>
                    <span className="text-zinc-300">{selectedEndpoint.responseTime}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-zinc-500 text-[11px]">SIZE:</span>
                    <span className="text-zinc-300">{selectedEndpoint.responseSize}</span>
                  </div>
                </div>

                {selectedEndpoint.requiresAuth && (
                  <span className="text-[10px] text-amber-400 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Bearer Token Authenticated
                  </span>
                )}
              </div>

              {/* Tabs: Response Body vs Request Payload vs Headers */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('response')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                      activeTab === 'response'
                        ? 'bg-zinc-800 text-white border border-zinc-700'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Response Body (JSON)
                  </button>

                  {selectedEndpoint.requestBody && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('request')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                        activeTab === 'request'
                          ? 'bg-zinc-800 text-white border border-zinc-700'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Request Payload
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveTab('headers')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                      activeTab === 'headers'
                        ? 'bg-zinc-800 text-white border border-zinc-700'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Headers
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
              </div>

              {/* Dark Mode Code Block with Syntax Highlighting */}
              <div className="bg-[#030712] border border-zinc-800/90 rounded-2xl p-3 max-h-[420px] overflow-y-auto shadow-inner">
                {isSending ? (
                  <div className="py-16 flex flex-col items-center justify-center gap-2 text-zinc-500 font-mono text-xs">
                    <RefreshCw className="w-5 h-5 animate-spin text-cyan-400" />
                    <span>Executing Express.js routing controller &amp; SQL transaction...</span>
                  </div>
                ) : activeTab === 'request' && selectedEndpoint.requestBody ? (
                  renderHighlightedJson(selectedEndpoint.requestBody)
                ) : activeTab === 'headers' ? (
                  renderHighlightedJson(selectedEndpoint.headers)
                ) : (
                  renderHighlightedJson(selectedEndpoint.responseBody)
                )}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>TypeScript • Node.js • Express.js • PostgreSQL REST Service</span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-colors cursor-pointer"
              >
                Close Explorer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
