import './App.css';
import Button from "./Button";

function App() {
  return (
    <div className="App p-4 bg-red-600">
      <Button palette="primary" icon={false} rounded={false} loading={false} border={false} disabled={false} />
    </div>
  );
}

export default App;
