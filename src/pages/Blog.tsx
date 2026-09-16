export default function Blog() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="font-display text-xs uppercase tracking-widest text-telemetry">blog</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold text-ink-100 sm:text-4xl">
        Todavía no hay nada acá.
      </h1>
      <p className="mt-4 max-w-xl font-body text-ink-400">
        El Agente de Contenido que va a publicar acá dos veces por semana todavía no está
        construido — es el siguiente paso del roadmap. Mientras tanto, seguí{" "}
        <a
          href="https://instagram.com/drsaturno.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="text-telemetry hover:text-ring-bright"
        >
          @drsaturno.tech
        </a>{" "}
        en Instagram.
      </p>
    </div>
  );
}
