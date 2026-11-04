import type { ReactNode } from "react";

export type IconName =
  | "arrow-right"
  | "check"
  | "bolt"
  | "target"
  | "chart"
  | "shield"
  | "play"
  | "chat"
  | "pencil"
  | "rocket"
  | "headset"
  | "bot"
  | "whatsapp"
  | "browser"
  | "home"
  | "users"
  | "cart"
  | "plug"
  | "report"
  | "gear"
  | "database"
  | "bell"
  | "instagram"
  | "menu"
  | "x"
  | "terminal"
  | "clock"
  | "spark";

const PATHS: Record<IconName, ReactNode> = {
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  bolt: <path d="M13 3 4 14h7l-1 7 9-11h-7l1-7z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </>
  ),
  chart: <path d="M4 20h16M7 20v-6M12 20V8M17 20V4" />,
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.8-3.4 8-8 9-4.6-1-8-4.2-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  play: <path d="M9 7.5v9l7.5-4.5L9 7.5z" fill="currentColor" />,
  chat: <path d="M4 5h16v10.5H9.5L4 19.5V5z" />,
  pencil: <path d="M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4" />,
  rocket: (
    <>
      <path d="M12 3c3.2 2.2 5 6 5 9.5L15.5 16h-7L7 12.5C7 9 8.8 5.2 12 3z" />
      <circle cx="12" cy="10" r="1.6" />
      <path d="M9.5 19.5 12 17l2.5 2.5" />
    </>
  ),
  headset: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14h3v5H5.2A1.2 1.2 0 0 1 4 17.8V14zM20 14h-3v5h1.8a1.2 1.2 0 0 0 1.2-1.2V14z" />
    </>
  ),
  bot: (
    <>
      <rect x="5" y="8" width="14" height="11" rx="3" />
      <path d="M12 4.5V8M9.5 13v.5M14.5 13v.5M3 13v2M21 13v2" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3.5 20.5 5 16.3A8.5 8.5 0 1 1 8 19.2l-4.5 1.3z" />
      <path d="M9.2 8.6c-.4 2.8 2.6 6 5.6 5.9l.9-1.4-1.8-.9-.8.7c-.9-.4-1.6-1.1-2-2l.7-.8-.9-1.8-1.7.3z" />
    </>
  ),
  browser: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 9h18M6.5 6.8h.01M9 6.8h.01" />
    </>
  ),
  home: <path d="M4 11 12 4l8 7v9h-5v-5H9v5H4v-9z" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19.5c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5M15.5 5a3 3 0 0 1 0 6M20.5 19.5c0-2.4-1.4-4.4-3.4-5.2" />
    </>
  ),
  cart: (
    <>
      <path d="M3.5 5h2.2l2 10h10.1l1.9-7H7" />
      <circle cx="9" cy="19" r="1.2" />
      <circle cx="17" cy="19" r="1.2" />
    </>
  ),
  plug: <path d="M9 7V3.5M15 7V3.5M7 7h10v3.5a5 5 0 0 1-10 0V7zM12 15.5V20.5" />,
  report: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="2" />
      <path d="M8 16v-3M12 16V9M16 16v-5" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="2.8" />
      <path d="M4.5 6v12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V6M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" />
    </>
  ),
  bell: <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.8 1.8H4.2L6 16.5zM10 20.5a2 2 0 0 0 4 0" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.7" />
      <path d="M16.6 7.4h.01" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  terminal: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M7 10l3 2.5L7 15M12.5 15H17" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  spark: <path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z" />,
};

type Props = {
  name: IconName;
  className?: string;
  strokeWidth?: number;
};

/** Íconos de trazo, estilo outline del sistema visual. Decorativos por defecto. */
export default function Icon({ name, className = "h-5 w-5", strokeWidth = 1.8 }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
