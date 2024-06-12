"use client"
import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import './login.css';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { CiMail } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";
import axios from 'axios';
import Link from 'next/link';

function LogInPage() {
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`/api/prueba`);
      console.log(response.data);
    } catch (error) {
      console.error('Error retrieving user tasks:', error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleExit = () => {
    router.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const resSignIn = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (resSignIn?.error) setError(resSignIn.error);
    else if (resSignIn?.ok) router.push('/dashboard');
  };

  return (
    <div className="background-container">
      <div className="container-login">
        <div className="login-container">
          <button className="exit-button" onClick={handleExit}>
            <IoExitOutline className="exit-icon" />
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <h1>Iniciar Sesión</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <CiMail className="icon" />
              <input
                type="email"
                name="email"
                placeholder='Correo electrónico'
                required
              />
            </div>
            <div className="input-group">
              <RiLockPasswordLine className="icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder='Contraseña'
                required
              />
              <button type="button" className="eye-button-login" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button type="submit" className="login-button">Ingresar</button>
          </form>
          <p className="register-link">No tienes cuenta? <Link href="/register ">Regístrate aquí</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LogInPage;