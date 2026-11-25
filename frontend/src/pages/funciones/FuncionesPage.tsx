import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  Calculator,
  CloudSun,
  Leaf,
  ListChecks,
  Tractor,
  UsersRound,
} from 'lucide-react';
import PublicNav from '../../components/layout/PublicNav';
import PublicFooter from '../../components/layout/PublicFooter';

const grupos = [
  {
    titulo: 'Producción y recursos',
    descripcion: 'Mantené ordenada la información productiva de cada establecimiento.',
    icono: Leaf,
    funciones: ['Campos y lotes', 'Siembras y cultivos', 'Ganadería y animales', 'Avícola, tambo, yerba y frutihorticultura'],
  },
  {
    titulo: 'Trabajo y equipo',
    descripcion: 'Organizá las tareas y facilitá el seguimiento de quienes las realizan.',
    icono: UsersRound,
    funciones: ['Tareas y trabajos asignados', 'Miembros, roles y permisos', 'Maquinaria e insumos', 'Observaciones y evidencias'],
  },
  {
    titulo: 'Gestión y análisis',
    descripcion: 'Usá la información registrada para revisar el estado de la operación.',
    icono: BarChart3,
    funciones: ['Dashboard y reportes', 'Finanzas y rentabilidad', 'Cálculos productivos', 'Historial y exportaciones'],
  },
  {
    titulo: 'Herramientas inteligentes',
    descripcion: 'Sumá asistencia y contexto para anticiparte y decidir con más información.',
    icono: Bot,
    funciones: ['AgroBot IA', 'AgroManager Clima', 'Alertas configurables', 'Asistencia sobre datos del negocio'],
  },
];

export default function FuncionesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNav />
      <main>
        <section className="bg-slate-950 px-4 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Funciones de AgroManager AR</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">Todo lo que necesitás para ordenar la gestión agropecuaria.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">Conocé las herramientas por tema. Algunas funciones y sus límites dependen del plan contratado.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/precios" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-bold text-white transition hover:bg-emerald-400">Comparar planes <ArrowRight size={17} /></Link>
              <Link to="/demo" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-5 py-3 font-bold text-white transition hover:bg-white/10">Explorar la demo</Link>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16">
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
            {grupos.map(({ titulo, descripcion, icono: Icon, funciones }) => (
              <article key={titulo} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Icon size={21} /></div>
                <h2 className="mt-4 text-xl font-bold text-slate-900">{titulo}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{descripcion}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {funciones.map((funcion) => <li key={funcion} className="flex items-start gap-2 text-sm text-slate-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />{funcion}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-4 py-12">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <article className="rounded-2xl bg-emerald-50 p-6">
              <Building2 className="text-emerald-700" size={23} />
              <h2 className="mt-3 text-xl font-bold text-slate-900">¿Gestionás una empresa con varios establecimientos?</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">Mantené separada la información de cada organización y consultá una vista general según los permisos que defina el owner.</p>
              <Link to="/demo/empresa" className="mt-4 inline-flex items-center gap-2 font-bold text-emerald-800">Ver Demo Empresa <ArrowRight size={16} /></Link>
            </article>
            <article className="rounded-2xl bg-sky-50 p-6">
              <CloudSun className="text-sky-700" size={23} />
              <h2 className="mt-3 text-xl font-bold text-slate-900">¿Querés conocer la plataforma en acción?</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">Probá las demos y recorré ejemplos de gestión, equipo, producción y herramientas de análisis.</p>
              <Link to="/demo" className="mt-4 inline-flex items-center gap-2 font-bold text-sky-800">Abrir demo personal <ArrowRight size={16} /></Link>
            </article>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16">
          <div className="mx-auto flex max-w-5xl flex-col gap-5 rounded-3xl bg-slate-900 p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <div className="flex items-center gap-2 text-emerald-300"><Calculator size={18} /><Tractor size={18} /><ListChecks size={18} /></div>
              <h2 className="mt-3 text-2xl font-black">Elegí las herramientas que se ajustan a tu trabajo.</h2>
              <p className="mt-2 text-sm text-slate-300">Revisá qué incluye cada plan y sus límites.</p>
            </div>
            <Link to="/precios" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-bold transition hover:bg-emerald-400">Ver planes <ArrowRight size={17} /></Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
