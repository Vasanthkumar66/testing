import { LOGIN_SUCCESS, SIGNUP_SUCCESS } from '../constants/actionTypes';

const initialState = {
  user: null,
};
const userReducer = (state = initialState, action) => {
//console.log(state);
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;