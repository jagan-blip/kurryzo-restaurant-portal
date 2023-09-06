import React from "react";
import "./CircularProgressBar.css";

const CircularProgressBar = ({ progress, klass, borderKlass }) => {
  return (
    <div className={`circular-spinner w-14 h-14 ${klass}`}>
      <div className={`spinner ${borderKlass}`}></div>
    </div>
  );
};

export default CircularProgressBar;
