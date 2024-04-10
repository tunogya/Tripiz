import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "config",
  initialState: {
    expoPushToken: undefined,
    gateway: "https://api.openai.com/v1",
    key: undefined,
    model: "gpt-3.5-turbo",
    preference: "",
  },
  reducers: {
    setPreference: (state, action) => {
      state.preference = action.payload;
    },
    setExpoPushToken: (state, action) => {
      state.expoPushToken = action.payload;
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

export const { setGateway, setKey, setModel, setExpoPushToken, setPreference } =
  configSlice.actions;

export default configSlice.reducer;
