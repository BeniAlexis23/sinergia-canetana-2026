import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, logoutRequest, registerRequest, verifyTokenRequest } from "../api/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signin = async (values) => {
    try {
      const res = await loginRequest(values);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrors([]);
    } catch (error) {
      setErrors([error.response?.data?.message || "No se pudo iniciar sesion"]);
    }
  };

  const signup = async (values) => {
    try {
      const res = await registerRequest(values);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrors([]);
    } catch (error) {
      const data = error.response?.data;
      setErrors(Array.isArray(data) ? data : [data?.message || "No se pudo registrar"]);
    }
  };

  const logout = async () => {
    await logoutRequest().catch(() => null);
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setErrors([]), 5000);
    return () => clearTimeout(timer);
  }, [errors]);

  useEffect(() => {
    async function checkSession() {
      if (!Cookies.get("token")) {
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest();
        setUser(res.data);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, errors, signin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
