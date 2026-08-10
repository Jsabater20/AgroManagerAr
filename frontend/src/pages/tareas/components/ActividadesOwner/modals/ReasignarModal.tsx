// src/pages/Tareas/components/ActividadesOwner/modals/ReasignarModal.tsx
import './modals.css';

interface ReasignarModalProps {
  actividad: any;
  onClose: () => void;
}

export const ReasignarModal = ({ onClose }: ReasignarModalProps) => {
  return (
    <div className="modal-placeholder">
      <p>Modal de reasignar actividad - En desarrollo</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};