import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  GET_VIEWED_INGREDIENT,
  GET_ORDER_ERROR,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from './actions-type';
import { getData, getOrderOfNumber } from '../../utils/api';

export function getViewedIngredient(card) {
  return function (dispatch) {
    dispatch({
      type: GET_VIEWED_INGREDIENT,
      item: card,
    });
  };
}

export function getItems() {
  return function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    getData().then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data,
        });
      } else {
        dispatch({
          type: GET_ITEMS_ERROR,
        });
      }
    });
  };
}

export function getOrder(listId) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrderOfNumber(listId).then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          orderData: res,
        });
      } else {
        dispatch({
          type: GET_ORDER_ERROR,
        });
      }
    });
  };
}
