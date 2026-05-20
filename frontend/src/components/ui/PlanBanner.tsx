import { useNavigate } from 'react-router-dom';
import { Zap, X } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';

interface PlanBannerProps {
  feature: string;
  description?: string;
}

/**
 * Banner que muestra cuando el usuario Free intenta acceder a una feature Pro.
 */
export function PlanBanner({ feature, description }: PlanBannerProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 max-w-md w-full">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Zap size={28} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {feature} es Pro
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {description ?? `Actualizá a Pro por $12 USD/mes y desbloqueá ${feature} junto con todas las features avanzadas.`}
        </p>
        <button
          onClick={() => navigate('/precios')}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Zap size={18} />
          Ver planes y suscribirme
        </button>
      </div>
    </div>
  );
}

/**
 * Overlay pequeño para bloquear secciones dentro de una página.
 */
export function ProLock({ children, feature }: { children: React.ReactNode; feature: string }) {
  const navigate = useNavigate();
  const isPro = useAuthStore((s) => s.isPro());

  if (isPro) return <>{children}</>;

  return (
    <div className="relative">
      <div className="pointer-events-none select-none opacity-40 blur-sm">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={() => navigate('/precios')}
          className="bg-white border border-green-300 shadow-lg rounded-xl px-5 py-3 flex items-center gap-2 text-sm font-semibold text-green-700 hover:bg-green-50 transition-colors"
        >
          <Zap size={16} />
          {feature} — Solo Pro
        </button>
      </div>
    </div>
  );
}

/**
 * Banner de upgrade inline (top of page).
 */
export function UpgradeBanner() {
  const isPro = useAuthStore((s) => s.isPro());
  const navigate = useNavigate();
  const [dismissed, setDismissed] = React.useState(false);

  if (isPro || dismissed) return null;

  return (
    <div className="bg-linear-to-r from-green-600 to-green-700 text-white rounded-xl px-4 py-3 mb-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-sm">
        <Zap size={16} className="shrink-0" />
        <span>
          <strong>Probá Pro gratis 14 días</strong> — Desbloqueá IA AgroBot, campañas, reportes y más.
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => navigate('/precios')}
          className="bg-white text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors"
        >
          Ver planes
        </button>
        <button onClick={() => setDismissed(true)} className="text-white/70 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

// need React for useState in same file
import React from 'react';
