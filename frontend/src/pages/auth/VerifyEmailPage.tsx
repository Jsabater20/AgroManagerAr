import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, Sprout } from 'lucide-react';
import api from '../../api/axios';

type Status = 'loading' | 'success' | 'error';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('El enlace de verificación es inválido.');
      return;
    }

    api
      .get<{ message: string }>(`/auth/verify?token=${token}`)
      .then(({ data }) => {
        setStatus('success');
        setMessage(data.message);
      })
      .catch((err: unknown) => {
        const msg = (err as { response?: { data?: { message?: string } } })
          ?.response?.data?.message;
        setStatus('error');
        setMessage(msg || 'El enlace de verificación es inválido o ya fue usado.');
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-10 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-3 rounded-2xl">
            <Sprout size={32} className="text-green-700" />
          </div>
        </div>
        <p className="text-green-700 font-semibold text-sm mb-6">AgroManager AR</p>

        {status === 'loading' && (
          <>
            <Loader2 size={48} className="text-green-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Verificando tu cuenta...</h2>
            <p className="text-gray-500 text-sm">Por favor esperá un momento.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">¡Cuenta verificada!</h2>
            <p className="text-gray-500 mb-8">{message}</p>
            <Link
              to="/login"
              className="block w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Iniciar sesión
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Enlace inválido</h2>
            <p className="text-gray-500 mb-8">{message}</p>
            <Link
              to="/register"
              className="block w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors mb-3"
            >
              Volver al registro
            </Link>
            <Link to="/login" className="text-green-700 hover:underline text-sm font-medium">
              Ir al inicio de sesión
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
