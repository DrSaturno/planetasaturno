import { useState } from "react";
import { nivel0 } from "../content/catalogo";

type FormState = {
  nombre: string;
  empresa: string;
  email: string;
  whatsapp: string;
  rubro: string;
};

const initialState: FormState = { nombre: "", empresa: "", email: "", whatsapp: "", rubro: "" };

export default function Auditoria() {
  const [form, setForm] = useState<FormState>(initialState);
  const [enviado, setEnviado] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO(WF-LEAD-01): esto todavía no está conectado a n8n/Supabase.
    // Por ahora solo confirma recepción visualmente — no se persiste ni se envía nada.
    // Conectar cuando WF-LEAD-01 exista (SPEC.md §3.3 / TASKS.md Fase 2.2).
    console.info("[auditoria] envío pendiente de conectar a WF-LEAD-01:", form);
    setEnviado(true);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="font-display text-xs uppercase tracking-widest text-telemetry">nivel 0 · gratis</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold text-ink-100 sm:text-4xl">
        {nivel0.nombre}
      </h1>
      <p className="mt-4 font-body text-ink-400">{nivel0.descripcion}</p>

      {enviado ? (
        <div className="mt-10 rounded-lg border border-telemetry/40 bg-space-900 p-6">
          <p className="font-display text-sm font-bold text-telemetry">Recibido.</p>
          <p className="mt-2 font-body text-sm text-ink-400">
            Te contacto en breve. Mientras tanto, escribime por Instagram si tenés algo urgente.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">
          <Field label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
          <Field label="Empresa" name="empresa" value={form.empresa} onChange={handleChange} required />
          <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          <Field label="WhatsApp" name="whatsapp" value={form.whatsapp} onChange={handleChange} required />
          <Field label="Rubro" name="rubro" value={form.rubro} onChange={handleChange} required />
          <button
            type="submit"
            className="mt-2 rounded border border-ring bg-ring px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-space-950 transition-opacity hover:opacity-90"
          >
            Pedir mi auditoría
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-display text-xs uppercase tracking-wide text-ink-400">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="rounded border border-ink-400/30 bg-space-900 px-3 py-2 font-body text-sm text-ink-100 outline-none focus:border-telemetry"
      />
    </label>
  );
}
