import { useQuery } from '@tanstack/react-query';
import { BarChart3, Building2, ChevronRight, MapPin, UsersRound } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { empresasApi } from '../../api/empresas.api';
import { useAuthStore } from '../../store/auth.store';

const DEMO_EMPRESA_EMAIL = 'demoempresa@agromanager.ar';

export default function DemoEmpresaWelcomePage() {
  const usuario = useAuthStore((state) => state.usuario);
  const empresasQuery = useQuery({
    queryKey: ['empresas-mias'],
    queryFn: empresasApi.listarMias,
  });
  const empresa = empresasQuery.data?.[0];
  const establecimientosQuery = useQuery({
    queryKey: ['empresa-organizaciones', empresa?.id],
    queryFn: () => empresasApi.obtenerOrganizaciones(empresa!.id),
    enabled: Boolean(empresa?.id),
  });

  if (usuario?.email !== DEMO_EMPRESA_EMAIL) {
    return <Navigate to="/" replace />;
  }
  if (empresasQuery.isLoading || establecimientosQuery.isLoading) {
    return <PageState message="Preparando el recorrido de la Demo Empresa..." />;
  }
  if (!empresa || empresasQuery.isError || establecimientosQuery.isError) {
    return <PageState message="No pudimos preparar la demo. Intentá ingresar nuevamente." />;
  }

  const primerEstablecimiento = establecimientosQuery.data?.[0];
  const pasos = [
    {
      icon: BarChart3,
      paso: 'Paso 1',
      titulo: 'Mirá el panorama general',
      descripcion: 'Empezá por un resumen simple de los tres establecimientos: superficie, recursos, equipo y trabajos.',
      to: '/empresas/' + empresa.id + '/dashboard',
      accion: 'Ver resumen de la empresa',
    },
    {
      icon: MapPin,
      paso: 'Paso 2',
      titulo: 'Entrá a un establecimiento',
      descripcion: 'Después bajá al detalle. Cada establecimiento conserva sus campos, lotes y movimientos por separado.',
      to: primerEstablecimiento ? '/org/' + primerEstablecimiento.id + '/dashboard' : '/empresas/' + empresa.id + '/dashboard',
      accion: primerEstablecimiento ? 'Abrir ' + primerEstablecimiento.nombre : 'Ver establecimientos',
    },
    {
      icon: UsersRound,
      paso: 'Paso 3',
      titulo: 'Revisá el trabajo del equipo',
      descripcion: 'Por último, observá cómo se asignan tareas y cómo la empresa puede seguirlas sin perder contexto.',
      to: '/empresas/' + empresa.id + '/actividades',
      accion: 'Ver tareas del equipo',
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 px-6 py-8 text-white shadow-xl sm:px-9 sm:py-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-200">
            <Building2 size={14} />
            Demo guiada
          </div>
          <h1 className="mt-5 text-3xl font-bold sm:text-4xl">Entendé la empresa en tres pasos</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-emerald-50/85 sm:text-lg">
            Una empresa reúne varios establecimientos. Cada uno mantiene sus propios datos, y la dirección puede ver el panorama completo sin mezclar la información.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {pasos.map(({ icon: Icon, paso, titulo, descripcion, to, accion }) => (
          <Link
            key={paso}
            to={to}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              <Icon size={21} />
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">{paso}</p>
            <h2 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{titulo}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{descripcion}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-emerald-700 dark:text-emerald-300">
              {accion}
              <ChevronRight size={16} className="transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-500/30 dark:bg-emerald-500/10">
        <p className="font-semibold text-emerald-950 dark:text-emerald-100">¿Querés explorar por tu cuenta?</p>
        <p className="mt-1 text-sm text-emerald-900/75 dark:text-emerald-100/75">
          Podés abrir el panel completo cuando quieras. Los datos son ficticios y se reinician automáticamente cada 24 horas.
        </p>
        <Link
          to={'/empresas/' + empresa.id + '/dashboard'}
          className="mt-4 inline-flex items-center gap-1 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800"
        >
          Explorar panel completo
          <ChevronRight size={16} />
        </Link>
      </section>
    </main>
  );
}

function PageState({ message }: { message: string }) {
  return <div className="p-10 text-center text-slate-600 dark:text-slate-300">{message}</div>;
}
