"use client";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import tailwindConfig from "../../tailwind.config";

import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <NextThemesProvider>{children}</NextThemesProvider>;
}
