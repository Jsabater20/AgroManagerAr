import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TrendingUp, TrendingDown, Wallet, Plus, Pencil, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { finanzasApi } from '../../api/finanzas.api';
import { camposApi } from '../../api/campos.api';
import type { CreateMovimientoDto, CategoriaMovimiento, TipoMovimiento } from '../../api/types';

const CATEGORIA_LABEL: Record<CategoriaMovimiento, string> = {
  COSECHA: 'Cosecha', VENTA_ANIMAL: 'Venta animal', INSUMO: 'Insumo',
  SERVICIO: 'Servicio', MANTENIMIENTO: 'Mantenimiento', VETERINARIA: 'Veterinaria',
  COMBUSTIBLE: 'Combustible', MANO_DE_OBRA: 'Mano de obra', OTRO: 'Otro',
};

const INGRESOS_CATS: CategoriaMovimiento[] = ['COSECHA', 'VENTA_ANIMAL', 'OTRO'];
const EGRESOS_CATS:  CategoriaMovimiento[] = ['INSUMO', 'SERVICIO', 'MANTENIMIENTO', 'VETERINARIA', 'COMBUSTIBLE', 'MANO_DE_OBRA', 'OTRO'];

const AR$ = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });

const EMPTY: CreateMovimientoDto = {
  tipo: 'INGRESO', concepto: '', monto: 0, fecha: new Date().toISOString().slice(0, 10),
  categoria: 'COSECHA', campoId: undefined, observaciones: '',
};

export default function FinanzasPage() {
  const qc = useQueryClient();
  const [tipoFiltro, setTipoFiltro] = useState<'' | TipoMovimiento>('');
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<CreateMovimientoDto>(EMPTY);

  const { data: movimientos = [], isLoading } = useQuery({ queryKey: ['finanzas'], queryFn: finanzasApi.getAll });
  const { data: resumen } = useQuery({ queryKey: ['finanzas-resumen'], queryFn: finanzasApi.resumen });
  const { data: campos = [] } = useQuery({ queryKey: ['campos'], queryFn: camposApi.getAll });

  const createMut = useMutation({
    mutationFn: finanzasApi.create,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['finanzas'] }); qc.invalidateQueries({ queryKey: ['finanzas-resumen'] }); toast.success('Movimiento registrado'); closeModal(); },
    onError: () => toast.error('Error al guardar'),
  });
  const updateMut = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: Partial<CreateMovimientoDto> }) => finanzasApi.update(id, dto),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['finanzas'] }); qc.invalidateQueries({ queryKey: ['finanzas-resumen'] }); toast.success('Movimiento actualizado'); closeModal(); },
    onError: () => toast.error('Error al actualizar'),
  });
  const deleteMut = useMutation({
    mutationFn: finanzasApi.remove,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['finanzas'] }); qc.invalidateQueries({ queryKey: ['finanzas-resumen'] }); toast.success('Movimiento eliminado'); },
    onError: () => toast.error('Error al eliminar'),
  });

  const filtered = movimientos.filter(m => !tipoFiltro || m.tipo === tipoFiltro);

  const openCreate = () => { setForm(EMPTY); setEditId(null); setModal(true); };
  const openEdit   = (m: typeof movimientos[0]) => {
    setForm({ tipo: m.tipo, concepto: m.concepto, monto: m.monto,
      fecha: m.fecha.slice(0, 10), categoria: m.categoria,
      campoId: m.campoId, observaciones: m.observaciones ?? '' });
    setEditId(m.id); setModal(true);
  };
  const closeModal = () => { setModal(false); setEditId(null); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dto = { ...form, monto: Number(form.monto), campoId: form.campoId ? Number(form.campoId) : undefined };
    if (editId) updateMut.mutate({ id: editId, dto });
    else createMut.mutate(dto);
  };

  const categoriasDisponibles = form.tipo === 'INGRESO' ? INGRESOS_CATS : EGRESOS_CATS;

  const saldoPositivo = (resumen?.saldo ?? 0) >= 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Finanzas</h1>
          <p className="text-gray-500 text-sm mt-1">Ingresos, egresos y saldo del establecimiento</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm">
          <Plus size={16} /> Registrar movimiento
        </button>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-50 p-2.5 rounded-xl"><TrendingUp size={18} className="text-green-600" /></div>
            <p className="text-sm font-medium text-gray-600">Ingresos totales</p>
          </div>
          <p className="text-2xl font-bold text-green-700">{AR$(resumen?.ingresos ?? 0)}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-red-50 p-2.5 rounded-xl"><TrendingDown size={18} className="text-red-600" /></div>
            <p className="text-sm font-medium text-gray-600">Egresos totales</p>
          </div>
          <p className="text-2xl font-bold text-red-600">{AR$(resumen?.egresos ?? 0)}</p>
        </div>
        <div className={`rounded-2xl p-5 border shadow-sm ${saldoPositivo ? 'bg-green-700 border-green-700' : 'bg-red-600 border-red-600'}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/20 p-2.5 rounded-xl"><Wallet size={18} className="text-white" /></div>
            <p className="text-sm font-medium text-white/80">Saldo neto</p>
          </div>
          <p className="text-2xl font-bold text-white">{AR$(resumen?.saldo ?? 0)}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-4">
        {(['', 'INGRESO', 'EGRESO'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTipoFiltro(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
              tipoFiltro === t
                ? t === 'INGRESO' ? 'bg-green-700 text-white border-green-700'
                  : t === 'EGRESO' ? 'bg-red-600 text-white border-red-600'
                  : 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {t === '' ? 'Todos' : t === 'INGRESO' ? 'Ingresos' : 'Egresos'}
          </button>
        ))}
        <span className="ml-auto text-sm text-gray-400 self-center">{filtered.length} registros</span>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-400">Cargando...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Wallet size={32} className="mx-auto mb-2 opacity-30" />
            <p>No hay movimientos registrados</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100">
              <tr>
                {['Fecha', 'Tipo', 'Concepto', 'Categoría', 'Campo', 'Monto', ''].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{fmtDate(m.fecha)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${m.tipo === 'INGRESO' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {m.tipo === 'INGRESO' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                      {m.tipo === 'INGRESO' ? 'Ingreso' : 'Egreso'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-gray-900">{m.concepto}</td>
                  <td className="px-5 py-3.5 text-gray-500">{CATEGORIA_LABEL[m.categoria]}</td>
                  <td className="px-5 py-3.5 text-gray-400">{m.campo?.nombre ?? '-'}</td>
                  <td className={`px-5 py-3.5 font-bold text-base ${m.tipo === 'INGRESO' ? 'text-green-700' : 'text-red-600'}`}>
                    {m.tipo === 'INGRESO' ? '+' : '-'}{AR$(m.monto)}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(m)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => { if (confirm('¿Eliminar este movimiento?')) deleteMut.mutate(m.id); }}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">{editId ? 'Editar movimiento' : 'Nuevo movimiento'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Tipo */}
              <div className="flex gap-2">
                {(['INGRESO', 'EGRESO'] as TipoMovimiento[]).map(t => (
                  <button key={t} type="button"
                    onClick={() => setForm(f => ({ ...f, tipo: t, categoria: t === 'INGRESO' ? 'COSECHA' : 'INSUMO' }))}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                      form.tipo === t
                        ? t === 'INGRESO' ? 'bg-green-700 text-white border-green-700' : 'bg-red-600 text-white border-red-600'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >{t === 'INGRESO' ? '+ Ingreso' : '- Egreso'}</button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Concepto *</label>
                <input required value={form.concepto} onChange={e => setForm(f => ({ ...f, concepto: e.target.value }))}
                  className="input" placeholder="Ej: Venta soja campaña 25/26" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Monto (ARS) *</label>
                  <input required type="number" min="0" step="0.01" value={form.monto || ''}
                    onChange={e => setForm(f => ({ ...f, monto: Number(e.target.value) }))}
                    className="input" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Fecha *</label>
                  <input required type="date" value={form.fecha}
                    onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))}
                    className="input" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Categoría</label>
                <select value={form.categoria} onChange={e => setForm(f => ({ ...f, categoria: e.target.value as CategoriaMovimiento }))}
                  className="input">
                  {categoriasDisponibles.map(c => <option key={c} value={c}>{CATEGORIA_LABEL[c]}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Campo (opcional)</label>
                <select value={form.campoId ?? ''} onChange={e => setForm(f => ({ ...f, campoId: e.target.value ? Number(e.target.value) : undefined }))}
                  className="input">
                  <option value="">Sin campo</option>
                  {campos.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Observaciones</label>
                <textarea value={form.observaciones ?? ''} onChange={e => setForm(f => ({ ...f, observaciones: e.target.value }))}
                  className="input resize-none" rows={2} />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  Cancelar
                </button>
                <button type="submit" disabled={createMut.isPending || updateMut.isPending}
                  className="flex-1 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white text-sm font-semibold disabled:opacity-60 transition-colors">
                  {editId ? 'Guardar cambios' : 'Registrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
