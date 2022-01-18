import { authReducer } from './auth';
import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_ERROR,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
} from '../actions';

const initState = {
  name: '',
  email: '',

  userRequest: false,
  userFailed: false,

  updateUserRequest: false,
  updateUserFailed: false,

  tokenRequest: false,
  tokenUpdate: false,
  tokenFailed: false,

  logoutRequest: false,
  logoutFailed: false,

  registerRequest: false,
  registerFailed: false,

  loginRequest: false,
  loginFailed: false,

  forgotRequest: false,
  forgotFailed: false,
  isResetPassword: false,
  resetRequest: false,
  resetFailed: false,
};

test('authReducer', () => {
  let state;
  state = authReducer(initState, { type: LOGIN_REQUEST });
  expect(state).toEqual({
    ...initState,
    name: '',
    email: '',
    loginRequest: true,
  });
  state = authReducer(initState, {
    type: LOGIN_SUCCESS,
    data: {
      user: { email: 'test@test.dr', name: 'test' },
    },
  });
  expect(state).toEqual({
    ...initState,
    name: 'test',
    email: 'test@test.dr',
    loginRequest: false,
    loginFailed: false,
  });
  state = authReducer(initState, {
    type: LOGIN_ERROR,
  });
  expect(state).toEqual({
    ...initState,
    loginRequest: false,
    loginFailed: true,
  });

  state = authReducer(initState, { type: REGISTER_REQUEST });
  expect(state).toEqual({
    ...initState,
    registerRequest: true,
  });
  state = authReducer(initState, {
    type: REGISTER_SUCCESS,
    data: {
      user: { email: 'test@test.dr', name: 'test' },
    },
  });
  expect(state).toEqual({
    ...initState,
    name: 'test',
    email: 'test@test.dr',
    registerRequest: false,
    registerFailed: false,
  });
  state = authReducer(initState, {
    type: REGISTER_ERROR,
  });
  expect(state).toEqual({
    ...initState,
    registerRequest: false,
    registerFailed: true,
  });

  state = authReducer(initState, { type: FORGOT_PASSWORD_REQUEST });
  expect(state).toEqual({
    ...initState,
    forgotRequest: true,
    isResetPassword: false,
  });
  state = authReducer(initState, {
    type: FORGOT_PASSWORD_SUCCESS,
  });
  expect(state).toEqual({
    ...initState,
    forgotRequest: false,
    isResetPassword: true,
    forgotFailed: false,
  });
  state = authReducer(initState, {
    type: FORGOT_PASSWORD_ERROR,
  });
  expect(state).toEqual({
    ...initState,
    forgotRequest: false,
    isResetPassword: false,
    forgotFailed: true,
  });

  state = authReducer(initState, { type: RESET_PASSWORD_REQUEST });
  expect(state).toEqual({
    ...initState,
    resetRequest: true,
  });
  state = authReducer(initState, {
    type: RESET_PASSWORD_SUCCESS,
  });
  expect(state).toEqual({
    ...initState,
    resetRequest: false,
    resetFailed: false,
  });
  state = authReducer(initState, {
    type: RESET_PASSWORD_ERROR,
  });
  expect(state).toEqual({
    ...initState,
    resetRequest: false,
    resetFailed: true,
  });

  state = authReducer(initState, { type: LOGOUT_REQUEST });
  expect(state).toEqual({
    ...initState,
    registerRequest: true,
  });
  state = authReducer(initState, {
    type: LOGOUT_SUCCESS,
  });
  expect(state).toEqual(initState);
  state = authReducer(initState, {
    type: LOGOUT_ERROR,
  });
  expect(state).toEqual({
    ...initState,
    logoutRequest: false,
    logoutFailed: true,
  });

  state = authReducer(initState, { type: TOKEN_REQUEST });
  expect(state).toEqual({
    ...initState,
    tokenRequest: true,
  });
  state = authReducer(initState, {
    type: TOKEN_SUCCESS,
  });
  expect(state).toEqual({
    ...initState,
    tokenUpdate: true,
    tokenRequest: false,
    tokenFailed: false,
  });
  state = authReducer(initState, {
    type: TOKEN_ERROR,
  });
  expect(state).toEqual({
    ...initState,
    tokenRequest: false,
    tokenUpdate: false,
    tokenFailed: true,
  });

  state = authReducer(initState, { type: USER_UPDATE_REQUEST });
  expect(state).toEqual({
    ...initState,
    updateUserRequest: true,
  });
  state = authReducer(initState, {
    type: USER_UPDATE_SUCCESS,
    data: {
      user: { email: 'test@test.dr', name: 'test' },
    },
  });
  expect(state).toEqual({
    ...initState,
    name: 'test',
    email: 'test@test.dr',
    updateUserRequest: false,
    updateUserFailed: false,
  });
  state = authReducer(initState, {
    type: USER_UPDATE_ERROR,
  });
  expect(state).toEqual({
    ...initState,
    updateUserRequest: false,
    updateUserFailed: true,
  });

  state = authReducer(initState, { type: USER_REQUEST });
  expect(state).toEqual({
    ...initState,
    userRequest: true,
  });
  state = authReducer(initState, {
    type: USER_SUCCESS,
    data: {
      user: { email: 'test@test.dr', name: 'test' },
    },
  });
  expect(state).toEqual({
    ...initState,
    name: 'test',
    email: 'test@test.dr',
    userRequest: false,
    userFailed: false,
  });
  state = authReducer(initState, {
    type: USER_ERROR,
  });
  expect(state).toEqual({
    ...initState,
    userRequest: false,
    userFailed: true,
  });
});
