import "./App.css";
// import { useState } from "react";
import PopUp from "./PopUp";
// Icons
import { ReactComponent as ErrorIcon } from "./icons/error-icon.svg";

function App() {
  return (
    <div className="App p-4 h-screen bg-green-300 flex items-start justify-center">
      <PopUp
        title="File Deleted"
        description="That's all :)"
        buttons={[
          {
            text: "Okay, thank you",
            click() {
              console.log("hello world");
            },
          },
        ]}
      />
      <PopUp
        mode="info"
        title="Do you want delete?"
        description="You can't restore this file"
        buttons={[{ text: "Delete" }, { text: "Cancel" }]}
      />
      <PopUp
        mode="error"
        title="Error"
        description="Sorry"
        buttons={[{ text: "Close" }]}
      />
    </div>
  );
}

export default App;
