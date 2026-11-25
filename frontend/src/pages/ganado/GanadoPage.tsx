import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  PawPrint, Plus, Loader2, Baby, Trash2, X,
  ChevronLeft, ChevronRight, BadgeCheck, AlertCircle, Clock, Scale,
  Boxes, ClipboardPlus, CircleCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { ganadoApi } from '../../api/ganado.api';
import type {
  Animal, CreateAnimalDto, CreatePrenezDto,
  Especie, Sexo, CategoriaAnimal, EstadoPrenez,
<<<<<<< HEAD
  RegistroPeso, CreateRegistroPesoDto, LoteGanadero,
  SistemaLoteGanadero, CreateLoteGanaderoDto,
  CreateRegistroLoteGanaderoDto, CerrarLoteGanaderoDto,
=======
  RegistroPeso, CreateRegistroPesoDto,
  CerrarLoteGanaderoDto, CreateLoteGanaderoDto,
  CreateRegistroLoteGanaderoDto, LoteGanadero, SistemaLoteGanadero,
>>>>>>> develop
} from '../../api/types';
import { EvidenceAction } from '../../components/evidencias/EvidenceAction';

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

const SISTEMA_LOTE_CONFIG: Record<SistemaLoteGanadero, { label: string; description: string; color: string }> = {
  CRIA_PROPIA: {
    label: 'Cría propia',
    description: 'Madres, servicio, nacimientos y terneros propios.',
    color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200',
  },
  INVERNADA_COMPRADA: {
    label: 'Invernada comprada',
    description: 'Hacienda adquirida para recría o terminación.',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-200',
  },
  FEEDLOT: {
    label: 'Feedlot',
    description: 'Seguimiento de corral, peso, alimento y bajas.',
    color: 'bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-200',
  },
};

const emptyAnimal: CreateAnimalDto = {
  nombre: '', especie: 'BOVINO', sexo: 'HEMBRA', categoria: 'VACA',
  peso: undefined, fechaNacimiento: undefined, observaciones: '',
};

const emptyPrenez: CreatePrenezDto = { fechaInicio: '', fechaEstimadaParto: '', observaciones: '' };

const emptyPeso: CreateRegistroPesoDto = { peso: 0, fecha: new Date().toISOString().split('T')[0], observaciones: '' };
const emptyLoteGanadero: CreateLoteGanaderoDto = {
  nombre: '', sistema: 'CRIA_PROPIA', cantidadInicial: 0, fechaIngreso: new Date().toISOString().split('T')[0],
  pesoPromedioIngresoKg: undefined, costoCompraTotal: undefined, ubicacion: '', observaciones: '',
};
const emptyRegistroLoteGanadero: CreateRegistroLoteGanaderoDto = {
  fecha: new Date().toISOString().split('T')[0], cantidadActual: 0, pesoPromedioKg: undefined,
  alimentoKg: undefined, bajas: undefined, observaciones: '',
};
const emptyCierreLote: CerrarLoteGanaderoDto = {
  fechaEgreso: new Date().toISOString().split('T')[0], precioVentaTotal: undefined,
};

const SISTEMA_LOTE_LABELS: Record<SistemaLoteGanadero, string> = {
  CRIA_PROPIA: 'Cria propia',
  INVERNADA_COMPRADA: 'Invernada comprada',
  FEEDLOT: 'Feedlot',
};

function createEmptyLote(): CreateLoteGanaderoDto {
  return {
    nombre: '',
    sistema: 'CRIA_PROPIA',
    cantidadInicial: 0,
    fechaIngreso: new Date().toISOString().split('T')[0],
    pesoPromedioIngresoKg: undefined,
    costoCompraTotal: undefined,
    ubicacion: '',
    observaciones: '',
  };
}

function createEmptyRegistro(cantidadActual = 0): CreateRegistroLoteGanaderoDto {
  return {
    fecha: new Date().toISOString().split('T')[0],
    cantidadActual,
    pesoPromedioKg: undefined,
    alimentoKg: undefined,
    bajas: undefined,
    observaciones: '',
  };
}

function createEmptyCierre(): CerrarLoteGanaderoDto {
  return {
    fechaEgreso: new Date().toISOString().split('T')[0],
    precioVentaTotal: undefined,
  };
}

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
  const { orgId } = useParams<{ orgId: string }>();
  const organizacionId = Number(orgId);
  const queryClient = useQueryClient();
  const [showModal, setShowModal]           = useState(false);
  const [form, setForm]                     = useState<CreateAnimalDto>(emptyAnimal);
  const [prenezTarget, setPrenezTarget]     = useState<Animal | null>(null);
  const [prenezForm, setPrenezForm]         = useState<CreatePrenezDto>(emptyPrenez);
  const [pesosTarget, setPesosTarget]       = useState<Animal | null>(null);
  const [pesoForm, setPesoForm]             = useState<CreateRegistroPesoDto>(emptyPeso);
  const [showLoteModal, setShowLoteModal]   = useState(false);
  const [loteForm, setLoteForm]             = useState<CreateLoteGanaderoDto>(emptyLoteGanadero);
  const [registroLoteTarget, setRegistroLoteTarget] = useState<LoteGanadero | null>(null);
  const [registroLoteForm, setRegistroLoteForm] = useState<CreateRegistroLoteGanaderoDto>(emptyRegistroLoteGanadero);
  const [cierreLoteTarget, setCierreLoteTarget] = useState<LoteGanadero | null>(null);
  const [cierreLoteForm, setCierreLoteForm] = useState<CerrarLoteGanaderoDto>(emptyCierreLote);
  const [filterEspecie, setFilterEspecie]   = useState<Especie | ''>('');
  const [filterSexo, setFilterSexo]         = useState<Sexo | ''>('');
  const [page, setPage]                     = useState(1);
  const [showLoteModal, setShowLoteModal]   = useState(false);
  const [loteForm, setLoteForm]             = useState<CreateLoteGanaderoDto>(createEmptyLote);
  const [registroTarget, setRegistroTarget] = useState<LoteGanadero | null>(null);
  const [registroForm, setRegistroForm]     = useState<CreateRegistroLoteGanaderoDto>(createEmptyRegistro);
  const [cierreTarget, setCierreTarget]     = useState<LoteGanadero | null>(null);
  const [cierreForm, setCierreForm]         = useState<CerrarLoteGanaderoDto>(createEmptyCierre);

  const { data: animales, isLoading } = useQuery({ queryKey: ['ganado'], queryFn: () => ganadoApi.getAll() });
<<<<<<< HEAD
  const { data: lotesGanaderos = [], isLoading: lotesGanaderosLoading } = useQuery({
    queryKey: ['ganado-lotes', organizacionId],
=======
  const { data: lotes = [], isLoading: lotesLoading } = useQuery({
    queryKey: ['ganado-lotes'],
>>>>>>> develop
    queryFn: ganadoApi.getLotes,
  });

  const { data: pesosData = [], isLoading: pesosLoading } = useQuery({
    queryKey: ['ganado-pesos', pesosTarget?.id],
    queryFn: () => ganadoApi.getPesos(pesosTarget!.id),
    enabled: !!pesosTarget,
  });

  const filtered = useMemo(() => (animales ?? []).filter((a: any) => {
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
    setForm({ ...form, especie, categoria: cats[0], loteGanaderoId: especie === 'BOVINO' ? form.loteGanaderoId : undefined });
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

  const createLoteMutation = useMutation({
    mutationFn: ganadoApi.createLote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ganado-lotes'] });
      toast.success('Lote ganadero creado');
      setShowLoteModal(false);
      setLoteForm(createEmptyLote());
    },
    onError: () => toast.error('No se pudo crear el lote ganadero'),
  });

  const registrarLoteMutation = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: CreateRegistroLoteGanaderoDto }) => ganadoApi.registrarLote(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ganado-lotes'] });
      toast.success('Control de lote registrado');
      setRegistroTarget(null);
      setRegistroForm(createEmptyRegistro());
    },
    onError: () => toast.error('No se pudo registrar el control'),
  });

  const cerrarLoteMutation = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: CerrarLoteGanaderoDto }) => ganadoApi.cerrarLote(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ganado-lotes'] });
      toast.success('Lote cerrado');
      setCierreTarget(null);
      setCierreForm(createEmptyCierre());
    },
    onError: () => toast.error('No se pudo cerrar el lote'),
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
          preneces: prenezTarget.preneces?.map((p) => p.id === prenezId ? { ...p, estado } : p) ?? [],
        });
      }
      toast.success('Estado actualizado');
    },
    onError: () => toast.error('Error al actualizar el estado'),
  });

  const createLoteMutation = useMutation({
    mutationFn: ganadoApi.createLote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ganado-lotes', organizacionId] });
      toast.success('Lote ganadero creado');
      setShowLoteModal(false);
      setLoteForm(emptyLoteGanadero);
    },
    onError: () => toast.error('No se pudo crear el lote ganadero'),
  });

  const addRegistroLoteMutation = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: CreateRegistroLoteGanaderoDto }) => ganadoApi.addRegistroLote(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ganado-lotes', organizacionId] });
      toast.success('Control del lote registrado');
      setRegistroLoteTarget(null);
      setRegistroLoteForm(emptyRegistroLoteGanadero);
    },
    onError: () => toast.error('No se pudo registrar el control'),
  });

  const cerrarLoteMutation = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: CerrarLoteGanaderoDto }) => ganadoApi.cerrarLote(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ganado-lotes', organizacionId] });
      toast.success('Lote ganadero cerrado');
      setCierreLoteTarget(null);
      setCierreLoteForm(emptyCierreLote);
    },
    onError: () => toast.error('No se pudo cerrar el lote'),
  });

  const removeLoteMutation = useMutation({
    mutationFn: ganadoApi.removeLote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ganado-lotes', organizacionId] });
      queryClient.invalidateQueries({ queryKey: ['ganado'] });
      toast.success('Lote ganadero eliminado');
    },
    onError: () => toast.error('No se pudo eliminar el lote'),
  });

  const lotesGanaderosActivos = lotesGanaderos.filter((lote) => lote.estado === 'ACTIVO');

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ganadería</h1>
          <p className="text-gray-500 mt-1 text-sm">Registro de animales y seguimiento de preñez</p>
        </div>
<<<<<<< HEAD
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setShowLoteModal(true)}
            className="flex items-center gap-2 border border-green-700 bg-white px-4 py-2.5 rounded-lg text-sm font-medium text-green-800 transition-colors hover:bg-green-50 dark:bg-slate-900 dark:text-green-300 dark:hover:bg-green-500/10">
            <Plus size={16} />Nuevo rodeo o lote
=======
        <div className="flex items-center gap-2">
          <button onClick={() => setShowLoteModal(true)}
            className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
            <Boxes size={16} />Nuevo lote
>>>>>>> develop
          </button>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
            <Plus size={16} />Nuevo animal
          </button>
        </div>
      </div>

      <section className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 dark:border-emerald-500/25 dark:bg-emerald-500/10">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">Rodeos y engorde</p>
            <h2 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">Seguí cada etapa del negocio ganadero</h2>
            <p className="mt-1 max-w-3xl text-sm text-gray-600 dark:text-slate-300">Separá las madres y terneros propios de la invernada comprada y los corrales de feedlot. En cada control registrás cabezas, peso, alimento y bajas.</p>
          </div>
          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-sm dark:bg-slate-800 dark:text-emerald-200">
            {lotesGanaderosActivos.length} {lotesGanaderosActivos.length === 1 ? 'lote activo' : 'lotes activos'}
          </span>
        </div>

        {lotesGanaderosLoading ? (
          <div className="flex justify-center py-7"><Loader2 size={24} className="animate-spin text-emerald-600" /></div>
        ) : lotesGanaderos.length === 0 ? (
          <div className="mt-5 rounded-xl border border-dashed border-emerald-300 bg-white/80 p-4 text-sm text-gray-600 dark:border-emerald-400/30 dark:bg-slate-900/60 dark:text-slate-300">
            Todavía no hay rodeos o lotes creados. Empezá con las madres, una compra de invernada o un corral de feedlot.
          </div>
        ) : (
          <div className="mt-5 grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
            {lotesGanaderos.map((lote) => (
              <LoteGanaderoCard
                key={lote.id}
                lote={lote}
                onControl={() => {
                  setRegistroLoteForm({ ...emptyRegistroLoteGanadero, cantidadActual: lote.cantidadActual });
                  setRegistroLoteTarget(lote);
                }}
                onClose={() => {
                  setCierreLoteForm(emptyCierreLote);
                  setCierreLoteTarget(lote);
                }}
                onDelete={() => {
                  if (window.confirm(`¿Eliminar el lote \"${lote.nombre}\" y sus controles?`)) removeLoteMutation.mutate(lote.id);
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* Filtros */}
      <section className="mb-8 rounded-2xl border border-amber-100 bg-amber-50/40 p-5">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Boxes size={18} className="text-amber-700" />
              <h2 className="font-semibold text-gray-900">Lotes ganaderos</h2>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Segui la cria, invernada o feedlot por grupo, sin mezclarlo con el registro individual de animales.
            </p>
          </div>
          <button onClick={() => setShowLoteModal(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm font-medium text-amber-800 hover:bg-amber-100 transition-colors">
            <Plus size={15} />Crear lote
          </button>
        </div>

        {lotesLoading ? (
          <div className="flex justify-center py-6"><Loader2 size={22} className="animate-spin text-amber-700" /></div>
        ) : lotes.length === 0 ? (
          <div className="rounded-xl border border-dashed border-amber-200 bg-white/70 p-5 text-sm text-gray-600">
            Todavia no hay lotes ganaderos. Crealos cuando necesites seguir un grupo de animales por sistema productivo.
          </div>
        ) : (
          <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
            {lotes.map((lote) => {
              const ultimoControl = lote.registros?.[0];
              const esActivo = lote.estado === 'ACTIVO';
              const responsableControl = ultimoControl?.usuario
                ? [ultimoControl.usuario.nombre, ultimoControl.usuario.apellido].filter(Boolean).join(' ')
                : undefined;
              return (
                <article key={lote.id} className="rounded-xl border border-amber-100 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900">{lote.nombre}</p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {SISTEMA_LOTE_LABELS[lote.sistema]}{lote.ubicacion ? ' - ' + lote.ubicacion : ''}
                      </p>
                    </div>
                    <span className={'rounded-full px-2 py-1 text-xs font-semibold ' + (esActivo ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600')}>
                      {esActivo ? 'Activo' : 'Cerrado'}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 border-y border-gray-100 py-3 text-center">
                    <div>
                      <p className="text-lg font-bold text-gray-900">{lote.cantidadActual}</p>
                      <p className="text-[11px] text-gray-500">cabezas</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{lote.pesoPromedioActualKg ?? lote.pesoPromedioIngresoKg ?? '-'}</p>
                      <p className="text-[11px] text-gray-500">kg promedio</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{lote._count?.animales ?? 0}</p>
                      <p className="text-[11px] text-gray-500">identificados</p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-gray-500">
                    {ultimoControl
                      ? 'Ultimo control: ' + formatDate(ultimoControl.fecha) + (responsableControl ? ' por ' + responsableControl : '')
                      : 'Ingreso: ' + formatDate(lote.fechaIngreso)}
                  </p>
                  {esActivo && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => { setRegistroTarget(lote); setRegistroForm(createEmptyRegistro(lote.cantidadActual)); }}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-800 hover:bg-amber-200 transition-colors"
                      >
                        <ClipboardPlus size={14} />Registrar control
                      </button>
                      <button
                        onClick={() => { setCierreTarget(lote); setCierreForm(createEmptyCierre()); }}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <CircleCheck size={14} />Cerrar
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

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
                {paged.map((a: any) => {
                  const activePrenez = a.preneces.find((p: any) => p.estado === 'EN_CURSO');
                  const canPrenez    = a.sexo === 'HEMBRA';
                  return (
                    <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-gray-900">
                        {a.nombre}
                        {a.loteGanadero && <p className="mt-0.5 text-xs font-normal text-amber-700">{a.loteGanadero.nombre}</p>}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${ESPECIE_COLORS[a.especie as Especie]}`}>
                          {ESPECIE_LABELS[a.especie as Especie]}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">
                        {a.sexo === 'HEMBRA' ? 'Hembra' : 'Macho'} · {CATEGORIA_LABELS[a.categoria as CategoriaAnimal]}
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
                          <EvidenceAction organizacionId={organizacionId} origen="GANADERIA" tipoRecurso="ANIMAL" recursoId={a.id} titulo={`Evidencia de ${a.nombre}`} compacto />
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

      {showLoteModal && (
        <Modal title="Nuevo rodeo o lote ganadero" onClose={() => { setShowLoteModal(false); setLoteForm(emptyLoteGanadero); }}>
          <p className="mb-5 text-sm text-gray-500 dark:text-slate-300">Usalo para separar la cría propia, la invernada comprada y los corrales de feedlot.</p>
          <form onSubmit={(e) => { e.preventDefault(); createLoteMutation.mutate({ ...loteForm, cantidadInicial: Number(loteForm.cantidadInicial) }); }} className="space-y-4">
            <Field label="Nombre del rodeo o lote *">
              <input required value={loteForm.nombre} onChange={(e) => setLoteForm({ ...loteForm, nombre: e.target.value })} className="input" placeholder="Ej: Terneros otoño 2026" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Etapa productiva *">
                <select value={loteForm.sistema} onChange={(e) => setLoteForm({ ...loteForm, sistema: e.target.value as SistemaLoteGanadero })} className="input">
                  {(Object.keys(SISTEMA_LOTE_CONFIG) as SistemaLoteGanadero[]).map((sistema) => <option key={sistema} value={sistema}>{SISTEMA_LOTE_CONFIG[sistema].label}</option>)}
                </select>
              </Field>
              <Field label="Cantidad inicial *">
                <input required type="number" min="1" value={loteForm.cantidadInicial || ''} onChange={(e) => setLoteForm({ ...loteForm, cantidadInicial: Number(e.target.value) || 0 })} className="input" placeholder="Ej: 80" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Fecha de ingreso *">
                <input required type="date" value={loteForm.fechaIngreso} onChange={(e) => setLoteForm({ ...loteForm, fechaIngreso: e.target.value })} className="input" />
              </Field>
              <Field label="Peso promedio inicial (kg)">
                <input type="number" min="0" step="0.1" value={loteForm.pesoPromedioIngresoKg ?? ''} onChange={(e) => setLoteForm({ ...loteForm, pesoPromedioIngresoKg: e.target.value ? Number(e.target.value) : undefined })} className="input" placeholder="Opcional" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Ubicación o corral">
                <input value={loteForm.ubicacion ?? ''} onChange={(e) => setLoteForm({ ...loteForm, ubicacion: e.target.value })} className="input" placeholder="Ej: Corral 2" />
              </Field>
              <Field label="Costo de compra total">
                <input type="number" min="0" step="0.01" value={loteForm.costoCompraTotal ?? ''} onChange={(e) => setLoteForm({ ...loteForm, costoCompraTotal: e.target.value ? Number(e.target.value) : undefined })} className="input" placeholder="Solo si corresponde" />
              </Field>
            </div>
            <Field label="Observaciones">
              <textarea rows={2} value={loteForm.observaciones ?? ''} onChange={(e) => setLoteForm({ ...loteForm, observaciones: e.target.value })} className="input resize-none" placeholder="Opcional" />
            </Field>
            <ModalActions onCancel={() => { setShowLoteModal(false); setLoteForm(emptyLoteGanadero); }} loading={createLoteMutation.isPending} label="Crear lote" />
          </form>
        </Modal>
      )}

      {registroLoteTarget && (
        <Modal title={`Registrar control — ${registroLoteTarget.nombre}`} onClose={() => setRegistroLoteTarget(null)}>
          <p className="mb-5 text-sm text-gray-500 dark:text-slate-300">Actualizá los datos reales del rodeo. El último control se mostrará como estado actual.</p>
          <form onSubmit={(e) => { e.preventDefault(); addRegistroLoteMutation.mutate({ id: registroLoteTarget.id, dto: { ...registroLoteForm, cantidadActual: Number(registroLoteForm.cantidadActual) } }); }} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Fecha *">
                <input required type="date" value={registroLoteForm.fecha} onChange={(e) => setRegistroLoteForm({ ...registroLoteForm, fecha: e.target.value })} className="input" />
              </Field>
              <Field label="Cabezas actuales *">
                <input required type="number" min="0" value={registroLoteForm.cantidadActual ?? ''} onChange={(e) => setRegistroLoteForm({ ...registroLoteForm, cantidadActual: Number(e.target.value) || 0 })} className="input" />
              </Field>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Peso prom. kg">
                <input type="number" min="0" step="0.1" value={registroLoteForm.pesoPromedioKg ?? ''} onChange={(e) => setRegistroLoteForm({ ...registroLoteForm, pesoPromedioKg: e.target.value ? Number(e.target.value) : undefined })} className="input" placeholder="Opcional" />
              </Field>
              <Field label="Alimento kg">
                <input type="number" min="0" step="0.1" value={registroLoteForm.alimentoKg ?? ''} onChange={(e) => setRegistroLoteForm({ ...registroLoteForm, alimentoKg: e.target.value ? Number(e.target.value) : undefined })} className="input" placeholder="0" />
              </Field>
              <Field label="Bajas">
                <input type="number" min="0" value={registroLoteForm.bajas ?? ''} onChange={(e) => setRegistroLoteForm({ ...registroLoteForm, bajas: e.target.value ? Number(e.target.value) : undefined })} className="input" placeholder="0" />
              </Field>
            </div>
            <Field label="Observaciones">
              <textarea rows={2} value={registroLoteForm.observaciones ?? ''} onChange={(e) => setRegistroLoteForm({ ...registroLoteForm, observaciones: e.target.value })} className="input resize-none" placeholder="Opcional" />
            </Field>
            <ModalActions onCancel={() => setRegistroLoteTarget(null)} loading={addRegistroLoteMutation.isPending} label="Guardar control" />
          </form>
        </Modal>
      )}

      {cierreLoteTarget && (
        <Modal title={`Cerrar lote — ${cierreLoteTarget.nombre}`} onClose={() => setCierreLoteTarget(null)}>
          <p className="mb-5 text-sm text-gray-500 dark:text-slate-300">Usalo cuando termina el ciclo o se vende la hacienda. Los controles y datos quedan guardados como historial.</p>
          <form onSubmit={(e) => { e.preventDefault(); cerrarLoteMutation.mutate({ id: cierreLoteTarget.id, dto: cierreLoteForm }); }} className="space-y-4">
            <Field label="Fecha de egreso o venta *">
              <input required type="date" value={cierreLoteForm.fechaEgreso} onChange={(e) => setCierreLoteForm({ ...cierreLoteForm, fechaEgreso: e.target.value })} className="input" />
            </Field>
            <Field label="Importe total de venta">
              <input type="number" min="0" step="0.01" value={cierreLoteForm.precioVentaTotal ?? ''} onChange={(e) => setCierreLoteForm({ ...cierreLoteForm, precioVentaTotal: e.target.value ? Number(e.target.value) : undefined })} className="input" placeholder="Opcional" />
            </Field>
            <ModalActions onCancel={() => setCierreLoteTarget(null)} loading={cerrarLoteMutation.isPending} label="Cerrar lote" />
          </form>
        </Modal>
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
            <Field label="Lote ganadero">
              <select value={form.loteGanaderoId ?? ''} onChange={(e) => setForm({ ...form, loteGanaderoId: e.target.value ? Number(e.target.value) : undefined })} className="input">
                <option value="">Sin asignar a un lote</option>
                {lotes.filter((lote) => lote.estado === 'ACTIVO').map((lote) => (
                  <option key={lote.id} value={lote.id}>{lote.nombre}</option>
                ))}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
            {form.especie === 'BOVINO' && lotesGanaderosActivos.length > 0 && (
              <Field label="Rodeo o lote ganadero">
                <select value={form.loteGanaderoId ?? ''}
                  onChange={(e) => setForm({ ...form, loteGanaderoId: e.target.value ? Number(e.target.value) : undefined })}
                  className="input">
                  <option value="">Sin asociar por ahora</option>
                  {lotesGanaderosActivos.map((lote) => <option key={lote.id} value={lote.id}>{lote.nombre} · {SISTEMA_LOTE_CONFIG[lote.sistema].label}</option>)}
                </select>
              </Field>
            )}
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

          {(prenezTarget?.preneces?.length ?? 0) > 0 && (
            <div className="mb-5">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Historial</h3>
              <div className="space-y-2">
                {prenezTarget?.preneces?.map((p) => {
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
      {showLoteModal && (
        <Modal title="Nuevo lote ganadero" onClose={() => { setShowLoteModal(false); setLoteForm(createEmptyLote()); }}>
          <p className="mb-4 text-sm text-gray-500">
            Crea un grupo para seguir cria propia, invernada comprada o feedlot.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              createLoteMutation.mutate({ ...loteForm, cantidadInicial: Number(loteForm.cantidadInicial) });
            }}
            className="space-y-4"
          >
            <Field label="Nombre del lote *">
              <input required value={loteForm.nombre} onChange={(event) => setLoteForm({ ...loteForm, nombre: event.target.value })}
                className="input" placeholder="Ej: Invernada primavera 2026" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Sistema *">
                <select value={loteForm.sistema} onChange={(event) => setLoteForm({ ...loteForm, sistema: event.target.value as SistemaLoteGanadero })} className="input">
                  {(Object.keys(SISTEMA_LOTE_LABELS) as SistemaLoteGanadero[]).map((sistema) => (
                    <option key={sistema} value={sistema}>{SISTEMA_LOTE_LABELS[sistema]}</option>
                  ))}
                </select>
              </Field>
              <Field label="Cantidad inicial *">
                <input required type="number" min={1} value={loteForm.cantidadInicial || ''}
                  onChange={(event) => setLoteForm({ ...loteForm, cantidadInicial: Number(event.target.value) })}
                  className="input" placeholder="Ej: 80" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Fecha de ingreso *">
                <input required type="date" value={loteForm.fechaIngreso}
                  onChange={(event) => setLoteForm({ ...loteForm, fechaIngreso: event.target.value })} className="input" />
              </Field>
              <Field label="Peso promedio de ingreso (kg)">
                <input type="number" min={0} step={0.1} value={loteForm.pesoPromedioIngresoKg ?? ''}
                  onChange={(event) => setLoteForm({ ...loteForm, pesoPromedioIngresoKg: event.target.value ? Number(event.target.value) : undefined })}
                  className="input" placeholder="Opcional" />
              </Field>
            </div>
            <Field label="Ubicacion">
              <input value={loteForm.ubicacion ?? ''} onChange={(event) => setLoteForm({ ...loteForm, ubicacion: event.target.value })}
                className="input" placeholder="Ej: Corral 3 o Potrero norte" />
            </Field>
            <Field label="Costo de compra total">
              <input type="number" min={0} value={loteForm.costoCompraTotal ?? ''}
                onChange={(event) => setLoteForm({ ...loteForm, costoCompraTotal: event.target.value ? Number(event.target.value) : undefined })}
                className="input" placeholder="Opcional" />
            </Field>
            <Field label="Observaciones">
              <textarea rows={2} value={loteForm.observaciones ?? ''} onChange={(event) => setLoteForm({ ...loteForm, observaciones: event.target.value })}
                className="input resize-none" placeholder="Opcional" />
            </Field>
            <ModalActions onCancel={() => { setShowLoteModal(false); setLoteForm(createEmptyLote()); }} loading={createLoteMutation.isPending} label="Crear lote" />
          </form>
        </Modal>
      )}

      {registroTarget && (
        <Modal title={'Registrar control - ' + registroTarget.nombre} onClose={() => setRegistroTarget(null)}>
          <p className="mb-4 text-sm text-gray-500">
            Actualiza las cabezas, el peso promedio y los datos operativos del grupo.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              registrarLoteMutation.mutate({
                id: registroTarget.id,
                dto: { ...registroForm, cantidadActual: Number(registroForm.cantidadActual) },
              });
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <Field label="Fecha *">
                <input required type="date" value={registroForm.fecha}
                  onChange={(event) => setRegistroForm({ ...registroForm, fecha: event.target.value })} className="input" />
              </Field>
              <Field label="Cantidad actual *">
                <input required type="number" min={0} value={registroForm.cantidadActual}
                  onChange={(event) => setRegistroForm({ ...registroForm, cantidadActual: Number(event.target.value) })}
                  className="input" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Peso promedio (kg)">
                <input type="number" min={0} step={0.1} value={registroForm.pesoPromedioKg ?? ''}
                  onChange={(event) => setRegistroForm({ ...registroForm, pesoPromedioKg: event.target.value ? Number(event.target.value) : undefined })}
                  className="input" placeholder="Opcional" />
              </Field>
              <Field label="Alimento suministrado (kg)">
                <input type="number" min={0} step={0.1} value={registroForm.alimentoKg ?? ''}
                  onChange={(event) => setRegistroForm({ ...registroForm, alimentoKg: event.target.value ? Number(event.target.value) : undefined })}
                  className="input" placeholder="Opcional" />
              </Field>
            </div>
            <Field label="Bajas">
              <input type="number" min={0} value={registroForm.bajas ?? ''}
                onChange={(event) => setRegistroForm({ ...registroForm, bajas: event.target.value ? Number(event.target.value) : undefined })}
                className="input" placeholder="Opcional" />
            </Field>
            <Field label="Observaciones">
              <textarea rows={2} value={registroForm.observaciones ?? ''} onChange={(event) => setRegistroForm({ ...registroForm, observaciones: event.target.value })}
                className="input resize-none" placeholder="Sanidad, manejo, alimentacion o cualquier novedad" />
            </Field>
            <ModalActions onCancel={() => setRegistroTarget(null)} loading={registrarLoteMutation.isPending} label="Guardar control" />
          </form>
        </Modal>
      )}

      {cierreTarget && (
        <Modal title={'Cerrar lote - ' + cierreTarget.nombre} onClose={() => setCierreTarget(null)}>
          <p className="mb-4 text-sm text-gray-500">
            Conservamos el historial del lote para que puedas revisar su resultado mas adelante.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              cerrarLoteMutation.mutate({ id: cierreTarget.id, dto: cierreForm });
            }}
            className="space-y-4"
          >
            <Field label="Fecha de cierre *">
              <input required type="date" value={cierreForm.fechaEgreso}
                onChange={(event) => setCierreForm({ ...cierreForm, fechaEgreso: event.target.value })} className="input" />
            </Field>
            <Field label="Importe total de venta">
              <input type="number" min={0} value={cierreForm.precioVentaTotal ?? ''}
                onChange={(event) => setCierreForm({ ...cierreForm, precioVentaTotal: event.target.value ? Number(event.target.value) : undefined })}
                className="input" placeholder="Opcional" />
            </Field>
            <ModalActions onCancel={() => setCierreTarget(null)} loading={cerrarLoteMutation.isPending} label="Cerrar lote" />
          </form>
        </Modal>
      )}
    </div>
  );
}

function LoteGanaderoCard({
  lote,
  onControl,
  onClose,
  onDelete,
}: {
  lote: LoteGanadero;
  onControl: () => void;
  onClose: () => void;
  onDelete: () => void;
}) {
  const config = SISTEMA_LOTE_CONFIG[lote.sistema];
  const ultimoControl = lote.registros?.[0];
  const variacionPeso = lote.pesoPromedioActualKg != null && lote.pesoPromedioIngresoKg != null
    ? lote.pesoPromedioActualKg - lote.pesoPromedioIngresoKg
    : null;
  const money = (amount: number) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount);

  return (
    <article className={`rounded-xl border bg-white p-4 shadow-sm dark:bg-slate-900 ${lote.estado === 'ACTIVO' ? 'border-slate-200 dark:border-slate-700' : 'border-slate-200 opacity-75 dark:border-slate-700'}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${config.color}`}>{config.label}</span>
          <h3 className="mt-2 font-bold text-gray-900 dark:text-white">{lote.nombre}</h3>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-slate-400">{lote.ubicacion || 'Sin ubicación indicada'} · Ingreso {formatDate(lote.fechaIngreso)}</p>
        </div>
        <button type="button" onClick={onDelete} className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10" title="Eliminar lote">
          <Trash2 size={15} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <MetricLote label="Cabezas" value={String(lote.cantidadActual)} detail={`de ${lote.cantidadInicial} iniciales`} />
        <MetricLote label="Peso prom." value={lote.pesoPromedioActualKg != null ? `${lote.pesoPromedioActualKg} kg` : '—'} detail={variacionPeso == null ? 'Sin pesada' : `${variacionPeso >= 0 ? '+' : ''}${variacionPeso.toFixed(1)} kg`} />
        <MetricLote label="Vinculados" value={String(lote._count?.animales ?? 0)} detail="animales individuales" />
      </div>

      {ultimoControl ? (
        <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-gray-600 dark:bg-slate-800 dark:text-slate-300">
          Último control: {formatDate(ultimoControl.fecha)}{ultimoControl.alimentoKg > 0 ? ` · ${ultimoControl.alimentoKg} kg alimento` : ''}{ultimoControl.bajas > 0 ? ` · ${ultimoControl.bajas} bajas` : ''}
        </div>
      ) : (
        <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-gray-500 dark:bg-slate-800 dark:text-slate-400">Aún no hay controles cargados.</div>
      )}

      {lote.estado === 'CERRADO' ? (
        <div className="mt-3 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300">
          Cerrado el {lote.fechaEgreso ? formatDate(lote.fechaEgreso) : '—'}{lote.precioVentaTotal != null ? ` · Venta ${money(lote.precioVentaTotal)}` : ''}
        </div>
      ) : (
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={onControl} className="flex-1 rounded-lg bg-green-700 px-3 py-2 text-xs font-bold text-white transition hover:bg-green-800">Registrar control</button>
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800">Cerrar</button>
        </div>
      )}
    </article>
  );
}

function MetricLote({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-lg border border-slate-100 p-2 dark:border-slate-800">
      <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="truncate text-[10px] text-gray-500 dark:text-slate-400">{detail}</p>
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
