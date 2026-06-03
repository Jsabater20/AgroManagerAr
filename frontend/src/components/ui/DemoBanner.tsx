import { useAuthStore } from '../../store/auth.store';

const DEMO_EMAIL = 'demo@agromanager.ar';

export default function DemoBanner() {
  const { usuario } = useAuthStore();

  if (usuario?.email !== DEMO_EMAIL) return null;

  return (
    <div className="bg-amber-500 text-white text-center text-xs font-medium py-2 px-4">
      🎮 Estás usando la <strong>cuenta demo PRO</strong> — los datos se reinician automáticamente cada 24 hs.{' '}
      <a href="/register" className="underline font-semibold hover:text-amber-100 transition-colors">
        Registrate gratis para guardar tus datos
      </a>
    </div>
  );
}
