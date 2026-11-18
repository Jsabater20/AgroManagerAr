import { useState, useRef, useEffect } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  Bot,
  CalendarCheck2,
  CheckCircle2,
  Database,
  Layers3,
  Loader2,
  MapPinned,
  Send,
  Sprout,
  UserRound,
  X,
  Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  aiApi,
  type AgroBotIndicador,
  type AgroBotReferencia,
  type ChatMessage,
  type PropuestaCrearCampoAgroBot,
  type PropuestaCompletarTareaAgroBot,
  type PropuestaCrearTrabajoAgroBot,
  type PropuestaAccionAgroBot,
} from '../../api/ai.api';
import { useAuthStore } from '../../store/auth.store';

interface DisplayMessage {
  role: 'user' | 'model';
  text: string;
  loading?: boolean;
  indicadores?: AgroBotIndicador[];
  referencias?: AgroBotReferencia[];
  basadaEnDatos?: boolean;
  accion?: PropuestaAccionAgroBot | null;
}

const WELCOME: DisplayMessage = {
  role: 'model',
  text: '¡Hola! Soy **AgroBot** 🌱\nPuedo consultar los datos visibles de este establecimiento: gastos, trabajos, lotes, campañas, maquinarias y el pronóstico disponible por campo. También puedo ayudarte con consultas agropecuarias generales. ¿Qué necesitás revisar?',
};

const WELCOME_OWNER: DisplayMessage = {
  role: 'model',
  text: '¡Hola! Soy **AgroBot** 🌱\nAdemás de los datos productivos del establecimiento, puedo ayudarte a seguir el equipo: trabajos en curso, tareas vencidas y la situación de cada integrante. ¿Qué necesitás revisar?',
};

function esConfirmacionDePropuesta(texto: string) {
  const confirmacion = texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

  return /^(si|confirmo|confirmar|confirmalo|confirmarlo|crealo|crearla|crearlo|dale|ok|okay|proceder|adelante|hacelo|hacela)\b/.test(confirmacion);
}

export default function AiChat() {
  const isPro = useAuthStore((s) => s.isPro());
  const usuario = useAuthStore((s) => s.usuario);
  const organizacionActiva = useAuthStore((s) => s.currentOrg());
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmandoPropuesta, setConfirmandoPropuesta] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const clavesConfirmacion = useRef<Record<number, string>>({});
  const esOwner = Boolean(
    usuario &&
    organizacionActiva &&
    organizacionActiva.propietarioId === usuario.id,
  );

  const obtenerClaveConfirmacion = (messageIndex: number) => {
    if (!clavesConfirmacion.current[messageIndex]) {
      clavesConfirmacion.current[messageIndex] = globalThis.crypto?.randomUUID?.()
        ?? `agrobot-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
    return clavesConfirmacion.current[messageIndex];
  };

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  useEffect(() => {
    setMessages([esOwner ? WELCOME_OWNER : WELCOME]);
    setInput('');
  }, [esOwner, organizacionActiva?.id]);

  const send = async () => {
    const msg = input.trim();
    if (!msg || loading || confirmandoPropuesta !== null) return;
    setInput('');

    const userMsg: DisplayMessage = { role: 'user', text: msg };
    const indicePropuestaPendiente = messages.reduce<number | null>(
      (ultimoIndice, message, indice) =>
        message.accion ? indice : ultimoIndice,
      null,
    );
    const propuestaPendiente = indicePropuestaPendiente === null
      ? null
      : messages[indicePropuestaPendiente].accion;

    if (propuestaPendiente && indicePropuestaPendiente !== null && esConfirmacionDePropuesta(msg)) {
      setMessages((prev) => [...prev, userMsg]);
      if (!propuestaPendiente.sePuedeConfirmar) {
        const pendientes = propuestaPendiente.faltantes.length
          ? ` Todavía faltan: ${propuestaPendiente.faltantes.join(', ')}.`
          : ' Revisá las advertencias marcadas en la propuesta antes de confirmarla.';
        setMessages((prev) => [
          ...prev,
          { role: 'model', text: `No puedo confirmarla todavía.${pendientes}` },
        ]);
        return;
      }
      if (propuestaPendiente.tipo === 'CREAR_CAMPO_CON_LOTES') {
        void confirmarPropuesta(indicePropuestaPendiente, propuestaPendiente);
      } else if (propuestaPendiente.tipo === 'CREAR_TRABAJO') {
        void confirmarTrabajo(indicePropuestaPendiente, propuestaPendiente);
      } else {
        void confirmarCompletarTarea(indicePropuestaPendiente, propuestaPendiente);
      }
      return;
    }

    const thinkingMsg: DisplayMessage = { role: 'model', text: '', loading: true };
    setMessages((prev) => [...prev, userMsg, thinkingMsg]);
    setLoading(true);

    // Build API history (exclude welcome + loading)
    const history: ChatMessage[] = messages
      .slice(1)
      .filter((m) => !m.loading)
      .map((m) => ({ role: m.role, text: m.text }));

    try {
      const reply = await aiApi.chat(history, msg);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: 'model',
          text: reply.text,
          indicadores: reply.indicadores,
          referencias: reply.referencias,
          basadaEnDatos: reply.basadaEnDatos,
          accion: reply.accion,
        },
      ]);
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      const responseMessage = (err as { response?: { data?: { message?: string | string[] } } })
        ?.response?.data?.message;
      const detalle = Array.isArray(responseMessage) ? responseMessage.join(', ') : responseMessage;
      const errMsg =
        status === 403
          ? 'No tenés acceso a AgroBot. Verificá que tu plan Pro esté activo.'
          : status === 401
          ? 'Tu sesión expiró. Volvé a iniciar sesión.'
          : status === 429
          ? detalle || 'Alcanzaste el límite de consultas con IA. Podés seguir usando las consultas operativas de AgroBot.'
          : 'No pude obtener respuesta. Intentá de nuevo en unos segundos.';
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: 'model', text: errMsg },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const descartarPropuesta = (messageIndex: number) => {
    setMessages((prev) => [
      ...prev.map((message, index) =>
        index === messageIndex ? { ...message, accion: null } : message,
      ),
      {
        role: 'model',
        text: 'Propuesta descartada. No se creó ni se modificó ningún dato.',
      },
    ]);
  };

  const confirmarPropuesta = async (
    messageIndex: number,
    propuesta: PropuestaCrearCampoAgroBot,
  ) => {
    if (
      !propuesta.sePuedeConfirmar ||
      !propuesta.campo.nombre ||
      !propuesta.campo.hectareas ||
      propuesta.lotes.some((lote) => !lote.nombre || !lote.hectareas)
    ) {
      return;
    }

    setConfirmandoPropuesta(messageIndex);
    try {
      const resultado = await aiApi.confirmarCreacionCampo({
        idempotencyKey: obtenerClaveConfirmacion(messageIndex),
        campo: {
          nombre: propuesta.campo.nombre,
          hectareas: propuesta.campo.hectareas,
        },
        actividades: propuesta.campo.actividadesDetectadas
          .map((actividad) => actividad === 'AGRICULTURA' ? 'AGRICOLA' : actividad)
          .filter((actividad): actividad is 'AGRICOLA' | 'GANADERIA' => actividad === 'AGRICOLA' || actividad === 'GANADERIA'),
        lotes: propuesta.lotes.map((lote) => ({
          nombre: lote.nombre!,
          hectareas: lote.hectareas!,
        })),
      });
      setMessages((prev) => [
        ...prev.map((message, index) =>
          index === messageIndex ? { ...message, accion: null } : message,
        ),
        {
          role: 'model',
          text: `Listo. Creé el campo **${resultado.campo.nombre}** con ${resultado.campo.lotes.length} lote${resultado.campo.lotes.length === 1 ? '' : 's'}.`,
          referencias: [resultado.referencia],
          basadaEnDatos: true,
        },
      ]);
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string | string[] } } })
        ?.response?.data?.message;
      const detalle = Array.isArray(message) ? message.join(', ') : message;
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: detalle || 'No pude crear el campo. Revisá los datos e intentá confirmar nuevamente.',
        },
      ]);
    } finally {
      setConfirmandoPropuesta(null);
    }
  };

  const confirmarTrabajo = async (
    messageIndex: number,
    propuesta: PropuestaCrearTrabajoAgroBot,
  ) => {
    const { trabajo } = propuesta;
    if (!propuesta.sePuedeConfirmar || !trabajo.titulo || !trabajo.responsable || !trabajo.fechaInicio) return;
    setConfirmandoPropuesta(messageIndex);
    try {
      const resultado = await aiApi.confirmarCreacionTrabajo({
        idempotencyKey: obtenerClaveConfirmacion(messageIndex),
        titulo: trabajo.titulo,
        usuarioOrganizacionId: trabajo.responsable.id,
        recursoTipo: trabajo.campo ? 'CAMPO' : 'GENERAL',
        ...(trabajo.campo ? { recursoId: trabajo.campo.id } : {}),
        fechaInicio: trabajo.fechaInicio,
        prioridad: trabajo.prioridad,
      });
      setMessages((prev) => [
        ...prev.map((message, index) => index === messageIndex ? { ...message, accion: null } : message),
        { role: 'model', text: `Listo. Asigné el trabajo **${resultado.trabajo.titulo}**.`, referencias: [resultado.referencia], basadaEnDatos: true },
      ]);
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string | string[] } } })?.response?.data?.message;
      setMessages((prev) => [...prev, { role: 'model', text: Array.isArray(message) ? message.join(', ') : message || 'No pude asignar el trabajo. Revisá los datos e intentá nuevamente.' }]);
    } finally {
      setConfirmandoPropuesta(null);
    }
  };

  const confirmarCompletarTarea = async (
    messageIndex: number,
    propuesta: PropuestaCompletarTareaAgroBot,
  ) => {
    if (!propuesta.sePuedeConfirmar || !propuesta.tarea) return;
    setConfirmandoPropuesta(messageIndex);
    try {
      const resultado = await aiApi.confirmarCompletarTarea({
        idempotencyKey: obtenerClaveConfirmacion(messageIndex),
        origen: propuesta.tarea.origen,
        tareaId: propuesta.tarea.id,
      });
      setMessages((prev) => [
        ...prev.map((message, index) => index === messageIndex ? { ...message, accion: null } : message),
        {
          role: 'model',
          text: `Listo. Marqué como hecha **${resultado.tarea.titulo}**.`,
          referencias: [resultado.referencia],
          basadaEnDatos: true,
        },
      ]);
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string | string[] } } })?.response?.data?.message;
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: Array.isArray(message) ? message.join(', ') : message || 'No pude marcar la tarea como hecha. Revisá su estado e intentá nuevamente.',
        },
      ]);
    } finally {
      setConfirmandoPropuesta(null);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => isPro ? setOpen((o) => !o) : navigate('/precios')}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center transition-all duration-200 ${
          open
            ? 'bg-gray-700 hover:bg-gray-600'
            : 'bg-green-600 hover:bg-green-500 hover:scale-105'
        }`}
        aria-label="AgroBot"
        title={isPro ? 'AgroBot' : 'AgroBot — Solo Plan Pro'}
      >
        {open ? (
          <X size={22} className="text-white" />
        ) : (
          <Bot size={24} className="text-white" />
        )}
        {!open && isPro && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
        )}
        {!open && !isPro && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
            <Zap size={10} className="text-yellow-900" />
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 flex h-[520px] w-90 max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800"
        >
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-3 bg-green-700 text-white shrink-0">
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
              <Sprout size={16} />
            </div>
            <div>
              <p className="font-semibold text-sm leading-none">AgroBot</p>
              <p className="text-[10px] text-green-200 mt-0.5">Asistente agrícola IA</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-[10px] text-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              En línea
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50 dark:bg-gray-900">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'model' && (
                  <div className="w-7 h-7 rounded-xl bg-green-600 flex items-center justify-center shrink-0 mr-2 mt-0.5">
                    <Bot size={13} className="text-white" />
                  </div>
                )}
                <div
                  className={`${m.accion ? 'max-w-[92%]' : 'max-w-[80%]'} px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-green-600 text-white rounded-tr-sm'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-tl-sm shadow-sm'
                  }`}
                >
                  {m.loading ? (
                    <span className="flex items-center gap-2 text-gray-400">
                      <Loader2 size={13} className="animate-spin" />
                      Pensando...
                    </span>
                  ) : (
                    <>
                      {renderMarkdown(m.text)}
                      {m.accion?.tipo === 'CREAR_CAMPO_CON_LOTES' && (
                        <PropuestaCampoCard
                          propuesta={m.accion}
                          onDescartar={() => descartarPropuesta(i)}
                          onConfirmar={() => void confirmarPropuesta(i, m.accion as PropuestaCrearCampoAgroBot)}
                          confirmando={confirmandoPropuesta === i}
                        />
                      )}
                      {m.accion?.tipo === 'CREAR_TRABAJO' && (
                        <PropuestaTrabajoCard
                          propuesta={m.accion}
                          onDescartar={() => descartarPropuesta(i)}
                          onConfirmar={() => void confirmarTrabajo(i, m.accion as PropuestaCrearTrabajoAgroBot)}
                          confirmando={confirmandoPropuesta === i}
                        />
                      )}
                      {m.accion?.tipo === 'COMPLETAR_TAREA' && (
                        <PropuestaCompletarTareaCard
                          propuesta={m.accion}
                          onDescartar={() => descartarPropuesta(i)}
                          onConfirmar={() => void confirmarCompletarTarea(i, m.accion as PropuestaCompletarTareaAgroBot)}
                          confirmando={confirmandoPropuesta === i}
                        />
                      )}
                      {m.indicadores && m.indicadores.length > 0 && (
                        <div className="mt-3 grid gap-1.5">
                          {m.indicadores.map((indicador) => (
                            <div
                              key={`${indicador.etiqueta}-${indicador.valor}`}
                              className="rounded-lg border border-green-100 bg-green-50 px-2.5 py-2 dark:border-green-900/60 dark:bg-green-950/30"
                            >
                              <p className="text-[10px] font-medium uppercase tracking-wide text-green-700 dark:text-green-300">
                                {indicador.etiqueta}
                              </p>
                              <p className="text-sm font-bold text-gray-900 dark:text-white">{indicador.valor}</p>
                              {indicador.detalle && (
                                <p className="text-[10px] text-gray-500 dark:text-gray-400">{indicador.detalle}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {m.referencias && m.referencias.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {m.referencias.map((referencia) => (
                            <button
                              key={referencia.href}
                              type="button"
                              onClick={() => {
                                setOpen(false);
                                navigate(referencia.href);
                              }}
                              className="inline-flex items-center gap-1 rounded-lg border border-green-200 bg-white px-2 py-1 text-[11px] font-semibold text-green-700 transition-colors hover:bg-green-50 dark:border-green-900 dark:bg-gray-900 dark:text-green-300"
                            >
                              {referencia.etiqueta}
                              <ArrowUpRight size={11} />
                            </button>
                          ))}
                        </div>
                      )}
                      {m.basadaEnDatos && (
                        <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-gray-400 dark:text-gray-500">
                          <Database size={10} />
                          Datos visibles del establecimiento y pronóstico disponible
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions (only first load) */}
          {messages.length === 1 && (
            <div className="px-3 py-2 bg-gray-50 dark:bg-gray-900 flex gap-2 overflow-x-auto shrink-0 border-t border-gray-100 dark:border-gray-800">
              {(esOwner ? OWNER_SUGGESTIONS : SUGGESTIONS).map((s) => (
                <button
                  key={s}
                  onClick={() => { setInput(s); inputRef.current?.focus(); }}
                  className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-green-400 hover:text-green-700 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-2.5 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && void send()}
              placeholder="Preguntá sobre tu campo..."
              className="flex-1 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 outline-none focus:border-green-400 dark:text-white placeholder:text-gray-400"
              disabled={loading || confirmandoPropuesta !== null}
            />
            <button
              onClick={() => void send()}
              disabled={loading || confirmandoPropuesta !== null || !input.trim()}
              className="w-9 h-9 rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-40 flex items-center justify-center transition-colors shrink-0"
            >
              {loading ? (
                <Loader2 size={15} className="text-white animate-spin" />
              ) : (
                <Send size={15} className="text-white" />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── helpers ──────────────────────────────────────────────────────────────────

const SUGGESTIONS = [
  '¿Cómo está el clima de mis campos?',
  '¿Hay riesgo de helada o lluvia?',
  '¿Qué alertas urgentes tengo?',
  '¿Cuánto gasté este mes?',
  '¿Qué tareas tengo pendientes?',
  '¿Qué trabajos están atrasados?',
  'Resumí mi establecimiento',
  'Creame el campo Los Patitos de 200 ha, con dos lotes: Norte de 120 ha y Sur de 80 ha',
];

const OWNER_SUGGESTIONS = [
  '¿Cómo va mi equipo?',
  '¿Qué miembros tienen trabajos vencidos?',
  '¿Qué trabajos están atrasados?',
  '¿Cuánto gasté este mes?',
  'Resumí mi establecimiento',
  'Creame el campo Los Patitos de 200 ha, con dos lotes: Norte de 120 ha y Sur de 80 ha',
];

function PropuestaCompletarTareaCard({
  propuesta,
  onDescartar,
  onConfirmar,
  confirmando,
}: {
  propuesta: PropuestaCompletarTareaAgroBot;
  onDescartar: () => void;
  onConfirmar: () => void;
  confirmando: boolean;
}) {
  const estado = {
    LISTA_PARA_CONFIRMAR: 'Lista para confirmar',
    FALTAN_DATOS: 'Faltan datos',
    NO_ENCONTRADA: 'No encontrada',
    REQUIERE_PRECISION: 'Elegí una tarea',
    SIN_PERMISO: 'Sin permiso',
  }[propuesta.estado];

  return (
    <section className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-left shadow-sm dark:border-slate-600 dark:bg-slate-900">
      <div className="flex items-start gap-2 border-b border-slate-200 px-3 py-2.5 dark:border-slate-700">
        <div className="rounded-lg bg-emerald-100 p-1.5 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"><CheckCircle2 size={15} /></div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-slate-900 dark:text-white">{propuesta.titulo}</p>
          <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">{propuesta.lectura.organizacionNombre}</p>
        </div>
        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200">{estado}</span>
      </div>
      <div className="space-y-2.5 px-3 py-3 text-[11px]">
        {propuesta.tarea && (
          <div className="rounded-lg border border-slate-200 bg-white p-2.5 dark:border-slate-700 dark:bg-slate-800">
            <p className="font-semibold text-slate-900 dark:text-white">{propuesta.tarea.titulo}</p>
            <p className="mt-1 text-slate-600 dark:text-slate-300">
              {propuesta.tarea.origen === 'TRABAJO_EQUIPO' ? 'Trabajo asignado al equipo' : 'Tarea del establecimiento'} · Estado actual: {propuesta.tarea.estado.toLowerCase().replace('_', ' ')}
            </p>
          </div>
        )}
        {propuesta.faltantes.length > 0 && (
          <div className="rounded-lg bg-amber-50 px-2.5 py-2 text-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
            {propuesta.faltantes.join(', ')}
          </div>
        )}
        {propuesta.coincidencias.length > 0 && (
          <div className="rounded-lg bg-amber-50 px-2.5 py-2 text-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
            <p className="font-semibold">Coincidencias encontradas</p>
            <p className="mt-1">{propuesta.coincidencias.join(', ')}</p>
          </div>
        )}
        <div className="flex gap-2">
          <button type="button" onClick={onDescartar} className="flex-1 rounded-lg border border-slate-300 bg-white px-2 py-1.5 font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">Cancelar</button>
          {propuesta.sePuedeConfirmar && <button type="button" onClick={onConfirmar} disabled={confirmando} className="flex-1 rounded-lg bg-emerald-600 px-2 py-1.5 font-semibold text-white hover:bg-emerald-500 disabled:opacity-60">{confirmando ? 'Marcando...' : 'Confirmar y marcar hecha'}</button>}
        </div>
      </div>
    </section>
  );
}

function PropuestaTrabajoCard({
  propuesta,
  onDescartar,
  onConfirmar,
  confirmando,
}: {
  propuesta: PropuestaCrearTrabajoAgroBot;
  onDescartar: () => void;
  onConfirmar: () => void;
  confirmando: boolean;
}) {
  const lista = propuesta.estado === 'LISTA_PARA_CONFIRMAR';
  return (
    <section className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-left shadow-sm dark:border-slate-600 dark:bg-slate-900">
      <div className="flex items-start gap-2 border-b border-slate-200 px-3 py-2.5 dark:border-slate-700">
        <div className="rounded-lg bg-blue-100 p-1.5 text-blue-700 dark:bg-blue-950 dark:text-blue-300"><CalendarCheck2 size={15} /></div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-slate-900 dark:text-white">{propuesta.titulo}</p>
          <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">Propuesta para {propuesta.lectura.organizacionNombre}</p>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${lista ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200'}`}>
          {lista ? 'Lista para confirmar' : propuesta.estado === 'SIN_PERMISO' ? 'Sin permiso' : 'Faltan datos'}
        </span>
      </div>
      <div className="space-y-2.5 px-3 py-3 text-[11px]">
        <div className="rounded-lg border border-slate-200 bg-white p-2.5 dark:border-slate-700 dark:bg-slate-800">
          <p className="font-semibold text-slate-900 dark:text-white">{propuesta.trabajo.titulo ?? 'Trabajo pendiente de definir'}</p>
          <div className="mt-2 grid gap-1 text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1"><UserRound size={11} /> {propuesta.trabajo.responsable?.nombre ?? 'Responsable pendiente'}</span>
            <span className="flex items-center gap-1"><MapPinned size={11} /> {propuesta.trabajo.campo?.nombre ?? 'Trabajo general'}</span>
            <span className="flex items-center gap-1"><CalendarCheck2 size={11} /> {propuesta.trabajo.fechaInicio ?? 'Fecha pendiente'} · Prioridad {propuesta.trabajo.prioridad.toLowerCase()}</span>
          </div>
        </div>
        {propuesta.faltantes.length > 0 && <div className="rounded-lg bg-amber-50 px-2.5 py-2 text-amber-900 dark:bg-amber-950/30 dark:text-amber-100"><p className="font-semibold">Para continuar necesito</p><ul className="mt-1 list-disc pl-4">{propuesta.faltantes.map((faltante) => <li key={faltante}>{faltante}</li>)}</ul></div>}
        <div className="flex gap-2">
          <button type="button" onClick={onDescartar} className="flex-1 rounded-lg border border-slate-300 bg-white px-2 py-1.5 font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">Cancelar</button>
          {propuesta.sePuedeConfirmar && <button type="button" onClick={onConfirmar} disabled={confirmando} className="flex-1 rounded-lg bg-emerald-600 px-2 py-1.5 font-semibold text-white hover:bg-emerald-500 disabled:opacity-60">{confirmando ? 'Asignando...' : 'Confirmar y asignar'}</button>}
        </div>
      </div>
    </section>
  );
}

function PropuestaCampoCard({
  propuesta,
  onDescartar,
  onConfirmar,
  confirmando,
}: {
  propuesta: PropuestaCrearCampoAgroBot;
  onDescartar: () => void;
  onConfirmar: () => void;
  confirmando: boolean;
}) {
  const estado = {
    LISTA_PARA_CONFIRMAR: {
      etiqueta: 'Lista para confirmar',
      className: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200',
    },
    FALTAN_DATOS: {
      etiqueta: 'Faltan datos',
      className: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200',
    },
    REQUIERE_REVISION: {
      etiqueta: 'Requiere revisión',
      className: 'border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-950/30 dark:text-orange-200',
    },
    SIN_PERMISO: {
      etiqueta: 'Sin permiso',
      className: 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/30 dark:text-red-200',
    },
  }[propuesta.estado];

  return (
    <section className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-left shadow-sm dark:border-slate-600 dark:bg-slate-900">
      <div className="flex items-start gap-2 border-b border-slate-200 px-3 py-2.5 dark:border-slate-700">
        <div className="mt-0.5 rounded-lg bg-emerald-100 p-1.5 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          <MapPinned size={15} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-slate-900 dark:text-white">{propuesta.titulo}</p>
          <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
            Propuesta para {propuesta.lectura.organizacionNombre}
          </p>
        </div>
        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${estado.className}`}>
          {estado.etiqueta}
        </span>
      </div>

      <div className="space-y-3 px-3 py-3">
        <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Campo</p>
          <p className="mt-1 text-xs font-semibold text-slate-900 dark:text-white">
            {propuesta.campo.nombre ?? 'Nombre pendiente'}
            <span className="ml-1 font-normal text-slate-500 dark:text-slate-400">
              · {propuesta.campo.hectareas ? `${propuesta.campo.hectareas} ha` : 'Superficie pendiente'}
            </span>
          </p>
          {propuesta.campo.actividadesDetectadas.length > 0 && (
            <p className="mt-1 text-[10px] text-emerald-700 dark:text-emerald-300">
              Actividad detectada: {propuesta.campo.actividadesDetectadas.join(' · ')}
            </p>
          )}
        </div>

        {propuesta.lotes.length > 0 && (
          <div>
            <p className="mb-1.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <Layers3 size={11} /> Lotes a crear
            </p>
            <div className="space-y-1.5">
              {propuesta.lotes.map((lote, index) => (
                <div
                  key={`${lote.nombre ?? 'lote'}-${index}`}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] dark:border-slate-700 dark:bg-slate-800"
                >
                  <span className="font-medium text-slate-700 dark:text-slate-200">{lote.nombre ?? 'Nombre pendiente'}</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {lote.hectareas ? `${lote.hectareas} ha` : 'Superficie pendiente'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {propuesta.faltantes.length > 0 && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-2 dark:border-amber-900 dark:bg-amber-950/30">
            <p className="flex items-center gap-1 text-[10px] font-bold text-amber-800 dark:text-amber-200">
              <AlertTriangle size={11} /> Para continuar necesito
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[10px] text-amber-900 dark:text-amber-100">
              {propuesta.faltantes.map((faltante) => <li key={faltante}>{faltante}</li>)}
            </ul>
          </div>
        )}

        {propuesta.advertencias.length > 0 && (
          <div className="rounded-lg border border-orange-200 bg-orange-50 px-2.5 py-2 dark:border-orange-900 dark:bg-orange-950/30">
            <p className="flex items-center gap-1 text-[10px] font-bold text-orange-800 dark:text-orange-200">
              <AlertTriangle size={11} /> Revisá antes de confirmar
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[10px] text-orange-900 dark:text-orange-100">
              {propuesta.advertencias.map((advertencia) => <li key={advertencia}>{advertencia}</li>)}
            </ul>
          </div>
        )}

        <div className="flex items-start gap-1.5 rounded-lg bg-slate-200/70 px-2.5 py-2 text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          Nada se crea hasta que confirmes la propuesta.
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onDescartar}
            className="flex-1 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-[11px] font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Cancelar
          </button>
          {propuesta.sePuedeConfirmar && (
            <button
              type="button"
              onClick={onConfirmar}
              disabled={confirmando}
              className="flex-1 rounded-lg bg-emerald-600 px-2 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-emerald-500 disabled:cursor-wait disabled:opacity-60"
            >
              {confirmando ? 'Creando...' : 'Confirmar y crear'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/** Minimal markdown renderer — bold + newlines only */
function renderMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part.split('\n').map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
}
