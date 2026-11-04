import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTerminalContext } from "../context/TerminalContext";
import { isCommand, runCommand, type TerminalLine } from "../lib/terminalCommands";
import { buscarFaq, chips, type Faq } from "../content/faq";
import { track } from "../lib/track";
import Icon from "./Icon";

type Entry = { id: number; pregunta: string; lineas: TerminalLine[] };

const SIN_RESPUESTA: TerminalLine[] = [
  { type: "text", text: "Esa no la tengo preparada todavía." },
  { type: "text", text: "Probá con una de las preguntas rápidas de abajo, o escribinos directo:" },
  { type: "link", text: "→ dejanos tu consulta (te respondemos en menos de 24 h)", href: "/#contacto" },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Terminal() {
  const { isOpen, close, toggle } = useTerminalContext();
  const navigate = useNavigate();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState<number | null>(null);
  const nextId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  // Al abrir: guardar el foco, enfocar el input y medir. Al cerrar: devolver el foco.
  useEffect(() => {
    if (isOpen) {
      lastFocus.current = document.activeElement as HTMLElement | null;
      inputRef.current?.focus();
      track("terminal_open");
    } else {
      lastFocus.current?.focus?.();
    }
  }, [isOpen]);

  // backtick abre/cierra desde cualquier lado (salvo escribiendo en otro campo); Esc cierra
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typingElsewhere =
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA") && target !== inputRef.current;
      if (e.key === "`" && !typingElsewhere) {
        e.preventDefault();
        toggle();
      } else if (e.key === "Escape" && isOpen) {
        close();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close, toggle]);

  function scrollToBottom() {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }

  function go(href: string) {
    navigate(href);
    close();
  }

  function push(pregunta: string, lineas: TerminalLine[]) {
    setEntries((e) => [...e, { id: nextId.current++, pregunta, lineas }]);
  }

  function preguntarChip(f: Faq) {
    push(f.pregunta, f.respuesta());
    track("terminal_faq", { faq_id: f.id, origen: "chip" });
  }

  function enviar() {
    const texto = input.trim();
    if (!texto) return;
    setLog((l) => [...l, texto]);
    setLogIndex(null);
    setInput("");

    if (texto.toLowerCase() === "clear") {
      setEntries([]);
      return;
    }
    if (isCommand(texto)) {
      push(texto, runCommand(texto, { navigate, closeAfter: () => setTimeout(close, 500) }));
      return;
    }
    const f = buscarFaq(texto);
    if (f) {
      push(texto, f.respuesta());
      track("terminal_faq", { faq_id: f.id, origen: "texto" });
    } else {
      push(texto, SIN_RESPUESTA);
      track("terminal_nomatch");
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      enviar();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (log.length === 0) return;
      const i = logIndex === null ? log.length - 1 : Math.max(0, logIndex - 1);
      setLogIndex(i);
      setInput(log[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (logIndex === null) return;
      const i = logIndex + 1;
      if (i >= log.length) {
        setLogIndex(null);
        setInput("");
      } else {
        setLogIndex(i);
        setInput(log[i]);
      }
    }
  }

  if (!isOpen) return null;

  const ultima = entries[entries.length - 1];

  return (
    <>
      {/* Debajo del header (z-40) para que el botón siga funcionando como toggle */}
      <div className="fixed inset-0 z-30 bg-bg-950/55 backdrop-blur-[2px]" onClick={close} aria-hidden="true" />

      <div
        id="terminal-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Terminal de preguntas rápidas"
        className="animate-terminal-in fixed inset-x-3 top-[76px] bottom-3 z-50 flex origin-top-right flex-col overflow-hidden rounded-2xl border border-bg-600 bg-bg-800/95 shadow-[0_0_0_1px_rgba(57,124,255,0.22),0_28px_90px_-24px_rgba(57,124,255,0.6)] backdrop-blur-md sm:inset-x-auto sm:right-6 sm:bottom-auto sm:h-[min(620px,calc(100vh_-_100px))] sm:w-[470px] lg:right-[max(1.5rem,calc((100vw_-_80rem)/2_+_1.5rem))]"
      >
        <div className="flex items-center justify-between border-b border-bg-600 bg-bg-700/60 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-bg-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-bg-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(0,211,255,0.8)]" />
            <span className="ml-2 font-mono text-xs text-text-mid">planeta-saturno ~ preguntas</span>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar terminal"
            className="rounded-md p-1 text-text-mid transition-colors hover:bg-bg-600 hover:text-text-hi"
          >
            <Icon name="x" className="h-4 w-4" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed">
          <div>
            <p className="text-cyan-500">planeta saturno · terminal</p>
            <p className="text-text-hi">¡Hola! Sacate las dudas rápido: tocá una pregunta o escribí la tuya.</p>
            <p className="text-text-low">Esc para cerrar · "help" para ver comandos</p>
          </div>

          {entries.map((entry) => (
            <div key={entry.id}>
              <p className="text-text-hi">
                <span className="text-cyan-500">›</span> {entry.pregunta}
              </p>
              <Answer
                lineas={entry.lineas}
                animar={entry === ultima && !prefersReducedMotion()}
                onTick={scrollToBottom}
                onLink={(href, text) => {
                  track("terminal_cta", { destino: href.startsWith("/") ? href : "externo", texto: text });
                  if (href.startsWith("/")) go(href);
                }}
              />
            </div>
          ))}
        </div>

        {/* Lectores de pantalla: la respuesta completa, sin el efecto de tipeo */}
        <div className="sr-only" aria-live="polite">
          {ultima?.lineas.map((l) => l.text).join(" ")}
        </div>

        <div className="flex gap-2 overflow-x-auto border-t border-bg-600 px-4 py-2.5 [scrollbar-width:none]">
          {chips.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => preguntarChip(f)}
              className="shrink-0 rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-blue-300 transition-colors hover:border-blue-500/70 hover:bg-blue-500/20 hover:text-text-hi"
            >
              {f.chip}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            enviar();
          }}
          className="flex items-center gap-2 border-t border-bg-600 bg-bg-900/60 px-4 py-3"
        >
          <span className="font-mono text-sm text-cyan-500" aria-hidden="true">
            ›
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            maxLength={300}
            placeholder="Escribí tu pregunta…"
            className="min-w-0 flex-1 bg-transparent font-mono text-sm text-text-hi outline-none placeholder:text-text-low"
            autoComplete="off"
            spellCheck={false}
            aria-label="Escribí tu pregunta"
          />
          <button
            type="submit"
            aria-label="Enviar pregunta"
            className="rounded-lg bg-blue-600 p-2 text-white transition-colors hover:bg-blue-500"
          >
            <Icon name="arrow-right" className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}

type AnswerProps = {
  lineas: TerminalLine[];
  animar: boolean;
  onTick: () => void;
  onLink: (href: string, text: string) => void;
};

/** Respuesta con efecto de tipeo (solo la última; las anteriores se muestran completas). */
function Answer({ lineas, animar, onTick, onLink }: AnswerProps) {
  const total = lineas.reduce((n, l) => n + l.text.length, 0);
  const [n, setN] = useState(animar ? 0 : total);
  const visibles = animar ? n : total;

  useEffect(() => {
    if (!animar || n >= total) return;
    const id = setTimeout(() => setN((v) => Math.min(total, v + 4)), 14);
    return () => clearTimeout(id);
  }, [animar, n, total]);

  useEffect(() => {
    onTick();
  }, [visibles, onTick]);

  // dónde arranca cada línea dentro del total de caracteres
  const inicios = lineas.map((_, i) => lineas.slice(0, i).reduce((n, l) => n + l.text.length, 0));
  return (
    <div className="mt-1 text-text-mid">
      {lineas.map((l, i) => {
        const disponibles = visibles - inicios[i];
        if (disponibles <= 0 && l.text.length > 0) return null;
        const shown = l.text.slice(0, Math.max(0, disponibles));
        const completa = shown.length === l.text.length;

        if (l.type === "link" && completa) {
          const external = !l.href.startsWith("/");
          return (
            <div key={i}>
              <a
                href={l.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  if (!external) e.preventDefault();
                  onLink(l.href, l.text);
                }}
                className="text-cyan-500 underline decoration-cyan-500/40 underline-offset-2 hover:text-text-hi"
              >
                {l.text}
              </a>
            </div>
          );
        }
        return (
          <div key={i} className="whitespace-pre-wrap">
            {shown || " "}
            {animar && !completa && <span className="animate-caret ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-cyan-500" />}
          </div>
        );
      })}
    </div>
  );
}
