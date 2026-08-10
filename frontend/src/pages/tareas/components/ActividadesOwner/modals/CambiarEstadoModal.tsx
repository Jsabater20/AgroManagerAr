// src/pages/Tareas/components/ActividadesOwner/modals/CambiarEstadoModal.tsx
import './modals.css';

interface CambiarEstadoModalProps {
  actividad: any;
  onClose: () => void;
}

export const CambiarEstadoModal = ({ onClose }: CambiarEstadoModalProps) => {
  return (
    <div className="modal-placeholder">
      <p>Modal de cambiar estado - En desarrollo</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};