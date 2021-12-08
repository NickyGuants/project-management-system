import axios from "axios";
import { GetAssignedProject, GetProjects } from "../types";

export const getProjects = () => async (dispatch) => {
  try {
    dispatch({
      type: GetProjects.Request,
    });

    // const config = {
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // }

    const { data } = await axios.get("http://localhost:8000/projects/");

    dispatch({
      type: GetProjects.Success,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GetProjects.Fail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAssignedProject = (user_id) => async (dispatch) => {
  try {
    dispatch({
      type: GetAssignedProject.Request,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `http://localhost:8000/projects/assigned/${user_id}`,
      // { params: { user_id: user_id } },
      config
    );

    dispatch({
      type: GetAssignedProject.Success,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GetAssignedProject.Fail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
