import React, { useState, useEffect, useRef } from 'react';
import './Drawer.css';
import ReactDom from 'react-dom';
import { CSSTransition } from 'react-transition-group';

const Drawer = ({ show, setShow, children, disableBackClick, onBackClick }) => {
  const nodeRef = useRef(null);
  
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
      classNames="drawer-overlay"
    >
      <div
        ref={nodeRef}
        className="drawer-overlay"
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
          className="drawer-content"
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

export default Drawer;
