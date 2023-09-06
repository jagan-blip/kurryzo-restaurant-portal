import React from "react";

const SnackBar = ({ isActive, message, type }) => {
  return (
    <div
      className={`${isActive ? "snackbar fadeIn" : "snackbar fadeOut"} ${type}`}
    >
      {message}
    </div>
  );
};

export default SnackBar;
