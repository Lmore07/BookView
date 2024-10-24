"use client";

import { useEffect, useRef, useState } from "react";
import { FaceMesh, FACEMESH_TESSELATION } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors } from "@mediapipe/drawing_utils";

const EyeTrackingMediaPipe: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [blink, setBlink] = useState(false); // Estado para detectar parpadeo
  const cursorRef = useRef<HTMLDivElement>(null); // Referencia al cursor simulado

  useEffect(() => {
    if (typeof window === "undefined") return;

    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
      const canvas = canvasRef.current;
      const canvasCtx = canvas?.getContext("2d");

      if (canvasCtx) {
        canvasCtx.clearRect(0, 0, canvas!.width, canvas!.height);

        if (
          results.multiFaceLandmarks &&
          results.multiFaceLandmarks.length > 0
        ) {
          const landmarks = results.multiFaceLandmarks[0];

          // Dibuja los puntos faciales en el canvas
          drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION, {
            color: "#32EEDB",
            lineWidth: 0.5,
          });

          // Detecta parpadeo
          const isBlinking = detectBlink(landmarks);
          setBlink(isBlinking);

          // Detectamos el iris del ojo derecho e izquierdo
          const rightIris = landmarks[473]; // Ojo derecho
          const leftIris = landmarks[468]; // Ojo izquierdo

          // Promediamos las posiciones de ambos ojos para simular la mirada
          const avgX = (leftIris.x + rightIris.x) / 2;
          const avgY = (leftIris.y + rightIris.y) / 2;

          //Mueve cursor
          moveCursor(avgX, avgY);
        } else {
          console.log("No se detectó ningún rostro.");
          setBlink(false); // Restablece el estado si no hay rostro detectado
        }
      }
    });

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();

          const camera = new Camera(videoRef.current, {
            onFrame: async () => {
              await faceMesh.send({ image: videoRef.current! });
            },
            width: 640,
            height: 480,
          });

          camera.start();
        }
      })
      .catch((err) => console.error("Permiso de cámara denegado:", err));

    return () => {
      faceMesh.close();
    };
  }, []);

  const detectBlink = (landmarks: any) => {
    try {
      const rightEyeOpen = getEyeAspectRatio(landmarks[159], landmarks[145]);
      const leftEyeOpen = getEyeAspectRatio(landmarks[386], landmarks[374]);
      const blinkThreshold = 0.3; // Umbral para detectar parpadeo

      return rightEyeOpen < blinkThreshold && leftEyeOpen < blinkThreshold;
    } catch (error) {
      console.error("Error al calcular el parpadeo:", error);
      return false; // Si hay un error, asume que no hay parpadeo
    }
  };

  const getEyeAspectRatio = (upper: any, lower: any) => {
    return Math.abs(upper.y - lower.y) / Math.abs(upper.x - lower.x);
  };

  // Función para mover el cursor simulado
  const moveCursor = (x: number, y: number) => {
    const { innerWidth, innerHeight } = window;

    // Convertimos las coordenadas normalizadas (0-1) a píxeles de pantalla
    const cursorX = x * innerWidth;
    const cursorY = y * innerHeight;

    console.log(
      "El cursor esta en la posicion de la pantalla X: " +
        cursorX +
        " Y: " +
        cursorY
    );

    // Movemos el elemento cursor
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      cursorRef.current.style.zIndex = "200"; // Asegura que esté por encima de otros elementos
    }
  };

  return (
    <div style={{ position: "sticky", height: "100vh", overflow: "hidden" }}>
      <h1>Eye Tracking con MediaPipe</h1>
      <video ref={videoRef} style={{ display: "none" }}></video>
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{ border: "1px solid black" }}
      ></canvas>
      <p>{blink ? "Parpadeo detectado" : "Ojos abiertos"}</p>
      {/* Cursor simulado */}
      <div
        ref={cursorRef}
        style={{
          position: "absolute",
          width: "20px",
          height: "20px",
          backgroundColor: "red",
          borderRadius: "50%",
          pointerEvents: "none", // Ignorar eventos del mouse
          transition: "transform 0.1s ease-out", // Suaviza el movimiento
          zIndex: 900, // Asegura que esté por encima de otros elementos
        }}
      ></div>
    </div>
  );
};

export default EyeTrackingMediaPipe;
