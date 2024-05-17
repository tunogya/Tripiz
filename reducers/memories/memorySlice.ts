import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";

export interface Memory {
  id: string;
  title: string;
  description: string;
  voiceRecording: string;
  date: number;
  rate: number;
  images: string[];
  emotions: string[];
  notes: string;
  favoured?: boolean;
}

interface MemoryState extends EntityState<Memory, string> {}

const entityAdapter = createEntityAdapter<Memory>();
const initialState: MemoryState = entityAdapter.getInitialState();

export const slice = createSlice({
  name: "memory",
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
  addOne: addOneMemory,
  removeOne: removeOneMemory,
  updateOne: updateOneMemory,
  removeAll: removeAllMemories,
  addMany: addManyMemories,
} = slice.actions;

export default slice.reducer;
