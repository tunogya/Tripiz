import {createEntityAdapter, createSlice, EntityState} from "@reduxjs/toolkit";

export interface Task {
  id: string,
  type: string,
  title: string,
  description?: string,
  status: string,
  completed?: number,
}

interface TaskItemState extends EntityState<Task, string> {}

const entityAdapter = createEntityAdapter<Task>();
const initialState: TaskItemState = entityAdapter.getInitialState();

export const slice = createSlice({
  name: "task",
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
  addOne: addOneTask,
  removeOne: removeOneTask,
  updateOne: updateOneTask,
  removeAll: removeAllTasks,
  addMany: addManyTasks,
} = slice.actions;

export default slice.reducer;
