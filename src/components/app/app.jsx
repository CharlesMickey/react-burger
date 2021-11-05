import React, { memo } from 'react';

import AppHeader from '../app-header/app-header';
import MainPage from '../main-page/main-page';
import styleApp from './app.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details ';
import { MESSAGE } from '../../utils/constants';
import {
  DEL_VIEWED_INGREDIENT,
  CLEAR_ORDER_NUMBER,
} from '../../services/actions';
import { useDispatch, useSelector } from 'react-redux';
import { modalSelectors } from '../../services/selectors';

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

  function closePopupClickOnOverlay(e) {
    if (e.target.matches('.popup')) {
      closeAllPopups();
    }
  }

  function closePopupEsc(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  return (
    <div
      tabIndex='0'
      onKeyDown={closePopupEsc}
      onClick={closePopupClickOnOverlay}
      className={styleApp.app}
    >
      <AppHeader />
      <MainPage />
      {orderModal && (
        <Modal closePopup={closeAllPopups} title={MESSAGE.EMPTY_TITLE}>
          <OrderDetails />
        </Modal>
      )}
      {ingredientDetailsModal && (
        <Modal closePopup={closeAllPopups} title={MESSAGE.TITLE}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
}

export default memo(App);
