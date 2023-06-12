import { apiGetUser } from "../../services/user";
import { actionTypes } from "./actionTypes";
import { logout } from "./auth";

export const getUser = () => async (dispatch) => {
  try {
    const response = await apiGetUser();
    if (response?.data?.err !== 0) {
      return dispatch({
        type: actionTypes.GET_USER,
        data: null,
      });
    }
    dispatch({
      type: actionTypes.GET_USER,
      data: response?.data.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.GET_USER,
      data: null,
    });
  }
};
