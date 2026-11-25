import { ArrowLeft, ArrowRight, ExternalLink, MapPin, Sprout } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import type { CSSProperties } from 'react';
import { useEffect } from 'react';

type DemoDigital = {
  nombre: string;
  rubro: string;
  titulo: string;
  bajada: string;
  localidad: string;
  historia: string;
  actividad: string[];
  catalogo: Array<{ nombre: string; detalle: string }>;
  galeria: string[];
  identidad: { fondo: string; superficie: string; texto: string; acento: string; boton: string; etiqueta: string };
  secciones: Array<{ id: string; nombre: string }>;
};

const demos: Record<string, DemoDigital> = {
  agricola: {
    nombre: 'Establecimiento Los Tilos', rubro: 'Producción agrícola', titulo: 'Una historia que crece junto al campo.',
    bajada: 'Una propuesta digital para contar quiénes somos, qué producimos y cómo trabajamos cada campaña.', localidad: 'Marcos Juárez · Córdoba',
    historia: 'Los Tilos es un establecimiento ficticio de la región pampeana. Esta página de ejemplo muestra cómo presentar su historia, su equipo y una forma de producir con mirada a largo plazo.',
    actividad: ['Agricultura extensiva', 'Rotación de cultivos', 'Producción de granos'],
    catalogo: [{ nombre: 'Maíz', detalle: 'Cultivo de verano · Producción demostrativa' }, { nombre: 'Soja', detalle: 'Rotación agrícola · Datos ficticios' }, { nombre: 'Trigo', detalle: 'Cultivo de invierno · Datos ficticios' }],
    galeria: ['Lotes productivos', 'Campaña agrícola', 'Trabajo en equipo'],
    identidad: { fondo: '#102b20', superficie: '#f4f5ed', texto: '#1f3025', acento: '#3d754e', boton: '#245d3c', etiqueta: 'AGRICULTURA · DEMO' },
    secciones: [{ id: 'historia', nombre: 'El establecimiento' }, { id: 'actividad', nombre: 'Producción' }, { id: 'galeria', nombre: 'Galería' }, { id: 'contacto', nombre: 'Contacto' }],
  },
  cabana: {
    nombre: 'Cabaña La Querencia', rubro: 'Cabaña ganadera', titulo: 'Genética con historia y propósito.',
    bajada: 'Un espacio para presentar las razas, el trabajo de selección y los animales disponibles para consulta.', localidad: 'Rauch · Buenos Aires',
    historia: 'La Querencia es una cabaña ficticia creada para mostrar cómo compartir una historia familiar, sus criterios de selección y la información comercial que el establecimiento decida publicar.',
    actividad: ['Cría y selección genética', 'Raza Angus', 'Asesoramiento a productores'],
    catalogo: [{ nombre: 'Lote de vaquillonas', detalle: 'Catálogo de ejemplo · Consultar disponibilidad' }, { nombre: 'Reproductores', detalle: 'Ficha demostrativa · Datos no reales' }, { nombre: 'Genética', detalle: 'Información ficticia de la cabaña' }],
    galeria: ['Rodeo de cría', 'Reproductores', 'Instalaciones'],
    identidad: { fondo: '#39271d', superficie: '#f5efe5', texto: '#30241c', acento: '#a66b36', boton: '#744a2e', etiqueta: 'GANADERÍA · DEMO' },
    secciones: [{ id: 'historia', nombre: 'La cabaña' }, { id: 'actividad', nombre: 'Razas y genética' }, { id: 'catalogo', nombre: 'Catálogo' }, { id: 'galeria', nombre: 'Instalaciones' }, { id: 'contacto', nombre: 'Consultas' }],
  },
  contratista: {
    nombre: 'Surco Servicios Rurales', rubro: 'Contratista rural', titulo: 'El trabajo del campo, bien hecho y a tiempo.',
    bajada: 'Servicios, equipos y zonas de cobertura presentados en un sitio pensado para recibir consultas comerciales.', localidad: 'Pergamino · Buenos Aires',
    historia: 'Surco Servicios Rurales es una empresa ficticia. Este ejemplo permite explorar una presentación profesional de maquinaria, labores y áreas de trabajo.',
    actividad: ['Siembra y fertilización', 'Pulverización', 'Cosecha y logística'],
    catalogo: [{ nombre: 'Siembra', detalle: 'Servicio ilustrativo · Consultar zonas' }, { nombre: 'Pulverización', detalle: 'Servicio ilustrativo · Equipos demostrativos' }, { nombre: 'Cosecha', detalle: 'Servicio ilustrativo · Solicitar disponibilidad' }],
    galeria: ['Equipos de trabajo', 'Labores en lote', 'Cobertura regional'],
    identidad: { fondo: '#142535', superficie: '#f2f5f7', texto: '#182b39', acento: '#d17b28', boton: '#a75e1b', etiqueta: 'SERVICIOS RURALES · DEMO' },
    secciones: [{ id: 'historia', nombre: 'La empresa' }, { id: 'actividad', nombre: 'Servicios' }, { id: 'catalogo', nombre: 'Maquinaria' }, { id: 'galeria', nombre: 'Zonas de trabajo' }, { id: 'contacto', nombre: 'Presupuestos' }],
  },
  profesional: {
    nombre: 'Ing. Valentina Ríos', rubro: 'Asesoramiento agropecuario', titulo: 'Decisiones técnicas con los pies en el lote.',
    bajada: 'Un perfil profesional para presentar experiencia, especialidades y servicios de asesoramiento.', localidad: 'Río Cuarto · Córdoba',
    historia: 'Valentina Ríos es un perfil profesional ficticio. Este sitio demuestra cómo explicar la experiencia y el enfoque de trabajo de una profesional independiente.',
    actividad: ['Planificación de campañas', 'Monitoreo de cultivos', 'Acompañamiento técnico'],
    catalogo: [{ nombre: 'Asesoramiento de campaña', detalle: 'Servicio demostrativo' }, { nombre: 'Monitoreo a campo', detalle: 'Servicio demostrativo' }, { nombre: 'Informe técnico', detalle: 'Servicio demostrativo' }],
    galeria: ['Trabajo a campo', 'Planificación', 'Encuentros técnicos'],
    identidad: { fondo: '#193448', superficie: '#f1f6f7', texto: '#1b303c', acento: '#278b87', boton: '#176a70', etiqueta: 'PERFIL PROFESIONAL · DEMO' },
    secciones: [{ id: 'historia', nombre: 'Perfil' }, { id: 'actividad', nombre: 'Especialidades' }, { id: 'catalogo', nombre: 'Servicios' }, { id: 'galeria', nombre: 'Experiencia' }, { id: 'contacto', nombre: 'Contacto' }],
  },
  comercio: {
    nombre: 'La Posta Insumos', rubro: 'Comercio agropecuario', titulo: 'Lo que necesitás para seguir produciendo.',
    bajada: 'Un catálogo organizado para mostrar productos, marcas y facilitar consultas desde cualquier dispositivo.', localidad: 'Venado Tuerto · Santa Fe',
    historia: 'La Posta Insumos es un comercio ficticio. El catálogo es ilustrativo y muestra cómo ordenar categorías, destacar productos y derivar consultas a los canales comerciales.',
    actividad: ['Semillas e insumos', 'Nutrición vegetal', 'Asesoramiento comercial'],
    catalogo: [{ nombre: 'Semillas', detalle: 'Categoría demostrativa · Consultar variedades' }, { nombre: 'Fertilizantes', detalle: 'Categoría demostrativa · Consultar disponibilidad' }, { nombre: 'Protección de cultivos', detalle: 'Categoría demostrativa · Consultar asesoramiento' }],
    galeria: ['Semillas', 'Nutrición de cultivos', 'Atención comercial'],
    identidad: { fondo: '#123a35', superficie: '#f1f6f2', texto: '#1d332d', acento: '#ca9c38', boton: '#226c58', etiqueta: 'COMERCIO AGROPECUARIO · DEMO' },
    secciones: [{ id: 'historia', nombre: 'El comercio' }, { id: 'actividad', nombre: 'Qué ofrecemos' }, { id: 'catalogo', nombre: 'Catálogo' }, { id: 'galeria', nombre: 'Marcas y productos' }, { id: 'contacto', nombre: 'Consultas' }],
  },
};

export default function DigitalDemoPage() {
  const { tipo = '' } = useParams();
  const demo = demos[tipo];

  useEffect(() => {
    if (!demo) return;
    const titleAnterior = document.title;
    const robotsAnterior = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const robotsPrevios = robotsAnterior?.content;
    const robots = robotsAnterior ?? document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex,follow';
    if (!robotsAnterior) document.head.appendChild(robots);
    const canonicalAnterior = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const canonicalPrevio = canonicalAnterior?.href;
    const canonical = canonicalAnterior ?? document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = `https://www.agromanagerar.com/soluciones-digitales/demos/${tipo}`;
    if (!canonicalAnterior) document.head.appendChild(canonical);
    document.title = `${demo.nombre} | Demo ficticia · AgroManager Digital`;
    return () => {
      document.title = titleAnterior;
      if (robotsAnterior && robotsPrevios !== undefined) robotsAnterior.content = robotsPrevios;
      else robots.remove();
      if (canonicalAnterior && canonicalPrevio) canonicalAnterior.href = canonicalPrevio;
      else canonical.remove();
    };
  }, [demo, tipo]);

  if (!demo) return <Navigate to="/soluciones-digitales" replace />;

  const { identidad } = demo;
  return (
    <main className="digital-demo min-h-screen" style={{ backgroundColor: identidad.superficie, color: identidad.texto } as CSSProperties}>
      <div className="sticky top-0 z-30 border-b border-black/10 bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <Link to="/soluciones-digitales" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950"><ArrowLeft size={17} /> AgroManager Digital</Link>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-black tracking-wider text-amber-950">SITIO FICTICIO · DEMO</span>
        </div>
      </div>

      <header style={{ backgroundColor: identidad.fondo }} className="text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-white/65">{demo.rubro}</p><p className="mt-1 text-xl font-black">{demo.nombre}</p></div>
          <nav aria-label={`Secciones de ${demo.nombre}`} className="flex max-w-full gap-2 overflow-x-auto py-1">
            {demo.secciones.map((seccion) => <a key={seccion.id} href={`#${seccion.id}`} className="whitespace-nowrap rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-white/85 transition hover:bg-white/15">{seccion.nombre}</a>)}
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden px-5 py-20 text-white sm:px-8 sm:py-28" style={{ background: `linear-gradient(115deg, ${identidad.fondo}, ${identidad.acento})` }}>
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-white/10" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div><span className="inline-flex rounded-full border border-white/20 bg-black/10 px-3 py-1 text-[10px] font-black tracking-[0.16em]">{identidad.etiqueta}</span><h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">{demo.titulo}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">{demo.bajada}</p><a href="#contacto" className="mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-white shadow-lg" style={{ backgroundColor: identidad.boton }}>Conocer más <ArrowRight size={17} /></a></div>
          <div className="rounded-3xl border border-white/20 bg-black/15 p-6 backdrop-blur-sm"><Sprout size={25} className="text-white/80"/><p className="mt-8 text-xs font-bold uppercase tracking-widest text-white/65">{demo.localidad}</p><p className="mt-2 text-lg font-bold">Una presencia digital hecha para este proyecto.</p><p className="mt-2 text-sm leading-6 text-white/75">Este diseño y todos sus datos son ficticios y se incluyen solo para mostrar posibilidades.</p></div>
        </div>
      </section>

      <section id="historia" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[.7fr_1.3fr] md:items-start"><div><p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: identidad.acento }}>Nuestra identidad</p><h2 className="mt-3 text-3xl font-black">Una historia para contar.</h2></div><div><p className="text-base leading-8 opacity-80">{demo.historia}</p><div className="mt-6 flex items-center gap-2 text-sm font-semibold"><MapPin size={17} style={{ color: identidad.acento }}/>{demo.localidad}</div></div></div></section>

      <section id="actividad" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20" style={{ backgroundColor: 'rgba(255,255,255,.56)' }}><div className="mx-auto max-w-6xl"><p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: identidad.acento }}>Lo que hacemos</p><h2 className="mt-3 text-3xl font-black">Una actividad, muchas formas de mostrarla.</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{demo.actividad.map((item, index) => <article key={item} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm"><span className="text-xs font-black" style={{ color: identidad.acento }}>0{index + 1}</span><h3 className="mt-3 text-lg font-bold">{item}</h3><p className="mt-2 text-sm leading-6 opacity-70">Contenido ilustrativo que puede personalizarse según el cliente y la información que quiera publicar.</p></article>)}</div></div></section>

      <section id="catalogo" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-6xl"><p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: identidad.acento }}>Información comercial</p><h2 className="mt-3 text-3xl font-black">Servicios y productos destacados.</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{demo.catalogo.map((item) => <article key={item.nombre} className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm"><div className="flex h-28 items-end rounded-xl p-4 text-xs font-black uppercase tracking-wider text-white" style={{ background: `linear-gradient(135deg, ${identidad.acento}, ${identidad.fondo})` }}>Ejemplo ficticio</div><h3 className="mt-4 text-lg font-bold">{item.nombre}</h3><p className="mt-2 text-sm opacity-70">{item.detalle}</p></article>)}</div></div></section>

      <section id="galeria" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20" style={{ backgroundColor: 'rgba(255,255,255,.56)' }}><div className="mx-auto max-w-6xl"><p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: identidad.acento }}>Galería</p><h2 className="mt-3 text-3xl font-black">Una imagen también cuenta el trabajo.</h2><p className="mt-3 max-w-2xl text-sm leading-6 opacity-70">En un proyecto real, el cliente elige las fotografías y videos que quiere publicar. Estos bloques son ilustrativos; no representan imágenes ni trabajos reales.</p><div className="mt-8 grid gap-4 sm:grid-cols-3">{demo.galeria.map((item, index) => <div key={item} className="flex h-48 items-end rounded-2xl p-5 text-white shadow-sm" style={{ background: `linear-gradient(145deg, ${identidad.acento} ${index * 8}%, ${identidad.fondo})` }}><span className="rounded-lg bg-black/30 px-3 py-2 text-sm font-bold">{item}</span></div>)}</div></div></section>

      <section id="contacto" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl p-7 text-white sm:p-10 md:flex-row md:items-center md:justify-between" style={{ backgroundColor: identidad.fondo }}><div><p className="text-xs font-black uppercase tracking-[0.18em] text-white/65">Contacto comercial</p><h2 className="mt-2 text-2xl font-black sm:text-3xl">¿Querés una página con la identidad de tu proyecto?</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">Esta demo no recibe ni guarda datos personales. Para conversar sobre tu proyecto, usá el contacto de AgroManager Digital.</p></div><Link to="/soluciones-digitales#presupuesto" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white" style={{ backgroundColor: identidad.boton }}>Solicitar presupuesto <ExternalLink size={16}/></Link></div></section>

      <footer className="border-t border-black/10 px-5 py-6 text-center text-xs opacity-70"><p>Proyecto demostrativo de AgroManager Digital · Contenido y datos ficticios</p><Link to="/soluciones-digitales" className="mt-2 inline-flex items-center gap-1 font-bold" style={{ color: identidad.acento }}><ArrowLeft size={14}/> Volver a AgroManager Digital</Link></footer>
    </main>
  );
}
