import axios from "axios";
import { AddTask, GetTasks } from "../types";

export const getTasks = () => async (dispatch) => {
  try {
    dispatch({
      type: GetTasks.Request,
    });

    // const config = {
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // }

    const { data } = await axios.get("http://localhost:8000/tasks/");

    dispatch({
      type: GetTasks.Success,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GetTasks.Fail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addTask =
  (task_name, task_description, due_date, project_id) => async (dispatch) => {
    try {
      dispatch({
        type: AddTask.Request,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8000/tasks/",
        { task_name, task_description, due_date, project_id },
        config
      );

      dispatch({
        type: AddTask.Success,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: AddTask.Fail,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
