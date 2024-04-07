import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";

export interface FootPrint {
  id: string;
  timestamp: number;
  longitude: number;
  latitude: number;
  address: number;
}

interface LocationPositionState extends EntityState<FootPrint, string> {}

const entityAdapter = createEntityAdapter<FootPrint>();
const initialState: LocationPositionState = entityAdapter.getInitialState();

export const slice = createSlice({
  name: "footPrint",
  initialState: initialState,
  reducers: {
    addOne: entityAdapter.addOne,
    removeOne: entityAdapter.removeOne,
    updateOne: entityAdapter.updateOne,
    removeAll: entityAdapter.removeAll,
    addMany: entityAdapter.addMany,
  },
});

export const {
  addOne: addOneFootPrint,
  removeOne: removeOneFootPrint,
  updateOne: updateOneFootPrint,
  removeAll: removeAllFootPrints,
  addMany: addManyFootPrints,
} = slice.actions;

export default slice.reducer;
