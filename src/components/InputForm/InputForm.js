import React from "react";
import "./inputform.scss";

const InputForm = (props) => {
  const {
    label,
    placeholder,
    name,
    id,
    type,
    value,
    onChange,
    invalids,
    setInvalids,
  } = props;
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        className="form_input"
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() =>
          setInvalids((prev) => {
            const invalid = prev?.find((invalid) => invalid.field === name);
            if (invalid) {
              const newInvalids = prev?.filter(
                (invalid) => invalid.field !== name
              );
              return newInvalids;
            }
            return prev;
          })
        }
      />
      {invalids?.length > 0 &&
        invalids?.some((invalid) => invalid.field === name) && (
          <small>
            {invalids?.find((invalid) => invalid.field === name).msg}
          </small>
        )}
    </>
  );
};

export default InputForm;
