import { GetUsers, Login, Register, USER_LOGOUT } from '../types'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case Login.Request:
            return { loading: true }
        
        case Login.Success:
            return {
                loading: false,
                userInfo: action.payload
            }
        case Login.Fail:
            return {
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case Register.Request:
            return {
                loading: true
            }
        case Register.Success:
            return {
                loading: false,
                userInfo: action.payload
            }
        case Register.Fail:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const getUsers = (state = {}, action) => {
    switch (action.type) {
        case GetUsers.Request:
            return {
                loading: true
            }
        case GetUsers.Success:
            return {
                loading: false,
                users: action.payload
            }
        case GetUsers.Fail:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}