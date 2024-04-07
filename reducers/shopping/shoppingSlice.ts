import {createEntityAdapter, createSlice, EntityState} from "@reduxjs/toolkit";

export interface Shopping {
  id: string,
  timestamp: number,
  label?: string,
  description?: string,
  amount: number,
}

interface ShoppingItemState extends EntityState<Shopping, string> {}

const entityAdapter = createEntityAdapter<Shopping>();
const initialState: ShoppingItemState = entityAdapter.getInitialState();

export const slice = createSlice({
  name: "shopping",
  initialState: initialState,
  reducers: {
    addOne: entityAdapter.addOne,
    removeOne: entityAdapter.removeOne,
    updateOne: entityAdapter.updateOne,
  },
});

export const {
  addOne,
  removeOne,
  updateOne,
} = slice.actions;

export default slice.reducer;
