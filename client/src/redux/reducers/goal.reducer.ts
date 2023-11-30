// import { UnknownAction } from "redux";
import { combineReducers } from "@reduxjs/toolkit";

interface action {
  type: string;
  payload: any;
}

function agenda(
  state: null | any[] = null,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "SET_GOALS":
      if (action.payload) {
        console.log("get task redux");
        return action.payload;
      }
      return state;
    default:
      return state;
  }
}

function setTask(state: any = [], action: action) {
  switch (action.type) {
    case "SET_TASK":
      if (action.payload) {
        // console.log("redux test");
        return action.payload;
      }
      return state;
    default:
      return state;
  }
}
export default combineReducers({
  agenda,
  setTask,
});
