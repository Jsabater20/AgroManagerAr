export class MiembroResponseDto {
  id!: number;
  usuarioId!: number;
  usuario!: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
  fotoPerfilUrl?: string | null;
  fotoPerfilEncuadre?: {
    posicionX: number;
    posicionY: number;
    escala: number;
  };
  roles!: string[];
  activo!: boolean;
  campos!: Array<{ id: number; nombre: string }>;
  modulos!: Array<{ moduloNombre: string; activo: boolean }>;
}
