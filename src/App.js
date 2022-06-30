import "./App.css";
// import { useState } from "react";
import Island from "./Island";
// Icons
import { ReactComponent as ErrorIcon } from "./icons/error-icon.svg";

function App() {
  return (
    <div className="App p-4 h-screen bg-green-300 flex items-start justify-center">
      <Island
        title="Your text"
        head="Head"
        description="An easy description"
        mode="pending"
        percent={50}
      >
        {/* {{ */}
        {/*   icon: <ErrorIcon className="w-8 ml-6 mb-4" />, */}
        {/*   params: [ */}
        {/*     { text: "Params", icon: <ErrorIcon className="w-6" /> }, */}
        {/*     { text: "Params", icon: <ErrorIcon className="w-6" /> }, */}
        {/*   ], */}
        {/* }} */}
      </Island>
    </div>
  );
}

export default App;
