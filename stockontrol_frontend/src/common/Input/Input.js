import React from "react";

const Input = ({
  placeholder,
  className,
  type,
  name,
  onChange,
  value,
  readOnly,
}) => {
  return (
    <input
      className={className}
      placeholder={placeholder}
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      readOnly={readOnly}
    ></input>
  );
};

export default Input;
