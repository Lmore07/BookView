"use client";

import { LoadingContext } from "@/libs/contexts/loadingContext";
import { ToastContext } from "@/libs/contexts/toastContext";
import { ToastType } from "@/libs/interfaces/toast.interface";
import { registerSchema } from "@/libs/schemas/security";
import Button from "@/ui/components/buttons/ButtonFill";
import InputNUI from "@/ui/components/inputs/inputNUI";
import SelectNUI from "@/ui/components/inputs/selectNUI";
import { Form } from "@/ui/shadcn/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import frontPage from "../../../../../public/imgs/frontPage.webp";

export default function Register() {
  //Variables
  const { handleShowToast } = useContext(ToastContext)!;
  const { setIsLoading } = useContext(LoadingContext)!;
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      names: "",
      lastNames: "",
    },
    shouldFocusError: true,
    mode: "all",
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log("onSubmit", values);
    setIsLoading(true);
    try {
      const res = await fetch("../api/security/register", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const response = await res.json();
      if (response.statusCode == 200) {
        handleShowToast(response.message, ToastType.SUCCESS);
        router.replace("/login");
      } else {
        handleShowToast(response.error, ToastType.ERROR);
      }
    } catch (error) {
      handleShowToast(
        "Ha ocurrido un error, por favor intente más tarde",
        ToastType.ERROR
      );
    } finally {
      setIsLoading(false);
    }
  }

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
            Regístrate
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (errors) => {
                handleShowToast(
                  "Por favor, verifica los campos obligatorios",
                  ToastType.ERROR
                );
              })}
              className="space-y-4"
            >
              <div className="gap-4 grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 md:gap-4 xl:gap-5 sm:gap-4 lg:gap-5 sm:grid-cols-1 px-10">
                <InputNUI
                  form={form}
                  label="Nombres"
                  placeholder="Ingrese sus nombres"
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
                  type="text"
                ></InputNUI>
                <InputNUI
                  form={form}
                  label="Apellidos"
                  placeholder="Ingrese sus apellidos"
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
                  type="text"
                ></InputNUI>
              </div>
              <div className="grid px-10">
                <InputNUI
                  form={form}
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
                  type="date"
                ></InputNUI>
              </div>
              <div className="grid px-10">
                <InputNUI
                  form={form}
                  maxLength={50}
                  label="Correo electrónico"
                  placeholder="Ingrese su correo electrónico"
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
                  type="email"
                ></InputNUI>
              </div>
              <div className="gap-4 grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 md:gap-4 xl:gap-5 sm:gap-4 lg:gap-5 sm:grid-cols-1 px-10">
                <SelectNUI
                  label="Tipo de usuario"
                  form={form}
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
                  options={[
                    { value: "CREATOR", label: "Creador" },
                    { value: "READER", label: "Lector" },
                  ]}
                  placeholder="Seleccione el tipo de usuario"
                ></SelectNUI>
                <InputNUI
                  form={form}
                  label="Contraseña"
                  placeholder="Ingrese su contraseña"
                  name="password"
                  maxLength={20}
                  type="password"
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-iconBgColor"
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
                          d="M3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20H14C17.7712 20 19.6569 20 20.8284 18.8284C22 17.6569 22 15.7712 22 12C22 8.22876 22 6.34315 20.8284 5.17157C19.6569 4 17.7712 4 14 4H10C6.22876 4 4.34315 4 3.17157 5.17157ZM12.7502 10C12.7502 9.58579 12.4144 9.25 12.0002 9.25C11.586 9.25 11.2502 9.58579 11.2502 10V10.7012L10.6428 10.3505C10.2841 10.1434 9.8254 10.2663 9.61829 10.625C9.41119 10.9837 9.53409 11.4424 9.89281 11.6495L10.4997 11.9999L9.89258 12.3505C9.53386 12.5576 9.41095 13.0163 9.61806 13.375C9.82517 13.7337 10.2839 13.8566 10.6426 13.6495L11.2502 13.2987V14C11.2502 14.4142 11.586 14.75 12.0002 14.75C12.4144 14.75 12.7502 14.4142 12.7502 14V13.2993L13.3569 13.6495C13.7156 13.8566 14.1743 13.7337 14.3814 13.375C14.5885 13.0163 14.4656 12.5576 14.1069 12.3505L13.4997 11.9999L14.1067 11.6495C14.4654 11.4424 14.5883 10.9837 14.3812 10.625C14.1741 10.2663 13.7154 10.1434 13.3567 10.3505L12.7502 10.7006V10ZM6.73266 9.25C7.14687 9.25 7.48266 9.58579 7.48266 10V10.7006L8.0891 10.3505C8.44782 10.1434 8.90651 10.2663 9.11362 10.625C9.32073 10.9837 9.19782 11.4424 8.8391 11.6495L8.23217 11.9999L8.83934 12.3505C9.19806 12.5576 9.32096 13.0163 9.11386 13.375C8.90675 13.7337 8.44806 13.8566 8.08934 13.6495L7.48266 13.2993V14C7.48266 14.4142 7.14687 14.75 6.73266 14.75C6.31844 14.75 5.98266 14.4142 5.98266 14V13.2987L5.375 13.6495C5.01628 13.8566 4.55759 13.7337 4.35048 13.375C4.14337 13.0163 4.26628 12.5576 4.625 12.3505L5.23217 11.9999L4.62523 11.6495C4.26652 11.4424 4.14361 10.9837 4.35072 10.625C4.55782 10.2663 5.01652 10.1434 5.37523 10.3505L5.98266 10.7012V10C5.98266 9.58579 6.31844 9.25 6.73266 9.25ZM18.0181 10C18.0181 9.58579 17.6823 9.25 17.2681 9.25C16.8539 9.25 16.5181 9.58579 16.5181 10V10.7012L15.9106 10.3505C15.5519 10.1434 15.0932 10.2663 14.8861 10.625C14.679 10.9837 14.8019 11.4424 15.1606 11.6495L15.7676 11.9999L15.1604 12.3505C14.8017 12.5576 14.6788 13.0163 14.8859 13.375C15.093 13.7337 15.5517 13.8566 15.9104 13.6495L16.5181 13.2987V14C16.5181 14.4142 16.8539 14.75 17.2681 14.75C17.6823 14.75 18.0181 14.4142 18.0181 14V13.2993L18.6247 13.6495C18.9835 13.8566 19.4422 13.7337 19.6493 13.375C19.8564 13.0163 19.7335 12.5576 19.3747 12.3505L18.7676 11.9999L19.3745 11.6495C19.7332 11.4424 19.8561 10.9837 19.649 10.625C19.4419 10.2663 18.9832 10.1434 18.6245 10.3505L18.0181 10.7006V10Z"
                        ></path>
                      </g>
                    </svg>
                  }
                ></InputNUI>
              </div>
              <div className="py-3 grid px-10">
                <Button type="submit">Registrarme</Button>
              </div>
            </form>
          </Form>
          <div className="py-4">
            <div className="flex px-10 text-left font-custom text-sm font-normal text-textLabel">
              ¿Ya tienes una cuenta?
              <a
                href="../login"
                className="ps-5 text-textRegisterLabel text-right underline"
              >
                Inicia sesión aquí
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
