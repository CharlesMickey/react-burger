import { AppThunk } from './../type/index';
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  GET_VIEWED_INGREDIENT,
  ADD_INGREDIENT_CONSTRUCTOR,
  DEL_INGREDIENT_CONSTRUCTOR,
  INCREASE_INGREDIENTS,
  REDUCE_INGREDIENTS,
  DRAG_CONSTRUCTOR_INGREDIENT,
  CLEAR_CONSTRUCTOR_INGREDIENTS,
} from './actions-ingredients-type';
import { getData } from '../../utils/api';
import {
  ITypeIngredient,
  TIngredientWithUniqueId,
} from '../../utils/type-constants';
import { AppDispatch } from '../type';

export interface IGetItemsRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetItemsSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: Array<ITypeIngredient>;
}

export interface IGetItemsError {
  readonly type: typeof GET_ITEMS_ERROR;
}

export interface IGetViewedIngredient {
  readonly type: typeof GET_VIEWED_INGREDIENT;
  readonly item: ITypeIngredient;
}

export interface IAddIngredientConstructor {
  readonly type: typeof ADD_INGREDIENT_CONSTRUCTOR;
  readonly item: TIngredientWithUniqueId;
}

export interface IDelIngredientConstructor {
  readonly type: typeof DEL_INGREDIENT_CONSTRUCTOR;
  readonly id: string;
}

export interface IIncreaseIngredients {
  readonly type: typeof INCREASE_INGREDIENTS;
  readonly id: string;
  readonly typeForCounter: string;
}

export interface IReduceIngredient {
  readonly type: typeof REDUCE_INGREDIENTS;
  readonly id: string;
  readonly typeForCounter: string;
}

export interface IDragConstructorIngredient {
  readonly type: typeof DRAG_CONSTRUCTOR_INGREDIENT;
  dragIndex: number;
  hoverIndex: number;
}

export interface IClearConstructorIngredient {
  readonly type: typeof CLEAR_CONSTRUCTOR_INGREDIENTS;
}

export type TIngredientsActions =
  | IGetItemsRequest
  | IGetItemsSuccess
  | IGetItemsError
  | IGetViewedIngredient
  | IAddIngredientConstructor
  | IDelIngredientConstructor
  | IIncreaseIngredients
  | IReduceIngredient
  | IDragConstructorIngredient
  | IClearConstructorIngredient;

export const getViewedIngredient: AppThunk = (card: ITypeIngredient) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_VIEWED_INGREDIENT,
      item: card,
    });
  };
};

export const getItems: AppThunk = () => {
  return function (dispatch: AppDispatch) {
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
};
