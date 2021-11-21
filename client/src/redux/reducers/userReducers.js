import { Login, Register } from '../types'

export const userLoginReducer = (state = {}, {type, payload }) => {
    switch (type) {
        case Login.Request:
            return { loading: true }
        
        case Login.Success:
            return {
                loading: false,
                userInfo: payload
            }
        case Login.Fail:
            return {
                loading: false,
                error: payload
            }
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case Register.Request:
            return { loading: true }
        case Register.Success:
            return {
                loading: false,
                userInfo: payload
            }
        case Register.Fail:
            return {
                loading: false,
                error: payload
            }
        default:
            return state
    }
}