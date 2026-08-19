import './modals.css';

interface CreateActividadModalProps {
  onClose: () => void;
}

export const CreateActividadModal = ({ onClose }: CreateActividadModalProps) => {
  return (
    <div className="modal-placeholder">
      <p>Modal de crear actividad - En desarrollo</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};
