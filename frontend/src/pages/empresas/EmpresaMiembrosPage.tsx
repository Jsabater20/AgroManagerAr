import { Users, type LucideIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { empresasApi } from '../../api/empresas.api';

export default function EmpresaMiembrosPage() {
  const { empresaId } = useParams<{ empresaId: string }>();
  const id = Number(empresaId);
  const query = useQuery({
    queryKey: ['empresa-miembros-consolidados', id],
    queryFn: () => empresasApi.obtenerMiembrosConsolidados(id),
    enabled: Number.isInteger(id) && id > 0,
  });

  if (query.isLoading) return <PageState message="Cargando el equipo consolidado..." />;
  if (query.isError) return <PageState message="No pudimos cargar el equipo empresarial." />;

  const miembros = query.data ?? [];
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <Header empresaId={id} title="Equipo consolidado" description="Miembros activos en los establecimientos que administrás." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {miembros.map((miembro) => (
          <article key={miembro.usuario.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <Avatar nombre={miembro.usuario.nombre} apellido={miembro.usuario.apellido} />
              <div className="min-w-0">
                <h2 className="truncate font-bold text-slate-900">{miembro.usuario.nombre} {miembro.usuario.apellido}</h2>
                <p className="truncate text-sm text-slate-500">{miembro.usuario.email}</p>
              </div>
            </div>
            <div className="mt-5 rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Trabajos activos</p>
              <p className="mt-1 text-2xl font-bold text-emerald-700">{miembro.trabajosActivos}</p>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Establecimientos</p>
              {miembro.establecimientos.map((establecimiento) => (
                <Link key={establecimiento.id} to={`/org/${establecimiento.id}/dashboard`} className="flex items-center justify-between rounded-lg px-2 py-2 text-sm hover:bg-emerald-50">
                  <span className="font-medium text-slate-700">{establecimiento.nombre}</span>
                  <span className="text-xs font-semibold text-emerald-700">Abrir</span>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
      {miembros.length === 0 && <EmptyState message="No hay miembros activos en los establecimientos autorizados." />}
    </div>
  );
}

export function Header({ empresaId, title, description, icon: Icon = Users }: { empresaId: number; title: string; description: string; icon?: LucideIcon }) {
  return <div className="flex items-start gap-4"><Link to={`/empresas/${empresaId}/dashboard`} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">← Empresa</Link><div><div className="flex items-center gap-2"><Icon size={20} className="text-emerald-700" /><h1 className="text-2xl font-bold text-slate-900">{title}</h1></div><p className="mt-1 text-sm text-slate-500">{description}</p></div></div>;
}

export function PageState({ message }: { message: string }) {
  return <div className="p-10 text-center text-slate-600">{message}</div>;
}

export function EmptyState({ message }: { message: string }) {
  return <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">{message}</div>;
}

function Avatar({ nombre, apellido }: { nombre: string; apellido: string }) {
  return <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">{`${nombre[0] ?? ''}${apellido[0] ?? ''}`}</div>;
}
