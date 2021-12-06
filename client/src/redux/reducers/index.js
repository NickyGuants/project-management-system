import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from './userReducers'
import { getProjects } from "./projectReducers";

const rootreducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    projects: getProjects

})

export default rootreducer;