import "./App.css";
import axios from "axios";
function App() {
  const testFetch = async () => {
    axios.get("/api/v1/").then(async (response) => {
      console.log(response.data);
    });
  };
  return (
    <>
      <div className="card">
        <button onClick={testFetch}>click</button>
      </div>
    </>
  );
}

export default App;
