"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { useState } from "react";
import logoImg from "../../../../public/imgs/icon.svg";

const Sidebar: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("Inicio");
  const [showFullSidebar, setShowFullSidebar] = useState(true);

  useEffect(() => {
    handleSelectedOption();
  }, []);

  const handleSelectedOption = () => {
    const currentPath = window.location.pathname;
    console.log(currentPath);
    if (currentPath === "/reader") {
      setSelectedOption("Inicio");
    } else if (currentPath === "/reader/favorites") {
      setSelectedOption("Mis Favoritos");
    } else if (currentPath === "/reader/statistics") {
      setSelectedOption("Estadísticas");
    } else if (currentPath === "/reader/profile") {
      setSelectedOption("Mi Perfil");
    }
  };

  return (
    <div
      className={`${
        showFullSidebar ? "w-1/5 xl:w-1/5 lg:w-1/5" : "w-1/6"
      } shadow-2xl border-gray-300 md:w-1/12 sm:w-auto`}
    >
      <div className="flex">
        <div className="p-4 flex gap-1 justify-center items-center">
          <Image alt="Logo" src={logoImg}></Image>
          <div
            className={`font-bold text-lg pe-2 ${
              showFullSidebar
                ? "lg:block md:hidden sm:hidden hidden"
                : "hidden md:hidden"
            }`}
          >
            BookView
          </div>
        </div>
        <button
          className="xl:block hidden pe-2"
          onClick={() => setShowFullSidebar(!showFullSidebar)}
        >
          {showFullSidebar ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>
      <hr className="border-gray-300 border-2" />
      <nav className="mt-3 flex flex-col gap-2 font-open-sans text-lg font-normal">
        <a
          href="/reader"
          onClick={() => setSelectedOption("Inicio")}
          className={`flex items-center gap-2 px-3 py-2 bg-transparent cursor-pointer transition-colors ${
            selectedOption == "Inicio"
              ? "hover:bg-secondary-150 relative font-bold text-primary-500 before:content-[''] before:block before:h-full before:w-1 before:bg-primary-500 before:absolute before:left-0"
              : "text-textSidebar hover:bg-secondary-150"
          }`}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10"
            >
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
          </div>
          <span
            className={`${
              showFullSidebar
                ? "lg:block md:hidden sm:hidden hidden"
                : "hidden md:hidden"
            }`}
          >
            Inicio
          </span>
        </a>
        <a
          href="/reader/favorites"
          onClick={() => setSelectedOption("Mis Favoritos")}
          className={`flex gap-2 items-center px-3 py-2 bg-transparent cursor-pointer transition-colors ${
            selectedOption == "Mis Favoritos"
              ? "hover:bg-secondary-150 relative font-bold text-primary-500 before:content-[''] before:block before:h-full before:w-1 before:bg-primary-500 before:absolute before:left-0"
              : "text-textSidebar hover:bg-secondary-150"
          }`}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10"
            >
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span
            className={`${
              showFullSidebar
                ? "lg:block md:hidden sm:hidden hidden"
                : "hidden md:hidden"
            }`}
          >
            Mis Favoritos
          </span>
        </a>
        <a
          href="/"
          onClick={() => setSelectedOption("Estadísticas")}
          className={`flex gap-2 items-center px-3 py-2 bg-transparent cursor-pointer  transition-colors ${
            selectedOption == "Estadísticas"
              ? "hover:bg-secondary-150 relative font-bold text-primary-500 before:content-[''] before:block before:h-full before:w-1 before:bg-primary-500 before:absolute before:left-0"
              : "text-textSidebar hover:bg-secondary-150"
          }`}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10"
            >
              <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
            </svg>
          </div>
          <span
            className={`${
              showFullSidebar
                ? "lg:block md:hidden sm:hidden hidden"
                : "hidden md:hidden"
            }`}
          >
            Estadísticas
          </span>
        </a>
        <a
          href="#"
          onClick={() => setSelectedOption("Mi Perfil")}
          className={`flex gap-2 items-center px-4 py-2 bg-transparent cursor-pointer  transition-colors ${
            selectedOption == "Mi Perfil"
              ? " hover:bg-secondary-150 relative font-bold text-primary-500 before:content-[''] before:block before:h-full before:w-1 before:bg-primary-500 before:absolute before:left-0"
              : "text-textSidebar hover:bg-secondary-150"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>

          <span
            className={`${
              showFullSidebar
                ? "lg:block md:hidden sm:hidden hidden"
                : "hidden md:hidden"
            }`}
          >
            Mi Perfil
          </span>
        </a>
        <a
          href="../login"
          className="flex gap-1 hover:bg-secondary-150 items-center px-3 py-2 transition-colors text-textSidebar"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10"
            >
              <path
                fillRule="evenodd"
                d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span
            className={`${
              showFullSidebar
                ? "lg:block md:hidden sm:hidden hidden"
                : "hidden md:hidden"
            }`}
          >
            Cerrar Sesión
          </span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
