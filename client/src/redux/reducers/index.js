import { combineReducers } from "redux";
import {
  getUsers,
  userLoginReducer,
  userRegisterReducer,
} from "./userReducers";
import { getAssignedProject, getProjects } from "./projectReducers";
import { addTask, getTasks } from "./taskReducer";

const rootreducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  projects: getProjects,
  tasks: getTasks,
  users: getUsers,
  assignedProject: getAssignedProject,
  addTask: addTask,
});

export default rootreducer;
