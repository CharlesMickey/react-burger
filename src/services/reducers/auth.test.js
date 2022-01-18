import { authReducer } from './auth';
import * as types from '../actions';

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
  state = authReducer(initState, { type: types.LOGIN_REQUEST });
  expect(state).toEqual({
    ...initState,
    name: '',
    email: '',
    loginRequest: true,
  });
  state = authReducer(initState, {
    type: types.LOGIN_SUCCESS,
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
    type: types.LOGIN_ERROR,
  });
  expect(state).toEqual({
    ...initState,
    loginRequest: false,
    loginFailed: true,
  });

  state = authReducer(initState, { type: types.REGISTER_REQUEST });
  expect(state).toEqual({
    ...initState,
    registerRequest: true,
  });
  state = authReducer(initState, {
    type: types.REGISTER_SUCCESS,
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
    type: types.REGISTER_ERROR,
  });
  expect(state).toEqual({
    ...initState,
    registerRequest: false,
    registerFailed: true,
  });

  state = authReducer(initState, { type: types.FORGOT_PASSWORD_REQUEST });
  expect(state).toEqual({
    ...initState,
    forgotRequest: true,
    isResetPassword: false,
  });
  state = authReducer(initState, {
    type: types.FORGOT_PASSWORD_SUCCESS,
  });
  expect(state).toEqual({
    ...initState,
    forgotRequest: false,
    isResetPassword: true,
    forgotFailed: false,
  });
  state = authReducer(initState, {
    type: types.FORGOT_PASSWORD_ERROR,
  });
  expect(state).toEqual({
    ...initState,
    forgotRequest: false,
    isResetPassword: false,
    forgotFailed: true,
  });

  state = authReducer(initState, { type: types.RESET_PASSWORD_REQUEST });
  expect(state).toEqual({
    ...initState,
    resetRequest: true,
  });
  state = authReducer(initState, {
    type: types.RESET_PASSWORD_SUCCESS,
  });
  expect(state).toEqual({
    ...initState,
    resetRequest: false,
    resetFailed: false,
  });
  state = authReducer(initState, {
    type: types.RESET_PASSWORD_ERROR,
  });
  expect(state).toEqual({
    ...initState,
    resetRequest: false,
    resetFailed: true,
  });

  state = authReducer(initState, { type: types.LOGOUT_REQUEST });
  expect(state).toEqual({
    ...initState,
    registerRequest: true,
  });
  state = authReducer(initState, {
    type: types.LOGOUT_SUCCESS,
  });
  expect(state).toEqual(initState);
  state = authReducer(initState, {
    type: types.LOGOUT_ERROR,
  });
  expect(state).toEqual({
    ...initState,
    logoutRequest: false,
    logoutFailed: true,
  });

  state = authReducer(initState, { type: types.TOKEN_REQUEST });
  expect(state).toEqual({
    ...initState,
    tokenRequest: true,
  });
  state = authReducer(initState, {
    type: types.TOKEN_SUCCESS,
  });
  expect(state).toEqual({
    ...initState,
    tokenUpdate: true,
    tokenRequest: false,
    tokenFailed: false,
  });
  state = authReducer(initState, {
    type: types.TOKEN_ERROR,
  });
  expect(state).toEqual({
    ...initState,
    tokenRequest: false,
    tokenUpdate: false,
    tokenFailed: true,
  });

  state = authReducer(initState, { type: types.USER_UPDATE_REQUEST });
  expect(state).toEqual({
    ...initState,
    updateUserRequest: true,
  });
  state = authReducer(initState, {
    type: types.USER_UPDATE_SUCCESS,
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
    type: types.USER_UPDATE_ERROR,
  });
  expect(state).toEqual({
    ...initState,
    updateUserRequest: false,
    updateUserFailed: true,
  });

  state = authReducer(initState, { type: types.USER_REQUEST });
  expect(state).toEqual({
    ...initState,
    userRequest: true,
  });
  state = authReducer(initState, {
    type: types.USER_SUCCESS,
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
    type: types.USER_ERROR,
  });
  expect(state).toEqual({
    ...initState,
    userRequest: false,
    userFailed: true,
  });
});
