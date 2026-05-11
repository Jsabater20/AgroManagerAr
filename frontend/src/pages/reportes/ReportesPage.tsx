import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FileSpreadsheet, FileText, Wheat, FlaskConical, PawPrint, ClipboardList, Download } from 'lucide-react';
import { camposApi } from '../../api/campos.api';
import { siembrasApi } from '../../api/siembras.api';
import { insumosApi } from '../../api/insumos.api';
import { ganadoApi } from '../../api/ganado.api';
import { tareasApi } from '../../api/tareas.api';
import { exportToExcel, exportToPdf } from '../../utils/export';
import type { Siembra, Insumo, Animal, TareaRural } from '../../api/types';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });

const ESTADO_SIEMBRA: Record<string, string> = { EN_CURSO: 'En curso', COSECHADA: 'Cosechada', PERDIDA: 'Perdida' };
const ESTADO_TAREA: Record<string, string> = { PENDIENTE: 'Pendiente', EN_CURSO: 'En curso', COMPLETADA: 'Completada', CANCELADA: 'Cancelada' };
const TIPO_INSUMO: Record<string, string> = { FERTILIZANTE: 'Fertilizante', HERBICIDA: 'Herbicida', FUNGICIDA: 'Fungicida', INSECTICIDA: 'Insecticida', SEMILLA: 'Semilla', OTRO: 'Otro' };
const ESPECIE: Record<string, string> = { BOVINO: 'Bovino', PORCINO: 'Porcino', EQUINO: 'Equino', OVINO: 'Ovino', CAPRINO: 'Caprino', AVIAR: 'Aviar' };
const PRIORIDAD: Record<string, string> = { BAJA: 'Baja', MEDIA: 'Media', ALTA: 'Alta', URGENTE: 'Urgente' };
const PRIORIDAD_COLOR: Record<string, string> = { BAJA: 'bg-gray-100 text-gray-600', MEDIA: 'bg-blue-100 text-blue-700', ALTA: 'bg-orange-100 text-orange-700', URGENTE: 'bg-red-100 text-red-700' };
const ESTADO_TAREA_COLOR: Record<string, string> = { PENDIENTE: 'bg-yellow-100 text-yellow-700', EN_CURSO: 'bg-blue-100 text-blue-700', COMPLETADA: 'bg-green-100 text-green-700', CANCELADA: 'bg-gray-100 text-gray-500' };

// ─── Tabs ─────────────────────────────────────────────────────────────────────

const TABS = [
  { key: 'siembras',  label: 'Siembras',  icon: Wheat },
  { key: 'insumos',   label: 'Insumos',   icon: FlaskConical },
  { key: 'animales',  label: 'Animales',  icon: PawPrint },
  { key: 'tareas',    label: 'Tareas',    icon: ClipboardList },
] as const;

type Tab = typeof TABS[number]['key'];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReportesPage() {
  const [tab, setTab] = useState<Tab>('siembras');

  const { data: campos }   = useQuery({ queryKey: ['campos'],   queryFn: camposApi.getAll });
  const { data: siembras } = useQuery({ queryKey: ['siembras'], queryFn: siembrasApi.getAll });
  const { data: insumos }  = useQuery({ queryKey: ['insumos'],  queryFn: insumosApi.getAll });
  const { data: animales } = useQuery({ queryKey: ['ganado'],   queryFn: ganadoApi.getAll });
  const { data: tareas }   = useQuery({ queryKey: ['tareas'],   queryFn: tareasApi.getAll });

  const totalHa = campos?.reduce((a, c) => a + c.hectareas, 0) ?? 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reportes</h1>
        <p className="text-gray-500 text-sm mt-1">Visualizá y exportá la información de tu establecimiento</p>
      </div>

      {/* Resumen rápido */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Campos', value: campos?.length ?? 0, sub: `${totalHa.toLocaleString('es-AR')} ha` },
          { label: 'Siembras', value: siembras?.length ?? 0, sub: `${siembras?.filter(s => s.estado === 'EN_CURSO').length ?? 0} en curso` },
          { label: 'Animales', value: animales?.length ?? 0, sub: `${animales?.reduce((a, an) => a + an.preneces.filter(p => p.estado === 'EN_CURSO').length, 0) ?? 0} preñeces` },
          { label: 'Tareas', value: tareas?.length ?? 0, sub: `${tareas?.filter(t => t.estado === 'PENDIENTE').length ?? 0} pendientes` },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm font-medium text-gray-700">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Panel principal */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6 pt-4 gap-1">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors -mb-px border-b-2 ${
                tab === key
                  ? 'text-green-700 border-green-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* Contenido por tab */}
        <div className="p-6">
          {tab === 'siembras' && <SiembrasReport siembras={siembras ?? []} />}
          {tab === 'insumos'  && <InsumosReport  insumos={insumos ?? []} />}
          {tab === 'animales' && <AnimalesReport animales={animales ?? []} />}
          {tab === 'tareas'   && <TareasReport   tareas={tareas ?? []} />}
        </div>
      </div>
    </div>
  );
}

// ─── Botones de exportación ───────────────────────────────────────────────────

function ExportButtons({ onExcel, onPdf }: { onExcel: () => void; onPdf: () => void }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onExcel}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-medium hover:bg-emerald-100 transition-colors"
      >
        <FileSpreadsheet size={15} />
        Excel
      </button>
      <button
        onClick={onPdf}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100 transition-colors"
      >
        <FileText size={15} />
        PDF
      </button>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="text-center py-12 text-gray-400">
      <Download size={32} className="mx-auto mb-2 opacity-30" />
      <p className="text-sm">No hay {label} para mostrar</p>
    </div>
  );
}

// ─── Reporte Siembras ─────────────────────────────────────────────────────────

function SiembrasReport({ siembras }: { siembras: Siembra[] }) {
  const [estadoFiltro, setEstadoFiltro] = useState('');

  const filtered = siembras.filter(s => !estadoFiltro || s.estado === estadoFiltro);

  const handleExcel = () => {
    const rows = filtered.map(s => ({
      'Campo': s.lote.campo.nombre,
      'Lote': s.lote.nombre,
      'Cultivo': s.tipoCultivo.nombre,
      'Fecha siembra': fmtDate(s.fechaSiembra),
      'Estado': ESTADO_SIEMBRA[s.estado],
      'Cosechas': s.cosechas.length,
      'Total kg': s.cosechas.reduce((a, c) => a + c.totalKg, 0),
      'Rend. prom. kg/ha': s.cosechas.length
        ? Math.round(s.cosechas.reduce((a, c) => a + c.rendimientoKgHa, 0) / s.cosechas.length)
        : '',
      'Observaciones': s.observaciones ?? '',
    }));
    exportToExcel(rows, 'reporte-siembras', 'Siembras');
  };

  const handlePdf = () => {
    const cols = ['Campo', 'Lote', 'Cultivo', 'Fecha siembra', 'Estado', 'Cosechas', 'Total kg', 'kg/ha prom.'];
    const rows = filtered.map(s => [
      s.lote.campo.nombre,
      s.lote.nombre,
      s.tipoCultivo.nombre,
      fmtDate(s.fechaSiembra),
      ESTADO_SIEMBRA[s.estado],
      s.cosechas.length,
      s.cosechas.reduce((a, c) => a + c.totalKg, 0).toLocaleString('es-AR'),
      s.cosechas.length
        ? Math.round(s.cosechas.reduce((a, c) => a + c.rendimientoKgHa, 0) / s.cosechas.length).toLocaleString('es-AR')
        : '-',
    ]);
    exportToPdf('Reporte de Siembras', cols, rows as never, 'reporte-siembras');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-500">{filtered.length} registros</p>
          <select
            value={estadoFiltro}
            onChange={e => setEstadoFiltro(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Todos los estados</option>
            <option value="EN_CURSO">En curso</option>
            <option value="COSECHADA">Cosechada</option>
            <option value="PERDIDA">Perdida</option>
          </select>
        </div>
        <ExportButtons onExcel={handleExcel} onPdf={handlePdf} />
      </div>

      {filtered.length === 0 ? <EmptyState label="siembras" /> : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Campo', 'Lote', 'Cultivo', 'Fecha siembra', 'Estado', 'Cosechas', 'Total kg', 'kg/ha prom.'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(s => {
                const totalKg = s.cosechas.reduce((a, c) => a + c.totalKg, 0);
                const promKgHa = s.cosechas.length
                  ? Math.round(s.cosechas.reduce((a, c) => a + c.rendimientoKgHa, 0) / s.cosechas.length)
                  : null;
                return (
                  <tr key={s.id} className="hover:bg-gray-50/50">
                    <td className="py-3 pr-4 font-medium text-gray-900">{s.lote.campo.nombre}</td>
                    <td className="py-3 pr-4 text-gray-600">{s.lote.nombre}</td>
                    <td className="py-3 pr-4 text-gray-600">{s.tipoCultivo.nombre}</td>
                    <td className="py-3 pr-4 text-gray-600">{fmtDate(s.fechaSiembra)}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        s.estado === 'EN_CURSO' ? 'bg-blue-100 text-blue-700' :
                        s.estado === 'COSECHADA' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>{ESTADO_SIEMBRA[s.estado]}</span>
                    </td>
                    <td className="py-3 pr-4 text-gray-600 text-center">{s.cosechas.length}</td>
                    <td className="py-3 pr-4 text-gray-600">{totalKg > 0 ? `${totalKg.toLocaleString('es-AR')} kg` : '-'}</td>
                    <td className="py-3 text-gray-600">{promKgHa ? `${promKgHa.toLocaleString('es-AR')} kg/ha` : '-'}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-gray-200">
                <td colSpan={6} className="pt-3 text-xs font-semibold text-gray-500">TOTALES</td>
                <td className="pt-3 text-sm font-bold text-gray-900">
                  {filtered.reduce((a, s) => a + s.cosechas.reduce((b, c) => b + c.totalKg, 0), 0).toLocaleString('es-AR')} kg
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Reporte Insumos ──────────────────────────────────────────────────────────

function InsumosReport({ insumos }: { insumos: Insumo[] }) {
  const [tipoFiltro, setTipoFiltro] = useState('');

  const filtered = insumos.filter(i => !tipoFiltro || i.tipo === tipoFiltro);

  const tipos = [...new Set(insumos.map(i => i.tipo))];

  const handleExcel = () => {
    const rows = filtered.map(i => ({
      'Nombre': i.nombre,
      'Tipo': TIPO_INSUMO[i.tipo],
      'Unidad': i.unidad,
      'Descripción': i.descripcion ?? '',
    }));
    exportToExcel(rows, 'reporte-insumos', 'Insumos');
  };

  const handlePdf = () => {
    const cols = ['Nombre', 'Tipo', 'Unidad', 'Descripción'];
    const rows = filtered.map(i => [
      i.nombre,
      TIPO_INSUMO[i.tipo],
      i.unidad,
      i.descripcion ?? '-',
    ]);
    exportToPdf('Reporte de Insumos', cols, rows as never, 'reporte-insumos');
  };

  // Conteo por tipo
  const porTipo = tipos.map(t => ({ tipo: t, count: insumos.filter(i => i.tipo === t).length }))
    .sort((a, b) => b.count - a.count);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-500">{filtered.length} registros</p>
          <select
            value={tipoFiltro}
            onChange={e => setTipoFiltro(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Todos los tipos</option>
            {Object.entries(TIPO_INSUMO).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <ExportButtons onExcel={handleExcel} onPdf={handlePdf} />
      </div>

      {/* Distribución por tipo */}
      {porTipo.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {porTipo.map(({ tipo, count }) => (
            <button
              key={tipo}
              onClick={() => setTipoFiltro(tipoFiltro === tipo ? '' : tipo)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                tipoFiltro === tipo ? 'bg-green-700 text-white border-green-700' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {TIPO_INSUMO[tipo]}
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${tipoFiltro === tipo ? 'bg-white/20' : 'bg-gray-200'}`}>{count}</span>
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? <EmptyState label="insumos" /> : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Nombre', 'Tipo', 'Unidad', 'Descripción'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(i => (
                <tr key={i.id} className="hover:bg-gray-50/50">
                  <td className="py-3 pr-4 font-medium text-gray-900">{i.nombre}</td>
                  <td className="py-3 pr-4">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      {TIPO_INSUMO[i.tipo]}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-gray-600">{i.unidad}</td>
                  <td className="py-3 text-gray-400">{i.descripcion ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Reporte Animales ─────────────────────────────────────────────────────────

function AnimalesReport({ animales }: { animales: Animal[] }) {
  const [especieFiltro, setEspecieFiltro] = useState('');

  const filtered = animales.filter(a => !especieFiltro || a.especie === especieFiltro);

  const handleExcel = () => {
    const rows = filtered.map(a => ({
      'Nombre': a.nombre,
      'Especie': ESPECIE[a.especie],
      'Sexo': a.sexo === 'MACHO' ? 'Macho' : 'Hembra',
      'Categoría': a.categoria,
      'Peso (kg)': a.peso ?? '',
      'Fecha nacimiento': a.fechaNacimiento ? fmtDate(a.fechaNacimiento) : '',
      'Preñeces totales': a.preneces.length,
      'Preñeces en curso': a.preneces.filter(p => p.estado === 'EN_CURSO').length,
      'Observaciones': a.observaciones ?? '',
    }));
    exportToExcel(rows, 'reporte-animales', 'Animales');
  };

  const handlePdf = () => {
    const cols = ['Nombre', 'Especie', 'Sexo', 'Categoría', 'Peso (kg)', 'Preñeces', 'Nac.'];
    const rows = filtered.map(a => [
      a.nombre,
      ESPECIE[a.especie],
      a.sexo === 'MACHO' ? 'Macho' : 'Hembra',
      a.categoria,
      a.peso ?? '-',
      `${a.preneces.filter(p => p.estado === 'EN_CURSO').length}/${a.preneces.length}`,
      a.fechaNacimiento ? fmtDate(a.fechaNacimiento) : '-',
    ]);
    exportToPdf('Reporte de Animales', cols, rows as never, 'reporte-animales');
  };

  // Resumen por especie
  const especiesPresentes = [...new Set(animales.map(a => a.especie))];

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-500">{filtered.length} animales</p>
          <select
            value={especieFiltro}
            onChange={e => setEspecieFiltro(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Todas las especies</option>
            {Object.entries(ESPECIE).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <ExportButtons onExcel={handleExcel} onPdf={handlePdf} />
      </div>

      {/* Resumen por especie */}
      {especiesPresentes.length > 1 && (
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
          {especiesPresentes.map(esp => {
            const count = animales.filter(a => a.especie === esp).length;
            return (
              <div key={esp} className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-gray-900">{count}</p>
                <p className="text-xs text-gray-500">{ESPECIE[esp]}</p>
              </div>
            );
          })}
        </div>
      )}

      {filtered.length === 0 ? <EmptyState label="animales" /> : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Nombre', 'Especie', 'Sexo', 'Categoría', 'Peso', 'Preñeces', 'Fecha nac.'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(a => {
                const prenezActiva = a.preneces.find(p => p.estado === 'EN_CURSO');
                return (
                  <tr key={a.id} className="hover:bg-gray-50/50">
                    <td className="py-3 pr-4 font-medium text-gray-900">{a.nombre}</td>
                    <td className="py-3 pr-4 text-gray-600">{ESPECIE[a.especie]}</td>
                    <td className="py-3 pr-4 text-gray-600">{a.sexo === 'MACHO' ? 'Macho' : 'Hembra'}</td>
                    <td className="py-3 pr-4 text-gray-600">{a.categoria}</td>
                    <td className="py-3 pr-4 text-gray-600">{a.peso ? `${a.peso} kg` : '-'}</td>
                    <td className="py-3 pr-4">
                      {prenezActiva ? (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-700">
                          En curso
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">{a.preneces.length} hist.</span>
                      )}
                    </td>
                    <td className="py-3 text-gray-400 text-xs">
                      {a.fechaNacimiento ? fmtDate(a.fechaNacimiento) : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Reporte Tareas ───────────────────────────────────────────────────────────

function TareasReport({ tareas }: { tareas: TareaRural[] }) {
  const [estadoFiltro, setEstadoFiltro] = useState('');

  const filtered = tareas.filter(t => !estadoFiltro || t.estado === estadoFiltro);

  const completadas = tareas.filter(t => t.estado === 'COMPLETADA').length;
  const completadaRate = tareas.length ? Math.round((completadas / tareas.length) * 100) : 0;

  const handleExcel = () => {
    const rows = filtered.map(t => ({
      'Título': t.titulo,
      'Tipo': t.tipo,
      'Prioridad': PRIORIDAD[t.prioridad],
      'Estado': ESTADO_TAREA[t.estado],
      'Campo': t.campo?.nombre ?? '',
      'Fecha programada': fmtDate(t.fechaProgramada),
      'Fecha completada': t.fechaCompletada ? fmtDate(t.fechaCompletada) : '',
      'Descripción': t.descripcion ?? '',
    }));
    exportToExcel(rows, 'reporte-tareas', 'Tareas');
  };

  const handlePdf = () => {
    const cols = ['Título', 'Tipo', 'Prioridad', 'Estado', 'Campo', 'F. programada', 'F. completada'];
    const rows = filtered.map(t => [
      t.titulo,
      t.tipo,
      PRIORIDAD[t.prioridad],
      ESTADO_TAREA[t.estado],
      t.campo?.nombre ?? '-',
      fmtDate(t.fechaProgramada),
      t.fechaCompletada ? fmtDate(t.fechaCompletada) : '-',
    ]);
    exportToPdf('Reporte de Tareas', cols, rows as never, 'reporte-tareas');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-500">{filtered.length} registros</p>
          <select
            value={estadoFiltro}
            onChange={e => setEstadoFiltro(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Todos los estados</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="EN_CURSO">En curso</option>
            <option value="COMPLETADA">Completada</option>
            <option value="CANCELADA">Cancelada</option>
          </select>
        </div>
        <ExportButtons onExcel={handleExcel} onPdf={handlePdf} />
      </div>

      {/* Mini resumen */}
      {tareas.length > 0 && (
        <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-xl">
          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${completadaRate}%` }} />
          </div>
          <p className="text-sm font-semibold text-gray-700 shrink-0">{completadaRate}% completadas</p>
          <p className="text-xs text-gray-400 shrink-0">{completadas}/{tareas.length}</p>
        </div>
      )}

      {filtered.length === 0 ? <EmptyState label="tareas" /> : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Título', 'Tipo', 'Prioridad', 'Estado', 'Campo', 'F. programada', 'F. completada'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-gray-50/50">
                  <td className="py-3 pr-4 font-medium text-gray-900">{t.titulo}</td>
                  <td className="py-3 pr-4 text-gray-500 text-xs">{t.tipo}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${PRIORIDAD_COLOR[t.prioridad]}`}>
                      {PRIORIDAD[t.prioridad]}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${ESTADO_TAREA_COLOR[t.estado]}`}>
                      {ESTADO_TAREA[t.estado]}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-gray-500">{t.campo?.nombre ?? '-'}</td>
                  <td className="py-3 pr-4 text-gray-500">{fmtDate(t.fechaProgramada)}</td>
                  <td className="py-3 text-gray-400">{t.fechaCompletada ? fmtDate(t.fechaCompletada) : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
