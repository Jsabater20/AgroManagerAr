import { Download, FileText, Filter, ShieldCheck } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { empresasApi, type AuditoriaEmpresaRegistro } from '../../api/empresas.api';
import { exportToExcel, exportToPdf } from '../../utils/export';
import { Header, PageState } from './EmpresaMiembrosPage';

const LIMITE = 50;

export default function EmpresaAuditoriaPage() {
  const { empresaId } = useParams<{ empresaId: string }>();
  const id = Number(empresaId);
  const [organizacionId, setOrganizacionId] = useState<number>();
  const [accion, setAccion] = useState('');
  const [pagina, setPagina] = useState(1);
  const organizacionesQuery = useQuery({ queryKey: ['empresa-organizaciones', id], queryFn: () => empresasApi.obtenerOrganizaciones(id), enabled: id > 0 });
  const auditoriaQuery = useQuery({ queryKey: ['empresa-auditoria', id, organizacionId, accion, pagina], queryFn: () => empresasApi.obtenerAuditoria(id, { organizacionId, accion: accion || undefined, limite: LIMITE, offset: (pagina - 1) * LIMITE }), enabled: id > 0 });
  if (organizacionesQuery.isLoading || auditoriaQuery.isLoading) return <PageState message="Cargando la auditoría empresarial..." />;
  if (organizacionesQuery.isError || auditoriaQuery.isError || !auditoriaQuery.data) return <PageState message="No pudimos cargar la auditoría. Requiere permiso de administración empresarial." />;

  const registros = auditoriaQuery.data.registros;
  const acciones = [...new Set(registros.map((registro) => registro.accion))];
  const totalPaginas = Math.max(1, Math.ceil(auditoriaQuery.data.total / LIMITE));
  const exportarExcel = () => exportToExcel(registros.map(filaAuditoria), `auditoria-empresa-${id}`, 'Auditoría');
  const exportarPdf = () => exportToPdf('Auditoría empresarial', ['Fecha', 'Establecimiento', 'Usuario', 'Acción', 'Entidad'], registros.map((registro) => [fecha(registro.createdAt), registro.organizacion?.nombre ?? '-', registro.usuario.email, registro.accion, registro.entidad ?? '-']) as never, `auditoria-empresa-${id}`);

  return <div className="mx-auto max-w-6xl space-y-6 p-6">
    <div className="flex flex-wrap items-start justify-between gap-4"><Header empresaId={id} title="Auditoría empresarial" description="Trazabilidad consolidada de acciones en los establecimientos autorizados." icon={ShieldCheck} /><div className="flex gap-2"><button onClick={exportarExcel} disabled={!registros.length} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50"><Download size={16} />Excel</button><button onClick={exportarPdf} disabled={!registros.length} className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"><FileText size={16} />PDF</button></div></div>
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center gap-2 text-sm font-semibold text-slate-700"><Filter size={16} className="text-emerald-700" />Filtros</div><div className="mt-3 grid gap-3 sm:grid-cols-2"><select value={organizacionId ?? ''} onChange={(event) => { setOrganizacionId(event.target.value ? Number(event.target.value) : undefined); setPagina(1); }} className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"><option value="">Todos los establecimientos autorizados</option>{(organizacionesQuery.data ?? []).map((organizacion) => <option key={organizacion.id} value={organizacion.id}>{organizacion.nombre}</option>)}</select><select value={accion} onChange={(event) => { setAccion(event.target.value); setPagina(1); }} className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"><option value="">Todas las acciones</option>{acciones.map((valor) => <option key={valor} value={valor}>{valor}</option>)}</select></div></section>
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Fecha</th><th className="px-5 py-3">Establecimiento</th><th className="px-5 py-3">Usuario</th><th className="px-5 py-3">Acción</th><th className="px-5 py-3">Entidad</th><th className="px-5 py-3">Cambios</th></tr></thead><tbody className="divide-y divide-slate-100">{registros.map((registro) => <tr key={registro.id}><td className="whitespace-nowrap px-5 py-4 text-slate-600">{fecha(registro.createdAt)}</td><td className="px-5 py-4 text-slate-700">{registro.organizacion?.nombre ?? '-'}</td><td className="px-5 py-4"><p className="font-medium text-slate-800">{registro.usuario.nombre} {registro.usuario.apellido}</p><p className="text-xs text-slate-500">{registro.usuario.email}</p></td><td className="px-5 py-4"><span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">{registro.accion}</span></td><td className="px-5 py-4 text-slate-600">{registro.entidad ?? '-'}</td><td className="max-w-xs px-5 py-4 text-xs text-slate-500">{resumirCambios(registro)}</td></tr>)}{!registros.length && <tr><td className="px-5 py-10 text-center text-slate-500" colSpan={6}>No hay registros para estos filtros.</td></tr>}</tbody></table></div></section>
    <div className="flex items-center justify-between text-sm"><span className="text-slate-500">{auditoriaQuery.data.total} registros</span><div className="flex items-center gap-3"><button onClick={() => setPagina((valor) => Math.max(1, valor - 1))} disabled={pagina === 1} className="rounded-lg border border-slate-200 px-3 py-2 font-semibold text-slate-600 disabled:opacity-50">Anterior</button><span className="text-slate-600">Página {pagina} de {totalPaginas}</span><button onClick={() => setPagina((valor) => Math.min(totalPaginas, valor + 1))} disabled={pagina === totalPaginas} className="rounded-lg border border-slate-200 px-3 py-2 font-semibold text-slate-600 disabled:opacity-50">Siguiente</button></div></div>
  </div>;
}

function filaAuditoria(registro: AuditoriaEmpresaRegistro) { return { Fecha: fecha(registro.createdAt), Establecimiento: registro.organizacion?.nombre ?? '-', Usuario: registro.usuario.email, Acción: registro.accion, Entidad: registro.entidad ?? '-', Cambios: resumirCambios(registro) }; }
function fecha(valor: string) { return new Intl.DateTimeFormat('es-AR', { dateStyle: 'short', timeStyle: 'medium' }).format(new Date(valor)); }
function resumirCambios(registro: AuditoriaEmpresaRegistro) { if (!registro.cambios) return '-'; try { return JSON.stringify(JSON.parse(registro.cambios)); } catch { return registro.cambios; } }
