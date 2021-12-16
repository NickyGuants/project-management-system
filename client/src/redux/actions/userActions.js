import { GetUsers, Login, Register, USER_LOGOUT } from "../types";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: Login.Request,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:8001/login",
      { email, password },
      config
    );

    dispatch({
      type: Login.Success,
      payload: data,
    });
    localStorage.setItem("token", JSON.stringify(data.token));
  } catch (error) {
    dispatch({
      type: Login.Fail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register =
  (username, name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: Register.Request,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8001/signup",
        { username, name, email, password },
        config
      );

      dispatch({
        type: Register.Success,
        payload: data,
      });
      localStorage.setItem("token", JSON.stringify(data.token));
    } catch (error) {
      dispatch({
        type: Register.Fail,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: USER_LOGOUT,
  });
};

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: GetUsers.Request,
    });

    // const config = {
    //   headers: {
    //     authorization: `Bearer ${token}`,
    //   },
    // };

    const { data } = await axios.get("http://localhost:8001/users");

    dispatch({
      type: GetUsers.Success,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GetUsers.Fail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
