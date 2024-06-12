"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import './dashboard.css';
import TaskCard from '@/components/taskCard';



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
      setContainerHeight('auto');
    } catch (error) {
      console.error('Error retrieving user tasks:', error);
      setError('Error retrieving user tasks. Please try again later.');
    }
    setLoading(false);
  };

  const handleTaskDeleted = (deletedTaskId) => {
    setTasks(tasks.filter(task => task._id !== deletedTaskId));
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
    <div className='background-tasks'>

      <div className="tasks-container" style={{ minHeight: containerHeight }}>
        {loading && <h2>Loading...</h2>}
        {tasks.length === 0 && !loading && !error && (
          <h2 className="notask">No tasks found for the user.</h2>
        )}
        {error && <h3>{error}</h3>}
        {tasks.length > 0 && (
          <>
            <div className="task-container">
              <div className="task-header">
                <h2 className="tasks-title">Lista de Tareas</h2>
                <Link href="/dashboard/new">
                  <button className="new-task-button">Vieja tarea</button>
                </Link>
              </div>
              <div className="task-grid">
                {tasks.map(task => (
                  <div key={task._id} className="task-card">
                    <TaskCard task={task} userId={userId} onTaskDeleted={handleTaskDeleted} />
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
    </div>
  );
}

export default TasksPage;