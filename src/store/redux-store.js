import { createStore, combineReducers, applyMiddleware } from 'redux';
import TodoReducer from './reducers/todo-reducer';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
    todoState: TodoReducer,
    form:formReducer
});
const middlewares = [thunk];
const store = createStore(reducers, applyMiddleware(...middlewares));
export default store;