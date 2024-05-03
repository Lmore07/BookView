"use client";
import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const TextArea = ({
  label,
  name,
  icon,
  placeholder,
  cols,
  rows,
  value,
  onChange,
  voiceToText,
  validations = [],
  className = "",
}: {
  label: string;
  name: string;
  icon?: React.ReactNode;
  placeholder: string;
  cols?: number;
  rows?: number;
  value: string;
  voiceToText?: boolean;
  onChange: (value: string) => void;
  validations?: ((value: string) => string)[];
  className?: string;
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const commands = [
    {
      command: "Ingresa en la búsqueda *",
      callback: (search: string) => {
        setInputValue(search);
      },
    },
  ];

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition({ commands: commands });

  useEffect(() => {
    const handleValidateForm = () => {
      setTouched(true);
      setIsValid(validations.every((validate) => !validate(inputValue)));
    };

    window.addEventListener("validate-form", handleValidateForm);
    return () => {
      window.removeEventListener("validate-form", handleValidateForm);
    };
  }, [inputValue, validations]);

  const handleChange = (e: any) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(e);
    setIsValid(validations.every((validate) => !validate(newValue)));
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "es-EC" });
    setIsListening(true);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
    resetTranscript();
  };

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
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
        <div className="font-open-sans text-sm font-bold text-labelInputText">
          {label}
        </div>
      )}
      <div className="relative flex items-center">
        <textarea
          value={inputValue}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          name={name}
          rows={rows ?? 10}
          className={`w-full pl-9 pr-14 font-open-sans bg-bgInputText px-3 py-2 border-0 text-sm font-normal placeholder:text-gray-500 hover:placeholder:text-secondary-400 text-secondary-400 rounded-md outline-none hover:text-secondary-400 hover:border hover:border-black ${
            validationErrors.length > 0
              ? "border-red-500 border focus:ring-2 focus:ring-red-500 hover:border-red-500 hover:border-2"
              : "border-0 focus:ring-2 focus:ring-slate-300"
          } ${
            isValid
              ? "border-green-600 focus:ring-2 focus:ring-green-600 hover:border-2 hover:border-green-600"
              : ""
          } focus:bg-focusBgInput focus:text-secondary-400`}
        ></textarea>
        {icon && <div className="absolute left-2">{icon}</div>}
        {voiceToText && (
          <div
            className="absolute right-2 cursor-pointer"
            onClick={handleToggleListening}
          >
            {isListening ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor text-iconBgColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor text-iconBgColor"
                className="w-5 h-5"
              >
                <path d="M8 1a2 2 0 0 0-2 2v4a2 2 0 1 0 4 0V3a2 2 0 0 0-2-2Z" />
                <path d="M4.5 7A.75.75 0 0 0 3 7a5.001 5.001 0 0 0 4.25 4.944V13.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.556A5.001 5.001 0 0 0 13 7a.75.75 0 0 0-1.5 0 3.5 3.5 0 1 1-7 0Z" />
              </svg>
            )}
          </div>
        )}
        {validationErrors.length > 0 && (
          <div className="absolute inset-y-0 right-6 pr-3 flex items-center pointer-events-none">
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
          <div className="absolute inset-y-0 right-6 pr-3 flex items-center pointer-events-none">
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

export default TextArea;
