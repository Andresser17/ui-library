import './App.css';
import Button from "./Button";

function App() {
  return (
    <div className="App p-4 h-screen flex items-start justify-center">
      <Button palette="secondary" icon={false} rounded={false} loading={false} border={false} disabled={false} />
    </div>
  );
}

export default App;
