import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// root saga function
export default function* goalSage() {
  yield takeLatest("FETCH_GOALS", fetchGoals); // GET all goals
}

// saga function
function* fetchGoals(): Generator {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const goalRes: any = yield axios.get("/api/v1/goal", config);
    yield put({ type: "SET_GOALS", payload: goalRes.data });
  } catch (err) {
    console.log(err);
  }
}
