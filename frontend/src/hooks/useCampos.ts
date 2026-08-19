import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { camposApi } from '../api/campos.api';
import { usePermissions } from './usePermissions';

export const useCampos = () => {
  const queryClient = useQueryClient();
  const { usuarioOrganizacionId, organizacionId } = usePermissions();

  const { data: campos, isLoading, error } = useQuery({
    queryKey: ['campos', organizacionId, usuarioOrganizacionId],
    queryFn: () => camposApi.getAll({ usuarioOrganizacionId }),
    enabled: !!organizacionId,
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) => camposApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campos', organizacionId, usuarioOrganizacionId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) => camposApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campos', organizacionId, usuarioOrganizacionId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => camposApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campos', organizacionId, usuarioOrganizacionId] });
    },
  });

  const addLoteMutation = useMutation({
    mutationFn: ({ campoId, payload }: { campoId: number; payload: any }) => camposApi.addLote(campoId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campos', organizacionId, usuarioOrganizacionId] });
    },
  });

  return {
    campos: campos || [],
    isLoading,
    error,
    createMutation,
    updateMutation,
    deleteMutation,
    addLoteMutation,
  };
};