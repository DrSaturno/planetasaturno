import { pasos } from "../../content/home";
import Icon, { type IconName } from "../Icon";
import { Starfield } from "../Space";
import { Kicker } from "./shared";

export default function ComoTrabajamos() {
  return (
    <section
      id="como-trabajamos"
      aria-labelledby="como-titulo"
      className="relative scroll-mt-20 overflow-hidden border-y border-bg-600/50 bg-bg-950/60"
    >
      <Starfield count={70} seed={23} className="opacity-60" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
        <div>
          <Kicker>Cómo trabajamos</Kicker>
          <h2 id="como-titulo" className="mt-3 font-display text-3xl leading-[1.12] font-bold text-text-hi sm:text-4xl">
            Simple, claro
            <br />y <span className="text-blue-500">sin vueltas.</span>
          </h2>

          <ol className="mt-10 space-y-6">
            {pasos.map((p) => (
              <li key={p.numero} className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-500/40 bg-bg-800 text-blue-300 shadow-[0_0_20px_-6px_rgba(57,124,255,0.7)]">
                  <Icon name={p.icono} />
                </span>
                <div>
                  <p className="font-display text-xs font-bold text-blue-300">{p.numero}</p>
                  <p className="font-display text-base font-semibold text-text-hi">{p.titulo}</p>
                  <p className="text-sm text-text-mid">{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>

          <a
            href="#contacto"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 font-display text-sm font-semibold text-white shadow-[0_0_30px_-6px_rgba(57,124,255,0.8)] transition-all hover:bg-blue-500"
          >
            Consultá tu proyecto
            <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <PanelAutomatizacion />
      </div>
    </section>
  );
}

const MENU: { icono: IconName; label: string; activo?: boolean }[] = [
  { icono: "home", label: "Inicio" },
  { icono: "chat", label: "Conversaciones" },
  { icono: "users", label: "Contactos" },
  { icono: "cart", label: "Ventas" },
  { icono: "bolt", label: "Automatizaciones", activo: true },
  { icono: "plug", label: "Integraciones" },
  { icono: "report", label: "Reportes" },
  { icono: "gear", label: "Ajustes" },
];

const NODOS: { icono: IconName; titulo: string; sub: string; color: string }[] = [
  { icono: "whatsapp", titulo: "Entrada", sub: "WhatsApp / Web / IG", color: "text-green-300 border-green-500/40 bg-green-500/10" },
  { icono: "bot", titulo: "Agente de IA", sub: "Clasifica y responde", color: "text-blue-300 border-blue-500/40 bg-blue-500/10" },
  { icono: "database", titulo: "CRM", sub: "Crea y actualiza el lead", color: "text-cyan-500 border-cyan-500/40 bg-cyan-500/10" },
  { icono: "bell", titulo: "Notificación", sub: "Equipo comercial", color: "text-warning border-warning/40 bg-warning/10" },
];

const CHECKS = ["Respuesta automática", "Datos guardados en CRM", "Notificación al equipo", "Seguimiento automático"];

/** Maqueta del producto en HTML (no imagen): ilustra el flujo de una automatización real. */
function PanelAutomatizacion() {
  return (
    <figure
      aria-label="Ejemplo de automatización: un mensaje entra por WhatsApp, el agente de IA lo clasifica, se carga en el CRM y se avisa al equipo comercial"
      className="relative rounded-2xl border border-blue-500/40 bg-bg-900/90 p-3 shadow-[0_0_0_1px_rgba(57,124,255,0.15),0_30px_90px_-30px_rgba(57,124,255,0.65)] lg:-rotate-1"
    >
      <div className="flex items-center gap-3 border-b border-bg-600/60 px-2 pb-3">
        <img src="/brand/isotipo.webp" alt="" width={801} height={720} className="h-7 w-auto" loading="lazy" />
        <span className="font-display text-sm font-semibold text-text-hi">Planeta Saturno</span>
        <span className="ml-auto hidden h-7 w-44 rounded-md border border-bg-600 bg-bg-800 sm:block" aria-hidden="true" />
      </div>

      <div className="flex gap-3 pt-3">
        <ul aria-hidden="true" className="hidden w-40 shrink-0 space-y-1 md:block">
          {MENU.map((m) => (
            <li
              key={m.label}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs ${
                m.activo ? "bg-blue-600/25 text-text-hi ring-1 ring-blue-500/50" : "text-text-mid"
              }`}
            >
              <Icon name={m.icono} className="h-4 w-4" />
              {m.label}
            </li>
          ))}
        </ul>

        <div className="grid flex-1 gap-3 sm:grid-cols-[1fr_0.9fr]">
          <ol className="relative space-y-4 rounded-xl border border-bg-600/60 bg-bg-800/60 p-4">
            {/* línea del flujo + punto que la recorre */}
            <span aria-hidden="true" className="absolute top-9 bottom-9 left-[2.15rem] w-px bg-linear-to-b from-green-500/60 via-blue-500/60 to-warning/60">
              <span className="flow-dot absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-cyan-500 shadow-[0_0_10px_2px_rgba(0,211,255,0.8)]" />
            </span>
            {NODOS.map((n) => (
              <li key={n.titulo} className="relative flex items-center gap-3">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-bg-900 ${n.color}`}>
                  <Icon name={n.icono} className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0 rounded-lg border border-bg-600/60 bg-bg-900/80 px-3 py-1.5">
                  <p className="font-display text-xs font-semibold text-text-hi">{n.titulo}</p>
                  <p className="truncate text-[11px] text-text-mid">{n.sub}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="rounded-xl border border-bg-600/60 bg-bg-800/60 p-4">
            <p className="text-[11px] text-text-low">Contacto</p>
            <p className="font-display text-sm font-semibold text-text-hi">Cliente interesado</p>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-bg-600/60 bg-bg-900/80 px-3 py-2">
              <span className="text-xs text-text-hi">Nuevo lead</span>
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(0,211,255,0.9)]" />
            </div>
            <p className="mt-2 text-[11px] text-text-mid">
              Estado: <span className="text-blue-300">En progreso</span>
            </p>
            <ul className="mt-3 space-y-2">
              {CHECKS.map((c) => (
                <li key={c} className="flex items-center gap-2 text-[11px] text-text-hi">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-300">
                    <Icon name="check" strokeWidth={3} className="h-2.5 w-2.5" />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </figure>
  );
}
