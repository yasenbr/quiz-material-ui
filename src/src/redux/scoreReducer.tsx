// Create a file named scoreReducer.js
import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
  name: "score",
  initialState: 0,
  reducers: {
    incrementScore: (state, action) => {
      return state + action.payload;
    },
    decrementScore: (state, action) => {
      return state - action.payload;
    },
    initialState: (state, action) => {
      return state = action.payload;
    },
  },
});

export const { incrementScore, decrementScore,initialState } = scoreSlice.actions;
export default scoreSlice.reducer;
