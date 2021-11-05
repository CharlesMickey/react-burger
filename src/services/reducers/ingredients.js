import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  GET_VIEWED_INGREDIENT,
  DEL_VIEWED_INGREDIENT,
  ADD_INGREDIENT_CONSTRUCTOR,
  DEL_INGREDIENT_CONSTRUCTOR,
  INCREASE_INGREDIENTS,
  REDUCE_INGREDIENTS,
  DRAG_CONSTRUCTOR_INGREDIENT,
  GET_ORDER_ERROR,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  CLEAR_ORDER_NUMBER,
  ORDER_DETAILS_OPEN,
  INGREDIENT_DETAILS_OPEN,
} from '../actions';
const initialIngredientState = {
  allIngredients: [],
  itemsRequest: false,
  itemsFailed: false,

  viewedIngredient: null,
  ingredientModalOpen: false,
  ingredientsConstructor: {
    bun: null,
    ingredient: [],
    counter: {},
  },
};

const initialOrderState = {
  orderName: null,
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  orderModalOpen: false,
};

export const orderReducer = (state = initialOrderState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderName: action.orderData.name,
        orderNumber: action.orderData.order.number,
        orderRequest: false,
      };
    }
    case GET_ORDER_ERROR: {
      return { ...state, orderFailed: true, orderRequest: false };
    }

    case CLEAR_ORDER_NUMBER: {
      return { state };
    }

    case ORDER_DETAILS_OPEN: {
      return { ...state, orderModalOpen: true };
    }

    default:
      return state;
  }
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
    case GET_ITEMS_ERROR: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }

    case GET_VIEWED_INGREDIENT: {
      return { ...state, viewedIngredient: action.item };
    }

    case DEL_VIEWED_INGREDIENT: {
      return { ...state, viewedIngredient: null, ingredientModalOpen: false };
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

    case INGREDIENT_DETAILS_OPEN: {
      return { ...state, ingredientModalOpen: true };
    }

    default:
      return state;
  }
};
