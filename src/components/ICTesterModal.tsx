import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Cpu,
  Activity,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Zap,
  Sparkles,
  Sliders,
  Volume2,
  VolumeX,
  RotateCcw,
  Check,
} from 'lucide-react';

interface ICTesterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ICDefinition {
  partNumber: string;
  name: string;
  category: 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR' | 'Flip-Flop';
  pins: number;
  description: string;
  booleanLogic: string;
  pinoutSummary: string;
  truthTable: Array<{ inA: string; inB?: string; out: string }>;
}

const IC_CATALOG: ICDefinition[] = [
  {
    partNumber: '7408',
    name: 'Quad 2-Input AND Gate',
    category: 'AND',
    pins: 14,
    description: 'Contains four independent 2-input positive logic AND gates.',
    booleanLogic: 'Y = A • B',
    pinoutSummary: 'Pin 1: 1A, Pin 2: 1B, Pin 3: 1Y | VCC: 14, GND: 7',
    truthTable: [
      { inA: '0', inB: '0', out: '0' },
      { inA: '0', inB: '1', out: '0' },
      { inA: '1', inB: '0', out: '0' },
      { inA: '1', inB: '1', out: '1' },
    ],
  },
  {
    partNumber: '7432',
    name: 'Quad 2-Input OR Gate',
    category: 'OR',
    pins: 14,
    description: 'Contains four independent 2-input positive logic OR gates.',
    booleanLogic: 'Y = A + B',
    pinoutSummary: 'Pin 1: 1A, Pin 2: 1B, Pin 3: 1Y | VCC: 14, GND: 7',
    truthTable: [
      { inA: '0', inB: '0', out: '0' },
      { inA: '0', inB: '1', out: '1' },
      { inA: '1', inB: '0', out: '1' },
      { inA: '1', inB: '1', out: '1' },
    ],
  },
  {
    partNumber: '7404',
    name: 'Hex Inverter (NOT)',
    category: 'NOT',
    pins: 14,
    description: 'Contains six independent inverter gates performing Boolean inversion.',
    booleanLogic: 'Y = Ā (NOT A)',
    pinoutSummary: 'Pin 1: 1A, Pin 2: 1Y, Pin 3: 2A, Pin 4: 2Y | VCC: 14, GND: 7',
    truthTable: [
      { inA: '0', out: '1' },
      { inA: '1', out: '0' },
    ],
  },
  {
    partNumber: '7400',
    name: 'Quad 2-Input NAND Gate',
    category: 'NAND',
    pins: 14,
    description: 'Universal logic building block; four independent 2-input NAND gates.',
    booleanLogic: 'Y = (A • B)̄',
    pinoutSummary: 'Pin 1: 1A, Pin 2: 1B, Pin 3: 1Y | VCC: 14, GND: 7',
    truthTable: [
      { inA: '0', inB: '0', out: '1' },
      { inA: '0', inB: '1', out: '1' },
      { inA: '1', inB: '0', out: '1' },
      { inA: '1', inB: '1', out: '0' },
    ],
  },
  {
    partNumber: '7402',
    name: 'Quad 2-Input NOR Gate',
    category: 'NOR',
    pins: 14,
    description: 'Four independent 2-input NOR gates (outputs are on pins 1, 4, 10, 13).',
    booleanLogic: 'Y = (A + B)̄',
    pinoutSummary: 'Pin 1: 1Y, Pin 2: 1A, Pin 3: 1B | VCC: 14, GND: 7',
    truthTable: [
      { inA: '0', inB: '0', out: '1' },
      { inA: '0', inB: '1', out: '0' },
      { inA: '1', inB: '0', out: '0' },
      { inA: '1', inB: '1', out: '0' },
    ],
  },
  {
    partNumber: '7486',
    name: 'Quad 2-Input XOR Gate',
    category: 'XOR',
    pins: 14,
    description: 'Exclusive-OR logic gates utilized for binary addition and parity.',
    booleanLogic: 'Y = A ⊕ B',
    pinoutSummary: 'Pin 1: 1A, Pin 2: 1B, Pin 3: 1Y | VCC: 14, GND: 7',
    truthTable: [
      { inA: '0', inB: '0', out: '0' },
      { inA: '0', inB: '1', out: '1' },
      { inA: '1', inB: '0', out: '1' },
      { inA: '1', inB: '1', out: '0' },
    ],
  },
  {
    partNumber: '74266',
    name: 'Quad 2-Input XNOR Gate',
    category: 'XNOR',
    pins: 14,
    description: 'Equivalence gates with open-collector outputs for wire-AND configurations.',
    booleanLogic: 'Y = (A ⊕ B)̄',
    pinoutSummary: 'Pin 1: 1A, Pin 2: 1B, Pin 3: 1Y (OC) | VCC: 14, GND: 7',
    truthTable: [
      { inA: '0', inB: '0', out: '1' },
      { inA: '0', inB: '1', out: '0' },
      { inA: '1', inB: '0', out: '0' },
      { inA: '1', inB: '1', out: '1' },
    ],
  },
  {
    partNumber: '7473/7474',
    name: 'Dual Flip-Flop (Sequential)',
    category: 'Flip-Flop',
    pins: 14,
    description: 'Dual D-Type / J-K positive-edge-triggered bistable multivibrators.',
    booleanLogic: 'Q(t+1) = D / JQ̄ + K̄Q',
    pinoutSummary: 'Pin 1: 1CLR, Pin 2: 1D, Pin 3: 1CLK, Pin 5: 1Q | VCC: 14, GND: 7',
    truthTable: [
      { inA: 'CLK ↑', inB: 'D: 0', out: 'Q: 0' },
      { inA: 'CLK ↑', inB: 'D: 1', out: 'Q: 1' },
      { inA: 'CLK 0', inB: 'D: X', out: 'Q: Q0' },
    ],
  },
];

export const ICTesterModal: React.FC<ICTesterModalProps> = ({ isOpen, onClose }) => {
  const [selectedIC, setSelectedIC] = useState<ICDefinition | null>(IC_CATALOG[0]);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<'PASS' | 'FAIL' | null>('PASS');
  const [faultInjection, setFaultInjection] = useState<boolean>(false);
  const [isLeverLocked, setIsLeverLocked] = useState<boolean>(true);
  const [waveformOffset, setWaveformOffset] = useState<number>(0);
  const [gateDetails, setGateDetails] = useState<string[]>([]);

  // Animate waveform during diagnostic test
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTesting) {
      interval = setInterval(() => {
        setWaveformOffset((prev) => (prev + 12) % 120);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isTesting]);

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

  // Trigger diagnostic test sequence
  const runTestOnIC = (ic: ICDefinition, forceFault?: boolean) => {
    setSelectedIC(ic);
    setIsTesting(true);
    setTestResult(null);
    setIsLeverLocked(false);

    // After brief mechanical delay, lock the ZIF lever
    setTimeout(() => {
      setIsLeverLocked(true);
    }, 250);

    // 2-second diagnostic test simulation
    setTimeout(() => {
      setIsTesting(false);
      const willFail = forceFault !== undefined ? forceFault : faultInjection;
      if (willFail) {
        setTestResult('FAIL');
        setGateDetails([
          'GATE 1: IN(1,2) -> OUT(3) [PASS]',
          'GATE 2: IN(4,5) -> OUT(6) [FAIL: STUCK-AT-LOW]',
          'GATE 3: IN(9,10) -> OUT(8) [PASS]',
          'GATE 4: IN(12,13) -> OUT(11) [PASS]',
        ]);
      } else {
        setTestResult('PASS');
        setGateDetails([
          'GATE 1: IN(1,2) -> OUT(3) [PASS]',
          'GATE 2: IN(4,5) -> OUT(6) [PASS]',
          'GATE 3: IN(9,10) -> OUT(8) [PASS]',
          'GATE 4: IN(12,13) -> OUT(11) [PASS]',
        ]);
      }
    }, 2000);
  };

  const handleEjectIC = () => {
    setIsLeverLocked(false);
    setSelectedIC(null);
    setTestResult(null);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden text-zinc-100 max-h-[94vh] flex flex-col ring-1 ring-emerald-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Industrial Chassis Enclosure Header */}
        <div className="bg-zinc-900 border-b border-zinc-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            {/* Hex mounting screw styling */}
            <div className="w-3.5 h-3.5 rounded-full border border-zinc-600 bg-zinc-800 flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-0.5 bg-zinc-400 rotate-45" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-xs sm:text-sm font-mono font-bold tracking-tight text-white flex items-center gap-2">
                  <span>PMCT-001 :: PORTABLE MULTI-FUNCTION IC TESTER</span>
                </h3>
              </div>
              <p className="text-[10px] sm:text-[11px] font-mono text-zinc-400">
                PUP CpE Thesis Lab System • Hardware Diagnostic Interface • Logic Validator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Regulated Voltage Indicator */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-emerald-400">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>VCC: +5.00V DC REG</span>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer"
              title="Close simulator (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Top Half: Physical Hardware Representation (ZIF Socket on Left, Dark LCD on Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Left: 14-Pin Light Blue ZIF Socket with Microchip */}
            <div className="md:col-span-5 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between items-center shadow-inner relative overflow-hidden">
              <div className="w-full flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-2">
                <span className="flex items-center gap-1 text-sky-400 font-bold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>ZERO INSERTION FORCE (ZIF) SOCKET</span>
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  14-PIN DIP
                </span>
              </div>

              {/* Physical Socket Frame */}
              <div className="relative py-2 flex items-center justify-center">
                {/* ZIF Lever Handle (rotates when engaged) */}
                <div className="absolute -left-6 top-3 flex flex-col items-center">
                  <div
                    className={`w-3.5 h-16 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 shadow-md transition-transform duration-300 origin-bottom border border-amber-300 ${
                      isLeverLocked ? 'rotate-[-70deg]' : 'rotate-0'
                    }`}
                  />
                  <span className="text-[8px] font-mono text-amber-400 mt-1 uppercase">
                    {isLeverLocked ? 'Locked' : 'Open'}
                  </span>
                </div>

                {/* Classic Cyan/Light-Blue ZIF Socket Chassis */}
                <div className="w-48 bg-[#0284c7] border-2 border-[#0369a1] rounded-lg p-2.5 shadow-xl relative select-none">
                  {/* Pin 1 orientation notch */}
                  <div className="w-6 h-2 rounded-b-md bg-[#0369a1] mx-auto mb-2 border-b border-sky-400/40" />

                  {/* Dual row of 7 socket holes per side (14 pins total) */}
                  <div className="flex justify-between items-center px-2 py-1">
                    {/* Left Pins (1 to 7) */}
                    <div className="flex flex-col gap-2">
                      {[1, 2, 3, 4, 5, 6, 7].map((pin) => (
                        <div key={pin} className="flex items-center gap-1.5">
                          <span className="text-[8px] font-mono text-sky-200 w-2.5 text-right font-bold">
                            {pin}
                          </span>
                          <div className="w-3 h-2 rounded-xs bg-[#082f49] border border-sky-300/40 flex items-center justify-center shadow-inner">
                            <div className="w-1.5 h-0.5 bg-amber-300/60" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Central Channel / IC Seat Area */}
                    <div className="w-20 min-h-[140px] flex items-center justify-center relative">
                      <AnimatePresence mode="wait">
                        {selectedIC ? (
                          <motion.div
                            key={selectedIC.partNumber}
                            initial={{ y: -30, opacity: 0, scale: 0.92 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: -25, opacity: 0, scale: 0.9 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 220 }}
                            className="w-18 bg-zinc-950 border border-zinc-700 rounded-md py-3 px-1.5 shadow-2xl flex flex-col items-center justify-between z-10 cursor-pointer"
                            title="Dual In-line Package (DIP-14) Microchip"
                          >
                            {/* IC Package Top Notch & Pin 1 dot */}
                            <div className="w-full flex items-center justify-between px-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                              <div className="w-3 h-1 bg-zinc-700 rounded-b" />
                              <div className="w-1.5 h-1.5" />
                            </div>

                            {/* Laser Etched IC Label */}
                            <div className="py-2 text-center">
                              <span className="text-[10px] font-mono font-bold text-zinc-100 tracking-tight block">
                                SN{selectedIC.partNumber}N
                              </span>
                              <span className="text-[7px] font-mono text-zinc-400 block tracking-widest mt-0.5">
                                TI • MALAYSIA
                              </span>
                              <span className="text-[8px] font-mono text-cyan-400 font-semibold block mt-1">
                                {selectedIC.category}
                              </span>
                            </div>

                            {/* Laser Lot Code */}
                            <span className="text-[6px] font-mono text-zinc-500">
                              DUT#2488
                            </span>
                          </motion.div>
                        ) : (
                          <div className="text-[9px] font-mono text-sky-200/60 text-center px-1">
                            [ EMPTY ZIF ]
                          </div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Right Pins (14 down to 8) */}
                    <div className="flex flex-col gap-2">
                      {[14, 13, 12, 11, 10, 9, 8].map((pin) => (
                        <div key={pin} className="flex items-center gap-1.5">
                          <div className="w-3 h-2 rounded-xs bg-[#082f49] border border-sky-300/40 flex items-center justify-center shadow-inner">
                            <div className="w-1.5 h-0.5 bg-amber-300/60" />
                          </div>
                          <span className="text-[8px] font-mono text-sky-200 w-2.5 font-bold">
                            {pin}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Socket Status Subtitle */}
              <div className="w-full mt-2 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span>
                  DUT:{' '}
                  <span className="text-white font-semibold">
                    {selectedIC ? `SN${selectedIC.partNumber}N` : 'NO CHIP SEATED'}
                  </span>
                </span>
                {selectedIC && (
                  <button
                    type="button"
                    onClick={handleEjectIC}
                    className="text-[10px] text-amber-400 hover:text-amber-300 underline cursor-pointer"
                  >
                    Eject IC
                  </button>
                )}
              </div>
            </div>

            {/* Right: Dark Retro LCD Screen with Glowing Matrix Output */}
            <div className="md:col-span-7 bg-[#020d0a] border-2 border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden ring-1 ring-emerald-500/30">
              {/* Subtle CRT scanline overlay effect */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none" />

              <div>
                {/* LCD Top Status Bar */}
                <div className="flex items-center justify-between border-b border-emerald-950 pb-2 mb-3 text-[10px] font-mono text-emerald-400/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>DOT MATRIX LCD 20x4 • PMCT-001</span>
                  </div>
                  <span>CLOCK: 1000 Hz</span>
                </div>

                {/* Main LCD Diagnostic Readout */}
                <div className="font-mono text-xs sm:text-sm text-emerald-400 space-y-2 select-none leading-relaxed">
                  {isTesting ? (
                    <div className="space-y-2 animate-pulse">
                      <p className="font-bold text-emerald-300">
                        [ SYSTEM ] : INITIATING DIAGNOSTIC...
                      </p>
                      <p className="text-xs text-emerald-400/90">
                        APPLYING TEST VECTORS: 00 -&gt; 01 -&gt; 10 -&gt; 11
                      </p>
                      <p className="text-xs text-emerald-500">
                        ADC VOLTAGE PROBE: SAMPLING HIGH/LOW THRESHOLDS...
                      </p>
                    </div>
                  ) : selectedIC && testResult ? (
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-950/80 pb-2">
                        <p className="font-bold text-white text-sm">
                          [ TARGET ] : {selectedIC.partNumber} {selectedIC.name}
                        </p>
                        <span
                          className={`px-2.5 py-0.5 rounded text-xs font-bold tracking-wider font-mono ${
                            testResult === 'PASS'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500 shadow-sm shadow-emerald-500/20'
                              : 'bg-red-950 text-red-400 border border-red-500'
                          }`}
                        >
                          [ STATUS ] : LOGIC {testResult}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-emerald-300/90 pt-1">
                        <div>
                          <span className="text-[10px] text-emerald-500 block">BOOLEAN LOGIC:</span>
                          <span className="font-bold text-white">{selectedIC.booleanLogic}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-emerald-500 block">GATE COUNT:</span>
                          <span className="text-white font-semibold">4 Logic Units</span>
                        </div>
                      </div>

                      {/* Gate Verification Breakdown */}
                      <div className="bg-emerald-950/20 p-2 rounded border border-emerald-950 text-[11px] space-y-1">
                        {gateDetails.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-emerald-300">
                            <span className="text-emerald-500">•</span>
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 text-center text-emerald-400/60 text-xs">
                      [ SYSTEM READY ]
                      <br />
                      SELECT A DIGITAL IC CHIP BELOW TO MOUNT AND RUN AUTOMATED DIAGNOSTIC
                    </div>
                  )}
                </div>
              </div>

              {/* Oscilloscope Square Waveform Monitor (Sub-Display) */}
              <div className="mt-4 pt-3 border-t border-emerald-950 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-500">
                  <span className="flex items-center gap-1">
                    <Activity className="w-3 h-3 text-emerald-400" />
                    <span>LOGIC CLOCK WAVEFORM (TEST VECTOR STROBE)</span>
                  </span>
                  <span>{isTesting ? 'SIGNAL ACTIVE' : 'STEADY STATE'}</span>
                </div>

                <div className="h-14 w-full bg-[#010907] border border-emerald-900/60 rounded-lg p-1 relative overflow-hidden flex items-center shadow-inner">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#05966915_1px,transparent_1px),linear-gradient(to_bottom,#05966915_1px,transparent_1px)] bg-[size:16px_14px]" />

                  {/* Animated Square Wave SVG */}
                  <svg className="w-full h-full" viewBox="0 0 400 48" preserveAspectRatio="none">
                    <path
                      d={`M ${-waveformOffset} 38 
                          L ${20 - waveformOffset} 38 L ${20 - waveformOffset} 10 L ${50 - waveformOffset} 10 L ${50 - waveformOffset} 38
                          L ${80 - waveformOffset} 38 L ${80 - waveformOffset} 10 L ${110 - waveformOffset} 10 L ${110 - waveformOffset} 38
                          L ${140 - waveformOffset} 38 L ${140 - waveformOffset} 10 L ${170 - waveformOffset} 10 L ${170 - waveformOffset} 38
                          L ${200 - waveformOffset} 38 L ${200 - waveformOffset} 10 L ${230 - waveformOffset} 10 L ${230 - waveformOffset} 38
                          L ${260 - waveformOffset} 38 L ${260 - waveformOffset} 10 L ${290 - waveformOffset} 10 L ${290 - waveformOffset} 38
                          L ${320 - waveformOffset} 38 L ${320 - waveformOffset} 10 L ${350 - waveformOffset} 10 L ${350 - waveformOffset} 38
                          L ${380 - waveformOffset} 38 L ${380 - waveformOffset} 10 L ${410 - waveformOffset} 10 L ${410 - waveformOffset} 38
                          L ${440 - waveformOffset} 38 L ${440 - waveformOffset} 10 L ${470 - waveformOffset} 10 L ${470 - waveformOffset} 38
                          L ${500 - waveformOffset} 38`}
                      fill="none"
                      stroke={testResult === 'FAIL' ? '#ef4444' : '#10b981'}
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Half: Tactile IC Selector Control Panel */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
              <div>
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-200 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-500" />
                  <span>Integrated Circuit (IC) Test Library</span>
                </h4>
                <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                  Click any logic IC chip below to simulate insertion and automated diagnostic verification
                </p>
              </div>

              {/* Fault Injection Simulation Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-400">Fault Injection Mode:</span>
                <button
                  type="button"
                  onClick={() => setFaultInjection(!faultInjection)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all border cursor-pointer ${
                    faultInjection
                      ? 'bg-red-950/80 border-red-500 text-red-300 shadow-sm shadow-red-500/20'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-600'
                  }`}
                  title="Toggle to simulate testing a defective IC with logic gate failure"
                >
                  {faultInjection ? 'FAULT SIMULATION (ON)' : 'NORMAL (100% PASS)'}
                </button>
              </div>
            </div>

            {/* Grid of Tested IC Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {IC_CATALOG.map((ic) => {
                const isSelected = selectedIC?.partNumber === ic.partNumber;
                return (
                  <button
                    key={ic.partNumber}
                    type="button"
                    disabled={isTesting}
                    onClick={() => runTestOnIC(ic)}
                    className={`p-3 rounded-xl border text-left transition-all relative group cursor-pointer disabled:opacity-60 ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-500 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-500/10'
                        : 'bg-zinc-950/70 border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-bold text-white group-hover:text-cyan-300 transition-colors">
                        74{ic.partNumber.slice(-2)}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                        {ic.category}
                      </span>
                    </div>

                    <p className="text-[11px] font-semibold text-zinc-300 truncate">
                      {ic.name}
                    </p>
                    <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                      {ic.booleanLogic}
                    </p>

                    {isSelected && (
                      <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Re-Test Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400">
              <span>
                Microcontroller Core:{' '}
                <span className="text-cyan-400 font-semibold">ESP32 Dual-Core @ 240MHz</span>
              </span>

              {selectedIC && (
                <button
                  type="button"
                  disabled={isTesting}
                  onClick={() => runTestOnIC(selectedIC)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all disabled:opacity-50 cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                  <span>{isTesting ? 'Running Diagnostic...' : `Re-Test ${selectedIC.partNumber}`}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
