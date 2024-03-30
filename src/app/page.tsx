"use client";

import Image from "next/image";
import frontPage from "../../public/imgs/frontPage.png";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Input from "@/ui/components/inputs/input";
import Button from "@/ui/components/buttons/ButtonFill";

export default function Home() {
  //Variables declaradas
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Validaciones de campos
  const validateEmail = (value: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(value) ? "" : "Ingresa un correo electrónico válido";
  };
  const validatePassword = (value: string) => {
    return value.length != 0 ? "" : "Debes ingresar la contraseña";
  };

  //Eventos de boton
  const handleClick = () => {
    console.log("Botón clickeado");
  };

  return (
    <main className="min-h-screen grid md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-2">
      <section className="p-20 bg-bgColorLeft hidden sm:hidden md:grid lg:grid">
        <Image
          className="block justify-self-center"
          src={frontPage}
          alt="Imagen principal"
          width={300}
          height={100}
        ></Image>
        <div className="pb-3 pt-5 text-center font-bold text-4xl text-primary-500  font-poppins">
          BookView: Libros interactivos para todos
        </div>
        <div className="text-center font-open-sans text-sm font-normal text-primary">
          Acceda y gestione sus libros en cualquier momento y desde cualquier
          lugar
        </div>
      </section>
      <section className="py-40 px-10 bg-bgColorRight grid grid-cols-1">
        <div className="shadow-2xl rounded-lg py-5 bg-bgColorLeft">
          <div className="pb-3 ps-10 pt-5 text-left font-bold text-3xl text-primary-500 font-poppins">
            Iniciar Sesión
          </div>
          <div className="py-1 grid px-10">
            <Input
              label="Correo electrónico"
              placeholder="lmoreira@gmail.com"
              value={email}
              type="email"
              onChange={setEmail}
              validations={[validateEmail]}
            ></Input>
          </div>
          <div className="py-2 grid px-10">
            <Input
              label="Contraseña"
              placeholder="********"
              type="password"
              value={password}
              onChange={setPassword}
              validations={[validatePassword]}
            ></Input>
          </div>
          <div className="py-2 grid px-10">
            <Button onClick={handleClick}>Iniciar Sesión</Button>
          </div>
          <div className="py-4">
            <div className="flex px-10 text-left font-open-sans text-sm font-normal text-textLabel">
              ¿No tienes una cuenta?
              <a href="#" className="ps-5 text-textRegisterLabel text-right underline">
                Regístrate
              </a>
            </div>
            <div className="py-4">
              <a href="#" className="flex px-10 justify-center underline font-open-sans text-sm font-normal text-textForgotPassword">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
