import { LoadingProvider } from "@/libs/contexts/loadingContext";
import { ModalProvider } from "@/libs/contexts/modalContext";
import Providers from "@/libs/contexts/providers";
import { VoiceRecorderProvider } from "@/libs/contexts/speechToTextContext";
import { ToastProvider } from "@/libs/contexts/toastContext";
import AccessibilityButton from "@/ui/components/buttons/AccessibilityButton";
import type { Metadata } from "next";
import Script from "next/script";
import "reflect-metadata";
import "regenerator-runtime/runtime";
import "../ui/globals.css";
import { BreadcrumbProvider } from "@/libs/contexts/breadcrumbContext";
import EyeTrackingCursor from "@/libs/utils/eyeTracking";

export const metadata: Metadata = {
  title: "BookView",
  description: "Aplicación para la lectura de libros en línea.",
  applicationName: "BookView",
  authors: [{ name: "Luis Moreira" }],
  creator: "Luis Moreira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <>
        <Script
          src="https://webgazer.cs.brown.edu/webgazer.js"
          strategy="beforeInteractive"
        ></Script>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=G-EFDRNJKG97`}
          />

          <Script id="" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EFDRNJKG97', {
              page_path: window.location.pathname,
              });
          `}
          </Script>
        </>
      </head>
      <body>
        <Providers>
          <LoadingProvider>
            <BreadcrumbProvider>
              <ModalProvider>
                <ToastProvider>
                  <VoiceRecorderProvider>{children}</VoiceRecorderProvider>
                  <AccessibilityButton />
                  
                </ToastProvider>
              </ModalProvider>
            </BreadcrumbProvider>
          </LoadingProvider>
        </Providers>
      </body>
    </html>
  );
}
