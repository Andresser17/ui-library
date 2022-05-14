import "./App.css";
import Button from "./Button";
import { ReactComponent as LoadingIcon } from "./icons/loading-icon.svg";

function App() {
  return (
    <div className="App p-4 h-screen bg-red-600 flex items-start justify-center">
      <Button
        text="Submit"
        palette="success"
        icon={false}
        rounded={false}
        // loading
        border
        disabled={false}
      >
        <LoadingIcon />
      </Button>
      <Button
        text="Enter"
        palette="success"
        icon
        rounded={false}
        loading
        border
        disabled={false}
      >
        {/* <LoadingIcon /> */}
      </Button>
      <Button rounded loading icon>
        {/* <LoadingIcon /> */}
      </Button>
      <Button icon loading>
        {/* <LoadingIcon /> */}
      </Button>
    </div>
  );
}

export default App;
