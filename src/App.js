import "./App.css";
// import Button from "./Button";
// import { ReactComponent as LoadingIcon } from "./icons/loading-icon.svg";
import Badge from "./Badge";

function App() {
  return (
    <div className="App p-4 h-screen bg-gray-100 flex items-start justify-center">
      <Badge palette="primary" rounded text={"Hello"} />
    </div>
  );
}

export default App;
