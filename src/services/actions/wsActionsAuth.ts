import { PayloadAction } from '@reduxjs/toolkit';
import {
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_GET_MESSAGE_AUTH,
  WS_SEND_MESSAGE_AUTH,
} from '.';
import { TWSData } from '../type/socket';

export const wsActionsAuth = {
  wsInit: WS_CONNECTION_START_AUTH,
  wsSendMessage: WS_SEND_MESSAGE_AUTH,
  onOpen: WS_CONNECTION_SUCCESS_AUTH,
  onClose: WS_CONNECTION_CLOSED_AUTH,
  onError: WS_CONNECTION_ERROR_AUTH,
  onMessage: WS_GET_MESSAGE_AUTH,
};

export interface IWSStartAuth {
  readonly type: typeof WS_CONNECTION_START_AUTH;
}

export interface IWSSuccessAuth {
  readonly type: typeof WS_CONNECTION_SUCCESS_AUTH;
  readonly payload: PayloadAction;
}

export interface IWSErrorAuth {
  readonly type: typeof WS_CONNECTION_ERROR_AUTH;
  readonly payload: PayloadAction;
}

export interface IWSClosedAuth {
  readonly type: typeof WS_CONNECTION_CLOSED_AUTH;
  readonly payload: PayloadAction;
}

export interface IWSGetMessageAuth {
  readonly type: typeof WS_GET_MESSAGE_AUTH;
  readonly payload: TWSData;
}

export interface IWSSendMessageAuth {
  readonly type: typeof WS_SEND_MESSAGE_AUTH;
}

export type TWSActionsAuth =
  | IWSStartAuth
  | IWSSuccessAuth
  | IWSErrorAuth
  | IWSClosedAuth
  | IWSGetMessageAuth
  | IWSSendMessageAuth;
