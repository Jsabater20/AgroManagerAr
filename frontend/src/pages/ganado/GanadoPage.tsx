import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  PawPrint, Plus, Loader2, Baby, Trash2, X,
  ChevronLeft, ChevronRight, BadgeCheck, AlertCircle, Clock, Scale,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { ganadoApi } from '../../api/ganado.api';
import type {
  Animal, CreateAnimalDto, CreatePrenezDto,
  Especie, Sexo, CategoriaAnimal, EstadoPrenez,
  RegistroPeso, CreateRegistroPesoDto,
} from '../../api/types';

const PAGE_SIZE = 10;

const ESPECIES: Especie[] = ['BOVINO', 'PORCINO', 'EQUINO', 'OVINO', 'CAPRINO', 'AVIAR'];

const ESPECIE_LABELS: Record<Especie, string> = {
  BOVINO: 'Bovino', PORCINO: 'Porcino', EQUINO: 'Equino',
  OVINO: 'Ovino', CAPRINO: 'Caprino', AVIAR: 'Aviar',
};

const ESPECIE_COLORS: Record<Especie, string> = {
  BOVINO: 'bg-amber-100 text-amber-700',
  PORCINO: 'bg-pink-100 text-pink-700',
  EQUINO: 'bg-purple-100 text-purple-700',
  OVINO: 'bg-blue-100 text-blue-700',
  CAPRINO: 'bg-emerald-100 text-emerald-700',
  AVIAR: 'bg-yellow-100 text-yellow-700',
};

const GESTATION_DAYS: Record<Especie, number> = {
  BOVINO: 283, PORCINO: 114, EQUINO: 340,
  OVINO: 147, CAPRINO: 150, AVIAR: 21,
};

const CATEGORIAS_POR_ESPECIE: Record<Especie, { hembra: CategoriaAnimal[]; macho: CategoriaAnimal[] }> = {
  BOVINO:  { hembra: ['VACA', 'VAQUILLONA', 'TERNERA'],      macho: ['TORO', 'NOVILLO', 'TERNERO'] },
  PORCINO: { hembra: ['CERDA', 'LECHON'],                    macho: ['VERRACO', 'LECHON'] },
  EQUINO:  { hembra: ['YEGUA', 'POTRANCA'],                  macho: ['PADRILLO', 'POTRO'] },
  OVINO:   { hembra: ['OVEJA', 'BORREGA'],                   macho: ['CARNERO', 'CORDERO'] },
  CAPRINO: { hembra: ['CABRA'],                              macho: ['CABRIO', 'CABRITO'] },
  AVIAR:   { hembra: ['GALLINA', 'POLLA'],                   macho: ['GALLO', 'POLLO'] },
};

const CATEGORIA_LABELS: Record<CategoriaAnimal, string> = {
  VACA: 'Vaca', VAQUILLONA: 'Vaquillona', TERNERA: 'Ternera',
  TORO: 'Toro', NOVILLO: 'Novillo', TERNERO: 'Ternero',
  CERDA: 'Cerda', VERRACO: 'Verraco', LECHON: 'Lechón',
  YEGUA: 'Yegua', POTRANCA: 'Potranca', PADRILLO: 'Padrillo', POTRO: 'Potro',
  OVEJA: 'Oveja', BORREGA: 'Borrega', CARNERO: 'Carnero', CORDERO: 'Cordero',
  CABRA: 'Cabra', CABRIO: 'Cabrío', CABRITO: 'Cabrito',
  GALLINA: 'Gallina', GALLO: 'Gallo', POLLO: 'Pollo', POLLA: 'Polla',
};

const PRENEZ_CONFIG: Record<EstadoPrenez, { label: string; color: string; Icon: typeof Clock }> = {
  EN_CURSO:   { label: 'En curso',   color: 'bg-blue-100 text-blue-700',   Icon: Clock },
  COMPLETADA: { label: 'Completada', color: 'bg-green-100 text-green-700', Icon: BadgeCheck },
  PERDIDA:    { label: 'Perdida',    color: 'bg-red-100 text-red-700',     Icon: AlertCircle },
};

const emptyAnimal: CreateAnimalDto = {
  nombre: '', especie: 'BOVINO', sexo: 'HEMBRA', categoria: 'VACA',
  peso: undefined, fechaNacimiento: undefined, observaciones: '',
};

const emptyPrenez: CreatePrenezDto = { fechaInicio: '', observaciones: '' };

const emptyPeso: CreateRegistroPesoDto = { peso: 0, fecha: new Date().toISOString().split('T')[0], observaciones: '' };

function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((new Date(dateStr).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function today() { return new Date().toISOString().split('T')[0]; }

export default function GanadoPage() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal]           = useState(false);
  const [form, setForm]                     = useState<CreateAnimalDto>(emptyAnimal);
  const [prenezTarget, setPrenezTarget]     = useState<Animal | null>(null);
  const [prenezForm, setPrenezForm]         = useState<CreatePrenezDto>(emptyPrenez);
  const [pesosTarget, setPesosTarget]       = useState<Animal | null>(null);
  const [pesoForm, setPesoForm]             = useState<CreateRegistroPesoDto>(emptyPeso);
  const [filterEspecie, setFilterEspecie]   = useState<Especie | ''>('');
  const [filterSexo, setFilterSexo]         = useState<Sexo | ''>('');
  const [page, setPage]                     = useState(1);

  const { data: animales, isLoading } = useQuery({ queryKey: ['ganado'], queryFn: ganadoApi.getAll });

  const { data: pesosData = [], isLoading: pesosLoading } = useQuery({
    queryKey: ['ganado-pesos', pesosTarget?.id],
    queryFn: () => ganadoApi.getPesos(pesosTarget!.id),
    enabled: !!pesosTarget,
  });

  const filtered = useMemo(() => (animales ?? []).filter((a) => {
    if (filterEspecie && a.especie !== filterEspecie) return false;
    if (filterSexo && a.sexo !== filterSexo) return false;
    return true;
  }), [animales, filterEspecie, filterSexo]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged      = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasFilters = filterEspecie !== '' || filterSexo !== '';
  const resetFilters = () => { setFilterEspecie(''); setFilterSexo(''); setPage(1); };

  const categoriasDisponibles = useMemo(() => {
    const map = CATEGORIAS_POR_ESPECIE[form.especie];
    return form.sexo === 'HEMBRA' ? map.hembra : map.macho;
  }, [form.especie, form.sexo]);

  const handleEspecieChange = (especie: Especie) => {
    const map  = CATEGORIAS_POR_ESPECIE[especie];
    const cats = form.sexo === 'HEMBRA' ? map.hembra : map.macho;
    setForm({ ...form, especie, categoria: cats[0] });
  };

  const handleSexoChange = (sexo: Sexo) => {
    const map  = CATEGORIAS_POR_ESPECIE[form.especie];
    const cats = sexo === 'HEMBRA' ? map.hembra : map.macho;
    setForm({ ...form, sexo, categoria: cats[0] });
  };

  const createMutation = useMutation({
    mutationFn: ganadoApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ganado'] });
      toast.success('Animal registrado');
      setShowModal(false); setForm(emptyAnimal);
    },
    onError: () => toast.error('Error al registrar el animal'),
  });

  const deleteMutation = useMutation({
    mutationFn: ganadoApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ganado'] });
      toast.success('Animal eliminado');
    },
    onError: () => toast.error('Error al eliminar el animal'),
  });

  const prenezMutation = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: CreatePrenezDto }) => ganadoApi.addPrenez(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ganado'] });
      toast.success('Preñez registrada');
      setPrenezTarget(null); setPrenezForm(emptyPrenez);
    },
    onError: () => toast.error('Error al registrar la preñez'),
  });

  const addPesoMutation = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: CreateRegistroPesoDto }) => ganadoApi.addPeso(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ganado-pesos', pesosTarget?.id] });
      queryClient.invalidateQueries({ queryKey: ['ganado'] });
      toast.success('Peso registrado');
      setPesoForm(emptyPeso);
    },
    onError: () => toast.error('Error al registrar el peso'),
  });

  const removePesoMutation = useMutation({
    mutationFn: ganadoApi.removePeso,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ganado-pesos', pesosTarget?.id] });
      queryClient.invalidateQueries({ queryKey: ['ganado'] });
      toast.success('Registro eliminado');
    },
    onError: () => toast.error('Error al eliminar'),
  });

  const updatePrenezMutation = useMutation({
    mutationFn: ({ prenezId, estado }: { prenezId: number; estado: EstadoPrenez }) =>
      ganadoApi.updatePrenezEstado(prenezId, estado),
    onSuccess: (_, { prenezId, estado }) => {
      queryClient.invalidateQueries({ queryKey: ['ganado'] });
      // Actualizar prenezTarget localmente para que el historial refleje el cambio
      if (prenezTarget) {
        setPrenezTarget({
          ...prenezTarget,
          preneces: prenezTarget.preneces.map((p) => p.id === prenezId ? { ...p, estado } : p),
        });
      }
      toast.success('Estado actualizado');
    },
    onError: () => toast.error('Error al actualizar el estado'),
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ganadería</h1>
          <p className="text-gray-500 mt-1 text-sm">Registro de animales y seguimiento de preñez</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} />Nuevo animal
        </button>
      </div>

      {/* Filtros */}
      {!isLoading && (animales?.length ?? 0) > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-5 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <select value={filterEspecie} onChange={(e) => { setFilterEspecie(e.target.value as Especie | ''); setPage(1); }} className="input w-auto! text-sm">
            <option value="">Todas las especies</option>
            {ESPECIES.map((e) => <option key={e} value={e}>{ESPECIE_LABELS[e]}</option>)}
          </select>
          <select value={filterSexo} onChange={(e) => { setFilterSexo(e.target.value as Sexo | ''); setPage(1); }} className="input w-auto! text-sm">
            <option value="">Ambos sexos</option>
            <option value="HEMBRA">Hembra</option>
            <option value="MACHO">Macho</option>
          </select>
          {hasFilters && (
            <button onClick={resetFilters} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <X size={14} />Limpiar
            </button>
          )}
          <span className="text-xs text-gray-400 ml-auto">
            {filtered.length} {filtered.length === 1 ? 'animal' : 'animales'}{hasFilters ? ' encontrados' : ' en total'}
          </span>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-green-600" /></div>
      ) : animales?.length === 0 ? (
        <EmptyState onAdd={() => setShowModal(true)} />
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-sm">No hay animales que coincidan con los filtros.</p>
          <button onClick={resetFilters} className="mt-2 text-green-700 text-sm hover:underline">Limpiar filtros</button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3">Nombre</th>
                  <th className="text-left px-5 py-3">Especie</th>
                  <th className="text-left px-5 py-3">Sexo / Categoría</th>
                  <th className="text-left px-5 py-3">Peso</th>
                  <th className="text-left px-5 py-3">Preñez activa</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paged.map((a) => {
                  const activePrenez = a.preneces.find((p) => p.estado === 'EN_CURSO');
                  const canPrenez    = a.sexo === 'HEMBRA';
                  return (
                    <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-gray-900">{a.nombre}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${ESPECIE_COLORS[a.especie]}`}>
                          {ESPECIE_LABELS[a.especie]}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">
                        {a.sexo === 'HEMBRA' ? 'Hembra' : 'Macho'} · {CATEGORIA_LABELS[a.categoria]}
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">{a.peso ? `${a.peso} kg` : '—'}</td>
                      <td className="px-5 py-3.5">
                        {activePrenez ? (
                          <div>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                              <Clock size={10} />En curso
                            </span>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Parto ~{formatDate(activePrenez.fechaEstimadaParto)}
                              {' '}({daysUntil(activePrenez.fechaEstimadaParto)} días)
                            </p>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">{canPrenez ? '—' : 'N/A'}</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2 justify-end">
                          {canPrenez && (
                            <button
                              onClick={() => { setPrenezForm({ ...emptyPrenez, fechaInicio: today() }); setPrenezTarget(a); }}
                              className="inline-flex items-center gap-1.5 text-xs font-medium text-pink-700 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              <Baby size={13} />Preñez
                            </button>
                          )}
                          <button
                            onClick={() => { setPesoForm(emptyPeso); setPesosTarget(a); }}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <Scale size={13} />Pesos
                          </button>
                          <button
                            onClick={() => { if (window.confirm(`¿Eliminar "${a.nombre}"?`)) deleteMutation.mutate(a.id); }}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 px-1">
              <p className="text-xs text-gray-400">Página {page} de {totalPages}</p>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${p === page ? 'bg-green-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal: Nuevo Animal */}
      {showModal && (
        <Modal title="Nuevo animal" onClose={() => { setShowModal(false); setForm(emptyAnimal); }}>
          <form onSubmit={(e) => { e.preventDefault(); createMutation.mutate(form); }} className="space-y-4">
            <Field label="Nombre *">
              <input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="input" placeholder="Ej: Pancha, Lote 14..." />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Especie *">
                <select required value={form.especie} onChange={(e) => handleEspecieChange(e.target.value as Especie)} className="input">
                  {ESPECIES.map((e) => <option key={e} value={e}>{ESPECIE_LABELS[e]}</option>)}
                </select>
              </Field>
              <Field label="Sexo *">
                <select required value={form.sexo} onChange={(e) => handleSexoChange(e.target.value as Sexo)} className="input">
                  <option value="HEMBRA">Hembra</option>
                  <option value="MACHO">Macho</option>
                </select>
              </Field>
            </div>
            <Field label="Categoría *">
              <select required value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value as CategoriaAnimal })} className="input">
                {categoriasDisponibles.map((c) => <option key={c} value={c}>{CATEGORIA_LABELS[c]}</option>)}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Peso (kg)">
                <input type="number" min={0} step={0.1} value={form.peso ?? ''}
                  onChange={(e) => setForm({ ...form, peso: e.target.value ? parseFloat(e.target.value) : undefined })}
                  className="input" placeholder="Opcional" />
              </Field>
              <Field label="Fecha de nacimiento">
                <input type="date" value={form.fechaNacimiento ?? ''}
                  onChange={(e) => setForm({ ...form, fechaNacimiento: e.target.value || undefined })}
                  className="input" />
              </Field>
            </div>
            <Field label="Observaciones">
              <textarea rows={2} value={form.observaciones}
                onChange={(e) => setForm({ ...form, observaciones: e.target.value })}
                className="input resize-none" placeholder="Opcional" />
            </Field>
            <ModalActions onCancel={() => { setShowModal(false); setForm(emptyAnimal); }} loading={createMutation.isPending} label="Registrar" />
          </form>
        </Modal>
      )}

      {/* Modal: Historial de pesos */}
      {pesosTarget && (
        <Modal title={`Historial de pesos — ${pesosTarget.nombre}`} onClose={() => setPesosTarget(null)}>
          {/* Tabla historial */}
          {pesosLoading ? (
            <div className="flex justify-center py-6"><Loader2 size={24} className="animate-spin text-green-600" /></div>
          ) : pesosData.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4 mb-4">Sin registros de peso aún</p>
          ) : (
            <div className="mb-5">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Historial</h3>
              <div className="rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-xs text-gray-500">
                    <tr>
                      <th className="text-left px-3 py-2">Fecha</th>
                      <th className="text-right px-3 py-2">Peso</th>
                      <th className="text-right px-3 py-2">Variación</th>
                      <th className="px-3 py-2" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[...pesosData]
                      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                      .map((p: RegistroPeso, idx: number, arr: RegistroPeso[]) => {
                        const prev = arr[idx + 1];
                        const diff = prev ? p.peso - prev.peso : null;
                        return (
                          <tr key={p.id} className="hover:bg-gray-50/50">
                            <td className="px-3 py-2.5 text-gray-600">{formatDate(p.fecha)}</td>
                            <td className="px-3 py-2.5 text-right font-medium text-gray-900">{p.peso} kg</td>
                            <td className="px-3 py-2.5 text-right">
                              {diff !== null ? (
                                <span className={`text-xs font-medium ${diff > 0 ? 'text-green-600' : diff < 0 ? 'text-red-600' : 'text-gray-400'}`}>
                                  {diff > 0 ? '+' : ''}{diff.toFixed(1)} kg
                                </span>
                              ) : <span className="text-gray-300 text-xs">—</span>}
                            </td>
                            <td className="px-3 py-2.5">
                              <button
                                onClick={() => { if (window.confirm('¿Eliminar este registro?')) removePesoMutation.mutate(p.id); }}
                                className="p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={13} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Formulario nuevo peso */}
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Registrar nuevo peso</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addPesoMutation.mutate({ id: pesosTarget.id, dto: { ...pesoForm, peso: Number(pesoForm.peso) } });
            }}
            className="space-y-3"
          >
            <div className="grid grid-cols-2 gap-3">
              <Field label="Peso (kg) *">
                <input required type="number" min={0} step={0.1} value={pesoForm.peso || ''}
                  onChange={(e) => setPesoForm({ ...pesoForm, peso: Number(e.target.value) })}
                  className="input" placeholder="Ej: 320" />
              </Field>
              <Field label="Fecha *">
                <input required type="date" value={pesoForm.fecha}
                  onChange={(e) => setPesoForm({ ...pesoForm, fecha: e.target.value })}
                  className="input" />
              </Field>
            </div>
            <Field label="Observaciones">
              <input value={pesoForm.observaciones ?? ''}
                onChange={(e) => setPesoForm({ ...pesoForm, observaciones: e.target.value })}
                className="input" placeholder="Opcional" />
            </Field>
            <ModalActions onCancel={() => setPesosTarget(null)} loading={addPesoMutation.isPending} label="Registrar peso" />
          </form>
        </Modal>
      )}

      {/* Modal: Preñez */}
      {prenezTarget && (
        <Modal title={`Preñez — ${prenezTarget.nombre}`} onClose={() => setPrenezTarget(null)}>
          <p className="text-sm text-gray-500 mb-4">
            {ESPECIE_LABELS[prenezTarget.especie]} · {CATEGORIA_LABELS[prenezTarget.categoria]}
            {' · '}Gestación: <strong>{GESTATION_DAYS[prenezTarget.especie]} días</strong>
          </p>

          {prenezTarget.preneces.length > 0 && (
            <div className="mb-5">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Historial</h3>
              <div className="space-y-2">
                {prenezTarget.preneces.map((p) => {
                  const cfg  = PRENEZ_CONFIG[p.estado];
                  const Icon = cfg.Icon;
                  return (
                    <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div>
                        <p className="text-xs text-gray-600">Inicio: {formatDate(p.fechaInicio)}</p>
                        <p className="text-xs text-gray-400">Parto est.: {formatDate(p.fechaEstimadaParto)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.color}`}>
                          <Icon size={10} />{cfg.label}
                        </span>
                        {p.estado === 'EN_CURSO' && (
                          <div className="flex gap-1">
                            <button onClick={() => updatePrenezMutation.mutate({ prenezId: p.id, estado: 'COMPLETADA' })}
                              className="text-xs text-green-700 hover:bg-green-50 px-2 py-1 rounded-lg transition-colors">
                              Completada
                            </button>
                            <button onClick={() => updatePrenezMutation.mutate({ prenezId: p.id, estado: 'PERDIDA' })}
                              className="text-xs text-red-600 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors">
                              Perdida
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Nueva preñez</h3>
          <form onSubmit={(e) => { e.preventDefault(); prenezMutation.mutate({ id: prenezTarget.id, dto: prenezForm }); }} className="space-y-4">
            <Field label="Fecha de inicio *">
              <input required type="date" value={prenezForm.fechaInicio}
                onChange={(e) => setPrenezForm({ ...prenezForm, fechaInicio: e.target.value })} className="input" />
            </Field>
            {prenezForm.fechaInicio && (
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-700 font-medium">
                  Parto estimado:{' '}
                  {(() => {
                    const d = new Date(prenezForm.fechaInicio);
                    d.setDate(d.getDate() + GESTATION_DAYS[prenezTarget.especie]);
                    return formatDate(d.toISOString());
                  })()}
                </p>
                <p className="text-xs text-blue-500 mt-0.5">
                  {GESTATION_DAYS[prenezTarget.especie]} días de gestación ({ESPECIE_LABELS[prenezTarget.especie]})
                </p>
              </div>
            )}
            <Field label="Observaciones">
              <textarea rows={2} value={prenezForm.observaciones}
                onChange={(e) => setPrenezForm({ ...prenezForm, observaciones: e.target.value })}
                className="input resize-none" placeholder="Opcional" />
            </Field>
            <ModalActions onCancel={() => setPrenezTarget(null)} loading={prenezMutation.isPending} label="Registrar preñez" />
          </form>
        </Modal>
      )}
    </div>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="bg-emerald-50 p-5 rounded-2xl mb-4"><PawPrint size={40} className="text-emerald-600" /></div>
      <h2 className="text-lg font-semibold text-gray-900">No hay animales registrados</h2>
      <p className="text-gray-500 text-sm mt-1 mb-5">Registrá tu primer animal para comenzar el seguimiento ganadero</p>
      <button onClick={onAdd} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
        <Plus size={16} />Nuevo animal
      </button>
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-10 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function ModalActions({ onCancel, loading, label }: { onCancel: () => void; loading: boolean; label: string }) {
  return (
    <div className="flex justify-end gap-3 pt-2">
      <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Cancelar</button>
      <button type="submit" disabled={loading} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        {loading && <Loader2 size={14} className="animate-spin" />}{label}
      </button>
    </div>
  );
}
