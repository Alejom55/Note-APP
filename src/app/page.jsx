// 'use client'
import "./homepage.css"
import Link from 'next/link';
import RedirectAuth from "@/components/redirectAuth";

export default async function HomePage() {
  await RedirectAuth();
  return (
    <div className="container">
      <div className="header"></div>
      <div className="links-container">
        <h1 className="h1" ><Link href="/login" className="link">Iniciar Sesion</Link></h1>
        <h1 className="h1" ><Link href="/register" className="link">Registrarse</Link></h1>
      </div>

    </div>
  );
};