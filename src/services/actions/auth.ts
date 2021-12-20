import { AppThunk, AppDispatch } from './../type/index';
import { TUserData, TUserDataWithToken } from './../type/data';
import { TFuncVoid, TNewPasswordApi } from './../../utils/type-constants';
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

export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordError {
  readonly type: typeof FORGOT_PASSWORD_ERROR;
}

export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordError {
  readonly type: typeof RESET_PASSWORD_ERROR;
}

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly data: TUserDataWithToken;
}

export interface ILoginError {
  readonly type: typeof LOGIN_ERROR;
}

export interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
  readonly data: TUserDataWithToken;
}

export interface IRegisterError {
  readonly type: typeof REGISTER_ERROR;
}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutError {
  readonly type: typeof LOGOUT_ERROR;
}

export interface ITokenRequest {
  readonly type: typeof TOKEN_REQUEST;
}

export interface ITokenSuccess {
  readonly type: typeof TOKEN_SUCCESS;
}

export interface ITokenError {
  readonly type: typeof TOKEN_ERROR;
}

export interface IUserUpdateRequest {
  readonly type: typeof USER_UPDATE_REQUEST;
}

export interface IUserUpdateSuccess {
  readonly type: typeof USER_UPDATE_SUCCESS;
  readonly data: TUserData;
}

export interface IUserUpdateError {
  readonly type: typeof USER_UPDATE_ERROR;
}

export interface IUserRequest {
  readonly type: typeof USER_REQUEST;
}

export interface IUserSuccess {
  readonly type: typeof USER_SUCCESS;
  readonly data: TUserData;
}

export interface IUserError {
  readonly type: typeof USER_ERROR;
}

export type TAuthActions =
  | IForgotPasswordRequest
  | IForgotPasswordSuccess
  | IForgotPasswordError
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordError
  | ILoginRequest
  | ILoginSuccess
  | ILoginError
  | IRegisterRequest
  | IRegisterSuccess
  | IRegisterError
  | ILogoutRequest
  | ILogoutSuccess
  | ILogoutError
  | ITokenRequest
  | ITokenSuccess
  | ITokenError
  | IUserUpdateRequest
  | IUserUpdateSuccess
  | IUserUpdateError
  | IUserRequest
  | IUserSuccess
  | IUserError;

export const logout: AppThunk = (goLogin: TFuncVoid) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    logOut()
      .then((res) => {
        if (res && res.success) {
          signOut();
          dispatch({ type: LOGOUT_SUCCESS });
          goLogin();
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

export const getNewAccessToken: AppThunk = () => {
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

export const updateUserProfile: AppThunk = ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
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

export const getUserProfile: AppThunk = () => {
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

export const registerAction: AppThunk = ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: REGISTER_REQUEST });
    register({ name, email, password })
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

export const authorize: AppThunk = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: LOGIN_REQUEST });
    login({ email, password })
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

export const forgotPassword: AppThunk = (
  email: string,
  goResetPassword: TFuncVoid
) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    getCodeChangePassword(email)
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: FORGOT_PASSWORD_SUCCESS });
          goResetPassword();
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

export const savePassword: AppThunk = (
  data: TNewPasswordApi,
  goMainPage: TFuncVoid
) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    saveNewPassword(data)
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: RESET_PASSWORD_SUCCESS });
          goMainPage();
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
