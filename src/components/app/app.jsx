import React, { memo, useEffect } from 'react';

import AppHeader from '../app-header/app-header';
import MainPage from '../main-page/main-page';
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
      <MainPage />
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
