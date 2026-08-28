import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { crearCultivo } from '@/api/cultivos.api';
import { getApiErrorMessage } from '@/api/errors';

export default function NuevoCultivoScreen() {
  const queryClient = useQueryClient();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const mutation = useMutation({
    mutationFn: () => crearCultivo({ nombre: nombre.trim(), descripcion: descripcion.trim() || undefined }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cultivos'] });
      Alert.alert('Cultivo creado', 'Ya está disponible para registrar nuevas siembras.');
      router.back();
    },
    onError: (error: unknown) => Alert.alert('No pudimos crear el cultivo', getApiErrorMessage(error, 'Revisá los datos e intentá nuevamente.')),
  });

  return <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 36 }}><Pressable onPress={() => router.back()}><Text className="text-sm font-semibold text-emerald-800">‹ Producción</Text></Pressable><Text className="mt-5 text-3xl font-bold text-slate-900">Nuevo cultivo</Text><Text className="mt-2 text-base text-slate-600">Agregá un tipo de cultivo al catálogo de la organización.</Text><View className="mt-7 rounded-2xl bg-white p-5"><Label text="Nombre"><Input value={nombre} onChangeText={setNombre} placeholder="Ej: Soja, maíz o trigo" autoFocus /></Label><Label text="Descripción"><TextInput value={descripcion} onChangeText={setDescripcion} multiline textAlignVertical="top" placeholder="Opcional" placeholderTextColor="#94a3b8" className="mt-2 min-h-24 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900" /></Label><Pressable className="mt-7 items-center rounded-xl bg-emerald-700 px-5 py-4 disabled:opacity-50" disabled={nombre.trim().length < 2 || mutation.isPending} onPress={() => mutation.mutate()}><Text className="font-semibold text-white">{mutation.isPending ? 'Creando…' : 'Crear cultivo'}</Text></Pressable></View></ScrollView>;
}

function Input(props: React.ComponentProps<typeof TextInput>) { return <TextInput {...props} placeholderTextColor="#94a3b8" className="mt-2 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900" />; }
function Label({ text, children }: { text: string; children: React.ReactNode }) { return <View className="mt-5"><Text className="text-sm font-semibold text-slate-800">{text}</Text>{children}</View>; }
