import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "config",
  initialState: {
    language: undefined,
    gateway: "https://api.openai.com/v1",
    key: undefined,
    model: "gpt-3.5-turbo",
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setGateway: (state, action) => {
      state.gateway = action.payload;
    },
    setKey: (state, action) => {
      state.key = action.payload;
    },
    setModel: (state, action) => {
      state.model = action.payload;
    },
  },
});

export const { setLanguage, setGateway, setKey, setModel } =
  configSlice.actions;

export default configSlice.reducer;
