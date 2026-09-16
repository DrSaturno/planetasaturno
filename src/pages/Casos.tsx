import { Link } from "react-router-dom";
import { casos } from "../content/catalogo";

export default function Casos() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="font-display text-xs uppercase tracking-widest text-telemetry">casos</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold text-ink-100 sm:text-4xl">
        Clientes reales
      </h1>
      <p className="mt-4 max-w-2xl font-body text-ink-400">
        Sin números inflados — esto es lo que se construyó, para quién, y punto.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {casos.map((c) => (
          <div key={c.slug} className="rounded-lg border border-ink-400/15 bg-space-900 p-6">
            <p className="font-display text-xs uppercase tracking-wide text-telemetry">{c.rubro}</p>
            <h2 className="mt-1 font-display text-lg font-bold text-ring-bright">{c.cliente}</h2>
            <p className="mt-3 font-body text-sm text-ink-400">{c.que_se_construyo}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 font-body text-sm text-ink-400">
        ¿Querés ser el próximo? <Link to="/auditoria" className="text-telemetry hover:text-ring-bright">Arrancá con la auditoría gratis →</Link>
      </p>
    </div>
  );
}
