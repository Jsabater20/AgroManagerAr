import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  CloudRain,
  MapPin,
  Sprout,
  ArrowRight,
  Check,
  X,
  Zap,
  Leaf,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import PublicNav from '../../components/layout/PublicNav';
import PublicFooter from '../../components/layout/PublicFooter';

/* ─── PRICING DATA ───────────────────────────────────────────────── */
const FREE_FEATURES = [
  '1 campo · hasta 3 lotes',
  'Hasta 20 animales',
  'Hasta 10 siembras',
  'Gestión de cultivos e insumos',
  'Tareas rurales',
  'Clima actual',
  'Dashboard básico',
];
const PRO_FEATURES = [
  'Campos, lotes y animales ilimitados',
  'Campañas agrícolas',
  'AgroBot IA',
  'Analytics avanzados + rentabilidad',
  'Alertas climáticas',
  'Exportar CSV/PDF',
  'Reportes avanzados',
  'Soporte prioritario',
];

/* ─── FEATURE CARDS ──────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: Bot,
    badge: 'IA',
    title: 'AgroBot IA',
    desc: 'Tu asistente agropecuario inteligente. Consultá sobre fitosanitarios, densidades de siembra, manejo de cultivos y más.',
    gradient: 'from-violet-500 to-purple-600',
    pill: 'bg-violet-50 text-violet-700',
  },
  {
    icon: CloudRain,
    badge: 'Clima',
    title: 'Clima en tiempo real',
    desc: 'Pronóstico hiperlocal para tu campo con alertas de heladas, granizo y lluvias. Siempre un paso adelante.',
    gradient: 'from-sky-500 to-blue-600',
    pill: 'bg-sky-50 text-sky-700',
  },
  {
    icon: MapPin,
    badge: 'Mapas',
    title: 'Mapa de campos',
    desc: 'Visualizá tu establecimiento en un mapa interactivo. Dibujá lotes, asignales cultivos y gestioná desde la vista aérea.',
    gradient: 'from-emerald-500 to-green-600',
    pill: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: Leaf,
    badge: 'Trazabilidad',
    title: 'Trazabilidad total',
    desc: 'Registrá cada evento de cada lote: siembra, labores, aplicaciones, cosecha. Historial completo a un click.',
    gradient: 'from-lime-500 to-green-500',
    pill: 'bg-lime-50 text-lime-700',
  },
  {
    icon: TrendingUp,
    badge: 'Campañas',
    title: 'Campañas agrícolas',
    desc: 'Planificá y analizá cada campaña. Costos, rendimientos y rentabilidad por lote, cultivo y establecimiento.',
    gradient: 'from-amber-500 to-orange-500',
    pill: 'bg-amber-50 text-amber-700',
  },
];

/* ─── MOCK UI ────────────────────────────────────────────────────── */
function BrowserShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      <div className="bg-gray-800 px-4 py-2.5 flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-gray-700 rounded-md h-5 mx-4 flex items-center px-3">
          <span className="text-gray-400 text-xs">app.agromanagerar.com</span>
        </div>
      </div>
      {children}
    </div>
  );
}

function DashboardMockup() {
  return (
    <BrowserShell>
      <div className="bg-gray-50 p-4">
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            { label: 'Campos', val: '3' },
            { label: 'Hectáreas', val: '420' },
            { label: 'Siembras', val: '8' },
            { label: 'Ingresos', val: '$2.1M' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-2.5 shadow-sm">
              <p className="text-xs text-gray-400">{s.label}</p>
              <p className="text-base font-bold text-gray-800">{s.val}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-3 mb-3 shadow-sm">
          <p className="text-xs font-medium text-gray-500 mb-2">Rendimiento campaña 25/26</p>
          <div className="flex items-end gap-1.5 h-20">
            {[55, 80, 65, 90, 72, 60, 85, 70].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className={`flex-1 rounded-t ${i === 3 ? 'bg-green-500' : 'bg-green-200'}`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {['Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb'].map((m) => (
              <span key={m} className="text-xs text-gray-300 flex-1 text-center">
                {m}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <p className="text-xs font-medium text-gray-500 mb-2">Tareas del día</p>
          {[
            { t: 'Aplicar herbicida — Lote 3', c: 'bg-yellow-400' },
            { t: 'Control de plagas — Lote 1', c: 'bg-red-400' },
            { t: 'Riego completado — Lote 5', c: 'bg-green-400' },
          ].map(({ t, c }) => (
            <div key={t} className="flex items-center gap-2 py-1">
              <span className={`w-1.5 h-1.5 rounded-full ${c} shrink-0`} />
              <p className="text-xs text-gray-600 truncate">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </BrowserShell>
  );
}

function MapMockup() {
  return (
    <BrowserShell>
      <div className="bg-[#e8f5e9] relative overflow-hidden" style={{ height: 280 }}>
        <svg viewBox="0 0 400 260" className="absolute inset-0 w-full h-full">
          <rect x="0" y="0" width="400" height="260" fill="#c8e6c9" />
          <polygon
            points="30,30 180,25 185,125 35,130"
            fill="#66bb6a"
            stroke="#388e3c"
            strokeWidth="1.5"
          />
          <polygon
            points="195,25 345,30 350,120 190,125"
            fill="#81c784"
            stroke="#388e3c"
            strokeWidth="1.5"
          />
          <polygon
            points="30,140 185,135 190,220 35,225"
            fill="#a5d6a7"
            stroke="#388e3c"
            strokeWidth="1.5"
          />
          <polygon
            points="200,135 350,130 355,215 200,220"
            fill="#4caf50"
            stroke="#388e3c"
            strokeWidth="1.5"
          />
          <line x1="188" y1="0" x2="192" y2="260" stroke="#bdbdbd" strokeWidth="4" />
          <line x1="0" y1="130" x2="400" y2="128" stroke="#bdbdbd" strokeWidth="4" />
          <text x="97" y="82" textAnchor="middle" fontSize="11" fill="white" fontWeight="700">
            Lote 1 · 120ha
          </text>
          <text x="268" y="77" textAnchor="middle" fontSize="11" fill="white" fontWeight="700">
            Lote 2 · 98ha
          </text>
          <text x="100" y="183" textAnchor="middle" fontSize="11" fill="#1b5e20" fontWeight="700">
            Lote 3 · 85ha
          </text>
          <text x="275" y="178" textAnchor="middle" fontSize="11" fill="white" fontWeight="700">
            Lote 4 · 117ha
          </text>
          <circle cx="97" cy="58" r="8" fill="#ef5350" />
          <circle cx="97" cy="58" r="4" fill="white" />
        </svg>
        <div className="absolute bottom-3 left-3 bg-white rounded-xl shadow-lg px-3 py-2">
          <p className="text-xs font-bold text-gray-800">Campo La Esperanza</p>
          <p className="text-xs text-gray-500">420 ha · 4 lotes activos</p>
        </div>
        <div className="absolute top-3 right-3 bg-white rounded-xl shadow-lg px-3 py-2 flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-green-500" />
            <span className="text-xs text-gray-600">Soja 1°</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-yellow-400" />
            <span className="text-xs text-gray-600">Maíz</span>
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

function AgrobotMockup() {
  return (
    <BrowserShell>
      <div className="bg-white p-4" style={{ minHeight: 280 }}>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
          <div className="bg-green-600 w-7 h-7 rounded-lg flex items-center justify-center">
            <Bot size={14} className="text-white" />
          </div>
          <p className="text-sm font-semibold text-gray-800">AgroBot IA</p>
          <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
            En línea
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex justify-end">
            <div className="bg-green-600 text-white text-xs rounded-2xl rounded-br-sm px-3 py-2 max-w-[75%]">
              ¿Cuándo aplicar herbicida en soja de primera?
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <Sprout size={12} className="text-green-700" />
            </div>
            <div className="bg-gray-50 text-gray-700 text-xs rounded-2xl rounded-bl-sm px-3 py-2 max-w-[80%] leading-relaxed">
              En soja de primera, aplicá herbicida postemergente entre V2 y V4 (2 a 4
              trifolios). Recomiendo hacerlo cuando la soja es más chica que las malezas.
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-green-600 text-white text-xs rounded-2xl rounded-br-sm px-3 py-2 max-w-[75%]">
              ¿Y el clima para mañana en mi campo?
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <Sprout size={12} className="text-green-700" />
            </div>
            <div className="bg-gray-50 text-gray-700 text-xs rounded-2xl rounded-bl-sm px-3 py-2 max-w-[80%] leading-relaxed">
              Mañana: 22°C, parcialmente nublado, sin precipitaciones. Buenas condiciones
              para aplicación. Viento del N 15 km/h.
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
          <p className="text-xs text-gray-400 flex-1">Preguntale algo a AgroBot...</p>
          <div className="w-6 h-6 bg-green-600 rounded-lg flex items-center justify-center">
            <ChevronRight size={12} className="text-white" />
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

const SCREENSHOTS = [
  { label: 'Dashboard', component: <DashboardMockup /> },
  { label: 'Mapa de campos', component: <MapMockup /> },
  { label: 'AgroBot IA', component: <AgrobotMockup /> },
];

/* ═══════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [activeScreen, setActiveScreen] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gray-950 text-white">
        <div className="absolute inset-0 bg-linear-to-br from-green-950 via-gray-950 to-gray-950" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(circle at 18% 55%, #15803d 0%, transparent 55%), radial-gradient(circle at 82% 18%, #166534 0%, transparent 45%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
              <Sprout size={12} />
              Gestión agrícola para Argentina
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.08] max-w-3xl">
              Gestioná tu campo
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-300">
                de forma inteligente
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
              El ERP agropecuario que une IA, mapas, trazabilidad y finanzas en un
              solo lugar. Hecho en Argentina, para el campo argentino.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-400 text-white font-bold px-7 py-3.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-green-900/40 w-full sm:w-auto justify-center text-base"
              >
                Probar gratis
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/login"
                className="border border-white/20 hover:border-white/40 text-white font-semibold px-7 py-3.5 rounded-xl transition-all w-full sm:w-auto text-center text-base hover:bg-white/5"
              >
                Ingresar
              </Link>
            </div>

            <p className="text-gray-600 text-sm">
              Sin tarjeta de crédito · Plan gratuito incluido · Listo en 2 minutos
            </p>

            <div className="w-full max-w-3xl mt-4 opacity-90 hover:opacity-100 transition-opacity">
              <DashboardMockup />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-green-600 font-bold text-xs uppercase tracking-widest mb-3">
              Funcionalidades
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Todo lo que tu campo necesita
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Herramientas de nivel enterprise, diseñadas para el productor argentino.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {FEATURES.map(({ icon: Icon, badge, title, desc, gradient, pill }) => (
              <div
                key={title}
                className="group relative bg-gray-50 hover:bg-gray-900 rounded-2xl p-5 transition-all duration-300 cursor-default"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center mb-4 shadow-md`}
                >
                  <Icon size={20} className="text-white" />
                </div>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${pill} group-hover:bg-white/10 group-hover:text-white/80 transition-colors`}
                >
                  {badge}
                </span>
                <h3 className="font-bold text-gray-900 group-hover:text-white mt-2 mb-2 transition-colors text-sm">
                  {title}
                </h3>
                <p className="text-xs text-gray-500 group-hover:text-gray-300 leading-relaxed transition-colors">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCREENSHOTS ──────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-950 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-400 font-bold text-xs uppercase tracking-widest mb-3">
              La plataforma
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Diseñada para el trabajo del día a día
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Desde el dashboard hasta el chat con IA, todo está pensado para ser
              rápido, claro y útil en el campo.
            </p>
          </div>

          <div className="flex justify-center gap-2 mb-8">
            {SCREENSHOTS.map(({ label }, i) => (
              <button
                key={label}
                onClick={() => setActiveScreen(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeScreen === i
                    ? 'bg-green-500 text-white shadow-lg shadow-green-900/40'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="transition-all duration-300">
            {SCREENSHOTS[activeScreen].component}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {SCREENSHOTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveScreen(i)}
                className={`h-2 rounded-full transition-all ${
                  activeScreen === i ? 'bg-green-400 w-5' : 'bg-white/20 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-green-600 font-bold text-xs uppercase tracking-widest mb-3">
              Precios
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Empezá gratis. Escalá cuando crezcas.
            </h2>
            <p className="text-gray-500 text-lg">
              Sin compromisos. Cambiá de plan cuando quieras.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="border-2 border-gray-200 rounded-2xl p-7">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Free</h3>
              <p className="text-4xl font-black text-gray-900 mb-1">
                $0{' '}
                <span className="text-base font-normal text-gray-400">/ mes</span>
              </p>
              <p className="text-sm text-gray-400 mb-6">Para empezar a gestionar tu campo</p>
              <ul className="space-y-3 mb-7">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
                <li className="flex items-start gap-2.5 text-sm text-gray-300">
                  <X size={16} className="mt-0.5 shrink-0" />
                  AgroBot IA, Campañas, Analytics
                </li>
              </ul>
              <Link
                to="/register"
                className="block text-center border-2 border-green-600 text-green-700 hover:bg-green-50 font-semibold py-3 rounded-xl transition-colors"
              >
                Crear cuenta gratis
              </Link>
            </div>

            {/* Pro */}
            <div className="border-2 border-green-500 rounded-2xl p-7 relative bg-white shadow-lg shadow-green-100">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-green-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  RECOMENDADO
                </span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl font-bold text-gray-900">Pro</h3>
                <Zap size={18} className="text-green-600" />
              </div>
              <p className="text-4xl font-black text-gray-900 mb-1">
                $13.990{' '}
                <span className="text-base font-normal text-gray-400">ARS / mes</span>
              </p>
              <p className="text-sm text-green-700 font-medium mb-6">
                ✓ 14 días de prueba gratis
              </p>
              <ul className="space-y-3 mb-7">
                <li className="flex items-start gap-2.5 text-sm text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-green-600 mt-0.5 shrink-0" />
                  Todo el plan Free incluido
                </li>
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/precios"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors"
              >
                <Zap size={16} />
                Ver plan Pro
              </Link>
            </div>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            ¿Necesitás más info?{' '}
            <Link to="/precios" className="text-green-600 hover:underline font-medium">
              Ver comparativa completa →
            </Link>
          </p>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gray-950 text-white py-24 px-4">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 28% 50%, #15803d 0%, transparent 60%), radial-gradient(circle at 76% 38%, #166534 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6">
            <Sprout size={12} />
            Sin riesgo
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
            Probá AgroManager gratis
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-300">
              durante 14 días
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Accedé a todas las funciones Pro sin costo. Sin tarjeta de crédito.
            Cancelá cuando quieras. Tu campo, tus reglas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-green-900/40 flex items-center gap-2 w-full sm:w-auto justify-center text-base"
            >
              Empezar prueba gratuita
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/contacto"
              className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl transition-all text-base hover:bg-white/5 w-full sm:w-auto text-center"
            >
              Hablar con el equipo
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-500">
            {[
              '14 días gratis',
              'Sin tarjeta de crédito',
              'Cancelá cuando quieras',
              '100% argentino',
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <Check size={13} className="text-green-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
