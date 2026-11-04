/**
 * Fuente única de contenido del negocio.
 * Páginas Y el modo Terminal leen de acá — cero duplicación, cero datos inventados.
 * Origen: PLAN_MAESTRO_AGENCIA_IA.md §2 (escalera de servicios) y CLAUDE.md §3 (departamentos).
 */

export type Producto = {
  slug: string;
  nombre: string;
  que_incluye: string;
  precio_setup: string;
  retainer_mensual: string | null;
};

export const nivel0 = {
  nombre: "Mini Auditoría IA",
  descripcion:
    "Completás un formulario de 10 preguntas y un agente genera un reporte con 3 oportunidades de IA detectadas en tu negocio + estimación de ahorro.",
  precio: "Gratis",
};

export const nivel1 = {
  nombre: "Diagnóstico IA",
  descripcion:
    "Reunión de 60-90 min + análisis de tus procesos, canales y datos. Entregable: Roadmap de Automatización — qué automatizar, ROI estimado por proceso, plan priorizado.",
  precio_desde: "USD 300",
  precio_hasta: "USD 500",
};

export const productosNivel2: Producto[] = [
  {
    slug: "agente-ventas-whatsapp",
    nombre: "Agente de Ventas WhatsApp",
    que_incluye:
      "Bot IA en WhatsApp: responde 24/7, califica leads, agenda reuniones, deriva a humano cuando hace falta.",
    precio_setup: "USD 1.500–2.500",
    retainer_mensual: "USD 300–500",
  },
  {
    slug: "agente-atencion-cliente",
    nombre: "Agente de Atención al Cliente",
    que_incluye:
      "Soporte automatizado multicanal (WhatsApp, IG DM, email), base de conocimiento de tu negocio, escalamiento inteligente.",
    precio_setup: "USD 1.500–2.500",
    retainer_mensual: "USD 300–500",
  },
  {
    slug: "automatizacion-operaciones",
    nombre: "Automatización de Operaciones",
    que_incluye:
      "3-5 workflows a medida: facturación, seguimiento de pedidos, reportes automáticos, sincronización de sistemas.",
    precio_setup: "USD 2.000–4.000",
    retainer_mensual: "USD 400–600",
  },
  {
    slug: "motor-contenido-ia",
    nombre: "Motor de Contenido IA",
    que_incluye:
      "Pipeline de contenido adaptado a tu marca: calendario, copies, imágenes, programación automática.",
    precio_setup: "USD 1.200–2.000",
    retainer_mensual: "USD 400–700",
  },
  {
    slug: "ads-ia",
    nombre: "Ads + IA",
    que_incluye:
      "Gestión de Meta/Google Ads con optimización asistida por agentes y reporting automático.",
    precio_setup: "USD 500",
    retainer_mensual: "USD 500–1.200",
  },
];

export const nivel3 = {
  nombre: "Departamento de IA",
  descripcion:
    "Tercerizás tu transformación con IA completa: combinamos 2-4 productos del catálogo + mejora continua + reunión mensual estratégica. El equivalente a sumar un gerente de innovación con equipo técnico, por una fracción del costo.",
  precio: "USD 1.500–3.500/mes",
  condiciones: "Contrato mínimo 6 meses",
};

export const nivel4 = {
  nombre: "Capacitación y consultoría",
  items: [
    { nombre: "Workshop \"IA para tu empresa\" (medio día)", precio: "USD 800–1.500" },
    { nombre: "Capacitación de equipos en IA", precio: "USD 1.000–2.500" },
  ],
};

export type Departamento = {
  slug: string;
  nombre: string;
  descripcion: string;
};

/** Organigrama real de "Conducting AI" — CLAUDE.md §3. */
export const departamentos: Departamento[] = [
  {
    slug: "ventas",
    nombre: "Ventas",
    descripcion: "Calificación de leads, seguimiento y propuestas — respuesta en menos de 5 minutos.",
  },
  {
    slug: "marketing",
    nombre: "Marketing",
    descripcion: "Contenido, casos de éxito y el lead magnet (Mini Auditoría) que alimenta el embudo.",
  },
  {
    slug: "pauta-meta",
    nombre: "Pauta Meta",
    descripcion: "Monitoreo de campañas cada 6 horas — no una vez por semana como una agencia tradicional.",
  },
  {
    slug: "delivery",
    nombre: "Delivery",
    descripcion: "Alta, monitoreo y QA de los bots — el Bot Factory que entrega en días, no meses.",
  },
  {
    slug: "customer-success",
    nombre: "Customer Success",
    descripcion: "Informes automáticos, salud de cuenta y detección temprana de oportunidades de upsell.",
  },
  {
    slug: "finanzas",
    nombre: "Finanzas",
    descripcion: "Facturación, cobros y seguimiento del MRR — la cuenta siempre al día.",
  },
];

export type Caso = {
  slug: string;
  cliente: string;
  rubro: string;
  que_se_construyo: string;
};

/**
 * Solo clientes reales verificados (TASKS.md, 2026-07-18). Sin métricas —
 * no hay datos numéricos confirmados todavía. Ampliar solo con aprobación
 * explícita de Nico y datos reales.
 */
export const casos: Caso[] = [
  {
    slug: "se-instala-shop",
    cliente: "Se Instala Shop",
    rubro: "E-commerce",
    que_se_construyo:
      "Bot de atención y ventas por WhatsApp Cloud API, integrado al Bot Factory de Planeta Saturno.",
  },
  {
    slug: "coverall-deco",
    cliente: "CoverAll Deco",
    rubro: "Decoración / retail",
    que_se_construyo:
      "Bot de atención y ventas por WhatsApp Cloud API, integrado al Bot Factory de Planeta Saturno.",
  },
];

export const contacto = {
  instagram: "@drsaturno.tech",
  instagram_url: "https://instagram.com/drsaturno.tech",
  web: "planetasaturno.com",
  /**
   * TODO(Nico): número de WhatsApp en formato internacional sin "+" ni espacios
   * (ej. 5491112345678). Vacío = el formulario de contacto y la terminal
   * derivan a Instagram en vez de WhatsApp.
   */
  whatsapp: "",
};

export function whatsappUrl(texto?: string): string | null {
  if (!contacto.whatsapp) return null;
  const q = texto ? `?text=${encodeURIComponent(texto)}` : "";
  return `https://wa.me/${contacto.whatsapp}${q}`;
}
