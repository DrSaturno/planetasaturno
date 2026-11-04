import { Link } from "react-router-dom";
import { casosHome, type CasoHome } from "../../content/home";
import Icon from "../Icon";
import SlotImage from "../SlotImage";
import { SectionHeading } from "./shared";

const FONDOS = [
  "from-blue-600/50 to-bg-900",
  "from-violet-600/50 to-bg-900",
  "from-cyan-500/35 to-bg-900",
  "from-green-500/35 to-bg-900",
];

export default function Casos() {
  // CLAUDE.md §7: en producción solo se muestran los autorizados. En dev, todos (marcados como borrador).
  const visibles = casosHome.filter((c) => c.publicar || import.meta.env.DEV);
  if (visibles.length === 0) return null;

  return (
    <section id="casos" aria-labelledby="casos-titulo" className="scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <SectionHeading
          id="casos-titulo"
          kicker="Casos de éxito"
          linea="Proyectos reales"
          acento="para negocios reales."
          aside="Ayudamos a pymes y empresas de distintos rubros a automatizar procesos y mejorar la atención a sus clientes."
        />
        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {visibles.map((c, i) => (
            <li key={c.slug}>
              <CasoCard caso={c} fondo={FONDOS[i % FONDOS.length]} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CasoCard({ caso: c, fondo }: { caso: CasoHome; fondo: string }) {
  const iniciales = c.cliente
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <Link
      to="/casos"
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-bg-600/70 bg-bg-800/70 transition-all hover:-translate-y-1 hover:border-blue-500/60"
    >
      {!c.publicar && (
        <span className="absolute top-2 left-2 z-10 rounded bg-warning px-1.5 py-0.5 font-display text-[10px] font-bold text-bg-900 uppercase">
          borrador
        </span>
      )}
      <div className="aspect-[4/3] overflow-hidden">
        <SlotImage
          src={`/brand/casos/${c.slug}.webp`}
          alt={`Proyecto para ${c.cliente}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          fallback={
            <div aria-hidden="true" className={`flex h-full w-full items-center justify-center bg-linear-to-br ${fondo}`}>
              <span className="font-display text-3xl font-extrabold text-text-hi/80">{iniciales}</span>
            </div>
          }
        />
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display text-sm font-bold text-text-hi">{c.cliente}</p>
          <Icon name="arrow-right" className="h-4 w-4 shrink-0 text-blue-300 transition-transform group-hover:translate-x-0.5" />
        </div>
        <p className="mt-1 text-xs text-text-mid">{c.trabajo}</p>
      </div>
    </Link>
  );
}
