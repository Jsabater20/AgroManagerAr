import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Users, Edit2, Trash2, X } from 'lucide-react';
import { api } from '../../api/client';
import { toast } from 'sonner';

interface Usuario {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
}

interface Campo {
  id: number;
  nombre: string;
}

interface Miembro {
  id: number;
  usuarioId: number;
  usuario: Usuario;
  roles: string[];
  activo: boolean;
  campos: Campo[];
  modulos: Array<{ moduloNombre: string; activo: boolean }>;
}

interface ModalState {
  tipo: 'campos' | 'modulos' | null;
  miembroId: number | null;
  miembro: Miembro | null;
}

const MODULOS_DISPONIBLES = [
  'Dashboard',
  'Campos',
  'Cultivos',
  'Siembras',
  'Insumos',
  'Ganadería',
  'Tareas',
  'Maquinarias',
  'Finanzas',
  'Reportes',
  'Clima',
];

export default function AdminMiembrosPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const [modal, setModal] = useState<ModalState>({
    tipo: null,
    miembroId: null,
    miembro: null,
  });
  const [camposTemp, setCamposTemp] = useState<number[]>([]);
  const [modulosTemp, setModulosTemp] = useState<Record<string, boolean>>({});

  const { data: miembros = [], refetch: refetchMiembros } = useQuery<Miembro[]>({
    queryKey: ['miembros-admin', orgId],
    queryFn: async () => {
      const res = await api.get(`/organizaciones/${orgId}/miembros`);
      return res.data;
    },
    enabled: !!orgId,
  });

  const { data: campos = [] } = useQuery<Campo[]>({
    queryKey: ['campos', orgId],
    queryFn: async () => {
      const res = await api.get(`/campos?organizacionId=${orgId}`);
      return res.data;
    },
    enabled: !!orgId,
  });

  useMutation({
    mutationFn: ({ miembroId, roles }: { miembroId: number; roles: string[] }) =>
      api.patch(`/organizaciones/${orgId}/miembros/${miembroId}`, { roles }),
    onSuccess: () => {
      toast.success('Roles actualizados');
      refetchMiembros();
      setModal({ tipo: null, miembroId: null, miembro: null });
    },
    onError: () => toast.error('Error al actualizar roles'),
  });

  const { mutate: asignarCampo } = useMutation({
    mutationFn: ({
      miembroId,
      campoId,
    }: {
      miembroId: number;
      campoId: number;
    }) => api.post(`/organizaciones/${orgId}/miembros/${miembroId}/campos`, { campoId }),
    onSuccess: () => {
      toast.success('Campo asignado');
      refetchMiembros();
    },
    onError: () => toast.error('Error al asignar campo'),
  });

  const { mutate: desasignarCampo } = useMutation({
    mutationFn: ({
      miembroId,
      campoId,
    }: {
      miembroId: number;
      campoId: number;
    }) =>
      api.delete(`/organizaciones/${orgId}/miembros/${miembroId}/campos/${campoId}`),
    onSuccess: () => {
      toast.success('Campo desasignado');
      refetchMiembros();
    },
    onError: () => toast.error('Error al desasignar campo'),
  });

  const { mutate: actualizarModulo } = useMutation({
    mutationFn: ({
      miembroId,
      moduloNombre,
      activo,
    }: {
      miembroId: number;
      moduloNombre: string;
      activo: boolean;
    }) =>
      api.patch(
        `/organizaciones/${orgId}/miembros/${miembroId}/modulos`,
        { moduloNombre, activo },
      ),
    onSuccess: () => {
      toast.success('Módulo actualizado');
      refetchMiembros();
    },
    onError: () => toast.error('Error al actualizar módulo'),
  });

  const { mutate: eliminarMiembro } = useMutation({
    mutationFn: (miembroId: number) =>
      api.delete(`/organizaciones/${orgId}/miembros/${miembroId}`),
    onSuccess: () => {
      toast.success('Miembro eliminado');
      refetchMiembros();
    },
    onError: () => toast.error('Error al eliminar miembro'),
  });

  const abrirModalCampos = (miembro: Miembro) => {
    setModal({ tipo: 'campos', miembroId: miembro.id, miembro });
    setCamposTemp(miembro.campos.map((c) => c.id));
  };

  const abrirModalModulos = (miembro: Miembro) => {
    setModal({ tipo: 'modulos', miembroId: miembro.id, miembro });
    const modulosMap: Record<string, boolean> = {};
    MODULOS_DISPONIBLES.forEach((mod) => {
      const found = miembro.modulos.find((m) => m.moduloNombre === mod);
      modulosMap[mod] = found?.activo ?? true;
    });
    setModulosTemp(modulosMap);
  };

  const guardarCampos = () => {
    if (!modal.miembroId || !modal.miembro) return;

    const camposActuales = modal.miembro.campos.map((c) => c.id);
    const camposAgregar = camposTemp.filter((c) => !camposActuales.includes(c));
    const camposQuitar = camposActuales.filter((c) => !camposTemp.includes(c));

    camposAgregar.forEach((campoId) => {
      asignarCampo({ miembroId: modal.miembroId!, campoId });
    });

    camposQuitar.forEach((campoId) => {
      desasignarCampo({ miembroId: modal.miembroId!, campoId });
    });

    setModal({ tipo: null, miembroId: null, miembro: null });
  };

  const guardarModulos = () => {
    if (!modal.miembroId || !modal.miembro) return;

    Object.entries(modulosTemp).forEach(([moduloNombre, activo]) => {
      const moduloActual = modal.miembro!.modulos.find(
        (m) => m.moduloNombre === moduloNombre,
      );
      if (!moduloActual || moduloActual.activo !== activo) {
        actualizarModulo({ miembroId: modal.miembroId!, moduloNombre, activo });
      }
    });

    setModal({ tipo: null, miembroId: null, miembro: null });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-2">
        <Users className="text-blue-500" size={24} />
        <h1 className="text-3xl font-bold">Administrar Miembros</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Roles
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Campos
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {miembros.map((miembro) => (
              <tr key={miembro.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className="font-medium">
                    {miembro.usuario.nombre} {miembro.usuario.apellido}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {miembro.usuario.email}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1 flex-wrap">
                    {miembro.roles.length === 0 ? (
                      <span className="text-xs text-gray-500">Sin roles</span>
                    ) : (
                      miembro.roles.map((rol) => (
                        <span
                          key={rol}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                        >
                          {rol}
                        </span>
                      ))
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  {miembro.campos.length === 0 ? (
                    <span className="text-gray-500">Sin campos</span>
                  ) : (
                    <div className="space-y-1">
                      {miembro.campos.map((c) => (
                        <div key={c.id} className="text-sm text-gray-700">
                          {c.nombre}
                        </div>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => abrirModalCampos(miembro)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                      title="Editar campos"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => abrirModalModulos(miembro)}
                      className="p-2 text-green-500 hover:bg-green-50 rounded transition-colors"
                      title="Configurar módulos"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => eliminarMiembro(miembro.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="Eliminar miembro"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal.tipo === 'campos' && modal.miembro && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Campos para {modal.miembro.usuario.nombre}
              </h2>
              <button
                onClick={() => setModal({ tipo: null, miembroId: null, miembro: null })}
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {campos.map((campo) => (
                <label key={campo.id} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={camposTemp.includes(campo.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCamposTemp([...camposTemp, campo.id]);
                      } else {
                        setCamposTemp(camposTemp.filter((c) => c !== campo.id));
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <span>{campo.nombre}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <button
                onClick={guardarCampos}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Guardar
              </button>
              <button
                onClick={() => setModal({ tipo: null, miembroId: null, miembro: null })}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {modal.tipo === 'modulos' && modal.miembro && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Módulos para {modal.miembro.usuario.nombre}
              </h2>
              <button
                onClick={() => setModal({ tipo: null, miembroId: null, miembro: null })}
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {MODULOS_DISPONIBLES.map((modulo) => (
                <label key={modulo} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={modulosTemp[modulo] ?? true}
                    onChange={(e) => {
                      setModulosTemp({
                        ...modulosTemp,
                        [modulo]: e.target.checked,
                      });
                    }}
                    className="w-4 h-4"
                  />
                  <span>{modulo}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <button
                onClick={guardarModulos}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Guardar
              </button>
              <button
                onClick={() => setModal({ tipo: null, miembroId: null, miembro: null })}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}