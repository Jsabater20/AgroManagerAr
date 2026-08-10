import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ownerAdminApi } from '../../api/owner-admin.api';
import toast from 'react-hot-toast';
import './OwnerPanel.css';

const ROLES = ['OWNER', 'ADMINISTRADOR', 'OPERARIO', 'CONTADOR', 'MECANICO', 'MIEMBRO'];

export function OwnerPanelPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const orgIdNum = orgId ? parseInt(orgId) : 0;

  const [expandedMemberId, setExpandedMemberId] = useState<number | null>(null);
  const [showResourcePanel, setShowResourcePanel] = useState<number | null>(null);

  // Queries
  const miembrosQuery = useQuery({
    queryKey: ['miembros-panel', orgIdNum],
    queryFn: () => ownerAdminApi.obtenerMiembrosPanel(orgIdNum),
    enabled: orgIdNum > 0,
  });

  const recursosQuery = useQuery({
    queryKey: ['recursos-panel', orgIdNum, showResourcePanel],
    queryFn: () =>
      showResourcePanel
        ? ownerAdminApi.obtenerRecursosAsignables(orgIdNum, showResourcePanel)
        : Promise.resolve([]),
    enabled: orgIdNum > 0 && showResourcePanel !== null,
  });

  // Mutations
  const cambiarRolMutation = useMutation({
    mutationFn: (params: {
      usuarioOrgId: number;
      nuevoRol: string;
    }) =>
      ownerAdminApi.cambiarRolMiembro(orgIdNum, params.usuarioOrgId, params.nuevoRol),
    onSuccess: () => {
      miembrosQuery.refetch();
      toast.success('Rol actualizado');
    },
    onError: () => toast.error('Error al cambiar rol'),
  });

  const suspenderMutation = useMutation({
    mutationFn: (usuarioOrgId: number) =>
      ownerAdminApi.suspenderMiembro(orgIdNum, usuarioOrgId),
    onSuccess: () => {
      miembrosQuery.refetch();
      toast.success('Miembro suspendido');
    },
    onError: () => toast.error('Error al suspender'),
  });

  const activarMutation = useMutation({
    mutationFn: (usuarioOrgId: number) =>
      ownerAdminApi.activarMiembro(orgIdNum, usuarioOrgId),
    onSuccess: () => {
      miembrosQuery.refetch();
      toast.success('Miembro activado');
    },
    onError: () => toast.error('Error al activar'),
  });

  const quitarMutation = useMutation({
    mutationFn: (usuarioOrgId: number) =>
      ownerAdminApi.quitarMiembro(orgIdNum, usuarioOrgId),
    onSuccess: () => {
      miembrosQuery.refetch();
      toast.success('Miembro removido');
    },
    onError: () => toast.error('Error al remover miembro'),
  });

  const asignarRecursoMutation = useMutation({
    mutationFn: (params: {
      usuarioOrgId: number;
      recursoId: number;
    }) =>
      ownerAdminApi.asignarRecurso(
        orgIdNum,
        params.usuarioOrgId,
        'CAMPO',
        params.recursoId,
      ),
    onSuccess: () => {
      recursosQuery.refetch();
      toast.success('Recurso asignado');
    },
    onError: () => toast.error('Error al asignar recurso'),
  });

  const retirarRecursoMutation = useMutation({
    mutationFn: (params: {
      usuarioOrgId: number;
      recursoId: number;
    }) =>
      ownerAdminApi.retirarRecurso(
        orgIdNum,
        params.usuarioOrgId,
        'CAMPO',
        params.recursoId,
      ),
    onSuccess: () => {
      recursosQuery.refetch();
      toast.success('Recurso retirado');
    },
    onError: () => toast.error('Error al retirar recurso'),
  });

  if (miembrosQuery.isLoading) {
    return <div className="owner-panel">Cargando...</div>;
  }

  const miembros = miembrosQuery.data || [];

  return (
    <div className="owner-panel">
      <h1>Panel de Administración</h1>

      {/* ÁREA A - MIEMBROS */}
      <section className="panel-section">
        <h2>Gestión de Miembros</h2>
        <div className="members-grid">
          {miembros.map((miembro) => (
            <div key={miembro.id} className="member-card">
              {/* Encabezado del miembro */}
              <div className="member-header">
                <div className="member-info">
                  <h3>
                    {miembro.nombre} {miembro.apellido}
                  </h3>
                  <p className="email">{miembro.email}</p>
                  <div className="badges">
                    <span className={`badge role ${miembro.rol.toLowerCase()}`}>
                      {miembro.rol}
                    </span>
                    <span className={`badge status ${miembro.activo ? 'active' : 'inactive'}`}>
                      {miembro.activo ? 'Activo' : 'Suspendido'}
                    </span>
                  </div>
                </div>
                <button
                  className="expand-btn"
                  onClick={() =>
                    setExpandedMemberId(
                      expandedMemberId === miembro.id ? null : miembro.id,
                    )
                  }
                >
                  {expandedMemberId === miembro.id ? '−' : '+'}
                </button>
              </div>

              {/* Detalles del miembro */}
              {expandedMemberId === miembro.id && (
                <div className="member-details">
                  {/* Información de incorporación y actividades */}
                  <div className="info-row">
                    <span>Incorporado:</span>
                    <span>
                      {new Date(miembro.fechaIncorporacion).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="activities-summary">
                    <div className="activity-badge">
                      <span className="count">{miembro.actividades.pendientes}</span>
                      <span className="label">Pendientes</span>
                    </div>
                    <div className="activity-badge">
                      <span className="count">{miembro.actividades.enProgreso}</span>
                      <span className="label">En Progreso</span>
                    </div>
                    <div className="activity-badge">
                      <span className="count">{miembro.actividades.completadas}</span>
                      <span className="label">Completadas</span>
                    </div>
                  </div>

                  {/* Campos asignados */}
                  {miembro.recursosCampos.length > 0 && (
                    <div className="info-row">
                      <span>Campos:</span>
                      <div className="tags">
                        {miembro.recursosCampos.map((campo) => (
                          <span key={campo} className="tag">
                            {campo}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Selector de rol */}
                  <div className="action-row">
                    <label>Cambiar rol:</label>
                    <select
                      value={miembro.rol}
                      onChange={(e) =>
                        cambiarRolMutation.mutate({
                          usuarioOrgId: miembro.id,
                          nuevoRol: e.target.value,
                        })
                      }
                      disabled={cambiarRolMutation.isPending}
                    >
                      {ROLES.map((rol) => (
                        <option key={rol} value={rol}>
                          {rol}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Botones de acciones */}
                  <div className="actions">
                    {miembro.activo ? (
                      <button
                        className="btn btn-danger"
                        onClick={() => suspenderMutation.mutate(miembro.id)}
                        disabled={suspenderMutation.isPending}
                      >
                        Suspender
                      </button>
                    ) : (
                      <button
                        className="btn btn-success"
                        onClick={() => activarMutation.mutate(miembro.id)}
                        disabled={activarMutation.isPending}
                      >
                        Activar
                      </button>
                    )}

                    <button
                      className="btn btn-info"
                      onClick={() => setShowResourcePanel(miembro.id)}
                    >
                      Asignar Recursos
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => quitarMutation.mutate(miembro.id)}
                      disabled={quitarMutation.isPending}
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ÁREA B - ASIGNACIONES DE RECURSOS */}
      {showResourcePanel !== null && (
        <section className="panel-section resources-section">
          <div className="section-header">
            <h2>Asignación de Recursos</h2>
            <button
              className="btn btn-close"
              onClick={() => setShowResourcePanel(null)}
            >
              ✕
            </button>
          </div>

          {recursosQuery.isLoading ? (
            <p>Cargando recursos...</p>
          ) : (
            <div className="resources-grid">
              {recursosQuery.data?.map((recurso) => (
                <div key={`${recurso.tipo}-${recurso.id}`} className="resource-item">
                  <div className="resource-name">{recurso.nombre}</div>
                  <div className="resource-type">{recurso.tipo}</div>

                  {recurso.asignado ? (
                    <button
                      className="toggle-btn active"
                      onClick={() =>
                        retirarRecursoMutation.mutate({
                          usuarioOrgId: showResourcePanel,
                          recursoId: recurso.id,
                        })
                      }
                      disabled={retirarRecursoMutation.isPending}
                    >
                      ✓ Asignado
                    </button>
                  ) : (
                    <button
                      className="toggle-btn"
                      onClick={() =>
                        asignarRecursoMutation.mutate({
                          usuarioOrgId: showResourcePanel,
                          recursoId: recurso.id,
                        })
                      }
                      disabled={asignarRecursoMutation.isPending}
                    >
                      + Asignar
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}