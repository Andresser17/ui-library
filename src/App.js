import "./App.css";
// import { useState } from "react";
import PopUp from "./PopUp";
// Icons
import { ReactComponent as ErrorIcon } from "./icons/error-icon.svg";

function App() {
  return (
    <div className="App p-4 h-screen bg-green-300 flex items-start justify-center">
      <PopUp mode="pending" />
    </div>
  );
}

export default App;
