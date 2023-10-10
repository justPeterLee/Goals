import "./App.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./hook/redux.hook";

function App() {
  const dispatch = useAppDispatch();
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
