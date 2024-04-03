"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import './new.css'; // Importar archivo de estilos CSS

function CreateTaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
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
            setSuccessMessage('La tarea se ha creado correctamente.');
        } catch (error) {
            setError(error.response?.data?.message || 'Algo salió mal, intenta de nuevo.');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/tasks/${autenticado()._id}/${params.id}`);
            router.push('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'Algo salió mal, intenta de nuevo.');
        }
    }

    useEffect(() => {
        console.log(params);
    });

    return (
        <div className="create-task-container">
            {error && <p className="error-message">{error}</p>}
            {successMessage && (
                <div>
                    <p className="success-message">{successMessage}</p>
                    <div className="buttons-container">
                        <button onClick={() => setSuccessMessage('')} className="submit-button">Crear otra tarea</button>
                        <button onClick={() => router.push('/dashboard')} className="submit-button">Regresar al dashboard</button>
                    </div>
                </div>
            )}
            <header>
                <h1>{!params.id ? 'Crear nueva tarea' : 'Editar tarea'}</h1>
            </header>
            {!params.id ? null : <button onClick={handleDelete} className="delete-button">Eliminar tarea</button>}

            <form onSubmit={handleSubmit} className="task-form">
                <div className="form-group">
                    <label htmlFor="title">Titulo:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button">Crear tarea</button>
            </form>
        </div>
    );
}

export default CreateTaskForm;