import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "config",
  initialState: {
    language: undefined,
    provider: undefined,
    key: undefined,
    model: undefined,
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
    setKey: (state, action) => {
      state.key = action.payload;
    },
    setModel: (state, action) => {
      state.model = action.payload;
    },
  },
});

export const { setLanguage, setProvider, setKey, setModel } =
  configSlice.actions;

export default configSlice.reducer;
