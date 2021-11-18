import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from '../actions';

const initState = {
  name: '',
  email: '',
  password: '',
  forgotRequest: false,
  forgotFailed: false,

  resetRequest: false,
  resetFailed: false,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return { ...state, forgotRequest: true };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotRequest: false,
        forgotFailed: false,
      };
    }
    case FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
        forgotRequest: false,
        forgotFailed: true,
      };
    }

    case RESET_PASSWORD_REQUEST: {
      return { ...state, resetRequest: true };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetRequest: false,
        resetFailed: false,
      };
    }
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        resetRequest: false,
        resetFailed: true,
      };
    }
    default:
      return state;
  }
};
