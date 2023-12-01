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
        // console.log("get task redux");
        const key: any = {};

        action.payload.forEach((element: any) => {
          const timeKey = new Date(element.date).getHours();
          // console.log(element, timeKey);

          if (key[timeKey]) {
            key[timeKey] = [...key[timeKey], element];
          } else {
            key[timeKey] = [element];
          }

          // console.log(new Date(element.date).getHours());
        });

        // console.log(key);
        return key;
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
