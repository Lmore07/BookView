"use client";

import { LoadingContext } from "@/libs/contexts/loadingContext";
import { ToastContext } from "@/libs/contexts/toastContext";
import { ToastType } from "@/libs/interfaces/toast.interface";
import { UserRegister } from "@/libs/interfaces/user.interface";
import {
  validateCorrectDate,
  validateEmail,
  validateMaxDate,
  validateNotEmpty,
} from "@/libs/validations/validations";
import Button from "@/ui/components/buttons/ButtonFill";
import Input from "@/ui/components/inputs/input";
import Select from "@/ui/components/inputs/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import frontPage from "../../../../../public/imgs/frontPage.png";

export default function Register() {
  //Variables
  const { handleShowToast } = useContext(ToastContext)!;
  const { setIsLoading } = useContext(LoadingContext)!;
  const router = useRouter();
  const [dataUserRegister, setDataUserRegister] = useState<UserRegister>({
    email: "",
    password: "",
    birthday: new Date(),
    names: "",
    lastNames: "",
    role: "",
  });

  const validateForm = () => {
    const validations = [
      {
        fieldName: "names",
        value: dataUserRegister.names,
        validations: [validateNotEmpty],
      },
      {
        fieldName: "lastNames",
        value: dataUserRegister.lastNames,
        validations: [validateNotEmpty],
      },
      {
        fieldName: "birthday",
        value: dataUserRegister.birthday.toString(),
        validations: [validateCorrectDate, validateMaxDate],
      },
      {
        fieldName: "email",
        value: dataUserRegister.email,
        validations: [validateNotEmpty, validateEmail],
      },
      {
        fieldName: "role",
        value: dataUserRegister.role,
        validations: [validateNotEmpty],
      },
      {
        fieldName: "password",
        value: dataUserRegister.password,
        validations: [validateNotEmpty],
      },
    ];

    const formIsValid = validations.every((field) =>
      field.validations.every((validation) => !validation(field.value))
    );

    return formIsValid;
  };

  const handleChange = (e: any) => {
    setDataUserRegister({
      ...dataUserRegister,
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
        const res = await fetch("../api/security/register", {
          method: "POST",
          body: JSON.stringify(dataUserRegister),
        });
        const response = await res.json();
        if (res.ok) {
          if (response.status == 200) {
            handleShowToast(response.message, ToastType.SUCCESS);
            router.replace("/login");
          } else {
            handleShowToast(response.error, ToastType.ERROR);
          }
        }
      } catch (error) {
        handleShowToast(
          "Ha ocurrido un error, por favor intente más tarde",
          ToastType.ERROR
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      handleShowToast(
        "Por favor, complete los campos correctamente",
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
          <div className="pb-3 pt-5 text-center font-bold text-4xl text-primary-500  font-custom">
            BookView: Libros interactivos para todos
          </div>
          <div className="text-center font-custom text-sm font-normal text-primary">
            Acceda y gestione sus libros en cualquier momento y desde cualquier
            lugar
          </div>
        </div>
      </section>
      <section className="md:px-5 xl:px-10 sm:px-8 bg-bgColorRight flex items-center grid-cols-1">
        <div className="shadow-2xl w-full rounded-lg py-5 bg-bgColorLeft">
          <div className="pb-3 ps-10 pt-5 text-left font-bold text-3xl text-primary-500 font-custom">
            Registrate
          </div>
          <div className="py-2 gap-4 grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 md:gap-4 xl:gap-5 sm:gap-4 lg:gap-5 sm:grid-cols-1 px-10">
            <Input
              label="Nombres"
              placeholder="Luis"
              maxLength={20}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-iconBgColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              name="names"
              value={dataUserRegister.names}
              type="text"
              onChange={handleChange}
              validations={[validateNotEmpty]}
            ></Input>
            <Input
              label="Apellidos"
              placeholder="Moreira"
              maxLength={30}
              name="lastNames"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-iconBgColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              value={dataUserRegister.lastNames}
              type="text"
              onChange={handleChange}
              validations={[validateNotEmpty]}
            ></Input>
          </div>
          <div className="py-2 grid px-10">
            <Input
              label="Fecha de nacimiento"
              placeholder="01/01/2000"
              name="birthday"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-iconBgColor"
                >
                  <path d="m15 1.784-.796.795a1.125 1.125 0 1 0 1.591 0L15 1.784ZM12 1.784l-.796.795a1.125 1.125 0 1 0 1.591 0L12 1.784ZM9 1.784l-.796.795a1.125 1.125 0 1 0 1.591 0L9 1.784ZM9.75 7.547c.498-.021.998-.035 1.5-.042V6.75a.75.75 0 0 1 1.5 0v.755c.502.007 1.002.021 1.5.042V6.75a.75.75 0 0 1 1.5 0v.88l.307.022c1.55.117 2.693 1.427 2.693 2.946v1.018a62.182 62.182 0 0 0-13.5 0v-1.018c0-1.519 1.143-2.829 2.693-2.946l.307-.022v-.88a.75.75 0 0 1 1.5 0v.797ZM12 12.75c-2.472 0-4.9.184-7.274.54-1.454.217-2.476 1.482-2.476 2.916v.384a4.104 4.104 0 0 1 2.585.364 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 3.67 0 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 3.67 0 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 2.585-.364v-.384c0-1.434-1.022-2.7-2.476-2.917A49.138 49.138 0 0 0 12 12.75ZM21.75 18.131a2.604 2.604 0 0 0-1.915.165 4.104 4.104 0 0 1-3.67 0 2.605 2.605 0 0 0-2.33 0 4.104 4.104 0 0 1-3.67 0 2.605 2.605 0 0 0-2.33 0 4.104 4.104 0 0 1-3.67 0 2.604 2.604 0 0 0-1.915-.165v2.494c0 1.035.84 1.875 1.875 1.875h15.75c1.035 0 1.875-.84 1.875-1.875v-2.494Z" />
                </svg>
              }
              value={dataUserRegister.birthday}
              type="date"
              onChange={handleChange}
              validations={[validateCorrectDate, validateMaxDate]}
            ></Input>
          </div>
          <div className="py-2 grid px-10">
            <Input
              maxLength={50}
              label="Correo electrónico"
              placeholder="lmoreira@gmail.com"
              name="email"
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
              value={dataUserRegister.email}
              type="email"
              onChange={handleChange}
              validations={[validateNotEmpty, validateEmail]}
            ></Input>
          </div>
          <div className="py-2 gap-4 grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 md:gap-4 xl:gap-5 sm:gap-4 lg:gap-5 sm:grid-cols-1 px-10">
            <Select
              label="Tipo de Usuario"
              name="role"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-iconBgColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              value={dataUserRegister.role}
              options={[
                { value: "CREATOR", label: "Creador" },
                { value: "READER", label: "Lector" },
              ]}
              placeholder="Seleccione un tipo de usuario"
              onChange={handleChange}
              validations={[validateNotEmpty]}
            ></Select>
            <Input
              label="Contraseña"
              placeholder="********"
              name="password"
              maxLength={20}
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
              value={dataUserRegister.password}
              onChange={handleChange}
              validations={[validateNotEmpty]}
            ></Input>
          </div>
          <div className="py-3 grid px-10">
            <Button onClick={handleClick}>Registrarme</Button>
          </div>
          <div className="py-4">
            <div className="flex px-10 text-left font-custom text-sm font-normal text-textLabel">
              ¿Ya tienes una cuenta?
              <a
                href="../login"
                className="ps-5 text-textRegisterLabel text-right underline"
              >
                Inicia Sesión Aquí
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
