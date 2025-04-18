"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import notFound from "../../public/imgs/illustration.svg";

export default function RootPage() {
    //Variables declaradas
    const router = useRouter();

    return (
        <section className="font-custom">
            <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                <div className="wf-ull lg:w-1/2">
                    <p className="text-sm font-medium text-blue-500 dark:text-blue-400">Error 404</p>
                    <h1 className="mt-3 text-2xl font-semibold  md:text-3xl">Página no encontrada</h1>
                    <p className="mt-4 text-textLanding">Lo sentimos, la página que estás buscando no existe. Aquí hay algunos enlaces útiles:</p>

                    <div className="flex items-center mt-6 gap-x-3">
                        <button onClick={() => {
                            router.back();
                        }} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            <span>Volver</span>
                        </button>

                        <button onClick={() => {
                            router.replace('/');
                        }} className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                            Ir al inicio
                        </button>
                    </div>
                </div>

                <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                    <Image
                        src={notFound}
                        alt=""
                        className="w-full max-w-lg lg:mx-auto"
                    ></Image>
                </div>
            </div>
        </section>
    );
}