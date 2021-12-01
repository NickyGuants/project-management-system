import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/userActions'

const Header = () => {
    const { userInfo } = useSelector(state => state.userLogin)
    const { userInfo1 } = useSelector(state => state.userRegister)
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <div className="branding"><h1>User System</h1></div>
            <div className="user">
                {userInfo || userInfo1 ? (<Link to='login' onClick={logoutHandler}>Sign Out</Link>) :
                <>    
                <Link to='login'>Sign In</Link>
                <Link to='register'>Sign Up</Link>
                </>}    
            </div>
        </header>
    )
}

export default Header
