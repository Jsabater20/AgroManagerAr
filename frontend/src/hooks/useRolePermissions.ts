import { useMemo } from 'react';

type RolType = 'OWNER' | 'ADMIN' | 'OPERARIO' | 'ASESOR' | 'CONTRATISTA' | 'CONTADOR';

interface Permisos {
  verFinanzas: boolean;
  crearCampo: boolean;
  editarTarea: boolean;
  verReportes: boolean;
  cargarRecomendaciones: boolean;
  verTareasAsignadas: boolean;
  registrarGastos: boolean;
  administrarUsuarios: boolean;
  auditoria: boolean;
}

const PERMISOS_POR_ROL: Record<RolType, Permisos> = {
  OWNER: {
    verFinanzas: true,
    crearCampo: true,
    editarTarea: true,
    verReportes: true,
    cargarRecomendaciones: true,
    verTareasAsignadas: true,
    registrarGastos: true,
    administrarUsuarios: true,
    auditoria: true,
  },
  ADMIN: {
    verFinanzas: true,
    crearCampo: true,
    editarTarea: true,
    verReportes: true,
    cargarRecomendaciones: false,
    verTareasAsignadas: true,
    registrarGastos: true,
    administrarUsuarios: true,
    auditoria: true,
  },
  OPERARIO: {
    verFinanzas: false,
    crearCampo: false,
    editarTarea: true,
    verReportes: false,
    cargarRecomendaciones: false,
    verTareasAsignadas: true,
    registrarGastos: true,
    administrarUsuarios: false,
    auditoria: false,
  },
  ASESOR: {
    verFinanzas: false,
    crearCampo: false,
    editarTarea: false,
    verReportes: true,
    cargarRecomendaciones: true,
    verTareasAsignadas: false,
    registrarGastos: false,
    administrarUsuarios: false,
    auditoria: false,
  },
  CONTRATISTA: {
    verFinanzas: false,
    crearCampo: false,
    editarTarea: true,
    verReportes: false,
    cargarRecomendaciones: false,
    verTareasAsignadas: true,
    registrarGastos: false,
    administrarUsuarios: false,
    auditoria: false,
  },
  CONTADOR: {
    verFinanzas: true,
    crearCampo: false,
    editarTarea: false,
    verReportes: true,
    cargarRecomendaciones: false,
    verTareasAsignadas: false,
    registrarGastos: true,
    administrarUsuarios: false,
    auditoria: false,
  },
};

export function useRolePermissions(rol?: RolType): Permisos {
  return useMemo(() => {
    if (!rol) {
      return {
        verFinanzas: false,
        crearCampo: false,
        editarTarea: false,
        verReportes: false,
        cargarRecomendaciones: false,
        verTareasAsignadas: false,
        registrarGastos: false,
        administrarUsuarios: false,
        auditoria: false,
      };
    }
    return PERMISOS_POR_ROL[rol] || PERMISOS_POR_ROL.OPERARIO;
  }, [rol]);
}
