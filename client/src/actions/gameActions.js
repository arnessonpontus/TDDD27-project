import {
  SETTINGS_LOADING,
  SET_CATEGORY,
  SET_DRAWING_WORD,
  SET_CURRENT_DRAWER,
  SET_CURRENT_TIME,
  SET_GAME_TIME,
  SET_GAME_MODE,
  SET_ROOM_USERS,
  SET_ROOM,
  SET_GAME_STARTED,
  ADD_POINTS,
} from "./types";

import axios from "axios";

export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    payload: category,
  };
};

export const setDrawingWord = (word) => {
  return {
    type: SET_DRAWING_WORD,
    payload: word,
  };
};

export const setCurrentDrawer = (drawer) => {
  return {
    type: SET_CURRENT_DRAWER,
    payload: drawer,
  };
};

export const setGameStarted = (isGameStarted) => {
  return {
    type: SET_GAME_STARTED,
    payload: isGameStarted,
  };
};

export const setCurrentTime = (currentTime) => {
  return {
    type: SET_CURRENT_TIME,
    payload: currentTime,
  };
};

export const setRoomUsers = (users) => {
  return {
    type: SET_ROOM_USERS,
    payload: users,
  };
};

export const setRoom = (room) => {
  return {
    type: SET_ROOM,
    payload: room,
  };
};

export const setGameTime = (time) => {
  return {
    type: SET_GAME_TIME,
    payload: time,
  };
};

export const setGameMode = (gameMode) => {
  return {
    type: SET_GAME_MODE,
    payload: gameMode,
  };
};

export const addGamePoints = (id, points) => (dispatch) => {
  const body = JSON.stringify({ id, points });

  const config = {
    headers: {
      "content-type": "application/json",
    },
  };

  axios
    .post("/api/users/addPoints", body, config)
    .then((res) => {
      dispatch({
        type: ADD_POINTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
