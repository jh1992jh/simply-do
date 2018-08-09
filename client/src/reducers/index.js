import { combineReducers } from 'redux';
import authReducer from './authReducer';
import todoReducer from './todoReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({
  auth: authReducer,
  todos: todoReducer,
  errors: errorsReducer
});
