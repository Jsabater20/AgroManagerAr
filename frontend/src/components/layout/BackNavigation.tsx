import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

export default function BackNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { orgId } = useParams<{ orgId: string }>();
  const activeOrgId = useAuthStore((state) => state.activeOrgId());

  if (orgId && pathname === `/org/${orgId}/dashboard`) return null;

  const fallbackPath = activeOrgId ? `/org/${activeOrgId}/dashboard` : '/';

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(fallbackPath);
  };

  return (
    <div className="mb-4 ml-6">
      <button
        type="button"
        onClick={handleBack}
        className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        aria-label="Volver a la sección anterior"
        title="Volver"
      >
        <ArrowLeft size={18} />
        <span className="hidden md:inline">Volver</span>
      </button>
    </div>
  );
}
