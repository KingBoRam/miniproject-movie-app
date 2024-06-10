import {createSlice} from "@reduxjs/toolkit";

const userNameSlice = createSlice({
  name: "userName",
  initialState: "",
  reducers: {
    setUserName: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const {setUserName} = userNameSlice.actions;

export const userNameReducer = userNameSlice.reducer;
