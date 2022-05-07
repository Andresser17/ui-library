import './App.css';
import Button from "./Button";

function App() {
  return (
    <div className="App p-4 bg-red-600">
      <Button icon={true} rounded={false} loading={false} border={false} disabled={true} />
    </div>
  );
}

export default App;
