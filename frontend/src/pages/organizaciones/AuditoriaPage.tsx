import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Filter, Download } from 'lucide-react';
import { api } from '../../api/client';

interface AuditLog {
  id: number;
  usuarioId: number;
  usuario: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
  organizacionId: number;
  accion: string;
  entidad: string;
  entidadId: number;
  cambios: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

const auditoriaApi = {
  obtenerAuditoria: (organizacionId: number, limite = 100, offset = 0) =>
    api.get(`/auditoria/organizaciones/${organizacionId}`, {
      params: { limite, offset },
    }),
};

export default function AuditoriaPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const [filtroAccion, setFiltroAccion] = useState('');
  const [filtroUsuario, setFiltroUsuario] = useState('');
  const [pagina, setPagina] = useState(1);
  const LIMITE = 20;

  const { data, isLoading, error } = useQuery({
    queryKey: ['auditoria', orgId, pagina],
    queryFn: () =>
      auditoriaApi.obtenerAuditoria(
        parseInt(orgId!),
        LIMITE,
        (pagina - 1) * LIMITE,
      ),
    enabled: !!orgId,
    staleTime: 0,
  });

  const registros = data?.data?.registros || [];
  const total = data?.data?.total || 0;
  const totalPaginas = Math.ceil(total / LIMITE);

  const registrosFiltrados = registros.filter((log: AuditLog) => {
    const coincideAccion =
      !filtroAccion ||
      log.accion.toLowerCase().includes(filtroAccion.toLowerCase());
    const coincideUsuario =
      !filtroUsuario ||
      log.usuario.email.toLowerCase().includes(filtroUsuario.toLowerCase());
    return coincideAccion && coincideUsuario;
  });

  const accionesUnicas = [...new Set(registros.map((r: AuditLog) => r.accion))] as string[];

  const exportarCSV = () => {
    const headers = ['Fecha', 'Usuario', 'Acción', 'Entidad', 'IP', 'Cambios'];
    const rows = registrosFiltrados.map((log: AuditLog) => [
      format(new Date(log.createdAt), 'dd/MM/yyyy HH:mm:ss'),
      log.usuario.email,
      log.accion,
      log.entidad,
      log.ipAddress || '-',
      log.cambios ? JSON.stringify(JSON.parse(log.cambios)) : '-',
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `auditoria_${format(new Date(), 'yyyyMMdd_HHmmss')}.csv`;
    a.click();
  };

  if (isLoading) {
    return <div className="p-6 text-center">Cargando auditoría...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error al cargar auditoría</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Auditoría de Organización</h1>
        <button
          onClick={exportarCSV}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Download size={18} />
          Exportar CSV
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <Filter size={18} />
          <span className="font-semibold">Filtros</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Acción</label>
            <select
              value={filtroAccion}
              onChange={(e) => setFiltroAccion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Todas las acciones</option>
              {accionesUnicas.map((accion: string) => (
                <option key={accion} value={accion}>
                  {accion}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Usuario</label>
            <input
              type="text"
              placeholder="Buscar por email..."
              value={filtroUsuario}
              onChange={(e) => setFiltroUsuario(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Fecha</th>
              <th className="px-4 py-3 text-left font-semibold">Usuario</th>
              <th className="px-4 py-3 text-left font-semibold">Acción</th>
              <th className="px-4 py-3 text-left font-semibold">Entidad</th>
              <th className="px-4 py-3 text-left font-semibold">IP</th>
              <th className="px-4 py-3 text-left font-semibold">Cambios</th>
            </tr>
          </thead>
          <tbody>
            {registrosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                  No hay registros
                </td>
              </tr>
            ) : (
              registrosFiltrados.map((log: AuditLog) => (
                <tr key={log.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs">
                    {format(new Date(log.createdAt), 'dd/MM/yyyy HH:mm:ss')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs font-medium">{log.usuario.nombre}</div>
                    <div className="text-xs text-gray-500">{log.usuario.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {log.accion}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">{log.entidad}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {log.ipAddress || '-'}
                  </td>
                  <td className="px-4 py-3 text-xs max-w-xs truncate">
                    {log.cambios ? (
                      <button
                        onClick={() =>
                          alert(JSON.stringify(JSON.parse(log.cambios!), null, 2))
                        }
                        className="text-blue-500 hover:underline"
                      >
                        Ver cambios
                      </button>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => setPagina(Math.max(1, pagina - 1))}
          disabled={pagina === 1}
          className="px-3 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span className="text-sm">
          Página {pagina} de {totalPaginas} ({total} total)
        </span>
        <button
          onClick={() => setPagina(Math.min(totalPaginas, pagina + 1))}
          disabled={pagina === totalPaginas}
          className="px-3 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
