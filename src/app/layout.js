import Providers from "./providers";
import React from "react";
import "./globals.css";
import { NavBar } from "@/components/NavBar/NavBar";
export const metadata = {
  title: "Note app",
  description: "note app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>

        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
