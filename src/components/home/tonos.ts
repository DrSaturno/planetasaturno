import type { Tono } from "../../content/home";

/**
 * Clases por color de servicio (BRAND.md §1). Strings completos para que
 * Tailwind los detecte. Texto chico siempre en la variante -300 (contraste AA).
 */
export const TONOS: Record<
  Tono,
  { pill: string; check: string; link: string; card: string; glow: string; tile: string; icon: string }
> = {
  blue: {
    pill: "bg-blue-500/15 text-blue-300 ring-1 ring-blue-500/35",
    check: "text-blue-500",
    link: "text-blue-300",
    card: "border-blue-500/25 hover:border-blue-500/60 hover:shadow-[0_0_48px_-14px_rgba(57,124,255,0.6)]",
    glow: "rgba(57,124,255,0.45)",
    tile: "border-blue-500/40 bg-blue-500/10 shadow-[0_0_40px_-6px_rgba(57,124,255,0.7)]",
    icon: "text-blue-300",
  },
  green: {
    pill: "bg-green-500/15 text-green-300 ring-1 ring-green-500/35",
    check: "text-green-500",
    link: "text-green-300",
    card: "border-green-500/25 hover:border-green-500/60 hover:shadow-[0_0_48px_-14px_rgba(37,211,102,0.5)]",
    glow: "rgba(37,211,102,0.38)",
    tile: "border-green-500/40 bg-green-500/10 shadow-[0_0_40px_-6px_rgba(37,211,102,0.6)]",
    icon: "text-green-300",
  },
  violet: {
    pill: "bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/35",
    check: "text-violet-500",
    link: "text-violet-300",
    card: "border-violet-500/25 hover:border-violet-500/60 hover:shadow-[0_0_48px_-14px_rgba(139,92,255,0.6)]",
    glow: "rgba(139,92,255,0.45)",
    tile: "border-violet-500/40 bg-violet-500/10 shadow-[0_0_40px_-6px_rgba(139,92,255,0.7)]",
    icon: "text-violet-300",
  },
};
