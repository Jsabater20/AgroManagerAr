import { Link } from 'react-router-dom';
import { Sprout, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Términos y Condiciones</h1>
          <p className="text-gray-500 text-sm mb-8">Última actualización: enero de 2026</p>

          <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">1. Aceptación</h2>
              <p>
                Al registrarte y usar AgroManager AR, aceptás estos Términos y Condiciones.
                Si no estás de acuerdo, no uses el servicio.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">2. Descripción del servicio</h2>
              <p>
                AgroManager AR es una plataforma de gestión agrícola (ERP) que permite registrar
                campos, cultivos, ganadería, tareas y finanzas. El servicio se presta vía internet
                y puede incluir funciones de inteligencia artificial generativa.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">3. Cuenta de usuario</h2>
              <p>
                Sos responsable de mantener la confidencialidad de tus credenciales y de toda
                actividad realizada desde tu cuenta. Debés notificarnos inmediatamente ante
                cualquier uso no autorizado.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">4. Uso permitido</h2>
              <p>
                El servicio es para uso personal o empresarial legítimo relacionado con la
                gestión agropecuaria. Queda prohibido el uso para actividades ilegales, el acceso
                no autorizado a sistemas de terceros, o cualquier acción que perjudique la
                estabilidad de la plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">5. Inteligencia artificial</h2>
              <p>
                Las respuestas del asistente AgroBot son generadas por modelos de IA y tienen
                carácter informativo. No constituyen asesoramiento agronómico, legal ni financiero
                profesional. Siempre consultá con especialistas calificados para decisiones importantes.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">6. Disponibilidad</h2>
              <p>
                Nos esforzamos por mantener el servicio disponible, pero no garantizamos
                disponibilidad ininterrumpida. Podemos realizar mantenimientos que generen
                interrupciones temporales.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">7. Limitación de responsabilidad</h2>
              <p>
                AgroManager AR no se responsabiliza por pérdidas económicas derivadas del uso
                del servicio, decisiones tomadas en base a la información de la plataforma,
                ni por interrupciones del servicio fuera de nuestro control.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">8. Modificaciones</h2>
              <p>
                Podemos actualizar estos términos en cualquier momento. Te notificaremos por
                email ante cambios significativos. El uso continuado del servicio implica
                aceptación de los nuevos términos.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">9. Contacto</h2>
              <p>
                Consultas: <a href="mailto:hola@agromanager.ar" className="text-green-700 hover:underline">hola@agromanager.ar</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
