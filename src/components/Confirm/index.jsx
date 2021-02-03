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
            title: value,
        }));
    }
    handleSave = (e) => {
        if (e.type === 'keypress' && e.key !== "Enter") return;
        if (!this.state.title) return;
        const { editOneTask, onHide } = this.props;
        editOneTask({ ...this.state });
        onHide();
    }
    render() {
        const { onHide, data } = this.props;
        const { title } = this.state;
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
                        Edit task {data.id}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body onKeyPress={this.handleSave}>
                    <input
                        type="text"
                        className={styles.input}
                        onChange={this.handleOnChange}
                        value={title}

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