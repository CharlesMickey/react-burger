import {
  GET_ORDER_ERROR,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  CLEAR_ORDER_NUMBER,
} from '../actions';
import { TOrderActions } from '../actions/order';

type TInitialOrderState = {
  orderName: string | null;
  orderNumber: number | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

const initialOrderState: TInitialOrderState = {
  orderName: null,
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (
  state = initialOrderState,
  action: TOrderActions
): TInitialOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      }; 
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderName: action.orderData.name,
        orderNumber: action.orderData.order.number,
        orderRequest: false,
      };
    }
    case GET_ORDER_ERROR: {
      return { ...state, orderFailed: true, orderRequest: false };
    }

    case CLEAR_ORDER_NUMBER: {
      return {
        orderName: null,
        orderNumber: null,
        orderRequest: false,
        orderFailed: false,
      };
    }

    default:
      return state;
  }
};
