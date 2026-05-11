import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Sprout, Eye, EyeOff, Check, X } from 'lucide-react';
import { api } from '../../api/client';
import toast from 'react-hot-toast';

const rules = [
  { label: 'Al menos 8 caracteres', test: (p: string) => p.length >= 8 },
  { label: 'Una mayúscula', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Una minúscula', test: (p: string) => /[a-z]/.test(p) },
  { label: 'Un número', test: (p: string) => /\d/.test(p) },
];

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const allValid = rules.every((r) => r.test(newPassword));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!allValid) return;
    if (!token) {
      toast.error('El enlace de recuperación es inválido.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { token, newPassword });
      toast.success('Contraseña actualizada. Ya podés iniciar sesión.');
      navigate('/login');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      toast.error(msg ?? 'El enlace expiró o es inválido. Solicitá uno nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Enlace de recuperación inválido.</p>
          <Link to="/forgot-password" className="text-green-700 font-semibold hover:text-green-800">
            Solicitar uno nuevo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="bg-green-700 p-2.5 rounded-xl">
            <Sprout size={22} className="text-white" />
          </div>
          <span className="font-bold text-gray-900 text-lg">AgroManager AR</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Nueva contraseña</h1>
        <p className="text-gray-500 text-sm mb-8">
          Elegí una contraseña nueva y segura para tu cuenta.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nueva contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setTouched(true);
                }}
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

            {(touched || newPassword.length > 0) && (
              <div className="mt-3 grid grid-cols-2 gap-1.5">
                {rules.map((rule) => {
                  const ok = rule.test(newPassword);
                  return (
                    <div
                      key={rule.label}
                      className={`flex items-center gap-1.5 text-xs rounded-lg px-2.5 py-1.5 ${ok ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'}`}
                    >
                      {ok ? <Check size={12} /> : <X size={12} />}
                      {rule.label}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 active:bg-green-900 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-lg shadow-green-700/20"
          >
            {loading ? 'Guardando...' : 'Establecer nueva contraseña'}
          </button>
        </form>
      </div>
    </div>
  );
}
