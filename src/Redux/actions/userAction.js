import { LOGIN_SUCCESS, SIGNUP_SUCCESS } from '../constants/actionTypes';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
});

export const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});
