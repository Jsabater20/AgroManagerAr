export type OrigenEvidencia =
  | 'ACTIVIDADES'
  | 'GANADERIA'
  | 'MAQUINARIAS'
  | 'INSUMOS'
  | 'CAMPOS'
  | 'SIEMBRAS';

export type TipoRecursoEvidencia =
  | 'ACTIVIDAD'
  | 'CAMPO'
  | 'LOTE'
  | 'SIEMBRA'
  | 'ANIMAL'
  | 'MAQUINARIA'
  | 'INSUMO';

export interface LocalEvidenceFile {
  id: string;
  uri: string;
  nombre: string;
  mimeType: 'image/jpeg';
  tamanoBytes: number;
  ancho: number;
  alto: number;
}

export interface EvidenceFile {
  id: string;
  evidenciaId: string;
  storageKey: string;
  nombre: string;
  mimeType: string;
  tamanoBytes: number;
  ancho?: number | null;
  alto?: number | null;
  createdAt: string;
  url: string;
}

export interface Evidence {
  id: string;
  organizacionId: number;
  usuarioId: number;
  origen: OrigenEvidencia;
  tipoRecurso: TipoRecursoEvidencia;
  recursoId: number;
  comentario?: string | null;
  fechaHora: string;
  createdAt: string;
  archivos: EvidenceFile[];
  usuario: { id: number; nombre: string; apellido: string };
}
