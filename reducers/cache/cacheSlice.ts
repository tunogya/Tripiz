import { createSlice } from "@reduxjs/toolkit";

export const cacheSlice = createSlice({
  name: "cache",
  initialState: {},
  reducers: {
    reset: (state) => {},
  },
});

export const { reset } = cacheSlice.actions;

export default cacheSlice.reducer;
