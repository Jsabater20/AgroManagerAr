import { ArrowRight, ClipboardCheck, Eye, UserPlus, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: UserPlus,
    step: '1',
    title: 'Invitá a tu equipo',
    description: 'Sumá operarios, encargados o administradores por email.',
  },
  {
    icon: ClipboardCheck,
    step: '2',
    title: 'Asigná campos y trabajos',
    description: 'Indicá qué recursos puede usar cada persona y qué tareas tiene a cargo.',
  },
  {
    icon: Eye,
    step: '3',
    title: 'Seguí el trabajo realizado',
    description: 'Consultá estados, observaciones y evidencias sin perseguir mensajes.',
  },
];

const members = [
  ['Joaquín', 'Owner · Vista completa del establecimiento', 'bg-emerald-500'],
  ['José', 'Operario · Campo Las Meninas · 2 trabajos', 'bg-sky-500'],
  ['María', 'Administración · Finanzas y maquinarias', 'bg-violet-500'],
];

export default function TeamSection() {
  return (
    <section className="bg-gray-50 px-4 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
        <div className="rounded-3xl bg-gray-950 p-5 shadow-xl sm:p-7">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
                <UsersRound size={20} />
              </div>
              <div>
                <p className="font-semibold text-white">Campo Las Meninas</p>
                <p className="text-xs text-gray-400">Equipo de trabajo</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
              3 miembros
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {members.map(([nombre, detalle, color]) => (
              <div key={nombre} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className={'flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ' + color}>
                  {nombre.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-white">{nombre}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{detalle}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl bg-emerald-500/10 p-4">
            <p className="text-sm font-semibold text-emerald-200">Trabajo asignado a José</p>
            <p className="mt-1 text-xs text-emerald-100/70">
              Revisar alambrado · Campo Las Meninas · Esta semana
            </p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-700">
            Trabajo en equipo
          </p>
          <h2 className="max-w-xl text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            Organizá a tu equipo sin perder el control de tu campo.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600">
            Con Miembros podés invitar a las personas que trabajan con vos y darles acceso
            solo a lo que necesitan. Cada uno sabe qué hacer y vos podés seguir el avance
            desde un solo lugar.
          </p>

          <div className="mt-8 space-y-5">
            {steps.map(({ icon: Icon, step, title, description }) => (
              <div key={step} className="flex gap-4">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Icon size={19} />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-700 text-[10px] font-bold text-white">
                    {step}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-gray-600">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              Empezar con mi equipo
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/precios"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:border-emerald-200 hover:text-emerald-800"
            >
              Ver planes y límites
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
