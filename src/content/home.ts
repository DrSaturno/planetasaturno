/**
 * Contenido del Home v2 (SPEC.md §6.1b). Textos tomados del mockup aprobado
 * por Nico (2026-11-04). Precios y datos de negocio NO van acá: viven en catalogo.ts.
 */
import type { IconName } from "../components/Icon";

export type Tono = "blue" | "green" | "violet";

export const hero = {
  kicker: "Automatización · IA · Sistemas · Diseño · Pauta",
  tituloLineas: ["Ideas que", "trabajan"],
  tituloAcento: "por vos.",
  bajada:
    "Implementamos agentes de IA, chatbots, sistemas y sitios web a medida para que vendas más, trabajes menos y te enfoques en lo importante.",
  nota: ["Tu negocio", "en piloto", "automático"],
};

export const beneficios: { icono: IconName; texto: [string, string] }[] = [
  { icono: "bolt", texto: ["Más ventas y", "oportunidades"] },
  { icono: "target", texto: ["Menos tareas", "repetitivas"] },
  { icono: "chart", texto: ["Procesos más", "eficientes"] },
  { icono: "shield", texto: ["Mejor experiencia", "para tus clientes"] },
];

export type ServicioHome = {
  slug: string;
  tono: Tono;
  pill: string;
  titulo: [string, string];
  descripcion: string;
  bullets: string[];
  icono: IconName;
  imagen: string;
};

export const serviciosHome: ServicioHome[] = [
  {
    slug: "agentes-ia",
    tono: "blue",
    pill: "Agentes de IA",
    titulo: ["Agentes de IA", "a medida"],
    descripcion: "Automatizá procesos, conectá tus herramientas y creá tu propio agente.",
    bullets: [
      "Instalación en tu VPS",
      "Skills y automatizaciones",
      "Integración con tus sistemas",
      "Soporte y documentación",
    ],
    icono: "bot",
    imagen: "/brand/card-agentes.webp",
  },
  {
    slug: "chatbot-whatsapp-crm",
    tono: "green",
    pill: "WhatsApp + CRM",
    titulo: ["Chatbot de", "WhatsApp + CRM"],
    descripcion: "Convertí conversaciones en clientes y gestioná todo en un solo lugar.",
    bullets: [
      "Chatbot inteligente 24/7",
      "CRM integrado (leads, ventas)",
      "Integración con WhatsApp Business",
      "Reportes y métricas",
    ],
    icono: "whatsapp",
    imagen: "/brand/card-whatsapp.webp",
  },
  {
    slug: "sitios-web-ia",
    tono: "violet",
    pill: "Desarrollo web",
    titulo: ["Sitios web", "a medida con IA"],
    descripcion: "Páginas modernas, rápidas y optimizadas, con integraciones y automatizaciones.",
    bullets: [
      "Diseño personalizado",
      "Integración con IA",
      "Optimización SEO / SEM",
      "Soporte y mantenimiento",
    ],
    icono: "browser",
    imagen: "/brand/card-web.webp",
  },
];

export const pasos: { numero: string; titulo: string; texto: string; icono: IconName }[] = [
  { numero: "01", titulo: "Charlamos", texto: "Nos contás tu idea y objetivos.", icono: "chat" },
  { numero: "02", titulo: "Diseñamos", texto: "Te proponemos la mejor solución.", icono: "pencil" },
  { numero: "03", titulo: "Implementamos", texto: "Ponemos todo en marcha.", icono: "rocket" },
  { numero: "04", titulo: "Acompañamos", texto: "Soporte, mejoras y nuevas ideas.", icono: "headset" },
];

export type CasoHome = {
  slug: string;
  cliente: string;
  trabajo: string;
  /**
   * CLAUDE.md §7: un cliente solo aparece en producción con permiso explícito.
   * TODO(Nico): pasar a `true` los que autorizaron. En `npm run dev` se ven
   * todos con la etiqueta "borrador" para revisar el diseño.
   */
  publicar: boolean;
};

export const casosHome: CasoHome[] = [
  { slug: "modoc", cliente: "Modoc", trabajo: "Sitio web institucional + CRM", publicar: false },
  { slug: "gf-instalaciones", cliente: "GF Instalaciones", trabajo: "Automatización de presupuestos", publicar: false },
  { slug: "coverall-deco", cliente: "Coverall Deco", trabajo: "Sitio web + cotizador con IA", publicar: false },
  { slug: "imperio-verde", cliente: "Imperio Verde", trabajo: "E-commerce y automatizaciones", publicar: false },
  { slug: "crazy-lady-seeds", cliente: "Crazy Lady Seeds", trabajo: "Sitio web + e-commerce", publicar: false },
  { slug: "cossi", cliente: "Cossi", trabajo: "Estrategia digital y contenido", publicar: false },
];

export const garantias: { icono: IconName; titulo: string; texto: string }[] = [
  { icono: "clock", titulo: "Respuesta rápida", texto: "Te contactamos en menos de 24 h." },
  { icono: "users", titulo: "Asesoramiento personalizado", texto: "Soluciones a medida para tu negocio." },
  { icono: "shield", titulo: "Sin compromiso", texto: "Podés consultarnos aunque sea una idea inicial." },
];
