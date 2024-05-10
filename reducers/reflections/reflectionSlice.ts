import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";

export interface Reflection {
  id: string;
  title: string;
  description?: string;
  date: number;
  images?: string[];
  favoured?: boolean;
}

interface ReflectionState extends EntityState<Reflection, string> {}

const entityAdapter = createEntityAdapter<Reflection>();
const initialState: ReflectionState = entityAdapter.getInitialState();

export const slice = createSlice({
  name: "reflection",
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
  addOne: addOneReflection,
  removeOne: removeOneReflection,
  updateOne: updateOneReflection,
  removeAll: removeAllReflections,
  addMany: addManyReflections,
} = slice.actions;

export default slice.reducer;
