// In a new file, let's call it eventReducer.ts
import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    localAnswers: [] as any[],
  },
  reducers: {
    updateEventData(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateEventData } = eventSlice.actions;
export default eventSlice.reducer;
