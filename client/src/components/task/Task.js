import React from 'react'
import './task.css'

const Task = () => {
    return (
        <div className="task-card">
            <h1>My Tasks (10)</h1>
            <div className="task-item">
                <p>1</p>
                <p>Create Wireframe</p>
                <p>icon</p>
            </div>
            <div className="task-item">
                <p>1</p>
                <p>Logo Design</p>
                <p>icon</p>
            </div>
            <div className="task-item">
                <p>1</p>
                <p>Dashboard design</p>
                <p>icon</p>
            </div>
            <div className="task-item">
                <p>1</p>
                <p>Redux integration</p>
                <p>icon</p>
            </div>
            <div className="task-item">
                <p>1</p>
                <p>Create header</p>
                <p>icon</p>
            </div>
        </div>
    )
}

export default Task
