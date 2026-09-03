import { Building2, CircleAlert, Clock3, LogOut, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { WHATSAPP_BUSINESS_URL } from '../../components/ui/WhatsAppButton';

const contenidoPorEstado = {
  PENDIENTE: {
    etiqueta: 'Solicitud recibida',
    titulo: 'Tu empresa está pendiente de activación',
    descripcion:
      'Recibimos tus datos. Nos comunicaremos con vos para definir la cotización y la cantidad de establecimientos incluidos.',
    color: 'amber',
  },
  ACTIVA: {
    etiqueta: 'Cuenta activa',
    titulo: 'Tu empresa está lista para configurarse',
    descripcion:
      'Estamos preparando los establecimientos habilitados para tu empresa. Si necesitás asistencia, escribinos y te ayudamos.',
    color: 'emerald',
  },
  SUSPENDIDA: {
    etiqueta: 'Cuenta suspendida',
    titulo: 'La operación de tu empresa está suspendida',
    descripcion:
      'Contactanos para revisar el estado comercial de tu cuenta y recuperar el acceso a los establecimientos.',
    color: 'rose',
  },
  VENCIDA: {
    etiqueta: 'Vigencia finalizada',
    titulo: 'La vigencia de tu empresa finalizó',
    descripcion:
      'Contactanos para renovar el servicio y volver a operar con tus establecimientos.',
    color: 'rose',
  },
} as const;

export default function EmpresaEstadoPage() {
  const usuario = useAuthStore((state) => state.usuario);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const empresa = usuario?.empresas?.[0];

  if (!empresa) {
    return (
      <div className="min-h-screen bg-slate-950 p-6 text-center text-white">
        <Link to="/" className="text-sm font-semibold text-emerald-300 hover:text-emerald-200">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const contenido = contenidoPorEstado[empresa.estadoComercial];
  const esPendiente = empresa.estadoComercial === 'PENDIENTE';
  const colorEtiqueta =
    contenido.color === 'amber'
      ? 'bg-amber-400/15 text-amber-200 ring-amber-300/25'
      : contenido.color === 'rose'
        ? 'bg-rose-400/15 text-rose-200 ring-rose-300/25'
        : 'bg-emerald-400/15 text-emerald-200 ring-emerald-300/25';

  const cerrarSesion = () => {
    logout();
    navigate('/');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 p-6">
      <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-9">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-300/20">
            <Building2 size={24} />
          </div>
          <button
            type="button"
            onClick={cerrarSesion}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut size={16} />
            Salir
          </button>
        </div>

        <span className={'mt-7 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide ring-1 ' + colorEtiqueta}>
          {esPendiente ? <Clock3 size={14} /> : <CircleAlert size={14} />}
          {contenido.etiqueta}
        </span>

        <p className="mt-5 text-sm font-medium text-emerald-300">{empresa.nombre}</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-white">{contenido.titulo}</h1>
        <p className="mt-4 text-base leading-relaxed text-slate-300">{contenido.descripcion}</p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm font-semibold text-white">Próximo paso</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-300">
            {esPendiente
              ? 'Cuando la cotización esté confirmada, habilitaremos tus establecimientos desde AgroManager AR.'
              : 'Podés comunicarte con nuestro equipo para conocer el estado de tu cuenta.'}
          </p>
        </div>

        <a
          href={WHATSAPP_BUSINESS_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-semibold text-white transition hover:bg-[#1fbd5a]"
        >
          <MessageCircle size={19} />
          Consultar por WhatsApp
        </a>
      </section>
    </main>
  );
}
