import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "ui",
  initialState: {
    scroll2Down: false,
  },
  reducers: {
    updateValue: (state, action) => {
      for (const key in action.payload) {
        state[key] = action.payload[key];
      }
    },
  },
});

export const { updateValue } = slice.actions;

export default slice.reducer;
