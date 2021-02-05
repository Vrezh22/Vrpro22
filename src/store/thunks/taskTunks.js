import { setTasksAC, addTaskActionCreator } from '../actionCreators';

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

export const addTaskThunk = (newTask ) => {
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
