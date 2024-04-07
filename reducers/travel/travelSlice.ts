import { createSlice } from "@reduxjs/toolkit";

export interface ShoppingItem {
  timestamp: number,
  label?: string,
  description?: string,
  amount: number,
}

export interface LocationPosition {
  timestamp: number,
  longitude: number,
  latitude: number,
  address: number,
}

export interface TaskItem {
  title: string,
  description?: string
  status: string
  completed?: number,
}

export interface Travel {
  travelId: string,
  title: string,
  timestamp: {
    start: number,
    end: number,
  },
  budget: number,
  costed: number,
  available: number,
  shoppingHistory: ShoppingItem[],
  footPrints: LocationPosition[],
  tasks: {
    main: TaskItem[],
    option: TaskItem[],
  },
}

const defaultTravels: Travel[] = []

export const configSlice = createSlice({
  name: "travel",
  initialState: {
    travels: defaultTravels,
  },
  reducers: {
    newTravel: (state, action) => {
      state.travels = [...state.travels, action.payload];
    },
    deleteTravel: (state, action) => {
      const { travelId } = action.payload;
      state.travels = state.travels.filter((item) => item.travelId !== travelId);
    },
    updateTravel: (state, action) => {
      const { travelId, ...updates } = action.payload;
      const travelIndex = state.travels.findIndex((item) => item.travelId === travelId);
      if (travelIndex !== -1) {
        state.travels[travelIndex] = { ...state.travels[travelIndex], ...updates };
      }
    },
    addShoppingItem: (state, action) => {
      const { travelId, shoppingItem } = action.payload;
      const travel = state.travels.find((item) => item.travelId === travelId);
      if (travel) {
        travel.shoppingHistory = [...travel.shoppingHistory, shoppingItem];
      }
    },
    removeShoppingItem: (state, action) => {
      const { travelId, timestamp } = action.payload;
      const travel = state.travels.find((item) => item.travelId === travelId);
      if (travel) {
        travel.shoppingHistory = travel.shoppingHistory.filter((item) => item.timestamp !== timestamp);
      }
    },
    addLocationPosition: (state, action) => {
      const { travelId, locationPosition } = action.payload;
      const travel = state.travels.find((item) => item.travelId === travelId);
      if (travel) {
        travel.footPrints = [...travel.footPrints, locationPosition];
      }
    },
    removeLocationPosition: (state, action) => {
      const { travelId, timestamp } = action.payload;
      const travel = state.travels.find((item) => item.travelId === travelId);
      if (travel) {
        travel.footPrints = travel.footPrints.filter((item) => item.timestamp !== timestamp);
      }
    },
    addTask: (state, action) => {
      const { travelId, task, taskType } = action.payload;
      const travel = state.travels.find(t => t.travelId === travelId);
      if (travel && (taskType === 'main' || taskType === 'option')) {
        travel.tasks[taskType].push(task);
      }
    },
    deleteTask: (state, action) => {
      const { travelId, taskTitle, taskType } = action.payload;
      const travel = state.travels.find(t => t.travelId === travelId);
      if (travel && (taskType === 'main' || taskType === 'option')) {
        travel.tasks[taskType] = travel.tasks[taskType].filter(task => task.title !== taskTitle);
      }
    },
    updateTask: (state, action) => {
      const { travelId, taskTitle, taskType, updates } = action.payload;
      const travel = state.travels.find(t => t.travelId === travelId);
      if (travel && (taskType === 'main' || taskType === 'option')) {
        const taskIndex = travel.tasks[taskType].findIndex(task => task.title === taskTitle);
        if (taskIndex !== -1) {
          travel.tasks[taskType][taskIndex] = { ...travel.tasks[taskType][taskIndex], ...updates };
        }
      }
    },
    toggleTaskStatus: (state, action) => {
      const { travelId, taskTitle, taskType } = action.payload;
      const travel = state.travels.find(t => t.travelId === travelId);
      if (travel && (taskType === 'main' || taskType === 'option')) {
        const task = travel.tasks[taskType].find(task => task.title === taskTitle);
        if (task) {
          task.status = task.status === 'completed' ? 'pending' : 'completed';
          task.completed = task.status === 'completed' ? Date.now() : undefined;
        }
      }
    },
  },
});

export const {
  newTravel,
  deleteTravel,
  updateTravel,
  addShoppingItem,
  removeShoppingItem,
  addLocationPosition,
  removeLocationPosition,
  deleteTask,
  updateTask,
  toggleTaskStatus,
} = configSlice.actions;

export default configSlice.reducer;
