import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "memoryDraft",
  initialState: {
    title: "",
    description: "",
    voiceRecording: "",
    rate: 3,
    notes: "",
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
      state.voiceRecording = "";
      state.rate = 3;
      state.notes = "";
    },
  },
});

export const { updateDraft, clearDraft } = slice.actions;

export default slice.reducer;
