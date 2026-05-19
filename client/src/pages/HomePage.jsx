import {
  ArrowRight,
  BookOpenCheck,
  CalendarCheck,
  CheckCircle2,
  Handshake,
  Landmark,
  Lightbulb,
  Megaphone,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Vote
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicNoticesRequest } from "../api/notices";
import NewsCard from "../components/NewsCard";
import PublicNav from "../components/PublicNav";

const objectives = [
  "Defender una representacion estudiantil democratica, transparente y abierta.",
  "Impulsar servicios academicos y de bienestar que respondan a problemas reales.",
  "Crear espacios de participacion para que cada escuela proponga, vigile y decida.",
  "Promover innovacion, empleabilidad y redes con egresados, docentes y aliados locales.",
  "Rendir cuentas con datos simples, acuerdos publicados y seguimiento mensual."
];

const pillars = [
  ["Libertad para aprender", "Tutorias, mentorias y oportunidades para que ningun estudiante avance solo.", BookOpenCheck],
  ["Accion conjunta", "Comites por escuela para convertir reclamos en propuestas viables.", UsersRound],
  ["Integridad publica", "Agenda, gastos y avances visibles durante toda la gestion.", ShieldCheck],
  ["Innovacion local", "Proyectos estudiantiles conectados con tecnologia, investigacion y comunidad.", Lightbulb]
];

const timeline = [
  ["Semana 1", "Escucha por escuelas", "Levantamiento de problemas por ciclo, turno y carrera."],
  ["Semana 2", "Foro Sinergia", "Debate abierto de propuestas y compromisos medibles."],
  ["Semana 3", "Plan publico", "Publicacion del tablero de prioridades de gestion."],
  ["Eleccion", "Voto informado", "Cierre de campana con rendicion de cuentas."]
];

const HomePage = () => {
  const [notices, setNotices] = useState([]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    getPublicNoticesRequest()
      .then((res) => setNotices(res.data.slice(0, 3)))
      .catch(() => setNotices([]));
  }, []);

  return (
    <div>
      <PublicNav />

      <section className="hero-scene text-white">
        <div className="section-shell grid min-h-[calc(100vh-72px)] items-center gap-10 py-14 lg:grid-cols-[1.04fr_0.96fr]">
          <div>
            <p className="mb-5 inline-flex rounded bg-deep-100 px-4 py-2 text-sm font-black uppercase tracking-wide text-ink">Elecciones universitarias 2026</p>
            <h1 className="max-w-3xl text-5xl font-black leading-tight md:text-7xl">Nuestro propio camino empieza en la universidad</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/86">
              Unidad Unadecina es una lista universitaria de centro estudiantil: Dialogante, transparente y enfocada en desarrollar el talento de cada estudiante.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={() => scrollToSection("participa")} className="inline-flex items-center gap-2 rounded bg-white px-5 py-3 font-black text-ink shadow-sm transition hover:bg-deep-100">
                Participa con nosotros
                <ArrowRight size={18} />
              </button>
              <button type="button" onClick={() => scrollToSection("objetivos")} className="inline-flex rounded border border-white/35 px-5 py-3 font-bold text-white transition hover:border-white hover:bg-white/10">Ver objetivos</button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/18 bg-white text-ink shadow-soft">
            <div className="brand-accent-line" />
            <div className="p-6">
            <p className="text-sm font-black uppercase tracking-wide text-primary">Mensaje central</p>
            <blockquote className="mt-4 text-2xl font-black leading-snug">
              “El precio de desentenderse de la vida universitaria es dejar que otros decidan por ti.”
            </blockquote>
            <p className="mt-4 leading-7 text-slate-600">
              Proponemos una representacion que escucha, publica acuerdos y convierte la participacion estudiantil en resultados concretos.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded bg-deep-50 p-4">
                <Vote className="text-primary" />
                <p className="mt-3 text-2xl font-black">5</p>
                <p className="text-xs text-slate-600">objetivos</p>
              </div>
              <div className="rounded bg-deep-100 p-4">
                <Handshake className="text-deep-600" />
                <p className="mt-3 text-2xl font-black">4</p>
                <p className="text-xs text-slate-600">principios</p>
              </div>
              <div className="rounded bg-deep-200 p-4">
                <Megaphone className="text-deep-800" />
                <p className="mt-3 text-2xl font-black">100%</p>
                <p className="text-xs text-slate-600">local</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      <section id="participa" className="scroll-mt-24 bg-deep-100 py-10 text-ink">
        <div className="section-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-black uppercase tracking-wide">Participa con nosotros</p>
            <h2 className="mt-1 text-3xl font-black">Suma una propuesta, una pregunta o una brigada.</h2>
          </div>
          <button type="button" onClick={() => scrollToSection("noticias")} className="inline-flex items-center gap-2 rounded bg-ink px-5 py-3 font-black text-white transition hover:bg-deep-800">
            Ver comunicados
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <section id="somos" className="scroll-mt-24 bg-white py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="font-black uppercase text-primary">Quienes somos</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-ink">Un movimiento estudiantil para construir confianza</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-lg border border-slate-200 p-6">
              <Landmark className="text-primary" />
              <h3 className="mt-5 text-xl font-bold">Lo que somos</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Una lista universitaria que apuesta por instituciones estudiantiles abiertas, equipos de trabajo horizontales y decisiones explicadas.
              </p>
            </article>
            <article className="rounded-lg border border-slate-200 p-6">
              <Sparkles className="text-deep-500" />
              <h3 className="mt-5 text-xl font-bold">Lo que buscamos</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Que el exito academico dependa del esfuerzo y del acceso justo a oportunidades, no de contactos, privilegios o desinformacion.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="objetivos" className="scroll-mt-24 bg-surface py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-black uppercase text-primary">Nuestros objetivos</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-ink">Compromisos claros para una representacion distinta</h2>
          </div>
          <div className="grid gap-3">
            {objectives.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg bg-white p-4 shadow-sm">
                <CheckCircle2 className="mt-1 shrink-0 text-primary" size={20} />
                <p className="leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ideario" className="scroll-mt-24 bg-white py-20">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="font-black uppercase text-primary">Ideario</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-ink">Cuatro principios para orientar cada decision</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map(([title, text, Icon]) => (
              <article key={title} className="rounded-lg border border-slate-200 p-6">
                <Icon className="text-primary" />
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="agenda" className="scroll-mt-24 bg-ink py-20 text-white">
        <div className="section-shell">
          <p className="font-black uppercase text-secondary">Historia de campana</p>
          <h2 className="mt-3 text-4xl font-black">Ruta de participacion</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {timeline.map(([date, title, description]) => (
              <article key={title} className="rounded-lg border border-white/15 p-6">
                <CalendarCheck className="text-secondary" />
                <p className="mt-5 text-sm font-black uppercase text-white/60">{date}</p>
                <h3 className="mt-2 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="noticias" className="scroll-mt-24 bg-white py-20">
        <div className="section-shell">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-black uppercase text-primary">Comunicacion</p>
              <h2 className="mt-3 text-4xl font-black text-ink">Noticias y comunicados</h2>
            </div>
            <Link to="/login" className="inline-flex rounded bg-primary px-4 py-3 font-black text-white">Publicar desde admin</Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {notices.length > 0 ? notices.map((notice) => <NewsCard key={notice._id} notice={notice} />) : (
              <p className="rounded-lg border border-dashed border-slate-300 p-8 text-slate-600 md:col-span-3">Aun no hay noticias publicadas. Inicia sesion en el panel para crear la primera.</p>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-primary py-8 text-white">
        <div className="section-shell flex flex-col gap-3 text-sm text-white/78 md:flex-row md:items-center md:justify-between">
          <p>Unidad Unadecina.</p>
          <p>Democracia estudiantil, talento y transparencia.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
