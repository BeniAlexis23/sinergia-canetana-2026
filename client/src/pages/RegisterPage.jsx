import { UserPlus } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, errors: authErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-soft">
        <Link to="/" className="font-bold text-primary">Sinergia Canetana</Link>
        <h2 className="mt-6 text-3xl font-black text-ink">Crear cuenta</h2>
        <p className="mt-2 text-slate-600">Registro local para administrar noticias.</p>

        {authErrors.map((error) => (
          <div key={error} className="mt-4 rounded bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>
        ))}

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit(signup)}>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Nombre
            <input {...register("username", { required: true })} className="rounded border border-slate-300 px-4 py-3 outline-primary" placeholder="Equipo de campana" />
            {errors.username && <span className="text-red-600">El nombre es requerido</span>}
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Correo
            <input type="email" {...register("email", { required: true })} className="rounded border border-slate-300 px-4 py-3 outline-primary" placeholder="admin@campana.pe" />
            {errors.email && <span className="text-red-600">El correo es requerido</span>}
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Contrasena
            <input type="password" {...register("password", { required: true, minLength: 6 })} className="rounded border border-slate-300 px-4 py-3 outline-primary" placeholder="Minimo 6 caracteres" />
            {errors.password && <span className="text-red-600">La contrasena debe tener minimo 6 caracteres</span>}
          </label>
          <button className="inline-flex items-center justify-center gap-2 rounded bg-primary px-4 py-3 font-bold text-white">
            <UserPlus size={18} />
            Registrar
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-600">
          Ya tienes cuenta? <Link to="/login" className="font-bold text-primary">Inicia sesion</Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
