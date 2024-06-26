import {createSlice} from "@reduxjs/toolkit";

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    addBookMark: (state, action) => {
      const {uid, paramId} = action.payload;
      const obj = state.find((item) => item.uid === uid);
      obj.bookmark.push(paramId);
    },
    deleteBookMark: (state, action) => {
      const {uid, paramId} = action.payload;
      const obj = state.find((item) => item.uid === uid);
      obj.bookmark = obj.bookmark.filter((item) => {
        return item !== paramId;
      });
    },
    changeBookmarkOrder: (state, action) => {
      const {uid, newOrder} = action.payload;
      const user = state.find((item) => item.uid === uid);
      user.bookmark = newOrder;
    },
  },
});

export const {addUser, addBookMark, deleteBookMark, changeBookmarkOrder} =
  bookmarkSlice.actions;

export const bookmarkReducer = bookmarkSlice.reducer;

// 참조자료형인 obj를 수정하면 같은 값을 참조하고있는 state도 변경되게 된다.
