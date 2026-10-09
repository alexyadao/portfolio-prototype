import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sun,
  Wind,
  Thermometer,
  Droplets,
  Zap,
  BatteryCharging,
  Wifi,
  Activity,
  CheckCircle2,
  RefreshCw,
  Compass,
  Cpu,
  Power,
  Sliders,
  Sparkles,
} from 'lucide-react';

interface IoTDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FanSpeed = 'Off' | 'Low' | 'Medium' | 'High';

interface TelemetryPoint {
  time: string;
  temp: number;
  humidity: number;
}

const INITIAL_TELEMETRY: TelemetryPoint[] = [
  { time: '12m ago', temp: 26.8, humidity: 64 },
  { time: '10m ago', temp: 27.2, humidity: 63 },
  { time: '8m ago', temp: 27.9, humidity: 61 },
  { time: '6m ago', temp: 28.3, humidity: 60 },
  { time: '4m ago', temp: 28.8, humidity: 59 },
  { time: '2m ago', temp: 28.5, humidity: 58 },
  { time: 'Now', temp: 28.6, humidity: 58.4 },
];

export const IoTDashboardModal: React.FC<IoTDashboardModalProps> = ({ isOpen, onClose }) => {
  const [fanSpeed, setFanSpeed] = useState<FanSpeed>('Medium');
  const [sunlightValue, setSunlightValue] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');
  const [telemetryData, setTelemetryData] = useState<TelemetryPoint[]>(INITIAL_TELEMETRY);

  // Animate the sunlight gauge up to 86% on open
  useEffect(() => {
    if (isOpen) {
      setSunlightValue(0);
      const timer = setTimeout(() => {
        setSunlightValue(86);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle ESC key to close
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

  // Handle Fan Speed change
  const handleFanSpeedChange = (speed: FanSpeed) => {
    setFanSpeed(speed);
  };

  const getFanStatusString = (speed: FanSpeed): string => {
    if (speed === 'Off') return 'Cooling Fan: OFF';
    return `Cooling Fan: ACTIVE (${speed})`;
  };

  const getFanPwmDetails = (speed: FanSpeed) => {
    switch (speed) {
      case 'Off':
        return { pwm: '0%', voltage: '0.0V', rpm: 0, spinDuration: '0s' };
      case 'Low':
        return { pwm: '35%', voltage: '4.2V', rpm: 1200, spinDuration: '1.8s' };
      case 'Medium':
        return { pwm: '65%', voltage: '7.8V', rpm: 2400, spinDuration: '0.9s' };
      case 'High':
        return { pwm: '100%', voltage: '12.0V', rpm: 3600, spinDuration: '0.45s' };
    }
  };

  const fanDetails = getFanPwmDetails(fanSpeed);

  // Simulate MQTT Sync
  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime('Just now');
      // slightly jitter telemetry
      setTelemetryData((prev) => [
        ...prev.slice(1),
        {
          time: 'Now',
          temp: +(28.4 + Math.random() * 0.5).toFixed(1),
          humidity: +(58 + Math.random() * 1.5).toFixed(1),
        },
      ]);
    }, 600);
  };

  // SVG Circular Gauge parameters
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (sunlightValue / 100) * circumference;

  // Chart normalization
  const minTemp = 25;
  const maxTemp = 32;
  const minHum = 50;
  const maxHum = 70;

  const chartWidth = 380;
  const chartHeight = 110;

  const getTempY = (val: number) =>
    chartHeight - ((val - minTemp) / (maxTemp - minTemp)) * (chartHeight - 20) - 10;
  const getHumY = (val: number) =>
    chartHeight - ((val - minHum) / (maxHum - minHum)) * (chartHeight - 20) - 10;

  const getX = (idx: number) => (idx / (telemetryData.length - 1)) * (chartWidth - 40) + 20;

  const tempPoints = telemetryData.map((d, i) => `${getX(i)},${getTempY(d.temp)}`).join(' ');
  const humPoints = telemetryData.map((d, i) => `${getX(i)},${getHumY(d.humidity)}`).join(' ');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-zinc-950 border border-teal-500/30 rounded-2xl shadow-2xl overflow-hidden text-zinc-100 max-h-[94vh] flex flex-col ring-1 ring-teal-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Arduino IoT Cloud Command Header */}
        <div className="bg-zinc-900 border-b border-zinc-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            {/* Arduino Brand Teal Emblem */}
            <div className="w-8 h-8 rounded-xl bg-[#008184]/20 border border-[#00979D]/50 flex items-center justify-center text-[#00979D] shadow-inner font-bold text-xs font-mono">
              ∞
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-xs sm:text-sm font-mono font-bold tracking-tight text-white flex items-center gap-2">
                  <span>ARDUINO IoT CLOUD :: SOLAR HARVESTING RIG</span>
                </h3>
              </div>
              <p className="text-[10px] sm:text-[11px] font-mono text-zinc-400">
                Device: <span className="text-teal-400 font-semibold">MKR-WIFI-1010-SOLAR</span> • Protocol: MQTT/TLS • Broker: iot.arduino.cc
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Real-time MQTT telemetry badge */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-teal-400">
              <Wifi className="w-3 h-3 text-teal-400" />
              <span>MQTT CONNECTED ({lastSyncTime})</span>
            </div>

            <button
              type="button"
              onClick={handleManualSync}
              disabled={isSyncing}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer"
              title="Sync MQTT data feed"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-teal-400' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer"
              title="Close modal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Top Row: Sunlight Gauge (Left) & Fan Regulator (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Widget 1: Sunlight Intensity Circular Progress Gauge (md:col-span-6) */}
            <div className="md:col-span-6 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-amber-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
              {/* Subtle solar radial glow in background */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

              <div className="flex items-center justify-between mb-3 z-10">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Sunlight Intensity &amp; Tracking</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-950/60 text-amber-300 border border-amber-800/60">
                  KY-018 SENSOR ARRAY
                </span>
              </div>

              {/* Circular Gauge Centerpiece */}
              <div className="py-2 flex flex-col sm:flex-row items-center justify-center gap-6 z-10">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 130 130">
                    {/* Background track */}
                    <circle
                      cx="65"
                      cy="65"
                      r={radius}
                      fill="none"
                      stroke="#27272a"
                      strokeWidth="10"
                    />
                    {/* Animated Progress Arc */}
                    <circle
                      cx="65"
                      cy="65"
                      r={radius}
                      fill="none"
                      stroke="url(#solarGradient)"
                      strokeWidth="10"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="solarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="50%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Centered Gauge Value Readout */}
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-mono font-extrabold text-white tracking-tight drop-shadow-md">
                      {sunlightValue}%
                    </span>
                    <span className="text-[9px] font-mono text-amber-400 tracking-wider uppercase font-semibold">
                      INTENSITY
                    </span>
                  </div>
                </div>

                {/* Tracking Telemetry Specs */}
                <div className="space-y-2 text-xs font-mono text-zinc-300 w-full sm:w-auto">
                  <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-zinc-400">Light Level:</span>
                    <span className="font-bold text-amber-300">84,250 LUX</span>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-zinc-400">Tracking Lock:</span>
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      OPTIMAL (99%)
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-zinc-400">Servo Position:</span>
                    <span className="font-semibold text-white">AZ: 142° | EL: 58°</span>
                  </div>
                </div>
              </div>

              {/* Bottom Differential LDR Balance Bar */}
              <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-400 z-10">
                <span>Dual LDRs: LDR-East (87%) vs LDR-West (85%)</span>
                <span className="text-amber-400 font-semibold">Diff &lt; 2% Balanced</span>
              </div>
            </div>

            {/* Widget 2: Fan Regulator Control Panel (md:col-span-6) */}
            <div className="md:col-span-6 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-cyan-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
              {/* Subtle cyan ambient glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

              <div>
                <div className="flex items-center justify-between mb-3 z-10">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Wind className="w-4 h-4 text-cyan-400" />
                    <span>Cooling Fan Regulator</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-800/60">
                    PWM STEP-CONTROL
                  </span>
                </div>

                {/* Animated Fan Blade Graphic & Live Status String */}
                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    {/* Spinning Fan SVG Icon */}
                    <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Wind
                        className={`w-6 h-6 ${
                          fanSpeed !== 'Off' ? 'animate-spin' : ''
                        }`}
                        style={{
                          animationDuration: fanDetails.spinDuration,
                        }}
                      />
                    </div>

                    <div>
                      {/* Required Live Status String */}
                      <p className="text-xs sm:text-sm font-mono font-bold text-white">
                        {getFanStatusString(fanSpeed)}
                      </p>
                      <p className="text-[10px] font-mono text-cyan-300/80">
                        {fanDetails.rpm} RPM • Output: {fanDetails.voltage} ({fanDetails.pwm} PWM)
                      </p>
                    </div>
                  </div>

                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      fanSpeed === 'Off' ? 'bg-zinc-600' : 'bg-emerald-400 animate-ping'
                    }`}
                  />
                </div>

                {/* Clickable Speed Buttons: [Off] [Low] [Medium] [High] */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                    Speed Regulator Switch:
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {(['Off', 'Low', 'Medium', 'High'] as FanSpeed[]).map((speed) => {
                      const isActive = fanSpeed === speed;
                      return (
                        <button
                          key={speed}
                          type="button"
                          onClick={() => handleFanSpeedChange(speed)}
                          className={`py-2 px-2 rounded-xl font-mono text-xs font-bold transition-all text-center border cursor-pointer ${
                            isActive
                              ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white border-cyan-400 ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-500/20 scale-102'
                              : 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:border-cyan-500/40 hover:bg-zinc-850'
                          }`}
                        >
                          {speed}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Thermal Protection Note */}
              <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span>Thermal Trigger: Auto-engages High if Temp &gt; 35°C</span>
                <span className="text-cyan-400 font-semibold">MOSFET Driver OK</span>
              </div>
            </div>
          </div>

          {/* Widget 3: Stylized CSS/SVG Line Chart for Live Temperature and Humidity Data */}
          <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-400" />
                <h4 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-white">
                  Environmental Telemetry Over Time (DHT22 / SHT31)
                </h4>
              </div>

              {/* Legend & Current Readings */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-orange-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span className="font-semibold">Temp: 28.6°C</span>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  <span className="font-semibold">Humidity: 58.4%</span>
                </div>
              </div>
            </div>

            {/* Stylized SVG Chart Area */}
            <div className="w-full bg-[#020a08] border border-zinc-800/90 rounded-xl p-3 relative overflow-hidden">
              {/* Chart Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#14b8a60a_1px,transparent_1px),linear-gradient(to_bottom,#14b8a60a_1px,transparent_1px)] bg-[size:28px_22px] pointer-events-none" />

              <div className="h-32 w-full">
                <svg className="w-full h-full" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="humGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Guideline */}
                  <line x1="10" y1={chartHeight / 2} x2={chartWidth - 10} y2={chartHeight / 2} stroke="#27272a" strokeDasharray="3 3" />

                  {/* Temperature Area & Line */}
                  <polyline
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={tempPoints}
                  />

                  {/* Humidity Area & Line */}
                  <polyline
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="4 2"
                    points={humPoints}
                  />

                  {/* Glowing Data Point Dots */}
                  {telemetryData.map((d, i) => (
                    <g key={i}>
                      <circle cx={getX(i)} cy={getTempY(d.temp)} r="3" fill="#f97316" stroke="#ffffff" strokeWidth="1" />
                      <circle cx={getX(i)} cy={getHumY(d.humidity)} r="2.5" fill="#06b6d4" />
                    </g>
                  ))}
                </svg>
              </div>

              {/* Time Axis Labels */}
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 pt-1 px-2 border-t border-zinc-800/60">
                {telemetryData.map((d, i) => (
                  <span key={i}>{d.time}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row: Solar Energy Harvesting & Emergency Power Subsystem */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block">PV SOLAR HARVESTING</span>
                <span className="font-bold text-white text-xs">24.8 Watts (18.2V MPPT)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <BatteryCharging className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block">LiFePO4 BATTERY BANK</span>
                <span className="font-bold text-white text-xs">12.6V (98% Charged)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block">EMERGENCY USB OUT</span>
                <span className="font-bold text-teal-300 text-xs">5.0V / 2.1A READY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="bg-zinc-900/90 border-t border-zinc-800 px-4 sm:px-6 py-3 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Arduino IoT Cloud Thesis Telemetry Rig • Polytechnic University of the Philippines</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-colors cursor-pointer"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
