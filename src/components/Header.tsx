import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTerminalContext } from "../context/TerminalContext";
import Icon from "./Icon";

const NAV_LINKS = [
  { to: "/servicios", label: "Servicios" },
  { to: "/casos", label: "Casos de éxito" },
  { to: "/#como-trabajamos", label: "Cómo trabajamos" },
  { to: "/sobre-mi", label: "Sobre nosotros" },
  { to: "/blog", label: "Blog" },
];

export default function Header() {
  const { isOpen, toggle } = useTerminalContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const cta = (
    <button
      type="button"
      onClick={() => {
        setMenuOpen(false);
        toggle();
      }}
      aria-expanded={isOpen}
      aria-controls="terminal-panel"
      className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 font-display text-sm font-semibold text-white shadow-[0_0_24px_-4px_rgba(57,124,255,0.75)] transition-all hover:bg-blue-500 hover:shadow-[0_0_32px_-2px_rgba(0,211,255,0.7)] sm:px-5"
    >
      <span className="hidden sm:inline">Consultá tu proyecto</span>
      <span className="sm:hidden">Consultá</span>
      <Icon
        name={isOpen ? "x" : "arrow-right"}
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
      />
    </button>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-bg-600/60 bg-bg-900/80 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" aria-label="Planeta Saturno — inicio" className="shrink-0">
          <img src="/brand/logo-horizontal.webp" alt="Planeta Saturno" width={401} height={128} className="h-10 w-auto sm:h-11" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-display text-sm font-medium transition-colors ${
                  isActive && !link.to.includes("#") ? "text-text-hi" : "text-text-mid hover:text-text-hi"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {cta}
          <button
            type="button"
            className="rounded-lg p-2 text-text-hi hover:bg-bg-700 lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <Icon name={menuOpen ? "x" : "menu"} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="menu-movil" aria-label="Principal" className="border-t border-bg-600/60 px-4 pb-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-bg-600/40 py-3 font-display text-base font-medium text-text-mid hover:text-text-hi"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
