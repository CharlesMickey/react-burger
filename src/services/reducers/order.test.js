import * as types from '../actions';
import { orderReducer } from './order';

const initialOrderState = {
  orderName: null,
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
};

describe('orderReducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual(initialOrderState);
  });

  it('should handle GET_ORDER_REQUEST', () => {
    expect(
      orderReducer(initialOrderState, { type: types.GET_ORDER_REQUEST })
    ).toEqual(
      expect.objectContaining({
        ...initialOrderState,
        orderRequest: true,
      })
    );
  });

  it('should handle GET_ORDER_SUCCESS', () => {
    expect(
      orderReducer(initialOrderState, {
        type: types.GET_ORDER_SUCCESS,
        orderData: {
          success: true,
          name: 'Флюоресцентный бургер',
          order: {
            name: 'Флюоресцентный бургер',
            number: 1,
          },
        },
      })
    ).toEqual(
      expect.objectContaining({
        ...initialOrderState,
        orderName: 'Флюоресцентный бургер',
        orderNumber: 1,
        orderRequest: false,
        orderFailed: false,
      })
    );
  });

  it('should handle CLEAR_ORDER_NUMBER', () => {
    expect(
      orderReducer(initialOrderState, { type: types.CLEAR_ORDER_NUMBER })
    ).toEqual(
      expect.objectContaining({
        ...initialOrderState,
        orderName: null,
        orderNumber: null,
        orderRequest: false,
        orderFailed: false,
      })
    );
  });
});
