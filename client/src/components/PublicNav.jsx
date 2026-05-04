import { ArrowUp, Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const links = [
  ["Participa", "participa"],
  ["Quienes somos", "somos"],
  ["Objetivos", "objetivos"],
  ["Ideario", "ideario"],
  ["Ruta", "agenda"],
  ["Noticias", "noticias"]
];

const PublicNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const runScroll = () => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(runScroll, 120);
      return;
    }

    runScroll();
  };

  const scrollToTop = () => {
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 120);
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-white/95 text-ink backdrop-blur">
        <nav className="section-shell flex min-h-[72px] items-center justify-between py-3">
          <button type="button" onClick={scrollToTop} className="flex items-center gap-3 text-left font-bold">
            <span className="grid h-11 w-11 place-items-center rounded bg-primary text-white">SC</span>
            <span className="leading-tight">
              Sinergia Canetana
              <span className="block text-xs font-semibold uppercase tracking-wide text-primary">Movimiento universitario</span>
            </span>
          </button>

        <div className="hidden items-center gap-7 text-sm font-medium md:flex">
          {links.map(([label, sectionId]) => (
            <button key={sectionId} type="button" onClick={() => scrollToSection(sectionId)} className="text-slate-600 transition hover:text-primary">
              {label}
            </button>
          ))}
          <Link to="/login" className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 font-bold text-white">
            <ShieldCheck size={17} />
            Admin
          </Link>
        </div>

        <button className="grid h-10 w-10 place-items-center rounded border border-slate-200 md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        </nav>

        {open && (
          <div className="section-shell pb-4 md:hidden">
            <div className="grid gap-2 rounded bg-white p-3 text-ink shadow-soft">
              {links.map(([label, sectionId]) => (
                <button key={sectionId} type="button" className="rounded px-3 py-2 text-left font-medium" onClick={() => scrollToSection(sectionId)}>
                  {label}
                </button>
              ))}
              <Link to="/login" className="rounded bg-primary px-3 py-2 font-semibold text-white">Admin</Link>
            </div>
          </div>
        )}
      </header>

      <button
        type="button"
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full bg-primary text-white shadow-soft transition hover:bg-violet-800"
        aria-label="Subir al inicio"
        title="Subir al inicio"
      >
        <ArrowUp size={22} />
      </button>
    </>
  );
};

export default PublicNav;
