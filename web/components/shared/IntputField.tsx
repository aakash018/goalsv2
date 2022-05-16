import React, { LegacyRef } from "react";

interface Props {
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  input: LegacyRef<HTMLInputElement>;
}

const IntputField: React.FC<Props> = ({
  placeholder,
  label,
  type = "text",
  input,
}) => {
  return (
    <>
      <label htmlFor="inputField" style={{ display: "block" }}>
        {label}
      </label>
      <input
        type={type}
        id="inputField"
        placeholder={placeholder}
        ref={input}
      />
    </>
  );
};

export default IntputField;
