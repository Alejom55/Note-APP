"use client"
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importar los iconos de ojo
import { FaClipboardList } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";
import './register.css';


const ExitButton = () => {
  const router = useRouter();

  const handleExit = () => {
    router.push("/");
  };

  return (
    <button className="exit-button" onClick={handleExit}>
      <IoExitOutline className="exit-icon" />
    </button>
  );
};

function SignUp() {
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // Estado para el mensaje de éxito
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await axios.post('/api/auth/signup', {
        email: formData.get('email'),
        password: formData.get('password'),
        fullname: formData.get('fullname')
      });

      const restSignIn = await signIn('credentials', {
        email: res.data.email,
        password: formData.get('password'),
        redirect: false,
      });

      if (restSignIn.ok) {
        setRegistrationSuccess(true); // Establecer el estado de éxito del registro a true
        setTimeout(() => {
          router.push('/login'); // Redireccionar a la página de inicio de sesión después de 3 segundos
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  };

  return (
    <div className="register-container">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {registrationSuccess && (
        <p style={{ color: 'green' }}>¡Registro exitoso! Serás redireccionado a la página de inicio de sesión.</p>
      )}
      <ExitButton />
      <div className="input-wrapper">
        <h1>Registrate en nuestro</h1>
        <h2>gestor de notas</h2>
        <FaClipboardList className="clipboard-icon" />
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="fullname"
              placeholder='Nombre completo'
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder='Correo electrónico'
              required
            />
          </div>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder='Contraseña'
              required
            />
            <button type="button" className="eye-button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder='Confirmar Contraseña'
              required
            />
          </div>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;