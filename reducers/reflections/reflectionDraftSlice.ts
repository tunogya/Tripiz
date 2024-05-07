import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "reflectionDraft",
  initialState: {
    notes: "",
  },
  reducers: {
    updateDraft: (state, action) => {
      for (const key in action.payload) {
        state[key] = action.payload[key];
      }
    },
    clearDraft: (state) => {
      state.notes = "";
    },
  },
});

export const { updateDraft, clearDraft } = slice.actions;

export default slice.reducer;
