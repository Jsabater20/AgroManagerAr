import { ArrowRight, BriefcaseBusiness, ShieldCheck, UserPlus, UsersRound } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { usePermissions } from '../../hooks/usePermissions';

export default function MiembrosInicioPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const { isLoading, isMember, isOwner, isSuperAdmin } = usePermissions();
  const orgIdNum = Number(orgId || 0);
  const puedeGestionar = isOwner || isSuperAdmin;

  if (isLoading) return <PageState message="Cargando equipo..." />;
  if (!orgIdNum || (!puedeGestionar && !isMember)) return <Navigate to="/" replace />;

  if (!puedeGestionar) {
    return (
      <main className="mx-auto max-w-3xl space-y-6 p-4 md:p-6">
        <header>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Mi trabajo</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Tus tareas asignadas</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Acá vas a encontrar las actividades que te asignó el responsable. Podés iniciarlas, pausarlas o completarlas desde la sección Tareas.
          </p>
        </header>
        <Link
          to={'/org/' + orgIdNum + '/tareas'}
          className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 p-5 transition hover:border-emerald-400 dark:border-emerald-500/30 dark:bg-emerald-500/10"
        >
          <span>
            <span className="block font-bold text-emerald-950 dark:text-emerald-100">Ver mis tareas</span>
            <span className="mt-1 block text-sm text-emerald-900/75 dark:text-emerald-100/75">Revisá el detalle y registrá el avance de cada trabajo.</span>
          </span>
          <ArrowRight className="text-emerald-700 dark:text-emerald-300" size={20} />
        </Link>
      </main>
    );
  }

  const pasos = [
    {
      icon: UserPlus,
      numero: '1',
      titulo: 'Invitar una persona',
      descripcion: 'Ingresá su email y elegí su rol inicial. La persona completa su propio registro desde la invitación.',
      to: '/org/' + orgIdNum + '/miembros/invitar',
      accion: 'Invitar al equipo',
    },
    {
      icon: ShieldCheck,
      numero: '2',
      titulo: 'Definir qué puede hacer',
      descripcion: 'Elegí las pantallas que puede usar y los campos o recursos que necesita para trabajar.',
      to: '/org/' + orgIdNum + '/miembros/administracion',
      accion: 'Configurar accesos',
    },
    {
      icon: BriefcaseBusiness,
      numero: '3',
      titulo: 'Asignar un trabajo',
      descripcion: 'Indicá responsable, tarea y fechas. Si el recurso no está habilitado, el sistema te avisa antes de asignarlo.',
      to: '/org/' + orgIdNum + '/miembros/asignar-trabajo',
      accion: 'Asignar trabajo',
    },
  ];

  return (
    <main className="mx-auto max-w-6xl space-y-8 p-4 md:p-6">
      <header className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300">
          <UsersRound size={14} />
          Equipo de trabajo
        </div>
        <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">Organizá tu equipo sin complicaciones</h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Primero invitás a la persona, después definís a qué información puede acceder y finalmente le asignás trabajos. Cada paso es independiente y podés ajustarlo cuando quieras.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {pasos.map(({ icon: Icon, numero, titulo, descripcion, to, accion }) => (
          <Link
            key={numero}
            to={to}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                <Icon size={21} />
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">Paso {numero}</span>
            </div>
            <h2 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{titulo}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{descripcion}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-emerald-700 dark:text-emerald-300">
              {accion}
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>

      <Link
        to={'/org/' + orgIdNum + '/miembros/trabajos'}
        className="flex flex-col gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 transition hover:border-emerald-300 hover:bg-emerald-50 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-900/50 dark:hover:bg-emerald-500/10"
      >
        <span>
          <span className="block font-semibold text-slate-900 dark:text-white">¿Querés revisar cómo va el equipo?</span>
          <span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">Consultá los recursos y trabajos asignados a cada persona.</span>
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 dark:text-emerald-300">Ver seguimiento <ArrowRight size={16} /></span>
      </Link>
    </main>
  );
}

function PageState({ message }: { message: string }) {
  return <div className="p-10 text-center text-slate-600 dark:text-slate-300">{message}</div>;
}
