"use client";
import ButtonOutlined from "@/ui/components/buttons/ButtonOutlined";
import React, { createContext, useEffect, useRef, useState } from "react";
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
  const [isListening, setIsListening] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const currentComponentRef = useRef<HTMLDivElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startListening = () => {
    handleRecordAudio();
  };

  const handleRecordAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = async () => {
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
          setIsAnimating(false);
        } catch (error) {
          console.error("Error al procesar el audio", error);
        }
      };
      mediaRecorderRef.current.start();
      setIsAnimating(true);
    } catch (error) {
      console.error("Error accessing the microphone", error);
    }
  };

  useEffect(() => {
    const dialog = document.getElementById("speech") as HTMLDialogElement;
    if (isListening) {
      startListening();
      dialog.showModal();
    } else {
      stopListening();
      dialog.close();
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
      <dialog id="speech" className="modal ">
        <div className="modal-box">
          <button
            onClick={() => {
              setIsListening(false);
            }}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <div className="flex flex-col items-center bg-bgColorRight p-2">
            <div className="flex flex-row">
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
      </dialog>
      {children}
    </VoiceRecorderContext.Provider>
  );
};
