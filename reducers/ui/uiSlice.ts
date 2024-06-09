import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "ui",
  initialState: {
    version: 0,
  },
  reducers: {
    increaseVersion: (state) => {
      const newVersion = state.version + 1;
      state.version = newVersion % 10;
    },
  },
});

export const { increaseVersion } = slice.actions;

export default slice.reducer;
