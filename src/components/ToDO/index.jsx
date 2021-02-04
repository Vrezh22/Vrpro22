import { Container, Row, Col, Button } from 'react-bootstrap';
import React from 'react';
import { connect } from 'react-redux';
import TodoForm from '../TodoForm';
import Task from '../Task';
import EditTaskModal from '../Confirm';
import ConfirmDelete from '../ConfirmDelete';
//Action Creators 
import {
    addPostActionCreator,
    deletePostActionCreator,
    editOneTaskAC,
    deleteAnyTasksAC,
    setTasksAC
} from '../../store/actionCreators';

class Todo extends React.Component {
    state = {
        inputValue: '',
        isaddPostSubmit: false,
        editTask: null,
        removeTasks: new Set(),
        isConfirmDeleteModalOpen: false
    }
    toggleConfirmDeleteModalOpen = () => {
        this.setState({
            isConfirmDeleteModalOpen: !this.state.isConfirmDeleteModalOpen
        });
    }
    toggleSetAnyTasks = (id) => {
        const removeTasks = new Set(this.state.removeTasks);
        if (removeTasks.has(id))
            removeTasks.delete(id);
        else
            removeTasks.add(id);

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

        this.setState({
            isaddPostSubmit: true
        })

    }
    handleDeleteForm = (id) => {
        return this.props.deletePost(id);

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
            removeTasks: new Set(),
            isConfirmDeleteModalOpen: false
        });

    }

    componentDidMount() {
        (async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            this.props.setTasks(data);
        })()
    }
    componentDidUpdate() {
        if (this.state.isaddPostSubmit) {
            this.setState({
                isaddPostSubmit: false
            })
            const newTask = {
                title: this.state.inputValue,
                userId: 1,
                completed: false
            }

            fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                body: JSON.stringify(newTask),
                headers: {
                    'Content-Type': 'application/json ;charset=UTF-8'
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.props.addPost(data);
                    this.setState({
                        inputValue: '',
                    })
                })

        }
    }
    render() {
        const { tasks, editOneTask } = this.props;
        const { inputValue, editTask, removeTasks, isConfirmDeleteModalOpen } = this.state;
        const tasksJSX = tasks.map(task => {
            const colInlineStyle = {
                border: '1px solid black',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px'
            }
            if (Array.from(this.state.removeTasks).includes(task.id))
                colInlineStyle.opacity = '.6';

            return (
                <Col key={task.id} xs={12} sm={6} md={4} style={colInlineStyle} >
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
                            onClick={this.toggleConfirmDeleteModalOpen}
                        >
                            Delete All
                              </Button>
                    </Row>
                </Container>
                {
                    editTask &&
                    <EditTaskModal
                        onHide={this.clearEditTask}
                        data={editTask}
                        editOneTask={editOneTask}
                    />
                }

                {
                    isConfirmDeleteModalOpen &&
                    <ConfirmDelete
                        toggleConfirmDeleteModalOpen={this.toggleConfirmDeleteModalOpen}
                        handleDeleteAnyTasks={this.handleDeleteAnyTasks}
                        count={removeTasks.size}
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
const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newTask) => dispatch(addPostActionCreator(newTask)),
        deletePost: (id) => dispatch(deletePostActionCreator(id)),
        editOneTask: (task) => dispatch(editOneTaskAC(task)),
        deleteAnyTasks: (removeTasks) => dispatch(deleteAnyTasksAC(removeTasks)),
        setTasks: (tasks) => dispatch(setTasksAC(tasks))
    }
}
const TodoContainer = connect(mapStateToProps, mapDispatchToProps)(Todo);
export default TodoContainer;