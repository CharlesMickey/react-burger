import React from 'react';
import PropTypes from 'prop-types';
import styleOverlay from './modal-overlay.module.css';

function ModalOverlay({ isOpen, children }) {
  return (
    <div
      className={`popup ${styleOverlay.overlay} ${
        isOpen ? styleOverlay.popup_opened : ''
      }`}
    >
      {children}
    </div>
  );
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};