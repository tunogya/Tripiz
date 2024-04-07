import {createEntityAdapter, createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";

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

export interface TaskItem {
  taskId: string,
  title: string,
  description?: string
  status: string
  completed?: number,
}

export interface Travel {
  id: string,
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
  tasks: TaskItem[],
}

interface TravelState extends EntityState<Travel, string> {}
const travelsAdapter = createEntityAdapter<Travel>();
const initialState: TravelState = travelsAdapter.getInitialState();

export const travelSlice = createSlice({
  name: "travels",
  initialState: initialState,
  reducers: {
    newTravel: travelsAdapter.addOne,
    deleteTravel: travelsAdapter.removeOne,
    updateTravel: travelsAdapter.updateOne,
    addShoppingItem: (state, action: PayloadAction<{travelId: string, shoppingItem: ShoppingItem}>) => {
      const { travelId, shoppingItem } = action.payload;
      const travel = state.entities[travelId];
      if (travel) {
        travel.shoppingHistory.push(shoppingItem);
      }
    },
    removeShoppingItem: (state, action: PayloadAction<{travelId: string, timestamp: number}>) => {
      const { travelId, timestamp } = action.payload;
      const travel = state.entities[travelId];
      if (travel) {
        travel.shoppingHistory = travel.shoppingHistory.filter(item => item.timestamp !== timestamp);
      }
    },
    addLocationPosition: (state, action: PayloadAction<{travelId: string, locationPosition: LocationPosition}>) => {
      const { travelId, locationPosition } = action.payload;
      const travel = state.entities[travelId];
      if (travel) {
        travel.footPrints.push(locationPosition);
      }
    },
    removeLocationPosition: (state, action: PayloadAction<{travelId: string, timestamp: number}>) => {
      const { travelId, timestamp } = action.payload;
      const travel = state.entities[travelId];
      if (travel) {
        travel.footPrints = travel.footPrints.filter(item => item.timestamp !== timestamp);
      }
    },
    addTask: (state, action: PayloadAction<{travelId: string, task: TaskItem}>) => {
      const { travelId, task } = action.payload;
      const travel = state.entities[travelId];
      if (travel) {
        travel.tasks.push(task);
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
  addTask,
} = travelSlice.actions;

export default travelSlice.reducer;
