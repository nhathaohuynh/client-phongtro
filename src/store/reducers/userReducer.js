import { actionTypes } from "../actions/actionTypes";

const initState = {
  userData: {},
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER:
      return {
        ...state,
        userData: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
