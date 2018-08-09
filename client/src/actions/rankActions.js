import { GET_RANK } from './types';

export const getRank = doneTodos => dispatch => {
  dispatch({
    type: GET_RANK,
    payload: doneTodos
  });
};
