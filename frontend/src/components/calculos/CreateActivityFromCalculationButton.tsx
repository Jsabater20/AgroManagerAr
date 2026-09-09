import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CalendarDays, ClipboardPlus, Loader2, UsersRound, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { createActividadDesdeCalculo } from '../../api/actividades.api';
import { organizacionesApi } from '../../api/organizaciones.api';

interface CreateActivityFromCalculationButtonProps {
  organizacionId: number;
  recursoTipo: 'CAMPO' | 'LOTE' | 'GENERAL';
  recursoId?: number;
  recursoNombre?: string;
  tituloInicial: string;
  descripcionCalculo: string;
}

export function CreateActivityFromCalculationButton({
  organizacionId,
  recursoTipo,
  recursoId,
  recursoNombre,
  tituloInicial,
  descripcionCalculo,
}: CreateActivityFromCalculationButtonProps) {
  const queryClient = useQueryClient();
  const [abierto, setAbierto] = useState(false);
  const [usuarioOrganizacionId, setUsuarioOrganizacionId] = useState('');
  const [titulo, setTitulo] = useState(tituloInicial);
  const [prioridad, setPrioridad] = useState('MEDIA');
  const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().slice(0, 10));
  const [fechaEstimadaFin, setFechaEstimadaFin] = useState('');
  const [indicaciones, setIndicaciones] = useState('');
  const miembrosQuery = useQuery({
    queryKey: ['miembros', organizacionId, 'actividad-desde-calculo'],
    queryFn: () => organizacionesApi.obtenerMiembros(organizacionId),
    enabled: abierto && organizacionId > 0,
  });
  const miembrosActivos = (miembrosQuery.data ?? []).filter((miembro) => miembro.activo);

  useEffect(() => {
    if (!usuarioOrganizacionId && miembrosActivos[0]) {
      setUsuarioOrganizacionId(String(miembrosActivos[0].id));
    }
  }, [miembrosActivos, usuarioOrganizacionId]);

  const crearMutation = useMutation({
    mutationFn: () => createActividadDesdeCalculo(organizacionId, {
      titulo: titulo.trim(),
      descripcion: [descripcionCalculo, indicaciones.trim() ? `Indicaciones: ${indicaciones.trim()}` : ''].filter(Boolean).join('\n\n'),
      usuarioOrganizacionId: Number(usuarioOrganizacionId),
      recursoTipo,
      recursoId,
      fechaInicio,
      fechaEstimadaFin: fechaEstimadaFin || undefined,
      prioridad,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actividades'] });
      toast.success('Trabajo creado y asignado correctamente.');
      setAbierto(false);
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || 'No se pudo crear el trabajo.'),
  });

  const puedeCrear = titulo.trim().length >= 3 && Number(usuarioOrganizacionId) > 0 && Boolean(fechaInicio);

  return <><button type="button" onClick={() => setAbierto(true)} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-500"><ClipboardPlus size={16} /> Crear trabajo desde este cálculo</button>{abierto && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4" role="dialog" aria-modal="true" aria-label="Crear trabajo desde cálculo"><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-gray-800"><div className="flex items-start justify-between border-b border-gray-200 p-5 dark:border-gray-700"><div><div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-300"><ClipboardPlus size={17} /> Desde un cálculo</div><h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">Asignar trabajo</h2><p className="mt-1 text-sm text-gray-600 dark:text-gray-300">El resultado calculado se incluirá como referencia para la persona asignada.</p></div><button type="button" onClick={() => setAbierto(false)} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700" aria-label="Cerrar"><X size={19} /></button></div><div className="space-y-4 p-5"><div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-950 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100"><strong>Recurso:</strong> {recursoNombre || 'Trabajo general'}<br /><span className="text-emerald-800 dark:text-emerald-200">{descripcionCalculo}</span></div><Field label="¿Qué tiene que hacer?"><input value={titulo} onChange={(event) => setTitulo(event.target.value)} className="input" /></Field><Field label="Asignar a"><div className="relative">{miembrosQuery.isLoading ? <p className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><Loader2 size={16} className="animate-spin" /> Cargando miembros...</p> : miembrosActivos.length ? <><UsersRound size={16} className="pointer-events-none absolute left-3 top-3.5 text-gray-400" /><select value={usuarioOrganizacionId} onChange={(event) => setUsuarioOrganizacionId(event.target.value)} className="input pl-10">{miembrosActivos.map((miembro) => <option key={miembro.id} value={miembro.id}>{miembro.usuario.nombre} {miembro.usuario.apellido}</option>)}</select></> : <p className="text-sm text-rose-700 dark:text-rose-300">Necesitás al menos un miembro activo para asignar el trabajo.</p>}</div></Field><div className="grid gap-4 sm:grid-cols-3"><Field label="Prioridad"><select value={prioridad} onChange={(event) => setPrioridad(event.target.value)} className="input"><option value="BAJA">Baja</option><option value="MEDIA">Media</option><option value="ALTA">Alta</option><option value="URGENTE">Urgente</option></select></Field><Field label="Fecha de inicio"><div className="relative"><CalendarDays size={16} className="pointer-events-none absolute left-3 top-3.5 text-gray-400" /><input type="date" value={fechaInicio} onChange={(event) => setFechaInicio(event.target.value)} className="input pl-10" /></div></Field><Field label="Finalización estimada (opcional)"><input type="date" value={fechaEstimadaFin} min={fechaInicio} onChange={(event) => setFechaEstimadaFin(event.target.value)} className="input" /></Field></div><Field label="Indicaciones para la persona (opcional)"><textarea value={indicaciones} onChange={(event) => setIndicaciones(event.target.value)} rows={3} placeholder="Ej. Aplicar durante la mañana y avisar al terminar." className="input resize-y" /></Field></div><div className="flex flex-wrap justify-end gap-3 border-t border-gray-200 p-5 dark:border-gray-700"><button type="button" onClick={() => setAbierto(false)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Cancelar</button><button type="button" onClick={() => crearMutation.mutate()} disabled={!puedeCrear || crearMutation.isPending} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60">{crearMutation.isPending && <Loader2 size={16} className="animate-spin" />}Confirmar y asignar</button></div></div></div>}</>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200"><span className="mb-1.5 block">{label}</span>{children}</label>;
}
