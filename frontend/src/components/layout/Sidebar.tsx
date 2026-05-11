import { NavLink, useNavigate } from 'react-router-dom';
import { Sprout, Map, FlaskConical, LayoutDashboard, LogOut, X, Leaf, PawPrint, ClipboardList, FileBarChart2, DollarSign, CalendarRange, TrendingUp, CloudSun } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';

const navItems = [
  { to: '/dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/campos',       label: 'Campos',       icon: Map },
  { to: '/cultivos',     label: 'Cultivos',     icon: Leaf },
  { to: '/siembras',     label: 'Siembras',     icon: Sprout },
  { to: '/insumos',      label: 'Insumos',      icon: FlaskConical },
  { to: '/ganado',       label: 'Ganadería',    icon: PawPrint },
  { to: '/tareas',       label: 'Tareas',       icon: ClipboardList },
  { to: '/finanzas',     label: 'Finanzas',     icon: DollarSign },
  { to: '/campanias',    label: 'Campañas',     icon: CalendarRange },
  { to: '/rentabilidad', label: 'Rentabilidad', icon: TrendingUp },
  { to: '/reportes',     label: 'Reportes',     icon: FileBarChart2 },
  { to: '/clima',        label: 'Clima',        icon: CloudSun },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { usuario, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  const initials = usuario?.nombre
    ? usuario.nombre.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';

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

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
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
      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-2.5 mb-3 px-1">
          <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-xs font-bold text-green-100 shrink-0">
            {initials}
          </div>
          <p className="text-sm text-green-200 truncate flex-1">{usuario?.nombre}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-green-400 hover:text-red-300 hover:bg-white/10 transition-all rounded-lg p-2 w-full"
        >
          <LogOut size={16} />
          <span className="text-sm">Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
