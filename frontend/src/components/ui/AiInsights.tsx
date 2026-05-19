import { useQuery } from '@tanstack/react-query';
import { Bot, AlertTriangle, CheckCircle2, Info, Lightbulb, RefreshCw, Link, Zap } from 'lucide-react';
import { aiApi, type AiInsight } from '../../api/ai.api';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

const TIPO_CONFIG: Record<
  string,
  { icon: typeof Info; iconClass: string; bg: string; border: string; dot: string }
> = {
  warning: {
    icon: AlertTriangle,
    iconClass: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-200 dark:border-orange-800/50',
    dot: 'bg-orange-500',
  },
  success: {
    icon: CheckCircle2,
    iconClass: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800/50',
    dot: 'bg-emerald-500',
  },
  info: {
    icon: Info,
    iconClass: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800/50',
    dot: 'bg-blue-500',
  },
  tip: {
    icon: Lightbulb,
    iconClass: 'text-yellow-500',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-200 dark:border-yellow-800/50',
    dot: 'bg-yellow-400',
  },
};

export default function AiInsights() {
  const isPro = useAuthStore((s) => s.isPro());
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch, isFetching } = useQuery<AiInsight[]>({
    queryKey: ['ai-insights'],
    queryFn: aiApi.insights,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: isPro,
  });

  if (!isPro) {
    return (
      <div className="bg-white dark:bg-gray-800/70 rounded-2xl border border-gray-100 dark:border-gray-700/40 shadow-sm p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-green-600 flex items-center justify-center">
            <Bot size={15} className="text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white text-sm leading-none">AgroBot — Análisis IA</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">Insights de tu establecimiento</p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center py-4 gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Zap size={22} className="text-green-600" />
          </div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Análisis IA disponible en Pro</p>
          <p className="text-xs text-gray-500 max-w-xs">Activá Pro y AgroBot va a analizar tus datos y sugerirte acciones concretas para tu campo.</p>
          <button
            onClick={() => navigate('/precios')}
            className="mt-1 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Ver planes Pro →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800/70 rounded-2xl border border-gray-100 dark:border-gray-700/40 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-green-600 flex items-center justify-center">
            <Bot size={15} className="text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white text-sm leading-none">
              AgroBot — Análisis IA
            </h2>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
              Insights automáticos de tu establecimiento
            </p>
          </div>
        </div>
        <button
          onClick={() => void refetch()}
          disabled={isFetching}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 transition-colors"
          title="Actualizar análisis"
        >
          <RefreshCw size={13} className={isFetching ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-2.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 rounded-xl bg-gray-100 dark:bg-gray-700 animate-pulse" />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div className="text-center py-6 text-sm text-gray-400">
          <Bot size={28} className="mx-auto mb-2 opacity-30" />
          <p>No se pudo obtener el análisis.</p>
          <p className="text-xs mt-1 text-gray-300">
            Verificá que <code className="text-gray-400">GEMINI_API_KEY</code> esté configurada en el backend.
          </p>
        </div>
      )}

      {/* Insights */}
      {!isLoading && !isError && data && (
        <div className="space-y-2.5">
          {data.map((insight, i) => {
            const cfg = TIPO_CONFIG[insight.tipo] ?? TIPO_CONFIG.info;
            const Icon = cfg.icon;
            return (
              <div
                key={i}
                className={`flex gap-3 px-4 py-3 rounded-xl border ${cfg.bg} ${cfg.border}`}
              >
                <Icon size={16} className={`${cfg.iconClass} shrink-0 mt-0.5`} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-tight">
                    {insight.titulo}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                    {insight.texto}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer CTA */}
      <RouterLink
        to="#"
        onClick={(e) => { e.preventDefault(); document.querySelector<HTMLButtonElement>('[aria-label="AgroBot"]')?.click(); }}
        className="mt-3.5 flex items-center justify-center gap-1.5 text-xs text-green-700 dark:text-green-400 font-medium hover:underline"
      >
        <Link size={11} />
        Abrí el chat para hacer preguntas
      </RouterLink>
    </div>
  );
}
