import { LogIn } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, errors: authErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  return (
    <main className="grid min-h-screen bg-slate-50 lg:grid-cols-2">
      <section className="hero-scene hidden items-end p-10 text-white lg:flex">
        <div>
          <p className="mb-3 inline-flex rounded bg-secondary px-3 py-2 text-sm font-bold text-ink">Panel local</p>
          <h1 className="text-5xl font-black">Gestiona la voz de la campaña.</h1>
          <p className="mt-4 max-w-xl leading-7 text-white/80">Publica noticias, comunicados y actualizaciones para mantener informada a la comunidad universitaria.</p>
        </div>
      </section>
      <section className="grid place-items-center p-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-soft">
          <Link to="/" className="font-bold text-primary">Unidad Unadecina</Link>
          <h2 className="mt-6 text-3xl font-black text-ink">Iniciar sesion</h2>
          <p className="mt-2 text-slate-600">Accede al panel de administracion local.</p>

          {authErrors.map((error) => (
            <div key={error} className="mt-4 rounded bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>
          ))}

          <form className="mt-6 grid gap-4" onSubmit={handleSubmit(signin)}>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Correo
              <input type="email" {...register("email", { required: true })} className="rounded border border-slate-300 px-4 py-3 outline-primary" placeholder="admin@campana.pe" />
              {errors.email && <span className="text-red-600">El correo es requerido</span>}
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Contrasena
              <input type="password" {...register("password", { required: true })} className="rounded border border-slate-300 px-4 py-3 outline-primary" placeholder="******" />
              {errors.password && <span className="text-red-600">La contrasena es requerida</span>}
            </label>
            <button className="inline-flex items-center justify-center gap-2 rounded bg-primary px-4 py-3 font-bold text-white">
              <LogIn size={18} />
              Entrar
            </button>
          </form>
          <p className="mt-6 text-sm text-slate-600">
            No tienes usuario? <Link to="/register" className="font-bold text-primary">Crear cuenta local</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
