import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styleModal from './modal.module.css';
import { modalRoot } from '../../utils/constants';
import { FC } from 'react';
import { TModal } from './type';

const Modal: FC<TModal> = ({ close, title, children }) => {
  console.log(children )
  return (
    modalRoot && 
    ReactDOM.createPortal(
      <ModalOverlay closeAllPopups={close}>
        <div
          id='modal'
          className={`${styleModal.modal} pt-10 pl-10 pb-10 pr-10`}
        >
          {title && (
            <h2 className={`text text_type_main-large ${styleModal.title}`}>
              {title}
            </h2>
          )}
          <div onClick={close} className={styleModal.closeIcon}>
            <CloseIcon type={'primary'} />
          </div>
          {children}
        </div>
      </ModalOverlay>,
      modalRoot
    )
  );
};

export default Modal;
