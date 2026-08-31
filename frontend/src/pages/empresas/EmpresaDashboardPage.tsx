import {
  Building2,
  CircleDollarSign,
  ClipboardList,
  Map,
  PawPrint,
  Tractor,
  Users,
  BarChart3,
  Download,
  ShieldCheck,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { empresasApi } from '../../api/empresas.api';

export default function EmpresaDashboardPage() {
  const { empresaId } = useParams<{ empresaId: string }>();
  const id = Number(empresaId);
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
  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      <div className="rounded-3xl bg-gradient-to-r from-emerald-900 to-emerald-700 p-7 text-white shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">Dashboard empresarial</p>
            <h1 className="mt-2 text-3xl font-bold">{dashboard.empresa.nombre}</h1>
            <p className="mt-2 text-emerald-100">{dashboard.empresa.establecimientos} establecimientos autorizados</p>
          </div>
          <Building2 size={34} className="text-emerald-200" />
        </div>
      </div>

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
                  <p className="mt-1 text-sm text-slate-500">{formatNumber(organizacion.hectareas)} ha · Plan Pro</p>
                </div>
                <span className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">Abrir</span>
              </Link>
            ))}
            {establecimientos.length === 0 && <p className="py-6 text-sm text-slate-500">No hay establecimientos autorizados.</p>}
          </div>
        </div>
      </section>
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
