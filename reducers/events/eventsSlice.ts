import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";

export interface Event {
  id: string;
  /*
   * status
   * 0: need to be uploaded
   * 1: had uploaded success
   * 2: need to be deleted
   * 3: had deleted success
   */
  status: number;
}

interface EventState extends EntityState<Event, string> {}

const entityAdapter = createEntityAdapter<Event>();
const initialState: EventState = entityAdapter.getInitialState();

export const slice = createSlice({
  name: "toBeUploadedEvents",
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
  addOne: addOneEvent,
  removeOne: removeOneEvent,
  updateOne: updateOneEvent,
  removeAll: removeAllEvents,
  addMany: addManyEvents,
} = slice.actions;

export default slice.reducer;
