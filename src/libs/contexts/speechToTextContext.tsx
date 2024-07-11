"use client";
import ButtonOutlined from "@/ui/components/buttons/ButtonOutlined";
import React, { createContext, useEffect, useRef, useState } from "react";
import {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./styles.css";

export interface VoiceRecorderContextValue {
  finalTranscript: string;
  transcript: string;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  currentComponentRef: React.MutableRefObject<HTMLDivElement | null>;
  continuos?: boolean;
}

export const VoiceRecorderContext =
  createContext<VoiceRecorderContextValue | null>(null);

export const VoiceRecorderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { resetTranscript, listening } =
    useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const currentComponentRef = useRef<HTMLDivElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startListening = () => {
    /*SpeechRecognition.startListening({
      language: "es-EC",
      continuous: isContinuos,
      interimResults: true,
    });*/
    handleRecordAudio();
  };

  const handleRecordAudio = async () => {
    try {
      console.log("Accessing the microphone");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = async () => {
        console.log("Stop recording");
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });

        try {
          const formData = new FormData();
          formData.append("audio", audioBlob);
          const res = await fetch("../api/gemini", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          setFinalTranscript(data.data[0].text);
        } catch (error) {
          console.error("Error al procesar el audio", error);
        }
      };
      mediaRecorderRef.current.start();
    } catch (error) {
      console.error("Error accessing the microphone", error);
    }

  };

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
    mediaRecorderRef.current?.stop();
  };

  return (
    <VoiceRecorderContext.Provider
      value={{
        setIsListening,
        finalTranscript,
        transcript,
        currentComponentRef,
        continuos: true,
      }}
    >
      {isListening && (
        <div
          className={`fixed flex flex-col z-[100] top-0 left-0 w-full h-full items-center justify-center`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-25 backdrop-blur-sm"></div>
          <div className="relative z-10 flex flex-col bg-bgColorRight p-5 rounded-full">
            <div className="flex flex-row">
              <div
                className={`h-8 w-4 bg-primary rounded-full mx-2 ${isAnimating ? "animate-wave-1" : ""
                  }`}
              ></div>
              <div
                className={`h-8 w-4 bg-primary rounded-full mx-2 ${isAnimating ? "animate-wave-2" : ""
                  }`}
              ></div>
              <div
                className={`h-8 w-4 bg-primary rounded-full mx-2 ${isAnimating ? "animate-wave-3" : ""
                  }`}
              ></div>
              <div
                className={`h-8 w-4 bg-primary rounded-full mx-2 ${isAnimating ? "animate-wave-4" : ""
                  }`}
              ></div>
            </div>
            <div className="flex items-center justify-center mt-3">
              <ButtonOutlined
                onClick={() => {
                  setIsListening(false);
                }}
                className={
                  "border-red-600 text-red-600 hover:text-white hover:bg-red-600"
                }
              >
                Detener
              </ButtonOutlined>
            </div>
          </div>
        </div>
      )}
      {children}
    </VoiceRecorderContext.Provider>
  );
};
