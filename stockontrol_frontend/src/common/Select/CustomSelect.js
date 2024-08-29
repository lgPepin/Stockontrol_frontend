import React from "react";

const CustomSelect = ({
  name,
  value,
  className,
  onChange,
  options,
  placeholder,
}) => {
  return (
    <select name={name} value={value} className={className} onChange={onChange}>
      <option value="" hidden>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
