import { NavLink, useNavigate } from 'react-router-dom';
import { Sprout, Map, FlaskConical, LayoutDashboard, LogOut, X, Leaf, PawPrint, ClipboardList, FileBarChart2, DollarSign, CalendarRange, TrendingUp, CloudSun, Wrench, Settings, User } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import OrganizationSelectorSidebar from './OrganizationSelectorSidebar';
import type { ElementType } from 'react';

type RolType = 'OWNER' | 'ADMIN' | 'OPERARIO' | 'ASESOR' | 'CONTRATISTA' | 'CONTADOR';

const navItems: Array<{ to: string; label: string; icon: ElementType; roles: RolType[] }> = [
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

  const visibleItems = navItems.filter(item => item.roles.includes(userRole));

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

      <OrganizationSelectorSidebar />

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

      <div className="border-t border-white/10 p-3 space-y-2">
        {/* Pro Badge */}
        <div className="flex justify-center">
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
            isPro() 
              ? 'bg-yellow-500 text-yellow-900' 
              : 'bg-green-600 text-white'
          }`}>
            {isPro() ? 'Pro' : 'Free'}
          </span>
        </div>

        {/* User Name with Avatar */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            {initials}
          </div>
          <p className="text-sm font-medium text-white">{usuario?.nombre} {usuario?.apellido}</p>
        </div>

        {/* Action Icons */}
        <div className="flex items-center justify-center gap-6 pt-2">
          {/* Perfil Icon */}
          <NavLink
            to="/perfil"
            onClick={onClose}
            className="text-green-300 hover:text-white transition-colors"
            title="Mi Perfil"
          >
            <Settings size={20} />
          </NavLink>

          {/* Admin Icon (solo para ti) */}
          {usuario?.email === 'joaquinsabater@agromanagerar.com' && (
            <NavLink
              to="/admin"
              onClick={onClose}
              className="text-green-300 hover:text-white transition-colors"
              title="Panel de administración"
            >
              <User size={20} />
            </NavLink>
          )}

          {/* Logout Icon */}
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
