import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "premium",
  initialState: {
    PurchasesEntitlementInfo: undefined,
  },
  reducers: {
    updatePurchasesEntitlementInfo: (state, action) => {
      state.PurchasesEntitlementInfo = action.payload;
    },
  },
});

export const { updatePurchasesEntitlementInfo } =
  slice.actions;

export default slice.reducer;
