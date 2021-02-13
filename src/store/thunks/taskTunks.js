import {
    setTasksAC,
    addTaskActionCreator,
    editOneTaskAC,
    deleteOneTaskActionCreator,
    toggleOpenAddTaskModalAC,
    toggleEditTaskAC
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

export const addTaskThunk = (formData) => {
    if (Object.keys(formData).length !== 1)
        return;
    const newTask = {
        title: formData.title,
        userId: 1,
        completed: false
    }
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
                dispatch(addTaskActionCreator(data));
                dispatch(toggleOpenAddTaskModalAC());

            })
            .catch(error => {
                console.log('Error');
            })


    }
}


export const EditTaskThunk = (editTask) => {
    if (editTask.title === '') return false;
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
                dispatch(toggleEditTaskAC());
            } catch (error) {
                console.log('EDIT TASK ERROR', error);
            }
        })();
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
