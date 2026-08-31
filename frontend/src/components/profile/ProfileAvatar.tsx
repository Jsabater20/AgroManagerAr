type ProfileAvatarProps = {
  nombre?: string | null;
  apellido?: string | null;
  fotoUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const TAMANOS = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-24 w-24 text-2xl',
};

export function ProfileAvatar({ nombre, apellido, fotoUrl, size = 'md', className = '' }: ProfileAvatarProps) {
  const iniciales = `${nombre?.[0] ?? ''}${apellido?.[0] ?? ''}`.toUpperCase() || '?';
  if (fotoUrl) {
    return <img src={fotoUrl} alt={`Foto de ${nombre ?? 'usuario'}`} className={`${TAMANOS[size]} shrink-0 rounded-full border-2 border-white/70 object-cover shadow-sm ${className}`} />;
  }
  return <div className={`${TAMANOS[size]} flex shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white shadow-sm ${className}`}>{iniciales}</div>;
}
