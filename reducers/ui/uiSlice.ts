import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "ui",
  initialState: {
    version: 0,
    currentPost: "",
  },
  reducers: {
    increaseVersion: (state) => {
      const newVersion = state.version + 1;
      state.version = newVersion % 10;
    },
    updateCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
  },
});

export const { increaseVersion, updateCurrentPost } = slice.actions;

export default slice.reducer;
