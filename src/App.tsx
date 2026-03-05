import React, { useState, useEffect, useRef } from 'react';
import { TerminalOutput } from './components/TerminalOutput';
import { DATA } from './data/resume';
import { useTheme } from './context/ThemeContext';
import { MatrixRain } from './components/MatrixRain';
import { ThemeSwitcher } from './components/ThemeSwitcher';

interface HistoryItem {
  command: string;
  timestamp: string;
}

interface BootLine {
  text: string;
  type: 'info' | 'success' | 'highlight';
}

const BOOT_LINES: BootLine[] = [
  { text: 'GautamOS kernel 6.1.0-amd64 loading...', type: 'info' },
  { text: 'Mounting virtual filesystems...', type: 'success' },
  { text: 'Starting portfolio services...', type: 'success' },
  { text: `Executing profile: ${DATA.name}`, type: 'success' },
  { text: 'Linking GitHub, X (Twitter)...', type: 'success' },
  { text: 'Loading ZK engine modules... OK', type: 'success' },
  { text: 'Terminal ready. Type "help" for commands.', type: 'highlight' },
];

const ASCII_BANNER = [
  ' ██████╗  █████╗ ██╗   ██╗████████╗ █████╗ ███╗   ███╗',
  '██╔════╝ ██╔══██╗██║   ██║╚══██╔══╝██╔══██╗████╗ ████║',
  '██║  ███╗███████║██║   ██║   ██║   ███████║██╔████╔██║',
  '██║   ██║██╔══██║██║   ██║   ██║   ██╔══██║██║╚██╔╝██║',
  '╚██████╔╝██║  ██║╚██████╔╝   ██║   ██║  ██║██║ ╚═╝ ██║',
  ' ╚═════╝ ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝',
].join('\n');

function getTimestamp() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  const s = now.getSeconds().toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [bootLines, setBootLines] = useState<BootLine[]>([]);
  const [booting, setBooting] = useState(true);
  const [cmdIndex, setCmdIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const bootStarted = useRef(false); // prevent double-run
  const { crtEnabled, matrixEnabled } = useTheme();

  // CRT Effect toggling on body
  useEffect(() => {
    if (crtEnabled) {
      document.body.classList.add('crt-enabled');
    } else {
      document.body.classList.remove('crt-enabled');
    }
  }, [crtEnabled]);

  // Boot sequence — guarded with a ref so it runs exactly once
  useEffect(() => {
    if (bootStarted.current) return;
    bootStarted.current = true;

    let step = 0;
    const id = setInterval(() => {
      const line = BOOT_LINES[step];
      if (line) {
        setBootLines(prev => [...prev, line]);
        step++;
      } else {
        clearInterval(id);
        setTimeout(() => setBooting(false), 500);
      }
    }, 220);

    return () => clearInterval(id);
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, bootLines]);

  // Focus input after boot
  useEffect(() => {
    if (!booting) inputRef.current?.focus();
  }, [booting]);

  const handleContainerClick = () => {
    if (!booting) inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const cmds = history.map(h => h.command).reverse();
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(cmdIndex + 1, cmds.length - 1);
      setCmdIndex(next);
      setInput(cmds[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cmdIndex - 1;
      if (next < 0) { setCmdIndex(-1); setInput(''); }
      else { setCmdIndex(next); setInput(cmds[next] ?? ''); }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    if (trimmed.toLowerCase() === 'clear') {
      setHistory([]);
      setInput('');
      setCmdIndex(-1);
      return;
    }
    setHistory(prev => [...prev, { command: trimmed, timestamp: getTimestamp() }]);
    setInput('');
    setCmdIndex(-1);
  };

  return (
    <>
      {matrixEnabled && <MatrixRain />}
      <ThemeSwitcher />
      <div className="terminal-window" onClick={handleContainerClick}>
        {/* ── Title Bar ── */}
        <div className="terminal-titlebar">
          <div className="titlebar-dots">
            <div className="dot dot-red" />
            <div className="dot dot-yellow" />
            <div className="dot dot-green" />
          </div>
          <span className="titlebar-title">gautam@portfolio — bash — 80×24</span>
          <div className="terminal-status">
            <div className="status-dot" />
            <span>ONLINE</span>
          </div>
        </div>

        {/* ── Terminal Body ── */}
        <div className="terminal-body">
          {/* Boot sequence lines */}
          {bootLines.length > 0 && (
            <div className="boot-sequence" style={{ marginBottom: booting ? 0 : '24px' }}>
              {bootLines.map((line, i) => (
                <div key={i} className={`boot-line ${line.type}`}>
                  {line.text}
                </div>
              ))}
              {booting && <span className="cursor" />}
            </div>
          )}

          {/* Main interface — shown after boot */}
          {!booting && (
            <>
              {/* ASCII name banner */}
              <div className="welcome-banner">
                <pre className="ascii-name">{ASCII_BANNER}</pre>
                <p className="welcome-tagline">
                  ZK Engineer · IIT Delhi · whoisgautxm@gmail.com
                </p>
              </div>

              {/* Command history */}
              {history.map((item, idx) => (
                <div key={idx} className="history-block">
                  <div className="prompt-line">
                    <span className="prompt-user">gautam</span>
                    <span className="prompt-at">@</span>
                    <span className="prompt-host">portfolio</span>
                    <span className="prompt-colon">:</span>
                    <span className="prompt-path">~</span>
                    <span className="prompt-dollar">$</span>
                    <span className="prompt-cmd">{item.command}</span>
                    <span className="prompt-time">[{item.timestamp}]</span>
                  </div>
                  <TerminalOutput command={item.command} />
                </div>
              ))}

              {/* Live input prompt */}
              <form onSubmit={handleSubmit} className="input-wrapper">
                <span className="prompt-user">gautam</span>
                <span className="prompt-at">@</span>
                <span className="prompt-host">portfolio</span>
                <span className="prompt-colon">:</span>
                <span className="prompt-path">~</span>
                <span className="prompt-dollar">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  className="terminal-input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  spellCheck={false}
                  autoFocus
                  placeholder=""
                />
                {!input && <span className="cursor" />}
              </form>
            </>
          )}

          <div ref={bottomRef} />
        </div>
      </div>
    </>
  );
}

export default App;
