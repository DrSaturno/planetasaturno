import { useEffect, useState } from "react";

export default function StatusBadge() {
  const [time, setTime] = useState(() => formatTime());

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-telemetry/30 bg-space-900 px-3 py-1 font-display text-[11px] uppercase tracking-wide text-telemetry">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-telemetry" aria-hidden="true" />
      online · buenos aires · {time}
    </div>
  );
}

function formatTime() {
  return new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date());
}
