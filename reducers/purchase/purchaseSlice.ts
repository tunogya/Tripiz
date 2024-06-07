import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "ui",
  initialState: {
    purchasesEntitlementInfo: undefined,
    packages: [],
  },
  reducers: {
    updatePurchasesEntitlementInfo: (state, action) => {
      state.purchasesEntitlementInfo = action.payload;
    },
    updatePackage: (state, action) => {
      state.packages = action.payload;
    }
  },
});

export const { updatePurchasesEntitlementInfo, updatePackage } =
  slice.actions;

export default slice.reducer;
