import { NavLink } from "react-router-dom";
import { contacto } from "../content/catalogo";

export default function Footer() {
  return (
    <footer className="border-t border-ink-400/10 bg-space-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-sm font-bold text-ring-bright">
            Planeta<span className="text-telemetry">Saturno</span>
          </p>
          <p className="mt-1 max-w-xs font-body text-sm text-ink-400">
            Agencia de IA aplicada a negocios, construida en público.
          </p>
        </div>

        <div className="flex gap-10">
          <div>
            <p className="font-display text-xs uppercase tracking-wide text-ink-400">Sitio</p>
            <ul className="mt-2 flex flex-col gap-1.5 font-body text-sm">
              <li><NavLink to="/servicios" className="text-ink-100 hover:text-ring-bright">Servicios</NavLink></li>
              <li><NavLink to="/auditoria" className="text-ink-100 hover:text-ring-bright">Auditoría gratis</NavLink></li>
              <li><NavLink to="/casos" className="text-ink-100 hover:text-ring-bright">Casos</NavLink></li>
            </ul>
          </div>
          <div>
            <p className="font-display text-xs uppercase tracking-wide text-ink-400">Redes</p>
            <ul className="mt-2 flex flex-col gap-1.5 font-body text-sm">
              <li>
                <a
                  href={contacto.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-100 hover:text-ring-bright"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-400/10 px-4 py-4 text-center font-display text-[11px] text-ink-400 sm:px-6">
        © {new Date().getFullYear()} Planeta Saturno · v1.0
      </div>
    </footer>
  );
}
