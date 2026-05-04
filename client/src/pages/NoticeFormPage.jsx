import dayjs from "dayjs";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import AdminNav from "../components/AdminNav";
import { useNotices } from "../context/NoticesContext";

const NoticeFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { getNotice, createNotice, updateNotice, errors: noticeErrors } = useNotices();

  useEffect(() => {
    async function loadNotice() {
      if (!id) return;
      const notice = await getNotice(id);
      setValue("title", notice.title);
      setValue("summary", notice.summary);
      setValue("content", notice.content);
      setValue("category", notice.category);
      setValue("date", dayjs(notice.date).format("YYYY-MM-DD"));
      setValue("imageUrl", notice.imageUrl);
    }

    loadNotice();
  }, [id, getNotice, setValue]);

  const onSubmit = handleSubmit(async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("summary", values.summary);
    formData.append("content", values.content);
    formData.append("category", values.category || "Campana");
    formData.append("date", values.date || dayjs().format("YYYY-MM-DD"));

    if (values.imageUrl?.[0] instanceof File) {
      formData.append("imageUrl", values.imageUrl[0]);
    }

    const response = id ? await updateNotice(id, formData) : await createNotice(formData);

    if (response?.status === 200) {
      await Swal.fire({ title: id ? "Noticia actualizada" : "Noticia publicada", icon: "success", confirmButtonColor: "#0f766e" });
      navigate("/notices");
    }
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav />
      <main className="section-shell py-10">
        <div className="max-w-3xl rounded-lg bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-black text-ink">{id ? "Editar noticia" : "Nueva noticia"}</h1>
          <p className="mt-2 text-slate-600">Publica comunicados claros para la comunidad universitaria.</p>

          {noticeErrors.map((error) => (
            <div key={error} className="mt-4 rounded bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>
          ))}

          <form onSubmit={onSubmit} className="mt-6 grid gap-5">
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Titulo
              <input {...register("title", { required: true })} className="rounded border border-slate-300 px-4 py-3 outline-primary" />
              {errors.title && <span className="text-red-600">El titulo es requerido</span>}
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Resumen
              <textarea rows="3" {...register("summary", { required: true })} className="rounded border border-slate-300 px-4 py-3 outline-primary" />
              {errors.summary && <span className="text-red-600">El resumen es requerido</span>}
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Contenido
              <textarea rows="8" {...register("content", { required: true })} className="rounded border border-slate-300 px-4 py-3 outline-primary" />
              {errors.content && <span className="text-red-600">El contenido es requerido</span>}
            </label>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Categoria
                <input {...register("category")} className="rounded border border-slate-300 px-4 py-3 outline-primary" placeholder="Campana" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Fecha
                <input type="date" {...register("date")} className="rounded border border-slate-300 px-4 py-3 outline-primary" />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Imagen
              <input type="file" accept="image/png,image/jpeg,image/webp" {...register("imageUrl")} className="rounded border border-slate-300 px-4 py-3 outline-primary" />
            </label>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded bg-primary px-5 py-3 font-bold text-white">
                <Save size={18} />
                Guardar
              </button>
              <Link to="/notices" className="rounded border border-slate-300 px-5 py-3 font-bold text-ink">Cancelar</Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NoticeFormPage;
