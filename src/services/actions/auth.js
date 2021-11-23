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
} from '.';
import {
  getCodeChangePassword,
  saveNewPassword,
  login,
  register,
  getNewToken,
  logOut,
  getUserInfo,
  updateUserInfo,
} from '../../utils/api';
import { getTokens, signOut } from '../../utils/function';

export const logout = (goLogin) => {
  return function (dispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    logOut()
      .then((res) => {
        if (res && res.success) {
          signOut();
          dispatch({ type: LOGOUT_SUCCESS });
          goLogin()
        } else {
          dispatch({ type: LOGOUT_ERROR });
        }
      })
      .catch((err) => {
        console.log(err, err.message);
        dispatch({ type: LOGOUT_ERROR });
      });
  };
};

export const getNewAccessToken = () => {
  return function (dispatch) {
    dispatch({ type: TOKEN_REQUEST });
    getNewToken()
      .then((res) => {
        getTokens(res);
        if (res && res.success) {
          dispatch({ type: TOKEN_SUCCESS });
        } else {
          dispatch({ type: TOKEN_ERROR });
        }
      })
      .catch((err) => {
        if (err.message === 'Token is invalid') {
          dispatch(getNewAccessToken());
        } else console.log(err, err.message);
        dispatch({ type: TOKEN_ERROR });
      });
  };
};

export const updateUserProfile = ({ name, email, password }) => {
  return function (dispatch) {
    dispatch({ type: USER_UPDATE_REQUEST });
    updateUserInfo({ name, email, password })
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: USER_UPDATE_SUCCESS, data: res });
        } else {
          dispatch({ type: USER_UPDATE_ERROR });
        }
      })
      .catch((err) => {
        if (
          err.message === 'jwt expired' ||
          err.message === 'Token is invalid'
        ) {
          dispatch(getNewAccessToken());
          dispatch(updateUserProfile({ name, email, password }));
        }

        dispatch({ type: USER_UPDATE_ERROR });
      });
  };
};

export const getUserProfile = () => {
  return function (dispatch) {
    dispatch({ type: USER_REQUEST });

    getUserInfo()
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: USER_SUCCESS, data: res });
        } else {
          dispatch({ type: USER_ERROR });
        }
      })
      .catch((err) => {
        if (
          err.message === 'jwt expired' ||
          err.message === 'Token is invalid'
        ) {
          dispatch(getNewAccessToken());
          dispatch(getUserProfile());
        } else console.log(err.message);
        dispatch({ type: USER_ERROR });
      });
  };
};

export const registerAction = (name, email, password) => {
  return function (dispatch) {
    dispatch({ type: REGISTER_REQUEST });
    register(name, email, password)
      .then((res) => {
        getTokens(res);
        if (res && res.success) {
          dispatch({ type: REGISTER_SUCCESS, data: res });
        } else {
          dispatch({ type: REGISTER_ERROR });
        }
      })
      .catch((err) => {
        console.log(err, err.message);
        dispatch({ type: REGISTER_ERROR });
      });
  };
};

export const authorize = (email, password) => {
  return function (dispatch) {
    dispatch({ type: LOGIN_REQUEST });
    login(email, password)
      .then((res) => {
        getTokens(res);
        if (res && res.success) {
          dispatch({ type: LOGIN_SUCCESS, data: res });
        } else {
          dispatch({ type: LOGIN_ERROR });
        }
      })
      .catch((err) => {
        console.log(err, err.message);
        dispatch({ type: LOGIN_ERROR });
      });
  };
};

export const forgotPassword = (email, goResetPassword) => {
  return function (dispatch) {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    getCodeChangePassword(email)
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: FORGOT_PASSWORD_SUCCESS });
          goResetPassword()
        } else {
          dispatch({ type: FORGOT_PASSWORD_ERROR });
        }
      })
      .catch((err) => {
        console.log(err, err.message);
        dispatch({ type: FORGOT_PASSWORD_ERROR });
      });
  };
};

export const savePassword = (data, goMainPage) => {
  console.log(data, goMainPage)
  return function (dispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    saveNewPassword(data)
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: RESET_PASSWORD_SUCCESS });
          goMainPage()
        } else {
          dispatch({ type: RESET_PASSWORD_ERROR });
        }
      })
      .catch((err) => {
        console.log(err, err.message);
        dispatch({ type: RESET_PASSWORD_ERROR });
      });
  };
};
