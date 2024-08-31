import Modal from "react-modal";
import css from "./ImageModal.module.css";

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  imageUrl: string;
  imageAlt: string;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    background: "none",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onRequestClose,
  imageUrl,
  imageAlt,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className={css.modalContent}>
        <img className={css.image} src={imageUrl} alt={imageAlt} />
      </div>
    </Modal>
  );
};

export default ImageModal;
