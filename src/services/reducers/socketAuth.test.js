import { wsReducerAuth } from './socketAuth';
import * as types from '../actions';

const initialSocketState = {
  wsConnected: false,
  data: { success: false, orders: [], total: 0, totalToday: 0 },
};

test('initialSocketState', () => {
  let state;
  state = wsReducerAuth(initialSocketState, {
    type: types.WS_CONNECTION_SUCCESS_AUTH,
  });
  expect(state).toEqual({
    ...initialSocketState,
    wsConnected: true,
    error: undefined,
  });
  state = wsReducerAuth(initialSocketState, {
    type: types.WS_CONNECTION_ERROR_AUTH,
    payload: "Don't worry the bombs have already taken off",
  });
  expect(state).toEqual({
    ...initialSocketState,
    error: "Don't worry the bombs have already taken off",
    wsConnected: false,
  });

  state = wsReducerAuth(initialSocketState, {
    type: types.WS_CONNECTION_CLOSED_AUTH,
  });
  expect(state).toEqual({
    ...initialSocketState,
    error: undefined,
    wsConnected: false,
  });

  state = wsReducerAuth(initialSocketState, {
    type: types.WS_GET_MESSAGE_AUTH,
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
  });
  expect(state).toEqual({
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
  });
});
