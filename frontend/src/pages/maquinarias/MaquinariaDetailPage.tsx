import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft,
  Wrench,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Pencil,
  X,
  Save,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { maquinariasApi } from '../../api/maquinarias.api';
import { camposApi } from '../../api/campos.api';
import type {
  CreateGastoDto,
  CreateMantenimientoDto,
  EstadoMaquinaria,
  TipoGastoMaq,
  TipoMaquinaria,
  TipoMantenimiento,
} from '../../api/types';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const TIPO_LABEL: Record<TipoMaquinaria, string> = {
  TRACTOR: 'Tractor', SEMBRADORA: 'Sembradora', PULVERIZADORA: 'Pulverizadora',
  COSECHADORA: 'Cosechadora', CAMIONETA: 'Camioneta', MIXER: 'Mixer',
  ACOPLADO: 'Acoplado', TOLVA: 'Tolva', HERRAMIENTA: 'Herramienta', OTRO: 'Otro',
};

const ESTADO_CONFIG: Record<EstadoMaquinaria, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  OPERATIVA:        { label: 'Operativa',        color: 'text-green-700 bg-green-100',   icon: CheckCircle2 },
  EN_MANTENIMIENTO: { label: 'En mantenimiento', color: 'text-yellow-700 bg-yellow-100', icon: Clock },
  FUERA_DE_SERVICIO:{ label: 'Fuera de servicio',color: 'text-red-700 bg-red-100',       icon: AlertTriangle },
};

const TIPO_MANT_LABEL: Record<TipoMantenimiento, string> = {
  CAMBIO_ACEITE: 'Cambio de aceite', REVISION_GENERAL: 'Revisión general',
  REPARACION: 'Reparación', OTRO: 'Otro',
};

const TIPO_GASTO_LABEL: Record<TipoGastoMaq, string> = {
  COMBUSTIBLE: 'Combustible', REPARACION: 'Reparación', REPUESTO: 'Repuesto',
  SERVICIO: 'Servicio', SEGURO: 'Seguro', OTRO: 'Otro',
};

const ESTADOS: EstadoMaquinaria[] = ['OPERATIVA','EN_MANTENIMIENTO','FUERA_DE_SERVICIO'];
const TIPOS_MAQ: TipoMaquinaria[] = [
  'TRACTOR','SEMBRADORA','PULVERIZADORA','COSECHADORA','CAMIONETA',
  'MIXER','ACOPLADO','TOLVA','HERRAMIENTA','OTRO',
];
const TIPOS_MANT: TipoMantenimiento[] = ['CAMBIO_ACEITE','REVISION_GENERAL','REPARACION','OTRO'];
const TIPOS_GASTO: TipoGastoMaq[] = ['COMBUSTIBLE','REPARACION','REPUESTO','SERVICIO','SEGURO','OTRO'];

const AR$ = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });

function isAlertDate(dateStr?: string | null) {
  if (!dateStr) return false;
  const diff = new Date(dateStr).getTime() - Date.now();
  return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
}
function isExpired(dateStr?: string | null) {
  if (!dateStr) return false;
  return new Date(dateStr).getTime() < Date.now();
}

// ─── Sub-components ──────────────────────────────────────────────────────────

type Tab = 'mantenimiento' | 'gastos';

const EMPTY_MANT: CreateMantenimientoDto = {
  tipo: 'CAMBIO_ACEITE', descripcion: '', fecha: new Date().toISOString().slice(0, 10),
  horasUso: undefined, costo: undefined, proximoMantenimiento: '', observaciones: '',
};

const EMPTY_GASTO: CreateGastoDto = {
  tipo: 'COMBUSTIBLE', descripcion: '', monto: 0,
  fecha: new Date().toISOString().slice(0, 10), observaciones: '',
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function MaquinariaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const maqId = Number(id);

  const [tab, setTab] = useState<Tab>('mantenimiento');
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Record<string, unknown>>({});
  const [mantModal, setMantModal] = useState(false);
  const [gastoModal, setGastoModal] = useState(false);
  const [mantForm, setMantForm] = useState<CreateMantenimientoDto>(EMPTY_MANT);
  const [gastoForm, setGastoForm] = useState<CreateGastoDto>(EMPTY_GASTO);

  const { data: maq, isLoading } = useQuery({
    queryKey: ['maquinarias', maqId],
    queryFn: () => maquinariasApi.getOne(maqId),
    enabled: !isNaN(maqId),
  });

  const { data: campos = [] } = useQuery({
    queryKey: ['campos'],
    queryFn: camposApi.getAll,
  });

  // Mutations
  const updateMut = useMutation({
    mutationFn: (dto: Record<string, unknown>) => maquinariasApi.update(maqId, dto as never),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['maquinarias', maqId] });
      qc.invalidateQueries({ queryKey: ['maquinarias'] });
      toast.success('Maquinaria actualizada');
      setEditMode(false);
    },
    onError: () => toast.error('Error al actualizar'),
  });

  const deleteMaqMut = useMutation({
    mutationFn: () => maquinariasApi.remove(maqId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['maquinarias'] });
      toast.success('Maquinaria eliminada');
      navigate('/maquinarias');
    },
    onError: () => toast.error('Error al eliminar'),
  });

  const addMantMut = useMutation({
    mutationFn: (dto: CreateMantenimientoDto) => maquinariasApi.addMantenimiento(maqId, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['maquinarias', maqId] });
      qc.invalidateQueries({ queryKey: ['maquinarias'] });
      toast.success('Mantenimiento registrado');
      setMantModal(false);
      setMantForm(EMPTY_MANT);
    },
    onError: () => toast.error('Error al guardar'),
  });

  const delMantMut = useMutation({
    mutationFn: (mantenimientoId: number) => maquinariasApi.removeMantenimiento(maqId, mantenimientoId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['maquinarias', maqId] });
      toast.success('Registro eliminado');
    },
    onError: () => toast.error('Error al eliminar'),
  });

  const addGastoMut = useMutation({
    mutationFn: (dto: CreateGastoDto) => maquinariasApi.addGasto(maqId, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['maquinarias', maqId] });
      qc.invalidateQueries({ queryKey: ['maquinarias'] });
      toast.success('Gasto registrado');
      setGastoModal(false);
      setGastoForm(EMPTY_GASTO);
    },
    onError: () => toast.error('Error al guardar'),
  });

  const delGastoMut = useMutation({
    mutationFn: (gastoId: number) => maquinariasApi.removeGasto(maqId, gastoId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['maquinarias', maqId] });
      toast.success('Gasto eliminado');
    },
    onError: () => toast.error('Error al eliminar'),
  });

  // Handlers
  const startEdit = () => {
    if (!maq) return;
    setEditForm({
      nombre: maq.nombre, tipo: maq.tipo, marca: maq.marca ?? '',
      modelo: maq.modelo ?? '', anio: maq.anio ?? '', patente: maq.patente ?? '',
      estado: maq.estado, horasUso: maq.horasUso ?? '',
      seguroVencimiento: maq.seguroVencimiento ? maq.seguroVencimiento.slice(0, 10) : '',
      vtvVencimiento: maq.vtvVencimiento ? maq.vtvVencimiento.slice(0, 10) : '',
      observaciones: maq.observaciones ?? '', campoId: maq.campoId ?? '',
    });
    setEditMode(true);
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const dto = {
      ...editForm,
      anio: editForm.anio ? Number(editForm.anio) : undefined,
      horasUso: editForm.horasUso ? Number(editForm.horasUso) : undefined,
      campoId: editForm.campoId ? Number(editForm.campoId) : undefined,
      seguroVencimiento: editForm.seguroVencimiento || undefined,
      vtvVencimiento: editForm.vtvVencimiento || undefined,
      marca: editForm.marca || undefined,
      modelo: editForm.modelo || undefined,
      patente: editForm.patente || undefined,
      observaciones: editForm.observaciones || undefined,
    };
    updateMut.mutate(dto);
  };

  const handleMantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dto: CreateMantenimientoDto = {
      ...mantForm,
      horasUso: mantForm.horasUso ? Number(mantForm.horasUso) : undefined,
      costo: mantForm.costo ? Number(mantForm.costo) : undefined,
      proximoMantenimiento: mantForm.proximoMantenimiento || undefined,
      descripcion: mantForm.descripcion || undefined,
      observaciones: mantForm.observaciones || undefined,
    };
    addMantMut.mutate(dto);
  };

  const handleGastoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dto: CreateGastoDto = {
      ...gastoForm,
      monto: Number(gastoForm.monto),
      observaciones: gastoForm.observaciones || undefined,
    };
    addGastoMut.mutate(dto);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!maq) {
    return (
      <div className="p-6 text-center text-gray-400">
        <p>Maquinaria no encontrada.</p>
        <button onClick={() => navigate('/maquinarias')} className="mt-4 text-green-600 underline text-sm">
          Volver a Maquinarias
        </button>
      </div>
    );
  }

  const est = ESTADO_CONFIG[maq.estado];
  const EstIcon = est.icon;
  const seguroAlert = isAlertDate(maq.seguroVencimiento) || isExpired(maq.seguroVencimiento);
  const vtvAlert    = isAlertDate(maq.vtvVencimiento)    || isExpired(maq.vtvVencimiento);
  const totalGastos = maq.gastos?.reduce((s, g) => s + g.monto, 0) ?? 0;
  const totalMantenimiento = maq.mantenimientos?.reduce((s, m) => s + (m.costo ?? 0), 0) ?? 0;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate('/maquinarias')}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-green-600 mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver a Maquinarias
      </button>

      {/* Header card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        {editMode ? (
          <form onSubmit={saveEdit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Nombre *</label>
                <input
                  required
                  value={String(editForm.nombre ?? '')}
                  onChange={(e) => setEditForm((p) => ({ ...p, nombre: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  value={String(editForm.tipo ?? 'TRACTOR')}
                  onChange={(e) => setEditForm((p) => ({ ...p, tipo: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {TIPOS_MAQ.map((t) => <option key={t} value={t}>{TIPO_LABEL[t]}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={String(editForm.estado ?? 'OPERATIVA')}
                  onChange={(e) => setEditForm((p) => ({ ...p, estado: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {ESTADOS.map((e) => <option key={e} value={e}>{ESTADO_CONFIG[e].label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Marca</label>
                <input
                  value={String(editForm.marca ?? '')}
                  onChange={(e) => setEditForm((p) => ({ ...p, marca: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Modelo</label>
                <input
                  value={String(editForm.modelo ?? '')}
                  onChange={(e) => setEditForm((p) => ({ ...p, modelo: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Año</label>
                <input
                  type="number"
                  value={String(editForm.anio ?? '')}
                  onChange={(e) => setEditForm((p) => ({ ...p, anio: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Patente</label>
                <input
                  value={String(editForm.patente ?? '')}
                  onChange={(e) => setEditForm((p) => ({ ...p, patente: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Horas de uso</label>
                <input
                  type="number"
                  value={String(editForm.horasUso ?? '')}
                  onChange={(e) => setEditForm((p) => ({ ...p, horasUso: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Campo asignado</label>
                <select
                  value={String(editForm.campoId ?? '')}
                  onChange={(e) => setEditForm((p) => ({ ...p, campoId: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Sin campo</option>
                  {campos.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Venc. seguro</label>
                <input
                  type="date"
                  value={String(editForm.seguroVencimiento ?? '')}
                  onChange={(e) => setEditForm((p) => ({ ...p, seguroVencimiento: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Venc. VTV</label>
                <input
                  type="date"
                  value={String(editForm.vtvVencimiento ?? '')}
                  onChange={(e) => setEditForm((p) => ({ ...p, vtvVencimiento: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Observaciones</label>
                <textarea
                  rows={2}
                  value={String(editForm.observaciones ?? '')}
                  onChange={(e) => setEditForm((p) => ({ ...p, observaciones: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="flex items-center gap-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
              >
                <X className="w-4 h-4" /> Cancelar
              </button>
              <button
                type="submit"
                disabled={updateMut.isPending}
                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {updateMut.isPending ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <Wrench className="w-6 h-6 text-green-600" />
                  <h1 className="text-2xl font-bold text-gray-900">{maq.nombre}</h1>
                </div>
                <p className="text-sm text-gray-500 ml-9">
                  {TIPO_LABEL[maq.tipo]}
                  {maq.marca && ` · ${maq.marca}`}
                  {maq.modelo && ` ${maq.modelo}`}
                  {maq.anio && ` (${maq.anio})`}
                  {maq.patente && ` · ${maq.patente}`}
                </p>
                <div className="ml-9 mt-2">
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${est.color}`}>
                    <EstIcon className="w-3 h-3" /> {est.label}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={startEdit}
                  className="flex items-center gap-1 border border-gray-300 text-gray-600 hover:text-green-600 hover:border-green-300 px-3 py-1.5 rounded-lg text-sm transition-colors"
                >
                  <Pencil className="w-4 h-4" /> Editar
                </button>
                <button
                  onClick={() => {
                    if (!confirm(`¿Eliminar "${maq.nombre}"?`)) return;
                    deleteMaqMut.mutate();
                  }}
                  className="flex items-center gap-1 border border-gray-300 text-gray-600 hover:text-red-600 hover:border-red-300 px-3 py-1.5 rounded-lg text-sm transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Eliminar
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Horas de uso</p>
                <p className="text-xl font-bold text-gray-900 mt-1">
                  {maq.horasUso !== undefined && maq.horasUso !== null
                    ? `${maq.horasUso.toLocaleString('es-AR')} hs`
                    : '—'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Campo asignado</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{maq.campo?.nombre ?? '—'}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Gastos registrados</p>
                <p className="text-xl font-bold text-green-700 mt-1">{AR$(totalGastos)}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Costo mantenimiento</p>
                <p className="text-xl font-bold text-orange-600 mt-1">{AR$(totalMantenimiento)}</p>
              </div>
            </div>

            {/* Alertas */}
            {(seguroAlert || vtvAlert) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {seguroAlert && (
                  <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${isExpired(maq.seguroVencimiento) ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}`}>
                    <AlertTriangle className="w-4 h-4" />
                    <span>
                      Seguro: {isExpired(maq.seguroVencimiento) ? 'venció el' : 'vence el'}{' '}
                      {maq.seguroVencimiento ? fmtDate(maq.seguroVencimiento) : ''}
                    </span>
                  </div>
                )}
                {vtvAlert && (
                  <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${isExpired(maq.vtvVencimiento) ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}`}>
                    <AlertTriangle className="w-4 h-4" />
                    <span>
                      VTV: {isExpired(maq.vtvVencimiento) ? 'venció el' : 'vence el'}{' '}
                      {maq.vtvVencimiento ? fmtDate(maq.vtvVencimiento) : ''}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Info extra */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-gray-500">
              {maq.seguroVencimiento && !seguroAlert && (
                <p>🛡 Seguro vence: <span className="text-gray-700">{fmtDate(maq.seguroVencimiento)}</span></p>
              )}
              {maq.vtvVencimiento && !vtvAlert && (
                <p>📋 VTV vence: <span className="text-gray-700">{fmtDate(maq.vtvVencimiento)}</span></p>
              )}
              {maq.observaciones && (
                <p className="col-span-2 sm:col-span-3">📝 {maq.observaciones}</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        {(['mantenimiento', 'gastos'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t === 'mantenimiento' ? `Mantenimientos (${maq.mantenimientos.length})` : `Gastos (${maq.gastos.length})`}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'mantenimiento' && (
        <div>
          <div className="flex justify-end mb-3">
            <button
              onClick={() => setMantModal(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" /> Registrar mantenimiento
            </button>
          </div>

          {maq.mantenimientos.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <Wrench className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Sin registros de mantenimiento</p>
            </div>
          ) : (
            <div className="space-y-3">
              {maq.mantenimientos.map((m) => (
                <div key={m.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{TIPO_MANT_LABEL[m.tipo]}</span>
                      <span className="text-xs text-gray-400">{fmtDate(m.fecha)}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      {m.descripcion && <span>{m.descripcion}</span>}
                      {m.horasUso !== undefined && m.horasUso !== null && (
                        <span>⏱ {m.horasUso.toLocaleString('es-AR')} hs</span>
                      )}
                      {m.costo !== undefined && m.costo !== null && (
                        <span className="text-green-700 font-medium">💰 {AR$(m.costo)}</span>
                      )}
                      {m.proximoMantenimiento && (
                        <span className="text-blue-600">
                          🔔 Próximo: {fmtDate(m.proximoMantenimiento)}
                        </span>
                      )}
                    </div>
                    {m.observaciones && (
                      <p className="text-xs text-gray-400 mt-1">{m.observaciones}</p>
                    )}
                  </div>
                  <button
                    onClick={() => delMantMut.mutate(m.id)}
                    className="text-gray-400 hover:text-red-500 ml-3 shrink-0 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'gastos' && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">
              Total: <span className="font-semibold text-gray-900">{AR$(totalGastos)}</span>
            </p>
            <button
              onClick={() => setGastoModal(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" /> Registrar gasto
            </button>
          </div>

          {maq.gastos.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <p className="text-sm">Sin gastos registrados</p>
            </div>
          ) : (
            <div className="overflow-hidden border border-gray-200 rounded-xl">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Monto</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {maq.gastos.map((g) => (
                    <tr key={g.id} className="bg-white hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">{TIPO_GASTO_LABEL[g.tipo]}</td>
                      <td className="px-4 py-3 text-gray-600">{g.descripcion}</td>
                      <td className="px-4 py-3 text-right font-medium text-green-700">{AR$(g.monto)}</td>
                      <td className="px-4 py-3 text-gray-500">{fmtDate(g.fecha)}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => delGastoMut.mutate(g.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal mantenimiento */}
      {mantModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold">Registrar mantenimiento</h2>
              <button onClick={() => setMantModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleMantSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Tipo *</label>
                <select
                  value={mantForm.tipo}
                  onChange={(e) => setMantForm((p) => ({ ...p, tipo: e.target.value as TipoMantenimiento }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {TIPOS_MANT.map((t) => <option key={t} value={t}>{TIPO_MANT_LABEL[t]}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Fecha *</label>
                <input
                  type="date"
                  required
                  value={mantForm.fecha}
                  onChange={(e) => setMantForm((p) => ({ ...p, fecha: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Horas de uso al momento</label>
                  <input
                    type="number"
                    min={0}
                    value={mantForm.horasUso ?? ''}
                    onChange={(e) => setMantForm((p) => ({ ...p, horasUso: e.target.value ? Number(e.target.value) : undefined }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Costo ($)</label>
                  <input
                    type="number"
                    min={0}
                    value={mantForm.costo ?? ''}
                    onChange={(e) => setMantForm((p) => ({ ...p, costo: e.target.value ? Number(e.target.value) : undefined }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Próximo mantenimiento</label>
                <input
                  type="date"
                  value={mantForm.proximoMantenimiento ?? ''}
                  onChange={(e) => setMantForm((p) => ({ ...p, proximoMantenimiento: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Descripción</label>
                <input
                  value={mantForm.descripcion ?? ''}
                  onChange={(e) => setMantForm((p) => ({ ...p, descripcion: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Observaciones</label>
                <textarea
                  rows={2}
                  value={mantForm.observaciones ?? ''}
                  onChange={(e) => setMantForm((p) => ({ ...p, observaciones: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setMantModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                  Cancelar
                </button>
                <button type="submit" disabled={addMantMut.isPending}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50">
                  {addMantMut.isPending ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal gasto */}
      {gastoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold">Registrar gasto</h2>
              <button onClick={() => setGastoModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleGastoSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Tipo *</label>
                <select
                  value={gastoForm.tipo}
                  onChange={(e) => setGastoForm((p) => ({ ...p, tipo: e.target.value as TipoGastoMaq }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {TIPOS_GASTO.map((t) => <option key={t} value={t}>{TIPO_GASTO_LABEL[t]}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Descripción *</label>
                <input
                  required
                  value={gastoForm.descripcion}
                  onChange={(e) => setGastoForm((p) => ({ ...p, descripcion: e.target.value }))}
                  placeholder="Ej: Gasoil YPF"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Monto ($) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={gastoForm.monto || ''}
                    onChange={(e) => setGastoForm((p) => ({ ...p, monto: Number(e.target.value) }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Fecha *</label>
                  <input
                    type="date"
                    required
                    value={gastoForm.fecha}
                    onChange={(e) => setGastoForm((p) => ({ ...p, fecha: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Observaciones</label>
                <textarea
                  rows={2}
                  value={gastoForm.observaciones ?? ''}
                  onChange={(e) => setGastoForm((p) => ({ ...p, observaciones: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setGastoModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                  Cancelar
                </button>
                <button type="submit" disabled={addGastoMut.isPending}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50">
                  {addGastoMut.isPending ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
