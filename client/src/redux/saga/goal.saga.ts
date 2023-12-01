import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// root saga function
export default function* goalSage() {
  yield takeLatest("GET_TASK", fetchGoals); // GET all goals
  yield takeLatest("POST_TASK", postGoal);
}

const config = {
  headers: { "Content-Type": "application/json" },
};

// saga function
function* fetchGoals({ payload }: any): Generator {
  try {
    const goalRes: any = yield axios.get(
      `/api/v1/goal/${payload.year}-${payload.month}-${payload.date}`,
      config
    );
    yield put({ type: "SET_GOALS", payload: goalRes.data });
  } catch (err) {
    console.log(err);
  }
}

function* postGoal({ payload }: any): Generator {
  try {
    yield axios.post("/api/v1/goal/task", payload);
    yield put({ type: "SET_TASK", payload: "testing" });
  } catch (err) {
    console.log(err);
  }
}
