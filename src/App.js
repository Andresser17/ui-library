import "./App.css";
import Filter from "./Filter";

function App() {
  return (
    <div className="App p-4 h-screen bg-green-400 flex items-start justify-center">
      <Filter onClick={(text) => console.log(text)} items={["Tea", "Coffee", "Coca Cola", "Water"]} />
    </div>
  );
}

export default App;
