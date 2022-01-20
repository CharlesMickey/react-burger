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

describe('authReducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initState);
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(
      authReducer(initState, {
        type: types.LOGIN_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        name: '',
        email: '',
        loginRequest: true,
      })
    );
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      authReducer(initState, {
        type: types.LOGIN_SUCCESS,
        data: {
          user: { email: 'test@test.dr', name: 'test' },
        },
      })
    ).toEqual(
      expect.objectContaining({
        ...initState,
        name: 'test',
        email: 'test@test.dr',
        loginRequest: false,
        loginFailed: false,
      })
    );
  });

  it('should handle LOGIN_ERROR', () => {
    expect(
      authReducer(initState, {
        type: types.LOGIN_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initState,
        loginRequest: false,
        loginFailed: true,
      })
    );
  });

  it('should handle REGISTER_REQUEST', () => {
    expect(
      authReducer(initState, {
        type: types.REGISTER_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        ...initState,
        registerRequest: true,
      })
    );
  });

  it('should handle REGISTER_SUCCESS', () => {
    expect(
      authReducer(initState, {
        type: types.REGISTER_SUCCESS,
        data: {
          user: { email: 'test@test.dr', name: 'test' },
        },
      })
    ).toEqual(
      expect.objectContaining({
        ...initState,
        name: 'test',
        email: 'test@test.dr',
        registerRequest: false,
        registerFailed: false,
      })
    );
  });

  it('should handle REGISTER_ERROR', () => {
    expect(
      authReducer(initState, {
        type: types.REGISTER_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initState,
        registerRequest: false,
        registerFailed: true,
      })
    );
  });

  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    expect(
      authReducer(initState, { type: types.FORGOT_PASSWORD_REQUEST })
    ).toEqual(
      expect.objectContaining({
        ...initState,
        forgotRequest: true,
        isResetPassword: false,
      })
    );
  });

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    expect(
      authReducer(initState, {
        type: types.FORGOT_PASSWORD_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        ...initState,
        forgotRequest: false,
        isResetPassword: true,
        forgotFailed: false,
      })
    );
  });

  it('should handle FORGOT_PASSWORD_ERROR', () => {
    expect(
      authReducer(initState, {
        type: types.FORGOT_PASSWORD_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initState,
        forgotRequest: false,
        isResetPassword: false,
        forgotFailed: true,
      })
    );
  });

  it('should handle RESET_PASSWORD_REQUEST', () => {
    expect(
      authReducer(initState, { type: types.RESET_PASSWORD_REQUEST })
    ).toEqual(
      expect.objectContaining({
        ...initState,
        resetRequest: true,
      })
    );
  });

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    expect(
      authReducer(initState, {
        type: types.RESET_PASSWORD_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        ...initState,
        resetRequest: false,
        resetFailed: false,
      })
    );
  });

  it('should handle RESET_PASSWORD_ERROR', () => {
    expect(
      authReducer(initState, {
        type: types.RESET_PASSWORD_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initState,
        resetRequest: false,
        resetFailed: true,
      })
    );
  });

  it('should handle LOGOUT_REQUEST', () => {
    expect(authReducer(initState, { type: types.LOGOUT_REQUEST })).toEqual(
      expect.objectContaining({
        ...initState,
        registerRequest: true,
      })
    );
  });

  it('should handle LOGOUT_SUCCESS', () => {
    expect(
      authReducer(initState, {
        type: types.LOGOUT_SUCCESS,
      })
    ).toEqual(expect.objectContaining(initState));
  });

  it('should handle LOGOUT_ERROR', () => {
    expect(
      authReducer(initState, {
        type: types.LOGOUT_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initState,
        logoutRequest: false,
        logoutFailed: true,
      })
    );
  });

  it('should handle TOKEN_REQUEST', () => {
    expect(authReducer(initState, { type: types.TOKEN_REQUEST })).toEqual(
      expect.objectContaining({
        ...initState,
        tokenRequest: true,
      })
    );
  });

  it('should handle TOKEN_SUCCESS', () => {
    expect(
      authReducer(initState, {
        type: types.TOKEN_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        ...initState,
        tokenUpdate: true,
        tokenRequest: false,
        tokenFailed: false,
      })
    );
  });

  it('should handle TOKEN_ERROR', () => {
    expect(
      authReducer(initState, {
        type: types.TOKEN_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initState,
        tokenRequest: false,
        tokenUpdate: false,
        tokenFailed: true,
      })
    );
  });

  it('should handle USER_UPDATE_REQUEST', () => {
    expect(authReducer(initState, { type: types.USER_UPDATE_REQUEST })).toEqual(
      expect.objectContaining({
        ...initState,
        updateUserRequest: true,
      })
    );
  });

  it('should handle USER_UPDATE_SUCCESS', () => {
    expect(
      authReducer(initState, {
        type: types.USER_UPDATE_SUCCESS,
        data: {
          user: { email: 'test@test.dr', name: 'test' },
        },
      })
    ).toEqual(
      expect.objectContaining({
        ...initState,
        name: 'test',
        email: 'test@test.dr',
        updateUserRequest: false,
        updateUserFailed: false,
      })
    );
  });

  it('should handle USER_UPDATE_ERROR', () => {
    expect(
      authReducer(initState, {
        type: types.USER_UPDATE_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initState,
        updateUserRequest: false,
        updateUserFailed: true,
      })
    );
  });

  it('should handle USER_REQUEST', () => {
    expect(authReducer(initState, { type: types.USER_REQUEST })).toEqual(
      expect.objectContaining({
        ...initState,
        userRequest: true,
      })
    );
  });

  it('should handle USER_SUCCESS', () => {
    expect(
      authReducer(initState, {
        type: types.USER_SUCCESS,
        data: {
          user: { email: 'test@test.dr', name: 'test' },
        },
      })
    ).toEqual(
      expect.objectContaining({
        ...initState,
        name: 'test',
        email: 'test@test.dr',
        userRequest: false,
        userFailed: false,
      })
    );
  });

  it('should handle USER_ERROR', () => {
    expect(
      authReducer(initState, {
        type: types.USER_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initState,
        userRequest: false,
        userFailed: true,
      })
    );
  });
});
