"use client"
import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';

import { useRouter } from 'next/navigation';
import './login.css';
import RedirectAuth from '@/components/redirectAuth';

function LogInPage() {
  const [error, setError] = useState();
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const resSignIn = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })

    if (resSignIn?.error) setError(resSignIn.error);
    else if (resSignIn?.ok) router.push('/dashboard');

    if (resSignIn?.error) return (setError(resSignIn.error));
    if (resSignIn?.ok) return router.push('/dashboard');


  };

  return (
    <div className="login-container"> 
    {error && <p style={{ color: 'red' }}>{error}</p>}
      <h1>Iniciar Sesion</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder='Correo electrónico'
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder='Contraseña'
            required
          />
        </div>
        <button type="submit">Iniciar sesion</button>
      </form>
    </div>
  );
}

export default LogInPage;
