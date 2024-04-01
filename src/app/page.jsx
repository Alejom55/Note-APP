import "./homepage.css"
import Link from 'next/link';

export default function HomePage() {
    return (
      <div className="container">
        <header className="header">
        <div className="links-container">
        <Link href = "/login" className="link"><h1 className="h1" >Iniciar Sesion</h1></Link>  
        <Link href = "/register" className="link"><h1 className="h1" >Registrarse</h1></Link> 
        </div>
        </header>
        
        </div> 
    );
  };