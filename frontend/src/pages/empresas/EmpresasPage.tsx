import { Building2, CalendarDays, ChevronRight, MapPinned } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { empresasApi } from '../../api/empresas.api';

export default function EmpresasPage() {
  const empresasQuery = useQuery({ queryKey: ['empresas-mias'], queryFn: empresasApi.listarMias });

  if (empresasQuery.isLoading) {
    return <PageState message="Cargando empresas..." />;
  }

  if (empresasQuery.isError) {
    return <PageState message="No pudimos cargar tus empresas. Intentá nuevamente." />;
  }

  const empresas = empresasQuery.data ?? [];
  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">Plan Empresa</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Mis empresas</h1>
        <p className="mt-2 text-slate-600">Gestioná tus establecimientos desde una vista consolidada.</p>
      </div>

      {empresas.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <Building2 className="mx-auto text-slate-400" size={36} />
          <h2 className="mt-4 text-lg font-bold text-slate-900">Todavía no tenés una empresa asignada</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
            El Plan Empresa se habilita de forma comercial. Contactanos para crear y vincular tus establecimientos.
          </p>
          <Link to="/contacto" className="mt-5 inline-flex rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800">
            Solicitar cotización
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {empresas.map((empresa) => (
            <Link
              key={empresa.id}
              to={`/empresas/${empresa.id}/dashboard`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700"><Building2 size={22} /></div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{empresa.nombre}</h2>
                    <p className="mt-1 text-sm text-slate-500">{empresa.rol.replaceAll('_', ' ')}</p>
                  </div>
                </div>
                <ChevronRight className="text-slate-400 transition group-hover:translate-x-1" size={20} />
              </div>
              <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <MapPinned size={16} className="text-emerald-600" />
                {empresa.establecimientos} de {empresa.limiteEstablecimientos} establecimientos
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-bold text-emerald-800">
                  {empresa.estadoComercial === 'ACTIVA' ? 'Plan Empresa activo' : empresa.estadoComercial}
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <CalendarDays size={13} />
                  {empresa.fechaVencimiento ? 'Vence ' + fechaVisible(empresa.fechaVencimiento) : 'Sin vencimiento definido'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function PageState({ message }: { message: string }) {
  return <div className="p-10 text-center text-slate-600">{message}</div>;
}

function fechaVisible(fecha: string) {
  const [anio, mes, dia] = fecha.slice(0, 10).split('-');
  return dia + '/' + mes + '/' + anio;
}
