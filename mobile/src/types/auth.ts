export type Plan = 'FREE' | 'PRO';

export interface Organizacion {
  id: number;
  nombre: string;
  email?: string;
  plan: Plan;
  propietarioId: number;
}

export interface ModuloHabilitado {
  moduloNombre: string;
  activo: boolean;
}

export interface CampoAsignado {
  id: number;
  nombre: string;
}

export interface Membresia {
  id: number;
  usuarioId: number;
  activo: boolean;
  roles: string[];
  campos: CampoAsignado[];
  modulos: ModuloHabilitado[];
}

export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol?: string;
  rolGlobal?: string;
  plan?: Plan;
  planExpira?: string | null;
  createdAt?: string;
  organizaciones: Organizacion[];
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}
