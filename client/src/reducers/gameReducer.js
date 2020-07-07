import {
  SET_CATEGORY,
  SET_CURRENT_DRAWER,
  SET_DRAWING_WORD,
  SET_ROOM,
  SET_CURRENT_TIME,
  SET_GAME_TIME,
  SET_GAME_MODE,
  SET_ROOM_USERS,
  SETTINGS_LOADING,
  SET_GAME_STARTED,
} from "../actions/types";

const initialState = {
  category: "All",
  currentDrawer: null,
  drawingWord: "",
  room: "",
  currentTime: 60, // TODO: Change to game init at gametime
  gameTime: 60,
  gameMode: "Playground",
  roomUsers: [],
  loading: false,
  gameStarted: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loading: false,
      };
    case SET_DRAWING_WORD:
      return {
        ...state,
        drawingWord: action.payload,
        loading: false,
      };
    case SET_CURRENT_DRAWER:
      return {
        ...state,
        currentDrawer: action.payload,
        loading: false,
      };
    case SET_GAME_STARTED:
      return {
        ...state,
        gameStarted: action.payload, // TODO: Change to isGameStarted
        loading: false,
      };
    case SET_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.payload,
        loading: false,
      };
    case SET_GAME_MODE:
      return {
        ...state,
        gameMode: action.payload,
        loading: false,
      };
    case SET_ROOM_USERS:
      return {
        ...state,
        roomUsers: action.payload,
        loading: false,
      };
    case SET_ROOM:
      return {
        ...state,
        room: action.payload,
        loading: false,
      };
    case SET_GAME_TIME:
      return {
        ...state,
        gameTime: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
