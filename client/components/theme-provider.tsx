import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Add error boundary for theme provider
  try {
    return (
      <NextThemesProvider
        {...props}
        enableSystem={true}
        storageKey="unclub-theme"
        defaultTheme="dark"
      >
        {children}
      </NextThemesProvider>
    );
  } catch (error) {
    console.error("Theme provider error:", error);
    // Fallback to children without theme provider
    return <>{children}</>;
  }
}
