import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "config",
  initialState: {
    locale: undefined,
    gateway: "https://api.openai.com/v1",
    key: undefined,
    model: "gpt-3.5-turbo",
  },
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
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

export const { setLocale, setGateway, setKey, setModel } =
  configSlice.actions;

export default configSlice.reducer;
