import { combineReducers } from "@reduxjs/toolkit";
import testReducer from "./test.reducer";
import goalReducer from "./goal.reducer";

export const rootReducer = combineReducers({
  count: testReducer,
  agenda: goalReducer,
});
