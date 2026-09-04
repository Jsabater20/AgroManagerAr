import { OwnerPanelPage } from '../organizaciones/OwnerPanelPage';

export default function AdministracionPersonalPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-6">
      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Paso 2</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Configurar accesos de una persona</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Un permiso define qué pantallas puede usar. Un recurso define sobre qué campo, maquinaria u otro elemento puede trabajar. Podés cambiar ambos cuando quieras.
        </p>
      </header>
      <section className="grid gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950 md:grid-cols-3 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100">
        <div><strong>Rol:</strong> describe su responsabilidad dentro del equipo.</div>
        <div><strong>Permisos:</strong> habilitan o bloquean pantallas como Campos, Tareas o Finanzas.</div>
        <div><strong>Recursos:</strong> determinan sobre qué elementos concretos puede trabajar.</div>
      </section>
      <OwnerPanelPage />
    </div>
  );
}
