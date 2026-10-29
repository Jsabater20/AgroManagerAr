import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, ArrowRight, CircleAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { alertasApi } from '../../api/alertas.api';
import { useAuthStore } from '../../store/auth.store';

interface AlertasOperativasPanelProps {
  organizacionId: number;
}

export const AlertasOperativasPanel = ({
  organizacionId,
}: AlertasOperativasPanelProps) => {
  const queryClient = useQueryClient();
  const alertasQuery = useQuery({
    queryKey: ['alertas-operativas', organizacionId],
    queryFn: alertasApi.listar,
    enabled: organizacionId > 0,
    refetchInterval: 120000,
  });
  const alertas = alertasQuery.data ?? [];
  const usuario = useAuthStore((state) => state.usuario);
  const esOwner = usuario?.organizaciones?.some(
    (organizacion) => organizacion.id === organizacionId && organizacion.propietarioId === usuario.id,
  ) ?? false;

  useEffect(() => {
    if (alertas.length) {
      queryClient.invalidateQueries({ queryKey: ['notificaciones'] });
    }
  }, [alertas.length, queryClient]);

  if (alertasQuery.isLoading || !alertas.length) return null;

  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex gap-3">
          <span className="rounded-xl bg-amber-100 p-2.5 text-amber-700"><CircleAlert size={20} /></span>
          <div>
            <h2 className="font-bold text-amber-950">Atención requerida</h2>
            <p className="mt-1 text-sm text-amber-800">Son avisos basados en fechas de trabajo y costos registrados.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-amber-800">{alertas.length} {alertas.length === 1 ? 'alerta' : 'alertas'}</span>
          {esOwner && (
            <Link to={`/org/${organizacionId}/alertas`} className="rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-bold text-amber-800 transition hover:bg-amber-100">Ver centro</Link>
          )}
        </div>
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {alertas.slice(0, 4).map((alerta) => (
          <Link key={alerta.id} to={alerta.enlace} className="flex items-center justify-between gap-4 rounded-xl border border-amber-200 bg-white px-4 py-3 transition hover:border-amber-400 hover:shadow-sm">
            <div className="flex min-w-0 items-start gap-3"><AlertTriangle size={17} className={alerta.severidad === 'CRITICA' ? 'mt-0.5 shrink-0 text-red-600' : 'mt-0.5 shrink-0 text-amber-600'} /><div className="min-w-0"><p className="truncate text-sm font-bold text-slate-900">{alerta.titulo}</p><p className="mt-1 text-xs text-slate-600">{alerta.mensaje}</p></div></div><ArrowRight size={16} className="shrink-0 text-amber-700" />
          </Link>
        ))}
      </div>
    </section>
  );
};
