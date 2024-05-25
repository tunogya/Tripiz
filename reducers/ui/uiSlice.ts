import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "ui",
  initialState: {
    version: 0,
  },
  reducers: {
    updateValue: (state, action) => {
      for (const key in action.payload) {
        state[key] = action.payload[key];
      }
    },
    increaseVersion: (state) => {
      state.version += 1;
    }
  },
});

export const { updateValue, increaseVersion } = slice.actions;

export default slice.reducer;
