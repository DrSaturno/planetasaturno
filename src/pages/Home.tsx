import Hero from "../components/home/Hero";
import Servicios from "../components/home/Servicios";
import ComoTrabajamos from "../components/home/ComoTrabajamos";
import Casos from "../components/home/Casos";
import Contacto from "../components/home/Contacto";

/** Home v2 — SPEC.md §6.1b (rediseño 2026-11-04). */
export default function Home() {
  return (
    <>
      <Hero />
      <Servicios />
      <ComoTrabajamos />
      <Casos />
      <Contacto />
    </>
  );
}
