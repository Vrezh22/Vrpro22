import { createStore ,combineReducers} from 'redux';
import TodoReducer from './reducers/todo-reducer';


const reducers = combineReducers({
    todoState:TodoReducer

})
const store = createStore(reducers);

export default store;