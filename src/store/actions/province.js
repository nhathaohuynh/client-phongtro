import { apiProvince } from "../../services/province";
import { actionTypes } from "./actionTypes";

export const getProvince = () => async (dispatch) => {
  try {
    const response = await apiProvince();
    if (!response.data.err === 0) {
      return dispatch({
        type: actionTypes.GET_PROVINCE,
        data: null,
      });
    }
    dispatch({
      type: actionTypes.GET_PROVINCE,
      data: response?.data?.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.GET_PROVINCE,
      data: null,
    });
  }
};
