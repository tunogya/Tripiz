import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "ui",
  initialState: {
    scroll: false,
  },
  reducers: {
    updateScroll: (state, action) => {
      for (const key in action.payload) {
        state[key] = action.payload[key];
      }
    },
  },
});

export const { updateScroll } = slice.actions;

export default slice.reducer;
