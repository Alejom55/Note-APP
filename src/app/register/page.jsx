"use client"
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import './register.css';

function SignUp() {
    const [error, setError] = useState();
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
            console.log(res);
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
