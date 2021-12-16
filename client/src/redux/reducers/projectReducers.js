import { AddProject, GetAssignedProject, GetProjects } from "../types";

export const getProjects = (state = {}, action) => {
  switch (action.type) {
    case GetProjects.Request:
      return { loading: true };

    case GetProjects.Success:
      return {
        loading: false,
        projects: action.payload,
      };
    case GetProjects.Fail:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAssignedProject = (state = {}, action) => {
  switch (action.type) {
    case GetAssignedProject.Request:
      return { loading: true };

    case GetAssignedProject.Success:
      return {
        loading: false,
        project: action.payload,
      };
    case GetAssignedProject.Fail:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const addProject = (state = {}, action) => {
  switch (action.type) {
    case AddProject.Request:
      return {
        loading: true,
      };
    case AddProject.Success:
      return {
        loading: false,
        projectInfo: action.payload,
      };
    case AddProject.Fail:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
