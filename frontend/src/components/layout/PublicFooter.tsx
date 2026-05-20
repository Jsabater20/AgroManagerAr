import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-green-700 p-1.5 rounded-lg">
              <Sprout size={16} className="text-white" />
            </div>
            <span className="font-bold text-gray-800">AgroManager AR</span>
          </Link>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-800 transition-colors">
              Inicio
            </Link>
            <Link to="/precios" className="hover:text-gray-800 transition-colors">
              Precios
            </Link>
            <Link to="/contacto" className="hover:text-gray-800 transition-colors">
              Contacto
            </Link>
            <Link to="/sobre-nosotros" className="hover:text-gray-800 transition-colors">
              Sobre nosotros
            </Link>
            <Link to="/terminos" className="hover:text-gray-800 transition-colors">
              Términos
            </Link>
            <Link to="/privacidad" className="hover:text-gray-800 transition-colors">
              Privacidad
            </Link>
          </div>

          <p className="text-xs text-gray-400">© 2026 AgroManager AR</p>
        </div>
      </div>
    </footer>
  );
}
