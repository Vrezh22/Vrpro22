import { Modal, Button } from 'react-bootstrap';

const ConfirmDelete = ({ toggleConfirmDeleteModalOpen, handleDeleteAnyTasks, count }) => {
    return (
        <Modal show={true} onHide={toggleConfirmDeleteModalOpen}>
            <Modal.Header closeButton>
                <Modal.Title>Do you want to Delete {count} Tasks ?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggleConfirmDeleteModalOpen}>
                    Close
          </Button>
                <Button variant="danger" onClick={handleDeleteAnyTasks}>
                    Yes
          </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmDelete;