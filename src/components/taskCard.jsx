// 'use client'
import Link from "next/link";
import axios from 'axios';
import { FaRegTrashAlt } from "react-icons/fa";
function TaskCard({ task, userId, onTaskDeleted }) {
    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`/api/tasks/${userId}/${taskId}`);
            onTaskDeleted(taskId);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };
    return (
        <>
            <Link href={`/dashboard/${task._id}`} style={{ textDecoration: 'none' }}>

                <div className="task-content">
                    <h3 className="task-title">{task.title.toUpperCase()}</h3>
                    <p className="task-description">{task.description}</p>
                </div>
                <FaRegTrashAlt className="trash-icon boton-trash" onClick={() => handleDeleteTask(task._id)} />
            </Link>
        </>
    );
}

export default TaskCard;