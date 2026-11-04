/**
 * Base de preguntas de la terminal (SPEC.md §6.1b). Sin IA: el texto libre se
 * compara por palabras clave contra esta lista.
 *
 * Regla: las respuestas salen de catalogo.ts / PLAN_MAESTRO / CLAUDE.md.
 * No se inventan precios ni plazos — lo que no tiene fuente queda con TODO(Nico).
 */
import type { TerminalLine } from "../lib/terminalCommands";
import { contacto, nivel0, nivel1, nivel3, productosNivel2, whatsappUrl } from "./catalogo";
import { pasos } from "./home";

export type Faq = {
  id: string;
  pregunta: string;
  /** Texto corto del chip; solo las que lo tienen aparecen como pregunta rápida. */
  chip?: string;
  keywords: string[];
  respuesta: () => TerminalLine[];
};

const t = (text: string): TerminalLine => ({ type: "text", text });
const link = (text: string, href: string): TerminalLine => ({ type: "link", text, href });

function lineasContacto(): TerminalLine[] {
  const wa = whatsappUrl("Hola! Vengo de la web de Planeta Saturno.");
  return [
    link("→ dejanos tu consulta (te respondemos en menos de 24 h)", "/#contacto"),
    ...(wa ? [link("→ escribinos por WhatsApp", wa)] : []),
    link(`→ Instagram ${contacto.instagram}`, contacto.instagram_url),
  ];
}

export const faqs: Faq[] = [
  {
    id: "servicios",
    pregunta: "¿Qué servicios ofrecen?",
    chip: "¿Qué hacen?",
    keywords: ["servicio", "servicios", "que hacen", "ofrecen", "productos", "soluciones", "que venden"],
    respuesta: () => [
      t("Trabajamos en tres frentes:"),
      t("  · Agentes de IA a medida — automatizan procesos y se conectan con tus herramientas."),
      t("  · Chatbot de WhatsApp + CRM — atiende 24/7 y ordena tus leads y ventas."),
      t("  · Sitios web a medida con IA — rápidos, optimizados y con integraciones."),
      t("También: automatización de operaciones, contenido con IA y pauta en Meta/Google."),
      link("→ ver el detalle de servicios", "/servicios"),
    ],
  },
  {
    id: "precios",
    pregunta: "¿Cuánto sale?",
    chip: "¿Cuánto sale?",
    keywords: ["precio", "precios", "cuanto sale", "cuanto cuesta", "cuesta", "costo", "costos", "presupuesto", "tarifa", "valor", "usd", "dolares", "pagar", "cobran"],
    respuesta: () => [
      t(`${nivel0.nombre}: gratis.`),
      t(`${nivel1.nombre}: ${nivel1.precio_desde}–${nivel1.precio_hasta}.`),
      t("Implementaciones (setup + abono mensual):"),
      ...productosNivel2.map((p) =>
        t(`  · ${p.nombre}: ${p.precio_setup}${p.retainer_mensual ? ` + ${p.retainer_mensual}/mes` : ""}`),
      ),
      t(`${nivel3.nombre}: ${nivel3.precio} (${nivel3.condiciones.toLowerCase()}).`),
      t("Sitios web: se cotizan según el alcance."),
      link("→ pedí tu presupuesto", "/#contacto"),
    ],
  },
  {
    id: "como-trabajamos",
    pregunta: "¿Cómo trabajan?",
    chip: "¿Cómo trabajan?",
    keywords: ["como trabajan", "proceso", "pasos", "metodologia", "como es", "empezar", "arrancar", "como funciona", "funciona"],
    respuesta: () => [
      ...pasos.map((p) => t(`${p.numero} · ${p.titulo} — ${p.texto}`)),
      link("→ ver cómo trabajamos", "/#como-trabajamos"),
    ],
  },
  {
    id: "plazos",
    pregunta: "¿Cuánto tarda un proyecto?",
    chip: "¿Cuánto tarda?",
    keywords: ["cuanto tarda", "tarda", "tiempo", "plazo", "plazos", "demora", "demoran", "dias", "semanas", "entrega", "rapido"],
    // TODO(Nico): sumar plazos típicos por servicio cuando estén definidos (hoy no hay fuente).
    respuesta: () => [
      t("Depende del alcance: el plazo exacto lo definimos en la propuesta, después de la primera charla."),
      t("Lo que sí te aseguramos: respondemos todas las consultas en menos de 24 h."),
      link("→ contanos tu proyecto", "/#contacto"),
    ],
  },
  {
    id: "rubros",
    pregunta: "¿Trabajan con mi rubro?",
    chip: "¿Trabajan con mi rubro?",
    keywords: ["rubro", "industria", "sector", "mi negocio", "tipo de empresa", "pyme", "pymes", "tienda", "gastronomia", "restaurante", "delivery", "inmobiliaria", "concesionaria", "educacion", "colegio", "instituto", "profesional", "estudio", "retail"],
    respuesta: () => [
      t("Trabajamos con PyMEs de distintos rubros. Donde más experiencia tenemos:"),
      t("  · e-commerce y retail"),
      t("  · gastronomía y delivery"),
      t("  · servicios profesionales"),
      t("  · inmobiliarias y concesionarias"),
      t("  · educación privada"),
      t("Si el tuyo no está, escribinos igual: lo vemos juntos."),
      link("→ contanos de tu negocio", "/#contacto"),
    ],
  },
  {
    id: "whatsapp",
    pregunta: "¿Cómo es el chatbot de WhatsApp?",
    keywords: ["whatsapp", "chatbot", "bot", "wpp", "wsp", "mensajes", "responder", "atencion", "24/7"],
    respuesta: () => [
      t(productosNivel2[0].que_incluye),
      t("Funciona sobre la API oficial de WhatsApp (Meta) y se conecta a un CRM para que no se pierda ningún lead."),
      link("→ ver el servicio", "/#servicios"),
    ],
  },
  {
    id: "agentes",
    pregunta: "¿Qué es un agente de IA?",
    keywords: ["agente", "agentes", "inteligencia artificial", "que es la ia", "automatizar", "automatizacion", "automatizaciones", "n8n"],
    respuesta: () => [
      t("Un agente de IA es un asistente que hace tareas por vos: lee un mensaje o un dato,"),
      t("decide qué hacer y actúa en tus sistemas — responde, carga datos en el CRM, avisa a tu equipo."),
      t("Lo armamos a medida de tus procesos y te lo dejamos documentado."),
      link("→ ver el servicio", "/#servicios"),
    ],
  },
  {
    id: "web",
    pregunta: "¿Hacen sitios web?",
    keywords: ["web", "sitio", "sitios", "pagina", "paginas", "landing", "seo", "sem", "dominio", "hosting"],
    respuesta: () => [
      t("Sí. Diseñamos sitios a medida, rápidos y optimizados para buscadores,"),
      t("con integraciones de IA: formularios que cargan leads, chat, automatizaciones."),
      t("Se cotizan según el alcance."),
      link("→ pedí tu presupuesto", "/#contacto"),
    ],
  },
  {
    id: "gratis",
    pregunta: "¿Tienen algo gratis para empezar?",
    keywords: ["gratis", "gratuito", "gratuita", "sin costo", "prueba", "probar", "auditoria", "diagnostico"],
    respuesta: () => [
      t("La primera consulta no tiene costo ni compromiso."),
      t(`Y si querés empezar por tu cuenta: ${nivel0.nombre} — ${nivel0.descripcion}`),
      link("→ hacer la Mini Auditoría", "/auditoria"),
    ],
  },
  {
    id: "contacto",
    pregunta: "Quiero hablar con alguien",
    chip: "Quiero hablar con alguien",
    keywords: ["contacto", "contactar", "contactarlos", "hablar", "llamar", "telefono", "numero", "mail", "email", "correo", "instagram", "reunion", "agendar", "persona", "humano"],
    respuesta: () => [t("¡De una!"), ...lineasContacto()],
  },
  {
    id: "quienes",
    pregunta: "¿Quiénes son?",
    keywords: ["quien", "quienes", "equipo", "nico", "saturno", "empresa", "agencia", "donde estan", "ubicacion", "ubicados"],
    respuesta: () => [
      t("Planeta Saturno es la agencia de Nico (Dr. Saturno): automatización e IA aplicada a negocios,"),
      t("operada con agentes y construida en público. Trabajamos 100% remoto desde Argentina."),
      link("→ conocé la historia", "/sobre-mi"),
    ],
  },
];

export const chips = faqs.filter((f) => f.chip);

/** minúsculas, sin tildes, sin signos: "¿Cuánto SALE?" → "cuanto sale" */
export function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9/+\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Devuelve la pregunta que mejor coincide, o null si ninguna llega al umbral. */
export function buscarFaq(texto: string): Faq | null {
  const q = ` ${normalizar(texto)} `;
  let mejor: Faq | null = null;
  let mejorPuntaje = 0;
  for (const f of faqs) {
    let puntaje = 0;
    for (const k of f.keywords) {
      const kn = normalizar(k);
      if (q.includes(` ${kn} `) || (kn.length >= 5 && q.includes(kn))) {
        puntaje += kn.includes(" ") ? 3 : kn.length >= 5 ? 2 : 1;
      }
    }
    if (puntaje > mejorPuntaje) {
      mejor = f;
      mejorPuntaje = puntaje;
    }
  }
  return mejor;
}
