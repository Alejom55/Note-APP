function TaskCard({ task }) {
    return (
        <div className="task-container">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
        </div>
    );
}

export default TaskCard;