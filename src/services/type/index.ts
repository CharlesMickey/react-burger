import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import { TAuthActions } from './../actions/auth';
import { store } from '../../store';
import { TOrderActions } from '../actions/order';
import { TIngredientsActions } from '../actions/ingredients';
import { TWSActions } from '../actions/wsActions';
import { TWSActionsAuth } from '../actions/wsActionsAuth';
export * from './data';

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
  | TOrderActions
  | TAuthActions
  | TIngredientsActions
  | TWSActions
  | TWSActionsAuth;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
export type AppDispatch = Dispatch<TApplicationActions>;
