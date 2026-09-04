import { ClipboardList, PawPrint, Tractor } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  empresasApi,
  type ActividadConsolidadaEmpresa,
  type AnimalConsolidadoEmpresa,
  type MaquinariaConsolidadaEmpresa,
} from '../../api/empresas.api';
import { EmptyState, Header, PageState } from './EmpresaMiembrosPage';

type SeccionOperacion = 'actividades' | 'maquinarias' | 'ganaderia';

const CONFIG: Record<SeccionOperacion, { titulo: string; descripcion: string; icono: typeof ClipboardList }> = {
  actividades: { titulo: 'Actividades consolidadas', descripcion: 'Trabajos asignados en todos los establecimientos autorizados.', icono: ClipboardList },
  maquinarias: { titulo: 'Maquinarias consolidadas', descripcion: 'Flota disponible en todos los establecimientos autorizados.', icono: Tractor },
  ganaderia: { titulo: 'Ganadería consolidada', descripcion: 'Animales registrados en todos los establecimientos autorizados.', icono: PawPrint },
};

export default function EmpresaOperacionPage({ seccion }: { seccion: SeccionOperacion }) {
  const { empresaId } = useParams<{ empresaId: string }>();
  const id = Number(empresaId);
  const [organizacionId, setOrganizacionId] = useState<number>();
  const config = CONFIG[seccion];
  const organizacionesQuery = useQuery({
    queryKey: ['empresa-organizaciones', id],
    queryFn: () => empresasApi.obtenerOrganizaciones(id),
    enabled: Number.isInteger(id) && id > 0,
  });
  const actividadesQuery = useQuery({
    queryKey: ['empresa-actividades', id, organizacionId],
    queryFn: () => empresasApi.obtenerActividades(id, { organizacionId }),
    enabled: seccion === 'actividades' && Number.isInteger(id) && id > 0,
  });
  const maquinariasQuery = useQuery({
    queryKey: ['empresa-maquinarias', id, organizacionId],
    queryFn: () => empresasApi.obtenerMaquinarias(id, { organizacionId }),
    enabled: seccion === 'maquinarias' && Number.isInteger(id) && id > 0,
  });
  const ganaderiaQuery = useQuery({
    queryKey: ['empresa-ganaderia', id, organizacionId],
    queryFn: () => empresasApi.obtenerGanaderia(id, { organizacionId }),
    enabled: seccion === 'ganaderia' && Number.isInteger(id) && id > 0,
  });

  const estaCargando = organizacionesQuery.isLoading || actividadesQuery.isLoading || maquinariasQuery.isLoading || ganaderiaQuery.isLoading;
  const tieneError = organizacionesQuery.isError || actividadesQuery.isError || maquinariasQuery.isError || ganaderiaQuery.isError;
  if (estaCargando) return <PageState message={`Cargando ${config.titulo.toLowerCase()}...`} />;
  if (tieneError) return <PageState message="No pudimos cargar esta información empresarial." />;

  const Icon = config.icono;
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <Header empresaId={id} title={config.titulo} description={config.descripcion} />
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700"><Icon size={18} className="text-emerald-700" /> Vista consolidada</div>
        <label className="text-sm text-slate-600">Establecimiento <select value={organizacionId ?? ''} onChange={(event) => setOrganizacionId(event.target.value ? Number(event.target.value) : undefined)} className="ml-2 rounded-lg border border-slate-300 px-3 py-2 text-slate-700"><option value="">Todos los autorizados</option>{(organizacionesQuery.data ?? []).map((organizacion) => <option key={organizacion.id} value={organizacion.id}>{organizacion.nombre}</option>)}</select></label>
      </div>
      {seccion === 'actividades' && <Actividades actividades={actividadesQuery.data ?? []} />}
      {seccion === 'maquinarias' && <Maquinarias maquinarias={maquinariasQuery.data ?? []} />}
      {seccion === 'ganaderia' && <Ganaderia total={ganaderiaQuery.data?.total ?? 0} animales={ganaderiaQuery.data?.animales ?? []} />}
    </div>
  );
}

function Actividades({ actividades }: { actividades: ActividadConsolidadaEmpresa[] }) {
  if (!actividades.length) return <EmptyState message="No hay actividades para los establecimientos seleccionados." />;
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{actividades.map((actividad) => <article key={actividad.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{actividad.organizacion.nombre}</p><h2 className="mt-1 font-bold text-slate-900">{actividad.titulo}</h2></div><EstadoActividad estado={actividad.estado} /></div><p className="mt-3 line-clamp-2 text-sm text-slate-500">{actividad.contexto || actividad.descripcion || 'Sin detalle adicional.'}</p><div className="mt-4 border-t border-slate-100 pt-3 text-sm text-slate-600"><p>{actividad.usuarioOrganizacion.usuario.nombre} {actividad.usuarioOrganizacion.usuario.apellido}</p><p className="mt-1 text-xs">Finaliza: {formatearFecha(actividad.fechaEstimadaFin)}</p></div></article>)}</div>;
}

function Maquinarias({ maquinarias }: { maquinarias: MaquinariaConsolidadaEmpresa[] }) {
  if (!maquinarias.length) return <EmptyState message="No hay maquinarias para los establecimientos seleccionados." />;
  return <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="w-full text-sm"><thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Maquinaria</th><th className="px-5 py-3">Establecimiento</th><th className="px-5 py-3">Campo</th><th className="px-5 py-3">Estado</th></tr></thead><tbody className="divide-y divide-slate-100">{maquinarias.map((maquinaria) => <tr key={maquinaria.id}><td className="px-5 py-4"><p className="font-semibold text-slate-900">{maquinaria.nombre}</p><p className="mt-1 text-xs text-slate-500">{maquinaria.marca || maquinaria.tipo}{maquinaria.modelo ? ` · ${maquinaria.modelo}` : ''}</p></td><td className="px-5 py-4 text-slate-600">{maquinaria.organizacion.nombre}</td><td className="px-5 py-4 text-slate-600">{maquinaria.campo?.nombre ?? 'Sin campo'}</td><td className="px-5 py-4"><EstadoMaquinaria estado={maquinaria.estado} /></td></tr>)}</tbody></table></div>;
}

function Ganaderia({ total, animales }: { total: number; animales: AnimalConsolidadoEmpresa[] }) {
  if (!animales.length) return <EmptyState message="No hay animales para los establecimientos seleccionados." />;
  return <div className="space-y-4"><p className="text-sm text-slate-500"><span className="font-bold text-slate-900">{total}</span> animales registrados</p><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{animales.map((animal) => <article key={animal.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{animal.organizacion?.nombre ?? 'Sin establecimiento'}</p><h2 className="mt-1 font-bold text-slate-900">{animal.nombre}</h2><p className="mt-2 text-sm text-slate-600">{animal.especie} · {animal.categoria}</p><div className="mt-4 flex justify-between border-t border-slate-100 pt-3 text-xs text-slate-500"><span>{animal.sexo}</span><span>{animal.peso ? `${animal.peso} kg` : 'Sin peso registrado'}</span></div></article>)}</div></div>;
}

function EstadoActividad({ estado }: { estado: ActividadConsolidadaEmpresa['estado'] }) {
  const estilos = { PENDIENTE: 'bg-amber-100 text-amber-800', EN_PROGRESO: 'bg-blue-100 text-blue-800', PAUSADA: 'bg-slate-200 text-slate-700', COMPLETADA: 'bg-emerald-100 text-emerald-800', CANCELADA: 'bg-red-100 text-red-700' };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${estilos[estado]}`}>{estado.replace('_', ' ')}</span>;
}

function EstadoMaquinaria({ estado }: { estado: MaquinariaConsolidadaEmpresa['estado'] }) {
  const estilos = { OPERATIVA: 'bg-emerald-100 text-emerald-800', EN_MANTENIMIENTO: 'bg-amber-100 text-amber-800', FUERA_DE_SERVICIO: 'bg-red-100 text-red-700' };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${estilos[estado]}`}>{estado.replaceAll('_', ' ')}</span>;
}

function formatearFecha(fecha: string | null) {
  if (!fecha) return 'Sin fecha estimada';
  return new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium' }).format(new Date(fecha));
}
