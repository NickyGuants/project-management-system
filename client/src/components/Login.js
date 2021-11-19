import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className="form">
            <h1>Sign In</h1>
            <form action="">
                <div className="child">
                    <label htmlFor="email">Email:</label>
                    <input type="email" placeholder="Enter your email" />
                </div>

                <div className="child">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter your password" />
                </div>

                <div>
                    <button>Sign In</button>
                </div>

                <div>
                    <p>Don't Have an Account yet? <Link to="/register">Register</Link></p>
                </div>                
            </form>
        </div>
    )
}

export default Login
