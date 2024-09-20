"use client";

import React, { useEffect } from "react";

declare global {
  interface Window {
    webgazer: any;
  }
}

const EyeTrackingCursor = () => {
  useEffect(() => {
    const initializeWebgazer = () => {
      console.log("Inicializando Eye Tracking Cursor", window);
      console.log("Webgazer: ", window.webgazer);

      // Verificar si webgazer está disponible
      if (window.webgazer) {
        const webgazer = window.webgazer;
        console.log("Webgazer inicializado", webgazer);

        // Configurar webgazer para usar la cámara
        webgazer.setRegression("ridge")
          .setTracker("TFFacemesh")
          .setGazeListener((data: any, elapsedTime: any) => {
            if (data == null) {
              return;
            }
            const x = data.x; // Posición X del ojo
            const y = data.y; // Posición Y del ojo

            // Mover el cursor a la posición del ojo
            const cursor = document.getElementById("eye-tracking-cursor");
            if (cursor) {
              cursor.style.left = `${x}px`;
              cursor.style.top = `${y}px`;
            }
          })
          .begin()
          .then(() => {
            webgazer.showVideo(true); // Mostrar el video de la cámara
            webgazer.showPredictionPoints(true); // Mostrar los puntos de predicción
            webgazer.showFaceOverlay(true);
            webgazer.showFaceFeedbackBox(true);
          })
          .catch((err: any) => {
            console.error("Error al iniciar Webgazer:", err);
          });
      } else {
        console.error("webgazer no está disponible en window");
      }
    };

    // Esperar a que el script de webgazer se cargue
    if (document.readyState === "complete") {
      initializeWebgazer();
    } else {
      window.addEventListener("load", initializeWebgazer);
    }

    // Limpiar webgazer al desmontar el componente
  }, []);

  return (
    <div>
      <div
        id="eye-tracking-cursor"
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          backgroundColor: "red",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      ></div>
    </div>
  );
};

export default EyeTrackingCursor;