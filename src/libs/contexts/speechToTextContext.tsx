"use client";
import React, { createContext, useState, useEffect, useCallback } from "react";
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
  const { resetTranscript, listening, finalTranscript } =
    useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    SpeechRecognition.startListening({
      language: "es-EC",
      continuous: false,
      interimResults: true,
    });
  };

  useEffect(() => {
    if (!listening) {
      setIsListening(false);
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
        <div className="fixed flex items-center z-[100] top-0 left-0 w-full h-full items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-25 backdrop-blur-sm"></div>
          <div className="relative z-10 flex">
            <div className="animate-wave-1 h-8 w-4 bg-primary rounded-full mx-2"></div>
            <div className="animate-wave-2 h-8 w-4 bg-primary rounded-full mx-2"></div>
            <div className="animate-wave-3 h-8 w-4 bg-primary rounded-full mx-2"></div>
            <div className="animate-wave-4 h-8 w-4 bg-primary rounded-full mx-2"></div>
          </div>
        </div>
      )}
      {children}
    </VoiceRecorderContext.Provider>
  );
};
