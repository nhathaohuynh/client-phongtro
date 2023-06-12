import authReducer from "./authReducer";
import userReducer from "./userReducer";

import { combineReducers } from "redux";

import storage from "redux-persist/lib/storage";

import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
import { postReducer } from "./postReducer";
import { appReducer } from "./appReducer";

const comonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};

const authConfig = {
  ...comonConfig,
  key: "auth",
  whitelist: ["isLogin", "token"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  user: userReducer,
  post: postReducer,
  app: appReducer,
});

export default rootReducer;
