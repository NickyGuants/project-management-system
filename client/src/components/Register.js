import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <div className="form">
            <h1>Sign Up</h1>
            <form action="">
                <div className="child">
                    <label htmlFor="">Email Address</label>
                    <input type="email" placeholder="Enter your email address" />
                </div>
                <div className="child">
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Enter your name" />
                </div>

                <div className="child">
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Enter your username" />
                </div>
                
                <div className="child">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter your password" />
                </div>

                <div className="child">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" placeholder="confirm your password" />
                </div>
                <div>
                    <button>Submit</button>
                </div>
                
                <div>
                    <p>Already have an Account? <Link to="/login">Login</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Register
