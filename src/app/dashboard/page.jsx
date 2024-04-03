"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import './dashboard.css';
import { FaRegTrashAlt } from "react-icons/fa";



function TasksPage() {
  const [userId, setUserId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { data: session, status } = useSession();
  const [containerHeight, setContainerHeight] = useState('auto');

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
      // Restaurar la altura del contenedor a "auto" para evitar que se desplace hacia arriba
      setContainerHeight('auto');
    } catch (error) {
      console.error('Error retrieving user tasks:', error);
      setError('Error retrieving user tasks. Please try again later.');
    }
    setLoading(false);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${userId}/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
      // Establecer una altura mínima para evitar que el contenedor se colapse
      const minHeight = Math.max(200, tasks.length * 100); // Ajustar el valor mínimo según tus necesidades
      setContainerHeight(minHeight + 'px');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
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
    <div className="tasks-container" style={{ minHeight: containerHeight }}>
      {loading && <p>Loading...</p>}
      {tasks.length === 0 && !loading && !error && (
        <p className="notask">No tasks found for the user.</p>
      )}
      {error && <p>{error}</p>} 
      {tasks.length > 0 && (
        <>
          <div className="task-container">
            <div className="task-header">
              <span className="tasks-title">Lista de tareas</span>
              <Link href="/dashboard/new">
                <button className="new-task-button">Nueva tarea</button>
              </Link>
            </div>
            <div className="task-grid">
              {tasks.map(task => (  
                <div key={task._id} className="task-card">
                <div className="task-content">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>
                <button className="boton-trash" onClick={() => handleDeleteTask(task._id)}>
                  <FaRegTrashAlt className="trash-icon" />
                </button>
              </div>

              ))}
            </div>
          </div>
        </>
      )}
      {tasks.length === 0 && (
        <div className="no-tasks-container">
          <Link href="/dashboard/new">
            <button className="new-task-button">Nueva tarea</button>
          </Link>
        </div>
      )}

      <button onClick={signOut} className="signout-button">
        Cerrar sesión
      </button>
    </div>
  );
}

export default TasksPage;