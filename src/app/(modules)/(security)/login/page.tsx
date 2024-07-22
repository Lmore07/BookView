"use client";

import { LoadingContext } from "@/libs/contexts/loadingContext";
import { ToastContext } from "@/libs/contexts/toastContext";
import { ToastType } from "@/libs/interfaces/toast.interface";
import { RolEnum } from "@/libs/interfaces/user.interface";
import Button from "@/ui/components/buttons/ButtonFill";
import InputNUI from "@/ui/components/inputs/inputNUI";
import { Form } from "@/ui/shadcn/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import frontPage from "../../../../../public/imgs/frontPage.webp";
import { loginSchema } from "@/libs/schemas/security";
import { z } from "zod";

export default function Login() {
  //Variables declaradas
  const router = useRouter();
  const { handleShowToast } = useContext(ToastContext)!;
  const { setIsLoading } = useContext(LoadingContext)!;

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const res = await fetch("../api/security/login", {
        cache: "no-store",
        method: "POST",
        body: JSON.stringify(values),
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
  }

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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit, (errors) => {
                    handleShowToast(
                      "Por favor, verifique que los campos hayan sido ingresados",
                      ToastType.WARNING
                    );
                  })}
                  className="space-y-4"
                >
                  <div className="grid px-10">
                    <InputNUI
                      form={form}
                      label="Correo electrónico"
                      name="email"
                      placeholder="asd"
                      type="email"
                      maxLength={50}
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
                              d="M3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20H14C17.7712 20 19.6569 20 20.8284 18.8284C22 17.6569 22 15.7712 22 12C22 8.22876 22 6.34315 20.8284 5.17157C19.6569 4 17.7712 4 14 4H10C6.22876 4 4.34315 4 3.17157 5.17157ZM18.5762 7.51986C18.8413 7.83807 18.7983 8.31099 18.4801 8.57617L16.2837 10.4066C15.3973 11.1452 14.6789 11.7439 14.0448 12.1517C13.3843 12.5765 12.7411 12.8449 12 12.8449C11.2589 12.8449 10.6157 12.5765 9.95518 12.1517C9.32112 11.7439 8.60271 11.1452 7.71636 10.4066L5.51986 8.57617C5.20165 8.31099 5.15866 7.83807 5.42383 7.51986C5.68901 7.20165 6.16193 7.15866 6.48014 7.42383L8.63903 9.22291C9.57199 10.0004 10.2197 10.5384 10.7666 10.8901C11.2959 11.2306 11.6549 11.3449 12 11.3449C12.3451 11.3449 12.7041 11.2306 13.2334 10.8901C13.7803 10.5384 14.428 10.0004 15.361 9.22291L17.5199 7.42383C17.8381 7.15866 18.311 7.20165 18.5762 7.51986Z"
                            ></path>
                          </g>
                        </svg>
                      }
                    ></InputNUI>
                  </div>
                  <div className="grid px-10">
                    <InputNUI
                      form={form}
                      label="Contraseña"
                      name="password"
                      placeholder="*******"
                      type="password"
                      maxLength={20}
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
                  <div className="grid px-10">
                    <Button type="submit">Iniciar sesión</Button>
                  </div>
                </form>
              </Form>

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
                <div className="py-4 flex justify-center">
                  <a
                    href="/forgot"
                    className="underline font-custom text-sm font-normal text-textForgotPassword"
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
