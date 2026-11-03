import { useQuery } from '@tanstack/react-query';
import { CalendarClock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { promocionesApi } from '../../api/promociones.api';

type EstadoPromocionProCardProps = {
  organizacionId?: number | null;
  compact?: boolean;
};

export function EstadoPromocionProCard({ organizacionId, compact = false }: EstadoPromocionProCardProps) {
  const promocionQuery = useQuery({
    queryKey: ['promociones', 'mi-promocion', organizacionId],
    queryFn: () => promocionesApi.obtenerMiPromocion(organizacionId as number),
    enabled: Boolean(organizacionId),
  });
  const promocion = promocionQuery.data;

  if (!promocion) return null;

  const fechaFin = new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(promocion.fechaFin));

  return (
    <section className={`rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950 shadow-sm dark:border-emerald-800/70 dark:bg-emerald-950/35 dark:text-emerald-50 ${compact ? '' : 'sm:p-5'}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <Sparkles size={19} />
          </span>
          <div>
            <h2 className="font-bold">Estás usando AgroManager Pro promocional</h2>
            <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-100">
              Tenés acceso Pro hasta el {fechaFin}. Te quedan {promocion.diasRestantes} {promocion.diasRestantes === 1 ? 'día' : 'días'}.
            </p>
          </div>
        </div>
        <Link to="/precios" className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm font-bold text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-100 dark:hover:bg-emerald-900/60">
          <CalendarClock size={15} /> Ver planes
        </Link>
      </div>
    </section>
  );
}
