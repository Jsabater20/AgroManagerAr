import { File } from 'expo-file-system';
import { api } from '@/api/client';
import type {
  Evidence,
  LocalEvidenceFile,
  OrigenEvidencia,
  TipoRecursoEvidencia,
} from '@/types/evidencias';

interface PrepararEvidenciaResponse {
  evidenciaId: string;
  archivos: Array<{
    id: string;
    storageKey: string;
    uploadUrl: string;
  }>;
}

interface SubirEvidenciaInput {
  origen: OrigenEvidencia;
  tipoRecurso: TipoRecursoEvidencia;
  recursoId: number;
  comentario?: string;
  archivos: LocalEvidenceFile[];
}

export const subirEvidencia = async (
  organizacionId: number,
  input: SubirEvidenciaInput,
): Promise<Evidence> => {
  const { data: carga } = await api.post<PrepararEvidenciaResponse>(
    `/organizaciones/${organizacionId}/evidencias/subidas`,
    {
      origen: input.origen,
      tipoRecurso: input.tipoRecurso,
      recursoId: input.recursoId,
      comentario: input.comentario?.trim() || undefined,
      archivos: input.archivos.map((archivo) => ({
        nombre: archivo.nombre,
        mimeType: archivo.mimeType,
        tamanoBytes: archivo.tamanoBytes,
        ancho: archivo.ancho,
        alto: archivo.alto,
      })),
    },
  );

  await Promise.all(
    carga.archivos.map(async (archivo, indice) => {
      const foto = input.archivos[indice];
      const response = await fetch(archivo.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': foto.mimeType },
        body: new File(foto.uri),
      });

      if (!response.ok) {
        throw new Error('No pudimos subir una de las fotos a almacenamiento seguro.');
      }
    }),
  );

  const { data } = await api.post<Evidence>(
    `/organizaciones/${organizacionId}/evidencias/${carga.evidenciaId}/confirmar`,
  );
  return data;
};

export const listEvidencias = async (
  organizacionId: number,
  tipoRecurso: TipoRecursoEvidencia,
  recursoId: number,
) => {
  const { data } = await api.get<Evidence[]>(
    `/organizaciones/${organizacionId}/evidencias`,
    { params: { tipoRecurso, recursoId } },
  );
  return data;
};
