import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PERSONAL_INFO, PROJECTS, SKILL_GROUPS } from '../data/portfolioData';
import {
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  FastForward,
  Cpu,
} from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error' | 'success';
  text: string;
  displayedText?: string;
  isTyping?: boolean;
}

export const InteractiveTerminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'system',
      text: `Alexander Christian R. Yadao — Interactive Developer CLI v2.4.0 (Spatial Engine)`,
      displayedText: `Alexander Christian R. Yadao — Interactive Developer CLI v2.4.0 (Spatial Engine)`,
      isTyping: false,
    },
    {
      id: 'init-2',
      type: 'system',
      text: `Type 'help' to list available commands ('whoami', 'skills', 'projects', 'clear').`,
      displayedText: `Type 'help' to list available commands ('whoami', 'skills', 'projects', 'clear').`,
      isTyping: false,
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<number | null>(null);
  const activeLineIdRef = useRef<string | null>(null);

  // Exact commands requested: whoami, skills, projects, clear (plus help)
  const allowedCommands = ['help', 'whoami', 'skills', 'projects', 'clear'];

  // Scroll to bottom smoothly within the terminal container
  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  // Stop current typing animation and reveal full text immediately
  const skipTyping = useCallback(() => {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    if (activeLineIdRef.current) {
      const targetId = activeLineIdRef.current;
      setLines((prev) =>
        prev.map((line) =>
          line.id === targetId
            ? { ...line, displayedText: line.text, isTyping: false }
            : line
        )
      );
      activeLineIdRef.current = null;
    }

    setIsTyping(false);
    setTimeout(scrollToBottom, 20);
  }, [scrollToBottom]);

  // Clean up any running typing timer on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
    };
  }, []);

  // Animate typing for a given output line
  const startTypingAnimation = (lineId: string, fullText: string) => {
    skipTyping();

    setIsTyping(true);
    activeLineIdRef.current = lineId;

    let currentIndex = 0;
    const totalLength = fullText.length;

    const stepSize = totalLength > 400 ? 5 : totalLength > 150 ? 3 : totalLength > 60 ? 2 : 1;
    const intervalMs = totalLength > 400 ? 12 : 15;

    typingTimerRef.current = window.setInterval(() => {
      currentIndex += stepSize;

      if (currentIndex >= totalLength) {
        if (typingTimerRef.current) {
          clearInterval(typingTimerRef.current);
          typingTimerRef.current = null;
        }
        activeLineIdRef.current = null;
        setIsTyping(false);

        setLines((prev) =>
          prev.map((line) =>
            line.id === lineId
              ? { ...line, displayedText: fullText, isTyping: false }
              : line
          )
        );
      } else {
        const nextSlice = fullText.slice(0, currentIndex);
        setLines((prev) =>
          prev.map((line) =>
            line.id === lineId
              ? { ...line, displayedText: nextSlice, isTyping: true }
              : line
          )
        );
      }

      scrollToBottom();
    }, intervalMs);
  };

  const executeCommand = (cmdInput: string) => {
    const raw = cmdInput.trim();
    if (!raw) return;

    skipTyping();

    const cmd = raw.toLowerCase();
    const inputLineId = `input-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const outputLineId = `out-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    // Special command: CLEAR
    if (cmd === 'clear') {
      const resetLineId = `sys-${Date.now()}`;
      setLines([
        {
          id: resetLineId,
          type: 'system',
          text: `Terminal output cleared. Type 'help' to view available commands.`,
          displayedText: '',
          isTyping: true,
        },
      ]);
      setInputVal('');
      startTypingAnimation(
        resetLineId,
        `Terminal output cleared. Type 'help' to view available commands.`
      );
      return;
    }

    let outputType: TerminalLine['type'] = 'output';
    let outputText = '';

    if (cmd === 'help') {
      outputType = 'output';
      outputText = `Available commands:
  whoami    - Display Alexander Christian R. Yadao's profile and bio
  skills    - List verified technical competencies and tools
  projects  - Inspect featured backend, embedded, and IoT projects
  clear     - Wipe all terminal screen output`;
    } else if (cmd === 'whoami') {
      outputType = 'output';
      outputText = `NAME: ${PERSONAL_INFO.name}
TITLE: ${PERSONAL_INFO.title}
INSTITUTION: ${PERSONAL_INFO.institution}
LOCATION: ${PERSONAL_INFO.address}
CONTACT: ${PERSONAL_INFO.email} | ${PERSONAL_INFO.phone}
LINKEDIN: ${PERSONAL_INFO.linkedin}
GITHUB: ${PERSONAL_INFO.github}

BIO:
${PERSONAL_INFO.bio}`;
    } else if (cmd === 'skills') {
      outputType = 'success';
      const skillsOutput = SKILL_GROUPS.map(
        (g) => `${g.category.toUpperCase()}:
  ${g.skills.join(', ')}`
      ).join('\n\n');
      outputText = `TECHNICAL COMPETENCIES:\n\n${skillsOutput}`;
    } else if (cmd === 'projects') {
      outputType = 'output';
      const projectsOutput = PROJECTS.map(
        (p, idx) => `[Project ${idx + 1}] ${p.title}
Role: ${p.role}
Details: ${p.details}
Tech: ${p.tags.join(', ')}`
      ).join('\n\n');
      outputText = `ENGINEERING PROJECTS:\n\n${projectsOutput}`;
    } else {
      outputType = 'error';
      outputText = `Command not found: '${raw}'. Type 'help' to view valid commands: 'whoami', 'skills', 'projects', 'clear'.`;
    }

    setLines((prev) => [
      ...prev,
      {
        id: inputLineId,
        type: 'input',
        text: `alex@pup-cpe:~$ ${raw}`,
        displayedText: `alex@pup-cpe:~$ ${raw}`,
        isTyping: false,
      },
      {
        id: outputLineId,
        type: outputType,
        text: outputText,
        displayedText: '',
        isTyping: true,
      },
    ]);

    setInputVal('');
    startTypingAnimation(outputLineId, outputText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  return (
    <section id="terminal" className="py-16 sm:py-20 scroll-mt-20 relative transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/50 border border-cyan-300 dark:border-cyan-800/50 text-cyan-700 dark:text-cyan-300 text-xs font-mono uppercase tracking-wider mb-2">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>Developer CLI Sandbox</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Interactive Terminal
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Explore Alexander&apos;s credentials, projects, and skills through an authentic, simulated command line interface with real-time output typing.
            </p>
          </div>

          {/* Quick Actions Header Toolbar */}
          <div className="flex items-center gap-2">
            {isTyping && (
              <button
                type="button"
                onClick={skipTyping}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-amber-600 dark:text-amber-300 hover:text-amber-700 dark:hover:text-amber-200 bg-amber-100/80 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 hover:border-amber-400 dark:hover:border-amber-700 transition-colors animate-pulse"
                title="Skip typing animation"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Skip Typing</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => executeCommand('clear')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-zinc-700 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Terminal</span>
            </button>
          </div>
        </div>

        {/* Spatial Terminal Window Container */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs backdrop-blur-xl transition-all">
          {/* Chrome Titlebar */}
          <div className="bg-zinc-900/90 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-zinc-400 text-xs ml-2 select-none">
                alex@pup-cpe: ~ (bash / zsh)
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono">
              {isTyping ? (
                <div className="flex items-center gap-1.5 text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-800/60">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
                  <span className="font-semibold tracking-wide">TYPING OUTPUT...</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="hidden sm:inline">LIVE INTERPRETER</span>
                </div>
              )}
            </div>
          </div>

          {/* Output Display Area */}
          <div
            ref={containerRef}
            className="p-5 sm:p-6 min-h-[300px] max-h-[440px] overflow-y-auto space-y-3 cursor-text scroll-smooth"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line) => {
              const textToRender = line.displayedText !== undefined ? line.displayedText : line.text;

              return (
                <div key={line.id} className="leading-relaxed whitespace-pre-wrap">
                  {line.type === 'input' && (
                    <span className="text-zinc-100 font-semibold">{textToRender}</span>
                  )}
                  {line.type === 'system' && (
                    <span className="text-cyan-400/90">{textToRender}</span>
                  )}
                  {line.type === 'output' && (
                    <span className="text-zinc-300">{textToRender}</span>
                  )}
                  {line.type === 'success' && (
                    <span className="text-emerald-400 font-semibold">{textToRender}</span>
                  )}
                  {line.type === 'error' && (
                    <span className="text-rose-400">{textToRender}</span>
                  )}

                  {/* Blinking Block Cursor during character-by-character typing */}
                  {line.isTyping && (
                    <span className="inline-block w-2 h-3.5 bg-emerald-400 ml-0.5 align-middle animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  )}
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Interactive Form Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-zinc-800 bg-zinc-900/60 px-4 py-3 flex items-center gap-2"
          >
            <span className="text-emerald-400 font-bold select-none">➜</span>
            <span className="text-cyan-400 font-mono select-none hidden sm:inline">
              alex@pup-cpe:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type 'help', 'whoami', 'skills', 'projects', or 'clear'..."
              className="flex-1 bg-transparent text-zinc-100 placeholder:text-zinc-600 focus:outline-none text-xs font-mono"
              autoComplete="off"
              spellCheck="false"
            />
            {isTyping ? (
              <button
                type="button"
                onClick={skipTyping}
                className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-mono border border-amber-500/30 transition-colors flex items-center gap-1"
                title="Fast forward typing output"
              >
                <FastForward className="w-3 h-3" />
                <span>Skip</span>
              </button>
            ) : (
              <button
                type="submit"
                className="p-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white transition-colors"
                title="Run command"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
            )}
          </form>

          {/* Quick-Click Command Buttons */}
          <div className="bg-zinc-950/90 px-4 py-2.5 border-t border-zinc-800/80 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] text-zinc-500 font-mono select-none mr-1">
                Click to execute:
              </span>
              {allowedCommands.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => executeCommand(cmd)}
                  className="px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 text-cyan-300 hover:text-white text-[11px] font-mono border border-zinc-800 transition-colors active:scale-95"
                >
                  {cmd}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
              <Cpu className="w-3 h-3 text-cyan-500" />
              <span className="hidden sm:inline">baud: 9600-stream</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
