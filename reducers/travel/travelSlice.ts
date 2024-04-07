import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "travel",
  initialState: {
    travels: [],
  },
  reducers: {
    newTravel: (state, action) => {
      state.travels = [
        ...state.travels,
        action.payload,
      ];
    },
    deleteTravel: (state, action) => {
      const id = action.payload
      state.travels = state.travels.filter((item) => item.id !== id)
    }
  },
});

export const {
} = configSlice.actions;

export default configSlice.reducer;
