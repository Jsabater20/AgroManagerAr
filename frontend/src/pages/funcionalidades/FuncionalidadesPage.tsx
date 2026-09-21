import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sprout } from 'lucide-react';
import PublicFooter from '../../components/layout/PublicFooter';
import PublicNav from '../../components/layout/PublicNav';
import TeamSection from '../../components/marketing/TeamSection';
import FertilizerCalculatorPreview from '../../components/marketing/FertilizerCalculatorPreview';
import ActivityExplorer from '../../components/marketing/ActivityExplorer';
import WorkflowTour from '../../components/marketing/WorkflowTour';

export default function FuncionalidadesPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_45%,rgba(22,163,74,.32),transparent_38%),radial-gradient(circle_at_78%_20%,rgba(16,185,129,.18),transparent_32%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
            <Sprout size={14} />
            Funcionalidades
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-black leading-tight md:text-5xl">Una plataforma clara para ordenar el trabajo de todos los días.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            Desde un lote y una tarea hasta el equipo completo, AgroManager AR reúne la información que necesitás para trabajar con más orden y previsibilidad.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/demo" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-slate-900 transition hover:bg-slate-100">
              Probar Demo <ArrowRight size={17} />
            </Link>
            <Link to="/planes" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 font-bold text-white transition hover:bg-white/10">
              Ver planes
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
          {[
            'Información ordenada por campo o establecimiento',
            'Equipo con permisos y trabajos asignados',
            'Datos preparados para decidir y crecer',
          ].map((benefit) => (
            <div key={benefit} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium leading-relaxed text-slate-700">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
              {benefit}
            </div>
          ))}
        </div>
      </section>

      <TeamSection />
      <FertilizerCalculatorPreview />
      <ActivityExplorer />
      <WorkflowTour />

      <section className="bg-slate-950 px-4 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold">Empezá por lo que necesitás hoy.</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">Podés comenzar con un plan Free y ampliar las herramientas cuando tu operación lo requiera.</p>
          <Link to="/planes" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-bold text-white transition hover:bg-emerald-400">
            Conocer planes <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
