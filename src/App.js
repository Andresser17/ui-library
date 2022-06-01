import "./App.css";
import { useState } from "react";
import Notification from "./Notification";

function App() {
  const [close, setClose] = useState(true);

  const handleClose = () => setClose(false);

  return (
    <div className="App p-4 h-screen bg-green-400 flex items-start justify-center">
      {close && (
        <Notification
          onClose={handleClose}
          header="Head"
          buttons
          description="Description"
          palette="warning"
          mode="error"
        />
      )}
    </div>
  );
}

export default App;
