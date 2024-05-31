import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "ui",
  initialState: {
    avatar: Math.floor(Math.random() * 10000),
    version: 0,
    currentPost: "",
  },
  reducers: {
    increaseVersion: (state) => {
      state.version += 1;
    },
    randomAvatar: (state) => {
      state.avatar = Math.floor(Math.random() * 10000);
    },
    updateCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
  },
});

export const { increaseVersion, randomAvatar, updateCurrentPost } = slice.actions;

export default slice.reducer;
