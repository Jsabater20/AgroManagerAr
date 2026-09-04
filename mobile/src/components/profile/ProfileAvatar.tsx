import { Image, Text, View } from 'react-native';

interface ProfileAvatarProps {
  nombre?: string | null;
  apellido?: string | null;
  fotoUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
  lg: 'h-24 w-24',
};

const textClasses = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-3xl',
};

const initials = (nombre?: string | null, apellido?: string | null) =>
  `${nombre?.trim().charAt(0) ?? ''}${apellido?.trim().charAt(0) ?? ''}`.toUpperCase() || 'U';

export function ProfileAvatar({
  nombre,
  apellido,
  fotoUrl,
  size = 'md',
}: ProfileAvatarProps) {
  const avatarClass = `${sizeClasses[size]} items-center justify-center overflow-hidden rounded-full bg-emerald-100`;

  if (fotoUrl) {
    return (
      <Image
        accessibilityLabel={`Foto de perfil de ${nombre ?? 'usuario'}`}
        className={`${sizeClasses[size]} rounded-full bg-emerald-100`}
        source={{ uri: fotoUrl }}
      />
    );
  }

  return (
    <View className={avatarClass}>
      <Text className={`font-bold text-emerald-800 ${textClasses[size]}`}>
        {initials(nombre, apellido)}
      </Text>
    </View>
  );
}
