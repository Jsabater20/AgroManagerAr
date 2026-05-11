import { Link } from 'react-router-dom';
import { Sprout, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-green-700 p-2.5 rounded-xl">
            <Sprout size={20} className="text-white" />
          </div>
          <span className="font-bold text-gray-900 text-lg">AgroManager AR</span>
        </div>

        <Link
          to="/register"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-8 transition-colors"
        >
          <ArrowLeft size={14} />
          Volver al registro
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Política de Privacidad</h1>
          <p className="text-gray-500 text-sm mb-8">Última actualización: enero de 2026</p>

          <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">1. Responsable del tratamiento</h2>
              <p>
                AgroManager AR es responsable del tratamiento de tus datos personales,
                en cumplimiento de la <strong>Ley 25.326 de Protección de Datos Personales</strong>
                de la República Argentina.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">2. Datos que recopilamos</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Datos de cuenta:</strong> nombre, email y contraseña (encriptada).</li>
                <li><strong>Datos agropecuarios:</strong> información sobre campos, cultivos, animales, tareas y finanzas que ingresás voluntariamente.</li>
                <li><strong>Datos técnicos:</strong> logs de acceso, IP, tipo de navegador (para seguridad y diagnóstico).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">3. Finalidad del tratamiento</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Prestación del servicio de gestión agropecuaria.</li>
                <li>Comunicaciones relacionadas con tu cuenta (bienvenida, recuperación de contraseña).</li>
                <li>Mejora del servicio y detección de errores.</li>
                <li>Seguridad y prevención de fraudes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">4. Compartir datos con terceros</h2>
              <p>
                No vendemos ni compartimos tus datos personales con terceros con fines comerciales.
                Los datos pueden ser procesados por proveedores de infraestructura (base de datos,
                hosting, email transaccional) bajo acuerdos de confidencialidad.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">5. Seguridad</h2>
              <p>
                Implementamos medidas técnicas y organizativas para proteger tus datos:
                contraseñas encriptadas con bcrypt, comunicaciones cifradas (HTTPS),
                tokens JWT con expiración, y acceso restringido por rol.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">6. Tus derechos (Ley 25.326)</h2>
              <p>Tenés derecho a:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Acceder a tus datos personales.</li>
                <li>Rectificar datos inexactos o incompletos.</li>
                <li>Solicitar la supresión de tus datos.</li>
                <li>Oponerte al tratamiento de tus datos.</li>
              </ul>
              <p className="mt-2">
                Para ejercer estos derechos, contactanos en{' '}
                <a href="mailto:privacidad@agromanager.ar" className="text-green-700 hover:underline">
                  privacidad@agromanager.ar
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">7. Retención de datos</h2>
              <p>
                Conservamos tus datos mientras tu cuenta esté activa. Ante una solicitud de
                baja, eliminamos los datos personales en un plazo de 30 días, excepto aquellos
                que debamos conservar por obligaciones legales.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">8. Cookies</h2>
              <p>
                AgroManager AR no utiliza cookies de seguimiento ni publicidad. Únicamente
                se almacena en el almacenamiento local del navegador el token de sesión
                y preferencias de UI.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">9. Contacto</h2>
              <p>
                Consultas sobre privacidad:{' '}
                <a href="mailto:privacidad@agromanager.ar" className="text-green-700 hover:underline">
                  privacidad@agromanager.ar
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
