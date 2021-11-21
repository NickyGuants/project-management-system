import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from './userReducers'

const rootreducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})

export default rootreducer;