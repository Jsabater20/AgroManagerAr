import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LoaderCircle, Sprout } from 'lucide-react';
import { api } from '../../api/client';
import { useAuthStore } from '../../store/auth.store';

const DEMO_EMAIL = 'demo@agromanager.ar';
const DEMO_PASSWORD = 'Demo1234';

export default function DemoPersonalEntryPage() {
  const { usuario, isLoading, setAuth } = useAuthStore();
  const navigate = useNavigate();
  const iniciado = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading || iniciado.current) return;

    const ingresarAlDashboard = (organizacionId: number | null) => {
      navigate(organizacionId ? `/org/${organizacionId}/dashboard` : '/', { replace: true });
    };

    if (usuario?.email === DEMO_EMAIL) {
      ingresarAlDashboard(usuario.usuarioOrganizacionId ?? usuario.organizaciones?.[0]?.id ?? null);
      return;
    }
    if (usuario) return;

    iniciado.current = true;
    api
      .post('/auth/login', { email: DEMO_EMAIL, password: DEMO_PASSWORD })
      .then(({ data }) => {
        const organizaciones = data.usuario?.organizaciones ?? [];
        const activeOrgId =
          data.usuario?.usuarioOrganizacionId ??
          (organizaciones.length === 1 ? organizaciones[0]?.id : null);

        setAuth(
          {
            ...data.usuario,
            usuarioOrganizacionId: activeOrgId ?? null,
            organizaciones,
          },
          data.token,
        );
        ingresarAlDashboard(activeOrgId ?? null);
      })
      .catch(() => {
        setError('No pudimos iniciar la demo. Intentá nuevamente en unos minutos.');
      });
  }, [isLoading, navigate, setAuth, usuario]);

  if (!isLoading && usuario && usuario.email !== DEMO_EMAIL) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl shadow-black/30">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white">
          <Sprout size={27} />
        </div>
        <h1 className="mt-5 text-2xl font-bold">Preparando Demo AgroManager AR</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Vas a recorrer una operación con campos, tareas, cultivos, ganadería, finanzas y datos de ejemplo.
        </p>
        {error ? (
          <div className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">
            <p>{error}</p>
            <Link to="/login" className="mt-3 inline-block font-semibold text-white underline">
              Ir al inicio de sesión
            </Link>
          </div>
        ) : (
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-emerald-300">
            <LoaderCircle size={18} className="animate-spin" />
            Ingresando a la demo...
          </div>
        )}
      </section>
    </main>
  );
}
