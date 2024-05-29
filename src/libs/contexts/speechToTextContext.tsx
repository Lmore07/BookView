"use client";
import React, { createContext, useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import "./styles.css";

export interface VoiceRecorderContextValue {
  finalTranscript: string;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VoiceRecorderContext =
  createContext<VoiceRecorderContextValue | null>(null);

export const VoiceRecorderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { resetTranscript, listening, transcript, finalTranscript } =
    useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const startListening = () => {
    SpeechRecognition.startListening({
      language: "es-EC",
      continuous: false,
      interimResults: true,
    });
  };

  useEffect(() => {
    if (transcript.length > 0) {
      setIsAnimating(true);
    }
  }, [transcript]);

  useEffect(() => {
    if (!listening) {
      setIsListening(false);
      setIsAnimating(false);
    }
  }, [listening]);

  useEffect(() => {
    if (isListening) {
      startListening();
    } else {
      stopListening();
    }
  }, [isListening]);

  const stopListening = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  return (
    <VoiceRecorderContext.Provider value={{ setIsListening, finalTranscript }}>
      {isListening && (
        <div
          className={`fixed flex z-[100] top-0 left-0 w-full h-full items-center justify-center`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-25 backdrop-blur-sm"></div>
          <div className="relative z-10 flex bg-bgColorRight p-5 rounded-full">
            <div
              className={`h-8 w-4 bg-primary rounded-full mx-2 ${
                isAnimating ? "animate-wave-1" : ""
              }`}
            ></div>
            <div
              className={`h-8 w-4 bg-primary rounded-full mx-2 ${
                isAnimating ? "animate-wave-2" : ""
              }`}
            ></div>
            <div
              className={`h-8 w-4 bg-primary rounded-full mx-2 ${
                isAnimating ? "animate-wave-3" : ""
              }`}
            ></div>
            <div
              className={`h-8 w-4 bg-primary rounded-full mx-2 ${
                isAnimating ? "animate-wave-4" : ""
              }`}
            ></div>
          </div>
        </div>
      )}
      {children}
    </VoiceRecorderContext.Provider>
  );
};
