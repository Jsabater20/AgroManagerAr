import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/precios', label: 'Precios' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/sobre-nosotros', label: 'Sobre nosotros' },
];

export default function PublicNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-green-700 p-1.5 rounded-lg">
            <Sprout size={18} className="text-white" />
          </div>
          <span className="font-bold text-gray-900">AgroManager AR</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-sm font-medium transition-colors ${
                pathname === l.href
                  ? 'text-green-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Ingresar
          </Link>
          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Registrate gratis
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setOpen(false)}
              className={`block text-sm font-medium py-1 ${
                pathname === l.href ? 'text-green-700' : 'text-gray-700'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2 border-t border-gray-100">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-gray-700 text-center border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition-colors"
            >
              Ingresar
            </Link>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="block text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg py-2 text-center transition-colors"
            >
              Registrate gratis
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
