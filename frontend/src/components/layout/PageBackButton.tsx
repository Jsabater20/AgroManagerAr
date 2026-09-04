import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

export default function PageBackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orgId } = useParams<{ orgId: string }>();
  const currentOrg = useAuthStore((state) => state.currentOrg());
  const esPaginaRaiz = /^\/org\/\d+\/dashboard$/.test(location.pathname) || location.pathname === '/empresas';

  if (esPaginaRaiz) return null;

  const volver = () => {
    const indiceHistorial = window.history.state?.idx;
    if (typeof indiceHistorial === 'number' && indiceHistorial > 0) {
      navigate(-1);
      return;
    }

    const organizacionDestino = orgId ?? currentOrg?.id;
    navigate(organizacionDestino ? `/org/${organizacionDestino}/dashboard` : '/');
  };

  return (
    <button
      type="button"
      onClick={volver}
      className="mb-5 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      aria-label="Volver a la sección anterior"
    >
      <ArrowLeft size={17} />
      Volver
    </button>
  );
}
