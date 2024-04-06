"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function AccessibilityButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [zoom, setZoom] = useState<number>();

  useEffect(() => {
    console.log("La aplicación se ha iniciado");
    const localTheme = localStorage.getItem("theme");
    const localZoom = parseFloat(localStorage.getItem("zoom") ?? "1");
    console.log("Zoom guardado en local: ", localZoom);
    if (localZoom) {
      const newZoom = Math.min(localZoom, 2);
      (document.body.style as any).zoom = newZoom.toString();
      setZoom(localZoom);
    }
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  const handleThemeChange = (event: any) => {
    localStorage.setItem("theme", event.target.value);
    console.log("Se selecciono: ", event.target.value);
    setTheme(event.target.value);
  };

  const increaseZoom = () => {
    setZoom((prevZoom) => {
      const newZoom = parseFloat(Math.min(prevZoom! + 0.1, 2).toFixed(1));
      localStorage.setItem("zoom", newZoom.toString());
      (document.body.style as any).zoom = newZoom.toString();
      return newZoom;
    });
  };

  const decreaseZoom = () => {
    setZoom((prevZoom) => {
      const newZoom = parseFloat(Math.max(prevZoom! - 0.1, 0.5).toFixed(1));
      localStorage.setItem("zoom", newZoom.toString());
      (document.body.style as any).zoom = newZoom.toString();
      return newZoom;
    });
  };

  const getZom = () => {
    return (zoom! * 100).toFixed(0);
  };

  return (
    <div
      className={`fixed flex right-2 bottom-2 rounded-s-full z-50 bg-bgButtonAccesible`}
    >
      <button
        className=" text-textButtonAccesible font-bold py-2 px-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" />
        </svg>
      </button>
      {isOpen && (
        <div className="rounded-lg shadow-lg p-4 mt-2">
          <div className="mb-2">
            <label className="text-textButtonAccesible">Elige un tema: </label>
            <select
              className="bg-bgSelectTheme text-textSelectTheme rounded-md"
              value={theme}
              onChange={handleThemeChange}
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
              <option value="sepia">Sepia</option>
              <option value="blackAndWhite">Blanco y Negro</option>
              <option value="contrast">Alto Contraste</option>
            </select>
          </div>
          <div>
            <label className="mr-2 text-textButtonAccesible">
              Modificar tamaño:
            </label>
            <button
              onClick={decreaseZoom}
              disabled={zoom == 0.5 ? true : false}
              className={`bg-gray-200 ${
                zoom == 0.5 ? "bg-gray-800 text-gray-50" : "hover:bg-gray-300"
              }  text-gray-800 font-bold py-1 px-2 rounded-l`}
            >
              -
            </button>
            <div className="inline bg-gray-200  text-gray-800 py-[5.2px] font-bold px-2">
              {getZom()}%
            </div>
            <button
              disabled={zoom == 2 ? true : false}
              onClick={increaseZoom}
              className={`bg-gray-200 ${
                zoom == 2 ? "bg-gray-800 text-gray-50" : "hover:bg-gray-300"
              }  text-gray-800 font-bold py-1 px-2 rounded-r`}
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
