import { Link } from 'react-router-dom';
import { Sprout, Target, Heart, Zap, ArrowRight } from 'lucide-react';
import PublicNav from '../../components/layout/PublicNav';
import PublicFooter from '../../components/layout/PublicFooter';

const values = [
  {
    icon: Sprout,
    title: 'Hecho en Argentina',
    desc: 'Construido por y para productores argentinos. Entendemos el campo local, los cultivos, las condiciones y los desafíos del agro nacional.',
  },
  {
    icon: Target,
    title: 'Simplicidad ante todo',
    desc: 'Creemos que la tecnología debe facilitarte la vida, no complicarla. Cada función está diseñada para ser intuitiva y práctica.',
  },
  {
    icon: Zap,
    title: 'Innovación continua',
    desc: 'Incorporamos inteligencia artificial y nuevas herramientas para mantenerte siempre un paso adelante en la gestión de tu campo.',
  },
  {
    icon: Heart,
    title: 'Compromiso con el productor',
    desc: 'Tu éxito es nuestro éxito. Trabajamos continuamente para que AgroManager AR sea la herramienta que realmente necesitás.',
  },
];

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* Hero */}
      <section className="bg-linear-to-b from-green-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Sprout size={14} />
            Sobre nosotros
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
            AgroManager nació con el objetivo de modernizar la gestión rural con herramientas
            simples, inteligentes y accesibles.
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3 block">
              Nuestra misión
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Digitalizar el agro, simplificar la gestión
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Millones de hectáreas productivas en Argentina todavía se gestionan con
              planillas, cuadernos o sin ningún registro formal. Queremos cambiar eso.
            </p>
            <p className="text-gray-500 leading-relaxed">
              AgroManager AR le da a cualquier productor — desde el pequeño agricultor
              familiar hasta la empresa agropecuaria — la posibilidad de tener sus
              campos, cultivos, ganado y finanzas organizados en un sistema moderno,
              desde el celular o la computadora.
            </p>
          </div>
          <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
            <blockquote className="text-gray-700 leading-relaxed italic text-lg mb-4">
              "El productor argentino merece tecnología de primer nivel. Construimos
              AgroManager AR para que gestionar el campo sea tan simple como usar el
              celular."
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="bg-green-700 w-10 h-10 rounded-full flex items-center justify-center">
                <Sprout size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Equipo AgroManager AR</p>
                <p className="text-xs text-gray-400">Fundadores</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Nuestros valores
            </h2>
            <p className="text-gray-500">Lo que nos guía en cada decisión</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="bg-green-100 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-green-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Formá parte del cambio en el agro
          </h2>
          <p className="text-gray-500 mb-8">
            Únite a los productores que ya están gestionando su campo de forma más
            inteligente.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
            >
              Empezar gratis
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/contacto"
              className="text-gray-600 hover:text-gray-900 font-medium px-6 py-3 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
            >
              Contactarnos
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
