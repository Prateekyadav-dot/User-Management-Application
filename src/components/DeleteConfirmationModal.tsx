import { Button,Modal} from "react-bootstrap";


type DeleteConfirmationModalProps = {
  show: boolean;
  userName: String;
  onHide: () => void;
    onConfirm: () => void;
};

const DeleteConfirmationModal:React.FC<DeleteConfirmationModalProps> = ({ 
    show,
    userName,
    onHide,
    onConfirm,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
        
          Are you sure to delete the user <strong>{userName}</strong>?
        </p>
        <p className="text-body-secondary small"> This action cannot be undone. </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete User
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmationModal
