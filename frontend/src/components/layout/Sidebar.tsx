import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {
  Sprout,
  Map,
  FlaskConical,
  LayoutDashboard,
  LogOut,
  X,
  Leaf,
  PawPrint,
  ClipboardList,
  FileBarChart2,
  DollarSign,
  CalendarRange,
  TrendingUp,
  CloudSun,
  Wrench,
  Settings,
  Users,
  Shield,
  ChevronDown,
} from 'lucide-react';
import type { ElementType } from 'react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { organizacionesApi } from '../../api/organizaciones.api';
import { useAuthStore } from '../../store/auth.store';

interface NavItem {
  to: (orgId: string) => string;
  label: string;
  icon: ElementType;
  modulo: string | null;
}

const navItems: NavItem[] = [
  { to: (id) => `/org/${id}/dashboard`, label: 'Dashboard', icon: LayoutDashboard, modulo: 'Dashboard' },
  { to: (id) => `/org/${id}/campos`, label: 'Campos', icon: Map, modulo: 'Campos' },
  { to: (id) => `/org/${id}/cultivos`, label: 'Cultivos', icon: Leaf, modulo: 'Cultivos' },
  { to: (id) => `/org/${id}/siembras`, label: 'Siembras', icon: Sprout, modulo: 'Siembras' },
  { to: (id) => `/org/${id}/insumos`, label: 'Insumos', icon: FlaskConical, modulo: 'Insumos' },
  { to: (id) => `/org/${id}/ganado`, label: 'Ganadería', icon: PawPrint, modulo: 'Ganadería' },
  { to: (id) => `/org/${id}/tareas`, label: 'Tareas', icon: ClipboardList, modulo: 'Tareas' },
  { to: (id) => `/org/${id}/maquinarias`, label: 'Maquinarias', icon: Wrench, modulo: 'Maquinarias' },
  { to: (id) => `/org/${id}/finanzas`, label: 'Finanzas', icon: DollarSign, modulo: 'Finanzas' },
  { to: (id) => `/org/${id}/campanias`, label: 'Campañas', icon: CalendarRange, modulo: null },
  { to: (id) => `/org/${id}/rentabilidad`, label: 'Rentabilidad', icon: TrendingUp, modulo: null },
  { to: (id) => `/org/${id}/reportes`, label: 'Reportes', icon: FileBarChart2, modulo: 'Reportes' },
  { to: (id) => `/org/${id}/clima`, label: 'Clima', icon: CloudSun, modulo: 'Clima' },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { orgId } = useParams<{ orgId: string }>();
  const { usuario, logout, isPro, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [isMembersOpen, setIsMembersOpen] = useState(true);

  const currentOrgId = orgId || '1';
  const currentOrgIdNumber = Number(currentOrgId);
  const isSuperAdmin = !isLoading && usuario?.rolGlobal === 'SUPERADMIN';
  const isOwner = usuario?.organizaciones?.some(
    (organizacion) =>
      organizacion.id === currentOrgIdNumber && organizacion.propietarioId === usuario.id,
  ) ?? false;
  const canManageMembers = isSuperAdmin || isOwner;

  const miembroActualQuery = useQuery({
    queryKey: ['miembro-actual', currentOrgIdNumber],
    queryFn: () => organizacionesApi.obtenerMiembroActual(currentOrgIdNumber),
    enabled: !isLoading && !!usuario && currentOrgIdNumber > 0 && !canManageMembers,
    retry: false,
  });

  const modulosHabilitados = new Set(
    (miembroActualQuery.data?.modulos ?? [])
      .filter((modulo) => modulo.activo)
      .map((modulo) => modulo.moduloNombre),
  );
  const visibleNavItems = canManageMembers
    ? navItems
    : navItems.filter((item) => item.modulo !== null && modulosHabilitados.has(item.modulo));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = [usuario?.nombre?.[0] ?? '', usuario?.apellido?.[0] ?? '']
    .join('')
    .toUpperCase() || '?';

  const memberSubitems = [
    { label: 'Invitar miembros', to: `/org/${currentOrgId}/miembros/invitar` },
    { label: 'Administración de personal', to: `/org/${currentOrgId}/miembros/administracion` },
    { label: 'Asignar trabajo', to: `/org/${currentOrgId}/miembros/asignar-trabajo` },
    { label: 'Miembros y trabajos', to: `/org/${currentOrgId}/miembros/trabajos` },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-green-900 text-white flex flex-col z-40 transition-transform duration-300 ease-in-out shadow-2xl ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between px-4 border-b border-white/10 min-h-16">
        <div className="flex items-center gap-2.5">
          <div className="bg-green-700 p-1.5 rounded-lg">
            <Sprout size={18} className="text-green-200" />
          </div>
          <div>
            <span className="font-bold text-base tracking-tight">AgroManager</span>
            <span className="text-[10px] text-green-400 block leading-none">AR</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-green-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
          aria-label="Cerrar menú"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {visibleNavItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={label}
            to={to(currentOrgId)}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                isActive
                  ? 'bg-white/15 text-white ring-1 ring-white/10'
                  : 'text-green-300 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={18} className="shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}

        {canManageMembers && (
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setIsMembersOpen((previous) => !previous)}
              className="flex w-full items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-white/10"
            >
              <span className="flex items-center gap-3">
                <Users size={18} className="text-green-200" />
                <span>Miembros</span>
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform ${isMembersOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isMembersOpen && (
              <div className="ml-6 mt-1 space-y-1 border-l border-white/10 pl-2">
                {memberSubitems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? 'bg-white/15 text-white'
                          : 'text-green-200 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      <div className="border-t border-white/10 p-3 space-y-2">
        <div className="flex justify-center">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              isPro() ? 'bg-yellow-500 text-yellow-900' : 'bg-green-600 text-white'
            }`}
          >
            {isPro() ? 'Pro' : 'Free'}
          </span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            {initials}
          </div>
          <p className="text-sm font-medium text-white">
            {usuario?.nombre} {usuario?.apellido}
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 pt-2">
          <NavLink
            to="/perfil"
            onClick={onClose}
            className="text-green-300 hover:text-white transition-colors"
            title="Mi Perfil"
          >
            <Settings size={20} />
          </NavLink>

          {isSuperAdmin && (
            <NavLink
              to="/admin"
              onClick={onClose}
              className="text-green-300 hover:text-white transition-colors"
              title="Panel Superadmin"
            >
              <Shield size={20} />
            </NavLink>
          )}

          <button
            onClick={handleLogout}
            className="text-green-300 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
            title="Cerrar sesión"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </aside>
  );
}
