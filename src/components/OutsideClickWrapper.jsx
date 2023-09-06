import React, { useState, useRef } from 'react';
import useOutsideEvent from '../hooks/useOutsideEvent';
const OutsideclickWrapper = ({ children, callback, classname }) => {
  const wrapperRef = useRef(null);

  useOutsideEvent(wrapperRef, callback);
  return (
    <div className={classname} ref={wrapperRef}>
      {children}
    </div>
  );
};

export default OutsideclickWrapper;
