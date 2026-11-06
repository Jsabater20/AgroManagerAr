import { useMutation } from '@tanstack/react-query';
import { BellOff, CheckCircle2, Leaf } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { novedadesApi } from '../../api/novedades.api';

export default function DesuscribirNovedadesPage() {
  const [searchParams] = useSearchParams();
  const usuarioId = Number(searchParams.get('usuario'));
  const firma = searchParams.get('firma') ?? '';
  const enlaceValido = Number.isInteger(usuarioId) && usuarioId > 0 && Boolean(firma);
  const desuscribir = useMutation({
    mutationFn: () => novedadesApi.desuscribirDeNovedades(usuarioId, firma),
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 p-5">
      <section className="w-full max-w-lg rounded-3xl border border-white/10 bg-white p-7 text-center shadow-2xl sm:p-10">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700"><Leaf size={24} /></span>
        {desuscribir.isSuccess ? (
          <>
            <CheckCircle2 className="mx-auto mt-6 text-emerald-600" size={42} />
            <h1 className="mt-4 text-2xl font-extrabold text-slate-900">Preferencia actualizada</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">Ya no vas a recibir emails de novedades y actualizaciones de AgroManager AR. Podés volver a activarlos cuando quieras desde tu perfil.</p>
          </>
        ) : (
          <>
            <BellOff className="mx-auto mt-6 text-slate-700" size={42} />
            <h1 className="mt-4 text-2xl font-extrabold text-slate-900">¿Dejar de recibir novedades?</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">Vas a dejar de recibir emails sobre nuevas herramientas y actualizaciones. Tus alertas operativas y el acceso a tu cuenta no cambian.</p>
            {!enlaceValido ? (
              <p className="mt-5 rounded-xl bg-rose-50 p-3 text-sm font-medium text-rose-700">Este enlace no es válido o está incompleto.</p>
            ) : (
              <button
                type="button"
                onClick={() => desuscribir.mutate()}
                disabled={desuscribir.isPending}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {desuscribir.isPending ? 'Actualizando preferencia...' : 'Sí, dejar de recibir novedades'}
              </button>
            )}
            {desuscribir.isError && <p className="mt-4 text-sm font-medium text-rose-700">No pudimos actualizar la preferencia. Probá nuevamente o contactanos.</p>}
          </>
        )}
      </section>
    </main>
  );
}
