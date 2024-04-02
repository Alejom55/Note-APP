'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';

function CreateTaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const { data: session, status } = useSession();
    const router = useRouter();
    const params = useParams();




    const autenticado = () => {
        if (status === "authenticated" && session) {
            const { user } = session;
            return user;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/tasks/${autenticado()._id}`, {
                title,
                description
            });
            router.push('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'Algo salio mal, intenta de nuevo.');
        }
    };
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/tasks/${autenticado()._id}/${params.id}`);
            router.push('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'Algo salio mal, intenta de nuevo.');
        }
    }

    useEffect(() => {
        console.log(params);
    });

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <header>

            </header>
            <h2>{!params.id ? 'Crear nueva tarea' : 'Editar tarea'}</h2>
            {!params.id ? null : <button onClick={handleDelete}>Eliminar tarea</button>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titulo:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Descripcion:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Crear tarea</button>
            </form>
        </div>
    );
}

export default CreateTaskForm;
