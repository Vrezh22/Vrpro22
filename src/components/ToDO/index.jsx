import { Container, Row, Col, Button } from 'react-bootstrap';
import React from 'react';
import { connect } from 'react-redux';
import TodoForm from '../TodoForm';
import Task from '../Task';
import EditTaskModal from '../Confirm';

class Todo extends React.Component {
    state = {
        inputValue: '',
        editTask: null,
        removeTasks: new Set()
    }
    toggleSetAnyTasks = (_id) => {
        const removeTasks = new Set(this.state.removeTasks);
        if (removeTasks.has(_id))
            removeTasks.delete(_id);
        else
            removeTasks.add(_id);

        this.setState({
            removeTasks
        })
    }
    handleOnChange = ({ target }) => {
        this.setState({
            inputValue: target.value
        })
    }
    handleSubmitForm = (event) => {
        if (!this.state.inputValue)
            return;
        this.props.addPost(this.state.inputValue);

        this.setState({
            inputValue: ''
        })
    }
    handleDeleteForm = (_id) => {
        return this.props.deletePost(_id);

    }
    clearEditTask = () => {
        this.setState({
            editTask: null
        });
    }
    setEditTask = (editTask) => {
        this.setState(prevState => ({
            ...prevState,
            editTask
        }))
    }

    handleDeleteAnyTasks = (e) => {
        this.props.deleteAnyTasks(this.state.removeTasks);
        this.setState({
            removeTasks:new Set() 
        });

    }

    render() {
        const { tasks, editOneTask } = this.props;
        const { inputValue, editTask, removeTasks } = this.state;
        const tasksJSX = tasks.map(task => {
            const colInlineStyle = {
                border: '1px solid black',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px'
            }
            return (
                <Col key={task._id} xs={12} sm={6} md={4} style={colInlineStyle} >
                    <Task
                        task={task}
                        handleDeleteForm={this.handleDeleteForm}
                        setEditTask={this.setEditTask}
                        toggleSetAnyTasks={this.toggleSetAnyTasks}
                        disabled={!!removeTasks.size}
                    />
                </Col>
            )
        })

        return (
            <>
                <Container>
                    <Row className="justify-content-center">
                        <TodoForm
                            inputValue={inputValue}
                            handleOnChange={this.handleOnChange}
                            handleSubmitForm={this.handleSubmitForm}
                            disabled={!!removeTasks.size}
                        />
                    </Row>
                    <Row>
                        {tasksJSX}
                    </Row>
                    <Row className="mt-5">
                        <Button
                            variant="danger"
                            disabled={!removeTasks.size}
                            onClick={this.handleDeleteAnyTasks}
                        >
                            Delete All
                              </Button>
                    </Row>
                </Container>
                {
                    editTask && <EditTaskModal
                        onHide={this.clearEditTask}
                        data={editTask}
                        editOneTask={editOneTask}
                    />
                }
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        tasks: state.todoState.tasks
    }
}
const mapDispacthToProps = (dispatch) => {
    return {
        addPost: (text) => dispatch({ type: 'ADDTask', text: text }),
        deletePost: (_id) => dispatch({ type: 'DELETETask', _id: _id }),
        editOneTask: (task) => dispatch({ type: 'EDIT_TASK', task }),
        deleteAnyTasks: (removeTasks) => dispatch({ type: 'DELETE_ANY_TASKS', removeTasks })
    }
}
const TodoContainer = connect(mapStateToProps, mapDispacthToProps)(Todo);
export default TodoContainer;