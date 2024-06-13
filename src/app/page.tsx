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
            Iniciar sesión
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
                <div className="max-w-[900px] text-center text-textLanding md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 animate-fadeIn">
                  Nuestra aplicación le permite crear y leer libros dirigidos a
                  diversos estudiantes. Adopte los principios del Diseño
                  Universal para el Aprendizaje y abra un mundo de narración
                  inclusiva.
                </div>
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
                <div className="text-xl font-bold">Interfaz intuitiva</div>
                <div className="text-textLanding dark:text-gray-400">
                  Experiencia satisfactoria de creación y lectura de libros para
                  usuarios de todos los niveles.
                </div>
              </div>
              <div className="flex items-center flex-col gap-4 p-8 md:p-10 hover:bg-gradient-to-r from-primary-100 to-secondary-200 transition-colors duration-300 ease-in-out">
                <div className="flex items-center justify-center bg-primary-500 rounded-full h-12 w-12">
                  <MusicIcon className="h-6 w-6 text-bgColorRight" />
                </div>
                <div className="text-xl font-bold">Integración multimedia</div>
                <div className="text-textLanding dark:text-gray-400">
                  Incorpore una variedad de medios, incluidos texto, imágenes,
                  audio y video, para atender diversos estilos de aprendizaje.
                </div>
              </div>
              <div className="flex items-center flex-col gap-4 p-8 md:p-10 hover:bg-gradient-to-r from-primary-100 to-secondary-200 transition-colors duration-300 ease-in-out">
                <div className="flex items-center justify-center bg-primary-500 rounded-full h-12 w-12">
                  <AccessibilityIcon className="h-6 w-6 text-bgColorRight" />
                </div>
                <div className="text-xl font-bold text-center">
                  Funciones de accesibilidad
                </div>
                <div className="text-textLanding dark:text-gray-400">
                  Asegúrese de que sus libros sean accesibles para lectores con
                  discapacidades a través de tecnologías de asistencia
                  integradas.
                </div>
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
              <div className="mx-auto max-w-[700px] text-textLanding md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 animate-fadeIn">
                Mire nuestra demostración en video para ver cómo nuestra
                aplicación le permite crear y leer libros dirigidos a diversos
                estudiantes.
              </div>
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
                Adoptar el Diseño Universal Para El Aprendizaje
              </h2>
              <div className="max-w-[600px] text-textLanding md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-left inline-block dark:text-gray-400 animate-fadeIn">
                Nuestra aplicación está diseñada teniendo en cuenta los
                principios del Diseño Universal para el Aprendizaje (DUA). El DUA
                es un marco que guía el diseño de experiencias de aprendizaje
                para que sean accesibles y efectivas para todas las personas,
                independientemente de sus habilidades, antecedentes o estilos de
                aprendizaje.
              </div>
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
      <footer className="flex font-custom gap-2 sm:flex-row w-full items-center border-t bg-gradient-to-r from-primary-100 to-secondary-100 shadow-lg">
        <div className="container px-4 mx-auto">
          <div className="lg:flex pt-2">
            <div className="w-full -mx-6 lg:w-2/5">
              <div className="px-6">
                <a href="#">
                  Logo
                </a>

                <p className="max-w-sm m-0 mt-2 text-textLanding">Acceda y gestione sus libros en cualquier momento y desde cualquier lugar.</p>

                <div className="flex mt-6 -mx-2">

                  <Link href="https://www.facebook.com/uteq.ecuador/" target="_blank"
                    className="mx-2 text-textLanding transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                    aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                      <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                    </svg>
                  </Link>

                  <Link href="https://www.youtube.com/user/UTEQCHANNEL/videos" target="_blank"
                    className="mx-2 text-textLanding transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                    aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                      <path fill="#FF3D00" d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"></path><path fill="#FFF" d="M20 31L20 17 32 24z"></path>
                    </svg>
                  </Link>

                  <Link href="https://ec.linkedin.com/school/universidad-t%C3%A9cnica-estatal-de-quevedo/" target="_blank"
                    className="mx-2 text-textLanding transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                    aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                      <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
                    </svg>
                  </Link>

                  <Link
                    href={"https://www.tiktok.com/@uteq.ec"} target="_blank"
                    className="mx-2 text-textLanding transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                    aria-label="TikTok">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                      <path fill="#212121" fillRule="evenodd" d="M10.904,6h26.191C39.804,6,42,8.196,42,10.904v26.191 C42,39.804,39.804,42,37.096,42H10.904C8.196,42,6,39.804,6,37.096V10.904C6,8.196,8.196,6,10.904,6z" clipRule="evenodd"></path><path fill="#ec407a" fillRule="evenodd" d="M29.208,20.607c1.576,1.126,3.507,1.788,5.592,1.788v-4.011 c-0.395,0-0.788-0.041-1.174-0.123v3.157c-2.085,0-4.015-0.663-5.592-1.788v8.184c0,4.094-3.321,7.413-7.417,7.413 c-1.528,0-2.949-0.462-4.129-1.254c1.347,1.376,3.225,2.23,5.303,2.23c4.096,0,7.417-3.319,7.417-7.413L29.208,20.607L29.208,20.607 z M30.657,16.561c-0.805-0.879-1.334-2.016-1.449-3.273v-0.516h-1.113C28.375,14.369,29.331,15.734,30.657,16.561L30.657,16.561z M19.079,30.832c-0.45-0.59-0.693-1.311-0.692-2.053c0-1.873,1.519-3.391,3.393-3.391c0.349,0,0.696,0.053,1.029,0.159v-4.1 c-0.389-0.053-0.781-0.076-1.174-0.068v3.191c-0.333-0.106-0.68-0.159-1.03-0.159c-1.874,0-3.393,1.518-3.393,3.391 C17.213,29.127,17.972,30.274,19.079,30.832z" clipRule="evenodd"></path><path fill="#fff" fillRule="evenodd" d="M28.034,19.63c1.576,1.126,3.507,1.788,5.592,1.788v-3.157 c-1.164-0.248-2.194-0.856-2.969-1.701c-1.326-0.827-2.281-2.191-2.561-3.788h-2.923v16.018c-0.007,1.867-1.523,3.379-3.393,3.379 c-1.102,0-2.081-0.525-2.701-1.338c-1.107-0.558-1.866-1.705-1.866-3.029c0-1.873,1.519-3.391,3.393-3.391 c0.359,0,0.705,0.056,1.03,0.159V21.38c-4.024,0.083-7.26,3.369-7.26,7.411c0,2.018,0.806,3.847,2.114,5.183 c1.18,0.792,2.601,1.254,4.129,1.254c4.096,0,7.417-3.319,7.417-7.413L28.034,19.63L28.034,19.63z" clipRule="evenodd"></path><path fill="#81d4fa" fillRule="evenodd" d="M33.626,18.262v-0.854c-1.05,0.002-2.078-0.292-2.969-0.848 C31.445,17.423,32.483,18.018,33.626,18.262z M28.095,12.772c-0.027-0.153-0.047-0.306-0.061-0.461v-0.516h-4.036v16.019 c-0.006,1.867-1.523,3.379-3.393,3.379c-0.549,0-1.067-0.13-1.526-0.362c0.62,0.813,1.599,1.338,2.701,1.338 c1.87,0,3.386-1.512,3.393-3.379V12.772H28.095z M21.635,21.38v-0.909c-0.337-0.046-0.677-0.069-1.018-0.069 c-4.097,0-7.417,3.319-7.417,7.413c0,2.567,1.305,4.829,3.288,6.159c-1.308-1.336-2.114-3.165-2.114-5.183 C14.374,24.749,17.611,21.463,21.635,21.38z" clipRule="evenodd"></path>
                    </svg>
                  </Link>

                  <Link href="https://twitter.com/utequevedo" target="_blank"
                    className="mx-2 text-textLanding transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                    aria-label="X">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                      <path fill="#212121" fillRule="evenodd" d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z" clipRule="evenodd"></path><path fill="#fff" d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"></path><polygon fill="#fff" points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"></polygon><polygon fill="#fff" points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"></polygon>
                    </svg>
                  </Link>

                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:flex-1">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div>
                  <h3 className="text-textLanding font-semibold m-0 uppercase dark:text-white">Servicios</h3>
                  <a href="https://biblioteca.uteq.edu.ec/" target="_blank" className="block mt-2 text-sm text-textLanding hover:underline">Biblioteca</a>
                  <a href="https://elibro.net/es/lc/uteq/login_usuario/?next=/es/lc/uteq/inicio" target="_blank" className="block mt-2 text-sm text-textLanding hover:underline">E-Libro</a>
                </div>

                <div>
                  <h3 className="text-textLanding font-semibold m-0 uppercase dark:text-white">Contactos</h3>
                  <span className="block mt-2 text-sm text-textLanding hover:underline">(+593) 5 3702-220 Ext. 8001</span>
                  <span className="block mt-2 text-sm text-textLanding hover:underline">info@uteq.edu.ec</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="h-px my-4 bg-gray-200 border-none dark:bg-gray-700" />

          <div>
            <p className="text-center text-textLanding">© 2024 Universidad Técnica Estatal de Quevedo</p>
          </div>
        </div>
      </footer>
    </div>
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
