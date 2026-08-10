import { useState } from 'react';
import { ActividadesList } from './ActividadesList';
import './ActividadesOwner.css';

interface ActividadesOwnerProps {
  organizacionId: number;
}

export const ActividadesOwner = ({ organizacionId }: ActividadesOwnerProps) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const actividades: any[] = [];
  const isLoadingList = false;

  return (
    <div className="actividades-owner">
      <div className="actividades-header">
        <h2>Centro de Actividades</h2>
        <button
          className="btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          + Nueva Actividad
        </button>
      </div>

      {isLoadingList ? (
        <div className="actividades-loading">
          <p>Cargando actividades...</p>
        </div>
      ) : !actividades || actividades.length === 0 ? (
        <div className="actividades-empty">
          <p>Todavía no hay actividades asignadas.</p>
        </div>
      ) : (
        <ActividadesList actividades={actividades} organizacionId={organizacionId} />
      )}

      {showCreateModal && (
        <div className="actividades-modal-placeholder">
          <p>Modal de crear actividad - Próximamente</p>
          <button onClick={() => setShowCreateModal(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};