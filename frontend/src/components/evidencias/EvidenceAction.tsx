import { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Camera, ImagePlus, Loader2, Trash2, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {
  eliminarEvidencia,
  listarEvidencias,
  subirEvidencia,
  type OrigenEvidencia,
  type TipoRecursoEvidencia,
} from '../../api/evidencias.api';
import { useAuthStore } from '../../store/auth.store';

type ArchivoSeleccionado = { file: File; previewUrl: string };

type EvidenceActionProps = {
  organizacionId: number;
  origen: OrigenEvidencia;
  tipoRecurso: TipoRecursoEvidencia;
  recursoId: number;
  titulo?: string;
  compacto?: boolean;
};

export function EvidenceAction({
  organizacionId,
  origen,
  tipoRecurso,
  recursoId,
  titulo = 'Evidencia fotográfica',
  compacto = false,
}: EvidenceActionProps) {
  const [abierto, setAbierto] = useState(false);
  const organizacion = useAuthStore((state) =>
    state.usuario?.organizaciones?.find((item) => item.id === organizacionId),
  );

  if (!organizacionId || !recursoId) return null;

  if (organizacion?.plan !== 'PRO') {
    return (
      <Link
        to="/precios"
        className={compacto
          ? 'inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-950/30'
          : 'inline-flex items-center gap-2 rounded-lg border border-amber-200 px-3 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-300 dark:hover:bg-amber-950/30'}
        title="Las evidencias fotográficas están disponibles en Pro"
      >
        <Camera size={compacto ? 14 : 16} />
        {compacto ? 'Fotos Pro' : 'Evidencias Pro'}
      </Link>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className={compacto
          ? 'inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-950/30'
          : 'inline-flex items-center gap-2 rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950/30'}
      >
        <Camera size={compacto ? 14 : 16} />
        {compacto ? 'Fotos' : 'Evidencias'}
      </button>
      {abierto && (
        <EvidenceDialog
          organizacionId={organizacionId}
          origen={origen}
          tipoRecurso={tipoRecurso}
          recursoId={recursoId}
          titulo={titulo}
          onClose={() => setAbierto(false)}
        />
      )}
    </>
  );
}

function EvidenceDialog({
  organizacionId,
  origen,
  tipoRecurso,
  recursoId,
  titulo,
  onClose,
}: EvidenceActionProps & { onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const usuario = useAuthStore((state) => state.usuario);
  const [comentario, setComentario] = useState('');
  const [archivos, setArchivos] = useState<ArchivoSeleccionado[]>([]);
  const [imagenAbierta, setImagenAbierta] = useState<string | null>(null);
  const queryKey = ['evidencias', organizacionId, tipoRecurso, recursoId];

  const evidenciasQuery = useQuery({
    queryKey,
    queryFn: () => listarEvidencias(organizacionId, tipoRecurso, recursoId),
  });

  const subirMutation = useMutation({
    mutationFn: () => subirEvidencia(organizacionId, {
      origen,
      tipoRecurso,
      recursoId,
      comentario,
      archivos: archivos.map((archivo) => archivo.file),
    }),
    onSuccess: () => {
      archivos.forEach((archivo) => URL.revokeObjectURL(archivo.previewUrl));
      setArchivos([]);
      setComentario('');
      queryClient.invalidateQueries({ queryKey });
      toast.success('Evidencia guardada correctamente.');
    },
    onError: (error: Error) => toast.error(error.message || 'No pudimos guardar la evidencia.'),
  });

  const eliminarMutation = useMutation({
    mutationFn: (evidenciaId: string) => eliminarEvidencia(organizacionId, evidenciaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success('Evidencia eliminada.');
    },
    onError: () => toast.error('No pudimos eliminar la evidencia.'),
  });

  const seleccionarArchivos = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nuevos = Array.from(event.target.files ?? []);
    event.target.value = '';
    const disponibles = 10 - archivos.length;
    if (!disponibles) {
      toast.error('Podés adjuntar hasta 10 imágenes.');
      return;
    }

    const validos = nuevos.slice(0, disponibles).filter((archivo) => {
      const valido = ['image/jpeg', 'image/png', 'image/webp'].includes(archivo.type) && archivo.size <= 10 * 1024 * 1024;
      if (!valido) toast.error(`${archivo.name}: usá JPG, PNG o WEBP de hasta 10 MB.`);
      return valido;
    });
    setArchivos((actuales) => [...actuales, ...validos.map((file) => ({ file, previewUrl: URL.createObjectURL(file) }))]);
  };

  const quitarArchivo = (indice: number) => {
    setArchivos((actuales) => {
      URL.revokeObjectURL(actuales[indice].previewUrl);
      return actuales.filter((_, currentIndex) => currentIndex !== indice);
    });
  };

  const puedeEliminar = (usuarioId: number) => {
    const orgActual = usuario?.organizaciones?.find((organizacion) => organizacion.id === organizacionId);
    return usuario?.id === usuarioId || orgActual?.propietarioId === usuario?.id || usuario?.rolGlobal === 'SUPERADMIN';
  };

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-black/65 p-4" onClick={onClose}>
      <div className="mx-auto my-8 w-full max-w-3xl rounded-2xl bg-white p-5 shadow-2xl dark:bg-gray-800" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{titulo}</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Adjuntá fotos y una observación para que el equipo pueda consultarlas.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Cerrar evidencias"><X size={18} /></button>
        </div>

        <div className="mt-5 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
          <label className="text-sm font-semibold text-gray-800 dark:text-gray-100">Nueva evidencia</label>
          <textarea value={comentario} onChange={(event) => setComentario(event.target.value)} maxLength={5000} rows={3} className="input mt-2 resize-none" placeholder="Comentario opcional: qué se realizó, estado observado o detalle importante..." />
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={seleccionarArchivos} />
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950/30"><ImagePlus size={16} />Elegir imágenes</button>
            <button type="button" disabled={!archivos.length || subirMutation.isPending} onClick={() => subirMutation.mutate()} className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"><Upload size={16} />{subirMutation.isPending ? 'Subiendo...' : 'Guardar evidencia'}</button>
          </div>

          {archivos.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {archivos.map((archivo, indice) => (
                <div key={archivo.previewUrl} className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                  <img src={archivo.previewUrl} alt={archivo.file.name} className="h-24 w-full object-cover" />
                  <button type="button" onClick={() => quitarArchivo(indice)} className="absolute right-1 top-1 rounded-full bg-black/65 p-1 text-white hover:bg-black" aria-label={`Quitar ${archivo.file.name}`}><X size={14} /></button>
                  <p className="truncate px-2 py-1.5 text-xs text-gray-500 dark:text-gray-400">{archivo.file.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <section className="mt-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">Evidencias guardadas</h3>
          {evidenciasQuery.isLoading ? <div className="flex justify-center py-8"><Loader2 className="animate-spin text-emerald-600" size={24} /></div>
            : evidenciasQuery.data?.length ? <div className="mt-3 space-y-3">{evidenciasQuery.data.map((evidencia) => (
              <article key={evidencia.id} className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-gray-900 dark:text-white">{[evidencia.usuario.nombre, evidencia.usuario.apellido].filter(Boolean).join(' ')}</p><p className="text-xs text-gray-500 dark:text-gray-400">{new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(evidencia.fechaHora))}</p></div>{puedeEliminar(evidencia.usuarioId) && <button type="button" onClick={() => eliminarMutation.mutate(evidencia.id)} disabled={eliminarMutation.isPending} className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-50 dark:text-red-300 dark:hover:bg-red-950/30" aria-label="Eliminar evidencia"><Trash2 size={16} /></button>}</div>
                {evidencia.comentario && <p className="mt-3 whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300">{evidencia.comentario}</p>}
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">{evidencia.archivos.map((archivo) => <button key={archivo.id} type="button" onClick={() => setImagenAbierta(archivo.url)} className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"><img src={archivo.url} alt={archivo.nombre} className="h-24 w-full object-cover transition-transform hover:scale-105" /></button>)}</div>
              </article>
            ))}</div> : <p className="mt-3 rounded-xl border border-dashed border-gray-200 px-4 py-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">Todavía no hay evidencias para este recurso.</p>}
        </section>
      </div>

      {imagenAbierta && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4" onClick={() => setImagenAbierta(null)}><img src={imagenAbierta} alt="Evidencia ampliada" className="max-h-[90vh] max-w-full rounded-xl object-contain" /></div>}
    </div>
  );
}
