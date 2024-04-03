"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import './new.css';
import { set } from 'mongoose';

function CreateTaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false); 

    const { data: session, status } = useSession();
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        if (status === "authenticated" && session) {
            setAuthenticated(true);
            if (params.id) {
                fetchTask();
            } else {
                setLoading(false);
            }
        } else {
            router.push('/login');
        }

    }, [status, session]);



    const autenticado = () => {
        if (status === "authenticated" && session) {
            const { user } = session;
            setLoading(true);
            return user;
        }
        return null
    }


    const updateTask = async () => {
        try {
            await axios.put(`/api/tasks/${autenticado()._id}/${params.id}`, {
                title,
                description
            });
            setSuccessMessage('La tarea se ha actualizado correctamente.');
        } catch (error) {
            setError(error.response?.data?.message || 'Algo salió mal, intenta de nuevo.');
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!params.id) {
                await axios.post(`/api/tasks/${autenticado()._id}`, {
                    title,
                    description
                });
                router.push('/dashboard');
            } else {
                updateTask();
                router.push('/dashboard');
                router.refresh();
            }
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
    const fetchTask = async () => {
        try {

            const response = await axios.get(`/api/tasks/${autenticado()._id}/${params.id}`);
            const task = response.data.user;
            setTitle(task.title);
            setDescription(task.description);
            setLoading(false);


        } catch (error) {
            console.log(error)
            setError(error.response?.data?.message || 'Algo salió mal, intenta de nuevo. uwu');
        }
    };



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
                <header className="custom-header">
                    <h1>{!params.id ? 'Crear nueva tarea' : 'Editar tarea'}</h1>
                    </header>


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
              
                <button type="submit" className="submit-button">  {!params.id ? 'Crear tarea' : 'Actualizar tarea'} </button>
                {!params.id ? null : <button onClick={handleDelete} className="delete-button">Eliminar tarea</button>}
            </form>
        </div>
    );
}

export default CreateTaskForm;