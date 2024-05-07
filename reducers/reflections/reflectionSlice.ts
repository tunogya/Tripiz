import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";

export interface Dream {
  id: string;
  title: string;
  description?: string;
  voiceRecording?: string;
  date: number;
  rate?: number;
  images?: string[];
  emotions?: string[];
  notes?: string;
}

interface DreamState extends EntityState<Dream, string> {}

const entityAdapter = createEntityAdapter<Dream>();
const initialState: DreamState = entityAdapter.getInitialState();

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
