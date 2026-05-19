import { Newspaper, Plus, Radio, UsersRound } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import { useNotices } from "../context/NoticesContext";

const Dashboard = () => {
  const { notices, getNotices } = useNotices();

  useEffect(() => {
    getNotices().catch(() => null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav />
      <main className="section-shell py-10">
        <div className="rounded-lg bg-ink p-8 text-white">
          <p className="font-bold uppercase text-secondary">Administracion</p>
          <h1 className="mt-3 text-4xl font-black">Panel de campaña</h1>
          <p className="mt-3 max-w-2xl text-white/75">Gestiona las noticias publicas de Unidad Unadecina desde una API local con autenticación.</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <article className="rounded-lg bg-white p-6 shadow-sm">
            <Newspaper className="text-primary" />
            <p className="mt-5 text-4xl font-black">{notices.length}</p>
            <p className="text-slate-600">noticias creadas por tu usuario</p>
          </article>
          <article className="rounded-lg bg-white p-6 shadow-sm">
            <Radio className="text-coral" />
            <p className="mt-5 text-4xl font-black">Local</p>
            <p className="text-slate-600">API, MongoDB y Vite en tu equipo</p>
          </article>
          <article className="rounded-lg bg-white p-6 shadow-sm">
            <UsersRound className="text-secondary" />
            <p className="mt-5 text-4xl font-black">Admin</p>
            <p className="text-slate-600">login y registro habilitados</p>
          </article>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/notices" className="rounded border border-slate-300 px-4 py-3 font-bold text-ink">Ver noticias</Link>
          <Link to="/notices/new" className="inline-flex items-center gap-2 rounded bg-primary px-4 py-3 font-bold text-white">
            <Plus size={18} />
            Nueva noticia
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
