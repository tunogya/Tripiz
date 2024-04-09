import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";

export interface Hobby {
  id: string;
  title: string;
}

interface HobbyState extends EntityState<Hobby, string> {}

const entityAdapter = createEntityAdapter<Hobby>();
const initialState: HobbyState = entityAdapter.getInitialState();

export const slice = createSlice({
  name: "hobby",
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
  addOne: addOneHobby,
  removeOne: removeOneHobby,
  updateOne: updateOneHobby,
  removeAll: removeAllHobby,
  addMany: addManyHobby,
} = slice.actions;

export default slice.reducer;
