import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BellRing, Mail, Save, ShieldAlert, Smartphone } from 'lucide-react';
import { alertasApi } from '../../api/alertas.api';

type ConfiguracionAlertas = {
  alertasActivas: boolean;
  notificacionEnApp: boolean;
  notificacionPush: boolean;
  notificacionEmail: boolean;
  soloPrioritarias: boolean;
};

const configuracionInicial: ConfiguracionAlertas = {
  alertasActivas: true,
  notificacionEnApp: true,
  notificacionPush: true,
  notificacionEmail: false,
  soloPrioritarias: false,
};

function Opcion({
  icono: Icono,
  titulo,
  detalle,
  activa,
  deshabilitada = false,
  onChange,
}: {
  icono: typeof BellRing;
  titulo: string;
  detalle: string;
  activa: boolean;
  deshabilitada?: boolean;
  onChange: (activa: boolean) => void;
}) {
  return (
    <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${deshabilitada ? 'cursor-not-allowed opacity-55' : 'border-slate-200 bg-white hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-700'}`}>
      <Icono size={18} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">{titulo}</span>
        <span className="mt-0.5 block text-xs leading-5 text-slate-500 dark:text-slate-400">{detalle}</span>
      </span>
      <input
        type="checkbox"
        checked={activa}
        disabled={deshabilitada}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
      />
    </label>
  );
}

export function PreferenciasAlertasPanel() {
  const queryClient = useQueryClient();
  const preferencias = useQuery({
    queryKey: ['alertas', 'preferencias'],
    queryFn: alertasApi.preferencias,
    retry: false,
  });
  const [configuracion, setConfiguracion] = useState<ConfiguracionAlertas>(configuracionInicial);

  useEffect(() => {
    if (!preferencias.data) return;
    setConfiguracion({
      alertasActivas: preferencias.data.alertasActivas,
      notificacionEnApp: preferencias.data.notificacionEnApp,
      notificacionPush: preferencias.data.notificacionPush,
      notificacionEmail: preferencias.data.notificacionEmail,
      soloPrioritarias: preferencias.data.soloPrioritarias,
    });
  }, [preferencias.data]);

  const guardar = useMutation({
    mutationFn: () => alertasApi.actualizarPreferencias(configuracion),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alertas', 'preferencias'] }),
  });

  if (preferencias.isError) return null;

  const actualizar = <Clave extends keyof ConfiguracionAlertas>(clave: Clave, valor: ConfiguracionAlertas[Clave]) => {
    setConfiguracion((actual) => ({ ...actual, [clave]: valor }));
  };
  const canalesDeshabilitados = !configuracion.alertasActivas;

  return (
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-amber-100 p-2.5 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"><ShieldAlert size={20} /></div>
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-slate-900 dark:text-white">Preferencias de alertas</h2>
          <p className="mt-0.5 text-xs leading-5 text-slate-500 dark:text-slate-400">Elegí cómo querés enterarte de vencimientos, tareas y situaciones que requieren atención. Las alertas siguen registradas aunque apagues los avisos.</p>
        </div>
      </div>

      {preferencias.isLoading ? (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Cargando configuración...</p>
      ) : (
        <>
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-3 dark:border-amber-900/70 dark:bg-amber-950/25">
            <label className="flex cursor-pointer items-center justify-between gap-3">
              <span><span className="block text-sm font-semibold text-amber-950 dark:text-amber-100">Recibir alertas operativas</span><span className="mt-0.5 block text-xs text-amber-800/80 dark:text-amber-200/80">Podés pausarlas temporalmente sin perder ninguna información.</span></span>
              <input type="checkbox" checked={configuracion.alertasActivas} onChange={(event) => actualizar('alertasActivas', event.target.checked)} className="h-4 w-4 rounded border-amber-400 text-emerald-600 focus:ring-emerald-500" />
            </label>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <Opcion icono={BellRing} titulo="Dentro de AgroManager" detalle="Se muestran en la campana de notificaciones." activa={configuracion.notificacionEnApp} deshabilitada={canalesDeshabilitados} onChange={(valor) => actualizar('notificacionEnApp', valor)} />
            <Opcion icono={Smartphone} titulo="En el celular" detalle="Recibís una notificación si tenés la aplicación instalada y autorizada." activa={configuracion.notificacionPush} deshabilitada={canalesDeshabilitados} onChange={(valor) => actualizar('notificacionPush', valor)} />
            <Opcion icono={Mail} titulo="Por email" detalle={preferencias.data?.emailVerificado ? 'Se envía a tu correo verificado.' : 'Verificá tu correo para poder usar este canal.'} activa={configuracion.notificacionEmail} deshabilitada={canalesDeshabilitados || !preferencias.data?.emailVerificado} onChange={(valor) => actualizar('notificacionEmail', valor)} />
          </div>

          <label className={`mt-3 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 ${canalesDeshabilitados ? 'opacity-55' : ''}`}>
            <input type="checkbox" checked={configuracion.soloPrioritarias} disabled={canalesDeshabilitados} onChange={(event) => actualizar('soloPrioritarias', event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
            Avisarme solo cuando la alerta sea prioritaria
          </label>

          <button onClick={() => guardar.mutate()} disabled={guardar.isPending} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-70 dark:bg-emerald-600 dark:hover:bg-emerald-700"><Save size={16} />{guardar.isPending ? 'Guardando...' : 'Guardar preferencias de alertas'}</button>
          {guardar.isSuccess && <p className="mt-2 text-xs font-medium text-emerald-700 dark:text-emerald-300">Preferencias de alertas guardadas.</p>}
          {guardar.isError && <p className="mt-2 text-xs font-medium text-rose-700 dark:text-rose-300">No se pudieron guardar las preferencias de alertas.</p>}
        </>
      )}
    </section>
  );
}
