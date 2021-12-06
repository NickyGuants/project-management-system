import axios from "axios";
import { GetTasks } from "../types";

export const getTasks = () => async (dispatch) =>{
    try {
        dispatch({
            type: GetTasks.Request
        })

        // const config = {
        //     headers: {
        //         'Content-type': 'application/json'
        //     }
        // }

        const { data } = await axios.get('http://localhost:8000/tasks/')
        
        dispatch({
            type: GetTasks.Success,
            payload: data
        })
       
    } catch (error) {
        dispatch({
            type: GetTasks.Fail,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}