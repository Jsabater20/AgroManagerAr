// src/pages/Tareas/components/ActividadesOwner/modals/ObservacionesModal.tsx
import { useState } from 'react';
import { useActividades } from '../../../../../hooks/useActividades';
import './modals.css';

interface ObservacionesModalProps {
  actividad: any;
  organizacionId: number;
  onClose: () => void;
}

export const ObservacionesModal = ({
  actividad,
  organizacionId,
  onClose,
}: ObservacionesModalProps) => {
  const [contenido, setContenido] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { useObservaciones, agregarObservacionMutation } = useActividades(organizacionId);
  
  const { data: observaciones = [], isLoading } = useObservaciones(actividad.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contenido.trim()) return;

    setIsSubmitting(true);
    try {
      await agregarObservacionMutation.mutateAsync({
        actividadId: actividad.id,
        payload: { contenido },
      });
      setContenido('');
    } catch (error: any) {
      console.error('Error al agregar observación:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getEstadoBadgeClass = (estado: string) => {
    const estados: Record<string, string> = {
      PENDIENTE: 'badge-warning',
      EN_PROGRESO: 'badge-info',
      PAUSADA: 'badge-secondary',
      COMPLETADA: 'badge-success',
      CANCELADA: 'badge-danger',
    };
    return estados[estado] || 'badge-default';
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-observaciones">
        <div className="modal-header">
          <h2>Observaciones - {actividad.titulo}</h2>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Historial de observaciones */}
          <div className="observaciones-list">
            <h3>Historial</h3>
            {isLoading ? (
              <div className="estado-carga">
                <p>Cargando observaciones...</p>
              </div>
            ) : observaciones.length === 0 ? (
              <div className="estado-vacio">
                <p>No hay observaciones aún</p>
              </div>
            ) : (
              <div className="observaciones-timeline">
                {observaciones.map((obs: any) => (
                  <div key={obs.id} className="observacion-item">
                    <div className="observacion-header">
                      <div className="observacion-autor">
                        <strong>{obs.autor?.nombre} {obs.autor?.apellido}</strong>
                        <span className="observacion-fecha">
                          {formatDate(obs.createdAt)}
                        </span>
                      </div>
                      <span className={`badge ${getEstadoBadgeClass(obs.estadoActividadAlMomento)}`}>
                        {obs.estadoActividadAlMomento}
                      </span>
                    </div>
                    <div className="observacion-contenido">
                      <p>{obs.contenido}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Formulario para agregar observación */}
          <div className="observaciones-form">
            <h3>Agregar Observación</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <textarea
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  placeholder="Escriba su observación..."
                  rows={4}
                  disabled={isSubmitting}
                  maxLength={5000}
                />
                <span className="char-count">
                  {contenido.length}/5000
                </span>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting || !contenido.trim()}
                >
                  {isSubmitting ? 'Agregando...' : 'Agregar Observación'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};