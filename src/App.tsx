import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
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
