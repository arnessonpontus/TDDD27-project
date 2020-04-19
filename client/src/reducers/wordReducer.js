import {
  GET_WORDS,
  ADD_WORD,
  DELETE_WORD,
  WORDS_LOADING,
} from "../actions/types";

const initialState = {
  words: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WORDS:
      return {
        ...state,
        words: action.payload,
        loading: false,
      };
    case DELETE_WORD:
      return {
        ...state,
        words: state.words.filter((word) => word._id !== action.payload),
      };
    case ADD_WORD:
      return {
        ...state,
        words: [action.payload, ...state.words], // ... Because we can not mutate state, have to copy it
        loading: false,
      };
    case WORDS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
