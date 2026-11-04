import { Link } from "react-router-dom";
import { serviciosHome, type ServicioHome } from "../../content/home";
import Icon from "../Icon";
import SlotImage from "../SlotImage";
import { Starfield } from "../Space";
import { SectionHeading } from "./shared";
import { TONOS } from "./tonos";

export default function Servicios() {
  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <SectionHeading
          id="servicios-titulo"
          kicker="Nuestros servicios"
          linea="Soluciones que se adaptan"
          acento="a tu negocio."
          aside="Combinamos inteligencia artificial, automatizaciones y desarrollo a medida para resolver problemas reales y generar resultados."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {serviciosHome.map((s, i) => (
            <ServicioCard key={s.slug} servicio={s} seed={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicioCard({ servicio: s, seed }: { servicio: ServicioHome; seed: number }) {
  const tono = TONOS[s.tono];
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border bg-bg-800/70 transition-all duration-300 hover:-translate-y-1 ${tono.card}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-bg-600/50">
        <SlotImage
          src={s.imagen}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          fallback={<CardArt servicio={s} seed={seed} />}
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className={`self-start rounded-full px-3 py-1 font-display text-[11px] font-bold tracking-[0.14em] uppercase ${tono.pill}`}>
          {s.pill}
        </span>
        <h3 className="mt-4 font-display text-2xl leading-tight font-bold text-text-hi">
          {s.titulo[0]}
          <br />
          {s.titulo[1]}
        </h3>
        <p className="mt-3 text-[15px] text-text-mid">{s.descripcion}</p>
        <ul className="mt-5 space-y-2.5">
          {s.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-text-hi">
              <Icon name="check" strokeWidth={2.4} className={`mt-0.5 h-4 w-4 shrink-0 ${tono.check}`} />
              {b}
            </li>
          ))}
        </ul>
        <Link
          to="/servicios"
          className={`mt-auto inline-flex items-center gap-1.5 pt-7 font-display text-sm font-semibold ${tono.link} transition-colors hover:text-text-hi`}
        >
          Conocé más
          <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          <span className="sr-only">sobre {s.titulo.join(" ")}</span>
        </Link>
      </div>
    </article>
  );
}

/** Reemplazo de la ilustración mientras no exista (brand/ASSETS-PEDIDO.md). */
function CardArt({ servicio: s, seed }: { servicio: ServicioHome; seed: number }) {
  const tono = TONOS[s.tono];
  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full bg-bg-900"
      style={{ background: `radial-gradient(circle at 50% 55%, ${tono.glow}, transparent 62%), #0b1224` }}
    >
      <Starfield count={45} seed={seed} />
      <div className="absolute top-1/2 left-1/2 h-24 w-72 -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-[50%] border border-text-hi/15" />
      <div className="absolute top-1/2 left-1/2 h-36 w-[22rem] -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-[50%] border border-text-hi/[0.07]" />
      <div
        className={`absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border backdrop-blur transition-transform duration-500 group-hover:scale-110 ${tono.tile}`}
      >
        <Icon name={s.icono} strokeWidth={1.6} className={`h-10 w-10 ${tono.icon}`} />
      </div>
    </div>
  );
}
