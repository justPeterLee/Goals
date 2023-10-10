import "./App.css";
// import axios from "axios";
import { useState } from "react";
// import { increment } from "./redux/reducers/test.reducer";
import { useAppDispatch, useAppSelector } from "./hook/redux.hook";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const countState: any = useAppSelector((state) => state.count.value);

  const [count, setCount] = useState(0);
  const addCount = () => {
    dispatch({ type: "FETCH_GOALS" });
    setCount(countState);
  };
  return (
    <>
      <div className="card">
        <button onClick={addCount}>{count}</button>
      </div>
    </>
  );
}

export default App;
