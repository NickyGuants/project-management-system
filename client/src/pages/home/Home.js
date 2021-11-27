import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
    const { userInfo } = useSelector(state => state.userLogin)
    return (
        <div className="home">
            <div className="home-info">
                {!userInfo ? (
                <h1>Welcome home</h1>
                ) : <h1>Welcome Home {userInfo.user.username}</h1>}

            </div>
        </div>
    )
}

export default Home
