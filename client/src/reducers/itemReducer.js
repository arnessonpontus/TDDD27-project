import { v4 as uuidv4 } from "uuid";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types";

const initialState = {
  items: [
    { id: uuidv4(), name: "new item1" },
    { id: uuidv4(), name: "new item44" },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state, // Returns the hard coded data for now
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items], // ... Because we can not mutate state, have to copy it
      };
    default:
      return state;
  }
}
