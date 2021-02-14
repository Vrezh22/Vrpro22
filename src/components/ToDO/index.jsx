import { Container, Row, Col, Button } from 'react-bootstrap';
import React from 'react';
import { connect } from 'react-redux';
import Task from '../Task';
import EditTaskModal from '../Confirm';
import ConfirmDelete from '../ConfirmDelete';
import AddTaskModal from '../AddTaskModal';
//Action Creators 
import {
    deleteAnyTasksAC,
    toggleEditTaskAC,
    toggleOpenAddTaskModalAC,
    toggleOpenConfirmDeleteAnyTasksModalAC,
    toggleSetDeleteTaskAC
} from '../../store/actionCreators';
//thunk
import {
    setTasksThunk,
    addTaskThunk,
    EditTaskThunk,
    deleteOneTaskTunk
} from '../../store/thunks/taskTunks';

class Todo extends React.Component {


    componentDidMount() {
        this.props.setTasks();
    }

    render() {
        const {
            tasks,
            toggleEditTask,
            editTask,
            removeTasks,
            isConfirmDeleteModalOpen,
            isOpenAddTaskModal,
            toggleOpenAddTaskModal,
            deleteOneTask,
            toggleConfirmDeleteModalOpen,
            addTask,
            saveEditTask,
            deleteAnyTasks,
            toggleSetAnyTasks
        } = this.props;


        const tasksJSX = tasks.map(task => {
            const colInlineStyle = {
                border: '1px solid black',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px'
            }
            if (removeTasks.has(task.id))
                colInlineStyle.opacity = '.6';

            return (
                <Col key={task.id} xs={12} sm={6} md={4} style={colInlineStyle} >
                    <Task
                        task={task}
                        handleDeleteForm={deleteOneTask}
                        setEditTask={toggleEditTask}
                        toggleSetAnyTasks={toggleSetAnyTasks}
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
                            onClick={toggleOpenAddTaskModal}
                            disabled={!!removeTasks.size}
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
                            onClick={toggleConfirmDeleteModalOpen}
                        >
                            Delete All
                              </Button>
                    </Row>
                </Container>
                {
                    editTask &&
                    <EditTaskModal
                        onHide={toggleEditTask}
                        initialValues={{
                            ...editTask
                        }}
                        onSubmit={saveEditTask}
                    />
                }

                {
                    isConfirmDeleteModalOpen &&
                    <ConfirmDelete
                        toggleConfirmDeleteModalOpen={toggleConfirmDeleteModalOpen}
                        handleDeleteAnyTasks={deleteAnyTasks}
                        count={removeTasks.size}
                    />
                }
                {
                    isOpenAddTaskModal && <AddTaskModal
                        onHide={toggleOpenAddTaskModal}
                        onSubmit={addTask}
                    />
                }
            </>
        )
    }
}
const mapStateToProps = (state) => {
    const {
        tasks,
        editTask,
        isOpenAddTaskModal,
        isConfirmDeleteModalOpen,
        removeTasks
    } = state.todoState;
    return {
        tasks,
        editTask,
        isOpenAddTaskModal,
        isConfirmDeleteModalOpen,
        removeTasks
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (newTask) => dispatch(addTaskThunk(newTask)),
        deleteOneTask: (id) => dispatch(deleteOneTaskTunk(id)),
        saveEditTask: (editTask) => dispatch(EditTaskThunk(editTask)),
        deleteAnyTasks: (removeTasks) => dispatch(deleteAnyTasksAC(removeTasks)),
        setTasks: () => dispatch(setTasksThunk()),
        toggleEditTask: (editTask = null) => dispatch(toggleEditTaskAC(editTask)),
        toggleOpenAddTaskModal: () => dispatch(toggleOpenAddTaskModalAC()),
        toggleConfirmDeleteModalOpen: () => dispatch(toggleOpenConfirmDeleteAnyTasksModalAC()),
        toggleSetAnyTasks: (id) => dispatch(toggleSetDeleteTaskAC(id))
    }
}
const TodoContainer = connect(mapStateToProps, mapDispatchToProps)(Todo);
export default TodoContainer;