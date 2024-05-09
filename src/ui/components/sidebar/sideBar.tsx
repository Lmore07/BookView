"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Cookie from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import logoImg from "../../../../public/imgs/icon.svg";
import userImg from "../../../../public/imgs/user.svg";

interface SidebarProps {
  optionsRoutes: {
    name: string;
    route: string;
    key: string;
    icon: React.ReactNode;
  }[];
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ optionsRoutes, children }) => {
  const [selectedOption, setSelectedOption] = useState("Inicio");
  const pathName = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    handleSelectedOption();
    setIsMounted(true);
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

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <header className="h-[10dvh] bg-bgColorRight shadow-lg dark:border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logoImg.src} alt="Imagen" />
          <h2 className="text-lg pl-3 font-semibold text-gray-800 dark:text-gray-200">
            BookViewer
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger>
              <MenuIcon className="h-5 w-5 lg:hidden text-gray-500 dark:text-gray-400" />
              <span className="sr-only">Toggle sidebar</span>
            </SheetTrigger>
            <SheetContent
              className="w-64 border-r border-gray-200 dark:border-gray-700"
              side="left"
            >
              <div className="flex items-center mb-6">
                <img src={logoImg.src} alt="Imagen" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Acme Inc.
                </h2>
              </div>
              <nav className="space-y-1">
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
                    <span>{route.name}</span>
                  </Link>
                ))}
                <Link
                  href={"../login"}
                  onClick={() => {
                    Cookie.remove("token");
                    router.replace("/login");
                  }}
                  className={`flex items-center gap-2 px-3 py-2 bg-transparent cursor-pointer transition-colors ${
                    selectedOption == "logOut"
                      ? "hover:bg-secondary-150 relative font-bold text-primary-500 before:content-[''] before:block before:h-full before:w-1 before:bg-primary-500 before:absolute before:left-0"
                      : "text-textSidebar hover:bg-secondary-150"
                  }`}
                >
                  <div>
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-10"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.125 12C16.125 11.5858 15.7892 11.25 15.375 11.25L4.40244 11.25L6.36309 9.56944C6.67759 9.29988 6.71401 8.8264 6.44444 8.51191C6.17488 8.19741 5.7014 8.16099 5.38691 8.43056L1.88691 11.4306C1.72067 11.573 1.625 11.7811 1.625 12C1.625 12.2189 1.72067 12.427 1.88691 12.5694L5.38691 15.5694C5.7014 15.839 6.17488 15.8026 6.44444 15.4881C6.71401 15.1736 6.67759 14.7001 6.36309 14.4306L4.40244 12.75L15.375 12.75C15.7892 12.75 16.125 12.4142 16.125 12Z"
                        ></path>{" "}
                        <path d="M9.375 8C9.375 8.70219 9.375 9.05329 9.54351 9.3055C9.61648 9.41471 9.71025 9.50848 9.81946 9.58145C10.0717 9.74996 10.4228 9.74996 11.125 9.74996L15.375 9.74996C16.6176 9.74996 17.625 10.7573 17.625 12C17.625 13.2426 16.6176 14.25 15.375 14.25L11.125 14.25C10.4228 14.25 10.0716 14.25 9.8194 14.4185C9.71023 14.4915 9.6165 14.5852 9.54355 14.6944C9.375 14.9466 9.375 15.2977 9.375 16C9.375 18.8284 9.375 20.2426 10.2537 21.1213C11.1324 22 12.5464 22 15.3748 22L16.3748 22C19.2032 22 20.6174 22 21.4961 21.1213C22.3748 20.2426 22.3748 18.8284 22.3748 16L22.3748 8C22.3748 5.17158 22.3748 3.75736 21.4961 2.87868C20.6174 2 19.2032 2 16.3748 2L15.3748 2C12.5464 2 11.1324 2 10.2537 2.87868C9.375 3.75736 9.375 5.17157 9.375 8Z"></path>
                      </g>
                    </svg>
                  </div>
                  <span>{"Cerrar Sesión"}</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Avatar className="h-9 w-9 bg-slate-400">
            <AvatarImage src={Cookie.get("profile")} />
            <AvatarFallback>
              <img src={userImg.src} alt="" />
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex h-auto min-h-[90dvh]">
        <div className="hidden lg:block pt-10 bg-bgColorRight  w-64 border-r shadow-lg">
          <nav className="space-y-1">
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
                <span>{route.name}</span>
              </Link>
            ))}
            <Link
              href={"../login"}
              onClick={() => {
                Cookie.remove("token");
                router.replace("/login");
              }}
              className={`flex items-center gap-2 px-3 py-2 bg-transparent cursor-pointer transition-colors ${
                selectedOption == "logOut"
                  ? "hover:bg-secondary-150 relative font-bold text-primary-500 before:content-[''] before:block before:h-full before:w-1 before:bg-primary-500 before:absolute before:left-0"
                  : "text-textSidebar hover:bg-secondary-150"
              }`}
            >
              <div>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.125 12C16.125 11.5858 15.7892 11.25 15.375 11.25L4.40244 11.25L6.36309 9.56944C6.67759 9.29988 6.71401 8.8264 6.44444 8.51191C6.17488 8.19741 5.7014 8.16099 5.38691 8.43056L1.88691 11.4306C1.72067 11.573 1.625 11.7811 1.625 12C1.625 12.2189 1.72067 12.427 1.88691 12.5694L5.38691 15.5694C5.7014 15.839 6.17488 15.8026 6.44444 15.4881C6.71401 15.1736 6.67759 14.7001 6.36309 14.4306L4.40244 12.75L15.375 12.75C15.7892 12.75 16.125 12.4142 16.125 12Z"
                    ></path>{" "}
                    <path d="M9.375 8C9.375 8.70219 9.375 9.05329 9.54351 9.3055C9.61648 9.41471 9.71025 9.50848 9.81946 9.58145C10.0717 9.74996 10.4228 9.74996 11.125 9.74996L15.375 9.74996C16.6176 9.74996 17.625 10.7573 17.625 12C17.625 13.2426 16.6176 14.25 15.375 14.25L11.125 14.25C10.4228 14.25 10.0716 14.25 9.8194 14.4185C9.71023 14.4915 9.6165 14.5852 9.54355 14.6944C9.375 14.9466 9.375 15.2977 9.375 16C9.375 18.8284 9.375 20.2426 10.2537 21.1213C11.1324 22 12.5464 22 15.3748 22L16.3748 22C19.2032 22 20.6174 22 21.4961 21.1213C22.3748 20.2426 22.3748 18.8284 22.3748 16L22.3748 8C22.3748 5.17158 22.3748 3.75736 21.4961 2.87868C20.6174 2 19.2032 2 16.3748 2L15.3748 2C12.5464 2 11.1324 2 10.2537 2.87868C9.375 3.75736 9.375 5.17157 9.375 8Z"></path>
                  </g>
                </svg>
              </div>
              <span>{"Cerrar Sesión"}</span>
            </Link>
          </nav>
        </div>
        <div className="flex-1 p-6">{children}</div>
      </div>
    </>
  );
};

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export default Sidebar;
