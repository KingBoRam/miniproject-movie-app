import {configureStore} from "@reduxjs/toolkit";
import {bookmarkReducer} from "./bookmarkSlice";
import {userNameReducer} from "./userNameSlice";

const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
    userName: userNameReducer,
  },
});

export default store;
