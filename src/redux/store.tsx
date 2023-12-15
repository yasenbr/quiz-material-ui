import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventReducer";
import scoreReducer from "./scoreReducer";

const store = configureStore({
  reducer: {
    event: eventReducer,
    score: scoreReducer,
    // other reducers...
  },
});

export default store;
