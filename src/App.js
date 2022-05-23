import "./App.css";
// Font Icons
// import "./icons/checkmark/styles.css";
// import { ReactComponent as LoadingIcon } from "./icons/loading-icon.svg";
// import Button from "./Button";
// import Badge from "./Badge";
import Checkbox from "./Checkbox";

function App() {
  return (
    <div className="App p-4 h-screen bg-green-400 flex items-start justify-center">
      <Checkbox palette="primary" value="terror" indeterminate={false} error={false} disabled={false} />
    </div>
  );
}

export default App;
