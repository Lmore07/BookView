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
import frontPage from "../../../../../public/imgs/frontPage.webp";
import { motion, AnimatePresence } from "framer-motion";

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
        handleShowToast("Ocurrió un error inesperado", ToastType.ERROR);
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
      >
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
                Acceda y gestione sus libros en cualquier momento y desde
                cualquier lugar
              </div>
            </div>
          </section>
          <section className="md:px-5 xl:px-32 sm:px-8 bg-bgColorRight flex items-center grid-cols-1">
            <div className="shadow-2xl w-full rounded-lg py-5 bg-bgColorLeft">
              <div className="pb-3 ps-10 pt-5 text-left font-bold text-3xl text-primary-500 font-custom">
                Iniciar sesión
              </div>
              <div className="py-1 grid px-10">
                <Input
                  label="Correo electrónico"
                  name="email"
                  placeholder="lmoreira@gmail.com"
                  maxLength={50}
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
                  maxLength={20}
                  placeholder="********"
                  type="password"
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-iconBgColor"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M22 8.29344C22 11.7692 19.1708 14.5869 15.6807 14.5869C15.0439 14.5869 13.5939 14.4405 12.8885 13.8551L12.0067 14.7333C11.4883 15.2496 11.6283 15.4016 11.8589 15.652C11.9551 15.7565 12.0672 15.8781 12.1537 16.0505C12.1537 16.0505 12.8885 17.075 12.1537 18.0995C11.7128 18.6849 10.4783 19.5045 9.06754 18.0995L8.77362 18.3922C8.77362 18.3922 9.65538 19.4167 8.92058 20.4412C8.4797 21.0267 7.30403 21.6121 6.27531 20.5876L5.2466 21.6121C4.54119 22.3146 3.67905 21.9048 3.33616 21.6121L2.45441 20.7339C1.63143 19.9143 2.1115 19.0264 2.45441 18.6849L10.0963 11.0743C10.0963 11.0743 9.3615 9.90338 9.3615 8.29344C9.3615 4.81767 12.1907 2 15.6807 2C19.1708 2 22 4.81767 22 8.29344ZM15.681 10.4889C16.8984 10.4889 17.8853 9.50601 17.8853 8.29353C17.8853 7.08105 16.8984 6.09814 15.681 6.09814C14.4635 6.09814 13.4766 7.08105 13.4766 8.29353C13.4766 9.50601 14.4635 10.4889 15.681 10.4889Z"
                        ></path>{" "}
                      </g>
                    </svg>
                  }
                  value={credentials.password}
                  onChange={handleChange}
                  validations={[validateNotEmpty]}
                ></Input>
              </div>
              <div className="py-2 grid px-10">
                <Button type="submit" onClick={handleClick}>
                  Iniciar sesión
                </Button>
              </div>
              <div className="py-4">
                <div className="flex px-10 font-custom text-left text-sm font-normal text-textLabel">
                  ¿No tienes una cuenta?
                  <a
                    href="/register"
                    className="ps-5 text-textRegisterLabel font-custom text-right underline"
                  >
                    Regístrate
                  </a>
                </div>
                <div className="py-4">
                  <a
                    href="/forgot"
                    className="flex px-10 justify-center underline font-custom text-sm font-normal text-textForgotPassword"
                  >
                    ¿Olvidó su contraseña?
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </motion.div>
    </AnimatePresence>
  );
}
