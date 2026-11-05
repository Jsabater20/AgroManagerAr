import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  AlertTriangle,
  CheckCircle2,
  Droplets,
  Edit3,
  Loader2,
  MapPinned,
  Route,
  Save,
  ShieldAlert,
  Warehouse,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  camposApi,
  type NivelRiesgoHidrico,
  type PerfilRiesgoHidricoCampo as PerfilRiesgoHidrico,
} from '../../api/campos.api';

type FormularioRiesgo = {
  nivel: NivelRiesgoHidrico;
  zonasBajas: string;
  drenajes: string;
  caminosYAccesos: string;
  infraestructuraCritica: string;
  sectoresSeguros: string;
  observaciones: string;
};

const etiquetasNivel: Record<NivelRiesgoHidrico, string> = {
  BAJO: 'Bajo',
  MEDIO: 'Medio',
  ALTO: 'Alto',
};

const estilosNivel: Record<NivelRiesgoHidrico, string> = {
  BAJO: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200',
  MEDIO: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-200',
  ALTO: 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-200',
};

const formularioDesdePerfil = (perfil?: PerfilRiesgoHidrico): FormularioRiesgo => ({
  nivel: perfil?.nivel ?? 'MEDIO',
  zonasBajas: perfil?.zonasBajas ?? '',
  drenajes: perfil?.drenajes ?? '',
  caminosYAccesos: perfil?.caminosYAccesos ?? '',
  infraestructuraCritica: perfil?.infraestructuraCritica ?? '',
  sectoresSeguros: perfil?.sectoresSeguros ?? '',
  observaciones: perfil?.observaciones ?? '',
});

const fechaHora = (valor: string | null) => valor
  ? new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(valor))
  : null;

export function PerfilRiesgoHidricoCampo({ campoId }: { campoId: number }) {
  const queryClient = useQueryClient();
  const [edicionAbierta, setEdicionAbierta] = useState(false);
  const [formulario, setFormulario] = useState<FormularioRiesgo>(formularioDesdePerfil());
  const perfilQuery = useQuery({
    queryKey: ['campos', campoId, 'riesgo-hidrico'],
    queryFn: () => camposApi.getPerfilRiesgoHidrico(campoId),
    enabled: campoId > 0,
  });

  useEffect(() => {
    if (perfilQuery.data) setFormulario(formularioDesdePerfil(perfilQuery.data));
  }, [perfilQuery.data]);

  const guardar = useMutation({
    mutationFn: () => camposApi.updatePerfilRiesgoHidrico(campoId, formulario),
    onSuccess: () => {
      toast.success('Perfil de riesgo hídrico actualizado.');
      setEdicionAbierta(false);
      queryClient.invalidateQueries({ queryKey: ['campos', campoId, 'riesgo-hidrico'] });
    },
    onError: (error: any) => {
      const mensaje = error?.response?.data?.message;
      toast.error(Array.isArray(mensaje) ? mensaje[0] : mensaje || 'No se pudo guardar el perfil de riesgo.');
    },
  });

  if (perfilQuery.isLoading) {
    return <div className="mb-8 h-52 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />;
  }
  if (perfilQuery.isError || !perfilQuery.data) return null;

  const perfil = perfilQuery.data;
  const abrirEdicion = () => {
    setFormulario(formularioDesdePerfil(perfil));
    setEdicionAbierta(true);
  };
  const cancelarEdicion = () => {
    setFormulario(formularioDesdePerfil(perfil));
    setEdicionAbierta(false);
  };

  return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-sm dark:border-sky-900/70 dark:bg-slate-900">
      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 via-white to-cyan-50 p-5 dark:border-sky-900/60 dark:from-sky-950/35 dark:via-slate-900 dark:to-cyan-950/20 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-3">
            <span className="rounded-xl bg-sky-700 p-2.5 text-white shadow-sm"><ShieldAlert size={20} /></span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-bold text-slate-900 dark:text-white">Preparación ante excesos hídricos</h2>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200">Incluido en Free</span>
                {perfil.configurado
                  ? <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${estilosNivel[perfil.nivel]}`}>Riesgo {etiquetasNivel[perfil.nivel]}</span>
                  : <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">Sin configurar</span>}
              </div>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">Dejá registradas las zonas y recursos clave para actuar antes de lluvias intensas o anegamientos.</p>
            </div>
          </div>
          {perfil.puedeEditar && !edicionAbierta && <button type="button" onClick={abrirEdicion} className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-800"><Edit3 size={16} />{perfil.configurado ? 'Actualizar perfil' : 'Configurar perfil'}</button>}
        </div>
      </div>

      {edicionAbierta ? (
        <form onSubmit={(event) => { event.preventDefault(); guardar.mutate(); }} className="space-y-4 p-5 sm:p-6">
          <div className="grid gap-4 md:grid-cols-[220px_1fr]">
            <Field label="Nivel de riesgo del campo *">
              <select value={formulario.nivel} onChange={(event) => setFormulario((actual) => ({ ...actual, nivel: event.target.value as NivelRiesgoHidrico }))} className="input">
                <option value="BAJO">Bajo: el campo suele drenar bien</option>
                <option value="MEDIO">Medio: requiere seguimiento preventivo</option>
                <option value="ALTO">Alto: puede anegarse o perder accesos</option>
              </select>
            </Field>
            <p className="rounded-xl border border-sky-100 bg-sky-50 p-3 text-sm text-sky-900 dark:border-sky-900/70 dark:bg-sky-950/25 dark:text-sky-100"><strong>Importante:</strong> este perfil organiza información del establecimiento; no reemplaza los avisos oficiales ni la evaluación en el lugar.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Zonas bajas o que se anegan"><textarea value={formulario.zonasBajas} onChange={(event) => setFormulario((actual) => ({ ...actual, zonasBajas: event.target.value }))} maxLength={2000} rows={3} className="input resize-y" placeholder="Ej.: Bajo del lote norte, junto al arroyo." /></Field>
            <Field label="Drenajes, zanjas y alcantarillas"><textarea value={formulario.drenajes} onChange={(event) => setFormulario((actual) => ({ ...actual, drenajes: event.target.value }))} maxLength={2000} rows={3} className="input resize-y" placeholder="Ej.: Limpiar cuneta oeste y revisar alcantarilla de acceso." /></Field>
            <Field label="Caminos y accesos críticos"><textarea value={formulario.caminosYAccesos} onChange={(event) => setFormulario((actual) => ({ ...actual, caminosYAccesos: event.target.value }))} maxLength={2000} rows={3} className="input resize-y" placeholder="Ej.: Camino al casco se vuelve intransitable con lluvia fuerte." /></Field>
            <Field label="Infraestructura a proteger"><textarea value={formulario.infraestructuraCritica} onChange={(event) => setFormulario((actual) => ({ ...actual, infraestructuraCritica: event.target.value }))} maxLength={2000} rows={3} className="input resize-y" placeholder="Ej.: Galpón de insumos, silo bolsa, bomba y tablero eléctrico." /></Field>
            <Field label="Sectores seguros o altos"><textarea value={formulario.sectoresSeguros} onChange={(event) => setFormulario((actual) => ({ ...actual, sectoresSeguros: event.target.value }))} maxLength={2000} rows={3} className="input resize-y" placeholder="Ej.: Potrero alto junto al monte, apto para resguardar hacienda." /></Field>
            <Field label="Observaciones"><textarea value={formulario.observaciones} onChange={(event) => setFormulario((actual) => ({ ...actual, observaciones: event.target.value }))} maxLength={3000} rows={3} className="input resize-y" placeholder="Medidas, contactos o consideraciones importantes." /></Field>
          </div>
          <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
            <button type="button" disabled={guardar.isPending} onClick={cancelarEdicion} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"><X size={16} />Cancelar</button>
            <button type="submit" disabled={guardar.isPending} className="inline-flex items-center gap-2 rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-800 disabled:opacity-60">{guardar.isPending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}Guardar perfil</button>
          </div>
        </form>
      ) : perfil.configurado ? (
        <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
          <Detail icon={MapPinned} label="Zonas bajas" value={perfil.zonasBajas} />
          <Detail icon={Droplets} label="Drenajes y escurrimiento" value={perfil.drenajes} />
          <Detail icon={Route} label="Caminos y accesos" value={perfil.caminosYAccesos} />
          <Detail icon={Warehouse} label="Infraestructura crítica" value={perfil.infraestructuraCritica} />
          <Detail icon={CheckCircle2} label="Sectores seguros" value={perfil.sectoresSeguros} />
          <Detail icon={AlertTriangle} label="Observaciones" value={perfil.observaciones} />
          {perfil.updatedAt && <p className="sm:col-span-2 pt-1 text-xs text-slate-500 dark:text-slate-400">Actualizado {fechaHora(perfil.updatedAt)}{perfil.actualizadoPor ? ` por ${perfil.actualizadoPor.nombre} ${perfil.actualizadoPor.apellido}` : ''}.</p>}
        </div>
      ) : (
        <div className="p-6 text-center sm:p-8">
          <AlertTriangle className="mx-auto h-9 w-9 text-sky-500" />
          <h3 className="mt-3 font-bold text-slate-900 dark:text-white">Todavía no evaluaste este campo</h3>
          <p className="mx-auto mt-1 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">Registrá por dónde escurre el agua, qué accesos pueden cortarse y dónde proteger personas, animales, maquinaria e insumos.</p>
          {!perfil.puedeEditar && <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">Solo el owner puede completar este perfil.</p>}
        </div>
      )}
    </section>
  );
}

function Detail({ icon: Icon, label, value }: { icon: typeof MapPinned; label: string; value: string | null }) {
  return <article className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/35"><div className="flex items-center gap-2 text-slate-700 dark:text-slate-200"><Icon size={16} className="text-sky-600 dark:text-sky-300" /><h3 className="text-sm font-bold">{label}</h3></div><p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600 dark:text-slate-300">{value || 'Sin información registrada.'}</p></article>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200"><span className="mb-1.5 block">{label}</span>{children}</label>;
}
