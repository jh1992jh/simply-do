import axios from 'axios';
import {
  GET_TODOS,
  POST_TODO,
  DELETE_TODO,
  TODO_LOADING,
  UPDATE_DONE,
  GET_ERRORS,
  CLEAR_ERRORS
} from './types';

export const getTodos = () => dispatch => {
  axios
    .get('/api/todos/')
    .then(res => {
      dispatch({
        type: GET_TODOS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const postTodo = todoData => dispatch => {
  dispatch(clearErrors())
  axios.post('/api/todos/create', todoData).then(res => {
    dispatch({
      type: POST_TODO,
      payload: res.data
    });
  })
 .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }) 
};

export const deleteTodo = id => dispatch => {
  axios.delete(`/api/todos/${id}`).then(res => {
    dispatch({
      type: DELETE_TODO,
      payload: id
    });
  });
};

export const updateDone = id => dispatch => {
  dispatch(setTodoLoading());
  axios
    .put(`/api/todos/${id}`)
    .then(res => {
      dispatch({
        type: UPDATE_DONE
      });
    })
    .then(res => dispatch(getTodos()));
};

export const setTodoLoading = () => {
  return {
    type: TODO_LOADING
  };
};


export const clearErrors = () =>{
  return {
    type: CLEAR_ERRORS
  }
}

