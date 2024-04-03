import { Inter } from "next/font/google";
import Providers from "./providers";

import React from "react";
import "./globals.css";



export const metadata = {
  title: "Note app",
  description: "note app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">

      <body>
        <Providers>{children}</Providers>
      </body>
      {/* <body>{children}</body> */}
    </html>
  );
}
