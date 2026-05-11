import { useState, useRef, useEffect } from 'react';
import { Bell, AlertTriangle, Clock, PawPrint, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ganadoApi } from '../../api/ganado.api';
import { tareasApi } from '../../api/tareas.api';

interface Alerta {
  id: string;
  tipo: 'vencida' | 'prenez' | 'tarea_hoy';
  titulo: string;
  sub: string;
  link: string;
  icon: typeof Bell;
  color: string;
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { data: animales } = useQuery({ queryKey: ['ganado'],  queryFn: ganadoApi.getAll });
  const { data: tareas }   = useQuery({ queryKey: ['tareas'],  queryFn: tareasApi.getAll });

  // Cerrar al click afuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const alertas: Alerta[] = [];
  const today = new Date(); today.setHours(0, 0, 0, 0);

  // Tareas vencidas
  const vencidas = (tareas ?? []).filter(t => {
    if (t.estado === 'COMPLETADA' || t.estado === 'CANCELADA') return false;
    return new Date(t.fechaProgramada) < today;
  });
  if (vencidas.length > 0) {
    alertas.push({
      id: 'tareas-vencidas',
      tipo: 'vencida',
      titulo: `${vencidas.length} tarea${vencidas.length > 1 ? 's' : ''} vencida${vencidas.length > 1 ? 's' : ''}`,
      sub: vencidas.slice(0, 2).map(t => t.titulo).join(', ') + (vencidas.length > 2 ? '...' : ''),
      link: '/tareas',
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-50',
    });
  }

  // Tareas para hoy
  const paraHoy = (tareas ?? []).filter(t => {
    if (t.estado === 'COMPLETADA' || t.estado === 'CANCELADA') return false;
    const d = new Date(t.fechaProgramada); d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });
  if (paraHoy.length > 0) {
    alertas.push({
      id: 'tareas-hoy',
      tipo: 'tarea_hoy',
      titulo: `${paraHoy.length} tarea${paraHoy.length > 1 ? 's' : ''} para hoy`,
      sub: paraHoy.slice(0, 2).map(t => t.titulo).join(', ') + (paraHoy.length > 2 ? '...' : ''),
      link: '/tareas',
      icon: Clock,
      color: 'text-orange-600 bg-orange-50',
    });
  }

  // Preñeces próximas (≤ 14 días)
  const prenecesProximas = (animales ?? []).flatMap(a =>
    a.preneces
      .filter(p => p.estado === 'EN_CURSO')
      .map(p => {
        const parto = new Date(p.fechaEstimadaParto); parto.setHours(0, 0, 0, 0);
        const diff  = Math.ceil((parto.getTime() - today.getTime()) / 86400000);
        return { animal: a.nombre, diff };
      })
      .filter(p => p.diff >= 0 && p.diff <= 14)
  );
  if (prenecesProximas.length > 0) {
    const closest = prenecesProximas.sort((a, b) => a.diff - b.diff);
    alertas.push({
      id: 'preneces',
      tipo: 'prenez',
      titulo: `${closest.length} preñez${closest.length > 1 ? 'ces' : ''} próxima${closest.length > 1 ? 's' : ''} a parir`,
      sub: closest.slice(0, 2).map(p => `${p.animal} (${p.diff === 0 ? 'hoy' : `en ${p.diff}d`})`).join(', '),
      link: '/ganado',
      icon: PawPrint,
      color: 'text-pink-600 bg-pink-50',
    });
  }

  const count = alertas.length;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
      >
        <Bell size={20} />
        {count > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <p className="font-semibold text-gray-900 text-sm">Notificaciones</p>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X size={15} />
            </button>
          </div>

          {/* Alertas */}
          {alertas.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-400">
              <Bell size={28} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">Todo en orden, sin alertas</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
              {alertas.map(a => {
                const Icon = a.icon;
                return (
                  <Link
                    key={a.id}
                    to={a.link}
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors"
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${a.color}`}>
                      <Icon size={15} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{a.titulo}</p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{a.sub}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
