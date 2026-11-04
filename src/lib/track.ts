declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Empuja un evento al dataLayer de GTM. Mientras GTM no tenga el ID real
 * (index.html) los eventos quedan en memoria y no van a ningún lado.
 * Nunca mandar acá texto escrito por el visitante (SPEC §6.1b).
 */
export function track(event: string, params: Record<string, string | number | boolean> = {}) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}
