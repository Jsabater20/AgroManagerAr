import { api } from './client';

export type PronosticoClimatico = {
  proveedor: 'WEATHERAPI';
  atribucion: string;
  zonaHoraria: string;
  actualizadoProveedorEn: string | null;
  actual: {
    fecha: string;
    temperaturaC: number | null;
    sensacionTermicaC: number | null;
    humedadRelativa: number | null;
    precipitacionMm: number | null;
    vientoKmh: number | null;
    rafagasKmh: number | null;
    codigoMeteorologico: number | null;
  } | null;
  diario: Array<{
    fecha: string;
    temperaturaMaxC: number | null;
    temperaturaMinC: number | null;
    precipitacionMm: number | null;
    probabilidadPrecipitacionMax: number | null;
    vientoMaxKmh: number | null;
    rafagasMaxKmh: number | null;
    codigoMeteorologico: number | null;
  }>;
};

export type RespuestaPronostico = {
  estado: 'DISPONIBLE' | 'DESACTUALIZADO' | 'UBICACION_PENDIENTE' | 'PROVEEDOR_NO_CONFIGURADO' | 'NO_DISPONIBLE';
  campo: {
    id: number;
    nombre: string;
    ubicacion: string | null;
    provincia: string | null;
    localidad: string | null;
    tieneCoordenadas: boolean;
  };
  mensaje?: string;
  proveedor?: string;
  obtenidoEn?: string;
  expiraEn?: string;
  actualizadoProveedorEn?: string | null;
  error?: string | null;
  datos: PronosticoClimatico | null;
};

export type RegistroPrecipitacion = {
  id: number;
  organizacionId: number;
  campoId: number;
  loteId: number | null;
  usuarioId: number | null;
  fecha: string;
  milimetros: number | string;
  observaciones: string | null;
  corregidoEn: string | null;
  createdAt: string;
  lote?: { id: number; nombre: string } | null;
  usuario?: { id: number; nombre: string; apellido: string } | null;
};

export type ResumenPrecipitaciones = {
  semanaMm: number;
  mesMm: number;
  anioMm: number;
  registros: Array<{ fecha: string; milimetros: number }>;
};

export type CrearRegistroPrecipitacion = {
  campoId: number;
  loteId?: number;
  fecha: string;
  milimetros: number;
  observaciones?: string;
};

export type ActualizarRegistroPrecipitacion = Omit<CrearRegistroPrecipitacion, 'campoId' | 'loteId'>;

export const climaApi = {
  obtenerPronostico: (organizacionId: number, campoId: number) =>
    api.get<RespuestaPronostico>(`/clima/campos/${campoId}/pronostico`, { params: { organizacionId } })
      .then((response) => response.data),
  listarPrecipitaciones: (organizacionId: number, campoId: number) =>
    api.get<RegistroPrecipitacion[]>(`/clima/campos/${campoId}/precipitaciones`, { params: { organizacionId } })
      .then((response) => response.data),
  resumenPrecipitaciones: (organizacionId: number, campoId: number) =>
    api.get<ResumenPrecipitaciones>(`/clima/campos/${campoId}/precipitaciones/resumen`, { params: { organizacionId } })
      .then((response) => response.data),
  crearPrecipitacion: (organizacionId: number, datos: CrearRegistroPrecipitacion) =>
    api.post<RegistroPrecipitacion>('/clima/precipitaciones', datos, { params: { organizacionId } })
      .then((response) => response.data),
  actualizarPrecipitacion: (organizacionId: number, registroId: number, datos: ActualizarRegistroPrecipitacion) =>
    api.patch<RegistroPrecipitacion>(`/clima/precipitaciones/${registroId}`, datos, { params: { organizacionId } })
      .then((response) => response.data),
};
