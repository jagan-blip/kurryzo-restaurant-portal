import React, { useState } from "react";

const Input = ({
  value,
  onChange,
  type = "text",
  placeholder = "",
  styles,
}) => {
  return (
    <input
      className={`p-3  bg-[#D9D9D93D] w-full   duration-200 rounded-md focus:ring-1 border-2 outline-none border-transparent focus:ring-pink-400 focus:border-pink-400  ${styles}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  );
};

export default Input;
