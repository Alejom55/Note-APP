  // 'use client'
  import "./homepage.css"
  import Link from 'next/link';
  import RedirectAuth from "@/components/redirectAuth";
  import { MdOutlinePersonAddAlt } from "react-icons/md";
  import { AiOutlineEnter } from "react-icons/ai";
  
  export default async function HomePage() {
    await RedirectAuth();
      return (
      <div className="container">
        <div className="header"></div>
        <div className="links-container">
          <h1 className="h1" ><Link href="/login" className="link">Iniciar Sesion</Link></h1>
          <AiOutlineEnter  className="joinicon"/>
  
          <h1 className="h1" ><Link href="/register" className="linkregister">Registrarse </Link></h1>
          <MdOutlinePersonAddAlt className="ADDIcon"/>
  
        </div>
        <div className="titulopagina">
          <div className="titulo-container">
            <h1>Gestor<br />de<br />Tareas</h1>
          </div>
        </div>
      </div>
    );
  };