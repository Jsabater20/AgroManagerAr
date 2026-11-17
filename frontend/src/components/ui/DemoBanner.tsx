import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

const DEMO_EMAIL = 'demo@agromanager.ar';
const DEMO_EMPRESA_EMAIL = 'demoempresa@agromanager.ar';

export default function DemoBanner() {
  const { usuario } = useAuthStore();
  const organizacionId = usuario?.usuarioOrganizacionId ?? usuario?.organizaciones?.[0]?.id;

  if (usuario?.email !== DEMO_EMAIL && usuario?.email !== DEMO_EMPRESA_EMAIL) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-b border-amber-300/30 bg-amber-500 px-4 py-2 text-center text-xs font-medium text-white">
      <span>
        Estás usando la <strong>cuenta demo PRO</strong>; los datos se reinician automáticamente cada 24 hs.
      </span>
      {organizacionId && (
        <>
          <Link to={`/org/${organizacionId}/miembros/trabajos`} className="font-bold underline transition hover:text-amber-100">
            Ver equipo
          </Link>
          <Link to={`/org/${organizacionId}/reportes`} className="font-bold underline transition hover:text-amber-100">
            Ver informes
          </Link>
        </>
      )}
      <span className="hidden sm:inline">Probá AgroBot: “¿Cómo va mi equipo?”.</span>
      <Link to="/register" className="font-bold underline transition hover:text-amber-100">
        Registrate para guardar tus datos
      </Link>
    </div>
  );
}
