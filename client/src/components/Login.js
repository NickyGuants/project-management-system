import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/userActions'
import { useNavigate } from 'react-router'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    //const location = useLocation();
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const handleSubmit = (e) => {
        e.preventDefault();
        //dispatch the login action
        dispatch(login(email, password))
    }


    return (
        <div className="form">
            <h1>Sign In</h1>
            {error && <h1>{error}</h1>}
            {loading && <h1>Loading</h1>}
            <form onSubmit={handleSubmit}>
                <div className="child">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" placeholder="Enter your email" value={ email} onChange={(e) =>setEmail(e.target.value)} />
                </div>

                <div className="child">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div>
                    <button type="submit">Sign In</button>
                </div>

                <div>
                    <p>Don't Have an Account yet? <Link to="/register">Register!</Link></p>
                </div>                
            </form>
        </div>
    )
}

export default Login;
