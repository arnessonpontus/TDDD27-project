import axios from "axios";
import { GET_WORDS, ADD_WORD, DELETE_WORD, WORDS_LOADING } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getWords = () => (dispatch) => {
  dispatch(setWordsLoading());
  axios
    .get("/api/words")
    .then((res) =>
      dispatch({
        type: GET_WORDS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addWord = (word) => (dispatch, getState) => {
  dispatch(setWordsLoading());
  axios
    .post("/api/words", word, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_WORD,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteWord = (id) => (dispatch, getState) => {
  dispatch(setWordsLoading());
  axios
    .delete(`api/words/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_WORD,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setWordsLoading = () => {
  return {
    type: WORDS_LOADING,
  };
};
