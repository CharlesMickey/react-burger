import { combineReducers } from 'redux';
import { ingredientReducer, orderReducer } from './ingredients';

export const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  order: orderReducer,
});
