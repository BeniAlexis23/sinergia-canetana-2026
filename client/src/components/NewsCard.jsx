import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../api/axios";

const NewsCard = ({ notice }) => {
  const image = notice.imageUrl ? `${API_BASE_URL}${notice.imageUrl}` : "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80";

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <img src={image} alt={notice.title} className="h-52 w-full object-cover" />
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3 text-xs font-semibold uppercase text-primary">
          <span>{notice.category || "Campana"}</span>
          <span className="inline-flex items-center gap-1 text-slate-500">
            <CalendarDays size={14} />
            {dayjs(notice.date).format("DD/MM/YYYY")}
          </span>
        </div>
        <h3 className="text-xl font-bold leading-tight text-ink">{notice.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{notice.summary}</p>
        <Link to={`/noticias/${notice._id}`} className="mt-5 inline-flex rounded bg-ink px-4 py-2 text-sm font-semibold text-white">
          Leer noticia
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;
