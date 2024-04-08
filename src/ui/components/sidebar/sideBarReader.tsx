"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logoImg from "../../../../public/imgs/icon.svg";
import { useRouter, usePathname } from "next/navigation";

interface SidebarProps {
  optionsRoutes: {
    name: string;
    route: string;
    key: string;
    icon: React.ReactNode;
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ optionsRoutes }) => {
  const [selectedOption, setSelectedOption] = useState("Inicio");
  const [showFullSidebar, setShowFullSidebar] = useState(true);
  const pathName = usePathname();

  useEffect(() => {
    handleSelectedOption();
  }, []);

  const handleSelectedOption = () => {
    const selectedOption = optionsRoutes.find((option) =>
      pathName.includes(option.key)
    );
    if (selectedOption) {
      setSelectedOption(selectedOption.name);
    } else {
      setSelectedOption("Inicio");
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
        {optionsRoutes.map((route) => (
          <Link
            key={route.key}
            href={route.route}
            onClick={() => setSelectedOption(route.name)}
            className={`flex items-center gap-2 px-3 py-2 bg-transparent cursor-pointer transition-colors ${
              selectedOption == route.name
                ? "hover:bg-secondary-150 relative font-bold text-primary-500 before:content-[''] before:block before:h-full before:w-1 before:bg-primary-500 before:absolute before:left-0"
                : "text-textSidebar hover:bg-secondary-150"
            }`}
          >
            <div>{route.icon}</div>
            <span
              className={`${
                showFullSidebar
                  ? "lg:block md:hidden sm:hidden hidden"
                  : "hidden md:hidden"
              }`}
            >
              {route.name}
            </span>
          </Link>
        ))}
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
