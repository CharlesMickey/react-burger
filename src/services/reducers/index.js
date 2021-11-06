import { combineReducers } from 'redux';
import { ingredientReducer } from './ingredients';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  order: orderReducer,
});
