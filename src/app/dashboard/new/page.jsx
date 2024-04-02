'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function CreateTaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const { data: session, status } = useSession();
    const router = useRouter();
    // console.log(session, status)
    const autenticado = () => {
        if (status === "authenticated" && session) {
            const { user } = session;
            return user;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/tasks/${autenticado()._id}`, {
                title,
                description
            });
            router.push('/dashboard');
            // console.log(response.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Algo salio mal, intenta de nuevo.');
        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h2>Create Task</h2>
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
