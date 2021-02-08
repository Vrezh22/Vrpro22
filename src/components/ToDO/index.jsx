import { Container, Row, Col, Button } from 'react-bootstrap';
import React from 'react';
import { connect } from 'react-redux';
import Task from '../Task';
import EditTaskModal from '../Confirm';
import ConfirmDelete from '../ConfirmDelete';
import AddTaskModal from '../AddTaskModal';
//Action Creators 
import {
    deleteAnyTasksAC
} from '../../store/actionCreators';
//thunk
import {
    setTasksThunk,
    addTaskThunk,
    EditTaskThunk,
    deleteOneTaskTunk
} from '../../store/thunks/taskTunks';

class Todo extends React.Component {
    state = {
        editTask: null,
        removeTasks: new Set(),
        isConfirmDeleteModalOpen: false,
        isAddNewTaskModal: false
    }
    toggleOpenAddTaskModal = () => {
        this.setState({
            isAddNewTaskModal: !this.state.isAddNewTaskModal
        });
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

    handleDeleteForm = (id) => {
        const { deleteOneTaskThunk } = this.props;
        deleteOneTaskThunk(id);
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
    handleEditOneTask = (editTask) => {
        if (editTask.title === '') return false;
        this.props.EditTaskThunk(editTask, this.clearEditTask);

    }
    handleAddNewTask = (formData) => {
        if (Object.keys(formData).length !== 1)
            return;
        const newTask = {
            title: formData.title,
            userId: 1,
            completed: false
        }
        this.props.addTask(newTask); 
        this.setState({
            isAddNewTaskModal: false
        })
    }
    componentDidMount() {
        this.props.setTasks();
    }
    render() {
        const { tasks } = this.props;
        const {
            editTask,
            removeTasks,
            isConfirmDeleteModalOpen,
            isAddNewTaskModal
        } = this.state;
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
                        <Button
                            variant="primary"
                            onClick={this.toggleOpenAddTaskModal}
                        >
                            Add New Task
                            </Button>
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
                        initialValues={{
                            ...editTask
                        }}
                        onSubmit={this.handleEditOneTask}
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
                {
                    isAddNewTaskModal && <AddTaskModal
                        onHide={this.toggleOpenAddTaskModal}
                        onSubmit={this.handleAddNewTask}
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
        addTask: (newTask) => dispatch(addTaskThunk(newTask)),
        deleteOneTaskThunk: (id) => dispatch(deleteOneTaskTunk(id)),
        EditTaskThunk: (editTask, clearEditTask) => dispatch(EditTaskThunk(editTask, clearEditTask)),
        deleteAnyTasks: (removeTasks) => dispatch(deleteAnyTasksAC(removeTasks)),
        setTasks: () => dispatch(setTasksThunk()),
    }
}
const TodoContainer = connect(mapStateToProps, mapDispatchToProps)(Todo);
export default TodoContainer;