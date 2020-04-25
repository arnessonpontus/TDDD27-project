import {
  GET_ALL_WORDS,
  GET_USER_WORDS,
  ADD_WORD,
  DELETE_WORD,
  WORDS_LOADING,
} from "../actions/types";

const initialState = {
  allWords: [],
  userWords: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_WORDS:
      return {
        ...state,
        allWords: action.payload,
        loading: false,
      };
    case GET_USER_WORDS:
      return {
        ...state,
        userWords: action.payload,
        loading: false,
      };
    case DELETE_WORD:
      return {
        ...state,
        // Might want to add for userWords
        allWords: state.words.filter((word) => word._id !== action.payload),
      };
    case ADD_WORD:
      return {
        ...state,
        allWords: [action.payload, ...state.allWords], // ... Because we can not mutate state, have to copy it
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
