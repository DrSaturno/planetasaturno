import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTerminalContext } from "../context/TerminalContext";
import { runCommand, type TerminalLine } from "../lib/terminalCommands";

type HistoryEntry = { command: string; output: TerminalLine[] };

const WELCOME: TerminalLine[] = [
  { type: "text", text: "PlanetaSaturnoOS v1.0 — escribí \"help\" para ver los comandos." },
];

export default function Terminal() {
  const { isOpen, close } = useTerminalContext();
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [cmdLog, setCmdLog] = useState<string[]>([]);
  const [cmdLogIndex, setCmdLogIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  // backtick abre/cierra el terminal desde cualquier lado del sitio, salvo mientras se escribe en otro input
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing = target.tagName === "INPUT" || target.tagName === "TEXTAREA";
      if (e.key === "`" && !typing) {
        e.preventDefault();
        close();
      } else if (e.key === "Escape" && isOpen) {
        close();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  function submitCurrent() {
    const command = input;
    if (!command.trim()) return;

    if (command.trim().toLowerCase() === "clear") {
      setHistory([]);
      setInput("");
      setCmdLog((log) => [...log, command]);
      setCmdLogIndex(null);
      return;
    }

    const output = runCommand(command, {
      navigate,
      closeAfter: () => setTimeout(close, 500),
    });
    setHistory((h) => [...h, { command, output }]);
    setCmdLog((log) => [...log, command]);
    setCmdLogIndex(null);
    setInput("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submitCurrent();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      // No confiamos en el submit nativo del form al Enter — algunas
      // herramientas de automatización/teclados no disparan ese default action.
      e.preventDefault();
      submitCurrent();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdLog.length === 0) return;
      const nextIndex = cmdLogIndex === null ? cmdLog.length - 1 : Math.max(0, cmdLogIndex - 1);
      setCmdLogIndex(nextIndex);
      setInput(cmdLog[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdLogIndex === null) return;
      const nextIndex = cmdLogIndex + 1;
      if (nextIndex >= cmdLog.length) {
        setCmdLogIndex(null);
        setInput("");
      } else {
        setCmdLogIndex(nextIndex);
        setInput(cmdLog[nextIndex]);
      }
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-space-950/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Terminal"
      onClick={close}
    >
      <div
        className="flex h-[70vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-ring/40 bg-space-900 shadow-[0_0_60px_-15px_var(--color-ring)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-ink-400/20 px-4 py-2">
          <span className="font-display text-xs text-ink-400">
            Terminal · nico@planetasaturno:~
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar terminal"
            className="font-display text-sm text-ink-400 hover:text-ring-bright"
          >
            ✕
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 font-display text-sm">
          {WELCOME.map((line, i) => (
            <TerminalLineView key={`welcome-${i}`} line={line} />
          ))}
          {history.map((entry, i) => (
            <div key={i} className="mt-2">
              <div className="text-ring-bright">
                <span className="text-telemetry">nico@planetasaturno:~$</span> {entry.command}
              </div>
              {entry.output.map((line, j) => (
                <TerminalLineView key={j} line={line} />
              ))}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-ink-400/20 px-4 py-3">
          <span className="font-display text-sm text-telemetry">nico@planetasaturno:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent font-display text-sm text-ink-100 outline-none"
            autoComplete="off"
            spellCheck={false}
            aria-label="Comando de terminal"
          />
        </form>
      </div>
    </div>
  );
}

function TerminalLineView({ line }: { line: TerminalLine }) {
  if (line.type === "link") {
    return (
      <div className="whitespace-pre-wrap text-ink-100">
        <a
          href={line.href}
          target={line.href.startsWith("http") ? "_blank" : undefined}
          rel={line.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="text-telemetry underline underline-offset-2 hover:text-ring-bright"
        >
          {line.text}
        </a>
      </div>
    );
  }
  return <div className="whitespace-pre-wrap text-ink-100">{line.text}</div>;
}
