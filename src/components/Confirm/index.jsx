import styles from './confirm.module.css';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';

const EditTaskModal = (props) => {
    const {  handleSubmit  ,onHide} = props;
    const handleSave = (e) => {
        if (e.type === 'keypress' && e.key !== "Enter") return;     
        handleSubmit();
    }


    return (
        <Modal
            show={true}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit task
                </Modal.Title>
            </Modal.Header>
            <Modal.Body onKeyPress={handleSave}>
                <Field
                    name="title"
                    type="text"
                    className={styles.input}
                    component="input"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>Close</Button>
                <Button variant="warning" onClick={handleSave}>Save</Button>
            </Modal.Footer>
        </Modal>
    );

}

const EditTaskRedux = reduxForm({
    form: 'editTaskForm'
})(EditTaskModal);

export default EditTaskRedux;