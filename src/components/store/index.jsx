import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"; // 기본적으로 localStorage를 사용합니다.
import {bookmarkReducer} from "./bookmarkSlice"; // bookmark 리듀서
import {userNameReducer} from "./userNameSlice"; // userName 리듀서
import themeSlice from "./themeSlice";

// persist 설정
const persistConfig = {
  key: "root",
  storage,
  // whitelist : localstorage에 저장할 reducer
  whitelist: ["bookmark", "theme"],
};

const rootReducer = combineReducers({
  bookmark: bookmarkReducer,
  userName: userNameReducer,
  theme: themeSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}),
  // 기본 값이 true지만 배포할때 코드를 숨기기 위해서 false로 변환하기 쉽게 설정에 넣어놨다.
  devTools: true,
});

export const persistor = persistStore(store);
export default store;

// 직렬화 오류 해결 https://velog.io/@pest95/RTK-non-serializable-value-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95
