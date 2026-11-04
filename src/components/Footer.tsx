import { Link } from "react-router-dom";
import { contacto } from "../content/catalogo";
import { useTerminalContext } from "../context/TerminalContext";
import Icon from "./Icon";

const COLUMNAS: { titulo: string; links: { to: string; label: string }[] }[] = [
  {
    titulo: "Servicios",
    links: [
      { to: "/#servicios", label: "Agentes de IA" },
      { to: "/#servicios", label: "Chatbot WhatsApp + CRM" },
      { to: "/#servicios", label: "Sitios web a medida" },
      { to: "/servicios", label: "Soluciones personalizadas" },
    ],
  },
  {
    titulo: "Empresa",
    links: [
      { to: "/casos", label: "Casos de éxito" },
      { to: "/#como-trabajamos", label: "Cómo trabajamos" },
      { to: "/sobre-mi", label: "Sobre nosotros" },
      { to: "/blog", label: "Blog" },
    ],
  },
];

export default function Footer() {
  const { open } = useTerminalContext();
  const linkCls = "text-sm text-text-mid transition-colors hover:text-text-hi";

  return (
    <footer className="border-t border-bg-600/60 bg-bg-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <img src="/brand/logo-horizontal.webp" alt="Planeta Saturno" width={401} height={128} className="h-10 w-auto" loading="lazy" />
          <p className="mt-4 max-w-xs text-sm text-text-mid">
            Automatizaciones, sistemas, diseños y pauta con IA para hacer crecer tu negocio.
          </p>
          <a
            href={contacto.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${contacto.instagram}`}
            className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-bg-600 text-text-mid transition-colors hover:border-blue-500 hover:text-text-hi"
          >
            <Icon name="instagram" />
          </a>
        </div>

        {COLUMNAS.map((col) => (
          <div key={col.titulo}>
            <p className="font-display text-sm font-semibold text-text-hi">{col.titulo}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="font-display text-sm font-semibold text-text-hi">Recursos</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <button type="button" onClick={open} className={linkCls}>
                Preguntas frecuentes
              </button>
            </li>
            <li>
              <Link to="/auditoria" className={linkCls}>
                Mini Auditoría gratis
              </Link>
            </li>
            <li>
              <Link to="/#contacto" className={linkCls}>
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-bg-600/40">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-text-low sm:px-6">
          © {new Date().getFullYear()} Planeta Saturno. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
