import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Minus, Square } from 'lucide-react';
import { TerminalCommand } from '../types';
import MatrixRain from './MatrixRain';
import { useAudio } from './AudioProvider';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction?: (action: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose, onAction }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalCommand[]>([
    { cmd: 'init', output: 'NitheesOS v3.0.1 initialized...', color: 'text-green-500' },
    { cmd: '', output: 'Type "help" to see available commands.', color: 'text-gray-400' }
  ]);
  const [showMatrix, setShowMatrix] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const { playKeyPress } = useAudio();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let output = '';
      let color = 'text-gray-300';
      let immediate = true;

      switch (cmd) {
        case 'help':
          output = 'Available commands: about, stack, contact, clear, status, pull, sudo, matrix, whoami, ls, hack, coffee, exit';
          break;
        case 'sudo':
        case 'sudo su':
          output = 'Permission Denied. Nice try though 😏';
          color = 'text-red-500';
          break;
        case 'matrix':
          output = 'Initializing Matrix protocol...';
          color = 'text-green-500';
          setTimeout(() => setShowMatrix(true), 500);
          break;
        case 'cat salary.txt':
        case 'cat salary':
          output = 'ERROR: File not found. (It\'s probably in a Swiss bank account 🏦💰)';
          color = 'text-yellow-500';
          break;
        case 'whoami':
          output = 'nithees@devops-architect | Senior DevOps Engineer | Kubernetes Wizard 🧙‍♂️';
          color = 'text-cyan-500';
          break;
        case 'ls':
        case 'ls -la':
          output = 'drwxr-xr-x  skills/\ndrwxr-xr-x  projects/\ndrwxr-xr-x  experience/\n-rw-r--r--  resume.pdf\n-rw-r--r--  secrets.enc 🔒';
          break;
        case 'hack':
        case 'hack pentagon':
          immediate = false;
          setHistory(prev => [...prev, { cmd: input, output: 'Initializing hack sequence...', color: 'text-red-500' }]);
          setTimeout(() => {
            setHistory(prev => [...prev, { cmd: '', output: 'Bypassing firewall... [OK]', color: 'text-green-500' }]);
            setTimeout(() => {
              setHistory(prev => [...prev, { cmd: '', output: 'Cracking encryption... [OK]', color: 'text-green-500' }]);
              setTimeout(() => {
                setHistory(prev => [...prev, { cmd: '', output: 'Accessing mainframe... [FAILED]', color: 'text-red-500' }]);
                setTimeout(() => {
                  setHistory(prev => [...prev, { cmd: '', output: 'Just kidding! I only hack productivity problems 😄', color: 'text-yellow-500' }]);
                }, 500);
              }, 500);
            }, 500);
          }, 500);
          break;
        case 'coffee':
          output = '☕\n    )  (\n   (   ) )\n    ) ( (\n  ._______.\n  |       |]\n  \       /\n   `-----\'\nCoffee.exe loaded. Productivity +100%';
          color = 'text-yellow-600';
          break;
        case 'about':
          output = 'Senior DevOps Architect based in Bangkok. Obsessed with automation.';
          break;
        case 'stack':
          output = 'K8s, Terraform, AWS, GCP, Python, ArgoCD';
          break;
        case 'contact':
          output = 'Opening mail client...';
          color = 'text-yellow-400';
          setTimeout(() => window.location.href = "mailto:nitheesbalaji@gmail.com", 1000);
          break;
        case 'status':
          output = 'System Operational. All zones green.';
          color = 'text-green-500';
          break;
        case 'pull':
        case 'git pull':
          immediate = false;
          setHistory(prev => [...prev, { cmd: input, output: 'remote: Enumerating objects: 14, done.', color: 'text-gray-400' }]);

          setTimeout(() => {
            setHistory(prev => [...prev, { cmd: '', output: 'remote: Counting objects: 100% (14/14), done.', color: 'text-gray-400' }]);
            setTimeout(() => {
              setHistory(prev => [...prev, { cmd: '', output: 'remote: Compressing objects: 100% (10/10), done.', color: 'text-gray-400' }]);
              setTimeout(() => {
                setHistory(prev => [...prev, { cmd: '', output: 'Unpacking objects: 100% (14/14), 4.20 KiB | 2.10 MiB/s, done.', color: 'text-gray-400' }]);
                setTimeout(() => {
                  setHistory(prev => [...prev, { cmd: '', output: 'From github.com:nitheesb/portfolio', color: 'text-gray-400' }]);
                  setTimeout(() => {
                    setHistory(prev => [...prev, { cmd: '', output: ' * branch            main       -> FETCH_HEAD', color: 'text-gray-400' }]);
                    setTimeout(() => {
                      setHistory(prev => [...prev, { cmd: '', output: 'Updating 4f2a1b..9c3d4e', color: 'text-green-500' }]);
                      setTimeout(() => {
                        setHistory(prev => [...prev, { cmd: '', output: 'Fast-forward', color: 'text-green-500' }]);
                        setTimeout(() => {
                          if (onAction) onAction('reload');
                        }, 800);
                      }, 600);
                    }, 500);
                  }, 500);
                }, 500);
              }, 500);
            }, 500);
          }, 300);
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'exit':
          onClose();
          return;
        default:
          output = `Command not found: ${cmd}`;
          color = 'text-red-500';
      }

      if (immediate) {
        setHistory(prev => [...prev, { cmd: input, output, color }]);
      }
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playKeyPress();
    handleCommand(e);
  };

  if (!isOpen) return null;

  return (
    <>
      <MatrixRain isActive={showMatrix} onClose={() => setShowMatrix(false)} />
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-[#0d0d0d] border border-gray-800 rounded-lg shadow-2xl overflow-hidden font-mono flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <TerminalIcon size={14} />
              <span>nithees@portfolio:~</span>
            </div>
            <div className="flex items-center gap-3">
              <Minus size={14} className="text-gray-500 hover:text-white cursor-pointer" />
              <Square size={12} className="text-gray-500 hover:text-white cursor-pointer" />
              <X size={14} className="text-red-500 hover:text-red-400 cursor-pointer" onClick={onClose} />
            </div>
          </div>

          {/* Body */}
          <div ref={bodyRef} className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-2">
            {history.map((entry, idx) => (
              <div key={idx}>
                {entry.cmd && (
                  <div className="flex gap-2 text-gray-400">
                    <span className="text-primary">➜</span>
                    <span>~ {entry.cmd}</span>
                  </div>
                )}
                <div className={`pl-5 ${entry.color || 'text-gray-300'}`}>{entry.output}</div>
              </div>
            ))}

            <div className="flex gap-2 items-center text-gray-100">
              <span className="text-primary">➜</span>
              <span className="text-secondary">~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none flex-1 text-white"
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terminal;