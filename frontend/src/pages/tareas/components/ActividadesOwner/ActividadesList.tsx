import { useState } from 'react';
import { useActividades } from '../../../../hooks/useActividades';
import { EditActividadModal } from './modals/EditActividadModal';
import { ReasignarModal } from './modals/ReasignarModal';
import { CambiarEstadoModal } from './modals/CambiarEstadoModal';
import { ProlongarFechaModal } from './modals/ProlongarFechaModal';
import { ObservacionesModal } from './modals/ObservacionesModal';
import './ActividadesList.css';

interface ActividadesListProps {
  actividades: any[];
  organizacionId: number;
}

export const ActividadesList = ({ actividades, organizacionId }: ActividadesListProps) => {
  const [selectedActividad, setSelectedActividad] = useState<any | null>(null);
  const [modalType, setModalType] = useState<
    'edit' | 'reasignar' | 'estado' | 'prolongar' | 'observaciones' | null
  >(null);
  const [confirmArchive, setConfirmArchive] = useState<number | null>(null);
  const { archivarMutation } = useActividades(organizacionId);

  if (!actividades || actividades.length === 0) {
    return (
      <div className="actividades-list-empty">
        <p>No hay actividades para mostrar</p>
      </div>
    );
  }

  const handleEdit = (actividad: any) => {
    setSelectedActividad(actividad);
    setModalType('edit');
  };

  const handleReasignar = (actividad: any) => {
    setSelectedActividad(actividad);
    setModalType('reasignar');
  };

  const handleCambiarEstado = (actividad: any) => {
    setSelectedActividad(actividad);
    setModalType('estado');
  };

  const handleProlongar = (actividad: any) => {
    setSelectedActividad(actividad);
    setModalType('prolongar');
  };

  const handleVerObservaciones = (actividad: any) => {
    setSelectedActividad(actividad);
    setModalType('observaciones');
  };

  const handleArchive = async (actividadId: number) => {
    try {
      await archivarMutation.mutateAsync(actividadId);
      setConfirmArchive(null);
    } catch (error) {
      console.error('Error al archivar actividad');
    }
  };

  const closeModal = () => {
    setSelectedActividad(null);
    setModalType(null);
  };

  const getEstadoBadgeClass = (estado: string) => {
    const clases: Record<string, string> = {
      PENDIENTE: 'badge-warning',
      EN_PROGRESO: 'badge-info',
      PAUSADA: 'badge-secondary',
      COMPLETADA: 'badge-success',
      CANCELADA: 'badge-danger',
    };
    return clases[estado] || 'badge-default';
  };

  const getPrioridadBadgeClass = (prioridad: string) => {
    const clases: Record<string, string> = {
      BAJA: 'badge-info',
      MEDIA: 'badge-warning',
      ALTA: 'badge-orange',
      URGENTE: 'badge-danger',
    };
    return clases[prioridad] || 'badge-default';
  };

  return (
    <>
      <div className="actividades-grid">
        {actividades.map((actividad: any) => (
          <div key={actividad.id} className="actividad-card">
            <div className="card-header">
              <h3>{actividad.titulo || 'Sin título'}</h3>
              <div className="badges">
                <span className={`badge ${getEstadoBadgeClass(actividad.estado)}`}>
                  {actividad.estado || 'Sin estado'}
                </span>
                {!actividad.activo && <span className="badge badge-archived">Archivada</span>}
              </div>
            </div>

            {actividad.descripcion && (
              <p className="card-description">{actividad.descripcion}</p>
            )}

            <div className="card-info">
              <div className="info-row">
                <span className="label">Miembro:</span>
                <span className="value">
                  {actividad.usuarioOrganizacion?.usuario?.nombre}{' '}
                  {actividad.usuarioOrganizacion?.usuario?.apellido}
                </span>
              </div>

              <div className="info-row">
                <span className="label">Recurso:</span>
                <span className="value">{actividad.recursoTipo || 'General'}</span>
              </div>

              <div className="info-row">
                <span className="label">Prioridad:</span>
                <span className={`badge ${getPrioridadBadgeClass(actividad.prioridad)}`}>
                  {actividad.prioridad || 'Media'}
                </span>
              </div>

              <div className="info-row">
                <span className="label">Inicio:</span>
                <span className="value">
                  {actividad.fechaInicio ? new Date(actividad.fechaInicio).toLocaleDateString() : 'N/A'}
                </span>
              </div>

              <div className="info-row">
                <span className="label">Fin estimado:</span>
                <span className="value">
                  {actividad.fechaEstimadaFin ? new Date(actividad.fechaEstimadaFin).toLocaleDateString() : 'N/A'}
                </span>
              </div>

              {actividad.fechaRealFin && (
                <div className="info-row">
                  <span className="label">Fin real:</span>
                  <span className="value">
                    {new Date(actividad.fechaRealFin).toLocaleDateString()}
                  </span>
                </div>
              )}

              {actividad.contexto && (
                <div className="info-row">
                  <span className="label">Contexto:</span>
                  <span className="value">{actividad.contexto}</span>
                </div>
              )}
            </div>

            <div className="card-actions">
              <button
                className="btn-sm btn-secondary"
                onClick={() => handleEdit(actividad)}
                disabled={!actividad.activo}
                title={!actividad.activo ? 'No se puede editar una actividad archivada' : ''}
              >
                Editar
              </button>
              <button
                className="btn-sm btn-secondary"
                onClick={() => handleReasignar(actividad)}
                disabled={!actividad.activo}
                title={!actividad.activo ? 'No se puede reasignar una actividad archivada' : ''}
              >
                Reasignar
              </button>
              <button
                className="btn-sm btn-secondary"
                onClick={() => handleCambiarEstado(actividad)}
                title="Cambiar el estado de la actividad"
              >
                Estado
              </button>
              <button
                className="btn-sm btn-secondary"
                onClick={() => handleProlongar(actividad)}
                disabled={!actividad.activo}
                title={!actividad.activo ? 'No se puede prolongar una actividad archivada' : ''}
              >
                Prolongar
              </button>
              <button
                className="btn-sm btn-secondary"
                onClick={() => handleVerObservaciones(actividad)}
                title="Ver y agregar observaciones"
              >
                Observaciones
              </button>
              <button
                className="btn-sm btn-danger"
                onClick={() => setConfirmArchive(actividad.id)}
                disabled={!actividad.activo}
                title={!actividad.activo ? 'Esta actividad ya está archivada' : ''}
              >
                Archivar
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedActividad && modalType === 'edit' && (
        <EditActividadModal
          actividad={selectedActividad}
          onClose={closeModal}
        />
      )}

      {selectedActividad && modalType === 'reasignar' && (
        <ReasignarModal
          actividad={selectedActividad}
          onClose={closeModal}
        />
      )}

      {selectedActividad && modalType === 'estado' && (
        <CambiarEstadoModal
          actividad={selectedActividad}
          onClose={closeModal}
        />
      )}

      {selectedActividad && modalType === 'prolongar' && (
        <ProlongarFechaModal
          actividad={selectedActividad}
          onClose={closeModal}
        />
      )}

      {selectedActividad && modalType === 'observaciones' && (
        <ObservacionesModal
          actividad={selectedActividad}
          organizacionId={organizacionId}
          onClose={closeModal}
        />
      )}

      {confirmArchive !== null && (
        <div className="confirm-dialog-overlay">
          <div className="confirm-dialog">
            <h3>Archivar Actividad</h3>
            <p>¿Está seguro que desea archivar esta actividad? Esta acción no se puede deshacer.</p>
            <div className="confirm-actions">
              <button
                className="btn-secondary"
                onClick={() => setConfirmArchive(null)}
                disabled={archivarMutation.isPending}
              >
                Cancelar
              </button>
              <button
                className="btn-danger"
                onClick={() => handleArchive(confirmArchive)}
                disabled={archivarMutation.isPending}
              >
                {archivarMutation.isPending ? 'Archivando...' : 'Archivar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};