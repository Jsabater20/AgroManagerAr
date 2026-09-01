import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Zap, Sprout, AlertCircle } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/auth.store';
import { getPlanInfo, cancelarSuscripcion, crearCheckout } from '../../api/plan.api';
import { getProfile } from '../../api/users.api';
import PublicNav from '../../components/layout/PublicNav';
import PublicFooter from '../../components/layout/PublicFooter';

type ValorFeature = boolean | string;
type Feature = {
  label: string;
  free: ValorFeature;
  pro: ValorFeature;
  empresa?: ValorFeature;
};

const features: Feature[] = [
  { label: 'Campos',                          free: '1 campo',     pro: 'Ilimitados' },
  { label: 'Lotes por campo',                 free: 'Hasta 3',     pro: 'Ilimitados' },
  { label: 'Siembras',                        free: 'Hasta 10',    pro: 'Ilimitadas' },
  { label: 'Gestión de cultivos',             free: true,          pro: true },
  { label: 'Gestión de insumos',              free: true,          pro: true },
  { label: 'Maquinarias registradas',         free: 'Hasta 5',     pro: 'Ilimitadas' },
  { label: 'Tareas rurales',                  free: true,          pro: true },
  { label: 'Miembros adicionales',            free: '1 + owner',  pro: 'Ilimitados' },
  { label: 'Trabajos activos asignados',      free: 'Hasta 3',     pro: 'Ilimitados' },
  { label: 'Asignación de recursos y trabajos', free: true,        pro: true },
  { label: 'Fechas, horarios y estados',      free: true,          pro: true },
  { label: 'Gestión de equipo y permisos',    free: 'Básica',      pro: 'Completa' },
  { label: 'Dashboard básico',                free: true,          pro: true },
  { label: 'Finanzas básicas',                free: true,          pro: true },
  { label: 'Animales registrados',            free: 'Hasta 20',    pro: 'Ilimitados' },
  { label: 'Historial de animales',           free: 'Básico',      pro: 'Completo' },
  { label: 'Mapa de campos',                  free: 'Básico',      pro: 'Avanzado' },
  { label: 'Clima actual',                    free: true,          pro: true },
  { label: 'Alertas climáticas',              free: false,         pro: true },
  { label: 'AgroBot IA',                      free: false,         pro: true },
  { label: 'Campañas agrícolas',              free: false,         pro: true },
  { label: 'Analytics avanzados',             free: false,         pro: true },
  { label: 'Rentabilidad por campaña',        free: false,         pro: true },
  { label: 'Exportar CSV/PDF',                free: false,         pro: true },
  { label: 'Reportes avanzados',              free: false,         pro: true },
  { label: 'Soporte prioritario',             free: false,         pro: true },
  { label: 'Acceso anticipado a novedades',   free: false,         pro: true },
  { label: 'Fotos de perfil del equipo',      free: true,          pro: true },
  { label: 'Evidencias fotograficas',         free: true,          pro: true },
  { label: 'Observaciones de actividades',    free: 'Basicas',     pro: 'Completas' },
  { label: 'Multiples organizaciones',        free: false,         pro: false, empresa: 'Incluido' },
  { label: 'Dashboard multi-establecimiento', free: false,         pro: false, empresa: 'Incluido' },
  { label: 'Auditoria y exportaciones consolidadas', free: false,  pro: false, empresa: 'Incluido' },
];

function FeatureCell({ value }: { value: boolean | string }) {
  if (value === true) return <Check size={18} className="text-green-500 mx-auto" />;
  if (value === false) return <X size={18} className="text-gray-300 mx-auto" />;
  return <span className="text-sm text-gray-600">{value}</span>;
}

const PRECIOS = {
  mensual: { monto: 13990, label: 'mes', descuento: null },
  anual:   { monto: 139900, label: 'año', descuento: 'Ahorrá un 16% con el plan anual' },
};

export default function PreciosPage() {
  const { usuario, setAuth, token } = useAuthStore();
  const activeOrgId = useAuthStore((state) => state.activeOrgId());
  const currentOrg = useAuthStore((state) => state.currentOrg());
  const navigate = useNavigate();
  const [showCancel, setShowCancel] = useState(false);
  const [tipo, setTipo] = useState<'mensual' | 'anual'>('mensual');

  const { data: planInfo, refetch } = useQuery({
    queryKey: ['plan'],
    queryFn: getPlanInfo,
    enabled: !!token,
  });

  const checkoutMutation = useMutation({
    mutationFn: () => crearCheckout(tipo),
    onSuccess: (data) => {
      window.location.href = data.init_point;
    },
    onError: () => toast.error('Error al iniciar el pago. Intentá de nuevo.'),
  });

  const cancelMutation = useMutation({
    mutationFn: cancelarSuscripcion,
    onSuccess: () => {
      toast.success('Suscripción cancelada. Tu plan vuelve a Free.');
      // Re-fetch perfil para actualizar store con plan: 'FREE' fresco del backend
      if (token) {
        getProfile()
          .then((freshUser) => setAuth({
            id: freshUser.id,
            email: freshUser.email,
            nombre: freshUser.nombre,
            apellido: freshUser.apellido,
            rol: freshUser.rol || 'OPERADOR',
            plan: (freshUser.plan || 'FREE') as 'FREE' | 'PRO',
            rolGlobal: freshUser.rolGlobal,
            usuarioOrganizacionId: freshUser.usuarioOrganizacionId,
            organizaciones: freshUser.organizaciones,
            fotoPerfilUrl: freshUser.fotoPerfilUrl,
            fotoPerfilEncuadre: freshUser.fotoPerfilEncuadre,
          }, token))
          .catch(() => {
            if (usuario && token) setAuth(usuario, token);
          });
      }
      setShowCancel(false);
      refetch();
    },
    onError: () => toast.error('Error al cancelar. Contactá soporte.'),
  });

  const isPro = planInfo?.plan === 'PRO';
  const canManageSubscription = currentOrg?.propietarioId === usuario?.id;
  const canStartCheckout = !token || canManageSubscription;

  return (
    <div className="min-h-screen bg-gray-50">
      {!token && <PublicNav />}
      <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Planes AgroManager AR</h1>
        <p className="text-gray-500 text-lg">
          Empezá gratis. Escalá cuando tu campo crezca.
        </p>
      </div>

      {/* Current plan badge */}
      {planInfo && (
        <div className={`mb-8 flex items-center gap-2 justify-center text-sm font-medium px-4 py-2 rounded-full w-fit mx-auto
          ${isPro ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
          {isPro ? <Zap size={16} className="text-green-600" /> : <Sprout size={16} />}
          Plan actual: <strong>{isPro ? 'Pro' : 'Free'}</strong>
          {isPro && planInfo.planExpira && (
            <span className="text-green-600 ml-1">
              · Renueva {new Date(planInfo.planExpira).toLocaleDateString('es-AR')}
            </span>
          )}
        </div>
      )}

      {/* Plans grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Free */}
        <div className={`rounded-2xl border-2 p-6 ${!isPro ? 'border-green-500 bg-white' : 'border-gray-200 bg-white shadow-sm'}`}>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-bold text-gray-900">Free</h2>
            {!isPro && <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">Tu plan</span>}
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">$0 <span className="text-base font-normal text-gray-500">/ mes</span></p>
          <p className="text-sm text-gray-500 mb-6">Para probar el flujo completo de tu campo y equipo</p>
          <div className="space-y-2.5">
            {features.filter((feature) => feature.free !== false).slice(0, 10).map((f) => (
              <div key={f.label} className="flex items-center gap-2.5 text-sm text-gray-700">
                {typeof f.free === 'boolean'
                  ? <Check size={16} className="text-green-500 shrink-0" />
                  : <Check size={16} className="text-green-500 shrink-0" />}
                <span>{f.label}: <span className="text-gray-500">{typeof f.free === 'boolean' ? 'Incluido' : f.free}</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro */}
        <div className={`rounded-2xl border-2 p-6 relative ${isPro ? 'border-green-500 bg-white' : 'border-gray-200 bg-white'}`}>
          <div className="absolute -top-3 left-6">
            <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium">Recomendado</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-gray-900">Pro</h2>
            {isPro && <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">Tu plan</span>}
          </div>

          {/* Toggle mensual / anual */}
          {!isPro && (
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 mb-4 w-fit">
              <button
                onClick={() => setTipo('mensual')}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${tipo === 'mensual' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
              >
                Mensual
              </button>
              <button
                onClick={() => setTipo('anual')}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${tipo === 'anual' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
              >
                Anual
              </button>
            </div>
          )}

          <p className="text-3xl font-bold text-gray-900 mb-1">
            ${PRECIOS[tipo].monto.toLocaleString('es-AR')}
            <span className="text-base font-normal text-gray-500"> ARS / {PRECIOS[tipo].label}</span>
          </p>

          {/* Descuento anual */}
          {tipo === 'anual' && (
            <p className="text-sm font-medium text-green-700 bg-green-100 rounded-lg px-3 py-1 mb-2 w-fit">
              🎉 Ahorrá un 16% con el plan anual
            </p>
          )}

          <p className="text-sm text-gray-500 mb-1">Gestión completa sin límites</p>
          {(!token || !planInfo?.trialUsado) && (
            <p className="text-xs text-green-700 font-medium mb-5">✓ 14 días gratis — sin cargo hasta que termine la prueba</p>
          )}

          {!isPro && canStartCheckout ? (
            <button
              onClick={() => {
                if (!token) { navigate('/login'); return; }
                checkoutMutation.mutate();
              }}
              disabled={checkoutMutation.isPending}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mb-5"
            >
              <Zap size={18} />
              {checkoutMutation.isPending ? 'Redirigiendo...' : 'Suscribirse con MercadoPago'}
            </button>
          ) : isPro && canManageSubscription ? (
            <div className="mb-5 space-y-2">
              <div className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl text-center">
                ✓ Suscripción activa
              </div>
              <button
                onClick={() => setShowCancel(true)}
                className="w-full text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                Cancelar suscripción
              </button>
            </div>
          ) : (
            <div className="mb-5 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">
              {isPro
                ? 'Esta organización ya tiene el plan Pro activo.'
                : 'Solo el propietario de la organización puede administrar el plan.'}
            </div>
          )}

          <div className="space-y-2.5">
            {features.filter((feature) => feature.pro !== false).slice(0, 14).map((f) => (
              <div key={f.label} className="flex items-center gap-2.5 text-sm text-gray-700">
                <Check size={16} className="text-green-500 shrink-0" />
                <span>{f.label}: <span className="text-gray-500">{typeof f.pro === 'boolean' ? 'Incluido' : f.pro}</span></span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border-2 border-emerald-700 bg-emerald-950 p-6 text-white md:col-span-2">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-emerald-950">PARA GRUPOS AGROPECUARIOS</span>
              <h2 className="mt-4 text-2xl font-bold">Plan Empresa</h2>
              <p className="mt-2 max-w-2xl text-emerald-100">Para empresas agropecuarias y grupos con múltiples establecimientos.</p>
              <p className="mt-4 text-3xl font-bold">Desde $69.990 <span className="text-base font-normal text-emerald-200">/ mes</span></p>
              <p className="mt-1 text-sm text-emerald-200">Incluye hasta 3 establecimientos. Cotización personalizada para ampliar la operación.</p>
            </div>
            <a
              href="mailto:agromanagerarcontacto@gmail.com?subject=Consulta%20Plan%20Empresa"
              className="shrink-0 rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
            >
              Solicitar cotización
            </a>
          </div>
          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            {['Todo Pro incluido', 'Dashboard consolidado', 'Personal y permisos avanzados', 'Auditoria y exportaciones'].map((beneficio) => (
              <span key={beneficio} className="flex items-center gap-2 text-emerald-100"><Check size={16} className="text-emerald-300" />{beneficio}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Feature comparison table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
        <div className="min-w-[720px]">
        <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700">
          <div className="px-6 py-3">Funcionalidad</div>
          <div className="px-4 py-3 text-center">Free</div>
          <div className="px-4 py-3 text-center text-green-700">Pro</div>
          <div className="px-4 py-3 text-center text-emerald-800">Empresa</div>
        </div>
        {features.map((f, i) => (
          <div
            key={f.label}
            className={`grid grid-cols-4 text-sm border-b border-gray-100 last:border-0 ${i % 2 === 0 ? '' : 'bg-gray-50/40'}`}
          >
            <div className="px-6 py-3 text-gray-700 font-medium">{f.label}</div>
            <div className="px-4 py-3 text-center"><FeatureCell value={f.free} /></div>
            <div className="px-4 py-3 text-center"><FeatureCell value={f.empresa ?? f.pro} /></div>
            <div className="px-4 py-3 text-center"><FeatureCell value={f.pro} /></div>
          </div>
        ))}
        </div>
        </div>
      </div>

      {/* Back button */}
      <div className="mt-8 text-center">
        <button onClick={() => navigate(activeOrgId ? `/org/${activeOrgId}/dashboard` : '/')} className="text-sm text-gray-500 hover:text-gray-700">
          ← Volver al dashboard
        </button>
      </div>

      {/* Cancel confirmation modal */}
      {showCancel && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={22} />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Cancelar suscripción Pro</h3>
                <p className="text-sm text-gray-600">
                  Perdés acceso a todas las features Pro: IA AgroBot, campañas, reportes avanzados y más.
                  Tus datos no se borran.
                </p>
                {!planInfo?.mpSuscripcionId && (
                  <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2 mt-2 space-y-1">
                    <p>⚠️ Tu suscripción fue creada externamente. Para evitar futuros cobros, cancelá directamente desde MercadoPago:</p>
                    <a
                      href="https://www.mercadopago.com.ar/subscriptions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 underline font-medium"
                    >
                      Ir a Mis suscripciones en MercadoPago →
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancel(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                No cancelar
              </button>
              <button
                onClick={() => cancelMutation.mutate()}
                disabled={cancelMutation.isPending}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-60"
              >
                {cancelMutation.isPending ? 'Cancelando...' : 'Confirmar cancelación'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
      {!token && <PublicFooter />}
    </div>
  );
}
