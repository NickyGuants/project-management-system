import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <Link to="register">SignUp</Link>
            <Link to="login">Login</Link>
        </header>
    )
}

export default Header
