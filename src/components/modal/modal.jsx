import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styleModal from './modal.module.css';
import { modalRoot } from '../../utils/constants';
import {
  DEL_VIEWED_INGREDIENT,
  CLEAR_ORDER_NUMBER,
} from '../../services/actions';
import React from 'react';
import { useDispatch } from 'react-redux';

function Modal({ title, children }) {
  const dispatch = useDispatch();
  const closeAllPopups = React.useCallback(() => {
    dispatch({ type: DEL_VIEWED_INGREDIENT });
    dispatch({ type: CLEAR_ORDER_NUMBER });
  }, [dispatch]);

  return ReactDOM.createPortal(
    <ModalOverlay closeAllPopups={closeAllPopups}>
      <div id='modal' className={`${styleModal.modal} pt-10 pl-10 pb-15 pr-10`}>
        <h2 className={`text text_type_main-large ${styleModal.title}`}>
          {title}
        </h2>
        <div onClick={closeAllPopups} className={styleModal.closeIcon}>
          <CloseIcon />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

export default Modal;

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
