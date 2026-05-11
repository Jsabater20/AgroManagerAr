import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowLeft, Mail } from 'lucide-react';
import { api } from '../../api/client';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
    } catch {
      toast.error('Ocurrió un error. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

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

        {sent ? (
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={28} className="text-green-700" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Revisá tu email</h1>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Si <strong>{email}</strong> está registrado, te enviamos un enlace
              para restablecer tu contraseña. Chequeá también la carpeta de spam.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition-colors text-sm"
            >
              <ArrowLeft size={15} />
              Volver al inicio de sesión
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">¿Olvidaste tu contraseña?</h1>
            <p className="text-gray-500 text-sm mb-8">
              Ingresá tu email y te enviamos un enlace para restablecerla.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white transition-colors shadow-sm"
                  placeholder="tu@email.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-700 hover:bg-green-800 active:bg-green-900 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-lg shadow-green-700/20"
              >
                {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft size={14} />
                Volver al inicio de sesión
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
