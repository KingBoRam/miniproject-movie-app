import {createSlice} from "@reduxjs/toolkit";

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    addbookmark: (state, action) => {
      const {uid, paramId} = action.payload;
      const obj = state.find((item) => item.uid === uid);
      obj.bookmark.push(paramId);
    },
    deletebookmark: (state, action) => {
      return state.filter((item) => {
        return item !== action.payload;
      });
    },
  },
});

export const {addUser, addbookmark, deletebookmark} = bookmarkSlice.actions;

export const bookmarkReducer = bookmarkSlice.reducer;
