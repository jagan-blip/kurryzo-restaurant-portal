import React, { useState, useEffect, useRef } from 'react';
import './Modal.css';
import ReactDom from 'react-dom';
import { CSSTransition } from 'react-transition-group';

const Modal = ({ show, setShow, children, disableBackClick, onBackClick }) => {
  const nodeRef = useRef(null);
  const [open, setopen] = useState(show);
  
  useEffect(() => {
    if (show) {
      document?.body?.classList?.add('modal_open');
    } else {
      document?.body?.classList?.remove('modal_open');
    }
  }, [show]);

  return ReactDom.createPortal(
    <CSSTransition
      in={show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
      nodeRef={nodeRef}
      classNames="modal-overlay"
    >
      <div
        ref={nodeRef}
        className="modal-overlay"
        onClick={() => {
          if (!disableBackClick) {
            if (setShow) {
              setShow(false);
            } else if (onBackClick) {
              onBackClick();
            }
          }
        }}
      >
        <div
          className="modal-content "
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
};

export default Modal;
