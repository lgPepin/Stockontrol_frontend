import React from "react";

const Input = ({ placeholder, className, type, name, onChange }) => {
  return (
    <input
      className={className}
      placeholder={placeholder}
      type={type}
      name={name}
      onChange={onChange}
    ></input>
  );
};

export default Input;
