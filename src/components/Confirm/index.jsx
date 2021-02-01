import styles from './confirm.module.css';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class EditTaskModal extends React.Component {
    constructor(props) {
        super();
        this.state = {
            ...props.data,
        }
    }


    handleOnChange = (e) => {
        const { value } = e.target;
        this.setState(state => ({
            ...state,
            text: value,
        }));
    }
    handleSave = (e) => {

        if (e.type === 'keydown' && e.key !== "Enter") return;
        if (!this.state.text) return;
        const { editOneTask, onHide } = this.props;
        editOneTask({ ...this.state });
        onHide();
    }
    render() {
        const { onHide, data } = this.props;
        const { text } = this.state;
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
                        Edit task {data._id}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body onKeyDown={this.handleSave}>
                    <input
                        type="text"
                        className={styles.input}
                        onChange={this.handleOnChange}
                        value={text}

                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={onHide}>Close</Button>
                    <Button variant="warning" onClick={this.handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    };
}

export default EditTaskModal;