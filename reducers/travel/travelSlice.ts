import { createSlice } from "@reduxjs/toolkit";

export interface ShoppingItem {
  timestamp: number,
  label?: string,
  description?: string,
  amount: number,
}

export interface LocationPosition {
  timestamp: number,
  longitude: number,
  latitude: number,
  address: number,
}

export interface Travel {
  travelId: string,
  title: string,
  timestamp: {
    start: number,
    end: number,
  },
  budget: number,
  costed: number,
  available: number,
  shoppingHistory: ShoppingItem[],
  footPrints: LocationPosition[],
  tasks: {
    main: [],
    option: [],
  },
}

const defaultTravels: Travel[] = []

export const configSlice = createSlice({
  name: "travel",
  initialState: {
    travels: defaultTravels,
  },
  reducers: {
    newTravel: (state, action) => {
      state.travels = [...state.travels, action.payload];
    },
    deleteTravel: (state, action) => {
      const { travelId } = action.payload;
      state.travels = state.travels.filter((item) => item.travelId !== travelId);
    },
    updateTravel: (state, action) => {
      const { travelId, ...updates } = action.payload;
      const travelIndex = state.travels.findIndex((item) => item.travelId === travelId);
      if (travelIndex !== -1) {
        state.travels[travelIndex] = { ...state.travels[travelIndex], ...updates };
      }
    },
    addShoppingItem: (state, action) => {
      const { travelId, shoppingItem } = action.payload;
      const travel = state.travels.find((item) => item.travelId === travelId);
      if (travel) {
        travel.shoppingHistory = [...travel.shoppingHistory, shoppingItem];
      }
    },
    removeShoppingItem: (state, action) => {
      const { travelId, timestamp } = action.payload;
      const travel = state.travels.find((item) => item.travelId === travelId);
      if (travel) {
        travel.shoppingHistory = travel.shoppingHistory.filter((item) => item.timestamp !== timestamp);
      }
    },
    addLocationPosition: (state, action) => {
      const { travelId, locationPosition } = action.payload;
      const travel = state.travels.find((item) => item.travelId === travelId);
      if (travel) {
        travel.footPrints = [...travel.footPrints, locationPosition];
      }
    },
    removeLocationPosition: (state, action) => {
      const { travelId, timestamp } = action.payload;
      const travel = state.travels.find((item) => item.travelId === travelId);
      if (travel) {
        travel.footPrints = travel.footPrints.filter((item) => item.timestamp !== timestamp);
      }
    },
  },
});

export const {
  newTravel,
  deleteTravel,
  updateTravel,
  addShoppingItem,
  removeShoppingItem,
  addLocationPosition,
  removeLocationPosition,
} = configSlice.actions;

export default configSlice.reducer;
