/* eslint-disable indent */
/* eslint-disable import/prefer-default-export */
import { api } from "../../configs";
import { ME_ERROR, ME_GET, ME_LOGIN } from "../type";

export const meLogin =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const { data, status } = await api.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          username,
          password,
        }
      );

      if (data && status === 200) {
        dispatch({ type: ME_LOGIN, payload: { isReady: true } });
        window.localStorage.setItem("TDC_TOKEN", data.authToken);
        window.localStorage.setItem("TDC_USER", data._id);
      } else {
        dispatch({ type: ME_ERROR, payload: { error: "Login Error" } });
        throw new Error("Login Error");
      }
    } catch (error) {
      console.error("Login Error", error);
      dispatch({ type: ME_ERROR, payload: { error: error?.message } });
      throw new Error(error);
    }
  };

export const meGet = () => async (dispatch) => {
  try {
    const user = window.localStorage.getItem("TDC_USER");
    const { data, status } = await api.get(
      `${import.meta.env.VITE_API_URL}/user/${user}`
    );

    if (status === 200 && data) {
      dispatch({ type: ME_GET, payload: { ...data, isReady: true } });
    } else {
      window.localStorage.removeItem("TDC_TOKEN");
      window.localStorage.removeItem("TDC_USER");
      dispatch({ type: ME_ERROR, payload: { error: "Get UserData Error" } });
    }
  } catch (error) {
    window.localStorage.removeItem("TDC_TOKEN");
    window.localStorage.removeItem("TDC_USER");
    dispatch({ type: ME_ERROR, payload: { error: error?.message } });
  }
};

export const meLogOut = () => (dispatch) => {
  window.localStorage.removeItem("TDC_TOKEN");
  window.localStorage.removeItem("TDC_USER");
  window.location.reload("");
  dispatch({ type: ME_ERROR, payload: { error: "Logout" } });
};
