import {
  GET_ORDER_ERROR,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  CLEAR_CONSTRUCTOR_INGREDIENTS,
} from '.';
import { getOrderOfNumber } from '../../utils/api';

export function getOrder(listId) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrderOfNumber(listId)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            orderData: res,
          });
          dispatch({
            type: CLEAR_CONSTRUCTOR_INGREDIENTS,
          });
        } else {
          dispatch({
            type: GET_ORDER_ERROR,
          });
        }
      })
      .catch(() =>
        dispatch({
          type: GET_ORDER_ERROR,
        })
      );
  };
}