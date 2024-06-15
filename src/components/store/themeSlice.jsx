import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
  // 이후에 여러 테마를 적용 할 수 있도록 객체로 생성
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state, action) {
      if (action.payload === "dark") {
        state.isDarkMode = !state.isDarkMode;
      }
    },
  },
});

export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;
