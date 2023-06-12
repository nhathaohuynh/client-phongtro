import { actionTypes } from "../actions/actionTypes";

const initState = {
  isLogin: false,
  token: null,
  msg: "",
  update: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        isLogin: true,
        token: action.data,
        msg: "Register is successfully",
        update: !state.update,
      };
    }
    case actionTypes.REGISTER_FAIL: {
      return {
        ...state,
        isLogin: false,
        token: null,
        msg: action.data,
        update: !state.update,
      };
    }
    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isLogin: true,
        token: action.data,
        msg: "Login is Successfully",
        update: !state.update,
      };
    }
    case actionTypes.LOGIN_FAIL: {
      return {
        ...state,
        isLogin: false,
        token: null,
        msg: action.data,
        update: !state.update,
      };
    }
    case actionTypes.LOG_OUT: {
      return {
        ...state,
        isLogin: false,
        token: null,
        update: !state.update,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
