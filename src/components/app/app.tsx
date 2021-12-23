import React, { memo, useEffect } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import MainPage from '../../pages/main-page/main-page';
import styleApp from './app.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { CONSTANTS } from '../../utils/constants';
import { useDispatch, useSelector } from '../../services/type/hooks';
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
import FeedPage from '../../pages/feed-page/feed-page';
import Order from '../order/order';

function App() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const orderModal: boolean = useSelector(modalSelectors.orderModalOpen);

  const closeAllPopups = React.useCallback(() => {
    dispatch({ type: DEL_VIEWED_INGREDIENT });
    dispatch({ type: CLEAR_ORDER_NUMBER });
  }, [dispatch]);

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const background = location.state?.background;

  return (
    <div className={styleApp.app}>
      <AppHeader />
      <Switch location={background || location}>
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
        <Route path='/feed' exact={true}>
          <FeedPage />
        </Route>
        <Route path='/feed/:id' exact={true}>
          <Order />
        </Route>
        <ProtectedRoute path='/profile/orders/:id' exact={true}>
          <Order />
        </ProtectedRoute>
        <ProtectedRoute path='/profile' exact={false}>
          <Profile />
        </ProtectedRoute>
        <Route path='/ingredients/:id' exact={true}>
          <IngredientDetails title={CONSTANTS.TITLE_PAGE} />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
      {orderModal && (
        <Modal close={closeAllPopups} title={CONSTANTS.EMPTY_TITLE}>
          <OrderDetails />
        </Modal>
      )}
      {background && (
        <>
          <Route path='/ingredients/:id' exact={true}>
            <Modal close={goBack} title={CONSTANTS.TITLE}>
              <IngredientDetails />
            </Modal>
          </Route>
          <ProtectedRoute path='/profile/orders/:id' exact={true}>
            <Modal close={goBack}>
              <Order />
            </Modal>
          </ProtectedRoute>
          <Route path='/feed/:id' exact={true}>
            <Modal close={goBack}>
              <Order />
            </Modal>
          </Route>
        </>
      )}
    </div>
  );
}

export default memo(App);
