import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "./reducers";

// TODO: solves the update problem in some cases but can't log in in some cases
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};

const middleWare = [thunk];

export const store = createStore(
  persistedReducer,
  initialState,
  compose(
    applyMiddleware(...middleWare)
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // For dev tools
  )
);

export const persistor = persistStore(store);
