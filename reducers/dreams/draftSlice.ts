import {createSlice} from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "dreamDraft",
  initialState: {
    title: "",
    description: "",
    voiceRecording: "",
    date: "",
    rate: 3,
    dreamLength: 3,
    sleepQuality: 3,
    isPersonally: false,
    notes: "",
    lucidity: false,
    controllability: false,
    vividness: 3,
  },
  reducers: {
    updateDraft: (state, action) => {
      for (const key in action.payload) {
        state[key] = action.payload[key];
      }
    },
    clearDraft: (state) => {
      state = {
        title: "",
        description: "",
        voiceRecording: "",
        date: "",
        rate: 3,
        dreamLength: 3,
        sleepQuality: 3,
        isPersonally: false,
        notes: "",
        lucidity: false,
        controllability: false,
        vividness: 3,
      };
    }
  },
});

export const {
  updateDraft,
  clearDraft,
} = slice.actions;

export default slice.reducer;