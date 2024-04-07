import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";

export interface Shopping {
  id: string;
  timestamp: number;
  description?: string;
  amount: number;
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
    removeAll: entityAdapter.removeAll,
    addMany: entityAdapter.addMany,
  },
});

export const {
  addOne: addOneShopping,
  removeOne: removeOneShopping,
  updateOne: updateOneShopping,
  removeAll: removeAllShopping,
  addMany: addManyShopping,
} = slice.actions;

export default slice.reducer;
