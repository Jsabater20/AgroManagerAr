import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Building2, Check, Code2, ExternalLink, LoaderCircle, MessageCircle, Sprout, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import PublicNav from '../../components/layout/PublicNav';
import PublicFooter from '../../components/layout/PublicFooter';
import { api } from '../../api/client';
import { agroManagerDigitalApi, type EventoAgroManagerDigital } from '../../api/agromanager-digital.api';
import { WHATSAPP_BUSINESS_URL } from '../../components/ui/WhatsAppButton';

const audiencias = [
  { title: 'Web para establecimientos agropecuarios', icon: Sprout, description: 'Tu campo, tu historia y tu producción, presentados con una identidad propia. Vos elegís qué información se publica.', examples: ['Agrícolas y mixtos', 'Ganaderos, cabañas y feedlots', 'Tambos y producciones regionales'] },
  { title: 'Web para empresas y profesionales', icon: Building2, description: 'Mostrá tus servicios, productos o trayectoria y facilitá las consultas comerciales.', examples: ['Contratistas, agrónomos y veterinarios', 'Comercios, cooperativas y proveedores', 'Consignatarios, transportistas e inmobiliarias rurales'] },
  { title: 'Software y sistemas a medida', icon: Workflow, description: 'Desarrollamos sistemas web para organizar operaciones y procesos propios de cada actividad agropecuaria.', examples: ['Gestión ganadera y feedlots', 'Sistemas para contratistas y veterinarias', 'Comercios, cooperativas y otras actividades'] },
];

const ejemplosSistemas = [
  { rubro: 'Ganadería', titulo: 'Seguimiento del rodeo', resumen: 'Vista demostrativa de animales, lotes, sanidad, reproducción y movimientos.', indicadores: [['Rodeo', '1.240'], ['Controles', '18'], ['Lotes', '12']], herramientas: ['Ficha e historial por animal', 'Sanidad y reproducción', 'Movimientos y composición del rodeo'], color: 'from-emerald-800 to-green-950' },
  { rubro: 'Feedlot', titulo: 'Operación de corrales', resumen: 'Un tablero conceptual para ocupación, alimentación, sanidad y salidas.', indicadores: [['Corrales', '24'], ['Ocupación', '86%'], ['Ración', '3.8 t']], herramientas: ['Ingresos, pesadas y egresos', 'Raciones y consumo', 'Tratamientos y alertas'], color: 'from-amber-800 to-stone-950' },
  { rubro: 'Contratista rural', titulo: 'Servicios y equipos', resumen: 'Planificación de labores, maquinaria, disponibilidad y trabajos contratados.', indicadores: [['Equipos', '8'], ['Servicios', '5'], ['Agenda', '12']], herramientas: ['Órdenes y avance de trabajos', 'Equipos, mantenimiento y operadores', 'Agenda y zonas de servicio'], color: 'from-slate-700 to-blue-950' },
  { rubro: 'Veterinaria', titulo: 'Atención y seguimiento', resumen: 'Ejemplo de gestión de clientes, visitas, tratamientos e historial sanitario.', indicadores: [['Clientes', '94'], ['Visitas', '16'], ['Controles', '31']], herramientas: ['Agenda y visitas a campo', 'Pacientes, rodeos y tratamientos', 'Historial y recordatorios'], color: 'from-teal-700 to-cyan-950' },
  { rubro: 'Comercio agropecuario', titulo: 'Productos y pedidos', resumen: 'Un sistema demostrativo para inventario, consultas, pedidos y entregas.', indicadores: [['Productos', '320'], ['Consultas', '27'], ['Pedidos', '14']], herramientas: ['Catálogo y stock', 'Pedidos y seguimiento', 'Clientes y consultas comerciales'], color: 'from-yellow-700 to-emerald-950' },
  { rubro: 'Otras actividades', titulo: 'Procesos propios', resumen: 'Cooperativas, tambos y emprendimientos pueden organizar flujos específicos.', indicadores: [['Procesos', '6'], ['Registros', '42'], ['Áreas', '3']], herramientas: ['Formularios y circuitos de trabajo', 'Reportes e indicadores acordados', 'Integraciones a evaluar con autorización'], color: 'from-violet-800 to-indigo-950' },
];

const demos = [
  { slug: 'agricola', name: 'Establecimiento agrícola', description: 'Historia, cultivos, producción y galería.', color: 'from-emerald-800 to-green-950', tag: 'PRODUCCIÓN' },
  { slug: 'cabana', name: 'Cabaña ganadera', description: 'Razas, genética, animales e instalaciones.', color: 'from-amber-800 to-stone-950', tag: 'GANADERÍA' },
  { slug: 'contratista', name: 'Contratista rural', description: 'Servicios, maquinaria y zonas de trabajo.', color: 'from-slate-700 to-blue-950', tag: 'SERVICIOS' },
  { slug: 'profesional', name: 'Profesional agropecuario', description: 'Perfil, experiencia y asesoramiento.', color: 'from-teal-700 to-cyan-950', tag: 'PROFESIONALES' },
  { slug: 'comercio', name: 'Comercio de insumos', description: 'Categorías, productos y consultas.', color: 'from-yellow-700 to-emerald-950', tag: 'COMERCIOS' },
];

const cosasPublicables = ['Historia y trayectoria', 'Fotos o videos', 'Cultivos y producciones', 'Razas, animales y genética', 'Productos y servicios', 'Certificaciones e instalaciones', 'Ubicación y contacto comercial'];

function registrarEventoDigital(tipo: EventoAgroManagerDigital) {
  let origen = 'Directo';
  if (document.referrer) {
    try {
      const dominio = new URL(document.referrer).hostname;
      origen = dominio === window.location.hostname ? 'AgroManager AR' : dominio;
    } catch { origen = 'Directo'; }
  }
  const parametros = new URLSearchParams(window.location.search);
  const fuente = parametros.get('utm_source') || undefined;
  const medio = parametros.get('utm_medium') || undefined;
  const campania = parametros.get('utm_campaign') || undefined;
  if (fuente) origen = fuente;
  void agroManagerDigitalApi.registrarEvento(tipo, origen, medio, campania).catch(() => undefined);
}

export default function SolucionesDigitalesPage() {
  const [enviando, setEnviando] = useState(false);
  const [estado, setEstado] = useState('');
  const formularioIniciado = useRef(false);

  useEffect(() => {
    registrarEventoDigital('VISITA');
    const titleAnterior = document.title;
    const canonical = 'https://www.agromanagerar.com/soluciones-digitales';
    const etiquetas = [
      ['meta[name="description"]', 'name', 'description', 'Desarrollo web y software a medida para establecimientos, empresas y profesionales del agro argentino.'],
      ['meta[property="og:type"]', 'property', 'og:type', 'website'],
      ['meta[property="og:title"]', 'property', 'og:title', 'AgroManager Digital | Desarrollo web y software a medida para el agro'],
      ['meta[property="og:description"]', 'property', 'og:description', 'Páginas web y sistemas personalizados para establecimientos, empresas y profesionales del campo argentino.'],
      ['meta[property="og:url"]', 'property', 'og:url', canonical],
      ['meta[name="twitter:card"]', 'name', 'twitter:card', 'summary'],
      ['meta[name="twitter:title"]', 'name', 'twitter:title', 'AgroManager Digital | Desarrollo web y software a medida'],
      ['meta[name="twitter:description"]', 'name', 'twitter:description', 'Desarrollo web y software personalizado para el agro argentino.'],
    ];
    const anteriores = etiquetas.map(([selector, atributo, clave, valor]) => {
      const encontrado = document.head.querySelector<HTMLMetaElement>(selector);
      const meta = encontrado ?? document.createElement('meta');
      if (!encontrado) meta.setAttribute(atributo, clave);
      meta.content = valor;
      if (!encontrado) document.head.appendChild(meta);
      return { meta, existente: Boolean(encontrado), contenido: encontrado?.content };
    });
    const canonicalAnterior = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const hrefAnterior = canonicalAnterior?.href;
    const enlaceCanonical = canonicalAnterior ?? document.createElement('link');
    enlaceCanonical.rel = 'canonical';
    enlaceCanonical.href = canonical;
    if (!canonicalAnterior) document.head.appendChild(enlaceCanonical);
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Service', name: 'AgroManager Digital',
      serviceType: 'Desarrollo web y software a medida para el sector agropecuario',
      description: 'Páginas web, sistemas de gestión y plataformas web personalizados para el agro argentino.',
      provider: { '@type': 'Organization', name: 'AgroManager AR', url: 'https://www.agromanagerar.com/' },
      areaServed: { '@type': 'Country', name: 'Argentina' }, url: canonical,
    });
    document.head.appendChild(schema);
    document.title = 'AgroManager Digital | Desarrollo web y software a medida para el agro';
    return () => {
      document.title = titleAnterior;
      anteriores.forEach(({ meta, existente, contenido }) => {
        if (existente && contenido !== undefined) meta.content = contenido;
        else meta.remove();
      });
      if (canonicalAnterior && hrefAnterior) canonicalAnterior.href = hrefAnterior;
      else enlaceCanonical.remove();
      schema.remove();
    };
  }, []);

  async function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEstado('');
    setEnviando(true);
    const formulario = event.currentTarget;
    const datos = new FormData(formulario);
    const camposBooleanos = ['requiereCatalogo', 'administraContenido', 'tieneIdentidadVisual', 'tieneDominioPropio', 'requiereMantenimiento'];
    try {
      const respuesta = await api.post('/agromanager-digital/solicitudes', {
        nombre: datos.get('nombre'), establecimiento: datos.get('establecimiento'), email: datos.get('email'), telefono: datos.get('telefono'),
        provincia: datos.get('provincia'), localidad: datos.get('localidad'), actividad: datos.get('actividad'), servicio: datos.get('servicio'),
        tipoProyecto: datos.get('tipoProyecto'), tieneSitioWeb: datos.get('tieneSitioWeb') === 'si', descripcion: datos.get('descripcion'),
        informacionPublicar: datos.getAll('informacionPublicar'), ...Object.fromEntries(camposBooleanos.map((campo) => [campo, datos.get(campo) === 'on'])),
        referenciaUrl: datos.get('referenciaUrl') || undefined, funcionalidadesPersonalizadas: datos.get('funcionalidadesPersonalizadas') || undefined,
        presupuesto: datos.get('presupuesto') || undefined, fechaInicio: datos.get('fechaInicio') || undefined,
        comentarios: datos.get('comentarios') || undefined, consienteContacto: datos.get('consienteContacto') === 'on', sitioWeb: datos.get('website'),
      });
      setEstado(respuesta.data.mensaje);
      registrarEventoDigital('FORMULARIO_ENVIADO');
      formulario.reset();
      formularioIniciado.current = false;
    } catch (error: unknown) {
      const mensaje = typeof error === 'object' && error !== null && 'response' in error
        ? (error as { response?: { data?: { message?: unknown } } }).response?.data?.message
        : undefined;
      setEstado(typeof mensaje === 'string' ? mensaje : 'No pudimos enviar la consulta. Probá nuevamente o escribinos por WhatsApp.');
    } finally { setEnviando(false); }
  }

  const input = 'mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100';
  const label = 'block text-sm font-semibold text-slate-800';

  return (
    <div className="min-h-screen bg-white text-slate-900"><PublicNav />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 px-4 py-20 text-white sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div><p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-300"><Code2 size={14}/> AgroManager Digital</p>
              <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-6xl">AgroManager Digital — Desarrollo web y software a medida para el agro.</h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">Páginas web para establecimientos, empresas y profesionales, además de sistemas de gestión diseñados para los procesos de cada actividad.</p>
              <div className="mt-8 flex flex-wrap gap-3"><a href="#presupuesto" onClick={() => registrarEventoDigital('CLICK_PRESUPUESTO')} className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-bold text-white transition hover:bg-emerald-400">Pedir cotización <ArrowRight size={17}/></a><a href="#demos" className="rounded-xl border border-white/25 px-5 py-3 font-semibold text-white transition hover:bg-white/10">Explorar demos</a></div>
              <p className="mt-4 text-xs text-slate-400">Servicio independiente de la plataforma AgroManager AR. Cada proyecto se cotiza según su alcance.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm sm:p-8"><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">Una presencia digital propia</p><h2 className="mt-3 text-2xl font-black">Mostrá lo que hacés. Hacé más fácil que te encuentren y contacten.</h2><div className="mt-6 space-y-4">{['Compartí productos o servicios desde un único enlace', 'Presentá tu experiencia y trayectoria', 'Recibí consultas comerciales por los canales que elegís', 'Complementá tus redes con una identidad propia'].map((item) => <p key={item} className="flex gap-3 text-sm leading-6 text-slate-200"><Check className="mt-0.5 shrink-0 text-emerald-300" size={17}/>{item}</p>)}</div></div>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Tres líneas de servicio, desde el lanzamiento</p><h2 className="mt-3 max-w-3xl text-3xl font-black sm:text-4xl">Una presencia digital o un sistema diseñado para tu forma de trabajar.</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{audiencias.map(({ title, icon: Icon, description, examples }) => <article key={title} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><span className="inline-flex w-fit rounded-xl bg-emerald-50 p-3 text-emerald-800"><Icon size={22}/></span><h3 className="mt-4 text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p><ul className="mt-5 flex-1 space-y-2">{examples.map((example) => <li key={example} className="flex items-start gap-2 text-sm text-slate-700"><Check size={16} className="mt-0.5 shrink-0 text-emerald-700"/>{example}</li>)}</ul><a href="#presupuesto" className="mt-6 inline-flex items-center gap-2 font-bold text-emerald-800">Cotizar esta línea <ArrowRight size={16}/></a></article>)}</div></div></section>

        <section className="bg-slate-50 px-4 py-16 sm:py-20"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-widest text-emerald-700">A tu manera</p><h2 className="mt-3 text-3xl font-black">Tu información, tu identidad y tus decisiones.</h2><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{['Logo, colores y tipografías propias', 'Diseño adaptable a celular y computadora', 'Dominio propio y canales de contacto', 'Fotos, videos, productos y servicios', 'Opciones para administrar el contenido', 'Nuevas funciones según el proyecto'].map((item) => <div key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4"><Check className="shrink-0 text-emerald-700" size={18}/><p className="text-sm font-medium text-slate-700">{item}</p></div>)}</div><p className="mt-5 max-w-3xl text-sm leading-6 text-slate-600">La página y el contenido público se definen con cada cliente. Nada de tu información privada en AgroManager Gestión se publica automáticamente. Un panel para editar contenido, el mantenimiento y el soporte se pueden cotizar como opciones adicionales.</p></div></section>

        <section id="demos" className="scroll-mt-20 px-4 py-16 sm:py-20"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Imaginá tu propia página web</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">Explorá cinco ejemplos interactivos.</h2><p className="mt-3 max-w-3xl text-slate-600">Son proyectos ficticios, creados para mostrar distintas identidades y posibilidades. Navegá sus secciones; no recopilan datos personales.</p><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{demos.map((demo, index) => <article key={demo.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className={`flex h-40 flex-col justify-between bg-gradient-to-br ${demo.color} p-5 text-white`}><span className="w-fit rounded-full border border-white/30 bg-black/15 px-3 py-1 text-[10px] font-bold tracking-widest">{demo.tag} · DEMO</span><span className="text-4xl font-black opacity-50">0{index + 1}</span></div><div className="p-5"><h3 className="text-lg font-black">{demo.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{demo.description}</p><Link to={`/soluciones-digitales/demos/${demo.slug}`} className="mt-5 inline-flex items-center gap-2 font-bold text-emerald-800 hover:text-emerald-950">Explorar sitio <ExternalLink size={16}/></Link></div></article>)}</div></div></section>

        <section id="sistemas-a-medida" className="scroll-mt-20 bg-slate-950 px-4 py-16 text-white sm:py-20"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Software y sistemas a medida</p><h2 className="mt-3 max-w-4xl text-3xl font-black sm:text-4xl">También podemos diseñar la herramienta que hoy te falta.</h2><p className="mt-3 max-w-3xl leading-7 text-slate-300">Estos ejemplos muestran ideas de sistemas que se pueden cotizar desde ahora. Son tableros ilustrativos con datos ficticios, no productos terminados: cada solución se define con el cliente y se desarrolla solo después de acordar alcance y presupuesto.</p><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{ejemplosSistemas.map((ejemplo) => <details key={ejemplo.rubro} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"><summary className="cursor-pointer list-none p-5"><span className={`flex h-24 flex-col justify-between rounded-xl bg-gradient-to-br ${ejemplo.color} p-4`}><span className="w-fit rounded-full bg-black/20 px-2.5 py-1 text-[10px] font-bold tracking-widest">EJEMPLO FICTICIO</span><span className="grid grid-cols-3 gap-2">{ejemplo.indicadores.map(([label, value]) => <span key={label} className="rounded-lg bg-black/20 px-2 py-1"><span className="block text-[9px] text-white/70">{label}</span><span className="text-xs font-black">{value}</span></span>)}</span></span><span className="mt-4 block text-xs font-bold uppercase tracking-wider text-emerald-300">{ejemplo.rubro}</span><span className="mt-1 block text-lg font-bold">{ejemplo.titulo}</span><span className="mt-2 block text-sm leading-6 text-slate-300">{ejemplo.resumen}</span><span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-emerald-300">Ver ejemplo <span className="transition-transform group-open:rotate-90">→</span></span></summary><div className="border-t border-white/10 px-5 pb-5 pt-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Funciones posibles según el proyecto</p><ul className="mt-3 space-y-2">{ejemplo.herramientas.map((herramienta) => <li key={herramienta} className="flex gap-2 text-sm text-slate-200"><Check size={15} className="mt-0.5 shrink-0 text-emerald-300"/>{herramienta}</li>)}</ul><a href="#presupuesto" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-400">Cotizar un sistema similar <ArrowRight size={16}/></a></div></details>)}</div><p className="mt-6 text-sm text-slate-400">No desarrollamos sistemas completos por adelantado. Cada proyecto es independiente, con datos, infraestructura e identidad acordados con su cliente.</p></div></section>

        <section className="bg-emerald-950 px-4 py-16 text-white sm:py-20"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Un proceso claro</p><h2 className="mt-3 text-3xl font-black">Primero entendemos tu idea. Después definimos el proyecto.</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{['Nos contás qué necesitás', 'Definimos alcance y presupuesto', 'Diseñamos y desarrollamos', 'Revisamos y acordamos la publicación'].map((paso, index) => <article key={paso} className="rounded-xl border border-white/15 bg-white/5 p-5"><span className="text-sm font-black text-emerald-300">0{index + 1}</span><p className="mt-3 font-semibold">{paso}</p></article>)}</div><p className="mt-6 max-w-3xl text-sm leading-6 text-emerald-100/80">Cada desarrollo es independiente: alojamiento, dominio, repositorio y servicios se acuerdan para ese proyecto. No conectamos datos privados de AgroManager AR sin autorización expresa.</p></div></section>

        <section id="presupuesto" className="scroll-mt-20 bg-slate-50 px-4 py-16 sm:py-20"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div><p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Hablemos de tu proyecto</p><h2 className="mt-3 text-3xl font-black">Contanos qué querés mostrar o resolver.</h2><p className="mt-4 leading-7 text-slate-600">Con esta información podemos entender mejor tu actividad y prepararte una propuesta. Enviar la consulta no implica contratar.</p><a href={WHATSAPP_BUSINESS_URL} onClick={() => registrarEventoDigital('CLICK_WHATSAPP')} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#128C4A] px-4 py-3 font-bold text-white transition-colors hover:bg-[#0F713C]"><MessageCircle size={18}/> Consultar directamente por WhatsApp</a><div className="mt-7 space-y-3 text-sm text-slate-600">{['No necesitás una cuenta de AgroManager AR', 'El contenido público lo decidís vos', 'La cotización se acuerda antes de empezar'].map((item) => <p key={item} className="flex gap-2"><Check size={16} className="text-emerald-700"/>{item}</p>)}</div></div>

          <form onSubmit={enviar} onFocusCapture={() => { if (!formularioIniciado.current) { formularioIniciado.current = true; registrarEventoDigital('FORMULARIO_INICIADO'); } }} className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-7">
            <label className={label}>¿Qué línea de servicio necesitás?<select name="tipoProyecto" required className={input}><option value="ESTABLECIMIENTO">Página para un establecimiento agropecuario</option><option value="PROFESIONAL_COMERCIAL">Web para empresa, emprendimiento o profesional</option><option value="SOFTWARE_A_MEDIDA">Software o sistema de gestión a medida</option></select></label>
            <label className={label}>¿Qué servicio te interesa?<select name="servicio" required className={input}><option value="">Seleccionar</option><option>Web Esencial</option><option>Web Profesional</option><option>Software o sistema de gestión a medida</option><option>Panel para administrar contenido</option><option>Quiero asesoramiento</option></select></label>
            <Field label="Nombre y apellido" name="nombre" required/><Field label="Establecimiento, empresa o actividad" name="establecimiento" required/>
            <Field label="Correo electrónico" name="email" type="email" required/><Field label="Teléfono o WhatsApp" name="telefono" type="tel" required/>
            <Field label="Provincia" name="provincia" required/><Field label="Localidad" name="localidad" required/>
            <label className={`${label} sm:col-span-2`}>¿A qué actividad te dedicás?<input name="actividad" list="actividades-agro" required maxLength={100} className={input} placeholder="Ej.: tambo, contratista, asesoramiento veterinario"/><datalist id="actividades-agro">{['Agricultura', 'Ganadería', 'Cabaña ganadera', 'Establecimiento mixto', 'Tambo', 'Feedlot', 'Producción regional', 'Contratista rural', 'Ingeniería agronómica', 'Veterinaria', 'Comercio de insumos', 'Maquinaria', 'Cooperativa', 'Consignatario de hacienda', 'Inmobiliaria rural', 'Transporte agropecuario'].map((actividad) => <option key={actividad} value={actividad}/>)}</datalist></label>
            <label className={label}>¿Tenés una página actualmente?<select name="tieneSitioWeb" required className={input}><option value="no">No</option><option value="si">Sí</option></select></label>
            <Field label="Enlace de referencia (opcional)" name="referenciaUrl" type="url"/>

            <fieldset className="rounded-xl border border-slate-200 p-4 sm:col-span-2"><legend className="px-1 text-sm font-bold text-slate-800">¿Qué información te gustaría publicar?</legend><div className="mt-2 grid gap-2 sm:grid-cols-2">{cosasPublicables.map((item) => <CheckInput key={item} name="informacionPublicar" value={item} label={item}/>)}</div></fieldset>

            <fieldset className="rounded-xl border border-slate-200 p-4 sm:col-span-2"><legend className="px-1 text-sm font-bold text-slate-800">¿Qué necesitás para tu proyecto?</legend><div className="grid gap-3 sm:grid-cols-2">{[
              ['requiereCatalogo', 'Catálogo de productos, animales o servicios'], ['administraContenido', 'Poder actualizar el contenido por mi cuenta'], ['tieneIdentidadVisual', 'Ya cuento con logo e identidad visual'], ['tieneDominioPropio', 'Ya tengo un dominio propio'], ['requiereMantenimiento', 'Me interesa mantenimiento o soporte'],
            ].map(([name, text]) => <CheckInput key={name} name={name} label={text}/>)}</div></fieldset>

            <label className={`${label} sm:col-span-2`}>¿Qué te gustaría mostrar o resolver?<textarea name="descripcion" required maxLength={3000} rows={3} className={input} placeholder="Contanos qué necesita tener tu página, sistema o herramienta digital."/></label>
            <label className={`${label} sm:col-span-2`}>¿Necesitás alguna función especial?<span className="ml-1 font-normal text-slate-500">(opcional)</span><textarea name="funcionalidadesPersonalizadas" maxLength={3000} rows={3} className={input} placeholder="Por ejemplo: panel de productos, formularios, automatizaciones o integración con otro sistema."/></label>
            <Field label="Presupuesto estimado (opcional)" name="presupuesto"/><Field label="¿Cuándo te gustaría comenzar? (opcional)" name="fechaInicio"/>
            <label className={`${label} sm:col-span-2`}>Comentarios adicionales (opcional)<textarea name="comentarios" maxLength={2000} rows={2} className={input}/></label>
            <div className="absolute -left-[10000px]" aria-hidden="true"><label>Sitio web<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
            <label className="flex items-start gap-2 text-xs leading-5 text-slate-600 sm:col-span-2"><input type="checkbox" name="consienteContacto" required className="mt-1"/>Autorizo a AgroManager Digital a usar estos datos para responder esta consulta y contactarme por el proyecto.</label>
            {estado && <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900 sm:col-span-2">{estado}</p>}
            <button disabled={enviando} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white transition hover:bg-emerald-800 disabled:opacity-60 sm:col-span-2">{enviando ? <><LoaderCircle className="animate-spin" size={18}/>Enviando...</> : 'Enviar consulta para cotizar'}</button>
          </form>
        </div></section>

        <section className="px-4 py-14"><div className="mx-auto max-w-4xl"><h2 className="text-2xl font-black">Preguntas frecuentes</h2><div className="mt-5 divide-y divide-slate-200">{[
          ['¿El panel para administrar la web está incluido?', 'Es una opción adicional. Se analiza y cotiza según el contenido y las funciones que necesites.'],
          ['¿La página o el sistema se conectan automáticamente a AgroManager AR?', 'No. Son proyectos independientes. Si necesitás una integración, se analiza y cotiza por separado, con autorización expresa y controles de seguridad.'],
          ['¿Tengo que contratar un plan de AgroManager?', 'No. AgroManager Digital es un servicio independiente.'],
          ['¿El presupuesto es automático?', 'No. Revisamos el alcance y conversamos la propuesta antes de comenzar.'],
        ].map(([pregunta, respuesta]) => <details key={pregunta} className="py-4"><summary className="cursor-pointer font-bold text-slate-900">{pregunta}</summary><p className="mt-2 text-sm leading-6 text-slate-600">{respuesta}</p></details>)}</div></div></section>
      </main>
      <PublicFooter />
    </div>
  );
}

function Field({ label, name, type = 'text', required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return <label className="block text-sm font-semibold text-slate-800">{label}<input name={name} type={type} required={required} maxLength={180} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"/></label>;
}

function CheckInput({ name, label, value }: { name: string; label: string; value?: string }) {
  return <label className="flex items-start gap-2 text-sm font-medium text-slate-700"><input type="checkbox" name={name} value={value ?? 'on'} className="mt-1 accent-emerald-700"/>{label}</label>;
}
