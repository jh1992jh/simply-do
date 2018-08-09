import {
  GET_TODOS,
  POST_TODO,
  DELETE_TODO,
  UPDATE_DONE,
  TODO_LOADING
} from '../actions/types';

const initialState = {
  loading: true,
  todos: [],
  doneTodos: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TODO_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TODOS:
      return {
        ...state,
        loading: false,
        todos: action.payload.filter(todo => todo.done === false),
        doneTodos: action.payload.filter(todo => todo.done === true)
      };
    case POST_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos]
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.payload)
      };
    case UPDATE_DONE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
