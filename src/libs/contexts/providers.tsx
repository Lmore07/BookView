"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <NextThemesProvider>{children}</NextThemesProvider>;
}
