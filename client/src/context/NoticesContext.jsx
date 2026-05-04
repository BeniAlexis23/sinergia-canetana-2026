import { createContext, useContext, useState } from "react";
import {
  createNoticeRequest,
  deleteNoticeRequest,
  getNoticeRequest,
  getNoticesRequest,
  updateNoticeRequest
} from "../api/notices";

const NoticesContext = createContext();

export const useNotices = () => {
  const context = useContext(NoticesContext);
  if (!context) throw new Error("useNotices debe usarse dentro de NoticesProvider");
  return context;
};

export const NoticesProvider = ({ children }) => {
  const [notices, setNotices] = useState([]);
  const [errors, setErrors] = useState([]);

  const getNotices = async () => {
    const res = await getNoticesRequest();
    setNotices(res.data);
  };

  const getNotice = async (id) => {
    const res = await getNoticeRequest(id);
    return res.data;
  };

  const createNotice = async (notice) => {
    try {
      return await createNoticeRequest(notice);
    } catch (error) {
      const data = error.response?.data;
      setErrors(Array.isArray(data) ? data : [data?.message || "No se pudo guardar"]);
    }
  };

  const updateNotice = async (id, notice) => {
    try {
      return await updateNoticeRequest(id, notice);
    } catch (error) {
      setErrors([error.response?.data?.message || "No se pudo actualizar"]);
    }
  };

  const deleteNotice = async (id) => {
    const res = await deleteNoticeRequest(id);
    if (res.status === 204) setNotices((items) => items.filter((item) => item._id !== id));
    return res;
  };

  return (
    <NoticesContext.Provider value={{ notices, errors, setErrors, getNotices, getNotice, createNotice, updateNotice, deleteNotice }}>
      {children}
    </NoticesContext.Provider>
  );
};
