import React, { useState } from "react";

const Select = ({
  label,
  name,
  icon,
  options,
  placeholder,
  value,
  onChange,
  validations = [],
  className = "",
}: {
  label: string;
  options: { value: string; label: string }[];
  name: string;
  icon?: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  validations?: ((value: string) => string)[];
  className?: string;
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [touched, setTouched] = useState(false);
  const [isValid, setValid] = useState(false);

  const handleChange = (e: any) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(e);
    setValid(validations.every((validate) => !validate(newValue)));
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const validationErrors = touched
    ? validations
        .map((validation) => validation(inputValue))
        .filter((error) => error !== "")
    : [];

  return (
    <div className={`input-component ${className}`}>
      {label && (
        <div className="font-custom text-sm font-bold text-labelInputText">
          {label}
        </div>
      )}
      <div className="relative flex items-center">
        <select
          name={name}
          id={name}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          className={`w-full pl-9 font-custom bg-bgInputText px-3 py-2 border-0 text-sm font-normal hover:placeholder:text-secondary-400 text-secondary-400 rounded-md outline-none hover:text-secondary-400 hover:border hover:border-black ${
            validationErrors.length > 0
              ? "border-red-500 border focus:ring-2 focus:ring-red-500 hover:border-red-500 hover:border-2"
              : "border-0 focus:ring-2 focus:ring-slate-300"
          } ${
            isValid
              ? "border-green-600 focus:ring-2 focus:ring-green-600 hover:border-2 hover:border-green-600"
              : ""
          } focus:bg-focusBgInput focus:text-secondary-400`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {icon && <div className="absolute left-2">{icon}</div>}
        {validationErrors.length > 0 && (
          <div className="absolute inset-y-0 right-2 pr-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        {isValid && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-green-600"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      {validationErrors.length > 0 && (
        <div className="text-sm font-medium text-red-500 mt-1">
          {validationErrors[0]}
        </div>
      )}
    </div>
  );
};

export default Select;
