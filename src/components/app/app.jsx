import React, { memo } from 'react';

import AppHeader from '../app-header/app-header';
import { getOrderOfNumber } from '../../utils/api';
import MainPage from '../main-page/main-page';
import styleApp from './app.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details ';
import { MESSAGE } from '../../utils/constants';
import { BurgerConstructorContext } from '../../contexts/BurgerConstructorContext';
import { DEL_VIEWED_INGREDIENT } from '../../services/actions/actions-type';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()
  const [orderNumber, setOrderNumber] = React.useState(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = React.useState(false);
  const [isIngredientDetails, setIsIngredientDetails] = React.useState(false);


  const closeAllPopups = React.useCallback(() => {
    dispatch({type: DEL_VIEWED_INGREDIENT})
    setIsOrderDetailsOpen(false);
    setIsIngredientDetails(false);
  }, [dispatch]);

  const handleOrderDetailsClick = React.useCallback(() => {
    setIsOrderDetailsOpen(true);
  }, []);

  const handleIngredientDetailsClick = React.useCallback(() => {
    setIsIngredientDetails(true);
  }, []);


  function getOrderNumber(ingredients) {
    getOrderOfNumber(ingredients)
      .then(({ order }) => {
        setOrderNumber(order.number);
      })
      .catch((err) => console.log(`${err}`));
  }

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
    <BurgerConstructorContext.Provider
      value={{ getOrderNumber }}
    >
      <div
        tabIndex='0'
        onKeyDown={closePopupEsc}
        onClick={closePopupClickOnOverlay}
        className={styleApp.app}
      >
        <AppHeader />
        <MainPage
          
          openOrderDetails={handleOrderDetailsClick}
          openIngredientDetails={handleIngredientDetailsClick}
        />
        <Modal
          isOpen={isOrderDetailsOpen}
          closePopup={closeAllPopups}
          title={MESSAGE.EMPTY_TITLE}
        >
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
        <Modal
          isOpen={isIngredientDetails}
          closePopup={closeAllPopups}
          title={MESSAGE.TITLE}
        >
          <IngredientDetails  />
        </Modal>
      </div>
    </BurgerConstructorContext.Provider>
  );
}

export default memo(App);
