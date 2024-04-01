import React from "react";
import "./globals.css";

export const metadata = {
  title: "Note app",
  description: "note app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* No es necesario importar la fuente aquí */}
      <body>{children}</body>
    </html>
  );
}
