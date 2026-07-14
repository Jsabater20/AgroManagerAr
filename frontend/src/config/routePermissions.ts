type RolType = 'OWNER' | 'ADMIN' | 'OPERARIO' | 'ASESOR' | 'CONTRATISTA' | 'CONTADOR';

export const ROUTE_PERMISSIONS: Record<string, RolType[]> = {
  '/campos': ['OWNER', 'ADMIN', 'OPERARIO', 'ASESOR', 'CONTRATISTA'],
  '/cultivos': ['OWNER', 'ADMIN', 'OPERARIO'],
  '/siembras': ['OWNER', 'ADMIN', 'OPERARIO'],
  '/insumos': ['OWNER', 'ADMIN', 'OPERARIO'],
  '/ganado': ['OWNER', 'ADMIN', 'OPERARIO'],
  '/tareas': ['OWNER', 'ADMIN', 'OPERARIO', 'CONTRATISTA'],
  '/maquinarias': ['OWNER', 'ADMIN', 'OPERARIO'],
  '/reportes': ['OWNER', 'ADMIN', 'ASESOR', 'CONTADOR'],
  '/finanzas': ['OWNER', 'ADMIN', 'CONTADOR'],
  '/campanias': ['OWNER', 'ADMIN', 'CONTADOR'],
  '/rentabilidad': ['OWNER', 'ADMIN', 'ASESOR', 'CONTADOR'],
  '/clima': ['OWNER', 'ADMIN', 'OPERARIO', 'ASESOR'],
  '/precios': ['OWNER', 'ADMIN', 'ASESOR', 'CONTADOR'],
  '/admin': ['OWNER'],
  '/organizaciones/:orgId/auditoria': ['OWNER', 'ADMIN'],
  '/organizaciones/:orgId/roles': ['OWNER', 'ADMIN'],
};

export const FEATURE_PERMISSIONS: Record<string, string> = {
  'crear_campo': 'crearCampo',
  'crear_tarea': 'editarTarea',
  'ver_finanzas': 'verFinanzas',
  'ver_reportes': 'verReportes',
  'cargar_recomendaciones': 'cargarRecomendaciones',
  'ver_tareas_asignadas': 'verTareasAsignadas',
  'registrar_gastos': 'registrarGastos',
  'administrar_usuarios': 'administrarUsuarios',
  'ver_auditoria': 'auditoria',
};
