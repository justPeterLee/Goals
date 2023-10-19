import "./App.css";
import { Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import { useAppDispatch, useAppSelector } from "./hook/redux.hook";

//components
import Calendar from "./components/calendar/Calendar";

function App() {
  // const dispatch = useAppDispatch();
  // const countState: any = useAppSelector((state) => state.count.value);

  // const [count, setCount] = useState(0);
  // const addCount = () => {
  //   dispatch({ type: "FETCH_GOALS" });
  //   setCount(countState);
  // };
  return (
    <Routes>
      <Route path="/" element={<Calendar />} />
      <Route path="/calendar" element={<Calendar />}>
        <Route path=":year/:month" element={<Calendar />} />
      </Route>
    </Routes>
  );
}

export default App;
