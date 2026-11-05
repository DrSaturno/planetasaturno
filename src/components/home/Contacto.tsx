import { useState } from "react";
import { Link } from "react-router-dom";
import { contacto, whatsappUrl } from "../../content/catalogo";
import { garantias } from "../../content/home";
import { track } from "../../lib/track";
import Icon from "../Icon";
import SlotImage from "../SlotImage";
import { Starfield } from "../Space";
import { Kicker } from "./shared";

const ESCENA = "/brand/cta-final.webp";
const ESCENA_VERTICAL = "/brand/cta-final-mobile.webp";

export default function Contacto() {
  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="relative scroll-mt-20 overflow-hidden border-t border-bg-600/50">
      <Starfield count={90} seed={31} />

      {/* desktop: escena de fondo, el astronauta queda libre a la derecha del formulario */}
      <SlotImage
        src={ESCENA}
        alt=""
        className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-[45%_65%] lg:block"
        fallback={null}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-bg-900 from-15% via-bg-900/60 via-45% to-transparent to-65% lg:block" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-bg-900 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-bg-900 to-transparent" />

      {/* celular: versión vertical de la escena al pie; el formulario tapa el cielo vacío y el astronauta queda abajo */}
      <SlotImage
        src={ESCENA_VERTICAL}
        alt="Astronauta de Planeta Saturno mirando el planeta"
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_85%,transparent)] sm:hidden"
        fallback={null}
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-[104vw] sm:px-6 sm:pb-0 lg:py-24">
        <div className="relative z-10 grid gap-10 md:grid-cols-2 lg:w-[64%] xl:gap-12">
          <div>
            <Kicker>Hablemos de tu proyecto</Kicker>
            <h2 id="contacto-titulo" className="mt-3 font-display text-3xl leading-[1.12] font-bold text-text-hi sm:text-4xl">
              ¿Tenés un proyecto
              <br />
              en mente?
            </h2>
            <p className="mt-5 max-w-md text-base text-text-mid">
              Contanos tu idea y te asesoramos sin compromiso. Te ayudamos a encontrar la mejor solución para tu negocio.
            </p>
            <ul className="mt-8 space-y-5">
              {garantias.map((g) => (
                <li key={g.titulo} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-500/40 bg-bg-800 text-blue-300">
                    <Icon name={g.icono} />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-text-hi">{g.titulo}</p>
                    <p className="text-sm text-text-mid">{g.texto}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-text-mid">
              ¿Preferís empezar por tu cuenta?{" "}
              <Link to="/auditoria" className="font-semibold text-blue-300 underline-offset-4 hover:text-text-hi hover:underline">
                Hacé la Mini Auditoría gratis →
              </Link>
            </p>
          </div>

          <FormularioContacto />
        </div>

        {/* tablet: la escena cierra la sección de borde a borde, asomando detrás del formulario */}
        <div className="-mx-6 -mt-28 hidden sm:block lg:hidden">
          <SlotImage
            src={ESCENA}
            alt="Astronauta de Planeta Saturno mirando el planeta"
            className="aspect-[16/9] w-full object-cover object-[88%_center] [mask-image:linear-gradient(to_bottom,transparent,black_35%,black_80%,transparent)]"
            fallback={null}
          />
        </div>
      </div>
    </section>
  );
}

type Campos = { nombre: string; email: string; telefono: string; mensaje: string };
type Errores = Partial<Record<keyof Campos, string>>;

const VACIO: Campos = { nombre: "", email: "", telefono: "", mensaje: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validar(c: Campos): Errores {
  const e: Errores = {};
  if (!c.nombre.trim()) e.nombre = "Contanos tu nombre.";
  if (!c.email.trim()) e.email = "Necesitamos un email para responderte.";
  else if (!EMAIL_RE.test(c.email.trim())) e.email = "Revisá el email, parece incompleto.";
  if (!c.mensaje.trim()) e.mensaje = "Contanos en dos líneas qué necesitás.";
  return e;
}

/**
 * TODO(Nico): cuando exista WF-LEAD-01, este formulario manda a un webhook de
 * n8n (→ Supabase `leads` + CRM). Hasta entonces arma el mensaje y lo abre en
 * WhatsApp (o lo copia y abre Instagram si no hay número cargado en catalogo.ts).
 */
function FormularioContacto() {
  const [campos, setCampos] = useState<Campos>(VACIO);
  const [errores, setErrores] = useState<Errores>({});
  const [estado, setEstado] = useState<string | null>(null);

  function set<K extends keyof Campos>(k: K, v: string) {
    setCampos((c) => ({ ...c, [k]: v }));
    if (errores[k]) setErrores((e) => ({ ...e, [k]: undefined }));
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validar(campos);
    setErrores(e);
    if (Object.keys(e).length > 0) {
      document.getElementById(`campo-${Object.keys(e)[0]}`)?.focus();
      return;
    }

    const texto = [
      `Hola! Soy ${campos.nombre.trim()}.`,
      campos.mensaje.trim(),
      `Email: ${campos.email.trim()}`,
      campos.telefono.trim() ? `Tel: ${campos.telefono.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const wa = whatsappUrl(texto);
    if (wa) {
      window.open(wa, "_blank", "noopener,noreferrer");
      setEstado("Te abrimos WhatsApp con tu mensaje listo: solo tocá enviar.");
      track("contact_submit", { canal: "whatsapp" });
    } else {
      let copiado = false;
      try {
        await navigator.clipboard.writeText(texto);
        copiado = true;
      } catch {
        copiado = false;
      }
      window.open(contacto.instagram_url, "_blank", "noopener,noreferrer");
      setEstado(
        copiado
          ? `Copiamos tu mensaje. Te abrimos Instagram: pegalo en un mensaje directo a ${contacto.instagram}.`
          : `Te abrimos Instagram: escribinos por mensaje directo a ${contacto.instagram}.`,
      );
      track("contact_submit", { canal: "instagram" });
    }
    setCampos(VACIO);
  }

  const input =
    "w-full rounded-lg border bg-bg-900/70 px-3.5 py-2.5 text-sm text-text-hi placeholder:text-text-low transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none";
  const borde = (k: keyof Campos) => (errores[k] ? "border-danger" : "border-bg-600");

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-label="Formulario de contacto"
      className="self-start rounded-2xl border border-bg-600/80 bg-bg-800/80 p-6 shadow-[0_30px_80px_-30px_rgba(57,124,255,0.5)] backdrop-blur-md sm:p-7"
    >
      <div className="space-y-4">
        <Campo id="nombre" label="Nombre" requerido error={errores.nombre}>
          <input id="campo-nombre" autoComplete="name" placeholder="Tu nombre" value={campos.nombre} onChange={(e) => set("nombre", e.target.value)} aria-invalid={!!errores.nombre} aria-describedby={errores.nombre ? "error-nombre" : undefined} className={`${input} ${borde("nombre")}`} />
        </Campo>
        <Campo id="email" label="Email" requerido error={errores.email}>
          <input id="campo-email" type="email" autoComplete="email" placeholder="tu@email.com" value={campos.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errores.email} aria-describedby={errores.email ? "error-email" : undefined} className={`${input} ${borde("email")}`} />
        </Campo>
        <Campo id="telefono" label="Teléfono (opcional)">
          <input id="campo-telefono" type="tel" autoComplete="tel" placeholder="+54 9 11 1234-5678" value={campos.telefono} onChange={(e) => set("telefono", e.target.value)} className={`${input} ${borde("telefono")}`} />
        </Campo>
        <Campo id="mensaje" label="Mensaje" requerido error={errores.mensaje}>
          <textarea id="campo-mensaje" rows={4} placeholder="Contanos sobre tu proyecto…" value={campos.mensaje} onChange={(e) => set("mensaje", e.target.value)} aria-invalid={!!errores.mensaje} aria-describedby={errores.mensaje ? "error-mensaje" : undefined} className={`${input} resize-none ${borde("mensaje")}`} />
        </Campo>
      </div>

      <button
        type="submit"
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 font-display text-sm font-semibold text-white shadow-[0_0_30px_-6px_rgba(57,124,255,0.8)] transition-all hover:bg-blue-500"
      >
        Enviar consulta
        <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>

      <p role="status" className="mt-4 min-h-5 text-sm text-green-300">
        {estado}
      </p>
    </form>
  );
}

function Campo({ id, label, requerido, error, children }: { id: string; label: string; requerido?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={`campo-${id}`} className="mb-1.5 block text-sm font-medium text-text-hi">
        {label}
        {requerido && <span className="text-blue-300"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`error-${id}`} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
