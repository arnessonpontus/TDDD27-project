import { combineReducers } from "redux";
import wordReducer from "./wordReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  word: wordReducer,
  error: errorReducer,
  auth: authReducer,
});
