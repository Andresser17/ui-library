import "./App.css";
// import { useState } from "react";
import Tabs from "./Tabs";
// Icons
// import { ReactComponent as ErrorIcon } from "./icons/error-icon.svg";

function App() {
  return (
    <div className="App p-4 h-screen bg-green-300 flex items-start justify-center">
      <Tabs
        tabs={["Apple", "Pearl", "Java"]}
        size="sm"
        horizontal
        palette="primary"
        getSelected={(t) => {
          console.log(t);
        }}
      />
    </div>
  );
}

export default App;
