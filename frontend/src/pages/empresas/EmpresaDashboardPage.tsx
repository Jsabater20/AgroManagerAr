import { useState } from 'react';
import {
  Building2,
  CircleDollarSign,
  ClipboardList,
  Map,
  PawPrint,
  Tractor,
  Users,
  BarChart3,
  ChartNoAxesCombined,
  Download,
  ShieldCheck,
  CalendarDays,
  MessageCircle,
  Plus,
  Save,
} from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { empresasApi } from '../../api/empresas.api';
import type { ActividadProductiva } from '../../api/organizaciones.api';
import { WHATSAPP_BUSINESS_URL } from '../../components/ui/WhatsAppButton';

export default function EmpresaDashboardPage() {
  const { empresaId } = useParams<{ empresaId: string }>();
  const id = Number(empresaId);
  const queryClient = useQueryClient();
  const [mostrarAltaEstablecimiento, setMostrarAltaEstablecimiento] = useState(false);
  const dashboardQuery = useQuery({
    queryKey: ['empresa-dashboard', id],
    queryFn: () => empresasApi.obtenerDashboard(id),
    enabled: Number.isInteger(id) && id > 0,
  });
  const organizacionesQuery = useQuery({
    queryKey: ['empresa-organizaciones', id],
    queryFn: () => empresasApi.obtenerOrganizaciones(id),
    enabled: Number.isInteger(id) && id > 0,
  });

  if (dashboardQuery.isLoading || organizacionesQuery.isLoading) {
    return <PageState message="Preparando el dashboard empresarial..." />;
  }
  if (dashboardQuery.isError || organizacionesQuery.isError || !dashboardQuery.data) {
    return <PageState message="No pudimos cargar esta empresa o no tenés acceso." />;
  }

  const dashboard = dashboardQuery.data;
  const establecimientos = organizacionesQuery.data ?? [];
  const cupoDisponible = Math.max(
    dashboard.empresa.limiteEstablecimientos - dashboard.empresa.establecimientos,
    0,
  );
  const usoEstablecimientos = dashboard.empresa.limiteEstablecimientos
    ? Math.min(
        (dashboard.empresa.establecimientos / dashboard.empresa.limiteEstablecimientos) * 100,
        100,
      )
    : 0;
  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      <div className="rounded-3xl bg-gradient-to-r from-emerald-900 to-emerald-700 p-7 text-white shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">Dashboard empresarial</p>
            <h1 className="mt-2 text-3xl font-bold">{dashboard.empresa.nombre}</h1>
            <p className="mt-2 text-emerald-100">
              {dashboard.empresa.establecimientos} de {dashboard.empresa.limiteEstablecimientos} establecimientos habilitados
            </p>
          </div>
          <Building2 size={34} className="text-emerald-200" />
        </div>
      </div>

      <section className="grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">Plan Empresa</p>
              <p className="mt-1 text-sm text-slate-500">
                {cupoDisponible
                  ? 'Te quedan ' + cupoDisponible + ' establecimientos disponibles.'
                  : 'Usaste todos los establecimientos incluidos en tu plan.'}
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
              Activa
            </span>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-emerald-600" style={{ width: usoEstablecimientos + '%' }} />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>{dashboard.empresa.establecimientos} utilizados de {dashboard.empresa.limiteEstablecimientos}</span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays size={13} />
              {dashboard.empresa.fechaVencimiento
                ? 'Vence ' + fechaVisible(dashboard.empresa.fechaVencimiento)
                : 'Vigencia sin vencimiento definido'}
            </span>
          </div>
          {dashboard.empresa.puedeCrearEstablecimientos && cupoDisponible > 0 && (
            <button
              type="button"
              onClick={() => setMostrarAltaEstablecimiento(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800"
            >
              <Plus size={16} />
              Crear establecimiento
            </button>
          )}
        </div>

        <div className="rounded-2xl bg-emerald-950 p-5 text-white">
          <p className="text-sm font-semibold text-emerald-200">¿Necesitás ampliar tu empresa?</p>
          <p className="mt-2 text-sm leading-relaxed text-emerald-100/85">
            Consultanos para sumar establecimientos o revisar tu cotización.
          </p>
          <a
            href={WHATSAPP_BUSINESS_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-300 transition hover:text-white"
          >
            <MessageCircle size={16} />
            Hablar por WhatsApp
          </a>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-slate-900">Resumen operativo</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Metric icon={Map} label="Superficie" value={`${formatNumber(dashboard.resumen.superficieHa)} ha`} detail={`${dashboard.resumen.campos} campos`} />
          <Metric icon={PawPrint} label="Animales" value={formatNumber(dashboard.resumen.animales)} detail="Registrados" />
          <Metric icon={Tractor} label="Maquinarias" value={formatNumber(dashboard.resumen.maquinarias)} detail="Flota total" />
          <Metric icon={Users} label="Miembros" value={formatNumber(dashboard.resumen.miembros)} detail="Activos" />
          <Metric icon={ClipboardList} label="Trabajos" value={formatNumber(dashboard.trabajos.pendientes + dashboard.trabajos.enProgreso + dashboard.trabajos.pausadas)} detail={`${dashboard.trabajos.demoradas} demorados`} tone={dashboard.trabajos.demoradas > 0 ? 'warning' : 'default'} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-slate-900">Gestión consolidada</h2>
        <p className="mt-1 text-sm text-slate-500">Consultá la operación de todos los establecimientos autorizados.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AccessCard to={`/empresas/${id}/miembros`} icon={Users} title="Equipo" detail="Miembros y trabajos activos" />
          <AccessCard to={`/empresas/${id}/actividades`} icon={ClipboardList} title="Actividades" detail="Trabajos por establecimiento" />
          <AccessCard to={`/empresas/${id}/maquinarias`} icon={Tractor} title="Maquinarias" detail="Flota y estado operativo" />
          <AccessCard to={`/empresas/${id}/ganaderia`} icon={PawPrint} title="Ganadería" detail="Stock consolidado" />
          <AccessCard to={`/empresas/${id}/finanzas`} icon={CircleDollarSign} title="Finanzas" detail="Ingresos y egresos" />
          <AccessCard to={`/empresas/${id}/rentabilidad`} icon={BarChart3} title="Rentabilidad" detail="Comparativas y campañas" />
          <AccessCard to={`/empresas/${id}/produccion`} icon={ChartNoAxesCombined} title="Producción" detail="Resultados por establecimiento" />
          <AccessCard to={`/empresas/${id}/auditoria`} icon={ShieldCheck} title="Auditoría" detail="Trazabilidad del equipo" />
          <AccessCard to={`/empresas/${id}/exportaciones`} icon={Download} title="Exportaciones" detail="Informes Excel y PDF" />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-900">Trabajos consolidados</h2>
          <div className="mt-5 space-y-3 text-sm">
            <WorkRow label="Pendientes" value={dashboard.trabajos.pendientes} />
            <WorkRow label="En progreso" value={dashboard.trabajos.enProgreso} />
            <WorkRow label="Pausadas" value={dashboard.trabajos.pausadas} />
            <WorkRow label="Completadas" value={dashboard.trabajos.completadas} />
            <WorkRow label="Demoradas" value={dashboard.trabajos.demoradas} warning />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Establecimientos</h2>
              <p className="mt-1 text-sm text-slate-500">Ingresá a cada establecimiento sin cambiar su funcionamiento.</p>
            </div>
          </div>
          <div className="mt-4 divide-y divide-slate-100">
            {establecimientos.map((organizacion) => (
              <Link key={organizacion.id} to={`/org/${organizacion.id}/dashboard`} className="flex items-center justify-between gap-4 py-4 first:pt-0 hover:text-emerald-700">
                <div>
                  <p className="font-semibold text-slate-900">{organizacion.nombre}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {formatNumber(organizacion.hectareas)} ha ·{' '}
                    {organizacion.actividadPrincipal
                      ? etiquetaActividad(organizacion.actividadPrincipal)
                      : 'Perfil productivo sin definir'}
                  </p>
                </div>
                <span className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">Abrir</span>
              </Link>
            ))}
            {establecimientos.length === 0 && <p className="py-6 text-sm text-slate-500">No hay establecimientos autorizados.</p>}
          </div>
        </div>
      </section>

      {mostrarAltaEstablecimiento && (
        <CrearEstablecimientoModal
          empresaId={id}
          cupoDisponible={cupoDisponible}
          onClose={() => setMostrarAltaEstablecimiento(false)}
          onCreated={() => {
            queryClient.invalidateQueries({ queryKey: ['empresa-dashboard', id] });
            queryClient.invalidateQueries({ queryKey: ['empresa-organizaciones', id] });
            setMostrarAltaEstablecimiento(false);
          }}
        />
      )}
    </div>
  );
}

const ACTIVIDADES_PRODUCTIVAS: Array<{
  value: ActividadProductiva;
  label: string;
  descripcion: string;
}> = [
  { value: 'AGRICOLA', label: 'Agricultura', descripcion: 'Cultivos, siembras y cosechas.' },
  { value: 'GANADERIA', label: 'Ganadería', descripcion: 'Rodeo, sanidad y reproducción.' },
  { value: 'TAMBO', label: 'Tambo / Lácteos', descripcion: 'Producción de leche y ordeñe.' },
  { value: 'AVICOLA', label: 'Avícola', descripcion: 'Aves, postura o producción.' },
  { value: 'FRUTIHORTICOLA', label: 'Frutihorticultura', descripcion: 'Frutas, hortalizas e invernaderos.' },
  { value: 'YERBA', label: 'Yerba mate', descripcion: 'Lotes y producción yerbatera.' },
];

function etiquetaActividad(actividad: ActividadProductiva) {
  return (
    ACTIVIDADES_PRODUCTIVAS.find((item) => item.value === actividad)?.label ??
    actividad
  );
}

function CrearEstablecimientoModal({
  empresaId,
  cupoDisponible,
  onClose,
  onCreated,
}: {
  empresaId: number;
  cupoDisponible: number;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [actividades, setActividades] = useState<ActividadProductiva[]>([]);
  const [actividadPrincipal, setActividadPrincipal] = useState<ActividadProductiva | ''>('');

  const crearMutation = useMutation({
    mutationFn: () =>
      empresasApi.crearEstablecimiento(empresaId, {
        nombre: nombre.trim(),
        email: email.trim().toLowerCase(),
        actividadPrincipal: actividadPrincipal as ActividadProductiva,
        actividades,
      }),
    onSuccess: onCreated,
  });

  const alternarActividad = (actividad: ActividadProductiva) => {
    const siguiente = actividades.includes(actividad)
      ? actividades.filter((item) => item !== actividad)
      : [...actividades, actividad];
    setActividades(siguiente);
    if (!siguiente.includes(actividadPrincipal as ActividadProductiva)) {
      setActividadPrincipal(siguiente[0] ?? '');
    }
  };

  const puedeCrear =
    nombre.trim().length >= 3 &&
    email.trim().length > 0 &&
    actividadPrincipal !== '' &&
    actividades.includes(actividadPrincipal);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 p-4">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (puedeCrear) crearMutation.mutate();
        }}
        className="mx-auto my-6 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              Nuevo establecimiento
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Configurá cómo produce</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Usarás 1 de los {cupoDisponible} establecimientos que todavía tenés disponibles.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100"
          >
            Cancelar
          </button>
        </div>

        <section className="mt-7">
          <p className="text-sm font-bold text-slate-900">1. Datos del establecimiento</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Nombre
              <input
                required
                minLength={3}
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                placeholder="Ej. Estancia Pepita"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Email de contacto
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="establecimiento@empresa.com"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </label>
          </div>
        </section>

        <section className="mt-7 border-t border-slate-100 pt-6">
          <p className="text-sm font-bold text-slate-900">2. Actividades productivas</p>
          <p className="mt-1 text-sm text-slate-500">
            Marcá todas las actividades que se realizan en este establecimiento.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {ACTIVIDADES_PRODUCTIVAS.map((actividad) => {
              const seleccionada = actividades.includes(actividad.value);
              return (
                <label
                  key={actividad.value}
                  className={
                    'cursor-pointer rounded-xl border p-3 transition ' +
                    (seleccionada
                      ? 'border-emerald-400 bg-emerald-50'
                      : 'border-slate-200 hover:border-emerald-200')
                  }
                >
                  <input
                    type="checkbox"
                    checked={seleccionada}
                    onChange={() => alternarActividad(actividad.value)}
                    className="sr-only"
                  />
                  <p className="font-semibold text-slate-900">{actividad.label}</p>
                  <p className="mt-1 text-xs text-slate-500">{actividad.descripcion}</p>
                </label>
              );
            })}
          </div>

          <label className="mt-5 block text-sm font-medium text-slate-700">
            Actividad principal
            <select
              required
              value={actividadPrincipal}
              onChange={(event) => setActividadPrincipal(event.target.value as ActividadProductiva)}
              disabled={!actividades.length}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-100"
            >
              <option value="">Seleccioná una actividad</option>
              {ACTIVIDADES_PRODUCTIVAS.filter((actividad) => actividades.includes(actividad.value)).map(
                (actividad) => (
                  <option key={actividad.value} value={actividad.value}>
                    {actividad.label}
                  </option>
                ),
              )}
            </select>
          </label>
        </section>

        {crearMutation.isError && (
          <p className="mt-5 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            No se pudo crear el establecimiento. Revisá los datos e intentá nuevamente.
          </p>
        )}

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!puedeCrear || crearMutation.isPending}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={16} />
            {crearMutation.isPending ? 'Creando...' : 'Crear establecimiento'}
          </button>
        </div>
      </form>
    </div>
  );
}

function Metric({ icon: Icon, label, value, detail, tone = 'default' }: { icon: typeof Map; label: string; value: string; detail: string; tone?: 'default' | 'warning' }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4"><Icon size={19} className={tone === 'warning' ? 'text-amber-600' : 'text-emerald-700'} /><p className="mt-4 text-sm text-slate-500">{label}</p><p className="mt-1 text-2xl font-bold text-slate-900">{value}</p><p className={tone === 'warning' ? 'mt-1 text-xs font-semibold text-amber-700' : 'mt-1 text-xs text-slate-500'}>{detail}</p></div>;
}

function AccessCard({ to, icon: Icon, title, detail }: { to: string; icon: typeof Map; title: string; detail: string }) {
  return <Link to={to} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"><Icon size={20} className="text-emerald-700" /><h3 className="mt-4 font-bold text-slate-900">{title}</h3><p className="mt-1 text-sm text-slate-500">{detail}</p><span className="mt-4 inline-block text-sm font-semibold text-emerald-700">Ver consolidado →</span></Link>;
}

function WorkRow({ label, value, warning = false }: { label: string; value: number; warning?: boolean }) {
  return <div className="flex items-center justify-between"><span className={warning ? 'font-medium text-amber-700' : 'text-slate-600'}>{label}</span><span className={warning ? 'font-bold text-amber-700' : 'font-bold text-slate-900'}>{formatNumber(value)}</span></div>;
}

function PageState({ message }: { message: string }) {
  return <div className="p-10 text-center text-slate-600">{message}</div>;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(value);
}

function fechaVisible(fecha: string) {
  const [anio, mes, dia] = fecha.slice(0, 10).split('-');
  return dia + '/' + mes + '/' + anio;
}
