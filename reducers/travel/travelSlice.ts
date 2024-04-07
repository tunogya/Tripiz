import {createEntityAdapter, createSlice, EntityState} from "@reduxjs/toolkit";

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
  shoppingIds: string[],
  footPrintIds: string[],
  taskIds: string[],
}

interface TravelState extends EntityState<Travel, string> {}

const entityAdapter = createEntityAdapter<Travel>();
const initialState: TravelState = entityAdapter.getInitialState();

export const slice = createSlice({
  name: "travel",
  initialState: initialState,
  reducers: {
    addOne: entityAdapter.addOne,
    removeOne: entityAdapter.removeOne,
    updateOne: entityAdapter.updateOne,
  },
});

export const {
  addOne: addOneTravel,
  removeOne: removeOneTravel,
  updateOne: updateOneTravel,
} = slice.actions;

export default slice.reducer;
