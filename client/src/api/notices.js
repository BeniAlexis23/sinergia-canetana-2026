import axios from "./axios";

export const getPublicNoticesRequest = () => axios.get("/noticias");
export const getPublicNoticeRequest = (id) => axios.get(`/noticias/${id}`);
export const getNoticesRequest = () => axios.get("/notices");
export const getNoticeRequest = (id) => axios.get(`/notices/${id}`);
export const createNoticeRequest = (notice) => axios.post("/notices", notice, {
  headers: { "Content-Type": "multipart/form-data" }
});
export const updateNoticeRequest = (id, notice) => axios.put(`/notices/${id}`, notice, {
  headers: { "Content-Type": "multipart/form-data" }
});
export const deleteNoticeRequest = (id) => axios.delete(`/notices/${id}`);
