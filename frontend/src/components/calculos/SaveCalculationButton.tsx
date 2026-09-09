import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookmarkPlus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { calculosApi, type GuardarCalculoPayload } from '../../api/calculos.api';

export function SaveCalculationButton({ payload }: { payload: GuardarCalculoPayload }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => calculosApi.guardar(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calculos', 'historial'] });
      toast.success('Cálculo guardado en el historial.');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'No se pudo guardar el cálculo.');
    },
  });

  return <button type="button" onClick={() => mutation.mutate()} disabled={mutation.isPending} className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60">{mutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <BookmarkPlus size={16} />}Guardar cálculo</button>;
}
