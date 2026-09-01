import { api } from './client';

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

export interface ArchivoEvidencia {
  id: string;
  nombre: string;
  mimeType: string;
  tamanoBytes: number;
  url: string;
}

export interface Evidencia {
  id: string;
  organizacionId: number;
  usuarioId: number;
  comentario?: string | null;
  fechaHora: string;
  archivos: ArchivoEvidencia[];
  usuario: { id: number; nombre: string; apellido: string };
}

type PrepararCargaResponse = {
  evidenciaId: string;
  archivos: Array<{ id: string; storageKey: string; uploadUrl: string }>;
};

const MIME_TYPES_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp'];
const TAMANO_MAXIMO = 10 * 1024 * 1024;

export async function subirEvidencia(
  organizacionId: number,
  input: {
    origen: OrigenEvidencia;
    tipoRecurso: TipoRecursoEvidencia;
    recursoId: number;
    comentario?: string;
    archivos: File[];
  },
): Promise<Evidencia> {
  if (!input.archivos.length) throw new Error('Seleccioná al menos una imagen.');
  if (input.archivos.length > 10) throw new Error('Podés adjuntar hasta 10 imágenes por evidencia.');

  input.archivos.forEach((archivo) => {
    if (!MIME_TYPES_PERMITIDOS.includes(archivo.type)) {
      throw new Error('Solo se permiten imágenes JPG, PNG o WEBP.');
    }
    if (!archivo.size || archivo.size > TAMANO_MAXIMO) {
      throw new Error('Cada imagen puede pesar hasta 10 MB.');
    }
  });

  const { data: carga } = await api.post<PrepararCargaResponse>(
    `/organizaciones/${organizacionId}/evidencias/subidas`,
    {
      origen: input.origen,
      tipoRecurso: input.tipoRecurso,
      recursoId: input.recursoId,
      comentario: input.comentario?.trim() || undefined,
      archivos: input.archivos.map((archivo) => ({
        nombre: archivo.name,
        mimeType: archivo.type,
        tamanoBytes: archivo.size,
      })),
    },
  );

  await Promise.all(
    carga.archivos.map(async (archivo, indice) => {
      try {
        const respuesta = await fetch(archivo.uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': input.archivos[indice].type },
          body: input.archivos[indice],
        });
        if (!respuesta.ok) throw new Error();
      } catch {
        throw new Error('No se pudo subir una imagen. Verificá la conexión y la política CORS del bucket.');
      }
    }),
  );

  return api
    .post<Evidencia>(`/organizaciones/${organizacionId}/evidencias/${carga.evidenciaId}/confirmar`)
    .then((response) => response.data);
}

export const listarEvidencias = (
  organizacionId: number,
  tipoRecurso: TipoRecursoEvidencia,
  recursoId: number,
): Promise<Evidencia[]> =>
  api
    .get<Evidencia[]>(`/organizaciones/${organizacionId}/evidencias`, {
      params: { tipoRecurso, recursoId },
    })
    .then((response) => response.data);

export const eliminarEvidencia = (organizacionId: number, evidenciaId: string) =>
  api.delete(`/organizaciones/${organizacionId}/evidencias/${evidenciaId}`);
