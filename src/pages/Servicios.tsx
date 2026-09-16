import { Link } from "react-router-dom";
import { nivel0, nivel1, nivel3, nivel4, productosNivel2 } from "../content/catalogo";

export default function Servicios() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="font-display text-xs uppercase tracking-widest text-telemetry">catálogo</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold text-ink-100 sm:text-4xl">Servicios</h1>
      <p className="mt-4 max-w-2xl font-body text-ink-400">
        Cada servicio tiene alcance cerrado y precio fijo — nada de presupuestos a medida al inicio.
      </p>

      {/* Nivel 0 */}
      <div className="mt-12 rounded-lg border border-ring/30 bg-space-900 p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-lg font-bold text-ring-bright">{nivel0.nombre}</h2>
          <span className="font-display text-sm text-telemetry">{nivel0.precio}</span>
        </div>
        <p className="mt-2 font-body text-sm text-ink-400">{nivel0.descripcion}</p>
        <Link
          to="/auditoria"
          className="mt-4 inline-block rounded border border-ring px-4 py-2 font-display text-xs uppercase tracking-wide text-ring-bright hover:bg-ring hover:text-space-950"
        >
          Empezar gratis
        </Link>
      </div>

      {/* Nivel 1 */}
      <div className="mt-6 rounded-lg border border-ink-400/15 bg-space-900 p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-lg font-bold text-ink-100">{nivel1.nombre}</h2>
          <span className="font-display text-sm text-telemetry">
            {nivel1.precio_desde}–{nivel1.precio_hasta}
          </span>
        </div>
        <p className="mt-2 font-body text-sm text-ink-400">{nivel1.descripcion}</p>
      </div>

      {/* Nivel 2 */}
      <h2 className="mt-14 font-display text-xl font-bold text-ink-100">Implementaciones</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {productosNivel2.map((p) => (
          <div key={p.slug} className="rounded-lg border border-ink-400/15 bg-space-900 p-5">
            <p className="font-display text-sm font-bold text-ring-bright">{p.nombre}</p>
            <p className="mt-2 font-body text-sm text-ink-400">{p.que_incluye}</p>
            <dl className="mt-4 grid grid-cols-2 gap-2 font-display text-xs">
              <div>
                <dt className="text-ink-400">setup</dt>
                <dd className="text-telemetry">{p.precio_setup}</dd>
              </div>
              {p.retainer_mensual && (
                <div>
                  <dt className="text-ink-400">retainer/mes</dt>
                  <dd className="text-telemetry">{p.retainer_mensual}</dd>
                </div>
              )}
            </dl>
          </div>
        ))}
      </div>

      {/* Nivel 3 */}
      <div className="mt-14 rounded-lg border border-ring bg-space-900 p-6 shadow-[0_0_40px_-15px_var(--color-ring)]">
        <p className="font-display text-xs uppercase tracking-widest text-ring">producto estrella</p>
        <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl font-bold text-ring-bright">{nivel3.nombre}</h2>
          <span className="font-display text-sm text-telemetry">{nivel3.precio}</span>
        </div>
        <p className="mt-2 font-body text-sm text-ink-400">{nivel3.descripcion}</p>
        <p className="mt-3 font-display text-xs uppercase tracking-wide text-ink-400">
          {nivel3.condiciones}
        </p>
      </div>

      {/* Nivel 4 */}
      <h2 className="mt-14 font-display text-xl font-bold text-ink-100">Capacitación</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {nivel4.items.map((item) => (
          <div key={item.nombre} className="rounded-lg border border-ink-400/15 bg-space-900 p-5">
            <p className="font-body text-sm text-ink-100">{item.nombre}</p>
            <p className="mt-2 font-display text-xs uppercase tracking-wide text-telemetry">{item.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
