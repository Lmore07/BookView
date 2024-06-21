"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/ui/shadcn/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/shadcn/ui/sheet";
import Cookie from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import logoImg from "../../../../public/imgs/icon.svg";
import userImg from "../../../../public/imgs/user.svg";
import Image from "next/image";

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
      <header className="h-[10dvh] bg-bgColorRight font-custom shadow-lg dark:border-gray-700 px-6 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center">
          <Image src={logoImg.src} alt="Imagen" width={40} height={40} />
          <h2 className="text-lg pl-3 font-semibold text-gray-800 dark:text-gray-200">
            BookViewer
          </h2>
        </div>
        <div className="flex items-center space-x-4 font-custom">
          <Sheet>
            <SheetTrigger>
              <MenuIcon className="h-5 w-5 lg:hidden text-gray-500 dark:text-gray-400" />
              <span className="sr-only">Toggle sidebar</span>
            </SheetTrigger>
            <SheetContent
              className="w-64 border-r ms-0 flex flex-col border-gray-200 dark:border-gray-700 bg-bgColorRight"
              side="left"
            >
              <div className="flex items-center mb-6 ">
                <Image src={logoImg.src} alt="Imagen" width={40} height={40} />
                <h2 className="text-lg ms-2 font-custom font-semibold text-gray-800 dark:text-gray-200">
                  BookViewer
                </h2>
              </div>
              <nav className="space-y-1  font-custom">
                {optionsRoutes.map((route) => (
                  <Link
                    key={route.key}
                    href={route.route}
                    onClick={() => setSelectedOption(route.name)}
                    className={`flex items-center gap-2 px-3 py-2 bg-transparent cursor-pointer transition-colors ${
                      selectedOption == route.name
                        ? "hover:bg-secondary-150 relative font-bold text-primary-500 lg:before:content-[''] lg:before:block before:h-full before:w-1 before:bg-primary-500 md:before:absolute lg:before:absolute xl:before:absolute before:left-0"
                        : "text-textSidebar hover:bg-secondary-150"
                    }`}
                  >
                    <div>{route.icon}</div>
                    <span>{route.name}</span>
                  </Link>
                ))}
              </nav>
              <div className="mt-auto p-3  bg-bgColorRight rounded-lg shadow-inner">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="ring-2 ring-primary-500 ring-offset-2">
                    <AvatarImage
                      src={Cookie.get("profile")}
                      alt="Foto de Perfil"
                    />
                    <AvatarFallback className="bg-black text-white">
                      {Cookie.get("initials")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm ms-0 font-semibold text-textLanding">
                      {Cookie.get("username") ?? "Usuario"}
                    </p>
                    <p className="text-xs ms-0 text-textLanding">
                      {Cookie.get("email") ?? "email@example.com"}
                    </p>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-bgButtonFill text-textButtonFill rounded-full mt-1">
                      {Cookie.get("userType") ?? "Tipo de Usuario"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    Cookie.remove("token");
                    Cookie.remove("username");
                    Cookie.remove("email");
                    Cookie.remove("profile");
                    Cookie.remove("userType");
                    window.location.reload();
                  }}
                  className="w-full py-2 px-4 bg-red-700 hover:bg-red-600 text-white rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <LogOutIcon className="w-4 h-4" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <div className="flex h-auto min-h-[90dvh] font-custom">
        <div className="hidden lg:flex  flex-col bg-bgColorRight w-64 border-r shadow-lg fixed top-20 bottom-0 left-0 overflow-y-auto">
          <nav className="space-y-1 flex-grow">
            {optionsRoutes.map((route) => (
              <Link
                key={route.key}
                href={route.route}
                onClick={() => setSelectedOption(route.name)}
                className={`flex items-center gap-2 px-3 py-2 bg-transparent cursor-pointer transition-colors ${
                  selectedOption == route.name
                    ? "hover:bg-secondary-150 relative font-bold text-primary-500 lg:before:content-[''] lg:before:block before:h-full before:w-1 before:bg-primary-500 md:before:absolute lg:before:absolute xl:before:absolute before:left-0"
                    : "text-textSidebar hover:bg-secondary-150"
                }`}
              >
                <div>{route.icon}</div>
                <span>{route.name}</span>
              </Link>
            ))}
          </nav>
          <hr />
          <div className="mt-auto p-3  bg-bgColorRight rounded-lg shadow-inner">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="ring-2 ring-primary-500 ring-offset-2">
                <AvatarImage src={Cookie.get("profile")} alt="Foto de Perfil" />
                <AvatarFallback className="bg-black text-white">
                  {Cookie.get("initials")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm ms-0 font-semibold text-textLanding">
                  {Cookie.get("username") ?? "Usuario"}
                </p>
                <p className="text-xs ms-0 text-textLanding">
                  {Cookie.get("email") ?? "email@example.com"}
                </p>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-bgButtonFill text-textButtonFill rounded-full mt-1">
                  {Cookie.get("userType") ?? "Tipo de Usuario"}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                Cookie.remove("token");
                Cookie.remove("username");
                Cookie.remove("email");
                Cookie.remove("profile");
                Cookie.remove("userType");
                window.location.reload();
              }}
              className="w-full py-2 px-4 bg-red-700 hover:bg-red-600 text-white rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <LogOutIcon className="w-4 h-4" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
        <div className="flex-1 m-6 lg:ps-64 pt-[10dvh] overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </>
  );
};

function LogOutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
}

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
