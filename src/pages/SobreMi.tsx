export default function SobreMi() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="font-display text-xs uppercase tracking-widest text-telemetry">sobre mí</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold text-ink-100 sm:text-4xl">
        Dr. Saturno
      </h1>

      {/* Borrador — Nico ajusta esto a su voz real antes de publicar (ver plan de la web). */}
      <div className="mt-8 flex flex-col gap-4 font-body text-ink-100">
        <p>
          Estoy construyendo una agencia que se maneja sola con agentes de IA, en público. Esto
          es la punta del iceberg.
        </p>
        <p>
          Planeta Saturno es el primer planeta de un ecosistema más grande — la agencia de
          automatización con IA para PyMEs. El resto (producto, contenido, formación) orbita la
          misma marca a medida que se construye.
        </p>
        <p className="text-ink-400">
          Opero solo. Nada de equipo de diez personas detrás de la cortina — un Agente Director
          coordina seis departamentos de agentes, y yo apruebo lo que importa: precio, alcance,
          lo que sale a producción.
        </p>
      </div>
    </div>
  );
}
