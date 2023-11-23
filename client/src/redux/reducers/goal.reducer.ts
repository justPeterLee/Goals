// import { UnknownAction } from "redux";
import { combineReducers } from "@reduxjs/toolkit";

interface action {
  type: string;
  payload: any;
}
function goals(state: any = [], action: { type: string; payload: any }) {
  switch (action.type) {
    case "SET_GOALS":
      if (action.payload) {
        return action.payload;
      }
      return state;
    default:
      return state;
  }
}

function task(state: any = [], action: action) {
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
  goals,
  task,
});
