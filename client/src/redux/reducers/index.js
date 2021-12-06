import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from './userReducers'
import { getProjects } from "./projectReducers";
import {getTasks} from "./taskReducer"

const rootreducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    projects: getProjects,
    tasks: getTasks
})

export default rootreducer;