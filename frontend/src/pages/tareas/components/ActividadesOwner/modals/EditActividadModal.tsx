// src/pages/Tareas/components/ActividadesOwner/modals/EditActividadModal.tsx
import './modals.css';

interface EditActividadModalProps {
  actividad: any;
  onClose: () => void;
}

export const EditActividadModal = ({ onClose }: EditActividadModalProps) => {
  return (
    <div className="modal-placeholder">
      <p>Modal de editar actividad - En desarrollo</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};