import {
    ADD_TASK,
    DELETE_TASK,
    EDIT_TASK,
    SET_TASKS,
    DELETE_SOME_TASKS
} from './actionTypes';

export const addPostActionCreator = (newTask) => ({ type: ADD_TASK, newTask })
export const deletePostActionCreator = (id) => ({ type: DELETE_TASK, id })
export const editOneTaskAC = (task) => ({ type: EDIT_TASK, task })
export const deleteAnyTasksAC = (removeTasks) => ({ type: DELETE_SOME_TASKS, removeTasks })
export const setTasksAC = (tasks) => ({ type: SET_TASKS, tasks })