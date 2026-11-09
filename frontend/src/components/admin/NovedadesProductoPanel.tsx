import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BellRing, CheckCircle2, Edit3, FileText, Mail, Plus, Send, Sparkles, X } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  novedadesApi,
  type CategoriaNovedadProducto,
  type NovedadProductoAdmin,
  type NovedadProductoInput,
} from '../../api/novedades.api';
import { NovedadesCorreoModal } from './NovedadesCorreoModal';

const categorias: Array<{ valor: CategoriaNovedadProducto; etiqueta: string }> = [
  { valor: 'GENERAL', etiqueta: 'General' },
  { valor: 'FUNCIONALIDAD', etiqueta: 'Nueva función' },
  { valor: 'ACTUALIZACION', etiqueta: 'Actualización' },
  { valor: 'ARREGLOS', etiqueta: 'Arreglos' },
  { valor: 'PROMOCION', etiqueta: 'Promoción' },
];

const etiquetaCategoria = (categoria: CategoriaNovedadProducto) =>
  categorias.find((item) => item.valor === categoria)?.etiqueta ?? 'General';

const formularioInicial: NovedadProductoInput = {
  titulo: '',
  resumen: '',
  contenido: '',
  categoria: 'FUNCIONALIDAD',
  version: '',
  destacada: false,
};

function fecha(valor: string | null) {
  return valor ? new Date(valor).toLocaleDateString('es-AR') : 'Sin publicar';
}

export function NovedadesProductoPanel() {
  const queryClient = useQueryClient();
  const [formulario, setFormulario] = useState<NovedadProductoInput>(formularioInicial);
  const [edicionId, setEdicionId] = useState<string | null>(null);
  const [novedadCorreo, setNovedadCorreo] = useState<NovedadProductoAdmin | null>(null);
  const novedades = useQuery({ queryKey: ['admin', 'novedades'], queryFn: novedadesApi.listarParaAdmin });
  const refrescar = () => queryClient.invalidateQueries({ queryKey: ['admin', 'novedades'] });

  const crear = useMutation({
    mutationFn: novedadesApi.crear,
    onSuccess: () => {
      toast.success('Borrador creado.');
      setFormulario(formularioInicial);
      refrescar();
    },
    onError: () => toast.error('No se pudo crear el borrador.'),
  });
  const actualizar = useMutation({
    mutationFn: ({ id, datos }: { id: string; datos: NovedadProductoInput }) => novedadesApi.actualizar(id, datos),
    onSuccess: () => {
      toast.success('Novedad actualizada.');
      setFormulario(formularioInicial);
      setEdicionId(null);
      refrescar();
    },
    onError: () => toast.error('No se pudieron guardar los cambios.'),
  });
  const publicar = useMutation({
    mutationFn: novedadesApi.publicar,
    onSuccess: (resultado) => {
      toast.success(resultado.yaPublicada ? 'La novedad ya estaba publicada.' : `Novedad publicada. ${resultado.destinatariosNotificados} avisos creados.`);
      refrescar();
    },
    onError: () => toast.error('No se pudo publicar la novedad.'),
  });

  const editar = (novedad: NovedadProductoAdmin) => {
    setEdicionId(novedad.id);
    setFormulario({
      titulo: novedad.titulo,
      resumen: novedad.resumen,
      contenido: novedad.contenido,
      categoria: novedad.categoria,
      version: novedad.version ?? '',
      destacada: novedad.destacada,
    });
  };
  const cancelarEdicion = () => {
    setEdicionId(null);
    setFormulario(formularioInicial);
  };
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (edicionId) actualizar.mutate({ id: edicionId, datos: formulario });
    else crear.mutate(formulario);
  };
  const confirmarPublicacion = (novedad: NovedadProductoAdmin) => {
    if (window.confirm(`¿Publicar “${novedad.titulo}”? Se mostrará a todos los usuarios y se avisará por notificación a quienes aceptaron comunicaciones.`)) publicar.mutate(novedad.id);
  };
  const guardando = crear.isPending || actualizar.isPending;

  return (
    <section className="rounded-2xl border border-sky-200 bg-white p-5 shadow-sm dark:border-sky-900/70 dark:bg-slate-900">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex gap-3"><span className="rounded-xl bg-sky-600 p-2.5 text-white"><Sparkles size={20} /></span><div><h2 className="font-bold text-slate-900 dark:text-white">Novedades de producto</h2><p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">Prepará y publicá mejoras de AgroManager AR. La publicación queda visible para todos; el aviso interno y push se envía solo a quienes aceptaron comunicaciones.</p></div></div>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-sky-50 px-3 py-2 text-xs font-bold text-sky-800 dark:bg-sky-950/50 dark:text-sky-200"><BellRing size={15} />{novedades.data?.filter((novedad) => novedad.estado === 'PUBLICADA').length ?? 0} publicadas</span>
      </div>

      <form onSubmit={submit} className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-800/60">
        <div className="flex items-center justify-between gap-3"><h3 className="text-sm font-bold text-slate-900 dark:text-white">{edicionId ? 'Editar novedad' : 'Nuevo borrador'}</h3>{edicionId && <button type="button" onClick={cancelarEdicion} className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"><X size={15} />Cancelar edición</button>}</div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_180px_120px]">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">Título<input required maxLength={140} value={formulario.titulo} onChange={(event) => setFormulario((actual) => ({ ...actual, titulo: event.target.value }))} placeholder="Ej.: Nuevo módulo de clima" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:ring-sky-950" /></label>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">Categoría<select value={formulario.categoria} onChange={(event) => setFormulario((actual) => ({ ...actual, categoria: event.target.value as CategoriaNovedadProducto }))} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:ring-sky-950">{categorias.map((categoria) => <option key={categoria.valor} value={categoria.valor}>{categoria.etiqueta}</option>)}</select></label>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">Versión<input maxLength={40} value={formulario.version} onChange={(event) => setFormulario((actual) => ({ ...actual, version: event.target.value }))} placeholder="1.0" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:ring-sky-950" /></label>
        </div>
        <label className="mt-3 block text-xs font-semibold text-slate-700 dark:text-slate-200">Resumen<input required maxLength={320} value={formulario.resumen} onChange={(event) => setFormulario((actual) => ({ ...actual, resumen: event.target.value }))} placeholder="Contá en una frase clara qué cambia y por qué importa." className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:ring-sky-950" /></label>
        <label className="mt-3 block text-xs font-semibold text-slate-700 dark:text-slate-200">Detalle<textarea required maxLength={12000} rows={5} value={formulario.contenido} onChange={(event) => setFormulario((actual) => ({ ...actual, contenido: event.target.value }))} placeholder="Explicá cómo usar la mejora, qué información brinda y cualquier paso importante." className="mt-1.5 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm leading-6 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:ring-sky-950" /></label>
        <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><input type="checkbox" checked={formulario.destacada} onChange={(event) => setFormulario((actual) => ({ ...actual, destacada: event.target.checked }))} className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />Mostrar primero como novedad destacada</label>
        <div className="mt-4 flex flex-wrap gap-3"><button type="submit" disabled={guardando} className="inline-flex items-center gap-2 rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-800 disabled:opacity-60">{edicionId ? <Edit3 size={16} /> : <Plus size={16} />}{guardando ? 'Guardando...' : edicionId ? 'Guardar cambios' : 'Crear borrador'}</button>{edicionId && <button type="button" onClick={cancelarEdicion} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-white dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800">Cancelar</button>}</div>
      </form>

      <div className="mt-5 space-y-3">
        {novedades.isLoading ? <p className="py-4 text-sm text-slate-500 dark:text-slate-400">Cargando novedades...</p> : novedades.isError ? <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950/30 dark:text-rose-200">No se pudieron cargar las novedades.</p> : novedades.data?.length ? novedades.data.map((novedad) => (
          <article key={novedad.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
            <div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold text-slate-900 dark:text-white">{novedad.titulo}</h3><span className={`rounded-full px-2 py-0.5 text-xs font-bold ${novedad.estado === 'PUBLICADA' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200'}`}>{novedad.estado === 'PUBLICADA' ? 'Publicada' : 'Borrador'}</span>{novedad.destacada && <span className="text-xs font-bold text-sky-700 dark:text-sky-300">Destacada</span>}</div><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{novedad.resumen}</p><p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{etiquetaCategoria(novedad.categoria)} · {fecha(novedad.publicadaEn)} · {novedad._count.lecturas} lecturas</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => editar(novedad)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"><Edit3 size={14} />Editar</button>{novedad.estado === 'PUBLICADA' && <button type="button" onClick={() => setNovedadCorreo(novedad)} className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-bold text-sky-800 transition hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-950/30 dark:text-sky-100"><Mail size={14} />Correo</button>}{novedad.estado === 'BORRADOR' && <button type="button" onClick={() => confirmarPublicacion(novedad)} disabled={publicar.isPending} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-800 disabled:opacity-60"><Send size={14} />Publicar</button>}</div></div>
            {novedad.estado === 'PUBLICADA' && <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300"><CheckCircle2 size={14} />{novedad.notificadaEn ? 'Aviso de publicación procesado.' : 'Publicada sin aviso procesado.'}</p>}
          </article>
        )) : <div className="rounded-xl border border-dashed border-slate-300 p-5 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400"><FileText className="mx-auto mb-2" size={22} />Todavía no creaste novedades.</div>}
      </div>
      {novedadCorreo && <NovedadesCorreoModal novedad={novedadCorreo} onClose={() => setNovedadCorreo(null)} />}
    </section>
  );
}
