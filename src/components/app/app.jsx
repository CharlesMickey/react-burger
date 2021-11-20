import React, { memo, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import MainPage from '../../pages/main-page/main-page';
import styleApp from './app.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details ';
import { MESSAGE } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { modalSelectors } from '../../services/selectors';
import { getItems } from '../../services/actions/ingredients';
import {
  CLEAR_ORDER_NUMBER,
  DEL_VIEWED_INGREDIENT,
} from '../../services/actions';
import { Login } from '../../pages/login/login';
import { Register } from '../../pages/register/register';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { ResetPassword } from '../../pages/reset-password/reset-password';
import { Profile } from '../../pages/profile/profile';
import ProtectedRoute from '../protected-route/protected-route';
import { Page404 } from '../../pages/404/page-404';

function App() {
  const dispatch = useDispatch();
  const orderModal = useSelector(modalSelectors.orderModalOpen);
  const ingredientDetailsModal = useSelector(
    modalSelectors.ingredientModalOpen
  );

  const closeAllPopups = React.useCallback(() => {
    dispatch({ type: DEL_VIEWED_INGREDIENT });
    dispatch({ type: CLEAR_ORDER_NUMBER });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <div className={styleApp.app}>
      <AppHeader />
      <Switch>
        <Route path='/login' exact={true}>
          <Login />
        </Route>
        <Route path='/register' exact={true}>
          <Register />
        </Route>
        <Route path='/forgot-password' exact={true}>
          <ForgotPassword />
        </Route>
        <Route path='/reset-password' exact={true}>
          <ResetPassword />
        </Route>
        <Route path='/' exact={true}>
          <MainPage />
        </Route>
        <ProtectedRoute path='/profile' exact={false}>
          <Profile />
        </ProtectedRoute>
        <Route>
          <Page404 />
        </Route>
      </Switch>
      {orderModal && (
        <Modal close={closeAllPopups} title={MESSAGE.EMPTY_TITLE}>
          <OrderDetails />
        </Modal>
      )}
      {ingredientDetailsModal && (
        <Modal close={closeAllPopups} title={MESSAGE.TITLE}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
}

export default memo(App);
