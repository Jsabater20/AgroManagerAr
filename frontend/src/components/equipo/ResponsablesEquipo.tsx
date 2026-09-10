import { useQuery } from '@tanstack/react-query';
import { UsersRound, UserRoundCheck } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  organizacionesApi,
  type ResponsableEquipo,
} from '../../api/organizaciones.api';

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
}: {
  organizacionId: number;
  modulo: string;
  recursoTipo?: string;
  recursoId?: number;
  campoId?: number;
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

  if (query.isLoading || !directos.length) return null;

  return (
    <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-300">
      <UserRoundCheck size={14} className="shrink-0 text-emerald-600 dark:text-emerald-300" />
      <span className="truncate"><span className="font-semibold">A cargo:</span> {directos.map(nombreCompleto).join(' · ')}</span>
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
