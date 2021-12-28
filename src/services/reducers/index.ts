import { wsReducerAuth } from './socketAuth';
import { combineReducers } from 'redux';
import { ingredientReducer } from './ingredients';
import { orderReducer } from './order';
import { authReducer } from './auth';
import { wsReducer } from './socket';

export const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  order: orderReducer,
  auth: authReducer,
  ws: wsReducer,
  wsAuth: wsReducerAuth,
});
