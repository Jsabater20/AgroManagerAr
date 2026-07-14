import { NavLink, useNavigate } from 'react-router-dom';
import { Sprout, Map, FlaskConical, LayoutDashboard, LogOut, X, Leaf, PawPrint, ClipboardList, FileBarChart2, DollarSign, CalendarRange, TrendingUp, CloudSun, User, ShieldCheck, Wrench, Settings } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import OrganizationSelectorSidebar from './OrganizationSelectorSidebar';

type RolType = 'OWNER' | 'ADMIN' | 'OPERARIO' | 'ASESOR' | 'CONTRATISTA' | 'CONTADOR';

const navItems: Array<{ to: string; label: string; icon: any; roles: RolType[] }> = [
  { to: '/dashboard',    label: 'Dashboard',    icon: LayoutDashboard, roles: ['OWNER', 'ADMIN', 'OPERARIO', 'ASESOR', 'CONTRATISTA', 'CONTADOR'] },
  { to: '/campos',       label: 'Campos',       icon: Map, roles: ['OWNER', 'ADMIN', 'OPERARIO', 'ASESOR', 'CONTRATISTA'] },
  { to: '/cultivos',     label: 'Cultivos',     icon: Leaf, roles: ['OWNER', 'ADMIN', 'OPERARIO'] },
  { to: '/siembras',     label: 'Siembras',     icon: Sprout, roles: ['OWNER', 'ADMIN', 'OPERARIO'] },
  { to: '/insumos',      label: 'Insumos',      icon: FlaskConical, roles: ['OWNER', 'ADMIN', 'OPERARIO'] },
  { to: '/ganado',       label: 'Ganadería',    icon: PawPrint, roles: ['OWNER', 'ADMIN', 'OPERARIO'] },
  { to: '/tareas',       label: 'Tareas',       icon: ClipboardList, roles: ['OWNER', 'ADMIN', 'OPERARIO', 'CONTRATISTA'] },
  { to: '/maquinarias',  label: 'Maquinarias',  icon: Wrench, roles: ['OWNER', 'ADMIN', 'OPERARIO'] },
  { to: '/finanzas',     label: 'Finanzas',     icon: DollarSign, roles: ['OWNER', 'ADMIN', 'CONTADOR'] },
  { to: '/campanias',    label: 'Campañas',     icon: CalendarRange, roles: ['OWNER', 'ADMIN', 'CONTADOR'] },
  { to: '/rentabilidad', label: 'Rentabilidad', icon: TrendingUp, roles: ['OWNER', 'ADMIN', 'ASESOR', 'CONTADOR'] },
  { to: '/reportes',     label: 'Reportes',     icon: FileBarChart2, roles: ['OWNER', 'ADMIN', 'ASESOR', 'CONTADOR'] },
  { to: '/clima',        label: 'Clima',        icon: CloudSun, roles: ['OWNER', 'ADMIN', 'OPERARIO', 'ASESOR'] },
  { to: '/admin',        label: 'Administración', icon: Settings, roles: ['OWNER'] },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { usuario, logout, isPro } = useAuthStore();
  const navigate = useNavigate();
  const userRole = (usuario?.rol as RolType) || 'OPERARIO';

  const handleLogout = () => { logout(); navigate('/login'); };

  const initials = [
    usuario?.nombre?.[0] ?? '',
    usuario?.apellido?.[0] ?? '',
  ].join('').toUpperCase() || '?';

  // Filtrar items según rol del usuario
  const visibleItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-green-900 text-white flex flex-col z-40 transition-transform duration-300 ease-in-out shadow-2xl
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
    >
      {/* Logo + cerrar */}
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

      {/* Organization Selector */}
      <OrganizationSelectorSidebar />

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
        {visibleItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
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
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-white/10">
        {/* Plan badge */}
        <NavLink
          to="/precios"
          onClick={onClose}
          className="flex items-center gap-2 mb-2 px-2 py-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${isPro() ? 'bg-yellow-400 text-yellow-900' : 'bg-green-700 text-green-200'}`}>
            {isPro() ? '⚡ Pro' : 'Free'}
          </div>
        </NavLink>

        {/* User info */}
        <div className="flex items-center gap-2 px-1 py-1 mb-2">
          <div className="w-7 h-7 rounded-full bg-green-700 flex items-center justify-center text-xs font-bold text-green-100 shrink-0">
            {initials}
          </div>
          <p className="text-xs text-green-200 truncate flex-1">{[usuario?.nombre, usuario?.apellido].filter(Boolean).join(' ')}</p>
        </div>

        {/* Action buttons (icons only) */}
        <div className="flex items-center gap-1">
          <NavLink
            to="/perfil"
            onClick={onClose}
            title="Mi perfil"
            className={({ isActive }) =>
              `flex-1 flex items-center justify-center py-2 rounded-lg text-sm transition-all
              ${isActive ? 'bg-white/15 text-white' : 'text-green-400 hover:text-white hover:bg-white/10'}`
            }
          >
            <User size={16} />
          </NavLink>

          {usuario?.rol === 'OWNER' && (
            <NavLink
              to="/admin"
              onClick={onClose}
              title="Panel admin"
              className={({ isActive }) =>
                `flex-1 flex items-center justify-center py-2 rounded-lg transition-all
                ${isActive ? 'bg-white/15 text-white' : 'text-yellow-400 hover:text-white hover:bg-white/10'}`
              }
            >
              <ShieldCheck size={16} />
            </NavLink>
          )}

          <button
            onClick={handleLogout}
            title="Cerrar sesión"
            className="flex-1 flex items-center justify-center py-2 rounded-lg text-green-400 hover:text-red-300 hover:bg-white/10 transition-all"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
