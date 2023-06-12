import {
  apiPosts,
  apiPostLimit,
  apiPostCondition,
  apiPostNewRealise,
} from "../../services/post";
import { actionTypes } from "./actionTypes";

export const getPosts = () => async (dispatch) => {
  try {
    const response = await apiPosts();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS,
        data: response?.data?.data,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS,
        data: null,
      });
    }
  } catch (err) {
    dispatch({
      type: actionTypes.GET_POSTS,
      data: null,
    });
  }
};

export const getPostLimit = (page) => async (dispatch) => {
  try {
    const response = await apiPostLimit(page);
    if (!response?.data.err === 0)
      return dispatch({
        type: actionTypes.GET_POST_LIMIT,
        data: null,
      });
    return dispatch({
      type: actionTypes.GET_POST_LIMIT,
      data: response?.data?.data,
    });
  } catch (err) {
    return dispatch({
      type: actionTypes.GET_POST_LIMIT,
      data: null,
    });
  }
};

export const getPostCondition = (query) => async (dispatch) => {
  try {
    const response = await apiPostCondition(query);
    if (!response?.data.err === 0) {
      return dispatch({
        type: actionTypes.GET_POST_CONDITION,
        data: null,
      });
    }
    return dispatch({
      type: actionTypes.GET_POST_CONDITION,
      data: response?.data?.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.GET_POST_CONDITION,
      data: null,
    });
  }
};

export const getPostNewRealise = () => async (dispatch) => {
  try {
    const response = await apiPostNewRealise();
    if (response.data.err === 0) {
      return dispatch({
        type: actionTypes.GET_POST_NEWREALISE,
        data: response?.data?.data,
      });
    }
    dispatch({
      type: actionTypes.GET_POST_NEWREALISE,
      data: null,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.GET_POST_NEWREALISE,
      data: null,
    });
  }
};
