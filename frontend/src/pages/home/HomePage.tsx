import { Link } from 'react-router-dom';
import {
  Sprout,
  BarChart2,
  MapPin,
  Bot,
  Wheat,
  CloudRain,
  Shield,
  ArrowRight,
  Check,
} from 'lucide-react';
import PublicNav from '../../components/layout/PublicNav';
import PublicFooter from '../../components/layout/PublicFooter';

const features = [
  {
    icon: MapPin,
    title: 'Campos y lotes',
    desc: 'Organizá tu establecimiento con campos, lotes y subdivisiones. Visualizá tu propiedad en el mapa.',
  },
  {
    icon: Wheat,
    title: 'Cultivos y siembras',
    desc: 'Registrá cada campaña: variedad, fecha, densidad y rendimiento esperado para cada lote.',
  },
  {
    icon: BarChart2,
    title: 'Finanzas agropecuarias',
    desc: 'Control de ingresos, egresos y rentabilidad por campaña. Exportá reportes en CSV/PDF.',
  },
  {
    icon: CloudRain,
    title: 'Clima en tiempo real',
    desc: 'Pronóstico del tiempo y alertas climáticas para tu campo, sin salir del sistema.',
  },
  {
    icon: Bot,
    title: 'AgroBot IA',
    desc: 'Consultá dudas sobre fitosanitarios, cultivos y manejo con inteligencia artificial.',
  },
  {
    icon: Shield,
    title: 'Seguro y confiable',
    desc: 'Tus datos en la nube, con respaldo automático y acceso desde cualquier dispositivo.',
  },
];

const freeIncludes = [
  '1 campo con hasta 3 lotes',
  'Hasta 20 animales y 10 siembras',
  'Tareas, finanzas e insumos',
  'Clima y mapa de Argentina',
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* Hero */}
      <section className="bg-linear-to-b from-green-50 to-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Sprout size={14} />
            Gestión agrícola para Argentina
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Gestioná tu campo
            <br />
            <span className="text-green-600">de forma inteligente</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
            AgroManager AR te permite administrar campos, cultivos, ganado,
            finanzas y tareas rurales en un solo lugar. Gratis para empezar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Empezar gratis
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/precios"
              className="text-gray-600 hover:text-gray-900 font-medium px-6 py-3 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors w-full sm:w-auto text-center"
            >
              Ver planes
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Sin tarjeta de crédito · Plan gratuito incluido
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Todo lo que necesitás en un solo lugar
            </h2>
            <p className="text-gray-500">
              Herramientas pensadas para el productor agropecuario argentino
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
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

      {/* Free plan highlight */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3 block">
              Plan gratuito
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Empezá sin gastar nada
            </h2>
            <p className="text-gray-500 mb-6 leading-relaxed">
              El plan Free te da acceso a las funciones esenciales para gestionar
              tu campo desde el primer día. Sin vencimiento, sin sorpresas.
            </p>
            <ul className="space-y-2.5 mb-8">
              {freeIncludes.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <Check size={16} className="text-green-600 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors inline-flex items-center gap-2"
            >
              Crear cuenta gratis
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="flex-1 bg-white rounded-2xl border border-green-200 p-6 shadow-sm">
            <p className="text-sm font-semibold text-gray-500 mb-1">AgroManager AR</p>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              $0{' '}
              <span className="text-base font-normal text-gray-400">/ mes</span>
            </p>
            <p className="text-sm text-gray-400 mb-4">Para siempre</p>
            <Link
              to="/precios"
              className="text-sm text-green-700 font-medium hover:underline"
            >
              Comparar con plan Pro →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-700 py-14 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: '100%', label: 'Argentino' },
            { value: 'Gratis', label: 'Para empezar' },
            { value: '24/7', label: 'Disponibilidad' },
            { value: 'Pro', label: 'Sin límites' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-bold mb-1">{value}</p>
              <p className="text-green-200 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            ¿Listo para ordenar tu campo?
          </h2>
          <p className="text-gray-500 mb-8">
            Registrate gratis hoy y empezá a gestionar tu establecimiento en
            minutos.
          </p>
          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors inline-flex items-center gap-2"
          >
            Crear mi cuenta gratis
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
