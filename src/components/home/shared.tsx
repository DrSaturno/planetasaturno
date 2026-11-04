import type { ReactNode } from "react";

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="font-display text-xs font-semibold tracking-[0.22em] text-cyan-500 uppercase">{children}</p>;
}

type HeadingProps = {
  kicker: string;
  linea: string;
  acento: string;
  aside?: string;
  id?: string;
};

/** Encabezado de sección: kicker + título en dos líneas (la segunda en azul) + texto al costado. */
export function SectionHeading({ kicker, linea, acento, aside, id }: HeadingProps) {
  return (
    <div className="grid items-end gap-6 md:grid-cols-[1.1fr_1fr]">
      <div>
        <Kicker>{kicker}</Kicker>
        <h2 id={id} className="mt-3 font-display text-3xl leading-[1.12] font-bold text-text-hi sm:text-4xl">
          {linea}
          <br />
          <span className="text-blue-500">{acento}</span>
        </h2>
      </div>
      {aside && <p className="max-w-md text-base text-text-mid md:justify-self-end">{aside}</p>}
    </div>
  );
}
