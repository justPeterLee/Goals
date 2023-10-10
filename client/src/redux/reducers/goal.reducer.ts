// import { UnknownAction } from "redux";
import { combineReducers } from "@reduxjs/toolkit";

function goals(state: any = [], action: { type: string; payload: any }) {
  console.log("in redux");
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

export default combineReducers({
  goals,
});
