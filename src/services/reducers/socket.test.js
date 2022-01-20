import { wsReducer } from './socket';
import * as types from '../actions';

const initialSocketState = {
  wsConnected: false,
  data: { success: false, orders: [], total: 0, totalToday: 0 },
};

describe('initialSocketState', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {})).toEqual(initialSocketState);
  });

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(
      wsReducer(initialSocketState, {
        type: types.WS_CONNECTION_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialSocketState,
        wsConnected: true,
        error: undefined,
      })
    );
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(
      wsReducer(initialSocketState, {
        type: types.WS_CONNECTION_ERROR,
        payload: "Don't worry the bombs have already taken off",
      })
    ).toEqual(
      expect.objectContaining({
        ...initialSocketState,
        error: "Don't worry the bombs have already taken off",
        wsConnected: false,
      })
    );
  });

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(
      wsReducer(initialSocketState, {
        type: types.WS_CONNECTION_CLOSED,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialSocketState,
        error: undefined,
        wsConnected: false,
      })
    );
  });

  it('should handle WS_GET_MESSAGE', () => {
    expect(
      wsReducer(initialSocketState, {
        type: types.WS_GET_MESSAGE,
        payload: {
          orders: [
            {
              _id: '61e7e6726d7cd8001b2d139c',
              ingredients: [
                '60d3b41abdacab0026a733cd',
                '60d3b41abdacab0026a733cf',
                '60d3b41abdacab0026a733ce',
                '60d3b41abdacab0026a733c9',
                '60d3b41abdacab0026a733cb',
                '60d3b41abdacab0026a733c6',
              ],
              status: 'done',
              name: 'Краторный бессмертный антарианский традиционный-галактический space био-марсианский бургер',
              createdAt: '2022-01-19T10:22:42.400Z',
              updatedAt: '2022-01-19T10:22:42.615Z',
              number: 8420,
            },
          ],
          total: 8333,
          totalToday: 27,
        },
      })
    ).toEqual(
      expect.objectContaining({
        ...initialSocketState,
        error: undefined,
        data: {
          ...initialSocketState.data,
          orders: [
            {
              _id: '61e7e6726d7cd8001b2d139c',
              ingredients: [
                '60d3b41abdacab0026a733cd',
                '60d3b41abdacab0026a733cf',
                '60d3b41abdacab0026a733ce',
                '60d3b41abdacab0026a733c9',
                '60d3b41abdacab0026a733cb',
                '60d3b41abdacab0026a733c6',
              ],
              status: 'done',
              name: 'Краторный бессмертный антарианский традиционный-галактический space био-марсианский бургер',
              createdAt: '2022-01-19T10:22:42.400Z',
              updatedAt: '2022-01-19T10:22:42.615Z',
              number: 8420,
            },
          ],
          total: 8333,
          totalToday: 27,
        },
      })
    );
  });
});
