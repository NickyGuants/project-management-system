import { combineReducers } from "redux";
import {
  getUsers,
  userLoginReducer,
  userRegisterReducer,
} from "./userReducers";
import { addProject, getAssignedProject, getProjects } from "./projectReducers";
import { addTask, getTasks } from "./taskReducer";

const rootreducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  projects: getProjects,
  tasks: getTasks,
  users: getUsers,
  assignedProject: getAssignedProject,
  addTask: addTask,
  addProject: addProject,
});

export default rootreducer;
