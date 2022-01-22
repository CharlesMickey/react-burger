import { PayloadAction } from '@reduxjs/toolkit';
import { TWSData } from '../type/socket';
import {
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_GET_MESSAGE_AUTH,
} from '../actions';
import { TWSActionsAuth } from '../actions/wsActionsAuth';

type TInitialSocketState = {
  wsConnected: boolean;
  data: TWSData;
  error?: PayloadAction;
};

const initialSocketState: TInitialSocketState = {
  wsConnected: false,
  data: { success: false, orders: [], total: 0, totalToday: 0 },
};

export const wsReducerAuth = (
  state = initialSocketState,
  action: TWSActionsAuth
): TInitialSocketState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_AUTH:
      return {
        ...state,
        wsConnected: true,
        error: undefined,
      };
    case WS_CONNECTION_ERROR_AUTH:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    case WS_CONNECTION_CLOSED_AUTH:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };
    case WS_GET_MESSAGE_AUTH:
      return {
        ...state,
        error: undefined,
        data: {
          ...state.data,
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
        },
      };
    default:
      return state;
  }
};
