  'use client'
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { useSession, signOut } from 'next-auth/react';
  import TaskCard from '@/components/taskCard';
  import Link from 'next/link';
  import './dashboard.css'
  import { IoExitOutline } from "react-icons/io5";

  const handleExit = () => {
    router.push("/");
  };
  function TasksPage() {
    const [userId, setUserId] = useState('');
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { data: session, status } = useSession();

    const autenticado = () => {
      if (status === "authenticated" && session) {
        const { user } = session;
        return user;
      }
    }

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/tasks/${userId}`);
        setTasks(response.data.data.notes);
        setError('');
      } catch (error) {
        console.error('Error retrieving user tasks:', error);
        setError('Error retrieving user tasks. Please try again later.');
      }
      setLoading(false);
    };

    useEffect(() => {
      if (userId) {
        fetchTasks();
      }
    }, [userId]);
    useEffect(() => {
      if (status === "authenticated" && autenticado()._id) {
        setUserId(autenticado()._id);
      }
    }, [status]);

    return (

      <div className="tasks-container"> {/* Aplica la clase de estilo al contenedor principal */}
          <button className="exit-button" onClick={handleExit}>
          <IoExitOutline className="exit-icon" />
        </button>
        {loading && <p>Loading...</p>}
        {tasks.length === 0 && !loading && !error && (
          <p>No tasks found for the user.</p>
        )}
        {error && <p>{error}</p>}
        {tasks.length > 0 && (
          <div>
            <h2>Tareas del usuario</h2>
            {tasks.map(task => (
              <div key={task._id}>
                <TaskCard task={task} />
              </div>
            ))}
          </div>
        )}
        <Link href="/dashboard/new">
          <button className="new-task-button">Nueva tarea</button> {/* Aplica estilos al botón */}
        </Link>
        <button onClick={signOut} className="signout-button"> {/* Aplica estilos al botón */}
          Cerrar sesión
        </button>
      </div>
    );
  }

  export default TasksPage;