import { Link } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import OrbitalDiagram from "../components/OrbitalDiagram";
import { contacto, productosNivel2 } from "../content/catalogo";

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <StatusBadge />
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-tight text-ink-100 sm:text-5xl">
          Automatizá tu empresa con{" "}
          <span className="text-ring-bright">agentes de IA</span>.
        </h1>
        <p className="mt-5 max-w-xl font-body text-lg text-ink-400">
          Una agencia operada por agentes, dirigida por un solo humano — construida en público.
          Empezá con un diagnóstico gratuito de dónde perdés tiempo y plata.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/auditoria"
            className="rounded border border-ring bg-ring px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-space-950 transition-opacity hover:opacity-90"
          >
            Auditoría gratis
          </Link>
          <a
            href={contacto.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-ink-400/40 px-5 py-2.5 font-display text-sm uppercase tracking-wide text-ink-100 transition-colors hover:border-ink-100"
          >
            Escribime por Instagram
          </a>
        </div>
      </section>

      <section className="border-t border-ink-400/10 bg-space-900">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <p className="font-display text-xs uppercase tracking-widest text-telemetry">
            cómo está armado
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink-100 sm:text-3xl">
            Un Agente Director, seis departamentos
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-sm text-ink-400">
            Vos hablás en lenguaje natural. El Director enruta, coordina y te pide
            aprobación antes de cualquier cosa irreversible.
          </p>
          <div className="mt-10">
            <OrbitalDiagram />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-ink-100 sm:text-3xl">Servicios</h2>
          <Link to="/servicios" className="font-display text-xs uppercase tracking-wide text-telemetry hover:text-ring-bright">
            ver catálogo completo →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productosNivel2.map((p) => (
            <div key={p.slug} className="rounded-lg border border-ink-400/15 bg-space-900 p-5">
              <p className="font-display text-sm font-bold text-ring-bright">{p.nombre}</p>
              <p className="mt-2 font-body text-sm text-ink-400">{p.que_incluye}</p>
              <p className="mt-4 font-display text-xs uppercase tracking-wide text-telemetry">
                desde {p.precio_setup}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
