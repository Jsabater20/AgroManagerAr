export class ActivityCountDto {
  pendientes: number;
  enProgreso: number;
  completadas: number;
}

export class MiembroPanelDto {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  activo: boolean;
  fechaIncorporacion: string;
  actividades: ActivityCountDto;
  recursosCampos: string[];
}
