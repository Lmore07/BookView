"use client";

import { LoadingContext } from "@/libs/contexts/loadingContext";
import { ToastContext } from "@/libs/contexts/toastContext";
import { ToastType } from "@/libs/interfaces/toast.interface";
import { RolEnum } from "@/libs/interfaces/user.interface";
import {
  validateEmail,
  validateNotEmpty,
} from "@/libs/validations/validations";
import Button from "@/ui/components/buttons/ButtonFill";
import Input from "@/ui/components/inputs/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import frontPage from "../../../public/imgs/frontPage.png";

export default function Login() {
  //Variables declaradas
  const router = useRouter();
  const { handleShowToast } = useContext(ToastContext)!;
  const { setIsLoading } = useContext(LoadingContext)!;

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const validations = [
      {
        fieldName: "email",
        value: credentials.email,
        validations: [validateNotEmpty, validateEmail],
      },
      {
        fieldName: "password",
        value: credentials.password,
        validations: [validateNotEmpty],
      },
    ];

    const formIsValid = validations.every((field) =>
      field.validations.every((validation) => !validation(field.value))
    );

    return formIsValid;
  };

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  //Eventos de boton
  const handleClick = async () => {
    const event = new CustomEvent("validate-form", {
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(event);
    if (validateForm()) {
      setIsLoading(true);
      try {
        const res = await fetch("../api/security/login", {
          cache: "no-store",
          method: "POST",
          body: JSON.stringify(credentials),
        });
        const response = await res.json();
        if (res.status == 200) {
          handleShowToast(response.message, ToastType.SUCCESS);
          if (response.data[0].role == RolEnum.READER) {
            router.replace("/reader");
          } else if (response.data[0].role == RolEnum.CREATOR) {
            router.replace("/creator");
          } else if (response.data[0].role == RolEnum.ADMIN) {
            router.replace("/admin");
          }
        } else {
          handleShowToast(response.error, ToastType.ERROR);
        }
      } catch (error) {
        console.log("Error al login: ", error);
        handleShowToast("Ocurrio un error inesperado", ToastType.ERROR);
      } finally {
        setIsLoading(false);
      }
    } else {
      handleShowToast(
        "Por favor complete correctamente los campos",
        ToastType.WARNING
      );
    }
  };

  return (
    <main className="min-h-screen grid md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-2">
      <section className="px-20 bg-bgColorLeft hidden sm:hidden md:flex flex-col items-center justify-center lg:flex">
        <div className="flex flex-col items-center justify-center">
          <Image
            className="flex justify-self-center"
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
        </div>
      </section>
      <section className="md:px-5 xl:px-32 sm:px-8 bg-bgColorRight flex items-center grid-cols-1">
        <div className="shadow-2xl w-full rounded-lg py-5 bg-bgColorLeft">
          <div className="pb-3 ps-10 pt-5 text-left font-bold text-3xl text-primary-500 font-poppins">
            Iniciar Sesión
          </div>
          <div className="py-1 grid px-10">
            <Input
              label="Correo electrónico"
              name="email"
              placeholder="lmoreira@gmail.com"
              value={credentials.email}
              type="email"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-iconBgColor"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              }
              onChange={handleChange}
              validations={[validateEmail, validateNotEmpty]}
            ></Input>
          </div>
          <div className="py-2 grid px-10">
            <Input
              label="Contraseña"
              name="password"
              placeholder="********"
              type="password"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-iconBgColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              value={credentials.password}
              onChange={handleChange}
              validations={[validateNotEmpty]}
            ></Input>
          </div>
          <div className="py-2 grid px-10">
            <Button onClick={handleClick}>Iniciar Sesión</Button>
          </div>
          <div className="py-4">
            <div className="flex px-10 text-left font-open-sans text-sm font-normal text-textLabel">
              ¿No tienes una cuenta?
              <a
                href="/register"
                className="ps-5 text-textRegisterLabel text-right underline"
              >
                Regístrate
              </a>
            </div>
            <div className="py-4">
              <a
                href="#"
                className="flex px-10 justify-center underline font-open-sans text-sm font-normal text-textForgotPassword"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
