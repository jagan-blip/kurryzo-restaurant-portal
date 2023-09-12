import React, { useState } from 'react';
import './DropDown.css';
import OutsideclickWrapper from '../OutsideClickWrapper';
import * as Unicons from '@iconscout/react-unicons';


const DropDown = ({ options, selected, onSelect, style, dropdown_style }) => {
  const [open, setOpen] = useState(false);
  return (
    <OutsideclickWrapper
      callback={() => {
        setOpen(false);
      }}
    >
      <div className="j_dropdown_container" style={style}>
        <div className={`j_dropdown_selected`} style={dropdown_style}>
          <p
            onClick={() => {
              setOpen(!open);
            }}
          >
            <span>{selected}</span>
            <span className={`icon ${open ? 'iconactive' : ''}`}>
              <Unicons.UilAngleDown size={14} />
            </span>
          </p>
        </div>
        {open && (
          <div className="j_dropdown_contents">
            {options?.map((item, i) => {
              return (
                <p
                  key={i}
                  onClick={() => {
                    setOpen(false);
                    onSelect(item);
                  }}
                >
                  {item}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </OutsideclickWrapper>
  );
};

export default DropDown;
