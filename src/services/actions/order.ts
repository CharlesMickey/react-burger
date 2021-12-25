import { AppDispatch, AppThunk } from './../type/index';
import { TOrderData } from './../type/data';
import { IClearConstructorIngredient } from './ingredients';
import {
  GET_ORDER_ERROR,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  CLEAR_CONSTRUCTOR_INGREDIENTS,
  CLEAR_ORDER_NUMBER,
} from '.';
import { getOrderOfNumber } from '../../utils/api';

export interface IGetOrderError {
  readonly type: typeof GET_ORDER_ERROR;
}

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderErrorSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly orderData: TOrderData;
}


export interface IClearOrderNumber {
  readonly type: typeof CLEAR_ORDER_NUMBER;
}

export type TOrderActions =
  | IGetOrderError
  | IGetOrderRequest
  | IGetOrderErrorSuccess
  | IClearConstructorIngredient
  | IClearOrderNumber

export const  getOrder: AppThunk = (listId: string[]) => {
  return function (dispatch: AppDispatch) {
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
