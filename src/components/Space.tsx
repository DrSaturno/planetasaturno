import { useMemo } from "react";

/** Generador pseudoaleatorio con semilla: mismas estrellas en cada render. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

export function Starfield({ count = 140, seed = 7, className = "" }: { count?: number; seed?: number; className?: string }) {
  const stars = useMemo(() => {
    const rnd = seeded(seed);
    return Array.from({ length: count }, (_, i) => ({
      x: rnd() * 1000,
      y: rnd() * 600,
      r: 0.35 + rnd() * 1.1,
      o: 0.25 + rnd() * 0.65,
      twinkle: i % 9 === 0,
      delay: rnd() * 4,
    }));
  }, [count, seed]);

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
    >
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="#EDF5FF"
          opacity={s.o}
          className={s.twinkle ? "animate-twinkle" : undefined}
          style={s.twinkle ? { animationDelay: `${s.delay}s` } : undefined}
        />
      ))}
    </svg>
  );
}

/** Destello de 4 puntas como los del sistema visual. */
export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`pointer-events-none absolute ${className}`}>
      <path d="M12 0c.7 8.3 3.7 11.3 12 12-8.3.7-11.3 3.7-12 12-.7-8.3-3.7-11.3-12-12 8.3-.7 11.3-3.7 12-12z" fill="#EDF5FF" />
    </svg>
  );
}

/**
 * Planeta con borde de luz azul/cian, hecho en CSS. Hace de fondo hasta que
 * exista la ilustración `hero-planeta.webp`.
 */
export function Planet({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        background: [
          "radial-gradient(ellipse at 30% 78%, rgba(0,211,255,0.16), transparent 38%)",
          "radial-gradient(ellipse at 55% 60%, rgba(57,124,255,0.10), transparent 45%)",
          "radial-gradient(circle at 35% 72%, #12306a 0%, #0c1e47 28%, #081433 52%, #050a18 76%)",
        ].join(","),
        boxShadow: [
          "0 0 90px 14px rgba(57,124,255,0.28)",
          "0 0 24px 2px rgba(0,211,255,0.30)",
          "inset 22px -22px 56px -18px rgba(0,211,255,0.55)",
          "inset 0 0 0 1.5px rgba(127,168,255,0.55)",
        ].join(","),
      }}
    />
  );
}
