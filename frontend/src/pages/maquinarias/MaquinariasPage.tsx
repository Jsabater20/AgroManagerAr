import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Wrench,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  X,
  ChevronRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { maquinariasApi } from '../../api/maquinarias.api';
import { camposApi } from '../../api/campos.api';
import type { CreateMaquinariaDto, EstadoMaquinaria, TipoMaquinaria } from '../../api/types';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const TIPO_LABEL: Record<TipoMaquinaria, string> = {
  TRACTOR: 'Tractor', SEMBRADORA: 'Sembradora', PULVERIZADORA: 'Pulverizadora',
  COSECHADORA: 'Cosechadora', CAMIONETA: 'Camioneta', MIXER: 'Mixer',
  ACOPLADO: 'Acoplado', TOLVA: 'Tolva', HERRAMIENTA: 'Herramienta', OTRO: 'Otro',
};

const ESTADO_CONFIG: Record<EstadoMaquinaria, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  OPERATIVA:        { label: 'Operativa',        color: 'text-green-700 bg-green-100',  icon: CheckCircle2 },
  EN_MANTENIMIENTO: { label: 'En mantenimiento', color: 'text-yellow-700 bg-yellow-100', icon: Clock },
  FUERA_DE_SERVICIO:{ label: 'Fuera de servicio',color: 'text-red-700 bg-red-100',      icon: AlertTriangle },
};

const TIPOS: TipoMaquinaria[] = [
  'TRACTOR','SEMBRADORA','PULVERIZADORA','COSECHADORA','CAMIONETA',
  'MIXER','ACOPLADO','TOLVA','HERRAMIENTA','OTRO',
];

const ESTADOS: EstadoMaquinaria[] = ['OPERATIVA','EN_MANTENIMIENTO','FUERA_DE_SERVICIO'];

const EMPTY: CreateMaquinariaDto = {
  nombre: '', tipo: 'TRACTOR', marca: '', modelo: '',
  anio: undefined, patente: '', estado: 'OPERATIVA',
  horasUso: undefined, seguroVencimiento: '', vtvVencimiento: '',
  observaciones: '', campoId: undefined,
};

function isAlertDate(dateStr?: string | null) {
  if (!dateStr) return false;
  const diff = new Date(dateStr).getTime() - Date.now();
  return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000; // próximos 30 días
}

function isExpired(dateStr?: string | null) {
  if (!dateStr) return false;
  return new Date(dateStr).getTime() < Date.now();
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function MaquinariasPage() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<CreateMaquinariaDto>(EMPTY);

  const { data: maquinarias = [], isLoading } = useQuery({
    queryKey: ['maquinarias'],
    queryFn: maquinariasApi.getAll,
  });

  const { data: campos = [] } = useQuery({
    queryKey: ['campos'],
    queryFn: camposApi.getAll,
  });

  const createMut = useMutation({
    mutationFn: maquinariasApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['maquinarias'] });
      toast.success('Maquinaria registrada');
      setModal(false);
      setForm(EMPTY);
    },
    onError: () => toast.error('Error al guardar'),
  });

  const deleteMut = useMutation({
    mutationFn: maquinariasApi.remove,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['maquinarias'] });
      toast.success('Maquinaria eliminada');
    },
    onError: () => toast.error('Error al eliminar'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dto: CreateMaquinariaDto = {
      ...form,
      anio: form.anio ? Number(form.anio) : undefined,
      horasUso: form.horasUso ? Number(form.horasUso) : undefined,
      campoId: form.campoId ? Number(form.campoId) : undefined,
      seguroVencimiento: form.seguroVencimiento || undefined,
      vtvVencimiento: form.vtvVencimiento || undefined,
      marca: form.marca || undefined,
      modelo: form.modelo || undefined,
      patente: form.patente || undefined,
      observaciones: form.observaciones || undefined,
    };
    createMut.mutate(dto);
  };

  const handleDelete = (id: number, nombre: string) => {
    if (!confirm(`¿Eliminar "${nombre}"? Se perderán todos sus registros.`)) return;
    deleteMut.mutate(id);
  };

  const set = (k: keyof CreateMaquinariaDto, v: unknown) =>
    setForm((p) => ({ ...p, [k]: v }));

  // Resumen alertas
  const alertas = maquinarias.filter(
    (m) =>
      isAlertDate(m.seguroVencimiento) ||
      isAlertDate(m.vtvVencimiento) ||
      isExpired(m.seguroVencimiento) ||
      isExpired(m.vtvVencimiento),
  ).length;

  const totales = {
    operativas: maquinarias.filter((m) => m.estado === 'OPERATIVA').length,
    enMant:     maquinarias.filter((m) => m.estado === 'EN_MANTENIMIENTO').length,
    fuera:      maquinarias.filter((m) => m.estado === 'FUERA_DE_SERVICIO').length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Wrench className="w-7 h-7 text-green-600" /> Maquinarias
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestión de equipos, mantenimiento y costos operativos
          </p>
        </div>
        <button
          onClick={() => setModal(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Nueva maquinaria
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{maquinarias.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-green-600 uppercase tracking-wide">Operativas</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{totales.operativas}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-yellow-600 uppercase tracking-wide">En mantenimiento</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">{totales.enMant}</p>
        </div>
        <div className={`bg-white rounded-xl border p-4 ${alertas > 0 ? 'border-red-300' : 'border-gray-200'}`}>
          <p className="text-xs text-red-500 uppercase tracking-wide">Alertas</p>
          <p className="text-3xl font-bold text-red-500 mt-1">{alertas}</p>
        </div>
      </div>

      {/* Cards */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : maquinarias.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Wrench className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-lg font-medium">Sin maquinarias registradas</p>
          <p className="text-sm">Agregá tu primer equipo para comenzar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {maquinarias.map((m) => {
            const est = ESTADO_CONFIG[m.estado];
            const EstIcon = est.icon;
            const seguroAlert = isAlertDate(m.seguroVencimiento) || isExpired(m.seguroVencimiento);
            const vtvAlert    = isAlertDate(m.vtvVencimiento)    || isExpired(m.vtvVencimiento);
            const lastMant    = m.mantenimientos?.[0];
            const totalGastos = m.gastos?.reduce((s, g) => s + g.monto, 0) ?? 0;

            return (
              <div
                key={m.id}
                className="bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all cursor-pointer group"
                onClick={() => navigate(`/maquinarias/${m.id}`)}
              >
                <div className="p-4">
                  {/* Title row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{m.nombre}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {TIPO_LABEL[m.tipo]}
                        {m.marca && ` · ${m.marca}`}
                        {m.modelo && ` ${m.modelo}`}
                        {m.anio && ` (${m.anio})`}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-green-500 shrink-0 ml-2 mt-1 transition-colors" />
                  </div>

                  {/* Estado badge */}
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${est.color}`}>
                    <EstIcon className="w-3 h-3" /> {est.label}
                  </span>

                  {/* Detalles */}
                  <div className="mt-3 space-y-1 text-xs text-gray-500">
                    {m.campo && (
                      <p>📍 Campo: <span className="text-gray-700">{m.campo.nombre}</span></p>
                    )}
                    {m.patente && (
                      <p>🪪 Patente: <span className="text-gray-700 font-mono">{m.patente}</span></p>
                    )}
                    {m.horasUso !== undefined && m.horasUso !== null && (
                      <p>⏱ Horas de uso: <span className="text-gray-700">{m.horasUso.toLocaleString('es-AR')} hs</span></p>
                    )}
                    {lastMant && (
                      <p>🔧 Último mant.: <span className="text-gray-700">{fmtDate(lastMant.fecha)}</span></p>
                    )}
                    {totalGastos > 0 && (
                      <p>💰 Gastos totales: <span className="text-gray-700 font-medium">
                        {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(totalGastos)}
                      </span></p>
                    )}
                  </div>

                  {/* Alertas */}
                  {(seguroAlert || vtvAlert) && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {seguroAlert && (
                        <span className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                          <AlertTriangle className="w-3 h-3" />
                          {isExpired(m.seguroVencimiento) ? 'Seguro vencido' : 'Seguro próx. a vencer'}
                        </span>
                      )}
                      {vtvAlert && (
                        <span className="inline-flex items-center gap-1 text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full">
                          <AlertTriangle className="w-3 h-3" />
                          {isExpired(m.vtvVencimiento) ? 'VTV vencida' : 'VTV próx. a vencer'}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(m.id, m.nombre); }}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal crear */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Nueva maquinaria</h2>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* Nombre + Tipo */}
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Nombre *</label>
                  <input
                    required
                    value={form.nombre}
                    onChange={(e) => set('nombre', e.target.value)}
                    placeholder="Ej: Tractor John Deere 5075E"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Tipo *</label>
                  <select
                    value={form.tipo}
                    onChange={(e) => set('tipo', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {TIPOS.map((t) => (
                      <option key={t} value={t}>{TIPO_LABEL[t]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Estado</label>
                  <select
                    value={form.estado}
                    onChange={(e) => set('estado', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {ESTADOS.map((e) => (
                      <option key={e} value={e}>{ESTADO_CONFIG[e].label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Marca, Modelo, Año, Patente */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Marca</label>
                  <input
                    value={form.marca ?? ''}
                    onChange={(e) => set('marca', e.target.value)}
                    placeholder="John Deere"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Modelo</label>
                  <input
                    value={form.modelo ?? ''}
                    onChange={(e) => set('modelo', e.target.value)}
                    placeholder="5075E"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Año</label>
                  <input
                    type="number"
                    min={1950}
                    max={new Date().getFullYear() + 1}
                    value={form.anio ?? ''}
                    onChange={(e) => set('anio', e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="2021"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Patente / N° serie</label>
                  <input
                    value={form.patente ?? ''}
                    onChange={(e) => set('patente', e.target.value)}
                    placeholder="AB123CD"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Campo + Horas */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Campo asignado</label>
                  <select
                    value={form.campoId ?? ''}
                    onChange={(e) => set('campoId', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Sin campo</option>
                    {campos.map((c) => (
                      <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Horas de uso actuales</label>
                  <input
                    type="number"
                    min={0}
                    value={form.horasUso ?? ''}
                    onChange={(e) => set('horasUso', e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="1500"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Vencimientos */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Venc. seguro</label>
                  <input
                    type="date"
                    value={form.seguroVencimiento ?? ''}
                    onChange={(e) => set('seguroVencimiento', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Venc. VTV / documentación</label>
                  <input
                    type="date"
                    value={form.vtvVencimiento ?? ''}
                    onChange={(e) => set('vtvVencimiento', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Observaciones */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Observaciones</label>
                <textarea
                  rows={2}
                  value={form.observaciones ?? ''}
                  onChange={(e) => set('observaciones', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={createMut.isPending}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {createMut.isPending ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
