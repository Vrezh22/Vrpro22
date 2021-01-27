import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import TodoForm from '../TodoForm';
import Task from '../Task';
import { dispatch } from '../../store/store';

class Todo extends React.Component {
    state = {
        inputValue: ''
    }
    handleOnChange = ({ target }) => {
        this.setState({
            inputValue: target.value
        })
    }
    handleSubmitForm = (event) => {
        if (!this.state.inputValue)
            return;

        const action = {
            type: 'ADDPOST',
            text: this.state.inputValue
        }
        dispatch(action);

        this.setState({
            inputValue: ''
        })
    }
    handleDeleteForm = (_id) => {
        const action = {
            type: 'DELETEPOST',
            _id
        }
        return dispatch(action);

    }


    render() {
        const { tasks } = this.props;
        const { inputValue } = this.state;
        const tasksJSX = tasks.map(task => {

            return (
                <Col key={task._id} xs={12} sm={6} md={4} style={{ border: '1px solid black' }}>
                    <Task task={task} handleDeleteForm={this.handleDeleteForm} />
                </Col>
            )
        })

        return (
            <div>
                <Container>
                    <Row className="justify-content-center">
                        <TodoForm
                            inputValue={inputValue}
                            handleOnChange={this.handleOnChange}
                            handleSubmitForm={this.handleSubmitForm}
                        />
                    </Row>
                    <Row>
                        {tasksJSX}
                    </Row>
                </Container>

            </div>
        )
    }
}

export default Todo;