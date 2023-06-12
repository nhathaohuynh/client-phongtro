import { apiPrice, apiArea, apiCategory} from "../../services/price";
import { actionTypes } from "./actionTypes";

export const getPrice = () => async (dispatch) => {
  try {
    const response = await apiPrice();
    if (!response?.data?.err === 0) {
      return dispatch({
        type: actionTypes.GET_PRICE,
        data: null,
      });
    }
    return dispatch({
      type: actionTypes.GET_PRICE,
      data: response?.data?.data,
    });
  } catch (err) {
    return dispatch({
      type: actionTypes.GET_PRICE,
      data: null,
    });
  }
};

export const getArea = () => async (dispatch) => {
  try {
    const response = await apiArea();
    if (response?.data?.err === 0) {
      return dispatch({
        type: actionTypes.GET_AREA,
        data: response?.data?.data,
      });
    }
    dispatch({
      type: actionTypes.GET_AREA,
      data: null,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.GET_AREA,
      data: null,
    });
  }
};

export const getCategory = () => async (dispatch) => {
  try {
    const response = await apiCategory();
    if (response.data.err === 0) {
      return dispatch({
        type: actionTypes.GET_CATEGORY,
        data: response?.data?.data,
      });
    }
    return dispatch({
      type: actionTypes.GET_CATEGORY,
      data: null,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.GET_CATEGORY,
      data: null,
    });
  }
};
