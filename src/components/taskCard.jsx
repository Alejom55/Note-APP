import Link from "next/link";

function TaskCard({ task }) {
    return (
        <Link href={`/dashboard/${task._id}`}>
            <div className="task-container">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
            </div>
        </Link>
    );
}

export default TaskCard;