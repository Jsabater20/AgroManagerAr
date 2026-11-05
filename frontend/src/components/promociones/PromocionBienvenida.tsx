import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Gift, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { promocionesApi } from '../../api/promociones.api';

export function PromocionBienvenida({ organizacionId }: { organizacionId: number }) {
  const queryClient = useQueryClient();
  const queryKey = ['promociones', 'mi-promocion', organizacionId];
  const promocionQuery = useQuery({
    queryKey,
    queryFn: () => promocionesApi.obtenerMiPromocion(organizacionId),
    enabled: organizacionId > 0,
  });
  const ocultar = useMutation({
    mutationFn: (asignacionId: number) => promocionesApi.marcarBienvenidaVista(asignacionId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
  const promocion = promocionQuery.data;

  if (!promocion || promocion.origen !== 'EXISTENTE' || promocion.bienvenidaVistaEn) return null;

  const fechaFin = new Intl.DateTimeFormat('es-AR', {
    day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date(promocion.fechaFin));

  return (
    <section className="relative overflow-hidden rounded-2xl border border-emerald-300 bg-gradient-to-r from-emerald-700 to-teal-700 p-5 text-white shadow-md">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
      <div className="relative flex gap-3 pr-7">
        <Gift className="mt-0.5 shrink-0 text-emerald-100" size={25} />
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-100">Beneficio de lanzamiento</p>
          <h2 className="mt-1 text-lg font-bold">¡Tenemos una novedad para vos!</h2>
          <p className="mt-1 text-sm leading-6 text-emerald-50">
            Activamos tres meses completos de AgroManager Pro gratis para tu cuenta, hasta el {fechaFin}. No requiere tarjeta ni genera renovación automática.
          </p>
          <Link to="/precios" className="mt-3 inline-flex rounded-lg bg-white px-3 py-2 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50">
            Conocer Plan Pro
          </Link>
        </div>
      </div>
      <button
        type="button"
        onClick={() => ocultar.mutate(promocion.asignacionId)}
        disabled={ocultar.isPending}
        aria-label="Cerrar aviso de promoción"
        className="absolute right-3 top-3 rounded-md p-1.5 text-emerald-50 transition hover:bg-white/15 disabled:opacity-60"
      >
        <X size={18} />
      </button>
    </section>
  );
}
