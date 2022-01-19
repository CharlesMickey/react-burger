import * as types from '../actions';
import { orderReducer } from './order';

const initialOrderState = {
  orderName: null,
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
};

test('orderReducer', () => {
  let state;
  state = orderReducer(initialOrderState, { type: types.GET_ORDER_REQUEST });
  expect(state).toEqual({
    ...initialOrderState,
    orderRequest: true,
  });
  state = orderReducer(initialOrderState, {
    type: types.GET_ORDER_SUCCESS,
    orderData: {
      success: true,
      name: 'Флюоресцентный бургер',
      order: {
        name: 'Флюоресцентный бургер',
        number: 1,
      },
    },
  });
  expect(state).toEqual({
    ...initialOrderState,
    orderName: 'Флюоресцентный бургер',
    orderNumber: 1,
    orderRequest: false,
    orderFailed: false,
  });
  state = orderReducer(initialOrderState, { type: types.CLEAR_ORDER_NUMBER });
  expect(state).toEqual({
    ...initialOrderState,
    orderName: null,
    orderNumber: null,
    orderRequest: false,
    orderFailed: false,
  });
});
