"use client";

import Button from "@/ui/components/buttons/ButtonFill";
import { useState } from "react";

export default function Login() {
  const [open, setOpen] = useState(false);

  return (
    <div className="shadow-2xl p-4 rounded-lg">
      {" "}
      <div className="flex flex-wrap justify-between mb-5">
        <h1 className="relative text-2xl text-primary-500 font-bold before:content-[''] before:block before:absolute before:h-full before:w-1 before:bg-primary-500 before:left-0">
          <span className="ps-2">Mis Libros</span>
        </h1>
        <Button
          onClick={() => {}}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
          }
        >
          Agregar Libros
        </Button>
      </div>
    </div>
  );
}
