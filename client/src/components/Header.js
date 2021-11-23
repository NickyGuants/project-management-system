import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/userActions'

const Header = () => {
    const { userInfo } = useSelector(state => state.userLogin)
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <div className="branding"><h1>User System</h1></div>
            <div className="user">
                {userInfo ? (<Link to='login' onClick={logoutHandler}>Sign Out</Link>) :
                <>    
                <Link to='login'>Sign In</Link>
                <Link to='register'>Sign Up</Link>
                </>}    
            </div>
        </header>
    )
}

export default Header
