import { GetTasks } from '../types'

export const getTasks = (state = {}, action) => {
    switch (action.type) {
        case GetTasks.Request:
            return { loading: true }
        
        case GetTasks.Success:
            return {
                loading: false,
                tasks: action.payload
            }
        case GetTasks.Fail:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}