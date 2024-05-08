"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import logoImg from "../../../../public/imgs/icon.svg";

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
  const [showFullSidebar, setShowFullSidebar] = useState(true);
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
              </nav>
            </SheetContent>
          </Sheet>
          <Avatar className="h-9 w-9">
            <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex h-[90dvh]">
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
