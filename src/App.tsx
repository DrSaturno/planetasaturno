import { useEffect, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TerminalProvider } from "./context/TerminalContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Terminal from "./components/Terminal";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import Auditoria from "./pages/Auditoria";
import Casos from "./pages/Casos";
import Blog from "./pages/Blog";
import SobreMi from "./pages/SobreMi";

/** Al navegar: si la URL trae #ancla, baja a esa sección; si no, arranca arriba. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // esperar a que la página nueva pinte la sección
    const id = window.setTimeout(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: "smooth" });
    }, 60);
    return () => window.clearTimeout(id);
  }, [pathname, hash]);
  return null;
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Terminal />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TerminalProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/auditoria" element={<Auditoria />} />
            <Route path="/casos" element={<Casos />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/sobre-mi" element={<SobreMi />} />
          </Routes>
        </Layout>
      </TerminalProvider>
    </BrowserRouter>
  );
}
