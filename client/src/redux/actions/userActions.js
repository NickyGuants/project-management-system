import { Login, Register, USER_LOGOUT} from "../types";
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: Login.Request
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/login', { email, password }, config)
        
        dispatch({
            type: Login.Success,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: Login.Fail,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const register = ( username, name, email, password ) => async (dispatch) => {
    try {
        dispatch({
            type: Register.Request
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/signup', { username, name, email, password }, config)
        
        dispatch({
            type: Register.Success,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: Register.Fail,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const logout = () => async (dispatch) => {
    dispatch({
        type: USER_LOGOUT
    })
}