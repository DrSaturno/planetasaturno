import { useState } from "react";
import { beneficios, hero } from "../../content/home";
import Icon from "../Icon";
import { Planet, Sparkle, Starfield } from "../Space";
import { Kicker } from "./shared";

const ESCENA = "/brand/hero.webp";
const ESCENA_VERTICAL = "/brand/hero-mobile.webp";

/** Funde la escena hacia la izquierda (texto) y hacia abajo (siguiente sección). */
const FUNDIDO = {
  maskImage: "linear-gradient(to right, transparent, black 28%), linear-gradient(to bottom, black 72%, transparent)",
  maskComposite: "intersect",
  WebkitMaskImage: "linear-gradient(to right, transparent, black 28%), linear-gradient(to bottom, black 72%, transparent)",
  WebkitMaskComposite: "source-in",
} as const;

export default function Hero() {
  // Escena completa (planeta + astronauta). Si no está, se usa el planeta CSS + el logo flotando.
  const [escenaOk, setEscenaOk] = useState(true);

  return (
    <section aria-labelledby="hero-titulo" className="relative overflow-hidden">
      <Starfield count={170} seed={11} />
      {escenaOk ? (
        <img
          src={ESCENA}
          alt=""
          width={1448}
          height={1086}
          fetchPriority="high"
          onError={() => setEscenaOk(false)}
          style={FUNDIDO}
          className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[80%] object-cover object-center lg:block"
        />
      ) : null}
      {/* celular: versión vertical de la escena como póster; el título va sobre el cielo y la bajada sobre las rocas */}
      {escenaOk ? (
        <>
          <img
            src={ESCENA_VERTICAL}
            alt=""
            width={941}
            height={1672}
            fetchPriority="high"
            onError={() => setEscenaOk(false)}
            className="pointer-events-none absolute inset-x-0 top-0 w-full [mask-image:linear-gradient(to_bottom,black_80%,transparent)] sm:hidden"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 aspect-[941/1672] bg-linear-to-b from-transparent from-55% to-bg-900/85 sm:hidden" />
        </>
      ) : null}
      {!escenaOk && (
        <>
          <Planet className="-top-[20rem] -right-[15rem] h-[36rem] w-[36rem] sm:-top-[26rem] sm:-right-[20rem] sm:h-[50rem] sm:w-[50rem] lg:-top-[30rem] lg:-right-[13rem] lg:h-[64rem] lg:w-[64rem]" />
          <Sparkle className="top-[18%] left-[46%] h-4 w-4 opacity-80 lg:hidden" />
        </>
      )}
      {/* legibilidad del texto sobre el fondo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-r from-bg-900/90 via-bg-900/40 to-transparent lg:from-bg-900/80 lg:via-bg-900/25" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-linear-to-b from-transparent via-bg-900/70 to-bg-900" />
      {/* en desktop la nota se ubica respecto de la escena (ancho de la sección), no del contenedor centrado */}
      {escenaOk && <Nota className="absolute top-[13%] right-[5%] z-10 hidden lg:block" />}

      <div
        className={`relative mx-auto grid max-w-7xl items-center gap-6 px-4 pb-10 sm:px-6 lg:min-h-[calc(100vh-72px)] lg:grid-cols-[1.05fr_1fr] lg:pt-10 ${
          escenaOk ? "pt-10 sm:pt-0" : "pt-14"
        }`}
      >
        {/* en tablet el texto se monta sobre el fundido de la escena */}
        <div className={`relative z-10 ${escenaOk ? "sm:-mt-28 lg:mt-0" : ""}`}>
          <Kicker>{hero.kicker}</Kicker>
          <h1
            id="hero-titulo"
            className="mt-5 font-display text-5xl leading-[0.98] font-extrabold tracking-tight text-text-hi sm:text-6xl lg:text-7xl"
          >
            {hero.tituloLineas.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
            <span className="block text-blue-500 drop-shadow-[0_0_28px_rgba(57,124,255,0.45)]">{hero.tituloAcento}</span>
          </h1>
          {/* celular: hueco para que se vea el astronauta del póster entre el título y la bajada */}
          {escenaOk && (
            <div aria-hidden="true" className="relative h-[52vw] sm:hidden">
              <Nota espejo className="absolute top-[4vw] left-0" />
            </div>
          )}
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-text-hi">{hero.bajada}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contacto"
              className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 font-display text-sm font-semibold text-white shadow-[0_0_30px_-6px_rgba(57,124,255,0.8)] transition-all hover:bg-blue-500"
            >
              Consultá tu proyecto
              <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#como-trabajamos"
              className="inline-flex items-center gap-3 rounded-full border border-text-hi/20 bg-bg-900/40 py-2 pr-6 pl-2 font-display text-sm font-semibold text-text-hi backdrop-blur transition-colors hover:border-blue-500/70"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-text-hi/30">
                <Icon name="play" className="h-4 w-4" />
              </span>
              Ver cómo funciona
            </a>
          </div>

          <ul className="mt-12 grid max-w-xl grid-cols-2 gap-6 border-t border-bg-600/60 pt-8 sm:grid-cols-4">
            {beneficios.map((b) => (
              <li key={b.texto.join(" ")}>
                <Icon name={b.icono} className="h-7 w-7 text-blue-500 drop-shadow-[0_0_10px_rgba(57,124,255,0.6)]" />
                <p className="mt-3 text-[13px] leading-snug text-text-mid">
                  {b.texto[0]}
                  <br />
                  {b.texto[1]}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`relative ${
            escenaOk ? "order-first -mx-6 hidden sm:block lg:order-none lg:mx-0 lg:h-[600px]" : "h-[340px] sm:h-[440px] lg:h-[600px]"
          }`}
        >
          <Nota
            className={`absolute z-10 ${
              escenaOk ? "top-8 right-10 lg:hidden" : "top-3 right-3 sm:right-8 lg:top-6 lg:right-0"
            }`}
          />

          {escenaOk ? (
            // En pantallas chicas la escena abre el hero de borde a borde y se funde hacia el texto (en desktop es el fondo de la sección)
            <img
              src={ESCENA}
              alt="Astronauta de Planeta Saturno trabajando con una laptop frente al planeta"
              width={1448}
              height={1086}
              className="aspect-[16/9] w-full object-cover object-[70%_40%] [mask-image:linear-gradient(to_bottom,black_55%,transparent)] lg:hidden"
            />
          ) : (
            <div className="absolute inset-0 flex items-end justify-center lg:items-center">
              <div aria-hidden="true" className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/25 blur-3xl" />
              <img
                src="/brand/isotipo.webp"
                alt="Astronauta de Planeta Saturno trabajando sobre el planeta"
                width={801}
                height={720}
                className="animate-float relative w-[min(80vw,300px)] drop-shadow-[0_0_40px_rgba(57,124,255,0.45)] sm:w-[380px] lg:w-[440px]"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** `espejo`: la flecha apunta hacia la derecha (cuando la nota queda a la izquierda del astronauta). */
function Nota({ className, espejo = false }: { className: string; espejo?: boolean }) {
  return (
    <p
      aria-hidden="true"
      className={`-rotate-[8deg] font-hand text-2xl leading-[1.05] text-text-hi drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-3xl ${className}`}
    >
      {hero.nota.map((l) => (
        <span key={l} className="block">
          {l}
        </span>
      ))}
      <svg viewBox="0 0 80 50" className={`mt-1 h-10 w-16 text-text-hi ${espejo ? "ml-16 -scale-x-100" : "ml-2"}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M70 4C68 26 50 40 14 40" />
        <path d="M22 31 12 40l11 7" />
      </svg>
    </p>
  );
}
