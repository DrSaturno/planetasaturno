import { useState, type ReactNode } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fallback: ReactNode;
};

/**
 * Hueco para una ilustración que todavía puede no existir
 * (lista en agenciapersonal/brand/ASSETS-PEDIDO.md). Si el archivo no está
 * en public/, muestra el reemplazo. Al subir el archivo, aparece solo.
 */
export default function SlotImage({ src, alt, className, fallback }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
