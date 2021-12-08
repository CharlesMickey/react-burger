import {
  GET_ORDER_ERROR,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  CLEAR_ORDER_NUMBER,
  ORDER_DETAILS_OPEN,
} from '../actions';

const initialOrderState = {
  orderName: null,
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  orderModalOpen: false,
};

export const orderReducer = (state = initialOrderState, action) => {
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
      return { state, orderModalOpen: false };
    }

    case ORDER_DETAILS_OPEN: {
      return { ...state, orderModalOpen: true };
    }

    default:
      return state;
  }
};
