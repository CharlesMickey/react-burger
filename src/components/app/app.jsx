import React, { memo } from 'react';

import AppHeader from '../app-header/app-header';
import * as api from '../../utils/api';
import MainPage from '../main-page/main-page';
import styleApp from './app.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details ';
import { MESSAGE } from '../../utils/constants';

function App() {
  const [allIngredients, setAllIngredients] = React.useState([]);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = React.useState(false);
  const [isIngredientDetails, setIsIngredientDetails] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  function closeAllPopups() {
    setIsOrderDetailsOpen(false);
    setIsIngredientDetails(false);
  }

  function handleOrderDetailsClick() {
    setIsOrderDetailsOpen(true);
  }

  function handleIngredientDetailsClick() {
    setIsIngredientDetails(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  React.useLayoutEffect(() => {
    api
      .getData()
      .then((res) => {
        return setAllIngredients(res.data);
      })
      .catch((err) => console.log(`${err}`));
  }, []);

  const bun = allIngredients.filter((i) => i.type === 'bun');
  const main = allIngredients.filter((i) => i.type === 'main');
  const sauce = allIngredients.filter((i) => i.type === 'sauce');

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
      <MainPage
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
        <OrderDetails />
      </Modal>
      <Modal
        isOpen={isIngredientDetails}
        closePopup={closeAllPopups}
        title={MESSAGE.TITLE}
      >
        <IngredientDetails card={selectedCard} />
      </Modal>
    </div>
  );
}

export default memo(App);
