import {
  nivel0,
  nivel1,
  nivel3,
  productosNivel2,
  casos,
  contacto,
} from "../content/catalogo";

export type TerminalLine =
  | { type: "text"; text: string }
  | { type: "link"; text: string; href: string; external?: boolean };

const t = (text: string): TerminalLine => ({ type: "text", text });

type Ctx = {
  navigate: (path: string) => void;
  closeAfter: () => void;
};

const OPEN_TARGETS: Record<string, { path: string; external?: boolean }> = {
  home: { path: "/" },
  servicios: { path: "/servicios" },
  auditoria: { path: "/auditoria" },
  casos: { path: "/casos" },
  blog: { path: "/blog" },
  "sobre-mi": { path: "/sobre-mi" },
  instagram: { path: contacto.instagram_url, external: true },
};

function cmdHelp(): TerminalLine[] {
  return [
    t("comandos disponibles:"),
    t("  help              – esta lista"),
    t("  whoami            – quién es Nico / Dr. Saturno"),
    t("  servicios         – catálogo completo con precios"),
    t("  casos             – clientes reales"),
    t("  stack             – stack técnico de la agencia"),
    t("  contacto          – cómo escribirme"),
    t("  open <destino>    – navega a una sección (home, servicios, auditoria, casos, blog, sobre-mi, instagram)"),
    t("  cat ethos.md      – la filosofía de esto"),
    t("  date              – fecha y hora"),
    t("  fortune           – un dato al azar"),
    t("  clear             – limpiar pantalla"),
  ];
}

function cmdWhoami(): TerminalLine[] {
  return [
    t("Nico — Dr. Saturno."),
    t("Agencia de IA aplicada a negocios. La construyo en público, operada por"),
    t("agentes, con un Agente Director como único punto de contacto."),
  ];
}

function cmdServicios(): TerminalLine[] {
  const lines: TerminalLine[] = [
    t(`nivel 0 — ${nivel0.nombre}                gratis`),
    t(`nivel 1 — ${nivel1.nombre}                ${nivel1.precio_desde}–${nivel1.precio_hasta}`),
    t(""),
    t("nivel 2 — implementaciones:"),
  ];
  for (const p of productosNivel2) {
    lines.push(t(`  · ${p.nombre.padEnd(28)} setup ${p.precio_setup}`));
  }
  lines.push(t(""));
  lines.push(t(`nivel 3 — ${nivel3.nombre}       ${nivel3.precio} (${nivel3.condiciones})`));
  lines.push(t(""));
  lines.push({ type: "link", text: "→ ver detalle completo (/servicios)", href: "/servicios" });
  return lines;
}

function cmdCasos(): TerminalLine[] {
  if (casos.length === 0) {
    return [t("todavía no hay casos publicados — pronto.")];
  }
  const lines: TerminalLine[] = [];
  for (const c of casos) {
    lines.push(t(`${c.cliente} — ${c.rubro}`));
    lines.push(t(`  ${c.que_se_construyo}`));
    lines.push(t(""));
  }
  lines.push({ type: "link", text: "→ ver todos los casos (/casos)", href: "/casos" });
  return lines;
}

function cmdStack(): TerminalLine[] {
  return [
    t("Supabase · n8n (self-hosted) · Claude (agentes + Claude Code) ·"),
    t("WhatsApp Cloud API + Instagram · Meta Marketing API · Vercel ·"),
    t("Telegram (comando del Agente Director)"),
  ];
}

function cmdContacto(): TerminalLine[] {
  return [
    { type: "link", text: `Instagram: ${contacto.instagram}`, href: contacto.instagram_url, external: true },
    t(`Web: ${contacto.web}`),
  ];
}

function cmdCat(args: string[]): TerminalLine[] {
  const file = args[0];
  if (file === "ethos.md") {
    return [
      t('"Automatizar no es reemplazar — es sacarte del medio de lo repetitivo'),
      t(' para que tu tiempo vaya a lo que solo vos podés decidir."'),
      t(""),
      t("Esta agencia se construye en público. Cada agente, cada workflow,"),
      t("cada decisión queda documentada. No hay caja negra."),
    ];
  }
  return [t(`cat: ${file ?? "(sin archivo)"}: no existe. probá "cat ethos.md"`)];
}

function cmdOpen(args: string[], ctx: Ctx): TerminalLine[] {
  const target = args[0];
  const found = target ? OPEN_TARGETS[target] : undefined;
  if (!found) {
    return [
      t(`open: destino "${target ?? ""}" no reconocido.`),
      t(`probá: ${Object.keys(OPEN_TARGETS).join(", ")}`),
    ];
  }
  if (found.external) {
    window.open(found.path, "_blank", "noopener,noreferrer");
    return [t(`abriendo ${target}...`)];
  }
  ctx.navigate(found.path);
  ctx.closeAfter();
  return [t(`abriendo ${target}...`)];
}

function cmdDate(): TerminalLine[] {
  return [
    t(
      new Intl.DateTimeFormat("es-AR", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "America/Argentina/Buenos_Aires",
      }).format(new Date())
    ),
  ];
}

const FORTUNES = [
  "el mejor workflow es el que no notás que existe.",
  "un agente sin log es un agente en el que no podés confiar.",
  "la aprobación humana no es fricción — es la red de seguridad.",
  "no dispersión: agencia + web + embudo + bot factory, en ese orden.",
];

function cmdFortune(): TerminalLine[] {
  return [t(FORTUNES[Math.floor(Math.random() * FORTUNES.length)])];
}

export function runCommand(raw: string, ctx: Ctx): TerminalLine[] {
  const trimmed = raw.trim();
  if (!trimmed) return [];
  const [cmd, ...args] = trimmed.split(/\s+/);

  switch (cmd.toLowerCase()) {
    case "help":
      return cmdHelp();
    case "whoami":
      return cmdWhoami();
    case "servicios":
      return cmdServicios();
    case "casos":
      return cmdCasos();
    case "stack":
      return cmdStack();
    case "contacto":
      return cmdContacto();
    case "cat":
      return cmdCat(args);
    case "open":
      return cmdOpen(args, ctx);
    case "date":
      return cmdDate();
    case "fortune":
      return cmdFortune();
    case "clear":
      return [];
    default:
      return [t(`comando no encontrado: "${cmd}". probá "help".`)];
  }
}
