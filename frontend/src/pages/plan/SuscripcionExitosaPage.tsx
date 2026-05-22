import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, Zap } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { verificarActivacion } from '../../api/plan.api';
import { getProfile } from '../../api/users.api';
import { useAuthStore } from '../../store/auth.store';

const MAX_INTENTOS = 8;

type Estado = 'verificando' | 'activado' | 'pendiente' | 'error';

export default function SuscripcionExitosaPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { usuario, token, setAuth } = useAuthStore();
  const [estado, setEstado] = useState<Estado>(() =>
    searchParams.get('preapproval_id') ? 'verificando' : 'error',
  );
  const [intentos, setIntentos] = useState(0);

  const verificarMutation = useMutation({
    mutationFn: verificarActivacion,
    onSuccess: (data) => {
      if (data.activado) {
        setEstado('activado');
        // Re-fetch del perfil para obtener plan: 'PRO' fresco del backend,
        // evitando race condition con el getProfile() inicial de App.tsx
        if (token) {
          getProfile()
            .then((freshUser) => setAuth(freshUser, token))
            .catch(() => {
              // Fallback si el profile falla
              if (usuario) setAuth({ ...usuario, plan: 'PRO' }, token);
            });
        }
      } else if (intentos < MAX_INTENTOS) {
        // MP puede tardar unos segundos en confirmar
        setTimeout(() => {
          setIntentos((n) => n + 1);
        }, 2000);
      } else {
        // Después de MAX_INTENTOS, mostrar mensaje de pendiente
        setEstado('pendiente');
      }
    },
    onError: () => {
      if (intentos < MAX_INTENTOS) {
        setTimeout(() => setIntentos((n) => n + 1), 2000);
      } else {
        setEstado('error');
      }
    },
  });

  useEffect(() => {
    const preapprovalId = searchParams.get('preapproval_id');
    if (!preapprovalId) return;
    if (!token) {
      sessionStorage.setItem('pending_preapproval_id', preapprovalId);
      navigate(`/login?redirect=/suscripcion-exitosa?preapproval_id=${preapprovalId}`);
      return;
    }
    verificarMutation.mutate(preapprovalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intentos]);

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-3xl">🌱</span>
          <span className="font-bold text-gray-800 text-xl">AgroManager AR</span>
        </div>

        {/* Estado: verificando / retrying */}
        {estado === 'verificando' && (
          <>
            <Loader2 className="w-16 h-16 text-green-500 mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Activando tu suscripción...</h1>
            <p className="text-gray-500">Estamos verificando tu pago con MercadoPago.</p>
            {intentos > 0 && (
              <p className="text-xs text-gray-400 mt-2">Intento {intentos + 1} de {MAX_INTENTOS}...</p>
            )}
          </>
        )}

        {/* Estado: activado */}
        {estado === 'activado' && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">¡Suscripción activada!</h1>
            <p className="text-gray-600 mb-2">
              Tu plan <strong>Pro</strong> ya está activo.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-left">
              <p className="text-green-800 font-semibold text-sm mb-2 flex items-center gap-2">
                <Zap size={16} /> Lo que desbloqueaste:
              </p>
              <ul className="text-green-700 text-sm space-y-1">
                <li>✓ 14 días gratis — sin cobro hasta que termine la prueba</li>
                <li>✓ Campos, lotes y animales ilimitados</li>
                <li>✓ AgroBot IA con contexto de tu establecimiento</li>
                <li>✓ Campañas, reportes avanzados y export</li>
                <li>✓ Soporte prioritario</li>
              </ul>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Ir a mi dashboard →
            </button>
          </>
        )}

        {/* Estado: pendiente (MP no confirmó aún) */}
        {estado === 'pendiente' && !verificarMutation.isPending && (
          <>
            <Loader2 className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Procesando pago...</h1>
            <p className="text-gray-600 mb-4">
              MercadoPago está confirmando tu suscripción. Esto puede demorar unos segundos.
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Tu plan se activará automáticamente. Si no lo ves en 5 minutos,
              recargá la página de <strong>Planes</strong>.
            </p>
            <button
              onClick={() => navigate('/precios')}
              className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
            >
              Ver estado en Planes
            </button>
          </>
        )}

        {/* Estado: error */}
        {estado === 'error' && (
          <>
            <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">No pudimos verificar</h1>
            <p className="text-gray-600 mb-6">
              No encontramos tu suscripción. Si realizaste el pago, tu plan se activará
              automáticamente cuando MercadoPago confirme la transacción.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/precios')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Ver mis planes
              </button>
              <button
                onClick={() => navigate('/contacto')}
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl transition-colors text-sm"
              >
                Contactar soporte
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
