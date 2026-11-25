import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Code2, Tractor, Building2, Sprout, Wrench, MessageCircle, LoaderCircle } from 'lucide-react';
import PublicNav from '../../components/layout/PublicNav';
import PublicFooter from '../../components/layout/PublicFooter';
import { api } from '../../api/client';
import { agroManagerDigitalApi, type EventoAgroManagerDigital } from '../../api/agromanager-digital.api';
import { WHATSAPP_BUSINESS_URL } from '../../components/ui/WhatsAppButton';

const perfiles = [
  ['Productores agrícolas', 'Mostrá tus cultivos, campañas y forma de trabajo.'],
  ['Ganadería y cabañas', 'Presentá rodeos, genética, instalaciones y contacto comercial.'],
  ['Contratistas rurales', 'Exhibí maquinaria, servicios, zonas de trabajo y disponibilidad.'],
  ['Empresas y cooperativas', 'Reuní información institucional, productos y canales de atención.'],
  ['Insumos y comercios', 'Compartí catálogo, marcas y vías de consulta.'],
  ['Profesionales del agro', 'Explicá tus servicios y facilitá que nuevos clientes te contacten.'],
];
const planes = [
  { nombre: 'Web Esencial', texto: 'Una presentación clara para empezar a mostrar tu actividad.', lista: ['Información institucional', 'Galería y productos o servicios', 'Contacto por WhatsApp y formulario', 'Diseño para celular'] },
  { nombre: 'Web Profesional', texto: 'Una presencia más completa para empresas y establecimientos.', lista: ['Secciones adaptadas al proyecto', 'Catálogo y galerías', 'Integración con redes', 'SEO básico y dominio a definir'] },
  { nombre: 'Desarrollo a medida', texto: 'Herramientas digitales para necesidades específicas.', lista: ['Paneles y catálogos administrables', 'Formularios y automatizaciones', 'Integraciones', 'Alcance definido en una propuesta'] },
];

function registrarEventoDigital(tipo: EventoAgroManagerDigital) {
  let origen = 'Directo';
  if (document.referrer) {
    try {
      const dominioOrigen = new URL(document.referrer).hostname;
      origen = dominioOrigen === window.location.hostname ? 'AgroManager AR' : dominioOrigen;
    } catch {
      origen = 'Directo';
    }
  }
  const parametros = new URLSearchParams(window.location.search);
  const fuenteCampania = parametros.get('utm_source') || undefined;
  const medioCampania = parametros.get('utm_medium') || undefined;
  const nombreCampania = parametros.get('utm_campaign') || undefined;
  if (fuenteCampania) origen = fuenteCampania;
  void agroManagerDigitalApi.registrarEvento(tipo, origen, medioCampania, nombreCampania).catch(() => undefined);
}

export default function SolucionesDigitalesPage() {
  const [enviando, setEnviando] = useState(false);
  const [estado, setEstado] = useState('');
  const formularioIniciado = useRef(false);
  useEffect(() => {
    registrarEventoDigital('VISITA');
    const titleAnterior = document.title;
    const canonicalUrl = 'https://www.agromanagerar.com/soluciones-digitales';
    const etiquetas = [
      { selector: 'meta[name="description"]', attr: 'name', key: 'description', value: 'Desarrollo web y soluciones digitales para productores, empresas y profesionales del agro argentino.' },
      { selector: 'meta[property="og:type"]', attr: 'property', key: 'og:type', value: 'website' },
      { selector: 'meta[property="og:title"]', attr: 'property', key: 'og:title', value: 'Desarrollo web para el agro | AgroManager Digital' },
      { selector: 'meta[property="og:description"]', attr: 'property', key: 'og:description', value: 'Páginas web y soluciones digitales para productores, empresas y profesionales del campo argentino.' },
      { selector: 'meta[property="og:url"]', attr: 'property', key: 'og:url', value: canonicalUrl },
      { selector: 'meta[name="twitter:card"]', attr: 'name', key: 'twitter:card', value: 'summary' },
      { selector: 'meta[name="twitter:title"]', attr: 'name', key: 'twitter:title', value: 'Desarrollo web para el agro | AgroManager Digital' },
      { selector: 'meta[name="twitter:description"]', attr: 'name', key: 'twitter:description', value: 'Soluciones web para productores, empresas y profesionales del agro argentino.' },
    ];
    const originales = etiquetas.map(({ selector, attr, key, value }) => {
      const existente = document.head.querySelector<HTMLMetaElement>(selector);
      const meta = existente ?? document.createElement('meta');
      if (!existente) meta.setAttribute(attr, key);
      meta.content = value;
      if (!existente) document.head.appendChild(meta);
      return { meta, existente: Boolean(existente), contenidoAnterior: existente?.content };
    });
    const canonicalAnterior = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const canonicalHrefAnterior = canonicalAnterior?.href;
    const canonical = canonicalAnterior ?? document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = canonicalUrl;
    if (!canonicalAnterior) document.head.appendChild(canonical);
    const datosEstructurados = document.createElement('script');
    datosEstructurados.type = 'application/ld+json';
    datosEstructurados.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'AgroManager Digital',
      serviceType: 'Desarrollo web y soluciones digitales para el sector agropecuario',
      description: 'Diseño y desarrollo de páginas web y soluciones digitales para productores, empresas y profesionales del agro argentino.',
      provider: { '@type': 'Organization', name: 'AgroManager AR', url: 'https://www.agromanagerar.com/' },
      areaServed: { '@type': 'Country', name: 'Argentina' },
      url: canonicalUrl,
    });
    document.head.appendChild(datosEstructurados);
    document.title = 'Desarrollo web para el agro | AgroManager Digital';
    return () => {
      document.title = titleAnterior;
      originales.forEach(({ meta, existente, contenidoAnterior }) => {
        if (existente && contenidoAnterior !== undefined) meta.content = contenidoAnterior;
        else meta.remove();
      });
      if (canonicalAnterior && canonicalHrefAnterior) canonicalAnterior.href = canonicalHrefAnterior;
      else canonical.remove();
      datosEstructurados.remove();
    };
  }, []);

  async function enviar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setEstado(''); setEnviando(true);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    try {
      const respuesta = await api.post('/agromanager-digital/solicitudes', {
        nombre: form.get('nombre'), establecimiento: form.get('establecimiento'), email: form.get('email'), telefono: form.get('telefono'), provincia: form.get('provincia'), localidad: form.get('localidad'), actividad: form.get('actividad'), servicio: form.get('servicio'), tieneSitioWeb: form.get('tieneSitioWeb') === 'si', descripcion: form.get('descripcion'), presupuesto: form.get('presupuesto') || undefined, fechaInicio: form.get('fechaInicio') || undefined, comentarios: form.get('comentarios') || undefined, consienteContacto: form.get('consienteContacto') === 'on', sitioWeb: form.get('website'),
      });
      setEstado(respuesta.data.mensaje); registrarEventoDigital('FORMULARIO_ENVIADO'); formElement.reset();
    } catch (error: any) { setEstado(error?.response?.data?.message ?? 'No pudimos enviar la consulta. Probá nuevamente o escribinos por WhatsApp.'); }
    finally { setEnviando(false); }
  }

  const input = 'mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100';
  return <div className="min-h-screen bg-white text-slate-900"><PublicNav />
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 px-4 py-20 text-white sm:py-28"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div><p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-300"><Code2 size={14}/> AgroManager Digital</p><h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-6xl">Tu campo, tu trabajo, tu propia página web.</h1><p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">Desarrollo web y soluciones digitales para el agro. Construimos una propuesta acorde a tu actividad, para que puedas mostrar lo que hacés y conectar con nuevos clientes.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#presupuesto" onClick={() => registrarEventoDigital('CLICK_PRESUPUESTO')} className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-bold text-white hover:bg-emerald-400">Solicitar presupuesto <ArrowRight size={17}/></a><a href="#soluciones" className="rounded-xl border border-white/25 px-5 py-3 font-semibold text-white hover:bg-white/10">Explorar soluciones</a></div><p className="mt-4 text-xs text-slate-400">Servicio independiente de la suscripción de AgroManager AR. Cada proyecto se presupuesta según su alcance.</p></div>
        <div className="relative mx-auto w-full max-w-lg"><div className="absolute -inset-5 rounded-[2rem] bg-emerald-500/15 blur-2xl"/><div className="relative rounded-3xl border border-white/15 bg-slate-900 p-4 shadow-2xl"><div className="mb-3 flex items-center gap-1.5 px-2"><i className="h-2.5 w-2.5 rounded-full bg-red-400"/><i className="h-2.5 w-2.5 rounded-full bg-amber-300"/><i className="h-2.5 w-2.5 rounded-full bg-emerald-400"/><span className="ml-3 h-5 flex-1 rounded-md bg-white/5"/></div><div className="rounded-2xl bg-gradient-to-br from-emerald-800 to-slate-800 p-7"><div className="text-xs font-bold uppercase tracking-widest text-emerald-200">Concepto demostrativo · Establecimiento</div><div className="mt-16 max-w-xs text-3xl font-black">Una historia que nace en el campo.</div><p className="mt-3 text-sm text-emerald-50/80">Producción, equipo y compromiso con la tierra.</p><div className="mt-6 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-bold text-emerald-900">Conocé nuestro trabajo</div></div><div className="mx-auto -mb-10 -mr-2 mt-3 w-2/3 rounded-2xl border border-slate-600 bg-slate-800 p-2 sm:absolute sm:-bottom-10 sm:right-0 sm:mt-0 sm:w-40"><div className="rounded-xl bg-emerald-900 p-3"><div className="text-[9px] font-bold text-emerald-200">DISEÑO RESPONSIVE</div><div className="mt-6 text-xs font-bold text-white">Tu proyecto, también en el celular.</div><div className="mt-3 h-1 rounded bg-emerald-400"/></div></div></div></div>
      </div></section>
      <section className="px-4 py-20"><div className="mx-auto max-w-6xl"><p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Presencia digital con sentido</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">Tu trabajo merece llegar más lejos.</h2><p className="mt-4 max-w-3xl text-slate-600">Una página propia reúne información importante en un solo lugar y complementa tus redes sociales: quién sos, qué ofrecés y cómo contactarte.</p><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{['Presentar profesionalmente tu empresa o establecimiento','Mostrar productos, servicios, maquinaria o animales','Facilitar el contacto con potenciales clientes','Compartir información comercial en un único lugar','Construir una identidad digital propia','Dar acceso desde computadora o celular'].map(x=><div key={x} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5"><Check className="shrink-0 text-emerald-600" size={19}/><p className="font-medium">{x}</p></div>)}</div></div></section>
      <section className="bg-slate-50 px-4 py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-black">Pensado para quienes trabajan en el agro</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{perfiles.map(([name,desc],i)=><article key={name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4 inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-700">{[<Sprout/>,<Building2/>,<Tractor/>,<Building2/>,<Wrench/>,<Sprout/>][i]}</div><h3 className="font-bold">{name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p></article>)}</div></div></section>
      <section id="soluciones" className="px-4 py-20"><div className="mx-auto max-w-6xl"><p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Servicios</p><h2 className="mt-2 text-3xl font-black">Una solución acorde a tu proyecto.</h2><p className="mt-3 text-slate-600">El alcance y el presupuesto se conversan antes de comenzar. No hay contratación automática.</p><div className="mt-8 grid gap-5 lg:grid-cols-3">{planes.map(p=><article key={p.nombre} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-black">{p.nombre}</h3><p className="mt-2 min-h-12 text-sm text-slate-600">{p.texto}</p><ul className="mt-5 space-y-3">{p.lista.map(x=><li key={x} className="flex gap-2 text-sm"><Check size={16} className="shrink-0 text-emerald-600"/>{x}</li>)}</ul><a href="#presupuesto" className="mt-6 inline-flex items-center gap-2 font-bold text-emerald-700">Consultar alcance <ArrowRight size={16}/></a></article>)}</div></div></section>
      <section className="bg-slate-50 px-4 py-16"><div className="mx-auto max-w-6xl"><p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Acompañamiento opcional</p><h2 className="mt-2 text-3xl font-black">También podemos ayudarte después de publicar.</h2><p className="mt-3 max-w-3xl text-slate-600">Estos servicios se conversan según lo que necesite cada proyecto; no están incluidos automáticamente en todos los desarrollos.</p><div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{['Mantenimiento y soporte técnico','Actualización de textos, fotos y productos','Configuración de dominio y alojamiento','Mejoras y nuevas funcionalidades','Digitalización de tareas administrativas','Acompañamiento para mantener el sitio actualizado'].map((servicio) => <article key={servicio} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4"><Check className="mt-0.5 shrink-0 text-emerald-600" size={18}/><p className="text-sm font-semibold text-slate-800">{servicio}</p></article>)}</div></div></section>
      <section className="bg-emerald-950 px-4 py-20 text-white"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-black">Imaginá tu proyecto</h2><p className="mt-2 text-emerald-100">Conceptos visuales de ejemplo. No representan trabajos realizados para clientes.</p><div className="mt-8 grid gap-5 md:grid-cols-3">{[['Establecimiento agrícola','Cultivos, campañas y una historia de producción.'],['Cabaña ganadera','Rodeo, genética y canales para consultas comerciales.'],['Servicios y maquinaria','Equipos, trabajos y zonas de cobertura.']].map(([t,d],i)=><div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="mb-4 flex h-36 items-end rounded-xl bg-gradient-to-br from-emerald-500/60 via-green-800 to-slate-900 p-4"><span className="rounded-lg bg-black/30 px-3 py-2 text-xs font-bold">CONCEPTO {String(i+1).padStart(2,'0')}</span></div><h3 className="font-bold">{t}</h3><p className="mt-2 text-sm text-emerald-100/80">{d}</p></div>)}</div></div></section>
      <section className="px-4 py-20"><div className="mx-auto max-w-5xl"><h2 className="text-3xl font-black">Un proceso claro, de principio a fin</h2><div className="mt-8 grid gap-4 sm:grid-cols-5">{['Escuchamos tu idea','Diseñamos una propuesta','Desarrollamos tu página','Revisamos juntos','Publicamos el proyecto'].map((x,i)=><div key={x} className="rounded-xl border border-slate-200 p-4"><span className="text-sm font-black text-emerald-700">0{i+1}</span><p className="mt-2 text-sm font-semibold">{x}</p></div>)}</div></div></section>
      <section id="presupuesto" className="bg-slate-50 px-4 py-20"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Hablemos de tu idea</p><h2 className="mt-2 text-3xl font-black">Cada proyecto empieza con una idea. Contanos la tuya.</h2><p className="mt-4 leading-7 text-slate-600">Completá estos datos y nos pondremos en contacto para entender qué necesitás. La consulta no implica compromiso de contratación.</p><a href={WHATSAPP_BUSINESS_URL} onClick={() => registrarEventoDigital('CLICK_WHATSAPP')} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-bold text-white"><MessageCircle size={18}/> Consultar por WhatsApp</a><div className="mt-8 space-y-3 text-sm text-slate-600">{['No necesitás una cuenta de AgroManager AR','El servicio es independiente de los planes de la plataforma','El presupuesto depende del alcance que acordemos'].map(x=><p key={x} className="flex gap-2"><Check size={16} className="text-emerald-700"/>{x}</p>)}</div></div>
        <form onSubmit={enviar} onFocusCapture={() => { if (!formularioIniciado.current) { formularioIniciado.current = true; registrarEventoDigital('FORMULARIO_INICIADO'); } }} className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-7"><Field label="Nombre y apellido" name="nombre" required/><Field label="Establecimiento o empresa" name="establecimiento" required/><Field label="Correo electrónico" name="email" type="email" required/><Field label="Teléfono o WhatsApp" name="telefono" type="tel" required/><Field label="Provincia" name="provincia" required/><Field label="Localidad" name="localidad" required/><Field label="Actividad" name="actividad" required/><label className="text-sm font-semibold">Servicio de interés<select name="servicio" required className={input}><option value="">Seleccionar</option><option>Web Esencial</option><option>Web Profesional</option><option>Desarrollo a medida</option><option>Quiero asesoramiento</option></select></label><label className="text-sm font-semibold">¿Tenés una página actualmente?<select name="tieneSitioWeb" required className={input}><option value="no">No</option><option value="si">Sí</option></select></label><Field label="Presupuesto estimado (opcional)" name="presupuesto"/><Field label="Fecha estimada para comenzar (opcional)" name="fechaInicio"/><label className="text-sm font-semibold sm:col-span-2">¿Qué te gustaría mostrar o incorporar?<textarea name="descripcion" required maxLength={3000} rows={3} className={input}/></label><label className="text-sm font-semibold sm:col-span-2">Comentarios adicionales (opcional)<textarea name="comentarios" maxLength={2000} rows={2} className={input}/></label><div className="absolute -left-[10000px]" aria-hidden="true"><label>Sitio web<input name="website" tabIndex={-1} autoComplete="off"/></label></div><label className="flex items-start gap-2 text-xs leading-5 text-slate-600 sm:col-span-2"><input type="checkbox" name="consienteContacto" required className="mt-1"/>Autorizo a AgroManager Digital a usar estos datos para responder esta consulta y contactarme comercialmente.</label>{estado&&<p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900 sm:col-span-2">{estado}</p>}<button disabled={enviando} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white hover:bg-emerald-800 disabled:opacity-60 sm:col-span-2">{enviando?<><LoaderCircle className="animate-spin" size={18}/>Enviando...</>:'Enviar consulta'}</button></form>
      </div></section>
      <section className="px-4 py-16"><div className="mx-auto max-w-4xl"><h2 className="text-3xl font-black">Preguntas frecuentes</h2><div className="mt-6 divide-y divide-slate-200">{[['¿Necesito conocimientos de informática?','No. Conversamos tus necesidades y te explicamos las opciones en lenguaje claro.'],['¿Puedo tener mi propio dominio?','Sí, podemos incluir la configuración de un dominio propio en la propuesta; su titularidad y costos se acuerdan antes.'],['¿La página se verá en celulares?','Sí, el diseño se plantea para adaptarse a celulares y computadoras.'],['¿Puedo solicitar funcionalidades personalizadas?','Sí. Podemos analizar formularios, paneles, catálogos, automatizaciones e integraciones. Primero definimos el alcance y luego te presentamos una propuesta.'],['¿Cómo se determina el presupuesto?','Se define según las páginas, contenidos e integraciones que necesite cada proyecto.'],['¿Necesito una cuenta en AgroManager AR?','No. AgroManager Digital es un servicio independiente.'],['¿Puedo pedir mantenimiento o actualizar contenidos?','Podemos conversar opciones de mantenimiento y actualización como servicios complementarios.']].map(([q,a])=><details key={q} className="py-4"><summary className="cursor-pointer font-bold">{q}</summary><p className="mt-2 text-sm leading-6 text-slate-600">{a}</p></details>)}</div></div></section>
      <section className="bg-gradient-to-r from-emerald-900 to-slate-900 px-4 py-14 text-center text-white"><h2 className="text-3xl font-black">Contanos qué te gustaría construir.</h2><p className="mx-auto mt-3 max-w-2xl text-emerald-100">Escuchamos tu idea y buscamos una solución útil para tu actividad.</p><a href="#presupuesto" onClick={() => registrarEventoDigital('CLICK_PRESUPUESTO')} className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-emerald-900">Solicitar presupuesto</a></section>
    </main><PublicFooter /></div>;
}

function Field({label,name,type='text',required=false}:{label:string;name:string;type?:string;required?:boolean}) { return <label className="text-sm font-semibold">{label}<input name={name} type={type} required={required} maxLength={180} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"/></label>; }
