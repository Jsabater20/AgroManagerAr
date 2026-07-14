import { SetMetadata } from '@nestjs/common';

export const AUDIT_KEY = 'audit_metadata';

export interface AuditMetadata {
  accion: string; // "crear_campo", "modificar_tarea", etc.
  entidad: string; // "Campo", "Tarea", "Maquinaria"
}

export const Auditar = (accion: string, entidad: string) =>
  SetMetadata(AUDIT_KEY, { accion, entidad });
