import React, { memo } from 'react';

import AppHeader from '../app-header/app-header';
import * as api from '../../utils/api';
import MainPage from '../main-page/main-page';
import styleApp from './app.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details ';
import { MESSAGE } from '../../utils/constants';
import { BurgerConstructorContext } from '../../contexts/BurgerConstructorContext';

function App() {
  const [allIngredients, setAllIngredients] = React.useState([]);
  const [orderNumber, setOrderNumber] = React.useState(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = React.useState(false);
  const [isIngredientDetails, setIsIngredientDetails] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const closeAllPopups = React.useCallback(() => {
    setIsOrderDetailsOpen(false);
    setIsIngredientDetails(false);
  }, []);

  const handleOrderDetailsClick = React.useCallback(() => {
    setIsOrderDetailsOpen(true);
  }, []);

  const handleIngredientDetailsClick = React.useCallback(() => {
    setIsIngredientDetails(true);
  }, []);

  const handleCardClick = React.useCallback((card) => {
    setSelectedCard(card);
  }, []);

  React.useLayoutEffect(() => {
    api
      .getData()
      .then((res) => {
        return setAllIngredients(res.data);
      })
      .catch((err) => console.log(`${err}`))
      .finally(() => setIsLoading(false));
  }, []);

  function getOrderNumber(ingredients) {
    api
      .getOrderNumber(ingredients)
      .then(({ order }) => {
        setOrderNumber(order.number);
      })
      .catch((err) => console.log(`${err}`));
  }

  const bun = React.useMemo(
    () => allIngredients.filter((i) => i.type === 'bun'),
    [allIngredients]
  );

  const main = React.useMemo(
    () => allIngredients.filter((i) => i.type === 'main'),
    [allIngredients]
  );

  const sauce = React.useMemo(
    () => allIngredients.filter((i) => i.type === 'sauce'),
    [allIngredients]
  );

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
      value={{ getOrderNumber, allIngredients }}
    >
      <div
        tabIndex='0'
        onKeyDown={closePopupEsc}
        onClick={closePopupClickOnOverlay}
        className={styleApp.app}
      >
        <AppHeader />
        <MainPage
          isLoading={isLoading}
          openOrderDetails={handleOrderDetailsClick}
          openIngredientDetails={handleIngredientDetailsClick}
          onCardClick={handleCardClick}
          bun={bun}
          main={main}
          sauce={sauce}
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
          <IngredientDetails card={selectedCard} />
        </Modal>
      </div>
    </BurgerConstructorContext.Provider>
  );
}

export default memo(App);
