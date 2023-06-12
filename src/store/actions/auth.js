import { apiRegister, apiLogin } from "../../services/auth";
import { actionTypes } from "./actionTypes";

export const register = (payload) => async (dispatch) => {
  try {
    const response = await apiRegister(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        data: response?.data.token,
      });
    } else {
      dispatch({
        type: actionTypes.REGISTER_FAIL,
        data: response?.data.msg,
      });
    }
  } catch (err) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      data: err,
    });
  }
};

export const login = (payload) => async (dispatch) => {
  try {
    const response = await apiLogin(payload);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: response?.data.token,
      });
    } else {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        data: response?.data.msg,
      });
    }
  } catch (err) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      data: err,
    });
  }
};

export const logout = () => {
  return {
    type: actionTypes.LOG_OUT,
  };
};
