// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    user: userReducer,
    // other reducers
  },
});

export default store;
