// libraries
import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";

// modules
import { rootReducer } from "./reducers/_root.reducer";

// store
export const store = configureStore({
  reducer: rootReducer,
  middleware: [logger],
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
