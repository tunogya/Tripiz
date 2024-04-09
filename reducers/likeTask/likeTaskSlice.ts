import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";

export interface LikeTask {
  id: string;
  title: string;
}

interface LikeTaskState extends EntityState<LikeTask, string> {}

const entityAdapter = createEntityAdapter<LikeTask>();
const initialState: LikeTaskState = entityAdapter.getInitialState();

export const slice = createSlice({
  name: "like-task",
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
  addOne: addOneLikeTask,
  removeOne: removeOneLikeTask,
  updateOne: updateOneLikeTask,
  removeAll: removeAllLikeTasks,
  addMany: addManyLikeTasks,
} = slice.actions;

export default slice.reducer;
