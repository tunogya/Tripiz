import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "ui",
  initialState: {
    avatar: Math.floor(Math.random() * 10000),
    version: 0,
  },
  reducers: {
    increaseVersion: (state) => {
      state.version += 1;
    },
    randomAvatar: (state) => {
      state.avatar = Math.floor(Math.random() * 10000);
    }
  },
});

export const { increaseVersion, randomAvatar } = slice.actions;

export default slice.reducer;
