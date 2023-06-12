const { actionTypes } = require("../actions/actionTypes");

const initState = {
  posts: [],
  amountPost: 0,
  newPosts: [],
};

export const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS: {
      return {
        ...state,
        posts: action.data || [],
      };
    }
    case actionTypes.GET_POST_LIMIT: {
      return {
        ...state,
        posts: action.data?.rows || [],
        amountPost: action.data?.count || 0,
      };
    }
    case actionTypes.GET_POST_CONDITION: {
      return {
        ...state,
        posts: action?.data?.rows || [],
        amountPost: action?.data?.count || 0,
      };
    }
    case actionTypes.GET_POST_NEWREALISE: {
      return {
        ...state,
        newPosts: action?.data?.rows || [],
      };
    }
    default:
      return {
        ...state,
      };
  }
};
