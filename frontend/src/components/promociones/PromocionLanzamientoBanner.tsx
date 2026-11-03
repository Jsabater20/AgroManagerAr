import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { promocionesApi } from '../../api/promociones.api';

export function PromocionLanzamientoBanner() {
  const promocionQuery = useQuery({
    queryKey: ['promociones', 'lanzamiento-publico'],
    queryFn: promocionesApi.obtenerLanzamientoPublico,
    staleTime: 5 * 60 * 1000,
  });
  const promocion = promocionQuery.data;

  if (!promocion) return null;

  const fechaLimite = new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
  }).format(new Date(promocion.finNuevosRegistros));

  return (
    <section className="border-b border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
            <Gift size={18} />
          </span>
          <p className="text-sm leading-5">
            <strong>{promocion.nombre}.</strong>{' '}
            Registrate antes del {fechaLimite}; sin tarjeta ni renovación automática.
          </p>
        </div>
        <Link
          to="/register"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-800"
        >
          Crear mi cuenta <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
