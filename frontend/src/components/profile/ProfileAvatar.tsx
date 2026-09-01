import { useState } from 'react';
import { X } from 'lucide-react';

export type FotoPerfilEncuadre = {
  posicionX: number;
  posicionY: number;
  escala: number;
};

type ProfileAvatarProps = {
  nombre?: string | null;
  apellido?: string | null;
  fotoUrl?: string | null;
  encuadre?: FotoPerfilEncuadre | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  mostrarVista?: boolean;
};

const TAMANOS = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-24 w-24 text-2xl',
};

const ENCUADRE_POR_DEFECTO: FotoPerfilEncuadre = {
  posicionX: 50,
  posicionY: 50,
  escala: 1,
};

export function ProfileAvatar({
  nombre,
  apellido,
  fotoUrl,
  encuadre,
  size = 'md',
  className = '',
  mostrarVista = true,
}: ProfileAvatarProps) {
  const [vistaAbierta, setVistaAbierta] = useState(false);
  const iniciales = `${nombre?.[0] ?? ''}${apellido?.[0] ?? ''}`.toUpperCase() || '?';
  const nombreCompleto = [nombre, apellido].filter(Boolean).join(' ') || 'usuario';
  const fotoEncuadrada = encuadre ?? ENCUADRE_POR_DEFECTO;

  if (!fotoUrl) {
    return (
      <div className={`${TAMANOS[size]} flex shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white shadow-sm ${className}`}>
        {iniciales}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => mostrarVista && setVistaAbierta(true)}
        className={`${TAMANOS[size]} relative shrink-0 overflow-hidden rounded-full border-2 border-white/70 bg-emerald-900 shadow-sm ${mostrarVista ? 'cursor-zoom-in' : 'cursor-default'} ${className}`}
        title={mostrarVista ? `Ver foto de ${nombreCompleto}` : undefined}
        aria-label={mostrarVista ? `Ver foto de ${nombreCompleto}` : undefined}
      >
        <img
          src={fotoUrl}
          alt={`Foto de ${nombreCompleto}`}
          className="h-full w-full object-cover"
          style={{
            objectPosition: `${fotoEncuadrada.posicionX}% ${fotoEncuadrada.posicionY}%`,
            transform: `scale(${fotoEncuadrada.escala})`,
          }}
        />
      </button>

      {vistaAbierta && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Foto de ${nombreCompleto}`}
          onClick={() => setVistaAbierta(false)}
        >
          <div className="relative max-h-full max-w-3xl" onClick={(event) => event.stopPropagation()}>
            <img
              src={fotoUrl}
              alt={`Foto de ${nombreCompleto}`}
              className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <p className="mt-3 text-center text-sm font-medium text-white">{nombreCompleto}</p>
            <button
              type="button"
              onClick={() => setVistaAbierta(false)}
              className="absolute -right-2 -top-2 rounded-full bg-white p-2 text-gray-800 shadow-lg hover:bg-gray-100"
              aria-label="Cerrar foto"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
