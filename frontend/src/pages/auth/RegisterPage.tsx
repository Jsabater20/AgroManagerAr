import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Sprout, Eye, EyeOff, Check, X, Leaf, Mail, ArrowLeft } from 'lucide-react';
import { api } from '../../api/client';
import toast from 'react-hot-toast';

const rules = [
  { label: 'Al menos 8 caracteres', test: (p: string) => p.length >= 8 },
  { label: 'Una mayúscula',          test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Una minúscula',          test: (p: string) => /[a-z]/.test(p) },
  { label: 'Un número',              test: (p: string) => /\d/.test(p) },
];

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const invitationToken = searchParams.get('token');
  const emailFromInvitation = searchParams.get('email');

  const [form, setForm] = useState({ nombre: '', apellido: '', email: emailFromInvitation || '', password: '', invitationToken: invitationToken || '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [registered, setRegistered] = useState(false);

  // Si hay token de invitación, el email es read-only
  const emailReadOnly = !!invitationToken;

  const allValid = rules.every((r) => r.test(form.password));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!allValid) return;
    if (!acceptTerms) {
      toast.error('Debés aceptar los términos y condiciones para continuar.');
      return;
    }
    setLoading(true);
    try {
      // Si hay invitationToken, incluirlo en el body
      const payload = invitationToken
        ? { ...form, invitationToken }
        : { nombre: form.nombre, apellido: form.apellido, email: form.email, password: form.password };

      await api.post('/auth/register', payload);
      setRegistered(true);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string | string[] } } })
        ?.response?.data?.message;
      toast.error(Array.isArray(msg) ? msg[0] : (msg || 'Error al registrarse'));
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-950 via-green-900 to-emerald-800 p-6">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <Mail size={40} className="text-green-700" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">¡Revisá tu casilla de email!</h2>
          <p className="text-gray-500 mb-2">
            Te enviamos un enlace de verificación a <strong className="text-gray-700">{form.email}</strong>.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Hacé clic en el enlace para activar tu cuenta. Revisá también la carpeta de spam si no lo ves.
          </p>
          <Link
            to="/login"
            className="block w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Ir al inicio de sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-green-950 via-green-900 to-emerald-800 flex-col justify-between p-12 relative overflow-hidden">
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

        {/* Contenido central */}
        <div className="relative">
          <div className="bg-white/8 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-emerald-500/20 p-2.5 rounded-xl">
                <Leaf size={20} className="text-emerald-300" />
              </div>
              <p className="text-white font-semibold">Empezá hoy, es gratis</p>
            </div>
            <ul className="space-y-3">
              {[
                'Registrá campos, lotes y cultivos',
                'Llevá el control de tu rodeo ganadero',
                'Planificá tareas y actividades del campo',
                'Accedé desde cualquier dispositivo',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-green-200/80 text-sm">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={11} className="text-emerald-300" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-white leading-tight">
            El ERP agrícola<br />
            <span className="text-emerald-400">hecho para Argentina.</span>
          </h2>
        </div>

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

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Creá tu cuenta</h1>
          <p className="text-gray-500 text-sm mb-8">Completá los datos para comenzar</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre</label>
                <input
                  type="text"
                  required
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white transition-colors shadow-sm"
                  placeholder="Juan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Apellido</label>
                <input
                  type="text"
                  required
                  value={form.apellido}
                  onChange={(e) => setForm({ ...form, apellido: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white transition-colors shadow-sm"
                  placeholder="Pérez"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                required
                readOnly={emailReadOnly}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors shadow-sm ${
                  emailReadOnly
                    ? 'bg-gray-100 border-gray-200 text-gray-700 cursor-not-allowed'
                    : 'bg-white border-gray-200'
                }`}
                placeholder="tu@email.com"
              />
              {emailReadOnly && (
                <p className="text-xs text-gray-500 mt-1.5">
                  Este email fue confirmado en tu invitación
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => { setForm({ ...form, password: e.target.value }); setTouched(true); }}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white transition-colors shadow-sm"
                  placeholder="Mínimo 8 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              {(touched || form.password.length > 0) && (
                <div className="mt-3 grid grid-cols-2 gap-1.5">
                  {rules.map((rule) => {
                    const ok = rule.test(form.password);
                    return (
                      <div key={rule.label} className={`flex items-center gap-1.5 text-xs rounded-lg px-2.5 py-1.5 ${ok ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                        {ok ? <Check size={12} /> : <X size={12} />}
                        {rule.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer mt-0.5 shrink-0"
              />
              <span className="text-sm text-gray-600 leading-snug">
                Acepto los{' '}
                <Link to="/terminos" target="_blank" className="text-green-700 font-medium hover:underline">
                  términos y condiciones
                </Link>{' '}
                y la{' '}
                <Link to="/privacidad" target="_blank" className="text-green-700 font-medium hover:underline">
                  política de privacidad
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 active:bg-green-900 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-lg shadow-green-700/20 mt-1"
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              ¿Ya tenés cuenta?{' '}
              <Link to="/login" className="text-green-700 font-semibold hover:text-green-800 transition-colors">
                Ingresá acá
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

