import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  AlertTriangle,
  BriefcaseBusiness,
  Clock3,
  Filter,
  Loader2,
  PlayCircle,
  Users,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { listActividades } from '../../api/actividades.api';
import { ownerAdminApi } from '../../api/owner-admin.api';
import type { MiembroPanelDto } from '../../api/types';
import { ProfileAvatar } from '../../components/profile/ProfileAvatar';
import { EvidenceAction } from '../../components/evidencias/EvidenceAction';

type ActividadMiembro = {
  id: number;
  titulo: string;
  descripcion?: string;
  recursoTipo: string;
  recursoId?: number | null;
  fechaInicio: string;
  fechaEstimadaFin?: string | null;
  horarioInicio?: string | null;
  horarioFin?: string | null;
  prioridad: 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';
  estado: 'PENDIENTE' | 'EN_PROGRESO' | 'PAUSADA' | 'COMPLETADA' | 'CANCELADA' | 'ARCHIVADA';
  usuarioOrganizacionId: number;
};

type FiltroSeguimiento = 'TODOS' | 'ATENCION' | 'SIN_TRABAJOS';

const CARGOS: Record<string, string> = {
  ADMINISTRACION_GENERAL: 'Administración general',
  ENCARGADO_ESTABLECIMIENTO: 'Encargado de establecimiento',
  ENCARGADO_AGRICOLA: 'Encargado agrícola',
  ENCARGADO_GANADERO: 'Encargado ganadero',
  ENCARGADO_TAMBO: 'Encargado de tambo',
  ENCARGADO_AVICOLA: 'Encargado avícola',
  ENCARGADO_FRUTIHORTICOLA: 'Encargado frutihortícola',
  ASESOR_AGRONOMICO: 'Asesor agronómico',
  VETERINARIO: 'Veterinario',
  ENCARGADO_MAQUINARIA: 'Encargado de maquinaria',
  MECANICO_MANTENIMIENTO: 'Mecánico y mantenimiento',
  OPERADOR_MAQUINARIA: 'Operador de maquinaria',
  OPERARIO_RURAL: 'Operario rural',
  INSUMOS_DEPOSITO: 'Insumos y depósito',
  CONTABILIDAD: 'Contabilidad',
  FINANZAS_PAGOS: 'Finanzas y pagos',
  LOGISTICA_TRANSPORTE: 'Logística y transporte',
  COMERCIALIZACION: 'Comercialización',
  CONTRATISTA_EXTERNO: 'Contratista externo',
  OTRO: 'Otro cargo',
};

const ESTADOS: Record<ActividadMiembro['estado'], { etiqueta: string; clase: string }> = {
  PENDIENTE: { etiqueta: 'Pendiente', clase: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200' },
  EN_PROGRESO: { etiqueta: 'En progreso', clase: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-200' },
  PAUSADA: { etiqueta: 'Pausada', clase: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200' },
  COMPLETADA: { etiqueta: 'Completada', clase: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200' },
  CANCELADA: { etiqueta: 'Cancelada', clase: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-200' },
  ARCHIVADA: { etiqueta: 'Archivada', clase: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' },
};

const PRIORIDADES: Record<ActividadMiembro['prioridad'], string> = {
  BAJA: 'Baja',
  MEDIA: 'Media',
  ALTA: 'Alta',
  URGENTE: 'Urgente',
};

const RECURSOS: Record<string, string> = {
  CAMPO: 'Campo',
  LOTE: 'Lote',
  SIEMBRA: 'Siembra',
  ANIMAL: 'Animal',
  TAREA: 'Tarea',
  MAQUINARIA: 'Maquinaria',
  CAMPANIA: 'Campaña',
  GENERAL: 'Trabajo general',
};

function inicioHoy() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return hoy;
}

function esTrabajoActivo(actividad: ActividadMiembro) {
  return ['PENDIENTE', 'EN_PROGRESO', 'PAUSADA'].includes(actividad.estado);
}

function estaVencido(actividad: ActividadMiembro) {
  return Boolean(
    esTrabajoActivo(actividad)
      && actividad.fechaEstimadaFin
      && new Date(actividad.fechaEstimadaFin) < inicioHoy(),
  );
}

function venceHoy(actividad: ActividadMiembro) {
  if (!esTrabajoActivo(actividad) || !actividad.fechaEstimadaFin) return false;
  const fecha = new Date(actividad.fechaEstimadaFin);
  const hoy = inicioHoy();
  const manana = new Date(hoy);
  manana.setDate(manana.getDate() + 1);
  return fecha >= hoy && fecha < manana;
}

function formatDate(fecha?: string | null) {
  return fecha
    ? new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short' }).format(new Date(fecha))
    : 'Sin fecha estimada';
}

function cargoMiembro(miembro: MiembroPanelDto) {
  return miembro.cargoPersonalizado?.trim() || CARGOS[miembro.cargo] || miembro.cargo;
}

export default function MiembrosTrabajosPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const organizacionId = Number(orgId || 0);
  const [filtro, setFiltro] = useState<FiltroSeguimiento>('TODOS');

  const miembrosQuery = useQuery<MiembroPanelDto[]>({
    queryKey: ['miembros-panel', organizacionId],
    queryFn: () => ownerAdminApi.obtenerMiembrosPanel(organizacionId),
    enabled: organizacionId > 0,
  });
  const actividadesQuery = useQuery<ActividadMiembro[]>({
    queryKey: ['actividades', organizacionId],
    queryFn: () => listActividades(organizacionId),
    enabled: organizacionId > 0,
  });

  const miembros = miembrosQuery.data ?? [];
  const actividades = actividadesQuery.data ?? [];
  const seguimiento = useMemo(() => miembros.map((miembro) => {
    const trabajos = actividades.filter((actividad) => actividad.usuarioOrganizacionId === miembro.id);
    const activos = trabajos.filter(esTrabajoActivo);
    const vencidos = activos.filter(estaVencido);
    const paraHoy = activos.filter(venceHoy);
    const visibles = [...activos].sort((izquierda, derecha) => {
      const prioridadIzquierda = estaVencido(izquierda) ? 0 : venceHoy(izquierda) ? 1 : 2;
      const prioridadDerecha = estaVencido(derecha) ? 0 : venceHoy(derecha) ? 1 : 2;
      if (prioridadIzquierda !== prioridadDerecha) return prioridadIzquierda - prioridadDerecha;
      return new Date(izquierda.fechaEstimadaFin ?? izquierda.fechaInicio).getTime() - new Date(derecha.fechaEstimadaFin ?? derecha.fechaInicio).getTime();
    });
    return { miembro, trabajos, activos, vencidos, paraHoy, visibles };
  }).sort((izquierda, derecha) => {
    if (Boolean(derecha.vencidos.length) !== Boolean(izquierda.vencidos.length)) return Number(Boolean(derecha.vencidos.length)) - Number(Boolean(izquierda.vencidos.length));
    return derecha.activos.length - izquierda.activos.length;
  }), [miembros, actividades]);

  const resumen = useMemo(() => ({
    miembrosActivos: miembros.filter((miembro) => miembro.activo).length,
    trabajosActivos: seguimiento.reduce((total, item) => total + item.activos.length, 0),
    vencidos: seguimiento.reduce((total, item) => total + item.vencidos.length, 0),
    paraHoy: seguimiento.reduce((total, item) => total + item.paraHoy.length, 0),
  }), [miembros, seguimiento]);

  const seguimientoFiltrado = seguimiento.filter((item) => {
    if (filtro === 'ATENCION') return item.vencidos.length > 0 || item.paraHoy.length > 0;
    if (filtro === 'SIN_TRABAJOS') return item.activos.length === 0;
    return true;
  });

  if (miembrosQuery.isLoading || actividadesQuery.isLoading) {
    return <div className="flex min-h-[220px] items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-300"><Loader2 className="h-4 w-4 animate-spin" />Cargando seguimiento del equipo...</div>;
  }

  if (miembrosQuery.isError || actividadesQuery.isError) {
    return <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800 dark:border-rose-900/70 dark:bg-rose-950/30 dark:text-rose-200">No se pudo cargar el seguimiento del equipo. Intentá actualizar nuevamente.</div>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200"><Users size={14} />Equipo de trabajo</div>
            <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Seguimiento del equipo</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">Identificá rápidamente quién tiene trabajos en curso, qué está vencido y dónde hace falta acompañamiento.</p>
          </div>
          <Link to={`/org/${orgId}/miembros/asignar-trabajo`} className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"><BriefcaseBusiness size={16} />Asignar trabajo</Link>
        </div>
      </header>

      {miembros.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">Todavía no hay miembros en esta organización.</div>
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Resumen etiqueta="Integrantes activos" valor={resumen.miembrosActivos} detalle="Personas disponibles en el equipo" tono="emerald" icono={Users} />
            <Resumen etiqueta="Trabajos activos" valor={resumen.trabajosActivos} detalle="Pendientes, en progreso o pausados" tono="sky" icono={BriefcaseBusiness} />
            <Resumen etiqueta="Para hoy" valor={resumen.paraHoy} detalle="Necesitan seguimiento durante el día" tono="amber" icono={Clock3} />
            <Resumen etiqueta="Vencidos" valor={resumen.vencidos} detalle="Conviene revisar o reprogramar" tono="rose" icono={AlertTriangle} />
          </section>

          <section className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <span className="mr-1 inline-flex items-center gap-2 px-2 text-sm font-semibold text-slate-700 dark:text-slate-200"><Filter size={16} />Ver</span>
            {([
              ['TODOS', 'Todo el equipo'],
              ['ATENCION', 'Necesitan atención'],
              ['SIN_TRABAJOS', 'Sin trabajos activos'],
            ] as Array<[FiltroSeguimiento, string]>).map(([valor, etiqueta]) => (
              <button key={valor} type="button" onClick={() => setFiltro(valor)} className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${filtro === valor ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'}`}>{etiqueta}</button>
            ))}
          </section>

          {seguimientoFiltrado.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">No hay integrantes que coincidan con este filtro.</div>
          ) : (
            <section className="grid gap-4 xl:grid-cols-2">
              {seguimientoFiltrado.map(({ miembro, activos, vencidos, paraHoy, visibles }) => (
                <article key={miembro.id} className={`rounded-2xl border bg-white p-5 shadow-sm dark:bg-slate-800 ${vencidos.length ? 'border-rose-300 dark:border-rose-900/70' : 'border-slate-200 dark:border-slate-700'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3"><ProfileAvatar nombre={miembro.nombre} apellido={miembro.apellido} fotoUrl={miembro.fotoPerfilUrl} encuadre={miembro.fotoPerfilEncuadre} size="md" /><div className="min-w-0"><h2 className="truncate font-bold text-slate-900 dark:text-white">{miembro.nombre} {miembro.apellido}</h2><p className="mt-0.5 truncate text-sm text-slate-600 dark:text-slate-300">{cargoMiembro(miembro)}</p>{miembro.responsable && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Reporta a {miembro.responsable.nombre} {miembro.responsable.apellido}</p>}</div></div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${miembro.activo ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'}`}>{miembro.activo ? 'Activo' : 'Inactivo'}</span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <Metrica etiqueta="Activos" valor={activos.length} />
                    <Metrica etiqueta="En progreso" valor={miembro.actividades.enProgreso} />
                    <Metrica etiqueta="Completados" valor={miembro.actividades.completadas} />
                  </div>

                  <div className="mt-4 rounded-xl bg-slate-50 p-3 dark:bg-slate-900/70"><p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Campos habilitados</p><p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{miembro.recursosCampos.length ? miembro.recursosCampos.join(', ') : 'Todavía no tiene campos asignados'}</p></div>

                  {vencidos.length > 0 && <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800 dark:border-rose-900/70 dark:bg-rose-950/30 dark:text-rose-200"><AlertTriangle size={17} className="mt-0.5 shrink-0" /><span><strong>Requiere seguimiento:</strong> {vencidos.length} trabajo{vencidos.length === 1 ? '' : 's'} vencido{vencidos.length === 1 ? '' : 's'}.</span></div>}
                  {vencidos.length === 0 && paraHoy.length > 0 && <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-200"><Clock3 size={17} className="mt-0.5 shrink-0" /><span>Tiene {paraHoy.length} trabajo{paraHoy.length === 1 ? '' : 's'} previsto{paraHoy.length === 1 ? '' : 's'} para hoy.</span></div>}

                  <div className="mt-4"><div className="flex items-center justify-between gap-3"><h3 className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white"><BriefcaseBusiness size={16} className="text-emerald-600 dark:text-emerald-300" />Próximos trabajos</h3>{miembro.personasACargo > 0 && <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{miembro.personasACargo} persona{miembro.personasACargo === 1 ? '' : 's'} a cargo</span>}</div>
                    {visibles.length === 0 ? <p className="mt-3 rounded-xl border border-dashed border-slate-300 px-3 py-3 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">No tiene trabajos activos asignados.</p> : <div className="mt-3 space-y-2">{visibles.slice(0, 3).map((trabajo) => <Trabajo key={trabajo.id} trabajo={trabajo} organizacionId={organizacionId} />)}{visibles.length > 3 && <p className="px-1 text-xs font-semibold text-slate-500 dark:text-slate-400">Y {visibles.length - 3} trabajo{visibles.length - 3 === 1 ? '' : 's'} más.</p>}</div>}
                  </div>
                </article>
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
}

function Resumen({ etiqueta, valor, detalle, tono, icono: Icono }: { etiqueta: string; valor: number; detalle: string; tono: 'emerald' | 'sky' | 'amber' | 'rose'; icono: typeof Users }) {
  const estilos = {
    emerald: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/25 dark:text-emerald-200',
    sky: 'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-900/70 dark:bg-sky-950/25 dark:text-sky-200',
    amber: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/25 dark:text-amber-200',
    rose: 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900/70 dark:bg-rose-950/25 dark:text-rose-200',
  }[tono];
  return <article className={`rounded-2xl border p-4 shadow-sm ${estilos}`}><Icono size={18} /><p className="mt-3 text-2xl font-bold">{valor}</p><p className="mt-1 text-sm font-bold">{etiqueta}</p><p className="mt-1 text-xs opacity-80">{detalle}</p></article>;
}

function Metrica({ etiqueta, valor }: { etiqueta: string; valor: number }) {
  return <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-center dark:border-slate-700 dark:bg-slate-900"><p className="text-lg font-bold text-slate-900 dark:text-white">{valor}</p><p className="mt-0.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">{etiqueta}</p></div>;
}

function Trabajo({ trabajo, organizacionId }: { trabajo: ActividadMiembro; organizacionId: number }) {
  const vencido = estaVencido(trabajo);
  const estado = ESTADOS[trabajo.estado];
  return <div className={`rounded-xl border p-3 ${vencido ? 'border-rose-200 bg-rose-50/60 dark:border-rose-900/60 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-700'}`}><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{trabajo.titulo}</p><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{RECURSOS[trabajo.recursoTipo] ?? trabajo.recursoTipo} · Finaliza: {formatDate(trabajo.fechaEstimadaFin)}</p></div><div className="flex shrink-0 items-center gap-2"><EvidenceAction organizacionId={organizacionId} origen="ACTIVIDADES" tipoRecurso="ACTIVIDAD" recursoId={trabajo.id} titulo={`Evidencia de ${trabajo.titulo}`} compacto /><span className={`rounded-full px-2 py-1 text-[11px] font-bold ${estado.clase}`}>{estado.etiqueta}</span></div></div><div className="mt-2 flex items-center justify-between text-xs"><span className={vencido ? 'font-bold text-rose-700 dark:text-rose-300' : 'text-slate-500 dark:text-slate-400'}>{vencido ? 'Vencido: requiere seguimiento' : `Prioridad ${PRIORIDADES[trabajo.prioridad]}`}</span>{trabajo.estado === 'EN_PROGRESO' && <span className="inline-flex items-center gap-1 font-semibold text-sky-700 dark:text-sky-300"><PlayCircle size={13} />En marcha</span>}</div></div>;
}
