import {
    ADD_TASK,
    DELETE_TASK,
    SET_TASKS,
    EDIT_TASK,
    DELETE_SOME_TASKS
} from './actionTypes';


export const addTaskActionCreator = (newTask) => ({ type: ADD_TASK, newTask })
export const deleteOneTaskActionCreator = (id) => ({ type: DELETE_TASK, id })
export const editOneTaskAC = (task) => ({ type: EDIT_TASK, task })
export const deleteAnyTasksAC = (removeTasks) => ({ type: DELETE_SOME_TASKS, removeTasks })
export const setTasksAC = (tasks) => ({ type: SET_TASKS, tasks })