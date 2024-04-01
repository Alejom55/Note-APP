"use client"
import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import RedirectAuth from '@/components/redirectAuth';

import './register.css';

function SignUp() {
    const [error, setError] = useState();
    const router = useRouter();
    // RedirectAuth();

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
            })
            if (restSignIn.ok) {
                router.push('/dashboard');
            }
            // console.log(res);
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                setError(error.response?.data.message);
            }
        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h1>Registrarse</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="fullname"
                        placeholder='Nombre completo'
                        required
                    />
                </div>
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
                <div>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder='Confirmar Contraseña'
                        required
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default SignUp;
