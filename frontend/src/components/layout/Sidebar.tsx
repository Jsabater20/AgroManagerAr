import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Sprout, Map, FlaskConical, LayoutDashboard, LogOut, X, Leaf, PawPrint, ClipboardList, FileBarChart2, DollarSign, CalendarRange, TrendingUp, CloudSun, Wrench, Settings, User, Users } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import type { ElementType } from 'react';

interface NavItem {
  to: (orgId: string) => string;
  label: string;
  icon: ElementType;
}

const navItems: NavItem[] = [
  { to: (id) => `/org/${id}/dashboard`,    label: 'Dashboard',    icon: LayoutDashboard },
  { to: (id) => `/org/${id}/campos`,       label: 'Campos',       icon: Map },
  { to: (id) => `/org/${id}/cultivos`,     label: 'Cultivos',     icon: Leaf },
  { to: (id) => `/org/${id}/siembras`,     label: 'Siembras',     icon: Sprout },
  { to: (id) => `/org/${id}/insumos`,      label: 'Insumos',      icon: FlaskConical },
  { to: (id) => `/org/${id}/ganado`,       label: 'Ganadería',    icon: PawPrint },
  { to: (id) => `/org/${id}/tareas`,       label: 'Tareas',       icon: ClipboardList },
  { to: (id) => `/org/${id}/miembros`,     label: 'Miembros',     icon: Users },
  { to: (id) => `/org/${id}/maquinarias`,  label: 'Maquinarias',  icon: Wrench },
  { to: (id) => `/org/${id}/finanzas`,     label: 'Finanzas',     icon: DollarSign },
  { to: (id) => `/org/${id}/campanias`,    label: 'Campañas',     icon: CalendarRange },
  { to: (id) => `/org/${id}/rentabilidad`, label: 'Rentabilidad', icon: TrendingUp },
  { to: (id) => `/org/${id}/reportes`,     label: 'Reportes',     icon: FileBarChart2 },
  { to: (id) => `/org/${id}/clima`,        label: 'Clima',        icon: CloudSun },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { orgId } = useParams<{ orgId: string }>();
  const { usuario, logout, isPro } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = [
    usuario?.nombre?.[0] ?? '',
    usuario?.apellido?.[0] ?? '',
  ].join('').toUpperCase() || '?';

  const currentOrgId = orgId || '1';
  const isOwner = usuario?.organizaciones?.some((o: any) => o.id === parseInt(currentOrgId));
  const isSuperAdmin = usuario?.rolGlobal === 'SUPERADMIN';

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-green-900 text-white flex flex-col z-40 transition-transform duration-300 ease-in-out shadow-2xl
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
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

      <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={label}
            to={to(currentOrgId)}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium
              ${isActive
                ? 'bg-white/15 text-white ring-1 ring-white/10'
                : 'text-green-300 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={18} className="shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}

        {isOwner && (
          <>
            <div className="my-2 border-t border-white/10" />
            <div className="px-3 py-2 text-xs font-bold text-green-400 uppercase tracking-wider">
              Administración
            </div>
            <NavLink
              to={`/org/${currentOrgId}/miembros-admin`}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium
                ${isActive
                  ? 'bg-white/15 text-white ring-1 ring-white/10'
                  : 'text-green-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <User size={18} className="shrink-0" />
              <span>Admin de Miembros</span>
            </NavLink>
          </>
        )}
      </nav>

      <div className="border-t border-white/10 p-3 space-y-2">
        <div className="flex justify-center">
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
            isPro()
              ? 'bg-yellow-500 text-yellow-900'
              : 'bg-green-600 text-white'
          }`}>
            {isPro() ? 'Pro' : 'Free'}
          </span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            {initials}
          </div>
          <p className="text-sm font-medium text-white">{usuario?.nombre} {usuario?.apellido}</p>
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
              title="Panel de Administración"
            >
              <User size={20} />
            </NavLink>
          )}

          <button
            onClick={handleLogout}
            className="text-green-300 hover:text-white transition-colors"
            title="Cerrar sesión"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </aside>
  );
}