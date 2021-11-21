import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  GET_VIEWED_INGREDIENT,
} from './actions-ingredients-type';
import { getData } from '../../utils/api';

export function getViewedIngredient(card) {
  return function (dispatch) {
    dispatch({
      type: GET_VIEWED_INGREDIENT,
      item: card,
    });
  };
}

export function getItems() {
  return function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    getData()
      .then((res) => {
        if (res && res.success) {
          !localStorage.ingredients &&
            localStorage.setItem('ingredients', JSON.stringify(res.data));
          dispatch({
            type: GET_ITEMS_SUCCESS,
            items: res.data,
          });
        } else {
          dispatch({
            type: GET_ITEMS_ERROR,
          });
        }
      })
      .catch(() =>
        dispatch({
          type: GET_ITEMS_ERROR,
        })
      );
  };
}
