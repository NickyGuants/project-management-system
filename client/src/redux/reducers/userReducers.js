import { Login, Register } from '../types'

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