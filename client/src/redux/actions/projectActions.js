import axios from "axios";
import { GetProjects } from "../types";

export const getProjects = () => async (dispatch) =>{
    try {
        dispatch({
            type: GetProjects.Request
        })

        // const config = {
        //     headers: {
        //         'Content-type': 'application/json'
        //     }
        // }

        const { data } = await axios.get('http://localhost:8000/projects/')
        
        dispatch({
            type: GetProjects.Success,
            payload: data
        })
       
    } catch (error) {
        dispatch({
            type: GetProjects.Fail,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}