import React from 'react';
import Link from 'next/link';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>                
        <Link href="/login"> {/* Especifica la ruta '/signup' para el formulario de registro */}
          <a className={styles.button}>Login</a> {/* Usa el componente 'Link' con un elemento 'a' */}
        </Link>
        <Link href="/signup"> {/* Especifica la ruta '/signup' para el formulario de registro */}
          <a className={styles.button}>Sign Up</a> {/* Usa el componente 'Link' con un elemento 'a' */}
        </Link>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Bienvenido a Mi Sitio Web</h1>
        <p>Este es el contenido de la página de inicio.</p>
        <p>Otro párrafo de texto centrado en la página de inicio.</p>
      </div>
    </div>
  );
};

export default Home;
