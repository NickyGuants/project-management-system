import React from 'react'
import './dashboard.css'
import Project from '../../components/project/Project'
import Task from '../../components/task/Task'

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Project />
            <Task />
        </div>
    )
}

export default Dashboard
