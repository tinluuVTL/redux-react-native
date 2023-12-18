// file store.js
import { createStore, combineReducers } from 'redux';
import todosReducer from './reducer';

const rootReducer = combineReducers({
  todos: todosReducer,
});

const store = createStore(rootReducer);

export default store;
