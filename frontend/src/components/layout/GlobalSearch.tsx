import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, Map, PawPrint, ClipboardList, X, ArrowRight } from 'lucide-react';
import { camposApi } from '../../api/campos.api';
import { ganadoApi } from '../../api/ganado.api';
import { tareasApi } from '../../api/tareas.api';

interface Result {
  id: number;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  href: string;
}

export function useGlobalSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return { open, setOpen };
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { data: campos = [] }  = useQuery({ queryKey: ['campos'],  queryFn: camposApi.getAll,  enabled: open });
  const { data: animales = [] } = useQuery({ queryKey: ['ganado'],  queryFn: ganadoApi.getAll,  enabled: open });
  const { data: tareas = [] }   = useQuery({ queryKey: ['tareas'],  queryFn: tareasApi.getAll,  enabled: open });

  useEffect(() => {
    if (open) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  const q = query.toLowerCase().trim();

  const results: Result[] = q.length < 1 ? [] : [
    ...campos
      .filter((c) => c.nombre.toLowerCase().includes(q) || c.ubicacion?.toLowerCase().includes(q))
      .slice(0, 3)
      .map((c) => ({
        id: c.id,
        label: c.nombre,
        sublabel: c.ubicacion ?? 'Campo',
        icon: <Map size={15} className="text-blue-500" />,
        href: `/campos/${c.id}`,
      })),
    ...animales
      .filter((a) => a.nombre.toLowerCase().includes(q))
      .slice(0, 3)
      .map((a) => ({
        id: a.id,
        label: a.nombre,
        sublabel: `${a.especie} · ${a.categoria}`,
        icon: <PawPrint size={15} className="text-amber-500" />,
        href: `/ganado`,
      })),
    ...tareas
      .filter((t) => t.titulo.toLowerCase().includes(q))
      .slice(0, 3)
      .map((t) => ({
        id: t.id,
        label: t.titulo,
        sublabel: t.tipo,
        icon: <ClipboardList size={15} className="text-green-500" />,
        href: `/tareas`,
      })),
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => { setActiveIdx(0); }, [query]);

  const go = useCallback(
    (href: string) => {
      navigate(href);
      onClose();
    },
    [navigate, onClose],
  );

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && results[activeIdx]) go(results[activeIdx].href);
    if (e.key === 'Escape') onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 dark:border-gray-700">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Buscar campos, animales, tareas..."
            className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          )}
          <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-600">
            ESC
          </kbd>
        </div>

        {/* Results */}
        {q.length > 0 && (
          <div className="max-h-72 overflow-y-auto py-2">
            {results.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-8">Sin resultados para "{query}"</p>
            ) : (
              results.map((r, i) => (
                <button
                  key={`${r.href}-${r.id}`}
                  onClick={() => go(r.href)}
                  onMouseEnter={() => setActiveIdx(i)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    i === activeIdx
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                    {r.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{r.label}</p>
                    {r.sublabel && <p className="text-xs text-gray-400 truncate">{r.sublabel}</p>}
                  </div>
                  {i === activeIdx && <ArrowRight size={14} className="text-green-600 shrink-0" />}
                </button>
              ))
            )}
          </div>
        )}

        {/* Hint */}
        {q.length === 0 && (
          <div className="py-8 text-center text-sm text-gray-400">
            Escribí para buscar en campos, ganadería y tareas
          </div>
        )}

        <div className="flex items-center gap-4 px-4 py-2 border-t border-gray-100 dark:border-gray-700 text-[11px] text-gray-400">
          <span><kbd className="bg-gray-100 dark:bg-gray-800 px-1 rounded">↑↓</kbd> navegar</span>
          <span><kbd className="bg-gray-100 dark:bg-gray-800 px-1 rounded">↵</kbd> ir</span>
          <span><kbd className="bg-gray-100 dark:bg-gray-800 px-1 rounded">Esc</kbd> cerrar</span>
        </div>
      </div>
    </div>
  );
}
