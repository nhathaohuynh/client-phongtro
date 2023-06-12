import { actionTypes } from "../actions/actionTypes";

const initState = {
  price: [],
  area: [],
  categories: [],
  provinces: [],
};

export const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRICE:
      return {
        ...state,
        price: action.data || [],
      };
    case actionTypes.GET_AREA:
      return {
        ...state,
        area: action.data || [],
      };
    case actionTypes.GET_CATEGORY: {
      return {
        ...state,
        categories: action.data || [],
      };
    }
    case actionTypes.GET_PROVINCE: {
      return {
        ...state,
        provinces: action.data || [],
      };
    }
    default:
      return {
        ...state,
      };
  }
};
