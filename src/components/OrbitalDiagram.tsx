import { useState } from "react";
import { departamentos } from "../content/catalogo";

const RADIUS = 42; // % del contenedor

export default function OrbitalDiagram() {
  const [activo, setActivo] = useState<string | null>(null);
  const activoData = departamentos.find((d) => d.slug === activo) ?? null;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative aspect-square w-full max-w-md">
        {/* anillo decorativo, gira solo — puramente visual */}
        <div
          className="absolute inset-0 rounded-full border border-dashed border-ring/30 motion-safe:animate-[spin_60s_linear_infinite]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-[15%] rounded-full border border-telemetry/20"
          aria-hidden="true"
        />

        {/* núcleo: Agente Director */}
        <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-ring bg-space-900 text-center shadow-[0_0_30px_-8px_var(--color-ring)]">
          <span className="font-display text-[10px] uppercase tracking-widest text-ink-400">
            director
          </span>
          <span className="font-display text-xs font-bold text-ring-bright">Nico</span>
        </div>

        {/* departamentos, posiciones fijas — interactivos */}
        {departamentos.map((dept, i) => {
          const angle = (i / departamentos.length) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + RADIUS * Math.cos(angle);
          const y = 50 + RADIUS * Math.sin(angle);
          const isActive = activo === dept.slug;
          return (
            <button
              key={dept.slug}
              type="button"
              onClick={() => setActivo(isActive ? null : dept.slug)}
              onMouseEnter={() => setActivo(dept.slug)}
              onMouseLeave={() => setActivo((cur) => (cur === dept.slug ? null : cur))}
              style={{ left: `${x}%`, top: `${y}%` }}
              className={`absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-center font-display text-[10px] font-bold uppercase leading-tight transition-all ${
                isActive
                  ? "border-telemetry bg-telemetry/10 text-telemetry shadow-[0_0_20px_-4px_var(--color-telemetry)]"
                  : "border-ink-400/40 bg-space-900 text-ink-100 hover:border-ring hover:text-ring-bright"
              }`}
              aria-pressed={isActive}
            >
              {dept.nombre}
            </button>
          );
        })}
      </div>

      <div className="min-h-16 max-w-sm text-center">
        {activoData ? (
          <p className="font-body text-sm text-ink-100">
            <span className="font-display font-bold text-telemetry">{activoData.nombre}:</span>{" "}
            {activoData.descripcion}
          </p>
        ) : (
          <p className="font-body text-sm text-ink-400">
            Tocá un departamento para ver qué hace.
          </p>
        )}
      </div>
    </div>
  );
}
