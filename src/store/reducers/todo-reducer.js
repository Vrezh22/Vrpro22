import idGenerator from '../../helpers/idGenerator';

const initialState = {
    tasks: [
        {
            _id: idGenerator(),
            text: 'Կումայրի քաղաքը այժմյան Գյումրեցիների բնակված տարածքն է եղել և քաղաքի հին անունը պայմանավորված է Կիմերական ցեղերի բրոնզեդարյան շրջանում այդտեղ բնակեցմամբ'
        },
        {
            _id: idGenerator(),
            text: 'Լենինական քաղաքը այժմյան Գյումրեցիների բնակված տարածքն  և քաղաքի  անունը դրված է այդժամ ԽՍՀՄ ղեկավար Վլադիմիր Լենինի պատվին '
        },
        {
            _id: idGenerator(),
            text: 'Ալեքսանդրապոլ  քաղաքը այժմյան Գյումրեցիների բնակված տարածքն  և քաղաքի  անունը դրված է այդժամ Ռուս ցար Պյոտր 1-ի կնոջ Ալեքսանդրայի պատվին և հանդիսացել է թագուհու անձնական նստավայրը'
        }
    ]
}


const TodoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setTasks': {
            return {
                ...state,
                tasks: action.tasks
            }
        }

        case 'ADDTask': {
            const tasks = [...state.tasks];
            tasks.push({
                _id: idGenerator(),
                text: action.text
            })
            return {
                ...state,
                tasks
            }
        }
        case 'DELETETask': {

            let tasks = [...state.tasks];
            const { _id } = action;

            tasks = tasks.filter(task => task._id !== _id);
            return {
                ...state,
                tasks
            }
        }
        case 'EDIT_TASK': {
            const tasks = [...state.tasks];
            const idx = tasks.findIndex(task => task._id === action.task._id);
            tasks[idx] = action.task;
            return {
                ...state,
                tasks
            }
        }
        case "DELETE_ANY_TASKS": {
            let { removeTasks } = action;
            removeTasks = Array.from(removeTasks);
            let tasks = [...state.tasks];
            tasks = tasks.filter(task => !removeTasks.includes(task._id));
            return {
                ...state,
                tasks
            }
        }

        default: return state;
    }
}

export default TodoReducer;