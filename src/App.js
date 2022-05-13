import "./App.css";
import Button from "./Button";

function App() {
  return (
    <div className="App p-4 h-screen bg-red-600 flex items-start justify-center">
      <Button
        text="Enter"
        palette="success-dark"
        icon={true}
        rounded={false}
        loading={false}
        border={true}
        disabled={false}
      />
    </div>
  );
}

export default App;
