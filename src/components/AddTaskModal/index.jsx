import styles from './addTaskModal.module.css';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form'

const AddTaskModal = (props) => {

    // const handleSubmit = (e ) =>{
    //         e.preventDefault();
    //        // getting FormData from redux
    //        props.onSubmit(FormData)
    // }
    const { onHide, handleSubmit } = props;
    const handleSub = (event) => {
        if (event.type !== 'click' && event.key !== 'Enter')
            return;
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
                    Add New Task
                    </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody} onKeyPress={handleSub}>
                <Field
                    name="title"
                    type="text"
                    className={styles.input}
                    component="input"
                    placeholder="New Task Title"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>Close</Button>
                <Button variant="warning" onClick={handleSub} >Save</Button>
            </Modal.Footer>
        </Modal>
    )

}

const AddTaskRedux = reduxForm({
    form: 'addNewTaskForm'
})(AddTaskModal)

export default AddTaskRedux;