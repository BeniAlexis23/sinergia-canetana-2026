import { ArrowUp, Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoUnadecina from "../assets/logo-unadecina.png";

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
      <header className="sticky top-0 z-40 border-b border-deep-100 bg-white/95 text-ink shadow-sm backdrop-blur">
        <div className="brand-accent-line" />
        <nav className="section-shell flex min-h-[84px] items-center justify-between py-3">
          <button type="button" onClick={scrollToTop} className="flex min-w-0 items-center gap-3 text-left font-bold">
            <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden md:h-16 md:w-16">
              <img src={logoUnadecina} alt="Unidad Unadecina" className="h-full w-full object-contain" />
            </span>
            <span className="min-w-0 leading-tight">
              Unidad Unadecina
              <span className="block text-xs font-semibold uppercase tracking-wide text-primary">Movimiento universitario</span>
            </span>
          </button>

        <div className="hidden items-center gap-7 text-sm font-medium md:flex">
          {links.map(([label, sectionId]) => (
            <button key={sectionId} type="button" onClick={() => scrollToSection(sectionId)} className="text-deep-900 transition hover:text-primary">
              {label}
            </button>
          ))}
          <Link to="/login" className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 font-bold text-white shadow-sm transition hover:bg-deep-800">
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
        className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full bg-primary text-white shadow-soft transition hover:bg-deep-800"
        aria-label="Subir al inicio"
        title="Subir al inicio"
      >
        <ArrowUp size={22} />
      </button>
    </>
  );
};

export default PublicNav;
