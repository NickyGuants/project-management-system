import { GetProjects } from '../types'

export const getProjects = (state = {}, action) => {
    switch (action.type) {
        case GetProjects.Request:
            return { loading: true }
        
        case GetProjects.Success:
            return {
                loading: false,
                projects: action.payload
            }
        case GetProjects.Fail:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}