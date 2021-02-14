
import {
    ADD_TASK,
    DELETE_TASK,
    SET_TASKS,
    EDIT_TASK,
    DELETE_SOME_TASKS,
    TOGGLE_EDIT_TASK,
    TOGGLE_OPEN_ADDTASK_MODAL,
    TOGGLE_OPEN_CONFIRM_DELETE_ANY_TASKS_MODAL,
    TOGGLE_SET_DELETE_TASK
} from './actionTypes';


export const addTaskActionCreator = (newTask) => ({ type: ADD_TASK, newTask })
export const deleteOneTaskActionCreator = (id) => ({ type: DELETE_TASK, id })
export const editOneTaskAC = (task) => ({ type: EDIT_TASK, task })
export const deleteAnyTasksAC = (removeTasks) => ({ type: DELETE_SOME_TASKS, removeTasks })
export const setTasksAC = (tasks) => ({ type: SET_TASKS, tasks })
export const toggleEditTaskAC = (editTask) => ({ type: TOGGLE_EDIT_TASK, editTask })
export const toggleOpenAddTaskModalAC = () => ({ type: TOGGLE_OPEN_ADDTASK_MODAL })
export const toggleOpenConfirmDeleteAnyTasksModalAC = () => ({ type: TOGGLE_OPEN_CONFIRM_DELETE_ANY_TASKS_MODAL })
export const toggleSetDeleteTaskAC = (id) => ({ type: TOGGLE_SET_DELETE_TASK, id })