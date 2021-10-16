import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styleModal from './modal.module.css';
import { modalRoot } from '../../utils/constants';
function Modal({ title, closePopup, isOpen, children }) {
  return ReactDOM.createPortal(
    <ModalOverlay isOpen={isOpen}>
      <div id='modal' className={`${styleModal.modal} pt-10 pl-10 pb-15 pr-10`}>
        <h2 className={`text text_type_main-large ${styleModal.title}`}>
          {title}
        </h2>
        <div onClick={closePopup} className={styleModal.closeIcon}>
          <CloseIcon />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

export default Modal;
