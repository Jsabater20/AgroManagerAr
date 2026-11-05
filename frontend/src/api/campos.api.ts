import { api } from './client';

export type NivelRiesgoHidrico = 'BAJO' | 'MEDIO' | 'ALTO';

export type PerfilRiesgoHidricoCampo = {
  campoId: number;
  nivel: NivelRiesgoHidrico;
  zonasBajas: string | null;
  drenajes: string | null;
  caminosYAccesos: string | null;
  infraestructuraCritica: string | null;
  sectoresSeguros: string | null;
  observaciones: string | null;
  actualizadoPor: { id: number; nombre: string; apellido: string } | null;
  updatedAt: string | null;
  configurado: boolean;
  puedeEditar: boolean;
};

export type ActualizarPerfilRiesgoHidrico = Omit<PerfilRiesgoHidricoCampo, 'campoId' | 'actualizadoPor' | 'updatedAt' | 'configurado' | 'puedeEditar'>;

export type CategoriaChecklistPreventivoHidrico =
  | 'DRENAJE'
  | 'ACCESO'
  | 'INFRAESTRUCTURA'
  | 'GANADERIA'
  | 'MAQUINARIA_E_INSUMOS'
  | 'GENERAL';

export type EstadoChecklistPreventivoHidrico = 'PENDIENTE' | 'COMPLETADO';

export type TipoPlantillaPreventiva =
  | 'LLUVIA_INTENSA'
  | 'EXCESO_AGUA'
  | 'SEQUIA'
  | 'HELADA'
  | 'VIENTO_FUERTE';

export type ChecklistPreventivoHidrico = {
  id: number;
  organizacionId: number;
  campoId: number;
  titulo: string;
  descripcion: string | null;
  categoria: CategoriaChecklistPreventivoHidrico;
  responsableId: number | null;
  fechaLimite: string | null;
  estado: EstadoChecklistPreventivoHidrico;
  origenAutomatico: string | null;
  actualizadoAutomaticamenteEn: string | null;
  completadoEn: string | null;
  completadoPorId: number | null;
  createdAt: string;
  responsable: {
    id: number;
    cargo: string;
    cargoPersonalizado: string | null;
    usuario: { id: number; nombre: string; apellido: string };
  } | null;
  completadoPor: { id: number; nombre: string; apellido: string } | null;
  creadoPor: { id: number; nombre: string; apellido: string };
  trabajo: { id: number; estado: string } | null;
  puedeCrearTrabajo: boolean;
  puedeCompletar: boolean;
};

export type ChecklistPreventivoHidricoResponse = {
  puedeEditar: boolean;
  items: ChecklistPreventivoHidrico[];
};

export type GuardarChecklistPreventivoHidrico = {
  titulo?: string;
  descripcion?: string | null;
  categoria?: CategoriaChecklistPreventivoHidrico;
  responsableId?: number | null;
  fechaLimite?: string | null;
};

export type UmbralAlertaHidricaCampo = {
  campoId: number;
  activo: boolean;
  lluviaDiariaMm: number;
  lluviaAcumulada48hMm: number;
  probabilidadLluviaPct: number;
  crearAccionesAutomaticas: boolean;
  actualizadoPor: { id: number; nombre: string; apellido: string } | null;
  updatedAt: string | null;
  configurado: boolean;
  puedeEditar: boolean;
  esPro: boolean;
};

export type ActualizarUmbralAlertaHidricaCampo = Pick<
  UmbralAlertaHidricaCampo,
  | 'activo'
  | 'lluviaDiariaMm'
  | 'lluviaAcumulada48hMm'
  | 'probabilidadLluviaPct'
  | 'crearAccionesAutomaticas'
>;

export type ResumenHidricoCampo = {
  id: number;
  nombre: string;
  nivelRiesgo: NivelRiesgoHidrico | null;
  perfilConfigurado: boolean;
  accionesPendientes: number;
  accionesAutomaticasPendientes: number;
  proximaAccion: {
    id: number;
    titulo: string;
    fechaLimite: string | null;
  } | null;
  alertasActivas: number;
  alertasPrioritarias: number;
  automatizacionActiva: boolean;
};

export type ResumenHidricoDashboard = {
  resumen: {
    totalCampos: number;
    altoRiesgo: number;
    sinPerfil: number;
    accionesPendientes: number;
    accionesAutomaticasPendientes: number;
    alertasActivas: number;
    automatizacionesActivas: number;
    siguienteAccion: {
      campoId: number;
      campoNombre: string;
      titulo: string;
      fechaLimite: string | null;
    } | null;
  };
  campos: ResumenHidricoCampo[];
};

export interface CampoFilters {
  usuarioOrganizacionId?: number | null;
}

const getAll = async (filters?: CampoFilters) => {
  const params = new URLSearchParams();
  
  if (filters?.usuarioOrganizacionId) {
    params.append('usuarioOrganizacionId', filters.usuarioOrganizacionId.toString());
  }

  const { data } = await api.get('/campos', { params });
  return data;
};

const getOne = async (id: number) => {
  const { data } = await api.get(`/campos/${id}`);
  return data;
};

const create = async (payload: any) => {
  const { data } = await api.post('/campos', payload);
  return data;
};

const update = async (id: number, payload: any) => {
  const { data } = await api.patch(`/campos/${id}`, payload);
  return data;
};

const remove = async (id: number) => {
  const { data } = await api.delete(`/campos/${id}`);
  return data;
};

const addLote = async (campoId: number, payload: any) => {
  const { data } = await api.post(`/campos/${campoId}/lotes`, payload);
  return data;
};

const getPerfilRiesgoHidrico = async (campoId: number) => {
  const { data } = await api.get<PerfilRiesgoHidricoCampo>(`/campos/${campoId}/riesgo-hidrico`);
  return data;
};

const updatePerfilRiesgoHidrico = async (campoId: number, payload: ActualizarPerfilRiesgoHidrico) => {
  const { data } = await api.patch<PerfilRiesgoHidricoCampo>(`/campos/${campoId}/riesgo-hidrico`, payload);
  return data;
};

const getUmbralAlertaHidrica = async (campoId: number) => {
  const { data } = await api.get<UmbralAlertaHidricaCampo>(`/campos/${campoId}/umbrales-alerta-hidrica`);
  return data;
};

const updateUmbralAlertaHidrica = async (
  campoId: number,
  payload: ActualizarUmbralAlertaHidricaCampo,
) => {
  const { data } = await api.patch<UmbralAlertaHidricaCampo>(`/campos/${campoId}/umbrales-alerta-hidrica`, payload);
  return data;
};

const getResumenHidricoDashboard = async () => {
  const { data } = await api.get<ResumenHidricoDashboard>('/campos/resumen-hidrico');
  return data;
};

const getChecklistPreventivoHidrico = async (campoId: number) => {
  const { data } = await api.get<ChecklistPreventivoHidricoResponse>(`/campos/${campoId}/checklist-hidrico`);
  return data;
};

const createChecklistPreventivoHidrico = async (
  campoId: number,
  payload: GuardarChecklistPreventivoHidrico,
) => {
  const { data } = await api.post(`/campos/${campoId}/checklist-hidrico`, payload);
  return data;
};

const updateChecklistPreventivoHidrico = async (
  campoId: number,
  itemId: number,
  payload: GuardarChecklistPreventivoHidrico,
) => {
  const { data } = await api.patch(`/campos/${campoId}/checklist-hidrico/${itemId}`, payload);
  return data;
};

const updateEstadoChecklistPreventivoHidrico = async (
  campoId: number,
  itemId: number,
  estado: EstadoChecklistPreventivoHidrico,
) => {
  const { data } = await api.patch(`/campos/${campoId}/checklist-hidrico/${itemId}/estado`, { estado });
  return data;
};

const removeChecklistPreventivoHidrico = async (campoId: number, itemId: number) => {
  const { data } = await api.delete(`/campos/${campoId}/checklist-hidrico/${itemId}`);
  return data;
};

const cargarPlantillaChecklistPreventivoHidrico = async (
  campoId: number,
  tipo: TipoPlantillaPreventiva = 'LLUVIA_INTENSA',
) => {
  const { data } = await api.post<{ creados: number; tipo: TipoPlantillaPreventiva }>(
    `/campos/${campoId}/checklist-hidrico/plantilla`,
    { tipo },
  );
  return data;
};

const crearTrabajoDesdeChecklistPreventivoHidrico = async (
  campoId: number,
  itemId: number,
) => {
  const { data } = await api.post<{
    trabajo: { id: number; estado: string };
    creado: boolean;
  }>(`/campos/${campoId}/checklist-hidrico/${itemId}/crear-trabajo`);
  return data;
};

export const camposApi = {
  getAll,
  getOne,
  create,
  update,
  remove,
  addLote,
  getPerfilRiesgoHidrico,
  updatePerfilRiesgoHidrico,
  getUmbralAlertaHidrica,
  updateUmbralAlertaHidrica,
  getResumenHidricoDashboard,
  getChecklistPreventivoHidrico,
  createChecklistPreventivoHidrico,
  updateChecklistPreventivoHidrico,
  updateEstadoChecklistPreventivoHidrico,
  removeChecklistPreventivoHidrico,
  cargarPlantillaChecklistPreventivoHidrico,
  crearTrabajoDesdeChecklistPreventivoHidrico,
};
