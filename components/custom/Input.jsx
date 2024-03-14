import React from "react";

const CustomInput = ({
  value,
  name,
  id,
  onChange,
  type = "text",
  placeholder,
  error,
  ...rest
}) => {
  return (
    <>
      <input
        value={value}
        name={name}
        id={id}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        error={error}
        {...rest}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </>
  );
};

export default CustomInput;
