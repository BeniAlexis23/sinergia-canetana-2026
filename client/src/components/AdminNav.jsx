import { LayoutDashboard, LogOut, Newspaper, Plus } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminNav = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="section-shell flex min-h-16 flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
        <Link to="/dashboard" className="font-bold text-ink">Panel Unidad Unadecina</Link>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <NavLink to="/dashboard" className="inline-flex items-center gap-2 rounded border border-slate-200 px-3 py-2">
            <LayoutDashboard size={16} />
            Inicio
          </NavLink>
          <NavLink to="/notices" className="inline-flex items-center gap-2 rounded border border-slate-200 px-3 py-2">
            <Newspaper size={16} />
            Noticias
          </NavLink>
          <NavLink to="/notices/new" className="inline-flex items-center gap-2 rounded bg-primary px-3 py-2 font-semibold text-white">
            <Plus size={16} />
            Nueva
          </NavLink>
          <span className="hidden text-slate-500 md:inline">{user?.username}</span>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded border border-slate-200 px-3 py-2 text-slate-700">
            <LogOut size={16} />
            Salir
          </button>
        </div>
      </nav>
    </header>
  );
};

export default AdminNav;
