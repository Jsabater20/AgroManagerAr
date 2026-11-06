import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { AlertTriangle, Mail, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { novedadesApi, type NovedadProductoAdmin } from '../../api/novedades.api';

export function NovedadesCorreoModal({
  novedad,
  onClose,
}: {
  novedad: NovedadProductoAdmin;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [emailPrueba, setEmailPrueba] = useState('');
  const vistaPrevia = useQuery({
    queryKey: ['admin', 'novedades', novedad.id, 'preview-email'],
    queryFn: () => novedadesApi.previsualizarCorreo(novedad.id),
  });
  const resumen = useQuery({
    queryKey: ['admin', 'novedades', novedad.id, 'resumen-email'],
    queryFn: () => novedadesApi.resumenEnvioCorreo(novedad.id),
  });
  const refrescar = () => {
    queryClient.invalidateQueries({ queryKey: ['admin', 'novedades', novedad.id, 'resumen-email'] });
    queryClient.invalidateQueries({ queryKey: ['admin', 'novedades'] });
  };
  const prueba = useMutation({
    mutationFn: (email?: string) => novedadesApi.enviarCorreoPrueba(novedad.id, email),
    onSuccess: ({ destinatario }) => toast.success(`Correo de prueba enviado a ${destinatario}.`),
    onError: () => toast.error('No se pudo enviar el correo de prueba.'),
  });
  const enviar = useMutation({
    mutationFn: () => novedadesApi.enviarCorreos(novedad.id),
    onSuccess: (resultado) => {
      toast.success(`Envío finalizado: ${resultado.enviados} enviados, ${resultado.omitidos} ya registrados y ${resultado.errores} con error.`);
      refrescar();
    },
    onError: () => toast.error('No se pudo iniciar el envío controlado.'),
  });
  const envioHabilitado = vistaPrevia.data?.envioHabilitado ?? resumen.data?.envioHabilitado ?? false;
  const confirmarEnvio = () => {
    const cantidad = resumen.data?.destinatariosElegibles ?? 0;
    if (window.confirm(`Se enviará esta novedad a hasta ${cantidad} personas con email verificado que aceptaron novedades. El proceso registra cada resultado y no reenvía los ya enviados. ¿Confirmás el envío?`)) enviar.mutate();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end bg-slate-950/60 p-0 backdrop-blur-sm md:items-center md:justify-center md:p-6" role="dialog" aria-modal="true" aria-label={`Correo de ${novedad.titulo}`}>
      <section className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl dark:bg-slate-900 md:rounded-3xl md:p-6">
        <div className="flex items-start justify-between gap-4"><div className="flex gap-3"><span className="rounded-xl bg-sky-100 p-2.5 text-sky-700 dark:bg-sky-950/60 dark:text-sky-200"><Mail size={20} /></span><div><h2 className="font-bold text-slate-900 dark:text-white">Comunicación por email</h2><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{novedad.titulo}</p></div></div><button type="button" onClick={onClose} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Cerrar"><X size={19} /></button></div>

        {!envioHabilitado && <div className="mt-5 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-100"><AlertTriangle className="mt-0.5 shrink-0" size={18} /><p>Los correos masivos están deshabilitados por seguridad. Para habilitarlos de forma consciente, configurá <code className="font-bold">NOVEDADES_EMAILS_HABILITADOS=true</code> en el backend después de validar la campaña y Resend.</p></div>}

        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          <Metric etiqueta="Elegibles" valor={resumen.data?.destinatariosElegibles ?? vistaPrevia.data?.destinatariosElegibles ?? '—'} />
          <Metric etiqueta="Enviados" valor={resumen.data?.enviados ?? '—'} />
          <Metric etiqueta="Pendientes" valor={resumen.data?.pendientes ?? '—'} />
          <Metric etiqueta="Con error" valor={resumen.data?.errores ?? '—'} />
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">Vista previa · {vistaPrevia.data?.asunto ?? 'Cargando asunto...'}</div>
          {vistaPrevia.isLoading ? <p className="p-5 text-sm text-slate-500">Generando vista previa...</p> : vistaPrevia.isError ? <p className="p-5 text-sm text-rose-700 dark:text-rose-300">No se pudo generar la vista previa.</p> : <iframe title="Vista previa del correo" sandbox="" srcDoc={vistaPrevia.data?.html} className="h-[360px] w-full bg-white" />}
        </div>

        <label className="mt-5 block rounded-xl border border-sky-200 bg-sky-50/70 p-4 dark:border-sky-900/70 dark:bg-sky-950/25">
          <span className="block text-sm font-bold text-sky-950 dark:text-sky-100">Email para prueba</span>
          <span className="mt-1 block text-xs leading-5 text-sky-800 dark:text-sky-200">Ingresá un correo al que tengas acceso, por ejemplo tu Gmail. Si lo dejás vacío, se usa el email de tu cuenta.</span>
          <input
            type="email"
            value={emailPrueba}
            onChange={(event) => setEmailPrueba(event.target.value)}
            placeholder="tu-email@gmail.com"
            className="mt-3 w-full rounded-lg border border-sky-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-sky-800 dark:bg-slate-900 dark:text-white dark:focus:border-sky-400 dark:focus:ring-sky-900"
          />
        </label>

        <div className="mt-5 flex flex-wrap justify-end gap-3"><button type="button" onClick={onClose} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800">Cerrar</button><button type="button" onClick={() => prueba.mutate(emailPrueba.trim() || undefined)} disabled={!envioHabilitado || prueba.isPending} className="inline-flex items-center gap-2 rounded-xl border border-sky-300 bg-sky-50 px-4 py-2.5 text-sm font-bold text-sky-800 hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-sky-800 dark:bg-sky-950/30 dark:text-sky-100"><Mail size={16} />{prueba.isPending ? 'Enviando prueba...' : 'Enviar prueba'}</button><button type="button" onClick={confirmarEnvio} disabled={!envioHabilitado || enviar.isPending || !resumen.data?.destinatariosElegibles} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"><Send size={16} />{enviar.isPending ? 'Enviando...' : 'Confirmar envío controlado'}</button></div>
      </section>
    </div>
  );
}

function Metric({ etiqueta, valor }: { etiqueta: string; valor: string | number }) {
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{etiqueta}</p><p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{valor}</p></div>;
}
