import { combineReducers } from "redux";
import wordReducer from "./wordReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import gameReducer from "./gameReducer";

export default combineReducers({
  word: wordReducer,
  error: errorReducer,
  auth: authReducer,
  game: gameReducer,
});
