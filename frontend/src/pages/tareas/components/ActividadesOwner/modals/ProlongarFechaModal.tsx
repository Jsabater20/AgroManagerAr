// src/pages/Tareas/components/ActividadesOwner/modals/ProlongarFechaModal.tsx
import './modals.css';

interface ProlongarFechaModalProps {
  actividad: any;
  onClose: () => void;
}

export const ProlongarFechaModal = ({ onClose }: ProlongarFechaModalProps) => {
  return (
    <div className="modal-placeholder">
      <p>Modal de prolongar fecha - En desarrollo</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};