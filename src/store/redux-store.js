import { createStore, combineReducers, applyMiddleware } from 'redux';
import TodoReducer from './reducers/todo-reducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    todoState: TodoReducer

});
const middlewares = [thunk];
const store = createStore(reducers, applyMiddleware(...middlewares));
export default store;