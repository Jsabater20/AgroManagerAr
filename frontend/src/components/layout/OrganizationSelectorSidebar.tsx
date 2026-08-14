import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  LogOut,
  Lock,
  Clock,
  LayoutDashboard,
  Leaf,
  Sprout,
  Package,
  Zap,
  ListTodo,
  Wrench,
  DollarSign,
  BarChart,
  Cloud,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client';

interface Organizacion {
  id: number;
  nombre: string;
  propietarioId: number;
}

interface Campo {
  id: number;
  nombre: string;
}

interface VisibilidadModulo {
  moduloNombre: string;
  activo: boolean;
}

interface MiembroData {
  id: number;
  roles: string[];
  campos: Campo[];
  modulos: VisibilidadModulo[];
}

const ICONOS_MODULOS: Record<string, any> = {
  Dashboard: LayoutDashboard,
  Campos: Leaf,
  Cultivos: Sprout,
  Siembras: Sprout,
  Insumos: Package,
  Ganadería: Zap,
  Tareas: ListTodo,
  Maquinarias: Wrench,
  Finanzas: DollarSign,
  Reportes: BarChart,
  Clima: Cloud,
};

const RUTAS_MODULOS: Record<string, string> = {
  Dashboard: '/dashboard',
  Campos: '/campos',
  Cultivos: '/cultivos',
  Siembras: '/siembras',
  Insumos: '/insumos',
  Ganadería: '/ganaderia',
  Tareas: '/tareas',
  Maquinarias: '/maquinarias',
  Finanzas: '/finanzas',
  Reportes: '/reportes',
  Clima: '/clima',
};

export default function OrganizationSelectorSidebar() {
  const { orgId } = useParams<{ orgId: string }>();
  const navigate = useNavigate();
  const { usuario, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCampo, setExpandedCampo] = useState<number | null>(null);

  const { data: miembroData } = useQuery<MiembroData>({
    queryKey: ['miembro-actual', orgId],
    queryFn: async () => {
      if (!usuario?.id || !orgId) return null;
      const res = await api.get(`/organizaciones/${orgId}/miembros`);
      const miembros = res.data;
      return miembros.find((m: any) => m.usuarioId === usuario.id);
    },
    enabled: !!usuario?.id && !!orgId,
  });

  const currentOrg = usuario?.organizaciones?.find((o: Organizacion) => o.id === parseInt(orgId || '0'));
  const isOwner = currentOrg?.propietarioId === usuario?.id;
  const esOperario = miembroData?.roles?.includes('operario');

  const modulosHabilitados = miembroData?.modulos
    ?.filter((m) => m.activo)
    .map((m) => m.moduloNombre) || [
    'Dashboard',
    'Campos',
    'Cultivos',
    'Siembras',
    'Insumos',
    'Ganadería',
    'Tareas',
    'Maquinarias',
    'Finanzas',
    'Reportes',
    'Clima',
  ];

  const camposVisibles = esOperario ? miembroData?.campos || [] : [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-emerald-600">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white p-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors"
        >
          <span className="font-semibold text-sm truncate">{currentOrg?.nombre}</span>
          <ChevronDown
            size={18}
            className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {isOpen && (
          <div className="mt-2 space-y-2 bg-emerald-50 p-2 rounded-lg">
            {usuario?.organizaciones?.map((org: Organizacion) => (
              <button
                key={org.id}
                onClick={() => {
                  navigate(`/org/${org.id}/dashboard`);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded transition-colors ${
                  org.id === currentOrg?.id
                    ? 'bg-emerald-600 text-white'
                    : 'hover:bg-emerald-200 text-gray-700'
                }`}
              >
                {org.nombre}
              </button>
            ))}
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
        {modulosHabilitados.includes('Dashboard') && (
          <button
            onClick={() => handleNavigate(`/org/${orgId}/dashboard`)}
            className="w-full flex items-center gap-3 px-4 py-2 text-emerald-100 hover:bg-emerald-700 rounded-lg transition-colors"
          >
            <LayoutDashboard size={18} />
            <span className="text-sm">Dashboard</span>
          </button>
        )}

        {esOperario && camposVisibles.length > 0 && (
          <div className="space-y-2 mt-4">
            <div className="px-4 text-xs font-semibold text-emerald-300 uppercase">
              Mis Campos
            </div>
            {camposVisibles.map((campo) => (
              <div key={campo.id}>
                <button
                  onClick={() =>
                    setExpandedCampo(expandedCampo === campo.id ? null : campo.id)
                  }
                  className="w-full flex items-center gap-2 px-4 py-2 text-emerald-100 hover:bg-emerald-700 rounded-lg transition-colors"
                >
                  <ChevronRight
                    size={16}
                    className={`transform transition-transform ${
                      expandedCampo === campo.id ? 'rotate-90' : ''
                    }`}
                  />
                  <Leaf size={16} />
                  <span className="text-sm">{campo.nombre}</span>
                </button>

                {expandedCampo === campo.id && (
                  <div className="ml-4 space-y-1 mt-1">
                    {[
                      'Cultivos',
                      'Siembras',
                      'Insumos',
                      'Ganadería',
                      'Tareas',
                      'Maquinarias',
                      'Reportes',
                      'Clima',
                    ].map((modulo) => {
                      if (!modulosHabilitados.includes(modulo)) return null;
                      const Icon = ICONOS_MODULOS[modulo];
                      return (
                        <button
                          key={modulo}
                          onClick={() =>
                            handleNavigate(
                              `${RUTAS_MODULOS[modulo]}?campoId=${campo.id}`,
                            )
                          }
                          className="w-full flex items-center gap-2 px-3 py-1.5 text-emerald-200 text-xs hover:bg-emerald-700 rounded transition-colors"
                        >
                          {Icon && <Icon size={14} />}
                          <span>{modulo}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {(isOwner || !esOperario) && (
          <div className="space-y-1 mt-4">
            {[
              'Campos',
              'Cultivos',
              'Siembras',
              'Insumos',
              'Ganadería',
              'Tareas',
              'Maquinarias',
              'Finanzas',
              'Reportes',
              'Clima',
            ].map((modulo) => {
              if (!modulosHabilitados.includes(modulo)) return null;
              const Icon = ICONOS_MODULOS[modulo];
              return (
                <button
                  key={modulo}
                  onClick={() => handleNavigate(RUTAS_MODULOS[modulo])}
                  className="w-full flex items-center gap-3 px-4 py-2 text-emerald-100 hover:bg-emerald-700 rounded-lg transition-colors"
                >
                  {Icon && <Icon size={18} />}
                  <span className="text-sm">{modulo}</span>
                </button>
              );
            })}
          </div>
        )}

        {isOwner && (
          <div className="space-y-1 mt-4 border-t border-emerald-600 pt-4">
            <div className="px-4 text-xs font-semibold text-emerald-300 uppercase">
              Administración
            </div>
            <button
              onClick={() => handleNavigate(`/org/${orgId}/roles-y-permisos`)}
              className="w-full flex items-center gap-3 px-4 py-2 text-emerald-100 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              <Lock size={18} />
              <span className="text-sm">Roles y Permisos</span>
            </button>
            <button
              onClick={() => handleNavigate(`/org/${orgId}/permisos-temporales`)}
              className="w-full flex items-center gap-3 px-4 py-2 text-emerald-100 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              <Clock size={18} />
              <span className="text-sm">Permisos Temp.</span>
            </button>
            <button
              onClick={() => handleNavigate(`/org/${orgId}/auditoria`)}
              className="w-full flex items-center gap-3 px-4 py-2 text-emerald-100 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              <BarChart size={18} />
              <span className="text-sm">Auditoría</span>
            </button>
          </div>
        )}
      </nav>

      <div className="border-t border-emerald-600 p-4 space-y-2">
        <div className="text-xs text-emerald-200">
          <div className="font-semibold truncate">{usuario?.nombre}</div>
          <div className="truncate">{usuario?.email}</div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
        >
          <LogOut size={16} />
          <span>Salir</span>
        </button>
      </div>
    </div>
  );
}