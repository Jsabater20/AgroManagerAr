import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Building2, CheckCircle2, MessageCircle, UsersRound } from 'lucide-react';
import PublicFooter from '../../components/layout/PublicFooter';
import PublicNav from '../../components/layout/PublicNav';
import { EMPRESA_STANDARD_PAYMENT_URL } from '../../constants/payments';
import { WHATSAPP_BUSINESS_URL } from '../../components/ui/WhatsAppButton';

const BENEFITS = [
  {
    icon: Building2,
    title: 'Cada establecimiento conserva su información',
    description: 'Los equipos trabajan únicamente sobre el campo, unidad o establecimiento que les corresponde.',
  },
  {
    icon: UsersRound,
    title: 'Roles claros para cada persona',
    description: 'Definí responsables, encargados y miembros, con accesos según su trabajo.',
  },
  {
    icon: BarChart3,
    title: 'Una vista general para quien la necesita',
    description: 'El owner y las personas autorizadas pueden consultar una operación consolidada sin perder el detalle.',
  },
];

export default function EmpresasPublicPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNav />

      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 px-4 py-20 text-white md:py-28">
        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
              <Building2 size={14} />
              Para empresas agropecuarias
            </span>
            <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight md:text-5xl">Varios establecimientos, una gestión ordenada.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200">
              AgroManager AR permite organizar cada establecimiento de forma independiente y, al mismo tiempo, contar con una visión general para quienes administran la empresa.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/demo/empresa" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-emerald-900 transition hover:bg-emerald-50">
                Ver Demo Empresa <ArrowRight size={17} />
              </Link>
              <a href={WHATSAPP_BUSINESS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-bold text-white transition hover:bg-white/10">
                <MessageCircle size={17} />
                Consultar
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/25 p-5 shadow-2xl shadow-black/30 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Una empresa, varios equipos</p>
            <div className="mt-5 space-y-3">
              {[
                ['Establecimiento Las Meninas', 'Agricultura y ganadería · Equipo local'],
                ['Establecimiento La Esperanza', 'Tambo y avícola · Encargado asignado'],
                ['Establecimiento El Ombú', 'Frutihorticultura y yerba · Operación independiente'],
              ].map(([name, detail]) => (
                <div key={name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">{name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">{detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-center">
              {[
                ['3', 'Establecimientos'],
                ['16', 'Miembros activos'],
                ['1', 'Vista consolidada'],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-xl font-bold text-emerald-300">{value}</p>
                  <p className="mt-1 text-[11px] leading-tight text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Pensado para que todos entiendan su lugar</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">La información adecuada para cada equipo, sin mezclar establecimientos.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Icon size={21} /></span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl border-2 border-emerald-700 bg-emerald-950 p-7 text-white shadow-xl sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Plan Empresa</p>
              <h2 className="mt-3 text-3xl font-bold">Hasta 3 establecimientos en un mismo plan.</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-emerald-100">Incluye todas las herramientas Pro, establecimientos separados, gestión completa del equipo y visualización consolidada para personas autorizadas.</p>
              <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                {['Todo Pro incluido', 'Hasta 3 establecimientos', 'Equipos y permisos por establecimiento', 'Auditoría y exportaciones consolidadas'].map((benefit) => (
                  <span key={benefit} className="flex items-start gap-2 text-emerald-50"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-300" />{benefit}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-5 text-center text-slate-900">
              <p className="text-sm font-medium text-slate-500">Plan estándar</p>
              <p className="mt-1 text-3xl font-black">$69.990</p>
              <p className="mt-1 text-sm text-slate-500">ARS / mes</p>
              <a href={EMPRESA_STANDARD_PAYMENT_URL} target="_blank" rel="noreferrer" className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">
                Contratar hasta 3
              </a>
              <a href={WHATSAPP_BUSINESS_URL} target="_blank" rel="noreferrer" className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                Cotizar más de 3
              </a>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
