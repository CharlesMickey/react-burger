import { AnyAction, MiddlewareAPI } from 'redux';
import { getCookie } from '../../utils/function';
import { TWsActions } from '../type/socket';

export const socketMiddleware =
  (wsUrl: string, wsActions: TWsActions, auth: boolean) =>
  (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    return (next: (item: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;
      const token = auth ? getCookie('token') : null;
      if (type === wsInit) {
        socket = token
          ? new WebSocket(`${wsUrl}?token=${token}`)
          : new WebSocket(`${wsUrl}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === onClose) {
          socket.close();
        }

        if (type === wsSendMessage) {
          const message = token ? { ...payload, token: token } : { ...payload };
          socket.send(JSON.stringify(message));
        }
      }
      next(action);
    };
  };
