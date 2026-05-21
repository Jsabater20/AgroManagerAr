import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Eye, EyeOff, Map, Wheat, PawPrint, ClipboardList, ArrowLeft } from 'lucide-react';
import { api } from '../../api/client';
import { useAuthStore } from '../../store/auth.store';
import toast from 'react-hot-toast';

const REMEMBER_KEY = 'agromanager_remembered_email';

const FEATURES = [
  { icon: Map,          label: 'Campos & Lotes',      desc: 'Gestión de tu establecimiento' },
  { icon: Wheat,        label: 'Cultivos & Siembras',  desc: 'Seguimiento de campañas agrícolas' },
  { icon: PawPrint,     label: 'Ganadería',            desc: 'Control de rodeo y preñeces' },
  { icon: ClipboardList, label: 'Tareas rurales',      desc: 'Planificación de actividades' },
];

export default function LoginPage() {
  const savedEmail = localStorage.getItem(REMEMBER_KEY) ?? '';
  const [form, setForm] = useState({ email: savedEmail, password: '' });
  const [remember, setRemember] = useState(!!savedEmail);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      if (remember) {
        localStorage.setItem(REMEMBER_KEY, form.email);
      } else {
        localStorage.removeItem(REMEMBER_KEY);
      }
      setAuth(data.usuario, data.token);
      navigate('/dashboard');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(msg || 'Email o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-green-950 via-green-900 to-emerald-800 flex-col justify-between p-12 relative overflow-hidden">
        {/* Círculos decorativos */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
            <Sprout size={28} className="text-emerald-300" />
          </div>
          <div>
            <span className="text-white font-bold text-xl tracking-tight">AgroManager</span>
            <span className="text-emerald-400 font-bold text-xl"> AR</span>
          </div>
        </div>

        {/* Tagline */}
        <div className="relative">
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Tu campo,<br />
            <span className="text-emerald-400">bajo control.</span>
          </h2>
          <p className="text-green-300/80 text-lg mb-10">
            Gestioná cultivos, ganadería y tareas desde un solo lugar.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {FEATURES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white/8 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/12 transition-colors">
                <div className="bg-emerald-500/20 w-9 h-9 rounded-xl flex items-center justify-center mb-2.5">
                  <Icon size={17} className="text-emerald-300" />
                </div>
                <p className="text-white text-sm font-semibold">{label}</p>
                <p className="text-green-300/70 text-xs mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer branding */}
        <p className="relative text-green-400/50 text-xs">© 2026 AgroManager AR — Mercado argentino</p>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 relative">
        <Link
          to="/"
          className="absolute top-6 left-6 flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Volver
        </Link>
        <div className="w-full max-w-sm">
          {/* Logo mobile */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="bg-green-700 p-2.5 rounded-xl">
              <Sprout size={22} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">AgroManager AR</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Bienvenido de nuevo</h1>
          <p className="text-gray-500 text-sm mb-8">Ingresá tus datos para continuar</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white transition-colors shadow-sm"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white transition-colors shadow-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
              />
              <span className="text-sm text-gray-600">Recordar mi email</span>
            </label>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-xs text-gray-500 hover:text-green-700 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 active:bg-green-900 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-lg shadow-green-700/20 mt-1"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              ¿No tenés cuenta?{' '}
              <Link to="/register" className="text-green-700 font-semibold hover:text-green-800 transition-colors">
                Registrate acá
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


