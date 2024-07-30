"use client";
import React, { createContext, useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./styles.css";

export interface VoiceRecorderContextValue {
  finalTranscript: string;
  transcript: string;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  currentComponentRef: React.MutableRefObject<HTMLDivElement | null>;
  continuos?: boolean;
  isListening: boolean;
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
  const [isContinuos, setIsContinuos] = useState(false);
  const currentComponentRef = useRef<HTMLDivElement | null>(null);

  const startListening = () => {
    playStartSound().then(() => {
      SpeechRecognition.startListening({
        language: "es-EC",
        continuous: isContinuos,
        interimResults: true,
      });
    });
  };

  const playStartSound = () => {
    return new Promise<void>((resolve) => {
      const audio = new Audio("/audios/initAudio.mp3");
      audio.play();
      audio.onended = () => {
        resolve();
      };
    });
  };

  useEffect(() => {
    if (transcript.length > 0) {
      setIsAnimating(true);
    }
    console.log("Transcript: ", transcript);
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
    <VoiceRecorderContext.Provider
      value={{
        setIsListening,
        finalTranscript,
        transcript,
        currentComponentRef,
        isListening,
        continuos: false,
      }}
    >
      {children}
    </VoiceRecorderContext.Provider>
  );
};
