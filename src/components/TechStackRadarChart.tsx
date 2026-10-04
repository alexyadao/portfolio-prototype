import React, { useState } from 'react';
import { ProjectMetrics } from '../types';
import {
  Activity,
  Cpu,
  Database,
  ShieldCheck,
  Zap,
  Layers,
} from 'lucide-react';

interface TechStackRadarChartProps {
  metrics: ProjectMetrics;
}

export const TechStackRadarChart: React.FC<TechStackRadarChartProps> = ({ metrics }) => {
  const [activeAxisIndex, setActiveAxisIndex] = useState<number | null>(null);

  // Define the 5 core architectural evaluation axes
  const axes = [
    {
      key: 'backendIntensity',
      label: 'Backend Intensity',
      shortLabel: 'Backend',
      value: metrics.backendIntensity ?? 80,
      icon: Database,
      color: '#06b6d4', // cyan-500
    },
    {
      key: 'systemComplexity',
      label: 'System Complexity',
      shortLabel: 'Complexity',
      value: metrics.systemComplexity ?? 85,
      icon: Layers,
      color: '#6366f1', // indigo-500
    },
    {
      key: 'performanceOptimization',
      label: 'Performance Optimization',
      shortLabel: 'Performance',
      value: metrics.performanceOptimization ?? 90,
      icon: Zap,
      color: '#10b981', // emerald-500
    },
    {
      key: 'hardwareInterfacing',
      label: 'Hardware & Embedded',
      shortLabel: 'Hardware',
      value: metrics.hardwareInterfacing ?? 50,
      icon: Cpu,
      color: '#f59e0b', // amber-500
    },
    {
      key: 'securityReliability',
      label: 'Security & Reliability',
      shortLabel: 'Security',
      value: metrics.securityReliability ?? 85,
      icon: ShieldCheck,
      color: '#8b5cf6', // violet-500
    },
  ];

  const numAxes = axes.length;
  const size = 260;
  const center = size / 2;
  const radius = 78;

  // Compute coordinate on polygon given axis index and relative value (0 to 1)
  const getCoordinates = (index: number, scale: number) => {
    // Start from top (-PI/2) and rotate clockwise
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / numAxes;
    const x = center + radius * scale * Math.cos(angle);
    const y = center + radius * scale * Math.sin(angle);
    return { x, y, angle };
  };

  // Concentric radar web levels: 25%, 50%, 75%, 100%
  const levels = [0.25, 0.5, 0.75, 1.0];

  const getPolygonPoints = (scale: number) => {
    return Array.from({ length: numAxes }, (_, i) => {
      const { x, y } = getCoordinates(i, scale);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  // Data polygon points
  const dataPoints = axes
    .map((axis, i) => {
      const scale = Math.max(0.1, Math.min(1.0, axis.value / 100));
      const { x, y } = getCoordinates(i, scale);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <div className="bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-500" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
            Tech Stack Radar & Intensity Matrix
          </h3>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
          Multi-Axis Telemetry
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* SVG Radar Chart (Left/Top) */}
        <div className="md:col-span-6 flex flex-col items-center justify-center relative">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full max-w-[250px] aspect-square overflow-visible select-none"
          >
            <defs>
              {/* Radar fill gradient */}
              <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#6366f1" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.25" />
              </linearGradient>

              {/* Stroke gradient */}
              <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>

              {/* Node glow filter */}
              <filter id="radarGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Concentric Grid Rings */}
            {levels.map((level, lIdx) => (
              <polygon
                key={lIdx}
                points={getPolygonPoints(level)}
                className="fill-zinc-500/5 dark:fill-zinc-400/5 stroke-zinc-200 dark:stroke-zinc-800"
                strokeWidth={level === 1.0 ? '1.5' : '1'}
                strokeDasharray={level === 1.0 ? undefined : '2,2'}
              />
            ))}

            {/* Radial Spokes connecting center to vertices */}
            {axes.map((_, i) => {
              const { x, y } = getCoordinates(i, 1.0);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  className="stroke-zinc-200 dark:stroke-zinc-800"
                  strokeWidth="1"
                />
              );
            })}

            {/* Data Polygon Fill & Outline */}
            <polygon
              points={dataPoints}
              fill="url(#radarGradient)"
              stroke="url(#radarStroke)"
              strokeWidth="2.2"
              className="transition-all duration-500 filter drop-shadow-[0_2px_8px_rgba(6,182,212,0.3)]"
            />

            {/* Data Nodes & Text Badges */}
            {axes.map((axis, i) => {
              const scale = Math.max(0.1, Math.min(1.0, axis.value / 100));
              const { x, y } = getCoordinates(i, scale);
              const labelCoord = getCoordinates(i, 1.25);
              const isHovered = activeAxisIndex === i;

              return (
                <g key={axis.key}>
                  {/* Outer vertex circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 5.5 : 4}
                    fill={axis.color}
                    className="stroke-white dark:stroke-zinc-950 transition-all duration-200 cursor-pointer"
                    strokeWidth="2"
                    filter="url(#radarGlow)"
                    onMouseEnter={() => setActiveAxisIndex(i)}
                    onMouseLeave={() => setActiveAxisIndex(null)}
                  />

                  {/* Axis Label Text */}
                  <text
                    x={labelCoord.x}
                    y={labelCoord.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className={`text-[9.5px] font-mono transition-colors duration-200 ${
                      isHovered
                        ? 'fill-cyan-600 dark:fill-cyan-400 font-bold'
                        : 'fill-zinc-500 dark:fill-zinc-400'
                    }`}
                  >
                    {axis.shortLabel}
                  </text>
                </g>
              );
            })}

            {/* Center Core Dot */}
            <circle
              cx={center}
              cy={center}
              r="2.5"
              className="fill-zinc-400 dark:fill-zinc-600"
            />
          </svg>

          {/* Quick Active Metric Pill */}
          <div className="mt-1 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 text-center">
            {activeAxisIndex !== null ? (
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                {axes[activeAxisIndex].label}: {axes[activeAxisIndex].value}%
              </span>
            ) : (
              <span>Hover over vertices to inspect telemetry</span>
            )}
          </div>
        </div>

        {/* Breakdown Metric Bars (Right/Bottom) */}
        <div className="md:col-span-6 space-y-2.5">
          {axes.map((axis, idx) => {
            const Icon = axis.icon;
            const isHovered = activeAxisIndex === idx;

            return (
              <div
                key={axis.key}
                onMouseEnter={() => setActiveAxisIndex(idx)}
                onMouseLeave={() => setActiveAxisIndex(null)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isHovered
                    ? 'bg-cyan-50/80 dark:bg-cyan-950/40 border-cyan-400 dark:border-cyan-800 shadow-xs'
                    : 'bg-zinc-50/70 dark:bg-zinc-950/50 border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" style={{ color: axis.color }} />
                    <span
                      className={`font-medium ${
                        isHovered
                          ? 'text-zinc-900 dark:text-white font-semibold'
                          : 'text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      {axis.label}
                    </span>
                  </div>

                  <span className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {axis.value}%
                  </span>
                </div>

                {/* Progress Intensity Bar */}
                <div className="w-full h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${axis.value}%`,
                      backgroundColor: axis.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
