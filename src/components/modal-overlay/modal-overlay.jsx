import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styleOverlay from './modal-overlay.module.css';

function ModalOverlay({ children, closeAllPopups }) {
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
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  closeAllPopups: PropTypes.func.isRequired,
};
