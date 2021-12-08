import { combineReducers } from "redux";
import {
  getUsers,
  userLoginReducer,
  userRegisterReducer,
} from "./userReducers";
import { getAssignedProject, getProjects } from "./projectReducers";
import { getTasks } from "./taskReducer";

const rootreducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  projects: getProjects,
  tasks: getTasks,
  users: getUsers,
  assignedProject: getAssignedProject,
});

export default rootreducer;
