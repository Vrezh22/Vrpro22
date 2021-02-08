import {
    setTasksAC,
    addTaskActionCreator,
    editOneTaskAC,
    deleteOneTaskActionCreator
} from '../actionCreators';

export const setTasksThunk = () => {

    return (dispatch) => {
        (async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                const data = await response.json();
                dispatch(setTasksAC(data));
            } catch (err) {
                console.log('GET TASKS ERROR', err);
            }
        })()
    }
}

export const addTaskThunk = (newTask) => {
    return (dispatch) => {
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {
                'Content-Type': 'application/json ;charset=UTF-8'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch(addTaskActionCreator(data))
            })
            .catch(error => {
                console.log('Error');
            })


    }
}


export const EditTaskThunk = (editTask, clearEditTask) => {

    return (dispatch) => {
        (async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos/' + editTask.id, {
                    method: 'PUT',
                    body: JSON.stringify(editTask),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok)
                    throw response

                const data = await response.json();
                dispatch(editOneTaskAC(data));
                clearEditTask();
            } catch (error) {
                console.log('EDIT TASK ERROR', error);
            }
        })()


    }
}

export const deleteOneTaskTunk = (id) => {

    return (dispatch) => {
        (async function () {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/' + id);
            const data = await response.json();
            dispatch(deleteOneTaskActionCreator(data.id));
        })()


    }
}
