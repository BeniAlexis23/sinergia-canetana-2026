import dayjs from "dayjs";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../api/axios";
import AdminNav from "../components/AdminNav";
import { useNotices } from "../context/NoticesContext";

const NoticesPage = () => {
  const { notices, getNotices, deleteNotice } = useNotices();

  useEffect(() => {
    getNotices().catch(() => null);
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Eliminar noticia",
      text: "Esta accion no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#ef4444"
    });

    if (result.isConfirmed) await deleteNotice(id);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav />
      <main className="section-shell py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-black text-ink">Noticias</h1>
            <p className="mt-2 text-slate-600">Crea, edita y elimina comunicados de campana.</p>
          </div>
          <Link to="/notices/new" className="inline-flex items-center gap-2 rounded bg-primary px-4 py-3 font-bold text-white">
            <Plus size={18} />
            Nueva noticia
          </Link>
        </div>

        <div className="mt-8 grid gap-4">
          {notices.length === 0 && <p className="rounded-lg border border-dashed border-slate-300 p-8 text-slate-600">No hay noticias creadas todavia.</p>}
          {notices.map((notice) => (
            <article key={notice._id} className="grid gap-4 rounded-lg bg-white p-4 shadow-sm md:grid-cols-[180px_1fr_auto] md:items-center">
              <img
                src={notice.imageUrl ? `${API_BASE_URL}${notice.imageUrl}` : "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=500&q=80"}
                alt={notice.title}
                className="h-36 w-full rounded object-cover md:h-28"
              />
              <div>
                <p className="text-xs font-bold uppercase text-primary">{notice.category || "Campana"} | {dayjs(notice.date).format("DD/MM/YYYY")}</p>
                <h2 className="mt-2 text-xl font-bold text-ink">{notice.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">{notice.summary}</p>
              </div>
              <div className="flex gap-2">
                <Link to={`/notices/${notice._id}/edit`} className="grid h-10 w-10 place-items-center rounded border border-slate-200 text-ink" title="Editar">
                  <Edit size={18} />
                </Link>
                <button onClick={() => handleDelete(notice._id)} className="grid h-10 w-10 place-items-center rounded border border-red-200 text-red-600" title="Eliminar">
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NoticesPage;
