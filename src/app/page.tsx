"use client";

import { Button } from "@/components/ui/button";
import udlPrinciples from "../../public/imgs/duaPrincipios.webp";
import persons from "../../public/imgs/landing.webp";
import Link from "next/link";
import Image from "next/image";

export default function RootPage() {
  //Variables declaradas

  return (
    <div className="flex flex-col min-h-[100dvh] font-custom">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-gradient-to-r from-primary-450 to-secondary-450  shadow-lg">
        <div>
          <Link
            href="#"
            className="flex items-center text-textButtonFill justify-center animate-pulse"
            prefetch={false}
          >
            <BookIcon className="h-6 w-6" />
            <span className="sr-only">Book App</span>
          </Link>
        </div>
        <div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link
              href="#about"
              tabIndex={0}
              className="inline-flex h-9 text-textButtonFill items-center justify-center rounded-md bg-white/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 dark:bg-gray-950/10 dark:hover:bg-gray-950/20 dark:focus:ring-gray-300"
              prefetch={false}
            >
              Información
            </Link>
            <Link
              href="#video"
              className="inline-flex text-textButtonFill h-9 items-center justify-center rounded-md bg-white/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 dark:bg-gray-950/10 dark:hover:bg-gray-950/20 dark:focus:ring-gray-300"
              prefetch={false}
            >
              Video
            </Link>
            <Link
              href="#udl"
              className="inline-flex text-textButtonFill h-9 items-center justify-center rounded-md bg-white/10 px-4 py-2 text-sm font-medium  transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 dark:bg-gray-950/10 dark:hover:bg-gray-950/20 dark:focus:ring-gray-300"
              prefetch={false}
            >
              DUA
            </Link>
          </nav>
        </div>
        <div className="flex gap-2">
          <Link
            href="/register"
            className="inline-flex h-9 text-textButtonOutlined bg-bgButtonOutlined items-center justify-center rounded-md  px-4 py-2 text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-950"
            prefetch={false}
          >
            Registrarme
          </Link>
          <Link
            href="/login"
            className="inline-flex h-9 items-center justify-center rounded-md bg-bgButtonFill px-4 py-2 text-sm font-semibold text-textButtonFill shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-800 dark:focus:ring-gray-300"
            prefetch={false}
          >
            Iniciar Sesión
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section
          id="about"
          className="w-full py-12 md:py-24 lg:py-10 bg-gradient-to-r from-primary-100 to-secondary-100 relative"
        >
          <Image
            src={persons}
            alt="Fondo"
            className="absolute inset-0 bg-cover w-full bg-center opacity-[0.07] z-0"
          ></Image>
          <div className="container grid gap-12 px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fadeIn">
              <div className="space-y-2 flex flex-col items-center">
                <div className="inline-block font-semibold rounded-lg bg-gradient-to-r from-primary-250 to-secondary-250 px-3 py-1 text-sm  ">
                  Creación y lectura de libros
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl animate-slideInDown dark:text-black">
                  Da rienda suelta a tu creatividad con el diseño universal
                </h2>
                <p className="max-w-[900px] text-center text-textLanding md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 animate-fadeIn">
                  Nuestra aplicación le permite crear y leer libros dirigidos a
                  diversos estudiantes. Adopte los principios del Diseño
                  Universal para el Aprendizaje y abra un mundo de narración
                  inclusiva.
                </p>
                <div className="mt-6">
                  <Link
                    href="/login"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary-500 px-4 py-2 text-lg font-medium shadow-sm text-bgColorRight transition-colors hover:bg-primary-650 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-700"
                    prefetch={false}
                  >
                    Empezar a leer
                  </Link>
                </div>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl divide-y shadow-xl divide-border rounded-lg border border-gray-200 md:grid-cols-3 md:divide-x md:divide-y-0 dark:border-gray-800 animate-slideInUp">
              <div className="flex items-center flex-col gap-4 p-8 md:p-10 hover:bg-gradient-to-r from-primary-100 to-secondary-200  transition-colors duration-300 ease-in-out">
                <div className="flex items-center justify-center bg-primary-500 rounded-full h-12 w-12">
                  <InfoIcon className="h-6 w-6 text-bgColorRight " />
                </div>
                <h3 className="text-xl font-bold">Interfaz Intuitiva</h3>
                <p className="text-textLanding dark:text-gray-400">
                  Experiencia perfecta de creación y lectura de libros para
                  usuarios de todos los niveles.
                </p>
              </div>
              <div className="flex items-center flex-col gap-4 p-8 md:p-10 hover:bg-gradient-to-r from-primary-100 to-secondary-200 transition-colors duration-300 ease-in-out">
                <div className="flex items-center justify-center bg-primary-500 rounded-full h-12 w-12">
                  <MusicIcon className="h-6 w-6 text-bgColorRight" />
                </div>
                <h3 className="text-xl font-bold">Integración Multimedia</h3>
                <p className="text-textLanding dark:text-gray-400">
                  Incorpore una variedad de medios, incluidos texto, imágenes,
                  audio y video, para atender diversos estilos de aprendizaje.
                </p>
              </div>
              <div className="flex items-center flex-col gap-4 p-8 md:p-10 hover:bg-gradient-to-r from-primary-100 to-secondary-200 transition-colors duration-300 ease-in-out">
                <div className="flex items-center justify-center bg-primary-500 rounded-full h-12 w-12">
                  <AccessibilityIcon className="h-6 w-6 text-bgColorRight" />
                </div>
                <h3 className="text-xl font-bold text-center">
                  Funciones de accesibilidad
                </h3>
                <p className="text-textLanding dark:text-gray-400">
                  Asegúrese de que sus libros sean accesibles para lectores con
                  discapacidades a través de tecnologías de asistencia
                  integradas.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="video"
          className="w-full md:py-24 lg:py-10 bg-gradient-to-r from-primary-100 to-secondary-100"
        >
          <div className="container flex items-center justify-center gap-4 px-4 md:px-6">
            <div className="space-y-3 animate-fadeIn flex flex-col items-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-slideInDown">
                Experimente el poder del diseño universal
              </h2>
              <p className="mx-auto max-w-[700px] text-textLanding md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 animate-fadeIn">
                Mire nuestra demostración en video para ver cómo nuestra
                aplicación le permite crear y leer libros dirigidos a diversos
                estudiantes.
              </p>
              <div className="mt-6">
                <Link
                  href="/login"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary-500 px-4 py-2 text-lg font-medium text-bgColorRight shadow-sm transition-colors hover:bg-primary-650 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-700"
                  prefetch={false}
                >
                  ¡Quiero empezar ahora!
                </Link>
              </div>
            </div>
            <div className="w-full max-w-2xl aspect-video overflow-hidden rounded-lg relative animate-zoomIn">
              <video className="w-full">
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </section>
        <section
          id="udl"
          className="w-full py-5 md:py-5 lg:py-10 bg-gradient-to-r from-primary-100 to-secondary-100"
        >
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2 animate-fadeIn flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight animate-slideInLeft">
                Adoptar el diseño universal para el aprendizaje
              </h2>
              <p className="max-w-[600px] text-textLanding md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-left inline-block dark:text-gray-400 animate-fadeIn">
                Nuestra aplicación está diseñada teniendo en cuenta los
                principios del Diseño Universal para el Aprendizaje (DUA). DUA
                es un marco que guía el diseño de experiencias de aprendizaje
                para que sean accesibles y efectivas para todas las personas,
                independientemente de sus habilidades, antecedentes o estilos de
                aprendizaje.
              </p>
              <ul className="grid gap-4 py-4 animate-slideInRight">
                <li className="flex items-center gap-2 bg-bgColorRight dark:bg-gray-950 rounded-lg p-4 shadow-lg">
                  <div className="flex items-center justify-center dark:bg-indigo-600 rounded-full">
                    <CheckIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    Múltiples medios de representación: Ofrezca contenido en una
                    variedad de formatos, como texto, audio y visual.
                  </div>
                </li>
                <li className="flex items-center gap-2 bg-bgColorRight dark:bg-gray-950 rounded-lg p-4 shadow-lg">
                  <div className="flex items-center justify-center dark:bg-indigo-600 rounded-full">
                    <CheckIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    Múltiples medios de acción y expresión: Permitir a los
                    usuarios interactuar con el contenido y expresar su
                    comprensión de diversas formas.
                  </div>
                </li>
                <li className="flex items-center gap-2 bg-bgColorRight dark:bg-gray-950 rounded-lg p-4 shadow-lg">
                  <div className="flex items-center justify-center dark:bg-indigo-600 rounded-full">
                    <CheckIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    Múltiples medios de participación: proporcione opciones que
                    motiven y mantengan el interés y el esfuerzo del alumno.
                  </div>
                </li>
              </ul>
              <div className="mt-6 flex self-center">
                <Link
                  href="/login"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary-500 px-4 py-2 text-lg font-semibold text-bgColorRight shadow-sm transition-colors hover:bg-primary-650 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-700"
                  prefetch={false}
                >
                  ¡Empezar ya!
                </Link>
              </div>
            </div>
            <Image
              src={udlPrinciples}
              alt="UDL Principles"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last animate-zoomIn"
            ></Image>
          </div>
        </section>
      </main>
      <footer className="flex flex-col text-textButtonFill gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gradient-to-r from-primary-450 to-secondary-450 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <p className="text-xs animate-fadeIn font-semibold">
            &copy; 2024 Book App. Creado por Luis Moreira.
          </p>
          <nav className="flex gap-4 sm:gap-6 animate-fadeIn">
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4 transition-colors duration-300 ease-in-out"
              prefetch={false}
            >
              Terminos y servicios
            </Link>
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4 transition-colors duration-300 ease-in-out"
              prefetch={false}
            >
              Contactanos
            </Link>
          </nav>
        </div>
        <div className="ml-auto mr-16 flex gap-2 items-center animate-fadeIn">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary-500 dark:hover:bg-purple-600 transition-colors duration-300 ease-in-out"
          >
            <FacebookIcon className="h-4 w-4" />
            <span className="sr-only">Facebook</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary-500 dark:hover:bg-purple-600 transition-colors duration-300 ease-in-out"
          >
            <InstagramIcon className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary-500 dark:hover:bg-purple-600 transition-colors duration-300 ease-in-out"
          >
            <LinkedinIcon className="h-4 w-4" />
            <span className="sr-only">LinkedIn</span>
          </Button>
        </div>
      </footer>
    </div>
  );
}

function FacebookIcon(props: any) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: any) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props: any) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props: any) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function AccessibilityIcon(props: any) {
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
      <circle cx="16" cy="4" r="1" />
      <path d="m18 19 1-7-6 1" />
      <path d="m5 8 3-3 5.5 3-2.36 3.5" />
      <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
      <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
    </svg>
  );
}

function BookIcon(props: any) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-primary-500"
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
          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
        ></path>
      </g>
    </svg>
  );
}

function InfoIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function MusicIcon(props: any) {
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
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}
