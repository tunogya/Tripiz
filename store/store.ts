import { combineReducers, configureStore } from "@reduxjs/toolkit";
import configReducer from "reducers/config/configSlice";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import travelReducer from "../reducers/travel/travelSlice";
import footPrintReducer from "../reducers/footPrint/footPrintSlice";

const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: [],
};

const rootReducer = combineReducers({
  config: configReducer,
  travel: travelReducer,
  footPrint: footPrintReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
