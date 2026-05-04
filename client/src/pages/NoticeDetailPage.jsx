import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../api/axios";
import { getPublicNoticeRequest } from "../api/notices";
import PublicNav from "../components/PublicNav";

const NoticeDetailPage = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    getPublicNoticeRequest(id).then((res) => setNotice(res.data));
  }, [id]);

  if (!notice) {
    return <div className="grid min-h-screen place-items-center text-slate-600">Cargando noticia...</div>;
  }

  const image = notice.imageUrl ? `${API_BASE_URL}${notice.imageUrl}` : "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1400&q=80";

  return (
    <div>
      <PublicNav />
      <main className="bg-white py-12">
        <article className="section-shell max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-primary">
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
          <p className="mt-8 text-sm font-bold uppercase text-primary">{notice.category || "Campana"} | {dayjs(notice.date).format("DD/MM/YYYY")}</p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-ink md:text-6xl">{notice.title}</h1>
          <p className="mt-5 text-xl leading-8 text-slate-600">{notice.summary}</p>
          <img src={image} alt={notice.title} className="mt-10 aspect-[16/9] w-full rounded-lg object-cover" />
          <div className="prose prose-slate mt-10 max-w-none whitespace-pre-line text-lg leading-9 text-slate-700">
            {notice.content}
          </div>
        </article>
      </main>
    </div>
  );
};

export default NoticeDetailPage;
