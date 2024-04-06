import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    credentials: undefined,
    user: undefined,
  },
  reducers: {
    updateCredentials: (state, action) => {
      state.credentials = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.credentials = undefined;
      state.user = undefined;
    },
  },
});

export const {
  updateCredentials,
  updateUser,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
