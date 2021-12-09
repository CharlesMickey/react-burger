import React, { FC, SyntheticEvent, useEffect } from 'react';
import styleOverlay from './modal-overlay.module.css';
import { TModalOverlay } from './type';

const ModalOverlay: FC<TModalOverlay> = ({ children, closeAllPopups }) => {
  function closePopupClickOnOverlay(e: SyntheticEvent) {
    const element = e.target as Element;
    if (element.matches('.popup')) {
      closeAllPopups();
    }
  }

  function closePopupEsc(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closePopupEsc);
    return () => document.removeEventListener('keydown', closePopupEsc);
  });

  return (
    <div
      onClick={closePopupClickOnOverlay}
      className={`popup ${styleOverlay.overlay} ${styleOverlay.popup_opened}`}
    >
      {children}
    </div>
  );
};

export default ModalOverlay;
