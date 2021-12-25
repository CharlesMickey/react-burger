import { TIngredientsCounter } from './../type/data';
import { TIngredientsActions } from './../actions/ingredients';
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
} from '../actions';
import {
  ITypeIngredient,
  TIngredientWithUniqueId,
} from '../../utils/type-constants';

type TInitialIngredientState = {
  allIngredients: ITypeIngredient[];
  itemsRequest: boolean;
  itemsFailed: boolean;
  viewedIngredient: ITypeIngredient | null;
  ingredientsConstructor: {
    bun: TIngredientWithUniqueId | null;
    ingredient: TIngredientWithUniqueId[];
    counter: TIngredientsCounter;
  };
};

const initialIngredientState: TInitialIngredientState = {
  allIngredients: [],
  itemsRequest: false,
  itemsFailed: false,
  viewedIngredient: null,
  ingredientsConstructor: {
    bun: null,
    ingredient: [],
    counter: {},
  },
};

export const ingredientReducer = (
  state = initialIngredientState,
  action: TIngredientsActions
): TInitialIngredientState => {
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
    case GET_ITEMS_ERROR: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }

    case GET_VIEWED_INGREDIENT: {
      return { ...state, viewedIngredient: action.item };
    }

    case ADD_INGREDIENT_CONSTRUCTOR: {
      if (action.item.type !== 'bun') {
        return {
          ...state,
          ingredientsConstructor: {
            ...state.ingredientsConstructor,
            ingredient: [
              ...state.ingredientsConstructor.ingredient,
              action.item,
            ],
          },
        };
      }
      return {
        ...state,
        ingredientsConstructor: {
          ...state.ingredientsConstructor,
          bun: action.item,
        },
      };
    }

    case DEL_INGREDIENT_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: {
          ...state.ingredientsConstructor,
          ingredient: [...state.ingredientsConstructor.ingredient].filter(
            (i) => {
              return i.uniqueId !== action.id;
            }
          ),
        },
      };
    }

    case CLEAR_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        ingredientsConstructor: {
          bun: null,
          ingredient: [],
          counter: {},
        },
      };
    }

    case INCREASE_INGREDIENTS: {
      if (action.typeForCounter !== 'bun') {
        return {
          ...state,
          ingredientsConstructor: {
            ...state.ingredientsConstructor,
            counter: {
              ...state.ingredientsConstructor.counter,
              [action.id]: [...state.ingredientsConstructor.ingredient].filter(
                (i) => {
                  return i._id === action.id;
                }
              ).length,
            },
          },
        };
      } else return state;
    }

    case REDUCE_INGREDIENTS: {
      if (action.typeForCounter !== 'bun') {
        return {
          ...state,
          ingredientsConstructor: {
            ...state.ingredientsConstructor,
            counter: {
              ...state.ingredientsConstructor.counter,
              [action.id]: state.ingredientsConstructor.counter[action.id] - 1,
            },
          },
        };
      } else return state;
    }

    case DRAG_CONSTRUCTOR_INGREDIENT: {
      const newListIngredients = [...state.ingredientsConstructor.ingredient];
      const dragIngredient = newListIngredients.splice(action.dragIndex, 1)[0];
      newListIngredients.splice(action.hoverIndex, 0, dragIngredient);
      return {
        ...state,
        ingredientsConstructor: {
          ...state.ingredientsConstructor,
          ingredient: newListIngredients,
        },
      };
    }

    default:
      return state;
  }
};
