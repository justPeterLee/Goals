import { all } from "redux-saga/effects";
import goalSage from "./goal.saga";

export default function* rootSaga() {
  yield all([goalSage()]);
}
