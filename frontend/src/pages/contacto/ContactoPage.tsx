import { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import PublicNav from '../../components/layout/PublicNav';
import PublicFooter from '../../components/layout/PublicFooter';

const CONTACT_EMAIL = 'agromanagerarcontacto@gmail.com';

export default function ContactoPage() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) {
      toast.error('Completá todos los campos requeridos.');
      return;
    }
    const subject = encodeURIComponent(form.asunto || `Consulta de ${form.nombre}`);
    const body = encodeURIComponent(
      `Nombre: ${form.nombre}\nEmail: ${form.email}\n\n${form.mensaje}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
    toast.success('Abriendo tu cliente de correo...');
  };

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Contacto</h1>
          <p className="text-gray-500 text-lg">
            ¿Tenés alguna consulta? Escribinos y te respondemos a la brevedad.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Form */}
          <div className="md:col-span-3 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <Send size={28} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">¡Gracias por escribirnos!</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Tu cliente de correo debería haberse abierto. Si no fue así, escribinos
                  directamente a{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-green-700 font-medium hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Asunto
                  </label>
                  <select
                    name="asunto"
                    value={form.asunto}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="">Seleccioná un tema</option>
                    <option value="Consulta general">Consulta general</option>
                    <option value="Soporte técnico">Soporte técnico</option>
                    <option value="Facturación y planes">Facturación y planes</option>
                    <option value="Sugerencia">Sugerencia</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Mensaje <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Contanos en qué podemos ayudarte..."
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 w-9 h-9 rounded-xl flex items-center justify-center">
                  <Mail size={18} className="text-green-700" />
                </div>
                <h3 className="font-semibold text-gray-900">Email</h3>
              </div>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm text-green-700 font-medium hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="text-xs text-gray-400 mt-1">Respondemos en menos de 24 hs hábiles</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 w-9 h-9 rounded-xl flex items-center justify-center">
                  <MessageSquare size={18} className="text-green-700" />
                </div>
                <h3 className="font-semibold text-gray-900">Soporte</h3>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Los usuarios con plan Pro tienen soporte prioritario. Incluí el asunto
                "Pro" en tu mensaje.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <p className="text-sm font-semibold text-green-800 mb-1">¿Sos nuevo?</p>
              <p className="text-sm text-green-700 mb-3">
                Probá AgroManager AR gratis sin necesidad de tarjeta de crédito.
              </p>
              <a
                href="/register"
                className="text-sm font-semibold text-green-700 hover:underline"
              >
                Registrate gratis →
              </a>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
