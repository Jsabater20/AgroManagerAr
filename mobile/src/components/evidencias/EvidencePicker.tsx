import { useCallback, useState } from 'react';
import { Alert, Image, Pressable, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { File } from 'expo-file-system';
import type { LocalEvidenceFile } from '@/types/evidencias';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

interface EvidencePickerProps {
  value: LocalEvidenceFile[];
  onChange: (files: LocalEvidenceFile[]) => void;
  disabled?: boolean;
  maxPhotos?: number;
}

const createLocalId = () =>
  `evidencia-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

async function prepararImagen(
  asset: ImagePicker.ImagePickerAsset,
): Promise<LocalEvidenceFile> {
  const largestSide = Math.max(asset.width, asset.height);
  const scale = largestSide > 1920 ? 1920 / largestSide : 1;
  const result = await ImageManipulator.manipulateAsync(
    asset.uri,
    scale < 1
      ? [{ resize: { width: Math.max(1, Math.round(asset.width * scale)) } }]
      : [],
    { compress: 0.72, format: ImageManipulator.SaveFormat.JPEG },
  );
  const file = new File(result.uri);
  const tamanoBytes = Number(file.size ?? 0);

  if (!tamanoBytes || tamanoBytes > MAX_FILE_SIZE) {
    throw new Error('La foto sigue siendo demasiado pesada. Probá con otra imagen.');
  }

  return {
    id: createLocalId(),
    uri: result.uri,
    nombre: `evidencia-${Date.now()}.jpg`,
    mimeType: 'image/jpeg',
    tamanoBytes,
    ancho: result.width,
    alto: result.height,
  };
}

export function EvidencePicker({
  value,
  onChange,
  disabled = false,
  maxPhotos = 5,
}: EvidencePickerProps) {
  const [isPreparing, setIsPreparing] = useState(false);
  const remainingPhotos = Math.max(0, maxPhotos - value.length);

  const addAssets = useCallback(
    async (assets: ImagePicker.ImagePickerAsset[]) => {
      if (remainingPhotos === 0) {
        Alert.alert('Límite alcanzado', `Podés adjuntar hasta ${maxPhotos} fotos.`);
        return;
      }

      setIsPreparing(true);
      try {
        const images = await Promise.all(
          assets.slice(0, remainingPhotos).map((asset) => prepararImagen(asset)),
        );
        onChange([...value, ...images]);
      } catch (error) {
        Alert.alert(
          'No pudimos preparar la foto',
          error instanceof Error ? error.message : 'Intentá nuevamente.',
        );
      } finally {
        setIsPreparing(false);
      }
    },
    [maxPhotos, onChange, remainingPhotos, value],
  );

  const tomarFoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso de cámara requerido', 'Permití la cámara para adjuntar evidencia.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 1,
    });
    if (!result.canceled) {
      await addAssets(result.assets);
    }
  };

  const elegirGaleria = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso de galería requerido', 'Permití el acceso a tus fotos para adjuntar evidencia.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: remainingPhotos,
      quality: 1,
    });
    if (!result.canceled) {
      await addAssets(result.assets);
    }
  };

  const quitarFoto = (fileId: string) => {
    onChange(value.filter((file) => file.id !== fileId));
  };

  return (
    <View className="mt-4">
      <Text className="text-sm font-semibold text-slate-700">Adjuntar evidencia</Text>
      <Text className="mt-1 text-xs text-slate-500">
        Hasta {maxPhotos} fotos. Se reducen antes de subirlas.
      </Text>

      {value.length > 0 ? (
        <View className="mt-3 flex-row flex-wrap gap-3">
          {value.map((file) => (
            <View key={file.id} className="h-24 w-24 overflow-hidden rounded-xl bg-slate-200">
              <Image className="h-full w-full" resizeMode="cover" source={{ uri: file.uri }} />
              <Pressable
                accessibilityLabel="Quitar foto"
                className="absolute right-1 top-1 h-6 w-6 items-center justify-center rounded-full bg-slate-900/80"
                disabled={disabled || isPreparing}
                onPress={() => quitarFoto(file.id)}
              >
                <Text className="text-base font-bold text-white">×</Text>
              </Pressable>
            </View>
          ))}
        </View>
      ) : null}

      <View className="mt-3 flex-row gap-3">
        <Pressable
          className="flex-1 items-center rounded-xl border border-emerald-700 bg-emerald-50 px-3 py-3 disabled:opacity-50"
          disabled={disabled || isPreparing || remainingPhotos === 0}
          onPress={() => void tomarFoto()}
        >
          <Text className="font-semibold text-emerald-700">
            {isPreparing ? 'Preparando...' : 'Sacar foto'}
          </Text>
        </Pressable>
        <Pressable
          className="flex-1 items-center rounded-xl border border-slate-300 bg-white px-3 py-3 disabled:opacity-50"
          disabled={disabled || isPreparing || remainingPhotos === 0}
          onPress={() => void elegirGaleria()}
        >
          <Text className="font-semibold text-slate-700">Elegir galería</Text>
        </Pressable>
      </View>
    </View>
  );
}
