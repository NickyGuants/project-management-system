import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <div className="branding"><h1>User System</h1></div>
            <div className="user">
                <Link to='login'>Sign In</Link>
                <Link to='register'>Sign Up</Link>
            </div>
        </header>
    )
}

export default Header
