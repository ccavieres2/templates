import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, User } from "lucide-react";

export default function Registro() {
  // 1. Estados para los datos del formulario (Preparado para Backend)
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aceptarTerminos, setAceptarTerminos] = useState(false);

  // 2. Estados para la interacción con el servidor
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Estado visual
  const [mostrarPassword, setMostrarPassword] = useState(false);

  // 3. Función de envío real
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación rápida antes de enviar al backend
    if (!aceptarTerminos) {
      setError("Debes aceptar los términos y condiciones para registrarte.");
      return;
    }

    // Reiniciamos errores y activamos el estado de carga
    setError("");
    setIsLoading(true);

    try {
      // ---------------------------------------------------------
      // AQUÍ ES DONDE CONECTARÍAS TU BACKEND REAL.
      // Ejemplo con fetch:
      // const response = await fetch('https://tu-api.com/registro', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ nombre, email, password })
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);
      // ---------------------------------------------------------

      console.log("Creando cuenta con:", { nombre, email, password });

      // Simulamos una espera del servidor de 2 segundos (borrar en producción)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulamos un error para que veas cómo funciona (borrar en producción)
      if (email === "existe@correo.com") {
        throw new Error("Este correo ya está registrado en otra cuenta.");
      }

      alert(
        "¡Cuenta creada con éxito! (Aquí redirigirías al inicio o al panel)",
      );
    } catch (err: any) {
      // Si el backend devuelve un error, lo mostramos en pantalla
      setError(err.message || "Ocurrió un error al crear la cuenta.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white font-sans text-slate-900">
      {/* --- LADO IZQUIERDO: Formulario de Registro --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="mb-10 mt-8 lg:mt-0">
            <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Crea tu cuenta
            </h1>
            <p className="text-slate-500">
              Únete a nosotros y transforma tu forma de trabajar.
            </p>
          </div>

          {/* Mostrar caja de error si existe */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo: Nombre Completo */}
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Nombre completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  disabled={isLoading}
                  placeholder="Ej: Juan Pérez"
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all sm:text-sm bg-slate-50 disabled:opacity-50"
                  required
                />
              </div>
            </div>

            {/* Campo: Correo Electrónico */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  placeholder="ejemplo@correo.com"
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all sm:text-sm bg-slate-50 disabled:opacity-50"
                  required
                />
              </div>
            </div>

            {/* Campo: Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type={mostrarPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  placeholder="Crea una contraseña segura"
                  minLength={8}
                  className="block w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all sm:text-sm bg-slate-50 disabled:opacity-50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  disabled={isLoading}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
                >
                  {mostrarPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Debe tener al menos 8 caracteres.
              </p>
            </div>

            {/* Checkbox: Términos y condiciones */}
            <div className="flex items-start mt-2">
              <div className="flex items-center h-5">
                <input
                  id="terminos"
                  type="checkbox"
                  checked={aceptarTerminos}
                  onChange={(e) => setAceptarTerminos(e.target.checked)}
                  disabled={isLoading}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 border-slate-300 rounded cursor-pointer disabled:opacity-50"
                />
              </div>
              <label
                htmlFor="terminos"
                className="ml-2 block text-sm text-slate-600 cursor-pointer leading-tight"
              >
                Acepto los{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Términos de servicio
                </a>{" "}
                y la{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Política de privacidad
                </a>
                .
              </label>
            </div>

            {/* Botón Principal */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors disabled:bg-indigo-400 cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Creando cuenta...
                </>
              ) : (
                "Crear Cuenta"
              )}
            </button>
          </form>

          <div className="mt-8 mb-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">
                O regístrate con
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Botón Google */}
            <button
              disabled={isLoading}
              className="flex items-center justify-center w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            {/* Botón GitHub */}
            <button
              disabled={isLoading}
              className="flex items-center justify-center w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <svg
                className="h-5 w-5 mr-2 text-slate-900"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-600">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </div>

      {/* --- LADO DERECHO (Mismo diseño e imagen para mantener consistencia) --- */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Fondo de oficina"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-indigo-900/80 to-transparent"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-end p-16 w-full text-white">
          <div className="mb-8">
            <span className="inline-block p-2 bg-indigo-500/30 backdrop-blur-md rounded-lg mb-4">
              <svg
                className="h-6 w-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </span>
            <blockquote className="text-2xl font-medium leading-snug mb-6">
              "Unirse a esta plataforma fue la mejor decisión para nuestro
              equipo. Desde el día uno, la organización y comunicación fluyen
              perfectamente."
            </blockquote>
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                alt="Avatar"
                className="h-12 w-12 rounded-full border-2 border-indigo-400"
              />
              <div>
                <p className="font-bold text-white">Sarah Jenkins</p>
                <p className="text-indigo-200 text-sm">
                  Directora de Operaciones, TechCorp
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
