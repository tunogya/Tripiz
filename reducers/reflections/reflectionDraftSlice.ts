import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "reflectionDraft",
  initialState: {
    title: "",
    description: "",
  },
  reducers: {
    updateDraft: (state, action) => {
      for (const key in action.payload) {
        state[key] = action.payload[key];
      }
    },
    clearDraft: (state) => {
      state.title = "";
      state.description = "";
    },
  },
});

export const { updateDraft, clearDraft } = slice.actions;

export default slice.reducer;
