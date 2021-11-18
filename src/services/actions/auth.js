import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from '.';
import { getCodeChangePassword, saveNewPassword } from '../../utils/api';

export const forgotPassword = (email) => {
  return function (dispatch) {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    getCodeChangePassword(email)
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: FORGOT_PASSWORD_SUCCESS });
        } else {
          dispatch({ type: FORGOT_PASSWORD_ERROR });
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: FORGOT_PASSWORD_ERROR });
      });
  };
};

export const savePassword = (password, token) => {
    return function (dispatch) {
      dispatch({ type: RESET_PASSWORD_REQUEST });
      saveNewPassword(password, token)
        .then((res) => {
          if (res && res.success) {
            dispatch({ type: RESET_PASSWORD_SUCCESS });
          } else {
            dispatch({ type: RESET_PASSWORD_ERROR });
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: RESET_PASSWORD_ERROR });
        });
    };
  };
