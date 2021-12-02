import React from 'react'
import './navigation.css'
import {Link} from "react-router-dom"

const Navigation = () => {
    return (
        <div className="nav">
            <div className="nav-items">
                <div>
                   <Link to="/"><h2>Home</h2></Link>
                </div>
                <div>
                   <Link to="/dashboard"><h2>Dashboard</h2></Link>
                </div>

                <div>
                <Link to="/projects"><h2>Projects</h2></Link>
                </div>

                <div>
                <Link to="/tasks"><h2>Tasks</h2></Link>
                    
                </div>

                <div>
                <Link to="/users"><h2>Users</h2></Link>
                </div>

                <div>
                <Link to="/settings"><h2>Settings</h2></Link>
                </div>
            </div>
        </div>
    )
}

export default Navigation
