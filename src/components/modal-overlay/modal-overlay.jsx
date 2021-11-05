import React from 'react';
import PropTypes from 'prop-types';
import styleOverlay from './modal-overlay.module.css';

function ModalOverlay({ children }) {
  return (
    <div
      className={`popup ${styleOverlay.overlay} ${styleOverlay.popup_opened}`}
    >
      {children}
    </div>
  );
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
};
