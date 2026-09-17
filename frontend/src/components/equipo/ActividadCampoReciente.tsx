import { useQuery } from '@tanstack/react-query';
import { History, UserRoundCheck } from 'lucide-react';
import { api } from '../../api/client';

interface RegistroAuditoria {
  id: number;
  accion: string;
  createdAt: string;
  usuario: { nombre: string; apellido: string; email: string };
}

interface RespuestaAuditoria {
  registros: RegistroAuditoria[];
}

const ETIQUETAS_ACCION: Record<string, string> = {
  crear_campo: 'Creó el campo',
  modificar_campo: 'Actualizó los datos del campo',
  eliminar_campo: 'Eliminó el campo',
};

export function ActividadCampoReciente({ organizacionId, campoId }: { organizacionId: number; campoId: number }) {
  const query = useQuery({
    queryKey: ['auditoria-campo', organizacionId, campoId],
    queryFn: () => api.get<RespuestaAuditoria>(`/auditoria/organizaciones/${organizacionId}`, {
      params: { entidad: 'Campo', entidadId: campoId, limite: 5 },
    }).then((response) => response.data),
    enabled: organizacionId > 0 && campoId > 0,
  });

  const registros = query.data?.registros ?? [];
  if (query.isLoading || !registros.length) return null;

  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-sky-100 p-2.5 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300"><History size={18} /></span>
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white">Últimos cambios</h2>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">Registro de acciones realizadas sobre este campo.</p>
        </div>
      </div>
      <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
        {registros.map((registro) => (
          <div key={registro.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
            <div className="flex min-w-0 items-center gap-2.5">
              <UserRoundCheck size={16} className="shrink-0 text-sky-600 dark:text-sky-300" />
              <p className="min-w-0 text-sm text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-white">{registro.usuario.nombre} {registro.usuario.apellido}</span>{' '}
                {ETIQUETAS_ACCION[registro.accion] ?? registro.accion.replaceAll('_', ' ')}
              </p>
            </div>
            <time className="shrink-0 text-xs text-slate-500 dark:text-slate-400" dateTime={registro.createdAt}>
              {new Intl.DateTimeFormat('es-AR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(registro.createdAt))}
            </time>
          </div>
        ))}
      </div>
    </section>
  );
}
