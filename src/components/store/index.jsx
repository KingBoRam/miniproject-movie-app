import {configureStore} from "@reduxjs/toolkit";
import {bookmarkReducer} from "./bookmarkSlice";

const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
  },
});

export default store;
