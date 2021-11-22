import { Login, Register } from "../types";
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

        const { data } = await axios.post('users/login', { email, password }, config)
        
        dispatch({
            type: Login.Success,
            payload: data
        })
    } catch (error) {
        console.log(error.response.data.message)
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

        const { data } = await axios.post('users/signup', { username, name, email, password }, config)
        console.log(data);
        
        dispatch({
            type: Register.Success,
            payload: data
        })
    } catch (error) {
        console.log(error.response.data.message)
        dispatch({
            type: Register.Fail,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}