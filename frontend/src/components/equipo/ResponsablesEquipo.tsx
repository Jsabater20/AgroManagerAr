import { useQuery } from '@tanstack/react-query';
import { UsersRound, UserRoundCheck } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  organizacionesApi,
  type ResponsableEquipo,
} from '../../api/organizaciones.api';
import { nombreCargo } from '../../constants/cargosEquipo';

const SECCIONES = [
  { patron: /\/campos(?:\/|$)/, modulo: 'Campos', etiqueta: 'Campos y lotes' },
  { patron: /\/cultivos(?:\/|$)/, modulo: 'Cultivos', etiqueta: 'Cultivos' },
  { patron: /\/siembras(?:\/|$)/, modulo: 'Siembras', etiqueta: 'Siembras' },
  { patron: /\/insumos(?:\/|$)/, modulo: 'Insumos', etiqueta: 'Insumos' },
  { patron: /\/ganado(?:\/|$)/, modulo: 'Ganadería', etiqueta: 'Ganadería' },
  { patron: /\/(tambo|avicola)(?:\/|$)/, modulo: 'Ganadería', etiqueta: 'Producción animal' },
  { patron: /\/frutihorticultura(?:\/|$)/, modulo: 'Cultivos', etiqueta: 'Frutihorticultura' },
  { patron: /\/yerba(?:\/|$)/, modulo: 'Cultivos', etiqueta: 'Yerba mate' },
  { patron: /\/tareas(?:\/|$)/, modulo: 'Tareas', etiqueta: 'Tareas' },
  { patron: /\/maquinarias(?:\/|$)/, modulo: 'Maquinarias', etiqueta: 'Maquinarias' },
  { patron: /\/finanzas(?:\/|$)/, modulo: 'Finanzas', etiqueta: 'Finanzas' },
  { patron: /\/reportes(?:\/|$)/, modulo: 'Reportes', etiqueta: 'Reportes' },
  { patron: /\/clima(?:\/|$)/, modulo: 'Clima', etiqueta: 'Clima' },
  { patron: /\/calculos(?:\/|$)/, modulo: 'Cálculos', etiqueta: 'Cálculos' },
] as const;

export default function ResponsablesEquipo() {
  const { orgId } = useParams<{ orgId: string }>();
  const location = useLocation();
  const organizacionId = Number(orgId);
  const seccion = SECCIONES.find((item) => item.patron.test(location.pathname));
  const query = useQuery({
    queryKey: ['equipo-responsables', organizacionId, seccion?.modulo],
    queryFn: () => organizacionesApi.obtenerResponsablesEquipo(organizacionId, seccion!.modulo),
    enabled: Boolean(seccion && organizacionId > 0),
  });

  if (!seccion || query.isLoading || query.isError) return null;

  const miembros = query.data?.miembrosModulo ?? [];
  return (
    <section className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3.5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
      <div className="flex min-w-0 items-center gap-3">
        <span className="rounded-xl bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"><UsersRound size={18} /></span>
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">Equipo habilitado en {seccion.etiqueta}</p>
          <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
            {miembros.length
              ? miembros.slice(0, 3).map(nombreCompleto).join(' · ') + (miembros.length > 3 ? ` y ${miembros.length - 3} más` : '')
              : 'Todavía no hay miembros con acceso a esta sección.'}
          </p>
        </div>
      </div>
      <Link to={`/org/${organizacionId}/miembros/administracion`} className="text-xs font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">
        Administrar accesos →
      </Link>
    </section>
  );
}

export function ResponsablesRecurso({
  organizacionId,
  modulo,
  recursoTipo,
  recursoId,
  campoId,
  detalle = false,
  nombreRecurso,
}: {
  organizacionId: number;
  modulo: string;
  recursoTipo?: string;
  recursoId?: number;
  campoId?: number;
  detalle?: boolean;
  nombreRecurso?: string;
}) {
  const query = useQuery({
    queryKey: ['equipo-responsables', organizacionId, modulo],
    queryFn: () => organizacionesApi.obtenerResponsablesEquipo(organizacionId, modulo),
    enabled: organizacionId > 0,
  });
  const directos = unirResponsables(
    recursoTipo && recursoId ? query.data?.porRecurso[`${recursoTipo}:${recursoId}`] : [],
    campoId ? query.data?.porCampo[String(campoId)] : [],
  );

  if (query.isLoading || (!directos.length && !detalle)) return null;

  if (detalle) {
    const encargados = directos.filter((miembro) => miembro.puedeGestionarEquipo);
    const equipo = directos.filter((miembro) => !miembro.puedeGestionarEquipo);

    return (
      <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-emerald-100 p-2.5 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"><UsersRound size={19} /></span>
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">Equipo de {nombreRecurso ?? 'este recurso'}</h2>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                {directos.length
                  ? `${directos.length} persona${directos.length === 1 ? '' : 's'} con acceso asignado.`
                  : 'Todavía no hay personas asignadas a este recurso.'}
              </p>
            </div>
          </div>
          <Link to={`/org/${organizacionId}/miembros/administracion`} className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-50 dark:border-emerald-500/25 dark:bg-slate-900 dark:text-emerald-300 dark:hover:bg-emerald-500/10">
            Gestionar equipo
          </Link>
        </div>

        {directos.length > 0 && (
          <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Encargado{encargados.length !== 1 ? 's' : ''} del campo</p>
              {encargados.length ? (
                <div className="space-y-2">{encargados.map((miembro) => <PersonaEquipo key={miembro.usuarioOrganizacionId} miembro={miembro} encargado />)}</div>
              ) : (
                <p className="rounded-xl border border-dashed border-slate-200 px-3 py-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">No hay un encargado definido. Asignalo desde Miembros para ordenar el equipo.</p>
              )}
            </div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Personas que trabajan en este campo</p>
              {equipo.length ? (
                <div className="grid gap-2 sm:grid-cols-2">{equipo.map((miembro) => <PersonaEquipo key={miembro.usuarioOrganizacionId} miembro={miembro} />)}</div>
              ) : (
                <p className="rounded-xl border border-dashed border-slate-200 px-3 py-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">Todavía no hay integrantes operativos asignados.</p>
              )}
            </div>
          </div>
        )}
      </section>
    );
  }

  return (
    <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-300">
      <UserRoundCheck size={14} className="shrink-0 text-emerald-600 dark:text-emerald-300" />
      <span className="truncate"><span className="font-semibold">A cargo:</span> {directos.map(nombreCompleto).join(' · ')}</span>
    </div>
  );
}

function PersonaEquipo({ miembro, encargado = false }: { miembro: ResponsableEquipo; encargado?: boolean }) {
  const iniciales = `${miembro.nombre[0] ?? ''}${miembro.apellido[0] ?? ''}`.toUpperCase();
  const responsable = miembro.responsable ? `${miembro.responsable.nombre} ${miembro.responsable.apellido}` : null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-800/70">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${encargado ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100'}`}>{iniciales}</span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{miembro.nombre} {miembro.apellido}</p>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">{nombreCargo(miembro.cargo, miembro.cargoPersonalizado)}</p>
        </div>
      </div>
      <div className="mt-2 border-t border-slate-100 pt-2 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
        {encargado ? <span className="font-semibold text-emerald-700 dark:text-emerald-300">Coordina el equipo de este campo</span> : responsable ? <>Reporta a <span className="font-semibold text-slate-700 dark:text-slate-200">{responsable}</span></> : 'Sin responsable asignado'}
      </div>
    </div>
  );
}

function unirResponsables(...listas: Array<ResponsableEquipo[] | undefined>) {
  const vistos = new Map<number, ResponsableEquipo>();
  listas.flat().forEach((miembro) => {
    if (miembro) vistos.set(miembro.usuarioOrganizacionId, miembro);
  });
  return [...vistos.values()];
}

function nombreCompleto(miembro: ResponsableEquipo) {
  return `${miembro.nombre} ${miembro.apellido}`.trim();
}
