import { useNavigate } from 'react-router-dom';
import { useActividades } from '../../../../hooks/useActividades';
import { ActividadesList } from './ActividadesList';
import './ActividadesOwner.css';

interface ActividadesOwnerProps {
  organizacionId: number;
}

export const ActividadesOwner = ({ organizacionId }: ActividadesOwnerProps) => {
  const navigate = useNavigate();
  const { actividades = [], isLoadingList } = useActividades(organizacionId);

  const asignarTrabajo = () => {
    navigate(`/org/${organizacionId}/miembros/asignar-trabajo`);
  };

  return (
    <div className="actividades-owner">
      <div className="actividades-header">
        <h2>Centro de Actividades</h2>
        <button
          className="btn-primary"
          onClick={asignarTrabajo}
        >
          + Asignar trabajo
        </button>
      </div>

      {isLoadingList ? (
        <div className="actividades-loading">
          <p>Cargando actividades...</p>
        </div>
      ) : !actividades || actividades.length === 0 ? (
        <div className="actividades-empty">
          <p>Todavía no hay actividades asignadas.</p>
          <button className="btn-primary" onClick={asignarTrabajo}>
            Asignar el primer trabajo
          </button>
        </div>
      ) : (
        <ActividadesList actividades={actividades} organizacionId={organizacionId} />
      )}

    </div>
  );
};
