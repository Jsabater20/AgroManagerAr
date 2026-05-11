import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2, Sprout } from 'lucide-react';
import { aiApi, type ChatMessage } from '../../api/ai.api';

interface DisplayMessage {
  role: 'user' | 'model';
  text: string;
  loading?: boolean;
}

const WELCOME: DisplayMessage = {
  role: 'model',
  text: '¡Hola! Soy **AgroBot** 🌱\nAnalizé tu establecimiento. Podés preguntarme sobre tus cultivos, tareas, finanzas, clima o cualquier tema agropecuario. ¿En qué te ayudo?',
};

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  const send = async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput('');

    const userMsg: DisplayMessage = { role: 'user', text: msg };
    const thinkingMsg: DisplayMessage = { role: 'model', text: '', loading: true };
    setMessages((prev) => [...prev, userMsg, thinkingMsg]);
    setLoading(true);

    // Build API history (exclude welcome + loading)
    const history: ChatMessage[] = messages
      .filter((m) => !m.loading && m !== WELCOME)
      .map((m) => ({ role: m.role, text: m.text }));

    try {
      const reply = await aiApi.chat(history, msg);
      setMessages((prev) => [...prev.slice(0, -1), { role: 'model', text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: 'model', text: 'No pude obtener respuesta. Verificá que el servidor esté activo y que GEMINI_API_KEY esté configurada.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center transition-all duration-200 ${
          open
            ? 'bg-gray-700 hover:bg-gray-600'
            : 'bg-green-600 hover:bg-green-500 hover:scale-105'
        }`}
        aria-label="AgroBot"
      >
        {open ? (
          <X size={22} className="text-white" />
        ) : (
          <Bot size={24} className="text-white" />
        )}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-90 max-w-[calc(100vw-1.5rem)] flex flex-col rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          style={{ height: '520px', background: 'var(--chat-bg, white)' }}
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
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
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
                    renderMarkdown(m.text)
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions (only first load) */}
          {messages.length === 1 && (
            <div className="px-3 py-2 bg-gray-50 dark:bg-gray-900 flex gap-2 overflow-x-auto shrink-0 border-t border-gray-100 dark:border-gray-800">
              {SUGGESTIONS.map((s) => (
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
              disabled={loading}
            />
            <button
              onClick={() => void send()}
              disabled={loading || !input.trim()}
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
  '¿Cómo están mis finanzas?',
  '¿Qué tareas tengo pendientes?',
  'Resumí mi establecimiento',
  '¿Cuándo sembrar soja?',
];

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
