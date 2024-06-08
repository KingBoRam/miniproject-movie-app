import {createSlice} from "@reduxjs/toolkit";

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: [],
  reducers: {
    addbookmark: (state, action) => {
      state.push(action.payload);
    },
    deletebookmark: (state, action) => {
      return state.filter((item) => {
        return item !== action.payload;
      });
    },
  },
});

export const {addbookmark, deletebookmark} = bookmarkSlice.actions;

export const bookmarkReducer = bookmarkSlice.reducer;
