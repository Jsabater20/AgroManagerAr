export interface LoteCampo {
  id: number;
  nombre: string;
  hectareas: number;
  siembras?: Array<{
    id: number;
    estado: 'EN_CURSO' | 'COSECHADA' | 'PERDIDA';
    tipoCultivo?: { id: number; nombre: string } | null;
  }>;
}

export interface Campo {
  id: number;
  nombre: string;
  hectareas: number;
  ubicacion?: string | null;
  propietario?: string | null;
  lotes: LoteCampo[];
  usuario?: { nombre: string; apellido: string } | null;
}

export interface CampoInput {
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
}

export interface LoteInput {
  nombre: string;
  hectareas: number;
}
