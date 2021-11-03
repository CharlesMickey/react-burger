import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  GET_VIEWED_INGREDIENT,
  DEL_VIEWED_INGREDIENT,
} from '../actions/actions-type';

const initialIngredientState = {
  allIngredients: [],
  itemsRequest: false,
  itemsFailed: false,

  viewedIngredient: null,
};

export const ingredientReducer = (state = initialIngredientState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        allIngredients: action.items,
        itemsRequest: false,
      };
    }
    case GET_ITEMS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }

    case GET_VIEWED_INGREDIENT: {
      return { ...state, viewedIngredient: action.item };
    }

    case DEL_VIEWED_INGREDIENT: {
      return { ...state, viewedIngredient: null };
    }

    default:
      return state;
  }
};
