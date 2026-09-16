export const CARGOS_EQUIPO = [
  { value: 'ADMINISTRACION_GENERAL', label: 'Administración general' },
  { value: 'ENCARGADO_ESTABLECIMIENTO', label: 'Encargado/a de establecimiento' },
  { value: 'ENCARGADO_AGRICOLA', label: 'Encargado/a agrícola' },
  { value: 'ENCARGADO_GANADERO', label: 'Encargado/a ganadero' },
  { value: 'ENCARGADO_TAMBO', label: 'Encargado/a de tambo' },
  { value: 'ENCARGADO_AVICOLA', label: 'Encargado/a avícola' },
  { value: 'ENCARGADO_FRUTIHORTICOLA', label: 'Encargado/a frutihortícola' },
  { value: 'ASESOR_AGRONOMICO', label: 'Asesor/a agronómico' },
  { value: 'VETERINARIO', label: 'Veterinario/a' },
  { value: 'ENCARGADO_MAQUINARIA', label: 'Encargado/a de maquinaria' },
  { value: 'MECANICO_MANTENIMIENTO', label: 'Mecánico/a de mantenimiento' },
  { value: 'OPERADOR_MAQUINARIA', label: 'Operador/a de maquinaria' },
  { value: 'OPERARIO_RURAL', label: 'Operario/a rural' },
  { value: 'INSUMOS_DEPOSITO', label: 'Insumos y depósito' },
  { value: 'CONTABILIDAD', label: 'Contabilidad' },
  { value: 'FINANZAS_PAGOS', label: 'Finanzas y pagos' },
  { value: 'LOGISTICA_TRANSPORTE', label: 'Logística y transporte' },
  { value: 'COMERCIALIZACION', label: 'Comercialización' },
  { value: 'CONTRATISTA_EXTERNO', label: 'Contratista externo' },
  { value: 'OTRO', label: 'Otro cargo' },
] as const;

export type CargoEquipo = (typeof CARGOS_EQUIPO)[number]['value'];

export function nombreCargo(cargo?: string | null, personalizado?: string | null) {
  if (cargo === 'OTRO' && personalizado?.trim()) return personalizado.trim();
  return CARGOS_EQUIPO.find((item) => item.value === cargo)?.label || 'Sin cargo definido';
}
