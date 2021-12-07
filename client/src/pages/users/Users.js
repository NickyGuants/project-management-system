import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../../redux/actions/userActions'
import './users.css'

const Users = () => {
    const { users } = useSelector(state => state.users)
    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin;
    let token = userInfo?.token

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers(token))
    }, [dispatch,token])


    return (
        <div className="users">
            <div className="user-table">
                <table>
                    <tbody className="body">
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Project</th>
                            <th>Assign Project</th>
                            <th>Assign Task</th>
                            <th>Delete User</th>
                        </tr>
                        {users?.map((user) => {
                            return (
                            <>
                                <tr key={user.id} className="user-row">
                                        <td>{user.name}</td>
                                        <td>{ user.username}</td>
                                        <td>{user.email}</td>
                                        <td>Project Name</td>
                                        <td><button >Assign Project</button></td>
                                    <td><button >Assign Task</button></td>
                                    <td><button >Delete</button></td>
                                </tr>
                                    
                            </>   
                        )})}
                        </tbody>
                        </table>
                    </div>
        </div>
    )
}

export default Users
