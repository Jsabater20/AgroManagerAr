import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Sprout, Mail, ArrowLeft, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { api } from '../../api/client';
import toast from 'react-hot-toast';

interface InvitacionData {
  organizacionId: number;
  organizacionNombre: string;
  rol: string;
  email: string;
}

export default function AceptarInvitacionPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [invitacion, setInvitacion] = useState<InvitacionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ────────────────────────────────────────────────────────────────────────────
  // Obtener datos de la invitación
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!token) {
      setError('Token de invitación no proporcionado');
      setLoading(false);
      return;
    }

    const fetchInvitacion = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/organizaciones/invitaciones/${token}`);
        setInvitacion(response.data);
      } catch (err: unknown) {
        const msg = (err as { response?: { data?: { message?: string } } })
          ?.response?.data?.message || 'No se pudo validar la invitación';
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitacion();
  }, [token]);

  // ────────────────────────────────────────────────────────────────────────────
  // Pantalla de carga
  // ────────────────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-950 via-green-900 to-emerald-800 p-6">
        <div className="text-center">
          <Loader size={48} className="text-emerald-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Validando invitación...</p>
        </div>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Pantalla de error
  // ────────────────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-950 via-green-900 to-emerald-800 p-6">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <AlertCircle size={40} className="text-red-700" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Invitación inválida</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            to="/login"
            className="block w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Ir al inicio de sesión
          </Link>
        </div>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Pantalla de confirmación — con detalles de la invitación
  // ────────────────────────────────────────────────────────────────────────────
  if (invitacion) {
    const handleRegistro = () => {
      navigate(`/register?token=${token}&email=${invitacion.email}`);
    };

    // Traducir el rol
    const rolesTraducidos: Record<string, string> = {
      OWNER: 'Propietario',
      ADMIN: 'Administrador',
      OPERARIO: 'Operario',
      ASESOR: 'Asesor',
      CONTADOR: 'Contador',
      CONTRATISTA: 'Contratista',
    };

    const rolTraducido = rolesTraducidos[invitacion.rol] || invitacion.rol;

    return (
      <div className="min-h-screen flex">
        {/* Panel izquierdo — branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-green-950 via-green-900 to-emerald-800 flex-col justify-between p-12 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/5 rounded-full" />

          {/* Logo */}
          <div className="relative flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
              <Sprout size={28} className="text-emerald-300" />
            </div>
            <div>
              <span className="text-white font-bold text-xl tracking-tight">AgroManager</span>
              <span className="text-emerald-400 font-bold text-xl"> AR</span>
            </div>
          </div>

          {/* Footer */}
          <div className="relative text-white/70 text-sm">
            <p>© 2025 AgroManager AR. Todos los derechos reservados.</p>
          </div>
        </div>

        {/* Panel derecho — invitación */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 bg-gray-50">
          <Link to="/" className="inline-flex items-center gap-2 text-green-700 hover:text-green-600 mb-8">
            <ArrowLeft size={18} />
            <span>Volver al inicio</span>
          </Link>

          <div className="max-w-md w-full">
            {/* Ícono de éxito */}
            <div className="flex justify-center mb-8">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle size={40} className="text-green-700" />
              </div>
            </div>

            {/* Título */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
              ¡Invitación válida!
            </h1>

            {/* Detalles de la invitación */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Organización</p>
                <p className="text-xl font-semibold text-gray-900">
                  {invitacion.organizacionNombre}
                </p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Email</p>
                <p className="text-lg text-gray-900">{invitacion.email}</p>
              </div>

              <div className="pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Tu rol</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                  <Mail size={16} className="text-green-700" />
                  <span className="font-semibold text-green-700">{rolTraducido}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                El propietario de la organización te ha asignado este rol. Tendrás acceso a las funcionalidades permitidas para este rol.
              </p>
            </div>

            {/* Botón de registro */}
            <button
              onClick={handleRegistro}
              className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors mb-4"
            >
              Crear cuenta
            </button>

            {/* Link de login */}
            <p className="text-center text-gray-600 text-sm">
              ¿Ya tenés cuenta?{' '}
              <Link to="/login" className="text-green-700 hover:text-green-600 font-semibold">
                Ingresá aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
