// import idGenerator from '../../helpers/idGenerator';
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

} from '../actionTypes';

const initialState = {
    tasks: [
        // {
        //     _id: idGenerator(),
        //     text: 'Կումայրի քաղաքը այժմյան Գյումրեցիների բնակված տարածքն է եղել և քաղաքի հին անունը պայմանավորված է Կիմերական ցեղերի բրոնզեդարյան շրջանում այդտեղ բնակեցմամբ'
        // },
        // {
        //     _id: idGenerator(),
        //     text: 'Լենինական քաղաքը այժմյան Գյումրեցիների բնակված տարածքն  և քաղաքի  անունը դրված է այդժամ ԽՍՀՄ ղեկավար Վլադիմիր Լենինի պատվին '
        // },
        // {
        //     _id: idGenerator(),
        //     text: 'Ալեքսանդրապոլ  քաղաքը այժմյան Գյումրեցիների բնակված տարածքն  և քաղաքի  անունը դրված է այդժամ Ռուս ցար Պյոտր 1-ի կնոջ Ալեքսանդրայի պատվին և հանդիսացել է թագուհու անձնական նստավայրը'
        // }
    ],
    editTask: null,
    isOpenAddTaskModal: false,
    isConfirmDeleteModalOpen: false,
    removeTasks: new Set()
}


const TodoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS: {
            return {
                ...state,
                tasks: action.tasks
            }
        }

        case ADD_TASK: {
            const tasks = [...state.tasks];
            tasks.push(action.newTask);
            return {
                ...state,
                tasks
            }
        }
        case DELETE_TASK: {

            let tasks = [...state.tasks];
            const { id } = action;

            tasks = tasks.filter(task => task.id !== id);
            return {
                ...state,
                tasks
            }
        }
        case EDIT_TASK: {
            const tasks = [...state.tasks];
            const idx = tasks.findIndex(task => task.id === action.task.id);
            tasks[idx] = action.task;
            return {
                ...state,
                tasks
            }
        }
        case DELETE_SOME_TASKS: {
            let { removeTasks } = state;
            let tasks = [...state.tasks];
            tasks = tasks.filter(task => !removeTasks.has(task.id));
            return {
                ...state,
                tasks,
                removeTasks: new Set(),
                isConfirmDeleteModalOpen: false
            }
        }
        case TOGGLE_EDIT_TASK: {
            return {
                ...state,
                editTask: action.editTask
            };
        }
        case TOGGLE_OPEN_ADDTASK_MODAL: {
            return {
                ...state,
                isOpenAddTaskModal: !state.isOpenAddTaskModal
            }
        }
        case TOGGLE_OPEN_CONFIRM_DELETE_ANY_TASKS_MODAL: {
            return {
                ...state,
                isConfirmDeleteModalOpen: !state.isConfirmDeleteModalOpen
            }
        }

        case TOGGLE_SET_DELETE_TASK: {
            const removeTasks = new Set(state.removeTasks);
            const { id } = action;
            if (removeTasks.has(id))
                removeTasks.delete(id);
            else
                removeTasks.add(id);
            return {
                ...state,
                removeTasks
            }
        }
        default: return state;
    }
}

export default TodoReducer;