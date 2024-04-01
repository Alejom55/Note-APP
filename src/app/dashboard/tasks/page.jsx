'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

function CreateTaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const { data: session, status } = useSession();
    console.log(session, status)
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
            console.log(response.data); // Maneja la respuesta según sea necesario
            // Aquí podrías actualizar el estado de tu aplicación o redirigir a otra página, por ejemplo
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Create Task</button>
            </form>
        </div>
    );
}

export default CreateTaskForm;
