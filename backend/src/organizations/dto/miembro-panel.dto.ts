export class ActivityCountDto {
  pendientes: number;
  enProgreso: number;
  completadas: number;
}

export class MiembroPanelDto {
  id: number;
  nombre: string;
  apellido: string;
  fotoPerfilUrl?: string | null;
  email: string;
  rol: string;
  activo: boolean;
  fechaIncorporacion: string;
  actividades: ActivityCountDto;
  recursosCampos: string[];
  modulos: Array<{ moduloNombre: string; activo: boolean }>;
}
