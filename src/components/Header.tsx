import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTerminalContext } from "../context/TerminalContext";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/servicios", label: "Servicios" },
  { to: "/auditoria", label: "Auditoría" },
  { to: "/casos", label: "Casos" },
  { to: "/blog", label: "Blog" },
  { to: "/sobre-mi", label: "Sobre mí" },
];

export default function Header() {
  const { toggle } = useTerminalContext();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-400/10 bg-space-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <NavLink to="/" className="font-display text-sm font-bold text-ring-bright">
          Planeta<span className="text-telemetry">Saturno</span>OS
        </NavLink>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `font-display text-xs uppercase tracking-wide transition-colors ${
                  isActive ? "text-ring-bright" : "text-ink-400 hover:text-ink-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={toggle}
            className="rounded border border-telemetry/40 px-3 py-1.5 font-display text-xs uppercase tracking-wide text-telemetry transition-colors hover:bg-telemetry/10"
          >
            Terminal
          </button>
        </nav>

        <button
          type="button"
          className="font-display text-xs text-ink-100 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label="Abrir menú"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-ink-400/10 px-4 pb-4 md:hidden">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `py-2 font-display text-sm uppercase tracking-wide ${
                  isActive ? "text-ring-bright" : "text-ink-400"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => {
              toggle();
              setMenuOpen(false);
            }}
            className="mt-2 rounded border border-telemetry/40 py-2 font-display text-xs uppercase tracking-wide text-telemetry"
          >
            Terminal
          </button>
        </nav>
      )}
    </header>
  );
}
